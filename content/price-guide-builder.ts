import { calculateUpfrontCosts, type CalculatorInput } from "../lib/calculator";
import {
  calculateScopeRange,
  costScopeDefinitions,
  formatScopeRange,
  getScopeTotal
} from "../lib/cost-scopes";
import { formatCurrency } from "../lib/format";
import { getPageReview } from "../data/editorial/reviews";

import type { GuidePageContent } from "./types";

const allPricePoints = [
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

function scenario(price: number, jurisdiction: CalculatorInput["jurisdiction"], buyerType: CalculatorInput["buyerType"]) {
  return calculateUpfrontCosts({ ...scenarioBase(price), jurisdiction, buyerType });
}

function priceContext(price: number) {
  if (price <= 225_000) return "At this lower price point, relatively small fees can still put meaningful pressure on a tight deposit budget.";
  if (price <= 375_000) return "At this mainstream price point, tax treatment and a realistic survey or moving allowance can create a noticeable gap between two buyers.";
  if (price <= 500_000) return "At this price, jurisdiction and buyer type materially affect the cash target, so a single UK-wide total would be misleading.";
  return "At this higher price point, progressive tax bands, registration charges and survey choices make scenario-specific planning particularly important.";
}

export function createConsistentPriceGuide(price: number): GuidePageContent {
  const slug = `cost-to-buy-${price / 1000}k-house`;
  const review = getPageReview(slug);
  const formattedPrice = formatCurrency(price);
  const englandFtb = scenario(price, "england", "first-time-buyer");
  const englandMover = scenario(price, "england", "home-mover");
  const northernIrelandMover = scenario(price, "northern-ireland", "home-mover");
  const scotlandMover = scenario(price, "scotland", "home-mover");
  const walesMover = scenario(price, "wales", "home-mover");
  const nonTaxRange = calculateScopeRange(
    { ...scenarioBase(price), jurisdiction: "england", buyerType: "home-mover" },
    "core-non-tax-transaction-costs"
  );
  const movingInsurance = getScopeTotal(englandMover, "wider-moving-and-insurance");
  const index = allPricePoints.indexOf(price as (typeof allPricePoints)[number]);
  const neighbours = ([allPricePoints[index - 1], allPricePoints[index + 1]]
    .filter((value) => typeof value === "number") as number[])
    .map((value) => `cost-to-buy-${value / 1000}k-house`);
  const depositRows = [5, 10, 15, 20].map((percentage) => [
    `${percentage}%`,
    formatCurrency(Math.round(price * (percentage / 100))),
    percentage === 10 ? "Deposit used in the worked examples" : "Alternative deposit planning point"
  ]);
  const scenarioRows = [
    ["England first-time buyer", englandFtb],
    ["England home mover", englandMover],
    ["Northern Ireland home mover", northernIrelandMover],
    ["Scotland home mover", scotlandMover],
    ["Wales home mover", walesMover]
  ].map(([label, result]) => {
    const calculated = result as typeof englandMover;
    return [
      label as string,
      formatCurrency(calculated.propertyTaxAmount),
      formatCurrency(calculated.totalUpfrontCash),
      "10% deposit; average assumptions; moving and insurance included; furnishing excluded; 10% contingency"
    ];
  });

  return {
    slug,
    title: `Cost to Buy a ${price / 1000}k House in the UK`,
    description: `See calculator-derived cash examples for buying a ${formattedPrice} house, including deposit, UK property tax, transaction fees and clearly labelled optional costs.`,
    keywords: [
      `cost to buy ${price / 1000}k house UK`,
      `cash needed for ${price / 1000}k property`,
      `fees buying ${price / 1000}k house`
    ],
    h1: `Cost to buy a ${formattedPrice} house in the UK`,
    intro: `${priceContext(price)} The examples below use the same assumptions and calculation functions as the homepage calculator.`,
    directAnswer: `For a clearly defined England home-mover example, the total upfront cash is ${formatCurrency(englandMover.totalUpfrontCash)}: a 10% deposit, average cost assumptions, moving and insurance included, furnishing excluded and a 10% contingency. Change the nation, buyer type or optional costs and the result changes.`,
    contextualLinks: [
      { href: "/#calculator", label: "UK house buying cost calculator" },
      { href: "/house-buying-cost-by-property-price", label: "all property-price examples" },
      { href: "/methodology", label: "calculation methodology" },
      { href: "/stamp-duty-explained", label: "UK property-tax guide" },
      { href: "/how-much-money-needed-buy-house", label: "total cash needed guide" }
    ],
    trustReviewedText: `Factual figures and official sources were reviewed on ${review.lastReviewedLabel}. Worked examples use calculator data version ${review.calculatorDataVersion}.`,
    updatedLabel: `Reviewed ${review.lastReviewedLabel}`,
    lastReviewed: review.lastReviewed,
    lastReviewedLabel: review.lastReviewedLabel,
    calculatorDataVersion: review.calculatorDataVersion,
    atGlance: [
      { label: "Property price", value: formattedPrice },
      { label: "10% deposit", value: formatCurrency(englandMover.depositAmount) },
      {
        label: "Core non-tax transaction range",
        value: `${formatScopeRange(nonTaxRange)}. Deposit, property tax, moving, insurance, furnishing and contingency excluded.`
      },
      {
        label: "Worked England home-mover total",
        value: `${formatCurrency(englandMover.totalUpfrontCash)} using the stated scenario, including ${formatCurrency(movingInsurance)} for moving and insurance.`
      }
    ],
    sections: [
      {
        title: `Deposit amounts on a ${formattedPrice} purchase`,
        paragraphs: [
          "Deposit is user entered in the calculator. The percentages below are arithmetic examples, not lender requirements or product recommendations."
        ],
        table: {
          caption: `Common deposit percentages for a ${formattedPrice} property`,
          columns: ["Deposit percentage", "Cash amount", "How to read it"],
          rows: depositRows
        }
      },
      {
        title: "Calculator-derived examples by jurisdiction and buyer type",
        paragraphs: [
          "Every row uses the production tax, registration and total-cost functions. Property tax is an official calculation; the non-statutory lines remain planning estimates.",
          costScopeDefinitions["total-upfront-cash"]
        ],
        table: {
          caption: `Worked upfront-cash scenarios for a ${formattedPrice} purchase`,
          columns: ["Scenario", "Property tax", "Total upfront cash", "Scenario settings"],
          rows: scenarioRows
        }
      },
      {
        title: "What the non-deposit cost range includes",
        paragraphs: [
          `The central low-to-high range for core non-tax transaction costs in the England home-mover scenario is ${formatScopeRange(nonTaxRange)}.`,
          costScopeDefinitions["core-non-tax-transaction-costs"],
          "Property tax is shown separately because it is calculated from jurisdiction and buyer type. Moving costs, insurance, furnishing and contingency are also separate so the scope is not hidden inside one broad figure."
        ]
      },
      {
        title: "Why the same price produces different UK totals",
        paragraphs: [
          "England and Northern Ireland use SDLT, Scotland uses LBTT and Wales uses LTT. First-time buyer and additional-property treatment also differs, while registration is handled by the authority for the relevant jurisdiction.",
          "Market estimates can change with the property, provider and quotations. Use the calculator to replace planning estimates with your own amounts."
        ]
      }
    ],
    faqs: [
      {
        question: `How much deposit is 10% on a ${formattedPrice} house?`,
        answer: `A 10% deposit is ${formatCurrency(Math.round(price * 0.1))}. This is the deposit setting used in the worked examples.`
      },
      {
        question: "Are the worked totals official charges?",
        answer: "No. Property tax and applicable registration charges are official calculations or charges. Solicitor/conveyancing, searches, surveys, mortgage fees and optional costs are market estimates until replaced with quotations."
      },
      {
        question: "Does the example include furnishing?",
        answer: "No. The worked examples include moving and insurance but exclude the optional furnishing and setup allowance. A 10% contingency is applied to estimate-led costs."
      },
      {
        question: "Why are England and Northern Ireland shown separately if both use SDLT?",
        answer: "They use the same SDLT rules, but their land-registration systems and allowances differ, so the total can still change."
      }
    ],
    relatedGuides: [
      "how-much-money-needed-buy-house",
      "stamp-duty-explained",
      "hidden-costs-buying-house",
      ...neighbours
    ],
    officialSourceKeys: ["sdlt", "lbtt", "lbttAds", "ltt", "hmlr", "ros", "lpsNi"],
    sourceKeys: ["sdlt", "lbtt", "lbttAds", "ltt", "hmlr", "ros", "lpsNi"],
    ctaTitle: `Run your own ${formattedPrice} scenario`,
    ctaText: "Change the jurisdiction, buyer type, deposit, assumption level, quotations and optional costs in the homepage calculator.",
    officialItems: ["jurisdiction-specific property tax calculations", "applicable published registration charges"],
    estimateItems: ["solicitor/conveyancing", "searches", "survey and valuation", "mortgage fees", "moving", "insurance", "furnishing and contingency"],
    mistakes: [
      "Treating the deposit as the complete cash target",
      "Using an England tax example without stating the jurisdiction",
      "Combining moving, insurance and furnishing into one unexplained figure"
    ],
    checklist: [
      "Confirm the jurisdiction and buyer type",
      "Replace market estimates with transaction quotations",
      "Choose optional allowances deliberately",
      "Keep a separate contingency if the budget needs resilience"
    ]
  };
}
