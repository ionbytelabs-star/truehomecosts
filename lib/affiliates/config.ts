import { trackEvent } from "../analytics";

export const affiliateDisclosure =
  "Affiliate link: True Home Costs may earn a commission if you book, at no extra cost to you.";

export const affiliateRel = "sponsored nofollow noopener";

export type AffiliateKey = "anyvan" | "safestore";
export type AffiliatePlacementType =
  | "recommendation_card"
  | "calculator_result"
  | "inline_link"
  | "banner";
export type AffiliatePresentation = "card" | "compact" | "banner";

type ImageBanner = {
  type: "image";
  href: string;
  imageSrc: string;
  alt: string;
  fallback: {
    eyebrow: string;
    heading: string;
    body: string;
    cta: string;
  };
};

type IframeBanner = {
  type: "iframe";
  src: string;
  title: string;
};

type AffiliateAdvertiser = {
  name: string;
  advertiserId: number;
  publisherId: number;
  destinationUrl: string;
  disclosure: string;
  ga4Name: AffiliateKey;
  banner: (ImageBanner | IframeBanner) & { width: 300; height: 250 };
};

export type AffiliatePlacement = {
  affiliate: AffiliateKey;
  clickReference: string;
  placementType: AffiliatePlacementType;
  pagePath: string;
  afterSectionTitle?: string;
  presentation: AffiliatePresentation;
  heading?: string;
  body?: string;
  ctaLabel?: string;
};

export const affiliates = {
  anyvan: {
    name: "AnyVan",
    advertiserId: 2673,
    publisherId: 2980359,
    destinationUrl: "https://www.anyvan.com/removals",
    disclosure: affiliateDisclosure,
    ga4Name: "anyvan",
    banner: {
      type: "image",
      width: 300,
      height: 250,
      href: "https://www.awin1.com/cread.php?s=2225524&v=2673&q=344445&r=2980359",
      imageSrc: "https://www.awin1.com/cshow.php?s=2225524&v=2673&q=344445&r=2980359",
      alt: "Compare home removal and man-and-van quotes with AnyVan",
      fallback: {
        eyebrow: "AnyVan",
        heading: "Compare removal quotes",
        body: "Home removals and man-and-van services across the UK.",
        cta: "Get a removal quote"
      }
    }
  },
  safestore: {
    name: "Safestore",
    advertiserId: 5915,
    publisherId: 2980359,
    destinationUrl: "https://www.safestore.co.uk/storage-types/personal-storage/",
    disclosure: affiliateDisclosure,
    ga4Name: "safestore",
    banner: {
      type: "iframe",
      width: 300,
      height: 250,
      src: "https://www.awin1.com/cawshow.php?v=5915&s=2283216&q=350988&r=2980359&iframe=1",
      title: "Safestore personal storage offer"
    }
  }
} as const satisfies Record<AffiliateKey, AffiliateAdvertiser>;

export const affiliatePlacements = {
  movingGuideAnyVanCard: {
    affiliate: "anyvan",
    clickReference: "moving-costs-guide-anyvan-card",
    placementType: "recommendation_card",
    pagePath: "/moving-costs-uk",
    afterSectionTitle: "Removal company costs for a typical UK move",
    presentation: "card",
    heading: "Compare removal quotes",
    body: "AnyVan provides instant prices for UK home removals and man-and-van services.",
    ctaLabel: "Get an AnyVan removal quote"
  },
  movingGuideSafestoreCard: {
    affiliate: "safestore",
    clickReference: "moving-costs-guide-safestore-card",
    placementType: "recommendation_card",
    pagePath: "/moving-costs-uk",
    afterSectionTitle: "Removal company costs for a typical UK move",
    presentation: "card",
    heading: "Need temporary storage during your move?",
    body: "Safestore offers personal storage for people moving home, renovating or waiting between completion dates.",
    ctaLabel: "Check Safestore storage options"
  },
  movingGuideAnyVanBanner: {
    affiliate: "anyvan",
    clickReference: "moving-costs-guide-anyvan-banner",
    placementType: "banner",
    pagePath: "/moving-costs-uk",
    afterSectionTitle: "Packing services, storage and mail redirection",
    presentation: "banner"
  },
  calculatorAnyVanRemovals: {
    affiliate: "anyvan",
    clickReference: "calculator-results-anyvan-removals",
    placementType: "calculator_result",
    pagePath: "/",
    presentation: "compact",
    heading: "Need a current removals price?",
    body: "Compare your planning allowance with an AnyVan quote for your move.",
    ctaLabel: "Compare removal prices"
  },
  calculatorSafestoreStorage: {
    affiliate: "safestore",
    clickReference: "calculator-results-safestore-storage",
    placementType: "calculator_result",
    pagePath: "/",
    presentation: "compact",
    heading: "Need temporary storage?",
    body: "Safestore offers personal storage when move dates or belongings need more flexibility.",
    ctaLabel: "Check Safestore storage options"
  },
  firstYearAnyVan: {
    affiliate: "anyvan",
    clickReference: "first-year-costs-anyvan",
    placementType: "recommendation_card",
    pagePath: "/first-year-cost-buying-house-uk",
    afterSectionTitle: "Four first-year cost scopes",
    presentation: "compact",
    heading: "Compare removal quotes",
    body: "AnyVan provides instant prices for UK home removals and man-and-van services.",
    ctaLabel: "Get an AnyVan removal quote"
  },
  firstYearSafestore: {
    affiliate: "safestore",
    clickReference: "first-year-costs-safestore",
    placementType: "recommendation_card",
    pagePath: "/first-year-cost-buying-house-uk",
    afterSectionTitle: "Four first-year cost scopes",
    presentation: "compact",
    heading: "Need storage between dates?",
    body: "Safestore can help when moving dates, renovations or belongings need more flexibility.",
    ctaLabel: "Check Safestore storage options"
  },
  newBuildSafestoreDelays: {
    affiliate: "safestore",
    clickReference: "new-build-delays-safestore",
    placementType: "recommendation_card",
    pagePath: "/hidden-costs-buying-new-build-home-uk",
    afterSectionTitle: "New build delays and temporary costs",
    presentation: "compact",
    heading: "Need storage while dates change?",
    body: "Safestore offers personal storage if a completion date moves or you need to store belongings temporarily.",
    ctaLabel: "Check Safestore storage options"
  },
  newBuildAnyVanMoving: {
    affiliate: "anyvan",
    clickReference: "new-build-moving-anyvan",
    placementType: "inline_link",
    pagePath: "/hidden-costs-buying-new-build-home-uk",
    afterSectionTitle: "Moving and first-year ownership costs",
    presentation: "compact",
    heading: "Compare removal quotes",
    body: "Compare your moving allowance with a current AnyVan quote when you know your moving plans.",
    ctaLabel: "Compare removal prices"
  },
  hiddenCostsAnyVan: {
    affiliate: "anyvan",
    clickReference: "hidden-costs-removals",
    placementType: "inline_link",
    pagePath: "/hidden-costs-buying-house",
    afterSectionTitle: "Survey, mortgage and practical move-in costs",
    presentation: "compact",
    heading: "Check a real removals price",
    body: "Moving costs vary with distance, access and the service you choose, so compare the planning allowance with a current quote.",
    ctaLabel: "Compare removal prices with AnyVan"
  }
} as const satisfies Record<string, AffiliatePlacement>;

export type AffiliatePlacementKey = keyof typeof affiliatePlacements;
export const affiliatePlacementKeys = Object.keys(affiliatePlacements) as AffiliatePlacementKey[];

const clickReferencePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateClickReference(clickReference: string) {
  if (!clickReferencePattern.test(clickReference)) {
    throw new Error("Affiliate click references must be non-empty lowercase kebab-case strings.");
  }
  return clickReference;
}

export function buildAffiliateDeepLink(affiliateKey: AffiliateKey, clickReference: string) {
  const affiliate = affiliates[affiliateKey];
  const validClickReference = validateClickReference(clickReference);
  return `https://www.awin1.com/cread.php?awinmid=${affiliate.advertiserId}&awinaffid=${affiliate.publisherId}&clickref=${encodeURIComponent(validClickReference)}&ued=${encodeURIComponent(affiliate.destinationUrl)}`;
}

export function getAffiliatePlacement(key: AffiliatePlacementKey): AffiliatePlacement {
  return affiliatePlacements[key];
}

export function getAffiliatePlacementUrl(key: AffiliatePlacementKey) {
  const placement = getAffiliatePlacement(key);
  const affiliate = affiliates[placement.affiliate];
  return placement.presentation === "banner" && affiliate.banner.type === "image"
    ? affiliate.banner.href
    : buildAffiliateDeepLink(placement.affiliate, placement.clickReference);
}

export function getAffiliateGuidePlacements(pagePath: string, sectionTitle: string) {
  return affiliatePlacementKeys.filter((key) => {
    const placement = getAffiliatePlacement(key);
    return placement.pagePath === pagePath && placement.afterSectionTitle === sectionTitle;
  });
}

export function trackAffiliateClick(key: AffiliatePlacementKey, pagePath?: string) {
  const placement = getAffiliatePlacement(key);
  const affiliate = affiliates[placement.affiliate];
  const resolvedPagePath = pagePath ?? (typeof window === "undefined" ? placement.pagePath : window.location.pathname);

  trackEvent("affiliate_click", {
    affiliate_name: affiliate.ga4Name,
    advertiser_id: affiliate.advertiserId,
    click_reference: placement.clickReference,
    page_path: resolvedPagePath,
    placement_type: placement.placementType,
    destination_url: affiliate.destinationUrl
  });
}
