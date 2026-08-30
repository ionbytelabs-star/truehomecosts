import type { PriceBandRange } from "./types";

/**
 * One adjustable planning allowance for possible mortgage-related charges.
 *
 * This is not a tariff, a measured UK average or a total made by adding every
 * possible fee. A real mortgage may be fee-free, include a lender-paid basic
 * valuation or have separate lender, broker and legal charges. Replace the
 * allowance with the charges in the mortgage illustration and other written
 * quotations as soon as they are known.
 */
export const mortgageFeeBands: PriceBandRange[] = [
  { upTo: 200_000, low: 250, average: 650, high: 1_200 },
  { upTo: 350_000, low: 300, average: 800, high: 1_450 },
  { upTo: 500_000, low: 350, average: 950, high: 1_650 },
  { upTo: 750_000, low: 450, average: 1_100, high: 1_900 },
  { upTo: null, low: 550, average: 1_300, high: 2_300 }
];

export const mortgageFeePlanningMetadata = {
  scope: "One combined, adjustable allowance for possible mortgage-related charges; not a claim that every borrower pays every fee type.",
  sourceName: "MoneyHelper mortgage-fee guidance and MoneySavingExpert market context",
  sourceUrl:
    "https://www.moneyhelper.org.uk/en/homes/buying-a-home/estimate-your-overall-buying-and-moving-costs",
  lastVerified: "2026-08-30"
} as const;

/**
 * Time-sensitive consumer reference points used on /mortgage-fees-costs.
 * These are conditional category benchmarks, not a combined UK average.
 */
export const mortgageFeeConsumerReferences = {
  booking: {
    value: "£100–£200",
    description: "Booking fee where charged",
    sourceOrganisation: "MoneyHelper",
    sourceUrl:
      "https://www.moneyhelper.org.uk/en/homes/buying-a-home/estimate-your-overall-buying-and-moving-costs",
    dateVerified: "2026-08-30",
    usedOn: "/mortgage-fees-costs"
  },
  product: {
    value: "£1,000–£2,000+",
    description: "Arrangement or product fee where charged",
    sourceOrganisation: "MoneyHelper",
    sourceUrl:
      "https://www.moneyhelper.org.uk/en/homes/buying-a-home/estimate-your-overall-buying-and-moving-costs",
    dateVerified: "2026-08-30",
    usedOn: "/mortgage-fees-costs"
  },
  account: {
    value: "£100–£300",
    description: "Mortgage account fee where charged",
    sourceOrganisation: "MoneyHelper",
    sourceUrl:
      "https://www.moneyhelper.org.uk/en/homes/buying-a-home/estimate-your-overall-buying-and-moving-costs",
    dateVerified: "2026-08-30",
    usedOn: "/mortgage-fees-costs"
  },
  valuation: {
    value: "£150–£800",
    description: "Borrower-paid mortgage valuation where charged; lenders usually cover the basic valuation",
    sourceOrganisation: "MoneyHelper",
    sourceUrl:
      "https://www.moneyhelper.org.uk/en/homes/buying-a-home/estimate-your-overall-buying-and-moving-costs",
    dateVerified: "2026-08-30",
    usedOn: "/mortgage-fees-costs"
  },
  electronicTransfer: {
    value: "£25–£50",
    description: "Electronic transfer fee where charged",
    sourceOrganisation: "MoneyHelper",
    sourceUrl:
      "https://www.moneyhelper.org.uk/en/homes/buying-a-home/estimate-your-overall-buying-and-moving-costs",
    dateVerified: "2026-08-30",
    usedOn: "/mortgage-fees-costs"
  }
} as const;
