/**
 * Official LBTT residential bands for Scotland.
 * Source reviewed April 2026:
 * https://revenue.scot/taxes/land-buildings-transaction-tax/residential-property
 */
export const lbttStandardBands = [
  { upTo: 145_000, rate: 0 },
  { upTo: 250_000, rate: 0.02 },
  { upTo: 325_000, rate: 0.05 },
  { upTo: 750_000, rate: 0.1 },
  { upTo: null, rate: 0.12 }
] as const;

/**
 * First-time buyer relief increases the nil-rate threshold to £175,000.
 */
export const lbttFirstTimeBuyerBands = [
  { upTo: 175_000, rate: 0 },
  { upTo: 250_000, rate: 0.02 },
  { upTo: 325_000, rate: 0.05 },
  { upTo: 750_000, rate: 0.1 },
  { upTo: null, rate: 0.12 }
] as const;

/**
 * Additional Dwelling Supplement (ADS) rate for most additional properties.
 * For qualifying Scottish transactions entered into after 4 December 2024 the rate is 8%.
 */
export const lbttAdsRate = 0.08;

export const lbttSourceUrl =
  "https://revenue.scot/taxes/land-buildings-transaction-tax/residential-property";
export const lbttAdsSourceUrl =
  "https://www.revenue.scot/taxes/land-buildings-transaction-tax/additional-dwelling-supplement-ads";
