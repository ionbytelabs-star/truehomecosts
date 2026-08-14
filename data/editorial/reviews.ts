import { calculatorMetadata } from "../assumptions/calculator";

export const factualReviewDate = "2026-07-19";
export const factualReviewLabel = "19 July 2026";

const pageReviewOverrides: Record<
  string,
  { lastReviewed: string; lastReviewedLabel: string }
> = {
  "mortgage-fees-costs": {
    lastReviewed: "2026-08-11",
    lastReviewedLabel: "11 August 2026"
  }
};

const reviewedGuideSlugs = [
  "hidden-costs-buying-house",
  "how-much-money-needed-buy-house",
  "first-time-buyer-costs",
  "mortgage-fees-costs",
  "moving-costs-uk",
  "insurance-costs-uk",
  "stamp-duty-explained",
  "furnishing-costs-uk",
  "first-year-cost-buying-house-uk"
] as const;

export const pageReviews = Object.fromEntries(
  reviewedGuideSlugs.map((slug) => {
    const override = pageReviewOverrides[slug];

    return [
      slug,
      {
        lastReviewed: override?.lastReviewed ?? factualReviewDate,
        lastReviewedLabel: override?.lastReviewedLabel ?? factualReviewLabel,
        calculatorDataVersion: calculatorMetadata.dataVersion
      }
    ];
  })
) as Record<
  (typeof reviewedGuideSlugs)[number],
  { lastReviewed: string; lastReviewedLabel: string; calculatorDataVersion: string }
>;

export function getPageReview(slug: string) {
  return (
    pageReviews[slug as keyof typeof pageReviews] ?? {
      lastReviewed: factualReviewDate,
      lastReviewedLabel: factualReviewLabel,
      calculatorDataVersion: calculatorMetadata.dataVersion
    }
  );
}
