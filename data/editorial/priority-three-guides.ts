import { furnishingCostBands } from "../assumptions/furnishing";
import { insuranceAllowanceByJurisdiction } from "../assumptions/insurance";
import { mortgageFeeBands } from "../assumptions/mortgageFees";
import { movingCostBands } from "../assumptions/moving";
import { searchFeeByJurisdiction } from "../assumptions/searches";
import { solicitorFeeBands } from "../assumptions/solicitors";
import { surveyFeeBands } from "../assumptions/surveys";
import { telegraphicTransferFee } from "../assumptions/transfers";
import type { PriceBandRange, RangeByLevel } from "../assumptions/types";
import { hmlrElectronicScale1Fees } from "../fees/hmlr";
import { northernIrelandLandRegistryTransferFees } from "../fees/northern-ireland";
import { scotlandDispositionRegistrationFees } from "../fees/scotland";

export const priorityThreeReviewDate = "2026-07-25";
export const priorityThreeReviewLabel = "25 July 2026";
export const priorityThreeExamplePrice = 300_000;

function bandForPrice(bands: PriceBandRange[], price: number): PriceBandRange {
  return bands.find((band) => band.upTo === null || price <= band.upTo) ?? bands.at(-1)!;
}

function gbp(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0
  }).format(value);
}

export function formatPlanningRange(range: RangeByLevel): string {
  return `${gbp(range.low)}–${gbp(range.high)}`;
}

export function formatBandRange(
  bands: PriceBandRange[],
  price = priorityThreeExamplePrice
): string {
  const band = bandForPrice(bands, price);
  return `${gbp(band.low)}–${gbp(band.high)}`;
}

export const conveyancingPlanning = {
  examplePrice: priorityThreeExamplePrice,
  legalFeeRange: formatBandRange(solicitorFeeBands),
  englandSearchRange: formatPlanningRange(searchFeeByJurisdiction.england),
  transferFeeRange: formatPlanningRange(telegraphicTransferFee)
} as const;

export const surveyLevelRows = [
  [
    "Level 1 / condition report style",
    gbp(bandForPrice(surveyFeeBands, priorityThreeExamplePrice).low),
    "A concise overview for a conventional, apparently sound property; limited detail and no repair advice."
  ],
  [
    "Level 2 / Home Survey style",
    gbp(bandForPrice(surveyFeeBands, priorityThreeExamplePrice).average),
    "A mid-level inspection for many conventional homes, with defects and maintenance advice."
  ],
  [
    "Level 3 / building survey",
    gbp(bandForPrice(surveyFeeBands, priorityThreeExamplePrice).high),
    "The most detailed inspection, often considered for older, altered, unusual or visibly defective property."
  ]
] as const;

function bandLabel(upTo: number | null): string {
  return upTo === null ? "Above the previous band" : `Up to ${gbp(upTo)}`;
}

export const englandWalesRegistrationRows = hmlrElectronicScale1Fees.map((band) => [
  bandLabel(band.upTo),
  gbp(band.fee)
]);

export const scotlandRegistrationRows = scotlandDispositionRegistrationFees.map((band) => [
  bandLabel(band.upTo),
  gbp(band.fee)
]);

export const northernIrelandRegistrationRows = northernIrelandLandRegistryTransferFees.map((band) => [
  bandLabel(band.upTo),
  gbp(band.electronic),
  gbp(band.other)
]);

export const afterExchangeTimelineRows = [
  ["At exchange", "Exchange deposit; buildings insurance where the contract or lender requires it", "Confirmed contractual amount / provider quote"],
  ["Between exchange and completion", "Final searches or legal disbursements; removals booking; mortgage conditions", "Transaction-specific charges and planning estimates"],
  ["Before funds are sent", "Conveyancer's completion statement and completion balance", "Confirmed statement, including tax and registration funding where applicable"],
  ["Completion day", "Removal balance, key collection and moving-day extras", "Provider quote and optional planning allowance"]
] as const;

export const beforeCompletionTimelineRows = [
  ["Reservation / application", "Reservation fee on some new builds; mortgage booking, valuation or broker fee where charged"],
  ["Legal work begins", "Conveyancing payment on account and search pack"],
  ["Property checks", "Buyer survey or snagging inspection"],
  ["Exchange", "Exchange deposit, less any deposit already held under the agreed contract process"],
  ["Immediately before completion", "Completion balance shown on the conveyancer's statement, plus tax and registration money handled through the legal process"],
  ["Moving arrangements", "Removal deposit or balance, storage and insurance where needed"]
] as const;

export const firstMonthCostRows = [
  ["Mortgage payment", "Ask the lender for the first-payment date and amount; it can include interest from completion to the normal payment cycle."],
  ["Council tax", "Liability normally starts when you become the owner or occupier; check the band, billing date and any discount."],
  ["Gas, electricity and water", "Take meter readings, notify suppliers and budget for the first direct debit or bill."],
  ["Broadband and connectivity", "Installation, activation or equipment charges may apply before the regular monthly price."],
  ["Insurance", "Keep buildings cover continuous where required and add contents cover if appropriate."],
  ["Leasehold or estate charges", "Check service charge, ground rent where still payable, estate charge and any balancing payment."],
  ["Safety and urgent maintenance", "Allow for locks, boiler or electrical checks, alarms, leaks and survey-identified priority work."],
  ["Furniture, appliances and setup", "Use a staged list; these are optional planning allowances rather than transaction fees."],
  ["Moving-day extras", "Cleaning, food, parking, pet care, waste removal and small tools can create a cluster of modest costs."]
] as const;

export const firstMonthPlanning = {
  insuranceRange: formatPlanningRange(insuranceAllowanceByJurisdiction.england),
  furnishingRange: formatBandRange(furnishingCostBands),
  movingRange: formatBandRange(movingCostBands)
} as const;

export const simultaneousMoveCostRows = [
  ["Selling", "Estate agent fee, selling conveyancing, EPC where required, mortgage exit or early-repayment charge where applicable"],
  ["Buying", "Buying conveyancing, searches, survey, tax, registration and mortgage product or arrangement charges"],
  ["Physical move", "Removals, packing, storage, cleaning and access or parking costs"],
  ["Timing risk", "Extra storage, temporary accommodation, duplicated bills or short-term funding if dates do not align"],
  ["After completion", "Repairs, insurance, first mortgage payment and ongoing ownership costs"]
] as const;

export const simultaneousMovePlanning = {
  buyerLegalRange: formatBandRange(solicitorFeeBands),
  mortgageFeeRange: formatBandRange(mortgageFeeBands),
  movingRange: formatBandRange(movingCostBands)
} as const;
