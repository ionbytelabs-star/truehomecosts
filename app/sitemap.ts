import type { MetadataRoute } from "next";

import { guideSummaries } from "@/content/guides";
import { absoluteUrl } from "@/lib/metadata";
import { priceGuideSlugs } from "@/lib/price-guide-links";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/about",
    "/methodology",
    "/calculator-updates",
    "/reports/true-cost-buying-home-uk-2026",
    "/press-and-data",
    "/privacy",
    "/terms",
    "/cookies",
    "/contact",
    "/house-buying-cost-by-property-price",
    "/gifted-deposit-mortgage"
  ];

  const publicPagesLastModified = new Date("2026-07-25");
  const llmsLastModified = new Date("2026-06-04");
  const guideSlugSet = new Set(guideSummaries.map((guide) => guide.slug));
  const staticPriceRoutes = priceGuideSlugs.filter((slug) => !guideSlugSet.has(slug));

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route),
      lastModified: publicPagesLastModified,
      changeFrequency: (route === "/" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: route === "/" ? 1 : 0.7
    })),
    ...guideSummaries.map((guide) => ({
      url: absoluteUrl(guide.slug),
      lastModified: new Date(guide.lastReviewed),
      changeFrequency: "monthly" as const,
      priority: 0.8
    })),
    ...staticPriceRoutes.map((slug) => ({
      url: absoluteUrl(slug),
      lastModified: publicPagesLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8
    })),
    {
      url: absoluteUrl("/llms.txt"),
      lastModified: llmsLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.3
    }
  ];
}
