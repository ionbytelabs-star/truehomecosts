import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { guideMap, guideSummaries } from "../content/guides";

const slug = "conveyancing-costs-uk";
const guide = guideMap[slug];

test("historical Conveyancing Costs guide is restored at its indexed slug", () => {
  assert.ok(guide);
  assert.equal(guide.slug, slug);
  assert.equal(guide.title, "UK Conveyancing Costs: Solicitor Fees Explained");
  assert.equal(guide.h1, "UK conveyancing costs and solicitor fees");
  assert.equal(guide.lastReviewed, "2026-07-25");
  assert.equal(guideSummaries.filter((entry) => entry.slug === slug).length, 1);
});

test("historical Conveyancing content, FAQs and structured-data inputs are preserved", () => {
  assert.equal(guide.sections[0].title, "Legal fees and disbursements are different");
  assert.equal(guide.faqs.length, 3);
  assert.deepEqual(
    guide.faqs.map((faq) => faq.question),
    [
      "How much are solicitors' fees when buying a house?",
      "Are searches included in conveyancing fees?",
      "Do leasehold purchases cost more to convey?"
    ]
  );

  const templateSource = readFileSync("components/GuidePageTemplate.tsx", "utf8");
  assert.match(templateSource, /articleSchema/);
  assert.match(templateSource, /faqPageSchema\(guide\.faqs\)/);
});

test("historical contextual backlinks are restored without broken sibling-route links", () => {
  for (const sourceSlug of ["hidden-costs-buying-house", "hidden-costs-buying-new-build-home-uk"]) {
    const links = guideMap[sourceSlug].contextualLinks?.filter((link) => link.href === `/${slug}`) ?? [];
    assert.equal(links.length, 1, `Expected one backlink from ${sourceSlug}`);
  }

  const methodologySource = readFileSync("app/methodology/page.tsx", "utf8");
  const giftedDepositSource = readFileSync("app/gifted-deposit-mortgage/page.tsx", "utf8");
  assert.match(methodologySource, /href="\/conveyancing-costs-uk"/);
  assert.match(giftedDepositSource, /href="\/conveyancing-costs-uk"/);

  for (const missingSibling of ["/buying-and-selling-house-same-time"]) {
    assert.ok(!guide.contextualLinks?.some((link) => link.href === missingSibling));
    assert.ok(!guide.relatedGuides.includes(missingSibling.slice(1)));
  }
});

test("critical indexed SEO routes remain registered exactly once", () => {
  const criticalSlugs = [
    "land-registry-fees-uk",
    "conveyancing-costs-uk",
    "costs-before-completion",
    "hidden-costs-buying-new-build-home-uk",
    "cost-of-owning-home-uk",
    "stamp-duty-explained"
  ];

  for (const criticalSlug of criticalSlugs) {
    assert.ok(guideMap[criticalSlug], `Critical SEO route /${criticalSlug} is not registered`);
    assert.equal(
      guideSummaries.filter((entry) => entry.slug === criticalSlug).length,
      1,
      `Critical SEO route /${criticalSlug} must be registered exactly once`
    );
  }
});

test("generic route, canonical, sitemap and crawlability wiring remain active", () => {
  const routeSource = readFileSync("app/[slug]/page.tsx", "utf8");
  const metadataSource = readFileSync("lib/metadata.ts", "utf8");
  const sitemapSource = readFileSync("app/sitemap.ts", "utf8");
  const robotsSource = readFileSync("app/robots.txt/route.ts", "utf8");

  assert.match(routeSource, /path: `\/\$\{guide\.slug\}`/);
  assert.doesNotMatch(routeSource, /noindex/i);
  assert.match(metadataSource, /alternates:\s*\{\s*canonical: url/);
  assert.match(sitemapSource, /guideSummaries\.map/);
  assert.match(robotsSource, /"Allow: \/"/);
});
