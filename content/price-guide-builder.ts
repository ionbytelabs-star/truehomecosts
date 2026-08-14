import { getPageReview } from "../data/editorial/reviews";
import { calculateUpfrontCosts, type CalculatorInput, type CalculatorResult } from "../lib/calculator";
import { calculateScopeRange, formatScopeRange, getScopeTotal } from "../lib/cost-scopes";
import { formatCurrency } from "../lib/format";

import type { AtGlanceItem, FAQItem, GuidePageContent, GuideSection } from "./types";

export const comparisonPropertyPrices = [
  150_000,
  200_000,
  225_000,
  250_000,
  275_000,
  300_000,
  325_000,
  350_000,
  375_000,
  400_000,
  425_000,
  450_000,
  475_000,
  500_000,
  600_000,
  750_000
] as const;

export const retainedPropertyPrices = [
  150_000,
  200_000,
  250_000,
  300_000,
  400_000,
  500_000,
  600_000,
  750_000
] as const;

export type RetainedPropertyPrice = (typeof retainedPropertyPrices)[number];

const scenarioBase = (price: number): Omit<CalculatorInput, "jurisdiction" | "buyerType"> => ({
  propertyPrice: price,
  depositMode: "percentage",
  depositPercentage: 10,
  assumptionLevel: "average",
  includeMoving: true,
  includeInsurance: true,
  includeFurnishing: false,
  includeContingency: true,
  contingencyPercentage: 10
});

function scenario(
  price: number,
  jurisdiction: CalculatorInput["jurisdiction"],
  buyerType: CalculatorInput["buyerType"],
  depositPercentage = 10
) {
  return calculateUpfrontCosts({
    ...scenarioBase(price),
    jurisdiction,
    buyerType,
    depositPercentage
  });
}

export type PriceGuideFacts = {
  price: number;
  slug: string;
  formattedPrice: string;
  deposits: Record<5 | 10 | 15 | 20, number>;
  englandFirstTimeBuyer: CalculatorResult;
  englandHomeMover: CalculatorResult;
  northernIrelandHomeMover: CalculatorResult;
  scotlandHomeMover: CalculatorResult;
  walesHomeMover: CalculatorResult;
  coreNonTaxRange: ReturnType<typeof calculateScopeRange>;
  movingAndInsurance: number;
};

export function getPriceGuideFacts(price: number): PriceGuideFacts {
  const englandHomeMover = scenario(price, "england", "home-mover");
  const coreNonTaxRange = calculateScopeRange(
    { ...scenarioBase(price), jurisdiction: "england", buyerType: "home-mover" },
    "core-non-tax-transaction-costs"
  );

  return {
    price,
    slug: `cost-to-buy-${price / 1000}k-house`,
    formattedPrice: formatCurrency(price),
    deposits: {
      5: Math.round(price * 0.05),
      10: Math.round(price * 0.1),
      15: Math.round(price * 0.15),
      20: Math.round(price * 0.2)
    },
    englandFirstTimeBuyer: scenario(price, "england", "first-time-buyer"),
    englandHomeMover,
    northernIrelandHomeMover: scenario(price, "northern-ireland", "home-mover"),
    scotlandHomeMover: scenario(price, "scotland", "home-mover"),
    walesHomeMover: scenario(price, "wales", "home-mover"),
    coreNonTaxRange,
    movingAndInsurance: getScopeTotal(englandHomeMover, "wider-moving-and-insurance")
  };
}

export function estimatedBuyingCosts(result: CalculatorResult): number {
  return result.totalUpfrontCash - result.depositAmount;
}

export function depositTable(facts: PriceGuideFacts, caption: string) {
  return {
    caption,
    columns: ["Deposit", "Cash deposit", "Illustrative mortgage"],
    rows: ([5, 10, 15, 20] as const).map((percentage) => [
      `${percentage}%`,
      formatCurrency(facts.deposits[percentage]),
      formatCurrency(facts.price - facts.deposits[percentage])
    ])
  };
}

export function jurisdictionTable(facts: PriceGuideFacts, caption: string) {
  return {
    caption,
    columns: ["Scenario", "Property tax", "Estimated cash with 10% deposit"],
    rows: [
      ["England first-time buyer", facts.englandFirstTimeBuyer],
      ["England home mover", facts.englandHomeMover],
      ["Northern Ireland home mover", facts.northernIrelandHomeMover],
      ["Scotland home mover", facts.scotlandHomeMover],
      ["Wales home mover", facts.walesHomeMover]
    ].map(([label, result]) => {
      const calculated = result as CalculatorResult;
      return [
        label as string,
        formatCurrency(calculated.propertyTaxAmount),
        formatCurrency(calculated.totalUpfrontCash)
      ];
    })
  };
}

type PriceGuideFoundation = Pick<
  GuidePageContent,
  | "slug"
  | "keywords"
  | "contextualLinks"
  | "trustReviewedText"
  | "updatedLabel"
  | "lastReviewed"
  | "lastReviewedLabel"
  | "calculatorDataVersion"
  | "relatedGuides"
  | "officialSourceKeys"
  | "sourceKeys"
  | "officialItems"
  | "estimateItems"
>;

export function createPriceGuideFoundation(price: number): PriceGuideFoundation {
  const facts = getPriceGuideFacts(price);
  const review = getPageReview(facts.slug);
  const index = retainedPropertyPrices.indexOf(price as RetainedPropertyPrice);
  const neighbours = [retainedPropertyPrices[index - 1], retainedPropertyPrices[index + 1]]
    .filter((value): value is RetainedPropertyPrice => typeof value === "number")
    .map((value) => `cost-to-buy-${value / 1000}k-house`);

  return {
    slug: facts.slug,
    keywords: [
      `cost to buy ${price / 1000}k house UK`,
      `cash needed for ${price / 1000}k property`,
      `fees buying ${price / 1000}k house`
    ],
    contextualLinks: [
      { href: "/#calculator", label: "UK house buying cost calculator" },
      { href: "/house-buying-cost-by-property-price", label: "property-price comparison hub" },
      { href: "/methodology", label: "calculation methodology" },
      { href: "/stamp-duty-explained", label: "UK property-tax guide" },
      { href: "/how-much-money-needed-buy-house", label: "total cash needed guide" }
    ],
    trustReviewedText: `Factual figures and official sources were reviewed on ${review.lastReviewedLabel}. Worked examples use calculator data version ${review.calculatorDataVersion}.`,
    updatedLabel: `Reviewed ${review.lastReviewedLabel}`,
    lastReviewed: review.lastReviewed,
    lastReviewedLabel: review.lastReviewedLabel,
    calculatorDataVersion: review.calculatorDataVersion,
    relatedGuides: [
      "how-much-money-needed-buy-house",
      "stamp-duty-explained",
      "hidden-costs-buying-house",
      ...neighbours
    ],
    officialSourceKeys: ["sdlt", "lbtt", "lbttAds", "ltt", "hmlr", "ros", "lpsNi"],
    sourceKeys: ["sdlt", "lbtt", "lbttAds", "ltt", "hmlr", "ros", "lpsNi"],
    officialItems: [
      "jurisdiction-specific property tax calculations",
      "applicable published registration charges"
    ],
    estimateItems: [
      "solicitor/conveyancing",
      "searches",
      "survey and valuation",
      "mortgage fees",
      "moving",
      "insurance",
      "furnishing and contingency"
    ]
  };
}

export type PriceGuideEditorial = {
  title: string;
  description: string;
  h1: string;
  intro: string;
  directAnswer: (facts: PriceGuideFacts) => string;
  atGlance: (facts: PriceGuideFacts) => AtGlanceItem[];
  sections: (facts: PriceGuideFacts) => GuideSection[];
  faqs: (facts: PriceGuideFacts) => FAQItem[];
  ctaTitle: string;
  ctaText: string;
  mistakes: string[];
  checklist: string[];
};

export function createPriceGuide(price: RetainedPropertyPrice, editorial: PriceGuideEditorial): GuidePageContent {
  const facts = getPriceGuideFacts(price);

  return {
    ...createPriceGuideFoundation(price),
    title: editorial.title,
    description: editorial.description,
    h1: editorial.h1,
    intro: editorial.intro,
    directAnswer: editorial.directAnswer(facts),
    atGlance: editorial.atGlance(facts),
    sections: editorial.sections(facts),
    faqs: editorial.faqs(facts),
    ctaTitle: editorial.ctaTitle,
    ctaText: editorial.ctaText,
    mistakes: editorial.mistakes,
    checklist: editorial.checklist
  };
}

export function standardAtGlance(facts: PriceGuideFacts, noteworthy: string): AtGlanceItem[] {
  return [
    { label: "Property price", value: facts.formattedPrice },
    { label: "10% deposit", value: formatCurrency(facts.deposits[10]) },
    {
      label: "England home-mover tax",
      value: formatCurrency(facts.englandHomeMover.propertyTaxAmount)
    },
    { label: "What stands out", value: noteworthy }
  ];
}

export function sharedCostExplanation(facts: PriceGuideFacts): string {
  return `The calculator's core non-tax transaction range is ${formatScopeRange(facts.coreNonTaxRange)}. It covers legal work, searches, survey and valuation, mortgage fees, registration and bank-transfer fees; it excludes the deposit, property tax, moving, insurance, furnishing and contingency.`;
}
