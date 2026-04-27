import type { MetadataRoute } from "next";

import { guideSummaries } from "@/content/guides";
import { absoluteUrl } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/about",
    "/privacy",
    "/cookies",
    "/contact"
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route),
      lastModified: now,
      changeFrequency: (route === "/" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: route === "/" ? 1 : 0.7
    })),
    ...guideSummaries.map((guide) => ({
      url: absoluteUrl(guide.slug),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8
    }))
  ];
}
