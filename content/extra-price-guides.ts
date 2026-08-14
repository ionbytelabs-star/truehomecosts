import { createRetainedPriceGuide } from "./price-guides";
import type { RetainedPropertyPrice } from "./price-guide-builder";
import type { GuidePageContent } from "./types";

const extraPricePoints: RetainedPropertyPrice[] = [
  150_000,
  200_000,
  600_000,
  750_000
];

export const extraPriceGuides = Object.fromEntries(
  extraPricePoints.map((price) => {
    const guide = createRetainedPriceGuide(price);
    return [guide.slug, guide];
  })
) as Record<string, GuidePageContent>;
