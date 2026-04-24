import type { RangeByLevel } from "./types";

/**
 * Typical solicitor bank transfer / telegraphic transfer fee.
 */
export const telegraphicTransferFee: RangeByLevel = {
  low: 25,
  average: 40,
  high: 55
};

/**
 * Registry fee fallback for places where HMLR electronic Scale 1 does not directly apply.
 * Scotland and Northern Ireland should be treated as planning estimates here.
 */
export const registrationFallbackFee = {
  low: 80,
  average: 120,
  high: 170
};
