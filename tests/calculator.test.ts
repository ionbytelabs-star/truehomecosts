import assert from "node:assert/strict";
import test from "node:test";

import { calculatePropertyTax, calculateUpfrontCosts, type CalculatorInput } from "../lib/calculator";

const baseInput: CalculatorInput = {
  propertyPrice: 300_000,
  jurisdiction: "england",
  buyerType: "home-mover",
  depositMode: "percentage",
  depositPercentage: 10,
  assumptionLevel: "average",
  includeMoving: true,
  includeFurnishing: false,
  includeInsurance: true,
  includeContingency: true,
  contingencyPercentage: 10
};

test("calculates England SDLT for a home mover", () => {
  assert.equal(calculatePropertyTax(300_000, "england", "home-mover"), 5_000);
});

test("calculates Scotland LBTT", () => {
  assert.equal(calculatePropertyTax(300_000, "scotland", "home-mover"), 4_600);
});

test("calculates Wales LTT", () => {
  assert.equal(calculatePropertyTax(300_000, "wales", "home-mover"), 4_500);
});

test("uses SDLT rules for Northern Ireland", () => {
  assert.equal(calculatePropertyTax(300_000, "northern-ireland", "home-mover"), 5_000);
});

test("applies first-time buyer treatment", () => {
  assert.equal(calculatePropertyTax(300_000, "england", "first-time-buyer"), 0);
  assert.equal(calculatePropertyTax(500_001, "england", "first-time-buyer"), 15_000);
});

test("applies home-mover threshold boundaries", () => {
  assert.equal(calculatePropertyTax(125_000, "england", "home-mover"), 0);
  assert.equal(calculatePropertyTax(250_000, "england", "home-mover"), 2_500);
});

test("applies additional-property treatment", () => {
  assert.equal(calculatePropertyTax(300_000, "england", "additional-property"), 20_000);
});

test("handles zero and rounds decimal tax results", () => {
  assert.equal(calculatePropertyTax(0, "england", "home-mover"), 0);
  assert.equal(calculatePropertyTax(300_000.4, "england", "home-mover"), 5_000);
});

test("calculates percentage deposits", () => {
  assert.equal(calculateUpfrontCosts({ ...baseInput, depositPercentage: 12.5 }).depositAmount, 37_500);
});

test("uses user-adjusted estimates and labels them correctly", () => {
  const result = calculateUpfrontCosts({ ...baseInput, costOverrides: { solicitors: 1_234 } });
  const legal = result.breakdown.find((line) => line.key === "solicitors");
  assert.equal(legal?.value, 1_234);
  assert.equal(legal?.classification, "user-entered");
});

test("includes and excludes optional costs", () => {
  const included = calculateUpfrontCosts({ ...baseInput, includeMoving: true });
  const excluded = calculateUpfrontCosts({ ...baseInput, includeMoving: false });
  assert.ok(included.breakdown.some((line) => line.key === "moving"));
  assert.ok(!excluded.breakdown.some((line) => line.key === "moving"));
  assert.ok(included.totalUpfrontCash > excluded.totalUpfrontCash);
});

test("calculates and removes contingency without stale totals", () => {
  const included = calculateUpfrontCosts({ ...baseInput, includeContingency: true });
  const excluded = calculateUpfrontCosts({ ...baseInput, includeContingency: false });
  assert.equal(included.totalUpfrontCash - excluded.totalUpfrontCash, included.contingencyAmount);
  assert.equal(excluded.contingencyAmount, 0);
});

test("total equals the complete breakdown", () => {
  const result = calculateUpfrontCosts(baseInput);
  assert.equal(result.totalUpfrontCash, result.breakdown.reduce((sum, line) => sum + line.value, 0));
});

test("Northern Ireland registration is an LPS-based estimate, never HMLR official", () => {
  const result = calculateUpfrontCosts({ ...baseInput, jurisdiction: "northern-ireland" });
  const registration = result.breakdown.find((line) => line.key === "land-registry");
  assert.equal(registration?.value, 445);
  assert.equal(registration?.classification, "market-estimate");
  assert.doesNotMatch(registration?.detail ?? "", /HM Land Registry/i);
});

test("every official breakdown charge has a source and verification date", () => {
  const result = calculateUpfrontCosts(baseInput);
  for (const line of result.breakdown.filter((item) => item.classification.startsWith("official-"))) {
    assert.ok(line.sourceName);
    assert.ok(line.sourceUrl);
    assert.equal(line.lastVerified, "2026-07-19");
  }
});
