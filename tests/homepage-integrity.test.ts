import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { guideMap } from "../content/guides";
import { homePageFaqs, homepageGuides, homeScenarioInputs } from "../content/home";
import {
  calculatorCostAssumptionById,
  calculatorCostAssumptions,
  calculatorMetadata,
  homepageCostRows
} from "../data/assumptions/calculator";
import { calculateUpfrontCosts } from "../lib/calculator";
import { popularBuyingCostExampleSlugs, priceGuideLinks } from "../lib/price-guide-links";

const pageSource = readFileSync("app/page.tsx", "utf8");
const heroSource = readFileSync("components/Hero.tsx", "utf8");

test("homepage has exactly one approved H1", () => {
  assert.equal((heroSource.match(/<h1\b/g) ?? []).length + (pageSource.match(/<h1\b/g) ?? []).length, 1);
  assert.match(heroSource, /UK House Buying Cost Calculator/);
});

test("calculator appears before editorial sections", () => {
  assert.ok(pageSource.indexOf("<CalculatorForm") < pageSource.indexOf("What the result includes"));
});

test("approved metadata and canonical path are present", () => {
  assert.match(pageSource, /UK House Buying Cost Calculator 2026 \| TrueHomeCosts/);
  assert.match(pageSource, /Calculate the total upfront cost of buying a home in the UK/);
  assert.match(pageSource, /path: "\/"/);
});

test("homepage displays exactly six price examples and links to the hub", () => {
  assert.equal(popularBuyingCostExampleSlugs.length, 6);
  assert.match(pageSource, /View buying costs for all property prices/);
  assert.match(pageSource, /house-buying-cost-by-property-price/);
  assert.equal(priceGuideLinks.length, 16);
});

test("homepage ranges and review details come from central data", () => {
  assert.equal(homepageCostRows.length, 12);
  assert.match(pageSource, /homepageCostRows\.map/);
  assert.match(pageSource, /calculatorCostAssumptionById\.get/);
  assert.doesNotMatch(pageSource, /£\d/);
  assert.doesNotMatch(JSON.stringify(homepageCostRows), /£\d/);
  assert.equal(calculatorMetadata.dataVersion, "2026.07.1");
  assert.equal(calculatorMetadata.lastReviewed, "2026-07-19");
});

test("homepage cost table uses the twelve distinct calculator categories in order", () => {
  const expectedLabels = [
    "Deposit",
    "Property tax",
    "Solicitor/conveyancing",
    "Search fees",
    "Survey and valuation",
    "Mortgage fees",
    "Registration fee or allowance",
    "Bank transfer fee",
    "Moving costs",
    "Insurance",
    "Furnishing and setup",
    "Contingency"
  ];

  assert.deepEqual(homepageCostRows.map((row) => row.label), expectedLabels);
  for (const label of expectedLabels) {
    assert.equal(homepageCostRows.filter((row) => row.label === label).length, 1);
  }
  assert.equal(homepageCostRows.filter((row) => row.label === "Moving and setup").length, 0);
  assert.equal(homepageCostRows.filter((row) => row.label === "Legal and registration").length, 0);
});

test("legal, search, registration and bank-transfer rows remain separate", () => {
  const labels = new Set(homepageCostRows.map((row) => row.label));
  assert.ok(labels.has("Solicitor/conveyancing"));
  assert.ok(labels.has("Search fees"));
  assert.ok(labels.has("Registration fee or allowance"));
  assert.ok(labels.has("Bank transfer fee"));
  assert.ok(!labels.has("Legal and registration"));
});

test("homepage table classifications match calculator result language", () => {
  const row = (id: string) => {
    const match = homepageCostRows.find((item) => item.id === id);
    assert.ok(match, `Missing homepage cost row: ${id}`);
    return match;
  };

  assert.doesNotMatch(row("solicitors").basis, /Official/i);
  assert.doesNotMatch(row("searches").basis, /Official/i);
  assert.doesNotMatch(row("telegraphic-transfer").basis, /Official/i);
  assert.match(row("registration").basis, /Official charge/);
  assert.match(row("registration").basis, /adjustable allowance/);
  assert.match(row("moving").basis, /Optional allowance/);
  assert.match(row("insurance").basis, /Optional allowance/);
  assert.match(row("furnishing").basis, /Optional allowance/);
  assert.match(row("contingency").basis, /Optional allowance/);
  assert.doesNotMatch(row("insurance").label, /Moving/i);
  assert.doesNotMatch(row("furnishing").label, /^Moving/i);
});

test("every homepage cost row resolves to centrally classified assumptions", () => {
  const validClassifications = new Set([
    "official-calculation",
    "official-charge",
    "market-estimate",
    "user-entered",
    "optional-allowance",
    "adjustable-allowance"
  ]);

  for (const row of homepageCostRows) {
    assert.ok(row.assumptionIds.length > 0);
    for (const assumptionId of row.assumptionIds) {
      const assumption = calculatorCostAssumptionById.get(assumptionId);
      assert.ok(assumption, `Missing central assumption: ${assumptionId}`);
      assert.ok(validClassifications.has(assumption.classification));
    }
  }
});

test("registration wording preserves official and jurisdiction-specific safeguards", () => {
  const registrationRow = homepageCostRows.find((row) => row.id === "registration");
  assert.ok(registrationRow);
  assert.match(registrationRow.planningBasis ?? "", /England and Wales/);
  assert.match(registrationRow.planningBasis ?? "", /Scotland and Northern Ireland/);

  const englandResult = calculateUpfrontCosts({
    ...homeScenarioInputs[0].input,
    jurisdiction: "england"
  });
  const englandRegistration = englandResult.breakdown.find((line) => line.key === "land-registry");
  assert.equal(englandRegistration?.classification, "official-charge");

  const northernIrelandResult = calculateUpfrontCosts({
    ...homeScenarioInputs[0].input,
    jurisdiction: "northern-ireland"
  });
  const northernIrelandRegistration = northernIrelandResult.breakdown.find(
    (line) => line.key === "land-registry"
  );
  assert.equal(northernIrelandRegistration?.classification, "market-estimate");
  assert.doesNotMatch(northernIrelandRegistration?.detail ?? "", /HM Land Registry/i);
});

test("official assumptions have sources and dates and estimates are not official", () => {
  for (const assumption of calculatorCostAssumptions) {
    if (assumption.classification.startsWith("official-")) {
      assert.ok(assumption.sourceName);
      assert.ok(assumption.sourceUrl);
      assert.ok(assumption.lastVerified);
    }
    if (assumption.classification === "market-estimate") {
      assert.notEqual(assumption.classification, "official-charge");
    }
  }
});

test("worked examples are generated by production calculation functions", () => {
  for (const scenario of homeScenarioInputs) {
    assert.ok(calculateUpfrontCosts(scenario.input).totalUpfrontCash > scenario.input.propertyPrice * 0.1);
  }
});

test("five visible FAQs share the schema source", () => {
  assert.equal(homePageFaqs.length, 5);
  assert.match(pageSource, /faqPageSchema\(homePageFaqs/);
  assert.match(pageSource, /<FAQSection items=\{homePageFaqs/);
});

test("every homepage guide resolves through the existing guide catalogue", () => {
  for (const guide of homepageGuides) assert.ok(guideMap[guide.slug], `Missing homepage guide ${guide.slug}`);
});

test("review date drives visible copy and structured data", () => {
  assert.match(pageSource, /calculatorMetadata\.lastReviewedLabel/);
  assert.match(pageSource, /dateModified: calculatorMetadata\.lastReviewed/);
});
