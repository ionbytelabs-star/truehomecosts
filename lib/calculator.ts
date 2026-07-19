import { furnishingCostBands } from "../data/assumptions/furnishing";
import { insuranceAllowanceByJurisdiction } from "../data/assumptions/insurance";
import { mortgageFeeBands } from "../data/assumptions/mortgageFees";
import { movingCostBands } from "../data/assumptions/moving";
import { searchFeeByJurisdiction } from "../data/assumptions/searches";
import { solicitorFeeBands } from "../data/assumptions/solicitors";
import { surveyFeeBands } from "../data/assumptions/surveys";
import { telegraphicTransferFee } from "../data/assumptions/transfers";
import type { CostClassification } from "../data/assumptions/calculator";
import type { PriceBandRange } from "../data/assumptions/types";
import { hmlrElectronicScale1Fees } from "../data/fees/hmlr";
import { getNorthernIrelandRegistrationAllowance } from "../data/fees/northern-ireland";
import { getScotlandRegistrationFee, scotlandRegistrationSourceUrl } from "../data/fees/scotland";
import { lbttAdsRate, lbttFirstTimeBuyerBands, lbttStandardBands } from "../data/tax/lbtt";
import { lttHigherResidentialBands, lttMainResidentialBands } from "../data/tax/ltt";
import {
  sdltAdditionalPropertySurchargeRate,
  sdltFirstTimeBuyerBands,
  sdltStandardBands
} from "../data/tax/sdlt";
import { clampNumber } from "./format";
import type { AssumptionLevel, BuyerType, Jurisdiction } from "./site";

export type DepositMode = "amount" | "percentage";

export type AdjustableCostKey =
  | "solicitors"
  | "searches"
  | "survey"
  | "mortgage-fees"
  | "land-registry"
  | "telegraphic-transfer"
  | "moving"
  | "insurance"
  | "furnishing";

export type CalculatorInput = {
  propertyPrice: number;
  jurisdiction: Jurisdiction;
  buyerType: BuyerType;
  depositMode: DepositMode;
  depositAmount?: number;
  depositPercentage?: number;
  assumptionLevel: AssumptionLevel;
  includeMoving: boolean;
  includeFurnishing: boolean;
  includeInsurance: boolean;
  includeContingency?: boolean;
  contingencyPercentage?: number;
  costOverrides?: Partial<Record<AdjustableCostKey, number>>;
};

export type BreakdownLine = {
  key: string;
  label: string;
  value: number;
  sourceType: "official" | "estimate";
  classification: CostClassification;
  detail: string;
  sourceName?: string;
  sourceUrl?: string;
  lastVerified?: string;
};

export type CalculatorResult = {
  propertyPrice: number;
  depositAmount: number;
  totalUpfrontCash: number;
  propertyTaxAmount: number;
  contingencyAmount: number;
  estimatedSubtotal: number;
  officialSubtotal: number;
  breakdown: BreakdownLine[];
  notes: string[];
};

type ProgressiveBand = { upTo: number | null; rate: number };

function getRangeValue(bands: PriceBandRange[], price: number, level: AssumptionLevel): number {
  const match = bands.find((band) => band.upTo === null || price <= band.upTo) ?? bands[bands.length - 1];
  return match[level];
}

function calculateProgressiveTax(price: number, bands: readonly ProgressiveBand[]): number {
  let previousThreshold = 0;
  let total = 0;

  for (const band of bands) {
    if (price <= previousThreshold) break;
    const upperBound = band.upTo ?? Number.POSITIVE_INFINITY;
    const taxableWithinBand = Math.min(price, upperBound) - previousThreshold;
    if (taxableWithinBand > 0) total += taxableWithinBand * band.rate;
    previousThreshold = upperBound;
  }

  return Math.max(0, Math.round(total));
}

export function calculatePropertyTax(price: number, jurisdiction: Jurisdiction, buyerType: BuyerType): number {
  const safePrice = Math.max(0, price);
  if (jurisdiction === "england" || jurisdiction === "northern-ireland") {
    if (buyerType === "first-time-buyer" && safePrice <= 500_000) {
      return calculateProgressiveTax(safePrice, sdltFirstTimeBuyerBands);
    }
    const standardTax = calculateProgressiveTax(safePrice, sdltStandardBands);
    return buyerType === "additional-property"
      ? standardTax + Math.round(safePrice * sdltAdditionalPropertySurchargeRate)
      : standardTax;
  }

  if (jurisdiction === "scotland") {
    const baseTax = calculateProgressiveTax(
      safePrice,
      buyerType === "first-time-buyer" ? lbttFirstTimeBuyerBands : lbttStandardBands
    );
    return buyerType === "additional-property" ? baseTax + Math.round(safePrice * lbttAdsRate) : baseTax;
  }

  return calculateProgressiveTax(
    safePrice,
    buyerType === "additional-property" ? lttHigherResidentialBands : lttMainResidentialBands
  );
}

function overriddenValue(input: CalculatorInput, key: AdjustableCostKey, fallback: number) {
  const override = input.costOverrides?.[key];
  return override === undefined ? fallback : Math.max(0, Math.round(override));
}

function estimateLine(
  input: CalculatorInput,
  key: AdjustableCostKey,
  label: string,
  fallback: number,
  detail: string,
  optional = false
): BreakdownLine {
  const hasOverride = input.costOverrides?.[key] !== undefined;
  return {
    key,
    label,
    value: overriddenValue(input, key, fallback),
    sourceType: "estimate",
    classification: hasOverride
      ? "user-entered"
      : optional
        ? "optional-allowance"
        : "market-estimate",
    detail: hasOverride ? `${detail} You replaced the planning default with your own amount.` : detail
  };
}

function calculateRegistryFee(price: number, input: CalculatorInput): BreakdownLine {
  if (input.jurisdiction === "england" || input.jurisdiction === "wales") {
    const fee =
      hmlrElectronicScale1Fees.find((band) => band.upTo === null || price <= band.upTo)?.fee ??
      hmlrElectronicScale1Fees[hmlrElectronicScale1Fees.length - 1].fee;
    const override = input.costOverrides?.["land-registry"];
    return {
      key: "land-registry",
      label: "Registration fee",
      value: override === undefined ? fee : Math.max(0, Math.round(override)),
      sourceType: override === undefined ? "official" : "estimate",
      classification: override === undefined ? "official-charge" : "user-entered",
      detail:
        override === undefined
          ? "HM Land Registry electronic Scale 1 fee for a transfer of a whole registered title in England or Wales."
          : "Your registration allowance; confirm the application type and fee with your solicitor.",
      ...(override === undefined
        ? {
            sourceName: "HM Land Registry",
            sourceUrl: "https://www.gov.uk/guidance/hm-land-registry-registration-services-fees",
            lastVerified: "2026-07-19"
          }
        : {})
    };
  }

  if (input.jurisdiction === "northern-ireland") {
    return estimateLine(
      input,
      "land-registry",
      "Northern Ireland registration allowance",
      getNorthernIrelandRegistrationAllowance(price),
      "Adjustable allowance based on the current LPS electronic Land Registry transfer scale. Registry of Deeds or other treatment can differ, so confirm the exact fee with your solicitor."
    );
  }

  const override = input.costOverrides?.["land-registry"];
  return {
    key: "land-registry",
    label: "Registers of Scotland fee",
    value: override === undefined ? getScotlandRegistrationFee(price) : Math.max(0, Math.round(override)),
    sourceType: override === undefined ? "official" : "estimate",
    classification: override === undefined ? "official-charge" : "user-entered",
    detail:
      override === undefined
        ? "Official fee for registering a disposition, based on the consideration or property value."
        : "Your registration amount; confirm the deed and fee with your solicitor.",
    ...(override === undefined
      ? {
          sourceName: "Registers of Scotland",
          sourceUrl: scotlandRegistrationSourceUrl,
          lastVerified: "2026-07-19"
        }
      : {})
  };
}

function getDepositAmount(input: CalculatorInput): number {
  if (input.depositMode === "amount") {
    return Math.round(clampNumber(input.depositAmount ?? input.propertyPrice * 0.1, 0, input.propertyPrice));
  }
  const percentage = clampNumber(input.depositPercentage ?? 10, 0, 100);
  return Math.round(input.propertyPrice * (percentage / 100));
}

export function calculateUpfrontCosts(input: CalculatorInput): CalculatorResult {
  const propertyPrice = Math.max(50_000, Math.round(input.propertyPrice || 0));
  const normalisedInput = { ...input, propertyPrice };
  const depositAmount = getDepositAmount(normalisedInput);
  const propertyTaxAmount = calculatePropertyTax(propertyPrice, input.jurisdiction, input.buyerType);
  const level = input.assumptionLevel;

  const breakdown: BreakdownLine[] = [
    {
      key: "deposit",
      label: "Deposit",
      value: depositAmount,
      sourceType: "estimate",
      classification: "user-entered",
      detail: "Calculated from the deposit amount or percentage you entered."
    },
    {
      key: "property-tax",
      label: input.jurisdiction === "scotland" ? "LBTT" : input.jurisdiction === "wales" ? "LTT" : "Stamp Duty Land Tax",
      value: propertyTaxAmount,
      sourceType: "official",
      classification: "official-calculation",
      detail: "Calculated from the official residential tax rules for the selected UK jurisdiction and buyer type.",
      sourceName:
        input.jurisdiction === "scotland"
          ? "Revenue Scotland"
          : input.jurisdiction === "wales"
            ? "Welsh Revenue Authority"
            : "HM Revenue & Customs",
      sourceUrl:
        input.jurisdiction === "scotland"
          ? "https://revenue.scot/taxes/land-buildings-transaction-tax/residential-property"
          : input.jurisdiction === "wales"
            ? "https://www.gov.wales/land-transaction-tax-rates-and-bands"
            : "https://www.gov.uk/stamp-duty-land-tax/residential-property-rates",
      lastVerified: "2026-07-19"
    },
    estimateLine(input, "solicitors", "Solicitor / conveyancing", getRangeValue(solicitorFeeBands, propertyPrice, level), "Planning estimate for standard legal work; searches and transfer fees are separate."),
    estimateLine(input, "searches", "Search fees", searchFeeByJurisdiction[input.jurisdiction][level], "Planning estimate for the usual search pack."),
    estimateLine(input, "survey", "Survey", getRangeValue(surveyFeeBands, propertyPrice, level), "Planning estimate; survey level and property condition affect the quote."),
    estimateLine(input, "mortgage-fees", "Mortgage fees", getRangeValue(mortgageFeeBands, propertyPrice, level), "Planning estimate for possible lender, valuation, arrangement or broker charges."),
    calculateRegistryFee(propertyPrice, input),
    estimateLine(input, "telegraphic-transfer", "Bank transfer fee", telegraphicTransferFee[level], "Typical solicitor charge for sending completion money.")
  ];

  if (input.includeMoving) breakdown.push(estimateLine(input, "moving", "Moving costs", getRangeValue(movingCostBands, propertyPrice, level), "Optional allowance for removals, packing and moving-day practicals.", true));
  if (input.includeInsurance) breakdown.push(estimateLine(input, "insurance", "Insurance", insuranceAllowanceByJurisdiction[input.jurisdiction][level], "Optional planning allowance for cover around exchange or completion.", true));
  if (input.includeFurnishing) breakdown.push(estimateLine(input, "furnishing", "Furnishing and setup", getRangeValue(furnishingCostBands, propertyPrice, level), "Optional move-in allowance for furniture, white goods and essentials.", true));

  const estimateBase = breakdown
    .filter((line) => line.key !== "deposit" && !line.classification.startsWith("official-"))
    .reduce((sum, line) => sum + line.value, 0);
  const contingencyPercentage = clampNumber(input.contingencyPercentage ?? 10, 0, 25);
  const contingencyAmount = input.includeContingency !== false ? Math.round(estimateBase * (contingencyPercentage / 100)) : 0;

  if (input.includeContingency !== false) {
    breakdown.push({
      key: "contingency",
      label: "Contingency",
      value: contingencyAmount,
      sourceType: "estimate",
      classification: "optional-allowance",
      detail: `${contingencyPercentage}% of estimate-led costs as an optional budgeting cushion.`
    });
  }

  const officialSubtotal = breakdown
    .filter((line) => line.classification.startsWith("official-"))
    .reduce((sum, line) => sum + line.value, 0);
  const estimatedSubtotal = breakdown
    .filter((line) => line.key !== "deposit" && !line.classification.startsWith("official-"))
    .reduce((sum, line) => sum + line.value, 0);

  return {
    propertyPrice,
    depositAmount,
    propertyTaxAmount,
    contingencyAmount,
    estimatedSubtotal,
    officialSubtotal,
    totalUpfrontCash: breakdown.reduce((sum, line) => sum + line.value, 0),
    breakdown,
    notes: [
      "Taxes use official jurisdiction-specific rules verified on 19 July 2026.",
      "Legal, survey, mortgage, moving and setup figures are adjustable planning estimates.",
      input.jurisdiction === "northern-ireland"
        ? "Northern Ireland registration is an adjustable allowance, not an HM Land Registry charge."
        : "Registration treatment depends on the application; confirm the final charge with your solicitor."
    ]
  };
}
