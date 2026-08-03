import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

type MetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  absoluteTitle?: boolean;
  socialImage?: string;
  socialImageAlt?: string;
};

export function absoluteUrl(path = "/"): string {
  const normalisedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalisedPath, siteConfig.url).toString();
}

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords,
  absoluteTitle = false,
  socialImage = "/og-image.png",
  socialImageAlt = `${siteConfig.name} preview`
}: MetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url
    },
    openGraph: {
      type: "website",
      url,
      title: socialTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: absoluteUrl(socialImage),
          width: 1200,
          height: 630,
          alt: socialImageAlt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [absoluteUrl(socialImage)]
    }
  };
}
