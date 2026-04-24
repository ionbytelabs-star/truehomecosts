import type { PriceBandRange } from "./types";

/**
 * Estimated moving-day spend covering removals, packing materials and basic move support.
 */
export const movingCostBands: PriceBandRange[] = [
  { upTo: 200_000, low: 450, average: 900, high: 1_500 },
  { upTo: 350_000, low: 550, average: 1_100, high: 1_800 },
  { upTo: 500_000, low: 650, average: 1_300, high: 2_100 },
  { upTo: 750_000, low: 850, average: 1_650, high: 2_600 },
  { upTo: null, low: 1_000, average: 1_950, high: 3_200 }
];
