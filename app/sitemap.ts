import type { MetadataRoute } from "next";

import { guideSummaries } from "@/content/guides";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/privacy",
    "/cookies",
    "/contact"
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: now,
      changeFrequency: (route === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: route === "" ? 1 : 0.7
    })),
    ...guideSummaries.map((guide) => ({
      url: `${siteConfig.url}/${guide.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8
    }))
  ];
}
