/**
 * Official Land Transaction Tax bands for Wales.
 * Main residential and higher residential rates reviewed April 2026.
 * Source:
 * https://www.gov.wales/land-transaction-tax-rates-and-bands
 */
export const lttMainResidentialBands = [
  { upTo: 225_000, rate: 0 },
  { upTo: 400_000, rate: 0.06 },
  { upTo: 750_000, rate: 0.075 },
  { upTo: 1_500_000, rate: 0.1 },
  { upTo: null, rate: 0.12 }
] as const;

export const lttHigherResidentialBands = [
  { upTo: 180_000, rate: 0.05 },
  { upTo: 250_000, rate: 0.085 },
  { upTo: 400_000, rate: 0.1 },
  { upTo: 750_000, rate: 0.125 },
  { upTo: 1_500_000, rate: 0.15 },
  { upTo: null, rate: 0.17 }
] as const;

export const lttSourceUrl =
  "https://www.gov.wales/land-transaction-tax-rates-and-bands";
