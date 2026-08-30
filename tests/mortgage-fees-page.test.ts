import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { guideMap, guideSummaries } from "../content/guides";
import { calculatorCostAssumptionById, homepageCostRows } from "../data/assumptions/calculator";
import {
  mortgageFeeBands,
  mortgageFeeConsumerReferences,
  mortgageFeePlanningMetadata
} from "../data/assumptions/mortgageFees";
import { calculateUpfrontCosts, type CalculatorInput } from "../lib/calculator";
import { sourceLinks } from "../lib/source-links";

const guide = guideMap["mortgage-fees-costs"];
const sectionTitles = new Set(guide.sections.map((section) => section.title));
const routeSource = readFileSync("app/[slug]/page.tsx", "utf8");
const mortgagePageSource = readFileSync("components/MortgageFeesPage.tsx", "utf8");
const calculatorSource = readFileSync("components/MortgageFeeComparisonCalculator.tsx", "utf8");
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
test("the established title and H1 are preserved while the review is truthful", () => {
  assert.equal(
    guide.title,
    "Mortgage Fees UK 2026: Arrangement, Booking & Valuation | TrueHomeCosts"
  );
  assert.equal(
    guide.h1,
    "Mortgage Fees UK 2026: Arrangement, Booking, Broker and Valuation Costs"
  );
  assert.equal(guide.lastReviewed, "2026-08-30");
  assert.equal(guide.lastReviewedLabel, "30 August 2026");
  assert.match(guide.description, /arrangement, product, booking, valuation and broker fees/i);
  assert.match(guide.description, /fee-paying or fee-free/i);
});

test("homepage and guide read the same shared mortgage-fee source", () => {
  const assumption = calculatorCostAssumptionById.get("mortgage-fees");
  assert.ok(assumption);
  assert.equal(assumption.minimum, 250);
  assert.equal(assumption.typical, 800);
  assert.equal(assumption.maximum, 2_300);
  assert.equal(mortgageFeeBands.at(0)?.low, assumption.minimum);
  assert.equal(mortgageFeeBands.at(-1)?.high, assumption.maximum);
  assert.equal(mortgageFeePlanningMetadata.lastVerified, "2026-08-30");
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

  for (const reference of Object.values(mortgageFeeConsumerReferences)) {
    assert.equal(reference.sourceOrganisation, "MoneyHelper");
    assert.equal(reference.dateVerified, "2026-08-30");
    assert.equal(reference.usedOn, "/mortgage-fees-costs");
    assert.match(reference.sourceUrl, /^https:\/\/www\.moneyhelper\.org\.uk\//);
  }
});

test("near-top fee table is cost-first, conditional and source-aligned", () => {
  const summary = guide.introSections?.find(
    (section) => section.title === "Mortgage fees at a glance"
  );
  assert.ok(summary?.table);
  assert.deepEqual(summary.table.columns, [
    "Fee",
    "Published reference or treatment",
    "Who charges it",
    "What to check"
  ]);

  const rows = JSON.stringify(summary.table.rows);
  for (const fee of [
    "Arrangement / product fee",
    "Booking / application / reservation fee",
    "Mortgage account fee",
    "Lender valuation",
    "Broker / adviser fee",
    "Funds transfer / lender administration",
    "Exit fee / early repayment charge"
  ]) {
    assert.ok(rows.includes(fee), `Missing fee row: ${fee}`);
  }
  assert.match(rows, /not a buyer's condition survey/i);
  assert.match(summary.callout ?? "", /do not total every row/i);
});

test("all required mortgage-fee decisions and contextual links are covered", () => {
  for (const title of [
    "Arrangement or product fees",
    "Booking, application and reservation fees",
    "Mortgage account and other lender charges",
    "Mortgage valuation vs a buyer's survey",
    "Mortgage broker or adviser fees",
    "Is a fee-paying mortgage cheaper than a fee-free mortgage?",
    "Paying the fee upfront vs adding it to borrowing",
    "What to check in your mortgage illustration",
    "Interest rate vs APRC vs this calculator",
    "Are mortgage fees refundable if the purchase falls through?",
    "Legal costs are separate from mortgage fees",
    "Remortgage, exit and early repayment charges",
    "TrueHomeCosts mortgage-fee planning allowance"
  ]) {
    assert.ok(sectionTitles.has(title), `Missing section: ${title}`);
  }

  const content = JSON.stringify(guide);
  for (const href of [
    "/#calculator",
    "/property-survey-costs-uk",
    "/conveyancing-costs-uk"
  ]) {
    assert.ok(content.includes(`\"href\":\"${href}\"`), `Missing internal link: ${href}`);
  }
  assert.ok(guide.relatedGuides.includes("costs-before-completion"));
  assert.doesNotMatch(content, /closing costs/i);
});

test("the mortgage page removes duplicated FAQs and FAQPage schema", () => {
  assert.deepEqual(guide.faqs, []);
  assert.doesNotMatch(mortgagePageSource, /FAQSection|faqPageSchema|FAQPage/);
  assert.match(routeSource, /return <MortgageFeesPage guide={guide} \/>/);
});

test("authoritative current sources and appropriate schemas are wired", () => {
  for (const key of ["moneyHelperBuyingMoving", "moneyHelperMortgageAdvice"] as const) {
    assert.ok(guide.sourceKeys.includes(key));
    assert.match(sourceLinks[key].href, /^https:\/\//);
  }

  for (const key of [
    "fcaMortgageIllustration",
    "fcaMortgageAprc",
    "fcaMortgageBrokerAuthorisation",
    "fcaFirmChecker",
    "govUkBuyingAHome"
  ] as const) {
    assert.ok(guide.officialSourceKeys?.includes(key));
  }

  assert.match(mortgagePageSource, /webpageSchema\(/);
  assert.match(mortgagePageSource, /articleSchema\(/);
  assert.match(mortgagePageSource, /breadcrumbSchema\(/);
  assert.doesNotMatch(mortgagePageSource, /faqPageSchema/);
});

test("calculator controls, static example and privacy-safe analytics are present", () => {
  for (const label of [
    "Original mortgage amount",
    "Remaining mortgage term",
    "Comparison / deal period",
    "Arrangement / product fee",
    "How is the product fee paid?",
    "Other one-off cost",
    "Cashback / incentive",
    "Load worked example",
    "Compare deals",
    "Reset"
  ]) {
    assert.ok(calculatorSource.includes(label), `Missing calculator control: ${label}`);
  }

  assert.match(calculatorSource, /aria-live="polite"/);
  assert.match(calculatorSource, /mortgage_fee_comparison_calculated/);
  const analyticsParameters = calculatorSource.match(
    /trackEvent\("mortgage_fee_comparison_calculated",\s*\{([\s\S]*?)\}\);/
  );
  assert.ok(analyticsParameters);
  assert.doesNotMatch(
    analyticsParameters[1],
    /originalMortgageAmount|annualRatePercent|productFee/
  );
  assert.match(mortgagePageSource, /Worked example: £999 fee vs a fee-free deal/);
  assert.match(mortgagePageSource, /This is not an APRC calculation/);
});

