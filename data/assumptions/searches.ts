import type { JurisdictionRangeMap } from "./types";

/**
 * Estimated bundle cost for the standard search pack.
 * Typical packs include local authority, drainage and water, and environmental searches.
 */
export const searchFeeByJurisdiction: JurisdictionRangeMap = {
  "england-ni": { low: 260, average: 340, high: 430 },
  scotland: { low: 180, average: 240, high: 330 },
  wales: { low: 250, average: 330, high: 420 }
};
