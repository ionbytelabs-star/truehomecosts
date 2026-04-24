import type { JurisdictionRangeMap } from "./types";

/**
 * Planning allowance for insurance costs that often start around exchange or completion.
 * This is not an official fee and not every buyer pays it upfront in one lump sum.
 */
export const insuranceAllowanceByJurisdiction: JurisdictionRangeMap = {
  "england-ni": { low: 180, average: 320, high: 520 },
  scotland: { low: 170, average: 300, high: 500 },
  wales: { low: 180, average: 320, high: 520 }
};
