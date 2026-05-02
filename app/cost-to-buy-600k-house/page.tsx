import { GuidePageTemplate } from "@/components/GuidePageTemplate";
import { extraPriceGuides } from "@/content/extra-price-guides";
import { buildMetadata } from "@/lib/metadata";

const guide = extraPriceGuides["cost-to-buy-600k-house"];

export const metadata = buildMetadata({
  title: guide.title,
  description: guide.description,
  path: `/${guide.slug}`,
  keywords: guide.keywords
});

export default function CostToBuy600kHousePage() {
  return <GuidePageTemplate guide={guide} />;
}
