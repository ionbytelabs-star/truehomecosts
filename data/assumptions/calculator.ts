import { furnishingCostBands } from "./furnishing";
import { insuranceAllowanceByJurisdiction } from "./insurance";
import { mortgageFeeBands } from "./mortgageFees";
import { movingCostBands } from "./moving";
import { solicitorFeeBands } from "./solicitors";
import { surveyFeeBands } from "./surveys";
import type { PriceBandRange } from "./types";

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

export const calculatorCostAssumptions: CostAssumption[] = [
  {
    id: "deposit",
    label: "Deposit",
    category: "Deposit",
    classification: "user-entered",
    unit: "calculated",
    notes: "Calculated from the amount or percentage entered by the user."
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
    notes: "Jurisdiction-specific SDLT, LBTT or LTT rules are applied."
  },
  rangeSummary("solicitors", "Legal fees", "Legal and registration", solicitorFeeBands, "Standard residential purchase estimate; searches and transfer fees are separate."),
  rangeSummary("survey", "Survey", "Survey and valuation", surveyFeeBands, "Planning range from a basic condition survey to fuller building work."),
  rangeSummary("mortgage-fees", "Mortgage fees", "Mortgage", mortgageFeeBands, "May include lender, valuation, booking, arrangement or broker charges."),
  {
    ...rangeSummary("moving", "Moving costs", "Moving and setup", movingCostBands, "Optional allowance for removals, packing and moving-day practicals."),
    classification: "optional"
  },
  {
    id: "insurance",
    label: "Insurance",
    category: "Moving and setup",
    classification: "optional",
    minimum: Math.min(...Object.values(insuranceAllowanceByJurisdiction).map((range) => range.low)),
    typical: insuranceAllowanceByJurisdiction.england.average,
    maximum: Math.max(...Object.values(insuranceAllowanceByJurisdiction).map((range) => range.high)),
    unit: "fixed",
    lastVerified: verified,
    notes: "Optional planning allowance; obtain a quote for the property."
  },
  {
    ...rangeSummary("furnishing", "Furnishing and setup", "Moving and setup", furnishingCostBands, "Optional allowance for furniture, white goods and first-home essentials."),
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
    notes: "Optional percentage of estimate-led costs; adjustable or removable."
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
