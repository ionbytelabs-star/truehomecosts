import type { PriceBandRange } from "./types";

/**
 * Estimated lender and broker costs for buyers using a mortgage.
 * This bundle can cover a broker fee, valuation charge, booking fee or arrangement fee.
 */
export const mortgageFeeBands: PriceBandRange[] = [
  { upTo: 200_000, low: 250, average: 650, high: 1_200 },
  { upTo: 350_000, low: 300, average: 800, high: 1_450 },
  { upTo: 500_000, low: 350, average: 950, high: 1_650 },
  { upTo: 750_000, low: 450, average: 1_100, high: 1_900 },
  { upTo: null, low: 550, average: 1_300, high: 2_300 }
];
