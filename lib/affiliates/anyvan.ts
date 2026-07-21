import { trackEvent } from "../analytics";

export type AnyVanPlacementType =
  | "contextual_card"
  | "calculator_result"
  | "display_banner"
  | "contextual_link";

export type AnyVanPlacementKey =
  | "movingGuideInline"
  | "movingGuideBanner"
  | "calculatorRemovalsResult"
  | "firstYearCostsRemovals"
  | "hiddenCostsRemovals";

type AnyVanPlacement = {
  clickReference: string;
  placementType: AnyVanPlacementType;
  pagePath: string;
  afterSectionTitle?: string;
  presentation: "card" | "compact" | "banner";
  heading?: string;
  body?: string;
  ctaLabel?: string;
};

const placements = {
  movingGuideInline: {
    clickReference: "moving-costs-guide-inline",
    placementType: "contextual_card",
    pagePath: "/moving-costs-uk",
    afterSectionTitle: "What moving costs include",
    presentation: "card",
    heading: "Compare removal quotes",
    body: "AnyVan provides instant prices for home removals and man-and-van services across the UK.",
    ctaLabel: "Get an AnyVan removal quote"
  },
  movingGuideBanner: {
    clickReference: "moving-costs-guide-banner",
    placementType: "display_banner",
    pagePath: "/moving-costs-uk",
    afterSectionTitle: "What can change the quotation",
    presentation: "banner"
  },
  calculatorRemovalsResult: {
    clickReference: "calculator-removals-result",
    placementType: "calculator_result",
    pagePath: "/",
    presentation: "compact",
    heading: "Need a current removals price?",
    body: "Compare your planning allowance with an AnyVan quote for your move.",
    ctaLabel: "Compare removal prices"
  },
  firstYearCostsRemovals: {
    clickReference: "first-year-costs-removals",
    placementType: "contextual_card",
    pagePath: "/first-year-cost-buying-house-uk",
    afterSectionTitle: "Four first-year cost scopes",
    presentation: "card",
    heading: "Compare removal quotes",
    body: "If you need removals or a man-and-van service, AnyVan provides instant prices across the UK.",
    ctaLabel: "Get an AnyVan removal quote"
  },
  hiddenCostsRemovals: {
    clickReference: "hidden-costs-removals",
    placementType: "contextual_link",
    pagePath: "/hidden-costs-buying-house",
    afterSectionTitle: "Survey, mortgage and practical move-in costs",
    presentation: "compact",
    heading: "Check a real removals price",
    body: "Moving costs vary with distance, access and the service you choose, so compare the planning allowance with a current quote.",
    ctaLabel: "Compare removal prices with AnyVan"
  }
} as const satisfies Record<AnyVanPlacementKey, AnyVanPlacement>;

export const anyVanAffiliate = {
  advertiser: "AnyVan",
  advertiserId: 2673,
  publisherId: 2980359,
  commissionModel: "5% CPA",
  cookiePeriodDays: 30,
  destinationUrl: "https://www.anyvan.com/removals",
  awinBaseUrl: "https://www.awin1.com/cread.php",
  banner: {
    width: 300,
    height: 250,
    href: "https://www.awin1.com/cread.php?s=2225524&v=2673&q=344445&r=2980359",
    imageSrc: "https://www.awin1.com/cshow.php?s=2225524&v=2673&q=344445&r=2980359"
  },
  placements
} as const;

export const anyVanPlacementKeys = Object.keys(placements) as AnyVanPlacementKey[];

export function buildAnyVanDeepLink(clickReference: string) {
  const encodedClickReference = encodeURIComponent(clickReference);
  const encodedDestination = encodeURIComponent(anyVanAffiliate.destinationUrl);

  return `${anyVanAffiliate.awinBaseUrl}?awinmid=${anyVanAffiliate.advertiserId}&awinaffid=${anyVanAffiliate.publisherId}&clickref=${encodedClickReference}&ued=${encodedDestination}`;
}

export function getAnyVanPlacement(key: AnyVanPlacementKey): AnyVanPlacement {
  return anyVanAffiliate.placements[key];
}

export function getAnyVanGuidePlacements(pagePath: string, sectionTitle: string) {
  return anyVanPlacementKeys.filter((key) => {
    const placement = getAnyVanPlacement(key);
    return placement.pagePath === pagePath && placement.afterSectionTitle === sectionTitle;
  });
}

export function getAnyVanPlacementUrl(key: AnyVanPlacementKey) {
  const placement = getAnyVanPlacement(key);
  return placement.presentation === "banner"
    ? anyVanAffiliate.banner.href
    : buildAnyVanDeepLink(placement.clickReference);
}

export function trackAnyVanAffiliateClick(key: AnyVanPlacementKey, pagePath?: string) {
  const placement = getAnyVanPlacement(key);
  const resolvedPagePath = pagePath ?? (typeof window === "undefined" ? placement.pagePath : window.location.pathname);

  trackEvent("affiliate_click", {
    affiliate: "anyvan",
    click_reference: placement.clickReference,
    page_path: resolvedPagePath,
    placement_type: placement.placementType,
    destination_url: anyVanAffiliate.destinationUrl
  });
}
