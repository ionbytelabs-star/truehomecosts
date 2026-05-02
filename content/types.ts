import type { SourceKey } from "@/lib/source-links";

export type FAQItem = {
  question: string;
  answer: string;
};

export type AtGlanceItem = {
  label: string;
  value: string;
};

export type GuideSection = {
  title: string;
  intro?: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: {
    summary?: string;
    caption?: string;
    columns: string[];
    rows: string[][];
  };
  callout?: string;
};

export type GuidePageContent = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  intro: string;
  directAnswer: string;
  introSections?: GuideSection[];
  contextualLinks?: Array<{
    href: string;
    label: string;
  }>;
  trustReviewedText?: string;
  updatedLabel: string;
  atGlance: AtGlanceItem[];
  sections: GuideSection[];
  faqs: FAQItem[];
  relatedGuides: string[];
  sourceKeys: SourceKey[];
  ctaTitle: string;
  ctaText: string;
  officialItems: string[];
  estimateItems: string[];
  mistakes: string[];
  checklist: string[];
};
