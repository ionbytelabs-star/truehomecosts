import assert from "node:assert/strict";
import test from "node:test";

import {
  compareMortgageFees,
  mortgageFeeWorkedExample,
  type MortgageFeeComparisonInput
} from "../lib/mortgage-fee-comparison";

function approximately(actual: number, expected: number, tolerance = 0.02) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `Expected ${actual} to be within ${tolerance} of ${expected}`
  );
}

type OracleDeal = MortgageFeeComparisonInput["dealA"];

// Independent test oracle: an iterative month-by-month balance simulation.
// It intentionally does not import or reproduce the production closed-form balance helper.
function oracleDeal(
  mortgageAmount: number,
  termYears: number,
  comparisonMonths: number,
  deal: OracleDeal
) {
  const principal = mortgageAmount + (deal.feeTreatment === "financed" ? deal.productFee : 0);
  const monthlyRate = deal.annualRatePercent / 1200;
  const termMonths = termYears * 12;
  const monthlyPayment = monthlyRate === 0
    ? principal / termMonths
    : principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -termMonths));
  let balance = principal;
  let interest = 0;

  for (let month = 0; month < comparisonMonths; month += 1) {
    const monthInterest = balance * monthlyRate;
    interest += monthInterest;
    balance -= monthlyPayment - monthInterest;
  }

  const scheduledPayments = monthlyPayment * comparisonMonths;
  const upfrontFee = deal.feeTreatment === "upfront" ? deal.productFee : 0;
  return {
    monthlyPayment,
    interest,
    balance,
    comparisonCost:
      scheduledPayments + upfrontFee + deal.otherOneOffCost - deal.cashback + balance - mortgageAmount
  };
}

function withDeals(
  dealA: Partial<OracleDeal> = {},
  dealB: Partial<OracleDeal> = {},
  shared: Partial<Pick<MortgageFeeComparisonInput, "originalMortgageAmount" | "termYears" | "comparisonMonths">> = {}
): MortgageFeeComparisonInput {
  return {
    ...mortgageFeeWorkedExample,
    ...shared,
    dealA: { ...mortgageFeeWorkedExample.dealA, ...dealA },
    dealB: { ...mortgageFeeWorkedExample.dealB, ...dealB }
  };
}

test("matches the fixed upfront-fee fixture", () => {
  const result = compareMortgageFees(mortgageFeeWorkedExample);

  approximately(result.dealA.monthlyRepayment, 1_211.36);
  approximately(result.dealA.interestPaid, 44_319.51);
  approximately(result.dealA.remainingBalance, 196_637.66);
  approximately(result.dealA.comparisonCost, 45_318.51);
  approximately(result.dealB.monthlyRepayment, 1_230.28);
  approximately(result.dealB.interestPaid, 45_962.15);
  approximately(result.dealB.remainingBalance, 197_145.50);
  approximately(result.dealB.comparisonCost, 45_962.15);
  assert.equal(result.lowerCostDeal, "A");
  approximately(result.difference, 643.64);
  assert.equal(result.breakEvenMonth, 37);
  assert.equal(result.breakEvenDeal, "A");
});

test("matches the fixed financed-fee fixture", () => {
  const input = withDeals({ feeTreatment: "financed" });
  const result = compareMortgageFees(input);

  approximately(result.dealA.startingAmortisedBalance, 225_999);
  approximately(result.dealA.monthlyRepayment, 1_216.74);
  approximately(result.dealA.interestPaid, 44_516.29);
  approximately(result.dealA.remainingBalance, 197_510.73);
  approximately(result.dealA.comparisonCost, 45_515.29);
  approximately(result.dealA.additionalInterestFromFinancingFee, 196.78);
  approximately(result.difference, 446.86);
  assert.equal(result.lowerCostDeal, "A");
  assert.equal(result.breakEvenMonth, 42);
});

test("handles zero interest without NaN or Infinity", () => {
  const input = withDeals(
    { annualRatePercent: 0, productFee: 0 },
    { annualRatePercent: 0, productFee: 0 }
  );
  const result = compareMortgageFees(input);

  approximately(result.dealA.monthlyRepayment, 750);
  approximately(result.dealA.interestPaid, 0);
  assert.ok(Object.values(result.dealA).every((value) => typeof value !== "number" || Number.isFinite(value)));
});

test("identical rates with different fees favour the lower fee", () => {
  const result = compareMortgageFees(withDeals(
    { annualRatePercent: 4, productFee: 999 },
    { annualRatePercent: 4, productFee: 0 }
  ));
  assert.equal(result.lowerCostDeal, "B");
  approximately(result.difference, 999);
  assert.equal(result.breakEvenMonth, null);
});

test("identical deals produce an equal result", () => {
  const result = compareMortgageFees(withDeals(
    { annualRatePercent: 4, productFee: 500 },
    { annualRatePercent: 4, productFee: 500 }
  ));
  assert.equal(result.lowerCostDeal, "equal");
  approximately(result.difference, 0);
});

test("cashback decreases comparison cost pound for pound", () => {
  const withoutCashback = compareMortgageFees(withDeals({ cashback: 0 }));
  const withCashback = compareMortgageFees(withDeals({ cashback: 500 }));
  approximately(withoutCashback.dealA.comparisonCost - withCashback.dealA.comparisonCost, 500);
});

test("other one-off costs increase comparison cost pound for pound", () => {
  const withoutOtherCost = compareMortgageFees(withDeals({ otherOneOffCost: 0 }));
  const withOtherCost = compareMortgageFees(withDeals({ otherOneOffCost: 325 }));
  approximately(withOtherCost.dealA.comparisonCost - withoutOtherCost.dealA.comparisonCost, 325);
});

test("comparison period cannot exceed the remaining term", () => {
  assert.throws(
    () => compareMortgageFees(withDeals({}, {}, { termYears: 2, comparisonMonths: 25 })),
    /cannot exceed/i
  );
});

test("negative and non-finite values are rejected", () => {
  assert.throws(() => compareMortgageFees(withDeals({ productFee: -1 })), /zero or more/i);
  assert.throws(
    () => compareMortgageFees({ ...mortgageFeeWorkedExample, originalMortgageAmount: Number.NaN }),
    /finite/i
  );
  assert.throws(() => compareMortgageFees(withDeals({ annualRatePercent: Infinity })), /finite/i);
});

test("detects the fixed break-even month and no-break-even cases", () => {
  assert.equal(compareMortgageFees(mortgageFeeWorkedExample).breakEvenMonth, 37);
  assert.equal(
    compareMortgageFees(withDeals({ annualRatePercent: 4.33, productFee: 1_999 })).breakEvenMonth,
    null
  );
});

test("financing a fee raises period interest but can reduce upfront cash", () => {
  const upfront = compareMortgageFees(mortgageFeeWorkedExample);
  const financed = compareMortgageFees(withDeals({ feeTreatment: "financed" }));

  assert.ok(financed.dealA.interestPaid > upfront.dealA.interestPaid);
  assert.ok(financed.dealA.comparisonCost > upfront.dealA.comparisonCost);
  approximately(
    financed.dealA.comparisonCost - upfront.dealA.comparisonCost,
    financed.dealA.additionalInterestFromFinancingFee
  );
});

test("production output agrees with an independent iterative oracle", () => {
  const scenarios = [
    mortgageFeeWorkedExample,
    withDeals({ feeTreatment: "financed" }),
    withDeals(
      { annualRatePercent: 0, productFee: 499, feeTreatment: "financed", cashback: 100 },
      { annualRatePercent: 5.75, productFee: 0, otherOneOffCost: 250 },
      { originalMortgageAmount: 480_000, termYears: 30, comparisonMonths: 24 }
    ),
    withDeals(
      { annualRatePercent: 6.1, productFee: 1_499, otherOneOffCost: 125 },
      { annualRatePercent: 6.35, productFee: 0, cashback: 500 },
      { originalMortgageAmount: 90_000, termYears: 10, comparisonMonths: 120 }
    )
  ];

  for (const scenario of scenarios) {
    const production = compareMortgageFees(scenario);
    const oracleA = oracleDeal(
      scenario.originalMortgageAmount,
      scenario.termYears,
      scenario.comparisonMonths,
      scenario.dealA
    );
    const oracleB = oracleDeal(
      scenario.originalMortgageAmount,
      scenario.termYears,
      scenario.comparisonMonths,
      scenario.dealB
    );

    approximately(production.dealA.monthlyRepayment, oracleA.monthlyPayment);
    approximately(production.dealA.interestPaid, oracleA.interest);
    approximately(production.dealA.remainingBalance, oracleA.balance);
    approximately(production.dealA.comparisonCost, oracleA.comparisonCost);
    approximately(production.dealB.monthlyRepayment, oracleB.monthlyPayment);
    approximately(production.dealB.interestPaid, oracleB.interest);
    approximately(production.dealB.remainingBalance, oracleB.balance);
    approximately(production.dealB.comparisonCost, oracleB.comparisonCost);
  }
});
