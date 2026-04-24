import type { PriceBandRange } from "./types";

/**
 * Estimated survey budgets.
 * Low assumes a basic valuation or simple condition survey.
 * Average assumes a Home Survey / HomeBuyer-style report.
 * High assumes a fuller building or structural survey where warranted.
 */
export const surveyFeeBands: PriceBandRange[] = [
  { upTo: 200_000, low: 350, average: 550, high: 900 },
  { upTo: 350_000, low: 450, average: 700, high: 1_050 },
  { upTo: 500_000, low: 550, average: 850, high: 1_250 },
  { upTo: 750_000, low: 700, average: 1_050, high: 1_600 },
  { upTo: null, low: 900, average: 1_300, high: 2_000 }
];
