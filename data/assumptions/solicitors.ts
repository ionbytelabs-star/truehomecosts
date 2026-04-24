import type { PriceBandRange } from "./types";

/**
 * Estimated solicitor and conveyancing legal fees for standard residential purchases.
 * Disbursements such as searches and bank transfer fees are modelled separately.
 */
export const solicitorFeeBands: PriceBandRange[] = [
  { upTo: 200_000, low: 950, average: 1_250, high: 1_650 },
  { upTo: 350_000, low: 1_050, average: 1_400, high: 1_800 },
  { upTo: 500_000, low: 1_150, average: 1_550, high: 1_950 },
  { upTo: 750_000, low: 1_300, average: 1_750, high: 2_250 },
  { upTo: null, low: 1_500, average: 2_050, high: 2_700 }
];
