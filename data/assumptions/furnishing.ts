import type { PriceBandRange } from "./types";

/**
 * Optional furnishing and move-in setup budget.
 * Useful for buyers starting from scratch or moving from furnished rentals.
 */
export const furnishingCostBands: PriceBandRange[] = [
  { upTo: 200_000, low: 800, average: 2_200, high: 4_500 },
  { upTo: 350_000, low: 1_000, average: 2_800, high: 5_500 },
  { upTo: 500_000, low: 1_250, average: 3_400, high: 6_500 },
  { upTo: 750_000, low: 1_500, average: 4_100, high: 7_500 },
  { upTo: null, low: 1_800, average: 4_800, high: 9_000 }
];
