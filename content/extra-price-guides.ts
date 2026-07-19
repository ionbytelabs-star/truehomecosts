import { createConsistentPriceGuide } from "./price-guide-builder";
import type { GuidePageContent } from "./types";

const extraPricePoints = [
  150_000,
  200_000,
  225_000,
  275_000,
  325_000,
  375_000,
  425_000,
  475_000,
  600_000,
  750_000
];

export const extraPriceGuides = Object.fromEntries(
  extraPricePoints.map((price) => {
    const guide = createConsistentPriceGuide(price);
    return [guide.slug, guide];
  })
) as Record<string, GuidePageContent>;
