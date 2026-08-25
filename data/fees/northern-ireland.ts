/**
 * Current Land Registry transfer scale under the Land Registry (Fees) Order
 * (Northern Ireland) 2014. The 2026 Department of Finance consultation confirms
 * this order remains in force until the proposed 2027 fees commence.
 * Sources rechecked 25 August 2026.
 */
export const northernIrelandLandRegistryTransferFees = [
  { upTo: 20_000, electronic: 80, other: 100 },
  { upTo: 80_000, electronic: 120, other: 160 },
  { upTo: 100_000, electronic: 160, other: 220 },
  { upTo: 150_000, electronic: 220, other: 260 },
  { upTo: 200_000, electronic: 310, other: 370 },
  { upTo: 250_000, electronic: 355, other: 425 },
  { upTo: null, electronic: 445, other: 535 }
] as const;

export const northernIrelandLandRegistrySourceUrl =
  "https://www.legislation.gov.uk/nisr/2014/139/contents/made";

export const northernIrelandFeesReviewSourceUrl =
  "https://www.finance-ni.gov.uk/consultations/department-finance-land-registration-fees-orders-consultation";

export function getNorthernIrelandRegistrationAllowance(price: number): number {
  return (
    northernIrelandLandRegistryTransferFees.find((band) => band.upTo === null || price <= band.upTo)
      ?.electronic ?? northernIrelandLandRegistryTransferFees.at(-1)?.electronic ?? 0
  );
}
