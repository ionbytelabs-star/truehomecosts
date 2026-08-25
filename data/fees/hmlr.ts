/**
 * Official HM Land Registry Scale 1 and Scale 2 registration fees.
 *
 * The common homepage assumption remains the Scale 1 portal / Business Gateway
 * rate for a transfer of the whole of a registered title. The complete tables
 * support the dedicated Land Registry fee calculator and guide.
 *
 * Source verified 25 August 2026:
 * https://www.gov.uk/guidance/hm-land-registry-registration-services-fees
 */

export type HmlrScale1Route =
  | "post"
  | "portal-whole"
  | "portal-part-lease"
  | "voluntary-first-registration";

export type HmlrScale2Route = "post" | "portal-whole" | "portal-part-other";

export const hmlrScale1FeeBands = [
  {
    label: "£0–£80,000",
    upTo: 80_000,
    post: 45,
    portalWhole: 20,
    portalPartLease: 45,
    voluntaryFirstRegistration: 30
  },
  {
    label: "£80,001–£100,000",
    upTo: 100_000,
    post: 95,
    portalWhole: 40,
    portalPartLease: 95,
    voluntaryFirstRegistration: 70
  },
  {
    label: "£100,001–£200,000",
    upTo: 200_000,
    post: 230,
    portalWhole: 100,
    portalPartLease: 230,
    voluntaryFirstRegistration: 170
  },
  {
    label: "£200,001–£500,000",
    upTo: 500_000,
    post: 330,
    portalWhole: 150,
    portalPartLease: 330,
    voluntaryFirstRegistration: 250
  },
  {
    label: "£500,001–£1,000,000",
    upTo: 1_000_000,
    post: 655,
    portalWhole: 295,
    portalPartLease: 655,
    voluntaryFirstRegistration: 495
  },
  {
    label: "£1,000,001+",
    upTo: null,
    post: 1_105,
    portalWhole: 500,
    portalPartLease: 1_105,
    voluntaryFirstRegistration: 830
  }
] as const;

export const hmlrScale2FeeBands = [
  { label: "£0–£100,000", upTo: 100_000, post: 45, portalWhole: 20, portalPartOther: 45 },
  { label: "£100,001–£200,000", upTo: 200_000, post: 70, portalWhole: 30, portalPartOther: 70 },
  { label: "£200,001–£500,000", upTo: 500_000, post: 100, portalWhole: 45, portalPartOther: 100 },
  { label: "£500,001–£1,000,000", upTo: 1_000_000, post: 145, portalWhole: 65, portalPartOther: 145 },
  { label: "£1,000,001+", upTo: null, post: 305, portalWhole: 140, portalPartOther: 305 }
] as const;

export const hmlrElectronicScale1Fees = hmlrScale1FeeBands.map((band) => ({
  upTo: band.upTo,
  fee: band.portalWhole
}));

export const hmlrSourceUrl =
  "https://www.gov.uk/guidance/hm-land-registry-registration-services-fees";

export const hmlrFeeCalculatorUrl = "https://fee-calculator.landregistry.gov.uk/";

function validAssessmentValue(value: number): boolean {
  return Number.isFinite(value) && value >= 0;
}

export function getHmlrScale1Fee(value: number, route: HmlrScale1Route): number | null {
  if (!validAssessmentValue(value)) {
    return null;
  }

  const band = hmlrScale1FeeBands.find((candidate) => candidate.upTo === null || value <= candidate.upTo);

  if (!band) {
    return null;
  }

  switch (route) {
    case "post":
      return band.post;
    case "portal-whole":
      return band.portalWhole;
    case "portal-part-lease":
      return band.portalPartLease;
    case "voluntary-first-registration":
      return band.voluntaryFirstRegistration;
  }
}

export function getHmlrScale2Fee(value: number, route: HmlrScale2Route): number | null {
  if (!validAssessmentValue(value)) {
    return null;
  }

  const band = hmlrScale2FeeBands.find((candidate) => candidate.upTo === null || value <= candidate.upTo);

  if (!band) {
    return null;
  }

  switch (route) {
    case "post":
      return band.post;
    case "portal-whole":
      return band.portalWhole;
    case "portal-part-other":
      return band.portalPartOther;
  }
}

export function parseHmlrAssessmentValue(rawValue: string): number | null {
  const normalised = rawValue.trim().replace(/[£,\s]/g, "");

  if (!normalised || !/^\d+(?:\.\d{1,2})?$/.test(normalised)) {
    return null;
  }

  const value = Number(normalised);
  return validAssessmentValue(value) ? value : null;
}
