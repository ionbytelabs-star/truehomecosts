import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { guideMap, guideSummaries } from "../content/guides";
import { calculatorCostAssumptionById, homepageCostRows } from "../data/assumptions/calculator";
import { mortgageFeeBands, mortgageFeePlanningMetadata } from "../data/assumptions/mortgageFees";
import { calculateUpfrontCosts, type CalculatorInput } from "../lib/calculator";
import { sourceLinks } from "../lib/source-links";

const guide = guideMap["mortgage-fees-costs"];
const sectionTitles = new Set(guide.sections.map((section) => section.title));
const routeSource = readFileSync("app/[slug]/page.tsx", "utf8");
const templateSource = readFileSync("components/GuidePageTemplate.tsx", "utf8");
const sitemapSource = readFileSync("app/sitemap.ts", "utf8");
const metadataSource = readFileSync("lib/metadata.ts", "utf8");
const siteSource = readFileSync("lib/site.ts", "utf8");

function mortgageFeeFor(level: CalculatorInput["assumptionLevel"]) {
  const result = calculateUpfrontCosts({
    propertyPrice: 300_000,
    jurisdiction: "england",
    buyerType: "home-mover",
    depositMode: "percentage",
    depositPercentage: 10,
    assumptionLevel: level,
    includeMoving: true,
    includeInsurance: true,
    includeFurnishing: false,
    includeContingency: true,
    contingencyPercentage: 10
  });

  return result.breakdown.find((line) => line.key === "mortgage-fees")?.value;
}

test("mortgage-fee route stays unique, indexable and exactly canonical", () => {
  assert.equal(guideSummaries.filter((item) => item.slug === "mortgage-fees-costs").length, 1);
  assert.ok(routeSource.includes('path: `/${guide.slug}`'));
  assert.match(routeSource, /absoluteTitle: guide\.slug === "mortgage-fees-costs"/);
  assert.doesNotMatch(routeSource, /noindex|robots:/i);

  assert.match(metadataSource, /alternates:\s*{\s*canonical: url/);
  assert.match(siteSource, /url: "https:\/\/truehomecosts\.co\.uk"/);

  assert.equal((sitemapSource.match(/\.\.\.guideSummaries\.map/g) ?? []).length, 1);
  assert.match(sitemapSource, /url: absoluteUrl\(guide\.slug\)/);
});
test("title, H1, description and review date match the GSC-led brief", () => {
  assert.equal(
    guide.title,
    "Mortgage Fees UK 2026: Arrangement, Booking & Valuation | TrueHomeCosts"
  );
  assert.equal(
    guide.h1,
    "Mortgage Fees UK 2026: Arrangement, Booking, Broker and Valuation Costs"
  );
  assert.equal(guide.lastReviewed, "2026-08-11");
  assert.equal(guide.lastReviewedLabel, "11 August 2026");
  assert.match(guide.description, /arrangement and booking fees/i);
  assert.match(guide.description, /lender valuations/i);
});

test("homepage and guide read the same shared mortgage-fee source", () => {
  const assumption = calculatorCostAssumptionById.get("mortgage-fees");
  assert.ok(assumption);
  assert.equal(assumption.minimum, 250);
  assert.equal(assumption.typical, 800);
  assert.equal(assumption.maximum, 2_300);
  assert.equal(mortgageFeeBands.at(0)?.low, assumption.minimum);
  assert.equal(mortgageFeeBands.at(-1)?.high, assumption.maximum);
  assert.equal(mortgageFeePlanningMetadata.lastVerified, "2026-08-11");
  assert.match(mortgageFeePlanningMetadata.scope, /one combined/i);

  const homepageRow = homepageCostRows.find((row) => row.id === "mortgage-fees");
  assert.ok(homepageRow);
  assert.deepEqual(homepageRow.assumptionIds, ["mortgage-fees"]);
  assert.match(homepageRow.description, /one adjustable allowance/i);

  assert.equal(mortgageFeeFor("low"), 300);
  assert.equal(mortgageFeeFor("average"), 800);
  assert.equal(mortgageFeeFor("high"), 1_450);

  const renderedGuide = JSON.stringify(guide);
  for (const value of ["£250", "£800", "£2,300", "£300", "£1,450"]) {
    assert.ok(renderedGuide.includes(value), `Guide is missing shared value ${value}`);
  }
  assert.doesNotMatch(renderedGuide, /average planning amount/i);
  assert.match(renderedGuide, /typical default/i);
  assert.match(renderedGuide, /not (?:a |an )?(?:observed|measured|statistically measured).*average/i);
});

test("near-top fee table is cost-first, conditional and source-aligned", () => {
  const summary = guide.introSections?.find(
    (section) => section.title === "Mortgage fees at a glance"
  );
  assert.ok(summary?.table);
  assert.deepEqual(summary.table.columns, [
    "Fee type",
    "Current consumer reference / treatment",
    "Who charges it",
    "When it may apply",
    "Notes"
  ]);

  const rows = JSON.stringify(summary.table.rows);
  for (const fee of [
    "Arrangement / product fee",
    "Booking / reservation / application fee",
    "Mortgage account fee",
    "Lender valuation",
    "Mortgage broker / adviser fee",
    "Lender-related legal / funds-transfer fee",
    "Exit fee / early repayment charge (ERC)"
  ]) {
    assert.ok(rows.includes(fee), `Missing fee row: ${fee}`);
  }
  assert.match(rows, /not a buyer's condition survey/i);
  assert.match(summary.callout ?? "", /do not total every row/i);
});

test("all required mortgage-fee sub-intents and internal links are covered", () => {
  for (const title of [
    "How much are mortgage fees in the UK?",
    "Mortgage application, booking and arrangement fees: what's the difference?",
    "How much is a mortgage valuation fee?",
    "Mortgage broker fees",
    "Is a mortgage with a fee cheaper than a fee-free mortgage?",
    "Should you pay the mortgage fee upfront or add it to the loan?",
    "Interest rate vs APRC vs mortgage fees",
    "Are mortgage fees refundable if the purchase falls through?",
    "Are legal fees included in mortgage fees?",
    "Remortgage, early repayment and exit fees",
    "Worked £300,000 mortgage-fee planning example"
  ]) {
    assert.ok(sectionTitles.has(title), `Missing section: ${title}`);
  }

  const content = JSON.stringify(guide);
  for (const href of [
    "/#calculator",
    "/hidden-costs-buying-house",
    "/costs-before-completion",
    "/property-survey-costs-uk",
    "/conveyancing-costs-uk"
  ]) {
    assert.ok(content.includes(`\"href\":\"${href}\"`), `Missing internal link: ${href}`);
  }
  assert.doesNotMatch(content, /closing costs/i);
});

test("visible FAQs and FAQ schema are exactly consistent", () => {
  assert.equal(guide.faqs.length, 7);
  assert.deepEqual(
    guide.faqs.map((faq) => faq.question),
    [
      "How much are mortgage fees in the UK?",
      "What is a mortgage arrangement or product fee?",
      "Is a mortgage application fee the same as a booking fee?",
      "How much is a mortgage valuation fee?",
      "Can you add a mortgage arrangement fee to the mortgage?",
      "Are mortgage fees refundable if the purchase falls through?",
      "Is a fee-free mortgage always cheaper?"
    ]
  );

  assert.equal((templateSource.match(/faqPageSchema\(guide\.faqs\)/g) ?? []).length, 1);
});

test("authoritative current sources and all four preserved schemas are wired", () => {
  for (const key of [
    "moneyHelperBuyingMoving",
    "moneyHelperMortgageAdvice",
    "moneySavingExpertMortgageFees"
  ] as const) {
    assert.ok(guide.sourceKeys.includes(key));
    assert.match(sourceLinks[key].href, /^https:\/\//);
  }

  for (const key of [
    "fcaMortgageAprc",
    "fcaMortgageBrokerAuthorisation",
    "fcaFirmChecker",
    "govUkBuyingAHome",
    "ricsHouseSurveys"
  ] as const) {
    assert.ok(guide.officialSourceKeys?.includes(key));
  }

  assert.match(templateSource, /webpageSchema\(/);
  assert.match(templateSource, /articleSchema\(/);
  assert.match(templateSource, /faqPageSchema\(guide\.faqs\)/);
  assert.match(templateSource, /breadcrumbSchema\(/);
});

