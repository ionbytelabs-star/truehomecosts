import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { guideMap, guideSummaries } from "../content/guides";
import { calculatorCostAssumptionById } from "../data/assumptions/calculator";
import { solicitorFeeVatTreatment } from "../data/assumptions/solicitors";
import { calculateUpfrontCosts } from "../lib/calculator";
import { siteConfig } from "../lib/site";

const slug = "conveyancing-costs-uk";
const guide = guideMap[slug];

test("Conveyancing Costs remains the single canonical route for the cluster", () => {
  assert.ok(guide);
  assert.equal(guide.slug, slug);
  assert.equal(guide.title, "Conveyancing Costs UK 2026: Solicitor Fees Explained");
  assert.equal(guide.h1, "Conveyancing Costs UK 2026: Solicitor Fees and Disbursements");
  assert.equal(guide.lastReviewed, "2026-08-11");
  assert.equal(guideSummaries.filter((entry) => entry.slug === slug).length, 1);
  assert.deepEqual(
    guideSummaries.filter((entry) => entry.slug.includes("conveyanc")).map((entry) => entry.slug),
    [slug]
  );

  assert.equal(`${siteConfig.url}/${guide.slug}`, "https://truehomecosts.co.uk/conveyancing-costs-uk");
});

test("cost-first answer and worked example derive the intended planning figures", () => {
  assert.equal(guide.introSections?.[0].title, "Residential conveyancing costs at a glance");
  const atGlanceRows = guide.introSections?.[0].table?.rows ?? [];
  assert.ok(atGlanceRows.some((row) => row[0] === "Planning subtotal" && row[1] === "£1,485–£2,435"));
  assert.ok(atGlanceRows.some((row) => row[0] === "Solicitor or conveyancer legal fee" && row[1] === "£1,050–£1,800"));
  assert.match(guide.directAnswer, /including VAT/i);

  const low = calculateUpfrontCosts({
    propertyPrice: 300_000,
    jurisdiction: "england",
    buyerType: "home-mover",
    depositMode: "percentage",
    depositPercentage: 10,
    assumptionLevel: "low",
    includeMoving: false,
    includeInsurance: false,
    includeFurnishing: false,
    includeContingency: false
  });
  const high = calculateUpfrontCosts({
    propertyPrice: 300_000,
    jurisdiction: "england",
    buyerType: "home-mover",
    depositMode: "percentage",
    depositPercentage: 10,
    assumptionLevel: "high",
    includeMoving: false,
    includeInsurance: false,
    includeFurnishing: false,
    includeContingency: false
  });
  assert.equal(low.breakdown.find((line) => line.key === "solicitors")?.value, 1_050);
  assert.equal(high.breakdown.find((line) => line.key === "solicitors")?.value, 1_800);
  assert.equal(low.breakdown.find((line) => line.key === "land-registry")?.value, 150);
});

test("VAT and benchmark source treatment are explicit without changing the fee bands", () => {
  assert.equal(solicitorFeeVatTreatment.included, true);
  assert.equal(solicitorFeeVatTreatment.rate, 0.2);
  assert.equal(solicitorFeeVatTreatment.lastVerified, "2026-08-11");

  const assumption = calculatorCostAssumptionById.get("solicitors");
  assert.ok(assumption);
  assert.match(assumption.notes, /include VAT/i);
  assert.equal(assumption.lastVerified, "2026-08-11");
  assert.match(assumption.sourceName ?? "", /MoneyHelper and SRA/);
  assert.equal(
    assumption.sourceUrl,
    "https://www.moneyhelper.org.uk/en/homes/buying-a-home/find-the-right-solicitor-or-conveyancer"
  );
});

test("GSC-led sections, visible FAQs and structured-data inputs remain aligned", () => {
  assert.deepEqual(
    guide.sections.map((section) => section.title),
    [
      "How much does conveyancing cost in the UK?",
      "What are conveyancing fees?",
      "What's included in conveyancing fees and what's charged separately?",
      "How are conveyancing fees calculated?",
      "Fixed-fee vs hourly conveyancing",
      "Buying vs selling conveyancing costs",
      "Why conveyancing costs more for some properties",
      "New-build conveyancing costs",
      "Conveyancing costs in England, Wales, Scotland and Northern Ireland",
      "When do you pay conveyancing fees?",
      "How to compare conveyancing quotes",
      "Worked example: £300,000 England purchase"
    ]
  );
  assert.deepEqual(
    guide.faqs.map((faq) => faq.question),
    [
      "How much does conveyancing cost in the UK?",
      "How are conveyancing fees calculated?",
      "What is included in conveyancing fees?",
      "Are property searches included in conveyancing fees?",
      "Do leasehold or new-build homes cost more to convey?",
      "Are conveyancing fees different when selling a house?",
      "When do you pay conveyancing fees?"
    ]
  );
  assert.equal(guide.showFaqAnswersExpanded, true);

  const templateSource = readFileSync("components/GuidePageTemplate.tsx", "utf8");
  assert.match(templateSource, /webpageSchema/);
  assert.match(templateSource, /articleSchema/);
  assert.match(templateSource, /faqPageSchema\(guide\.faqs\)/);
  assert.match(templateSource, /breadcrumbSchema/);
  assert.match(templateSource, /<FAQSection items=\{guide\.faqs\}/);
});

test("requested internal links are present once on each scoped source page", () => {
  for (const sourceSlug of [
    "hidden-costs-buying-house",
    "hidden-costs-buying-new-build-home-uk",
    "first-time-buyer-costs",
    "mortgage-fees-costs",
    "land-registry-fees-uk"
  ]) {
    const links = guideMap[sourceSlug].contextualLinks?.filter((link) => link.href === `/${slug}`) ?? [];
    assert.equal(links.length, 1, `Expected one backlink from ${sourceSlug}`);
  }

  const homepageSource = readFileSync("app/page.tsx", "utf8");
  assert.equal(homepageSource.match(/href="\/conveyancing-costs-uk"/g)?.length, 1);
  assert.match(homepageSource, /solicitor and conveyancing fees/);

  const methodologySource = readFileSync("app/methodology/page.tsx", "utf8");
  const giftedDepositSource = readFileSync("app/gifted-deposit-mortgage/page.tsx", "utf8");
  assert.match(methodologySource, /href="\/conveyancing-costs-uk"/);
  assert.match(giftedDepositSource, /href="\/conveyancing-costs-uk"/);
});

test("critical indexed routes, sitemap and crawlability wiring remain active", () => {
  const criticalSlugs = [
    "land-registry-fees-uk",
    "conveyancing-costs-uk",
    "costs-before-completion",
    "costs-after-exchange",
    "property-survey-costs-uk",
    "buying-and-selling-house-same-time",
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
