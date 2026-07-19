import { furnishingCostBands } from "./furnishing";
import { insuranceAllowanceByJurisdiction } from "./insurance";
import { mortgageFeeBands } from "./mortgageFees";
import { movingCostBands } from "./moving";
import { searchFeeByJurisdiction } from "./searches";
import { solicitorFeeBands } from "./solicitors";
import { surveyFeeBands } from "./surveys";
import { registrationFallbackFee, telegraphicTransferFee } from "./transfers";
import type { JurisdictionRangeMap, PriceBandRange, RangeByLevel } from "./types";
import { hmlrSourceUrl } from "../fees/hmlr";
import {
  northernIrelandLandRegistrySourceUrl,
  northernIrelandLandRegistryTransferFees
} from "../fees/northern-ireland";

export type CostClassification = "official" | "estimate" | "user-entered" | "optional";

export type CostAssumption = {
  id: string;
  label: string;
  category: string;
  classification: CostClassification;
  minimum?: number;
  typical?: number;
  maximum?: number;
  unit: "fixed" | "percentage" | "calculated";
  sourceName?: string;
  sourceUrl?: string;
  lastVerified?: string;
  notes: string;
};

export type HomepageCostRow = {
  id: string;
  label: string;
  description: string;
  basis: string;
  assumptionIds: readonly string[];
  planningBasis?: string;
};

const verified = "2026-07-19";

function rangeSummary(id: string, label: string, category: string, bands: PriceBandRange[], notes: string) {
  return {
    id,
    label,
    category,
    classification: "estimate" as const,
    minimum: Math.min(...bands.map((band) => band.low)),
    typical: bands.find((band) => band.upTo === 350_000)?.average ?? bands[0].average,
    maximum: Math.max(...bands.map((band) => band.high)),
    unit: "fixed" as const,
    lastVerified: verified,
    notes
  };
}

function jurisdictionRangeSummary(
  id: string,
  label: string,
  category: string,
  ranges: JurisdictionRangeMap,
  notes: string
) {
  const values = Object.values(ranges);
  return {
    id,
    label,
    category,
    classification: "estimate" as const,
    minimum: Math.min(...values.map((range) => range.low)),
    typical: ranges.england.average,
    maximum: Math.max(...values.map((range) => range.high)),
    unit: "fixed" as const,
    lastVerified: verified,
    notes
  };
}

function levelRangeSummary(
  id: string,
  label: string,
  category: string,
  range: RangeByLevel,
  notes: string
) {
  return {
    id,
    label,
    category,
    classification: "estimate" as const,
    minimum: range.low,
    typical: range.average,
    maximum: range.high,
    unit: "fixed" as const,
    lastVerified: verified,
    notes
  };
}

export const calculatorCostAssumptions: CostAssumption[] = [
  {
    id: "deposit",
    label: "Deposit",
    category: "Deposit",
    classification: "user-entered",
    unit: "calculated",
    notes: "The cash contribution paid towards the property price."
  },
  {
    id: "property-tax",
    label: "Property tax",
    category: "Property tax",
    classification: "official",
    unit: "calculated",
    sourceName: "HMRC, Revenue Scotland and Welsh Revenue Authority",
    sourceUrl: "https://www.gov.uk/stamp-duty-land-tax/residential-property-rates",
    lastVerified: verified,
    notes: "SDLT in England and Northern Ireland, LBTT in Scotland or LTT in Wales."
  },
  rangeSummary(
    "solicitors",
    "Solicitor/conveyancing",
    "Solicitor/conveyancing",
    solicitorFeeBands,
    "Legal work required to complete the purchase."
  ),
  jurisdictionRangeSummary(
    "searches",
    "Search fees",
    "Search fees",
    searchFeeByJurisdiction,
    "Local authority, environmental and other property searches."
  ),
  rangeSummary(
    "survey",
    "Survey and valuation",
    "Survey and valuation",
    surveyFeeBands,
    "The buyer's survey and any separate lender valuation charge."
  ),
  rangeSummary(
    "mortgage-fees",
    "Mortgage fees",
    "Mortgage fees",
    mortgageFeeBands,
    "Arrangement, booking, broker or other mortgage-related charges where applicable."
  ),
  {
    id: "registration-england-wales",
    label: "Registration fee",
    category: "Registration fee or allowance",
    classification: "official",
    unit: "calculated",
    sourceName: "HM Land Registry",
    sourceUrl: hmlrSourceUrl,
    lastVerified: verified,
    notes: "Official HM Land Registry fee for a qualifying England or Wales application."
  },
  {
    ...levelRangeSummary(
      "registration-scotland",
      "Scottish registration allowance",
      "Registration fee or allowance",
      registrationFallbackFee,
      "Adjustable allowance for registration and filing; confirm the Registers of Scotland charge with your solicitor."
    )
  },
  {
    id: "registration-northern-ireland",
    label: "Northern Ireland registration allowance",
    category: "Registration fee or allowance",
    classification: "estimate",
    minimum: Math.min(...northernIrelandLandRegistryTransferFees.map((band) => band.electronic)),
    typical: northernIrelandLandRegistryTransferFees.at(-1)?.electronic,
    maximum: Math.max(...northernIrelandLandRegistryTransferFees.map((band) => band.electronic)),
    unit: "fixed",
    sourceName: "Land & Property Services Northern Ireland",
    sourceUrl: northernIrelandLandRegistrySourceUrl,
    lastVerified: verified,
    notes:
      "Adjustable LPS Land Registry allowance; Registry of Deeds or other treatment can differ, so confirm the exact fee with your solicitor."
  },
  levelRangeSummary(
    "telegraphic-transfer",
    "Bank transfer fee",
    "Bank transfer fee",
    telegraphicTransferFee,
    "The solicitor's charge for transferring completion funds."
  ),
  {
    ...rangeSummary(
      "moving",
      "Moving costs",
      "Moving costs",
      movingCostBands,
      "Removal company, van hire, packing or related moving expenses."
    ),
    classification: "optional"
  },
  {
    id: "insurance",
    label: "Insurance",
    category: "Insurance",
    classification: "optional",
    minimum: Math.min(...Object.values(insuranceAllowanceByJurisdiction).map((range) => range.low)),
    typical: insuranceAllowanceByJurisdiction.england.average,
    maximum: Math.max(...Object.values(insuranceAllowanceByJurisdiction).map((range) => range.high)),
    unit: "fixed",
    lastVerified: verified,
    notes: "Buildings insurance and any initial home-insurance allowance included in the plan."
  },
  {
    ...rangeSummary(
      "furnishing",
      "Furnishing and setup",
      "Furnishing and setup",
      furnishingCostBands,
      "Optional allowance for furniture, appliances and initial household setup."
    ),
    classification: "optional"
  },
  {
    id: "contingency",
    label: "Contingency",
    category: "Contingency",
    classification: "optional",
    minimum: 0,
    typical: 10,
    maximum: 25,
    unit: "percentage",
    lastVerified: verified,
    notes: "An optional buffer for unexpected or underestimated buying costs."
  }
];

export const calculatorCostAssumptionById = new Map(
  calculatorCostAssumptions.map((assumption) => [assumption.id, assumption])
);

export const homepageCostRows: HomepageCostRow[] = [
  {
    id: "deposit",
    label: "Deposit",
    description: "The cash contribution paid towards the property price.",
    basis: "User-entered amount",
    assumptionIds: ["deposit"]
  },
  {
    id: "property-tax",
    label: "Property tax",
    description: "SDLT in England and Northern Ireland, LBTT in Scotland or LTT in Wales.",
    basis: "Official calculation",
    assumptionIds: ["property-tax"]
  },
  {
    id: "solicitors",
    label: "Solicitor/conveyancing",
    description: "Legal work required to complete the purchase.",
    basis: "Market estimate or user-entered amount",
    assumptionIds: ["solicitors"]
  },
  {
    id: "searches",
    label: "Search fees",
    description: "Local authority, environmental and other property searches.",
    basis: "Market estimate or user-entered amount",
    assumptionIds: ["searches"]
  },
  {
    id: "survey",
    label: "Survey and valuation",
    description: "The buyer's survey and any separate lender valuation charge.",
    basis: "Market estimate or user-entered amount",
    assumptionIds: ["survey"]
  },
  {
    id: "mortgage-fees",
    label: "Mortgage fees",
    description: "Arrangement, booking, broker or other mortgage-related charges where applicable.",
    basis: "Market estimate or user-entered amount",
    assumptionIds: ["mortgage-fees"]
  },
  {
    id: "registration",
    label: "Registration fee or allowance",
    description: "The charge or allowance associated with registering the property transaction.",
    basis: "Official charge or adjustable allowance",
    assumptionIds: [
      "registration-england-wales",
      "registration-scotland",
      "registration-northern-ireland"
    ],
    planningBasis:
      "Official calculation for qualifying England and Wales applications; adjustable allowance in Scotland and Northern Ireland. Confirm the exact fee with your solicitor."
  },
  {
    id: "telegraphic-transfer",
    label: "Bank transfer fee",
    description: "The solicitor's charge for transferring completion funds.",
    basis: "Market estimate or user-entered amount",
    assumptionIds: ["telegraphic-transfer"]
  },
  {
    id: "moving",
    label: "Moving costs",
    description: "Removal company, van hire, packing or related moving expenses.",
    basis: "Optional allowance or user-entered amount",
    assumptionIds: ["moving"]
  },
  {
    id: "insurance",
    label: "Insurance",
    description: "Buildings insurance and any initial home-insurance allowance included in the plan.",
    basis: "Optional allowance or user-entered amount",
    assumptionIds: ["insurance"]
  },
  {
    id: "furnishing",
    label: "Furnishing and setup",
    description: "Optional allowance for furniture, appliances and initial household setup.",
    basis: "Optional allowance or user-entered amount",
    assumptionIds: ["furnishing"]
  },
  {
    id: "contingency",
    label: "Contingency",
    description: "An optional buffer for unexpected or underestimated buying costs.",
    basis: "Optional allowance",
    assumptionIds: ["contingency"]
  }
];

export const calculatorMetadata = {
  dataVersion: "2026.07",
  lastReviewed: "2026-07-19",
  lastReviewedLabel: "19 July 2026",
  supportedJurisdictions: ["England", "Scotland", "Wales", "Northern Ireland"],
  disclaimer:
    "This is a planning estimate, not a quotation. Confirm taxes, legal fees, mortgage charges and other costs before committing to a purchase.",
  correctionHref: "/contact",
  sources: [
    { name: "HM Revenue & Customs", href: "https://www.gov.uk/stamp-duty-land-tax/residential-property-rates" },
    { name: "Revenue Scotland", href: "https://revenue.scot/taxes/land-buildings-transaction-tax/residential-property" },
    { name: "Welsh Revenue Authority", href: "https://www.gov.wales/land-transaction-tax-rates-and-bands" },
    { name: "HM Land Registry", href: "https://www.gov.uk/guidance/hm-land-registry-registration-services-fees" },
    { name: "Land & Property Services Northern Ireland", href: "https://www.finance-ni.gov.uk/consultations/department-finance-land-registration-fees-orders-consultation" },
    { name: "MoneyHelper", href: "https://www.moneyhelper.org.uk/en/homes/buying-a-home/estimate-your-overall-buying-and-moving-costs" }
  ]
} as const;
