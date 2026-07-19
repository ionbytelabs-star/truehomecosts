/**
 * Official Registers of Scotland fee for registering a disposition.
 * The fee is based on the consideration or property value, whichever is greater.
 * Source verified 19 July 2026:
 * https://kb.ros.gov.uk/fees/registration-fees
 */
export const scotlandDispositionRegistrationFees = [
  { upTo: 50_000, fee: 80 },
  { upTo: 100_000, fee: 140 },
  { upTo: 150_000, fee: 260 },
  { upTo: 200_000, fee: 400 },
  { upTo: 300_000, fee: 530 },
  { upTo: 500_000, fee: 660 },
  { upTo: 700_000, fee: 800 },
  { upTo: 1_000_000, fee: 930 },
  { upTo: 2_000_000, fee: 1_100 },
  { upTo: 3_000_000, fee: 3_300 },
  { upTo: 5_000_000, fee: 5_500 },
  { upTo: null, fee: 8_250 }
] as const;

export const scotlandRegistrationSourceUrl =
  "https://kb.ros.gov.uk/fees/registration-fees";

export function getScotlandRegistrationFee(price: number): number {
  return (
    scotlandDispositionRegistrationFees.find((band) => band.upTo === null || price <= band.upTo)
      ?.fee ?? scotlandDispositionRegistrationFees.at(-1)?.fee ?? 0
  );
}
