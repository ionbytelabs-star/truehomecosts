import { absoluteUrl } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

const rootUrl = siteConfig.url;
const organizationId = `${rootUrl}#organization`;
const websiteId = `${rootUrl}#website`;
const calculatorApplicationId = `${rootUrl}#calculator`;
const representativeImageUrl = absoluteUrl("/og-image.png");

function canonicalUrl(path: string) {
  return path === "/" ? rootUrl : absoluteUrl(path);
}

function webPageId(path: string) {
  return `${canonicalUrl(path)}#webpage`;
}

function organizationReference() {
  return {
    "@type": "Organization",
    "@id": organizationId
  };
}

export function calculatorApplicationReference() {
  return {
    "@type": "WebApplication",
    "@id": calculatorApplicationId
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: siteConfig.name,
    url: rootUrl,
    description: siteConfig.description,
    inLanguage: "en-GB",
    publisher: organizationReference()
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    url: rootUrl,
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
  keywords,
  mainEntity
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  mainEntity?: Record<string, unknown>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": webPageId(path),
    name: title,
    description,
    url: canonicalUrl(path),
    keywords,
    inLanguage: "en-GB",
    publisher: organizationReference(),
    isPartOf: {
      "@type": "WebSite",
      "@id": websiteId,
      name: siteConfig.name,
      url: rootUrl
    },
    ...(mainEntity ? { mainEntity } : {})
  };
}

export function calculatorApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": calculatorApplicationId,
    name: "TrueHomeCosts UK House Buying Cost Calculator",
    url: rootUrl,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    inLanguage: "en-GB",
    isAccessibleForFree: true,
    browserRequirements: "Requires a modern web browser with JavaScript enabled.",
    description:
      "A browser-based UK house buying cost calculator for estimating deposit, property tax, legal fees, survey costs, mortgage fees, moving costs and total upfront cash needed.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP"
    },
    publisher: organizationReference()
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
  const pageUrl = canonicalUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline,
    description,
    keywords,
    dateModified,
    inLanguage: "en-GB",
    image: representativeImageUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": webPageId(path)
    },
    author: organizationReference(),
    publisher: {
      "@type": "Organization",
      "@id": organizationId,
      name: siteConfig.name,
      url: rootUrl,
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
  const currentPath = items[items.length - 1]?.path ?? "/";

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl(currentPath)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path)
    }))
  };
}
