/**
 * Official SDLT residential bands for England and Northern Ireland.
 * Source reviewed April 2026:
 * https://www.gov.uk/stamp-duty-land-tax/residential-property-rates
 */
export const sdltStandardBands = [
  { upTo: 125_000, rate: 0 },
  { upTo: 250_000, rate: 0.02 },
  { upTo: 925_000, rate: 0.05 },
  { upTo: 1_500_000, rate: 0.1 },
  { upTo: null, rate: 0.12 }
] as const;

/**
 * Official first-time buyer relief from 1 April 2025 onwards.
 * Relief applies only where purchase price is £500,000 or less.
 */
export const sdltFirstTimeBuyerBands = [
  { upTo: 300_000, rate: 0 },
  { upTo: 500_000, rate: 0.05 }
] as const;

/**
 * Additional residential property surcharge from 31 October 2024 onwards.
 * This is applied on top of the standard residential rates.
 */
export const sdltAdditionalPropertySurchargeRate = 0.05;

export const sdltSourceUrl =
  "https://www.gov.uk/stamp-duty-land-tax/residential-property-rates";
