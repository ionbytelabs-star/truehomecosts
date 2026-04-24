/**
 * Official HM Land Registry Scale 1 transfer fees for electronic whole-title applications.
 * This is the common route used by conveyancers for standard residential purchases in England and Wales.
 * Northern Ireland uses a separate registration system, so this file is most directly applicable to England and Wales.
 * Source reviewed April 2026:
 * https://www.gov.uk/government/publications/registration-services-fees
 */
export const hmlrElectronicScale1Fees = [
  { upTo: 80_000, fee: 20 },
  { upTo: 100_000, fee: 40 },
  { upTo: 200_000, fee: 100 },
  { upTo: 500_000, fee: 150 },
  { upTo: 1_000_000, fee: 295 },
  { upTo: null, fee: 500 }
] as const;

export const hmlrSourceUrl =
  "https://www.gov.uk/government/publications/registration-services-fees";
