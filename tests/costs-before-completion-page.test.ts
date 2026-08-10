import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { guideMap, guideSummaries } from "../content/guides";

const slug = "costs-before-completion";
const guide = guideMap[slug];

test("historical Costs Before Completion guide is restored at its indexed slug", () => {
  assert.ok(guide);
  assert.equal(guide.slug, slug);
  assert.equal(guide.title, "Costs Before Completion When Buying a House");
  assert.equal(guide.h1, "Costs payable before completion");
  assert.equal(guide.lastReviewed, "2026-07-25");
  assert.equal(guideSummaries.filter((entry) => entry.slug === slug).length, 1);
});

test("historical content, FAQs and structured-data inputs are preserved", () => {
  assert.equal(guide.sections[0].title, "Before-completion payment timeline");
  assert.equal(guide.sections[4].title, "When property tax is paid");
  assert.equal(guide.faqs.length, 3);
  assert.deepEqual(
    guide.faqs.map((faq) => faq.question),
    [
      "What do I pay before completion when buying a house?",
      "Are stamp duty, LBTT or LTT paid before completion?",
      "What happens to survey and search costs if the purchase fails?"
    ]
  );

  const templateSource = readFileSync("components/GuidePageTemplate.tsx", "utf8");
  assert.match(templateSource, /webpageSchema/);
  assert.match(templateSource, /articleSchema/);
  assert.match(templateSource, /faqPageSchema\(guide\.faqs\)/);
  assert.match(templateSource, /breadcrumbSchema/);
});

test("historical contextual backlinks are restored without missing sibling routes", () => {
  for (const sourceSlug of [
    "hidden-costs-buying-new-build-home-uk",
    "stamp-duty-explained",
    "mortgage-fees-costs",
    "land-registry-fees-uk",
    "conveyancing-costs-uk"
  ]) {
    const links = guideMap[sourceSlug].contextualLinks?.filter((link) => link.href === `/${slug}`) ?? [];
    assert.equal(links.length, 1, `Expected one backlink from ${sourceSlug}`);
  }

  const giftedDepositSource = readFileSync("app/gifted-deposit-mortgage/page.tsx", "utf8");
  assert.match(giftedDepositSource, /href="\/costs-before-completion"/);

  for (const missingSibling of [
    "/first-month-costs-after-buying-house"
  ]) {
    assert.ok(!guide.contextualLinks?.some((link) => link.href === missingSibling));
    assert.ok(!guide.relatedGuides.includes(missingSibling.slice(1)));
  }
});
