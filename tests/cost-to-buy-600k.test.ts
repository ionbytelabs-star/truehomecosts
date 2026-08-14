import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { extraPriceGuides } from "../content/extra-price-guides";
import { sdltStandardBands } from "../data/tax/sdlt";
import {
  calculateProgressiveTaxBreakdown,
  calculatePropertyTax,
  calculateUpfrontCosts,
  type CalculatorInput
} from "../lib/calculator";
import { calculatorInputFromSearchParams } from "../lib/calculator-query";

const guide = extraPriceGuides["cost-to-buy-600k-house"];
const coreInput: CalculatorInput = {
  propertyPrice: 600_000,
  jurisdiction: "england",
  buyerType: "home-mover",
  depositMode: "percentage",
  depositPercentage: 10,
  assumptionLevel: "average",
  includeMoving: false,
  includeInsurance: false,
  includeFurnishing: false,
  includeContingency: false,
  contingencyPercentage: 10
};

test("£600,000 standard and first-time buyer SDLT are both £20,000", () => {
  assert.equal(calculatePropertyTax(600_000, "england", "home-mover"), 20_000);
  assert.equal(calculatePropertyTax(600_000, "northern-ireland", "home-mover"), 20_000);
  assert.equal(calculatePropertyTax(600_000, "england", "first-time-buyer"), 20_000);
});

test("the shared SDLT breakdown produces £0, £2,500 and £17,500 bands", () => {
  const breakdown = calculateProgressiveTaxBreakdown(600_000, sdltStandardBands);
  assert.deepEqual(
    breakdown.map((band) => band.tax),
    [0, 2_500, 17_500]
  );
  assert.equal(breakdown.reduce((total, band) => total + band.tax, 0), 20_000);
});

test("deposit and core cash scenarios match shared calculator output", () => {
  const expected = [
    [5, 30_000, 53_030, 56_530],
    [10, 60_000, 83_030, 86_530],
    [15, 90_000, 113_030, 116_530],
    [20, 120_000, 143_030, 146_530]
  ];

  for (const [percentage, deposit, lowTotal, highTotal] of expected) {
    const low = calculateUpfrontCosts({
      ...coreInput,
      depositPercentage: percentage,
      assumptionLevel: "low"
    });
    const high = calculateUpfrontCosts({
      ...coreInput,
      depositPercentage: percentage,
      assumptionLevel: "high"
    });
    assert.equal(low.depositAmount, deposit);
    assert.equal(low.totalUpfrontCash, lowTotal);
    assert.equal(high.totalUpfrontCash, highTotal);
  }
});

test("£600k guide has unique aligned metadata and one server-rendered H1 source", () => {
  assert.equal(guide.title, "£600k House Buying Costs UK (2026): Deposit, Stamp Duty & Fees");
  assert.equal(
    guide.description,
    "Buying a £600,000 house in the UK? See the deposit, £20,000 SDLT for an England home mover, legal fees, surveys and total cash needed."
  );
  assert.equal(guide.h1, "How much does it cost to buy a £600,000 house in the UK?");
  assert.match(guide.directAnswer, /£83,030–£86,530/);
  assert.match(guide.directAnswer, /£87,170/);

  const routeSource = readFileSync("app/cost-to-buy-600k-house/page.tsx", "utf8");
  const introSource = readFileSync("components/PageIntro.tsx", "utf8");
  assert.match(routeSource, /absoluteTitle: true/);
  assert.equal((introSource.match(/<h1\b/g) ?? []).length, 1);
  assert.ok(
    introSource.indexOf("{summary ?") < introSource.indexOf("{description}"),
    "The direct answer must render before the supporting introduction"
  );
});

test("cost summary, deposit scenarios and SDLT calculation are visible guide data", () => {
  const introSections = guide.introSections ?? [];
  const summary = introSections.find((section) => section.title === "£600,000 house buying cost breakdown");
  const deposits = introSections.find(
    (section) => section.title === "How much cash do you need with different deposits?"
  );
  const sdlt = introSections.find(
    (section) => section.title === "How much Stamp Duty is payable on a £600,000 house?"
  );

  assert.ok(summary?.table?.rows.some((row) => row.includes("£83,030–£86,530")));
  assert.equal(deposits?.table?.rows.length, 4);
  assert.deepEqual(
    deposits?.table?.rows.map((row) => row[0]),
    ["5%", "10%", "15%", "20%"]
  );
  assert.ok(sdlt?.table?.rows.some((row) => row[2] === "£17,500"));
  assert.deepEqual(sdlt?.table?.rows.at(-1), ["Total", "", "£20,000"]);
});

test("calculator CTA parameters prefill the shared calculator state", () => {
  const input = calculatorInputFromSearchParams(
    new URLSearchParams(
      "propertyPrice=600000&depositPercentage=10&buyerType=home-mover&jurisdiction=england"
    )
  );
  assert.equal(input.propertyPrice, 600_000);
  assert.equal(input.depositPercentage, 10);
  assert.equal(input.buyerType, "home-mover");
  assert.equal(input.jurisdiction, "england");
  assert.match(guide.calculatorHref ?? "", /propertyPrice=600000/);
});

test("internal discovery surfaces include the £600k guide", () => {
  const homepageSource = readFileSync("app/page.tsx", "utf8");
  const hubSource = readFileSync("app/house-buying-cost-by-property-price/page.tsx", "utf8");
  const templateSource = readFileSync("components/GuidePageTemplate.tsx", "utf8");
  assert.match(homepageSource, /href="\/cost-to-buy-600k-house"/);
  assert.match(hubSource, /priceGuideLinks\.map/);
  assert.match(templateSource, /cash needed for a £600,000 house/);
  assert.match(templateSource, /Stamp Duty and fees on a £600,000 property/);
  assert.match(templateSource, /UK cost comparison for a £600,000 property/);
});

test("the specialised page and its neighbour retain distinct price-specific editorial", () => {
  const neighbouring = extraPriceGuides["cost-to-buy-750k-house"];
  assert.equal(neighbouring.h1, "Buying a £750,000 house: the full cash picture");
  assert.match(neighbouring.directAnswer, /higher progressive bands|Scotland and Wales/i);
  assert.equal(neighbouring.introSections, undefined);
  assert.notDeepEqual(
    neighbouring.sections.map((section) => section.title),
    guide.sections.map((section) => section.title)
  );
});
