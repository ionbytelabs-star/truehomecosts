import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

type MetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
};

export function absoluteUrl(path = "/"): string {
  const normalisedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalisedPath, siteConfig.url).toString();
}

export function buildMetadata({ title, description, path = "/", keywords }: MetadataOptions): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url
    },
    openGraph: {
      type: "website",
      url,
      title: `${title} | ${siteConfig.name}`,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: absoluteUrl("/og-image.svg"),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} preview`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [absoluteUrl("/og-image.svg")]
    }
  };
}
