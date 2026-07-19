import { calculatorMetadata } from "../assumptions/calculator";

export const factualReviewDate = "2026-07-19";
export const factualReviewLabel = "19 July 2026";

const reviewedGuideSlugs = [
  "hidden-costs-buying-house",
  "how-much-money-needed-buy-house",
  "first-time-buyer-costs",
  "mortgage-fees-costs",
  "moving-costs-uk",
  "insurance-costs-uk",
  "stamp-duty-explained",
  "taxes-and-fees-uk",
  "furnishing-costs-uk",
  "first-year-cost-buying-house-uk"
] as const;

export const pageReviews = Object.fromEntries(
  reviewedGuideSlugs.map((slug) => [
    slug,
    {
      lastReviewed: factualReviewDate,
      lastReviewedLabel: factualReviewLabel,
      calculatorDataVersion: calculatorMetadata.dataVersion
    }
  ])
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
