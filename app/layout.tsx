import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import type { ReactNode } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StructuredData } from "@/components/StructuredData";
import "@/app/globals.css";
import { siteConfig } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";

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
    canonical: siteConfig.url
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-GB">
      <body className={`${manrope.variable} ${fraunces.variable} font-sans text-text antialiased`}>
        <StructuredData data={websiteSchema()} />
        <StructuredData data={organizationSchema()} />
        <div className="min-h-screen">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
