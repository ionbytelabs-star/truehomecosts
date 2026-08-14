import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import { extraPriceGuides } from "../content/extra-price-guides";
import { guideMap } from "../content/guides";
import {
  calculatorCostAssumptions,
  calculatorMetadata,
  homepageCostRows
} from "../data/assumptions/calculator";
import { officialSourceVerification } from "../data/editorial/source-verification";
import { getScotlandRegistrationFee } from "../data/fees/scotland";
import { calculatePropertyTax, calculateUpfrontCosts, type CalculatorInput } from "../lib/calculator";
import {
  calculateScopeRange,
  coreNonTaxTransactionKeys,
  costScopeDefinitions,
  getScopeTotal
} from "../lib/cost-scopes";
import { priceGuideLinks } from "../lib/price-guide-links";

const baseInput: CalculatorInput = {
  propertyPrice: 300_000,
  jurisdiction: "england",
  buyerType: "home-mover",
  depositMode: "percentage",
  depositPercentage: 10,
  assumptionLevel: "average",
  includeMoving: true,
  includeInsurance: true,
  includeFurnishing: false,
  includeContingency: true,
  contingencyPercentage: 10
};

const allPriceGuides = Object.fromEntries(
  priceGuideLinks.map(({ slug }) => [slug, guideMap[slug] ?? extraPriceGuides[slug]])
);
const publicConsistencyContent = JSON.stringify([
  ...Object.values(allPriceGuides),
  ...[
    "hidden-costs-buying-house",
    "how-much-money-needed-buy-house",
    "first-time-buyer-costs",
    "mortgage-fees-costs",
    "moving-costs-uk",
    "insurance-costs-uk",
    "furnishing-costs-uk",
    "first-year-cost-buying-house-uk",
    "stamp-duty-explained",
    "taxes-and-fees-uk"
  ].map((slug) => guideMap[slug])
]);

test("the eight retained property-price pages resolve with price-specific editorial", () => {
  assert.equal(priceGuideLinks.length, 8);
  for (const { slug } of priceGuideLinks) assert.ok(allPriceGuides[slug], `Missing ${slug}`);
});

test("every price page declares a visible scenario and production-calculated total", () => {
  for (const [slug, guide] of Object.entries(allPriceGuides)) {
    const price = Number(slug.match(/(\d+)k/)?.[1]) * 1_000;
    const expected = calculateUpfrontCosts({ ...baseInput, propertyPrice: price });
    assert.match(guide.directAnswer, /10% deposit/i);
    assert.ok(guide.directAnswer.includes(expected.totalUpfrontCash.toLocaleString("en-GB")));
  }
});

test("every price page links to calculator, hub, methodology, tax and cash-needed content", () => {
  const required = ["/#calculator", "/house-buying-cost-by-property-price", "/methodology", "/stamp-duty-explained", "/how-much-money-needed-buy-house"];
  for (const guide of Object.values(allPriceGuides)) {
    const links = new Set(guide.contextualLinks?.map((link) => link.href));
    for (const href of required) assert.ok(links.has(href), `${guide.slug} missing ${href}`);
  }
});

test("retained price-page titles, H1s, reviews and editorial bodies are unique and complete", () => {
  const titles = Object.values(allPriceGuides).map((guide) => guide.title);
  const sectionSignatures = Object.values(allPriceGuides).map((guide) =>
    guide.sections.map((section) => section.title).join("|")
  );
  assert.equal(new Set(titles).size, 8);
  assert.equal(new Set(sectionSignatures).size, 8);
  for (const guide of Object.values(allPriceGuides)) {
    assert.match(guide.h1, /£[\d,]+/);
    assert.equal(guide.lastReviewed, "2026-07-19");
    assert.equal(guide.calculatorDataVersion, calculatorMetadata.dataVersion);
  }
});

test("known legacy ranges and deprecated combined labels are absent from generated public content", () => {
  for (const obsolete of ["£800–£1,800", "£300–£1,000", "£500–£2,500", "Moving and setup costs"]) {
    assert.ok(!publicConsistencyContent.includes(obsolete), `Obsolete public value: ${obsolete}`);
  }
});

test("hidden-cost guide states exactly what its headline range excludes", () => {
  const guide = guideMap["hidden-costs-buying-house"];
  assert.match(guide.directAnswer, /excluding the deposit and property tax/i);
  assert.match(JSON.stringify(guide.sections), /Moving and insurance/);
  assert.match(JSON.stringify(guide.sections), /Optional furnishing and setup/);
  assert.match(JSON.stringify(guide.sections), /Contingency/);
});

test("cash-needed guide separates affordability from upfront cash", () => {
  const content = JSON.stringify(guideMap["how-much-money-needed-buy-house"]);
  assert.match(content, /Mortgage affordability is a different question/);
  assert.match(content, /Deposit/);
  assert.match(content, /Property tax/);
  assert.match(content, /Optional planning lines/);
});

test("first-time buyer guide contains calculator-derived jurisdiction examples", () => {
  const content = JSON.stringify(guideMap["first-time-buyer-costs"]);
  assert.match(content, /England \/ Northern Ireland/);
  assert.match(content, /Scotland/);
  assert.match(content, /Wales/);
  assert.equal(calculatePropertyTax(300_000, "england", "first-time-buyer"), 0);
});

test("mortgage, moving, insurance and furnishing guides share central category values", () => {
  const mortgageGuide = guideMap["mortgage-fees-costs"];
  assert.match(mortgageGuide.directAnswer, /combined planning allowance/i);
  assert.match(JSON.stringify(mortgageGuide), /Replace the (?:calculator allowance|allowance)/i);

  for (const slug of ["moving-costs-uk", "insurance-costs-uk", "furnishing-costs-uk"]) {
    const guide = guideMap[slug];
    assert.match(guide.directAnswer, /central low-to-high/i);
    assert.match(JSON.stringify(guide.sections), /Replace the planning amount with a current quotation|Enter the quotation/);
  }
});

test("every central assumption has a unique stable ID and classification", () => {
  assert.equal(new Set(calculatorCostAssumptions.map((item) => item.id)).size, calculatorCostAssumptions.length);
  for (const assumption of calculatorCostAssumptions) {
    assert.ok(assumption.classification);
    assert.ok(assumption.jurisdictions.length > 0);
    assert.equal(typeof assumption.optional, "boolean");
    assert.equal(typeof assumption.userOverride, "boolean");
  }
});

test("official assumptions and rules have sources and verification dates", () => {
  for (const assumption of calculatorCostAssumptions.filter((item) => item.classification.startsWith("official-"))) {
    assert.ok(assumption.sourceName);
    assert.ok(assumption.sourceUrl);
    assert.equal(assumption.lastVerified, "2026-07-19");
  }
  assert.ok(officialSourceVerification.length >= 7);
});

test("Scotland registration uses the official disposition scale", () => {
  assert.equal(getScotlandRegistrationFee(300_000), 530);
  assert.equal(getScotlandRegistrationFee(500_000), 660);
  const registration = calculateUpfrontCosts({ ...baseInput, jurisdiction: "scotland" }).breakdown.find((line) => line.key === "land-registry");
  assert.equal(registration?.classification, "official-charge");
  assert.equal(registration?.sourceName, "Registers of Scotland");
});

test("derived core non-tax range equals its documented category sum", () => {
  const { assumptionLevel: _level, ...withoutLevel } = baseInput;
  const range = calculateScopeRange(withoutLevel, "core-non-tax-transaction-costs");
  for (const [level, expected] of [["low", range.minimum], ["average", range.typical], ["high", range.maximum]] as const) {
    const result = calculateUpfrontCosts({ ...baseInput, assumptionLevel: level });
    const manual = result.breakdown.filter((line) => coreNonTaxTransactionKeys.includes(line.key as never)).reduce((sum, line) => sum + line.value, 0);
    assert.equal(expected, manual);
    assert.equal(expected, getScopeTotal(result, "core-non-tax-transaction-costs"));
  }
});

test("scope definitions explicitly separate moving, insurance and furnishing", () => {
  assert.match(costScopeDefinitions["wider-moving-and-insurance"], /Moving costs and insurance only/);
  assert.match(costScopeDefinitions["wider-moving-and-insurance"], /Furnishing and setup are excluded/);
  assert.match(costScopeDefinitions["optional-furnishing-and-setup"], /furnishing and setup allowance only/i);
});

test("Northern Ireland public content never assigns HMLR registration treatment", () => {
  const ni = calculateUpfrontCosts({ ...baseInput, jurisdiction: "northern-ireland" });
  const registration = ni.breakdown.find((line) => line.key === "land-registry");
  assert.doesNotMatch(`${registration?.label} ${registration?.detail}`, /HM Land Registry/i);
  assert.match(`${registration?.label} ${registration?.detail}`, /Northern Ireland|LPS/i);
});

test("tax guides preserve correct jurisdiction names", () => {
  for (const slug of ["stamp-duty-explained", "taxes-and-fees-uk"]) {
    const content = JSON.stringify(guideMap[slug]);
    assert.match(content, /Scotland uses LBTT/);
    assert.match(content, /Wales uses LTT/);
    assert.match(content, /Northern Ireland is never described as an HM Land Registry charge/);
  }
});

test("guide template wires the visible review date into schema", () => {
  const source = readFileSync("components/GuidePageTemplate.tsx", "utf8");
  assert.match(source, /dateModified: guide\.lastReviewed/);
  assert.match(source, /lastReviewed=\{guide\.lastReviewedLabel\}/);
});

test("methodology, change log and corrections route are public", () => {
  assert.ok(existsSync("app/methodology/page.tsx"));
  assert.ok(existsSync("app/calculator-updates/page.tsx"));
  assert.ok(existsSync("app/contact/page.tsx"));
  assert.match(readFileSync("app/contact/page.tsx", "utf8"), /incorrect tax result, outdated fee, misleading wording or calculator fault/i);
});

test("homepage taxonomy remains the same twelve ordered categories", () => {
  assert.equal(homepageCostRows.length, 12);
  assert.deepEqual(homepageCostRows.map((row) => row.label), [
    "Deposit", "Property tax", "Solicitor/conveyancing", "Search fees", "Survey and valuation", "Mortgage fees", "Registration fee or allowance", "Bank transfer fee", "Moving costs", "Insurance", "Furnishing and setup", "Contingency"
  ]);
});
