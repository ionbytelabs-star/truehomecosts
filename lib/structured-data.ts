import { absoluteUrl } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    inLanguage: "en-GB",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name
    }
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/icon.svg"),
    email: siteConfig.email,
    description: siteConfig.description,
    areaServed: "GB"
  };
}

export function webpageSchema({
  title,
  description,
  path,
  keywords
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(path),
    keywords,
    inLanguage: "en-GB",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url
    }
  };
}

export function calculatorApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "TrueHomeCosts UK House Buying Cost Calculator",
    url: absoluteUrl("/"),
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    inLanguage: "en-GB",
    description:
      "A browser-based UK house buying cost calculator for estimating deposit, property tax, legal fees, survey costs, mortgage fees, moving costs and total upfront cash needed.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP"
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url
    }
  };
}

export function articleSchema({
  headline,
  description,
  path,
  keywords,
  dateModified = "2026-04-23"
}: {
  headline: string;
  description: string;
  path: string;
  keywords?: string[];
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    keywords,
    dateModified,
    inLanguage: "en-GB",
    mainEntityOfPage: absoluteUrl(path),
    author: {
      "@type": "Organization",
      name: siteConfig.name
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icon.svg")
      }
    }
  };
}

export function faqPageSchema(
  faqs: Array<{
    question: string;
    answer: string;
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function breadcrumbSchema(
  items: Array<{
    name: string;
    path: string;
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}
