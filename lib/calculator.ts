import { furnishingCostBands } from "@/data/assumptions/furnishing";
import { insuranceAllowanceByJurisdiction } from "@/data/assumptions/insurance";
import { mortgageFeeBands } from "@/data/assumptions/mortgageFees";
import { movingCostBands } from "@/data/assumptions/moving";
import { searchFeeByJurisdiction } from "@/data/assumptions/searches";
import { solicitorFeeBands } from "@/data/assumptions/solicitors";
import { surveyFeeBands } from "@/data/assumptions/surveys";
import { registrationFallbackFee, telegraphicTransferFee } from "@/data/assumptions/transfers";
import type { PriceBandRange } from "@/data/assumptions/types";
import { hmlrElectronicScale1Fees } from "@/data/fees/hmlr";
import { lbttAdsRate, lbttFirstTimeBuyerBands, lbttStandardBands } from "@/data/tax/lbtt";
import { lttHigherResidentialBands, lttMainResidentialBands } from "@/data/tax/ltt";
import {
  sdltAdditionalPropertySurchargeRate,
  sdltFirstTimeBuyerBands,
  sdltStandardBands
} from "@/data/tax/sdlt";
import { clampNumber } from "@/lib/format";
import type { AssumptionLevel, BuyerType, Jurisdiction } from "@/lib/site";

export type DepositMode = "amount" | "percentage";

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
};

export type BreakdownLine = {
  key: string;
  label: string;
  value: number;
  sourceType: "official" | "estimate";
  detail: string;
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

type ProgressiveBand = {
  upTo: number | null;
  rate: number;
};

function getRangeValue(bands: PriceBandRange[], price: number, level: AssumptionLevel): number {
  const match = bands.find((band) => band.upTo === null || price <= band.upTo) ?? bands[bands.length - 1];
  return match[level];
}

function calculateProgressiveTax(price: number, bands: readonly ProgressiveBand[]): number {
  let remaining = price;
  let previousThreshold = 0;
  let total = 0;

  for (const band of bands) {
    if (remaining <= 0) {
      break;
    }

    const upperBound = band.upTo ?? Number.POSITIVE_INFINITY;
    const taxableWithinBand = Math.min(price, upperBound) - previousThreshold;

    if (taxableWithinBand > 0) {
      total += taxableWithinBand * band.rate;
    }

    previousThreshold = upperBound;
    remaining = price - previousThreshold;
  }

  return Math.max(0, Math.round(total));
}

function calculatePropertyTax(price: number, jurisdiction: Jurisdiction, buyerType: BuyerType): number {
  if (jurisdiction === "england-ni") {
    if (buyerType === "first-time-buyer" && price <= 500_000) {
      return calculateProgressiveTax(price, sdltFirstTimeBuyerBands);
    }

    const standardTax = calculateProgressiveTax(price, sdltStandardBands);
    return buyerType === "additional-property"
      ? standardTax + Math.round(price * sdltAdditionalPropertySurchargeRate)
      : standardTax;
  }

  if (jurisdiction === "scotland") {
    const baseTax = calculateProgressiveTax(
      price,
      buyerType === "first-time-buyer" ? lbttFirstTimeBuyerBands : lbttStandardBands
    );

    return buyerType === "additional-property" ? baseTax + Math.round(price * lbttAdsRate) : baseTax;
  }

  return calculateProgressiveTax(
    price,
    buyerType === "additional-property" ? lttHigherResidentialBands : lttMainResidentialBands
  );
}

function calculateRegistryFee(price: number, jurisdiction: Jurisdiction, level: AssumptionLevel): BreakdownLine {
  if (jurisdiction === "wales" || jurisdiction === "england-ni") {
    const fee =
      hmlrElectronicScale1Fees.find((band) => band.upTo === null || price <= band.upTo)?.fee ??
      hmlrElectronicScale1Fees[hmlrElectronicScale1Fees.length - 1].fee;

    return {
      key: "land-registry",
      label: "Land registry / registration",
      value: fee,
      sourceType: "official",
      detail:
        "Uses current HM Land Registry electronic Scale 1 fee bands, which are directly relevant to England and Wales and a planning proxy for Northern Ireland."
    };
  }

  return {
    key: "land-registry",
    label: "Land registry / registration",
    value: registrationFallbackFee[level],
    sourceType: "estimate",
    detail: "Planning estimate for Scottish registration and solicitor filing costs."
  };
}

function getDepositAmount(input: CalculatorInput): number {
  if (input.depositMode === "amount") {
    return clampNumber(input.depositAmount ?? input.propertyPrice * 0.1, 0, input.propertyPrice);
  }

  const percentage = clampNumber(input.depositPercentage ?? 10, 0, 100);
  return Math.round(input.propertyPrice * (percentage / 100));
}

export function calculateUpfrontCosts(input: CalculatorInput): CalculatorResult {
  const propertyPrice = Math.max(50_000, Math.round(input.propertyPrice));
  const depositAmount = getDepositAmount({ ...input, propertyPrice });
  const propertyTaxAmount = calculatePropertyTax(propertyPrice, input.jurisdiction, input.buyerType);

  const breakdown: BreakdownLine[] = [
    {
      key: "deposit",
      label: "Deposit",
      value: depositAmount,
      sourceType: "official",
      detail: "Based on the deposit amount or percentage you entered."
    },
    {
      key: "property-tax",
      label: "Property tax",
      value: propertyTaxAmount,
      sourceType: "official",
      detail: "Calculated using current 2026 residential tax rules for the selected UK nation."
    },
    {
      key: "solicitors",
      label: "Solicitor / conveyancing",
      value: getRangeValue(solicitorFeeBands, propertyPrice, input.assumptionLevel),
      sourceType: "estimate",
      detail: "Legal fee estimate excluding searches and bank transfer fees."
    },
    {
      key: "searches",
      label: "Search fees",
      value: searchFeeByJurisdiction[input.jurisdiction][input.assumptionLevel],
      sourceType: "estimate",
      detail: "Typical local authority, drainage and environmental search pack."
    },
    {
      key: "survey",
      label: "Survey",
      value: getRangeValue(surveyFeeBands, propertyPrice, input.assumptionLevel),
      sourceType: "estimate",
      detail: "Allowance for a basic survey through to a fuller structural survey."
    },
    {
      key: "mortgage-fees",
      label: "Mortgage fees",
      value: getRangeValue(mortgageFeeBands, propertyPrice, input.assumptionLevel),
      sourceType: "estimate",
      detail: "Bundle for likely broker, valuation, booking or arrangement fees if using a mortgage."
    },
    calculateRegistryFee(propertyPrice, input.jurisdiction, input.assumptionLevel),
    {
      key: "telegraphic-transfer",
      label: "Telegraphic transfer fee",
      value: telegraphicTransferFee[input.assumptionLevel],
      sourceType: "estimate",
      detail: "Typical solicitor bank transfer charge for sending completion money."
    }
  ];

  if (input.includeMoving) {
    breakdown.push({
      key: "moving",
      label: "Moving costs",
      value: getRangeValue(movingCostBands, propertyPrice, input.assumptionLevel),
      sourceType: "estimate",
      detail: "Removal van, packing help and moving-day practicals."
    });
  }

  if (input.includeInsurance) {
    breakdown.push({
      key: "insurance",
      label: "Insurance estimate",
      value: insuranceAllowanceByJurisdiction[input.jurisdiction][input.assumptionLevel],
      sourceType: "estimate",
      detail: "Planning allowance for insurance that may start before or at completion."
    });
  }

  if (input.includeFurnishing) {
    breakdown.push({
      key: "furnishing",
      label: "Furnishing estimate",
      value: getRangeValue(furnishingCostBands, propertyPrice, input.assumptionLevel),
      sourceType: "estimate",
      detail: "Optional move-in budget for furniture, white goods and first-home essentials."
    });
  }

  const estimatedSubtotal = breakdown
    .filter((line) => line.sourceType === "estimate")
    .reduce((sum, line) => sum + line.value, 0);
  const officialSubtotal = breakdown
    .filter((line) => line.sourceType === "official")
    .reduce((sum, line) => sum + line.value, 0);

  const contingencyMultiplier = {
    low: 0.08,
    average: 0.1,
    high: 0.12
  }[input.assumptionLevel];

  const contingencyAmount = Math.max(500, Math.round(estimatedSubtotal * contingencyMultiplier));

  breakdown.push({
    key: "contingency",
    label: "Recommended buffer",
    value: contingencyAmount,
    sourceType: "estimate",
    detail: "A practical cushion for quote changes, minor repairs, extra disbursements or move-in surprises."
  });

  return {
    propertyPrice,
    depositAmount,
    propertyTaxAmount,
    contingencyAmount,
    estimatedSubtotal: estimatedSubtotal + contingencyAmount,
    officialSubtotal,
    totalUpfrontCash: officialSubtotal + estimatedSubtotal + contingencyAmount,
    breakdown,
    notes: [
      "Property tax and HM Land Registry fees are based on official published bands reviewed in April 2026.",
      "Searches, surveys, legal fees, mortgage costs, moving budgets and optional extras are planning estimates only.",
      "Northern Ireland, Scotland, leasehold, new-build and complex transactions can create extra costs not shown in the headline total."
    ]
  };
}
