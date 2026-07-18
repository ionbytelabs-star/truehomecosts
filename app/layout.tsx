import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import type { ReactNode } from "react";

import { CookieConsentBanner } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StructuredData } from "@/components/StructuredData";
import "@/app/globals.css";
import { absoluteUrl } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";

const impactSiteVerificationMeta = {
  name: "impact-site-verification",
  value: "1988fada-ad1d-49a5-b3be-5a32d258be0a"
} as Record<string, string>;

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans"
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | True cost of buying a house UK`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  alternates: {
    canonical: absoluteUrl("/")
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-GB">
      <head>
        <meta {...impactSiteVerificationMeta} />
        <meta name="msapplication-TileColor" content="#a4cf7f" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#0f355e" />
        <meta name="google-adsense-account" content="ca-pub-9018565465942454" />
      </head>
      <body className={`${manrope.variable} ${fraunces.variable} font-sans text-text antialiased`}>
        <StructuredData data={websiteSchema()} />
        <StructuredData data={organizationSchema()} />
        <div className="min-h-screen">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
        <CookieConsentBanner />
      </body>
    </html>
  );
}
