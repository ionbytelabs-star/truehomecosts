export type FeeTreatment = "upfront" | "financed";

export type MortgageDealInput = {
  annualRatePercent: number;
  productFee: number;
  feeTreatment: FeeTreatment;
  otherOneOffCost: number;
  cashback: number;
};

export type MortgageFeeComparisonInput = {
  originalMortgageAmount: number;
  termYears: number;
  comparisonMonths: number;
  dealA: MortgageDealInput;
  dealB: MortgageDealInput;
};

export type MortgageDealResult = {
  startingAmortisedBalance: number;
  monthlyRepayment: number;
  scheduledPayments: number;
  interestPaid: number;
  remainingBalance: number;
  productFee: number;
  feeTreatment: FeeTreatment;
  otherOneOffCost: number;
  cashback: number;
  additionalInterestFromFinancingFee: number;
  comparisonCost: number;
};

export type MortgageFeeComparisonResult = {
  dealA: MortgageDealResult;
  dealB: MortgageDealResult;
  lowerCostDeal: "A" | "B" | "equal";
  difference: number;
  breakEvenMonth: number | null;
  breakEvenDeal: "A" | "B" | null;
};

export const mortgageFeeWorkedExample: MortgageFeeComparisonInput = {
  originalMortgageAmount: 225_000,
  termYears: 25,
  comparisonMonths: 60,
  dealA: {
    annualRatePercent: 4.19,
    productFee: 999,
    feeTreatment: "upfront",
    otherOneOffCost: 0,
    cashback: 0
  },
  dealB: {
    annualRatePercent: 4.34,
    productFee: 0,
    feeTreatment: "upfront",
    otherOneOffCost: 0,
    cashback: 0
  }
};

const equalityTolerance = 0.005;

function assertFiniteNonNegative(value: number, label: string) {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(`${label} must be a finite value of zero or more.`);
  }
}

function validateDeal(deal: MortgageDealInput, label: string) {
  assertFiniteNonNegative(deal.annualRatePercent, `${label} interest rate`);
  assertFiniteNonNegative(deal.productFee, `${label} product fee`);
  assertFiniteNonNegative(deal.otherOneOffCost, `${label} other one-off cost`);
  assertFiniteNonNegative(deal.cashback, `${label} cashback`);

  if (deal.annualRatePercent > 100) {
    throw new RangeError(`${label} interest rate must be 100% or less.`);
  }

  if (deal.feeTreatment !== "upfront" && deal.feeTreatment !== "financed") {
    throw new RangeError(`${label} fee treatment must be upfront or financed.`);
  }
}

export function validateMortgageFeeComparisonInput(input: MortgageFeeComparisonInput) {
  assertFiniteNonNegative(input.originalMortgageAmount, "Mortgage amount");
  assertFiniteNonNegative(input.termYears, "Mortgage term");
  assertFiniteNonNegative(input.comparisonMonths, "Comparison period");

  if (input.originalMortgageAmount === 0) {
    throw new RangeError("Mortgage amount must be greater than zero.");
  }

  const termMonths = input.termYears * 12;
  if (termMonths <= 0 || !Number.isInteger(termMonths)) {
    throw new RangeError("Mortgage term must resolve to a whole number of months.");
  }

  if (input.comparisonMonths <= 0 || !Number.isInteger(input.comparisonMonths)) {
    throw new RangeError("Comparison period must be a whole number of months greater than zero.");
  }

  if (input.comparisonMonths > termMonths) {
    throw new RangeError("Comparison period cannot exceed the remaining mortgage term.");
  }

  validateDeal(input.dealA, "Deal A");
  validateDeal(input.dealB, "Deal B");
}

function amortisationAtMonth(principal: number, annualRatePercent: number, termMonths: number, month: number) {
  const monthlyRate = annualRatePercent / 100 / 12;

  if (monthlyRate === 0) {
    const monthlyRepayment = principal / termMonths;
    const scheduledPayments = monthlyRepayment * month;
    const remainingBalance = Math.max(0, principal - scheduledPayments);
    return {
      monthlyRepayment,
      scheduledPayments,
      remainingBalance,
      interestPaid: 0
    };
  }

  const termGrowth = Math.pow(1 + monthlyRate, termMonths);
  const monthlyRepayment = principal * monthlyRate * termGrowth / (termGrowth - 1);
  const elapsedGrowth = Math.pow(1 + monthlyRate, month);
  const rawRemainingBalance =
    principal * elapsedGrowth - monthlyRepayment * ((elapsedGrowth - 1) / monthlyRate);
  const remainingBalance = Math.abs(rawRemainingBalance) < equalityTolerance
    ? 0
    : Math.max(0, rawRemainingBalance);
  const scheduledPayments = monthlyRepayment * month;
  const interestPaid = scheduledPayments - (principal - remainingBalance);

  return { monthlyRepayment, scheduledPayments, remainingBalance, interestPaid };
}

function calculateDealAtMonth(
  originalMortgageAmount: number,
  termMonths: number,
  comparisonMonth: number,
  deal: MortgageDealInput
): MortgageDealResult {
  const financedProductFee = deal.feeTreatment === "financed" ? deal.productFee : 0;
  const upfrontProductFee = deal.feeTreatment === "upfront" ? deal.productFee : 0;
  const startingAmortisedBalance = originalMortgageAmount + financedProductFee;
  const amortisation = amortisationAtMonth(
    startingAmortisedBalance,
    deal.annualRatePercent,
    termMonths,
    comparisonMonth
  );
  const withoutFinancedFee = amortisationAtMonth(
    originalMortgageAmount,
    deal.annualRatePercent,
    termMonths,
    comparisonMonth
  );
  const additionalInterestFromFinancingFee = deal.feeTreatment === "financed"
    ? amortisation.interestPaid - withoutFinancedFee.interestPaid
    : 0;
  const cashPaidDuringPeriod =
    amortisation.scheduledPayments + upfrontProductFee + deal.otherOneOffCost - deal.cashback;
  const comparisonCost =
    cashPaidDuringPeriod + amortisation.remainingBalance - originalMortgageAmount;

  const numericValues = [
    startingAmortisedBalance,
    amortisation.monthlyRepayment,
    amortisation.scheduledPayments,
    amortisation.interestPaid,
    amortisation.remainingBalance,
    additionalInterestFromFinancingFee,
    comparisonCost
  ];
  if (numericValues.some((value) => !Number.isFinite(value))) {
    throw new RangeError("The entered values could not produce a finite mortgage comparison.");
  }

  return {
    startingAmortisedBalance,
    monthlyRepayment: amortisation.monthlyRepayment,
    scheduledPayments: amortisation.scheduledPayments,
    interestPaid: amortisation.interestPaid,
    remainingBalance: amortisation.remainingBalance,
    productFee: deal.productFee,
    feeTreatment: deal.feeTreatment,
    otherOneOffCost: deal.otherOneOffCost,
    cashback: deal.cashback,
    additionalInterestFromFinancingFee,
    comparisonCost
  };
}

function comparisonAtMonth(input: MortgageFeeComparisonInput, month: number) {
  const termMonths = input.termYears * 12;
  return {
    dealA: calculateDealAtMonth(input.originalMortgageAmount, termMonths, month, input.dealA),
    dealB: calculateDealAtMonth(input.originalMortgageAmount, termMonths, month, input.dealB)
  };
}

function findBreakEven(input: MortgageFeeComparisonInput) {
  const aIsHigherFeeLowerRate =
    input.dealA.productFee > input.dealB.productFee &&
    input.dealA.annualRatePercent < input.dealB.annualRatePercent;
  const bIsHigherFeeLowerRate =
    input.dealB.productFee > input.dealA.productFee &&
    input.dealB.annualRatePercent < input.dealA.annualRatePercent;

  if (!aIsHigherFeeLowerRate && !bIsHigherFeeLowerRate) {
    return { breakEvenMonth: null, breakEvenDeal: null } as const;
  }

  const candidate = aIsHigherFeeLowerRate ? "A" : "B";
  const initial = comparisonAtMonth(input, 0);
  let priorDifference = candidate === "A"
    ? initial.dealA.comparisonCost - initial.dealB.comparisonCost
    : initial.dealB.comparisonCost - initial.dealA.comparisonCost;

  for (let month = 1; month <= input.comparisonMonths; month += 1) {
    const current = comparisonAtMonth(input, month);
    const currentDifference = candidate === "A"
      ? current.dealA.comparisonCost - current.dealB.comparisonCost
      : current.dealB.comparisonCost - current.dealA.comparisonCost;

    if (priorDifference > equalityTolerance && currentDifference <= equalityTolerance) {
      return { breakEvenMonth: month, breakEvenDeal: candidate } as const;
    }
    priorDifference = currentDifference;
  }

  return { breakEvenMonth: null, breakEvenDeal: null } as const;
}

export function compareMortgageFees(input: MortgageFeeComparisonInput): MortgageFeeComparisonResult {
  validateMortgageFeeComparisonInput(input);
  const { dealA, dealB } = comparisonAtMonth(input, input.comparisonMonths);
  const signedDifference = dealA.comparisonCost - dealB.comparisonCost;
  const lowerCostDeal = Math.abs(signedDifference) <= equalityTolerance
    ? "equal"
    : signedDifference < 0
      ? "A"
      : "B";
  const breakEven = findBreakEven(input);

  return {
    dealA,
    dealB,
    lowerCostDeal,
    difference: Math.abs(signedDifference),
    ...breakEven
  };
}
