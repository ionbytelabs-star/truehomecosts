import { sdltStandardBands } from "../data/tax/sdlt";
import {
  calculateProgressiveTaxBreakdown,
  calculatePropertyTax,
  calculateUpfrontCosts,
  type CalculatorInput
} from "../lib/calculator";
import {
  calculateScopeRange,
  coreNonTaxTransactionKeys,
  formatScopeRange
} from "../lib/cost-scopes";
import { formatCurrency } from "../lib/format";

import { createConsistentPriceGuide } from "./price-guide-builder";
import type { GuidePageContent } from "./types";

const propertyPrice = 600_000;
const calculatorHref =
  "/?propertyPrice=600000&depositPercentage=10&buyerType=home-mover&jurisdiction=england#calculator";

const coreInput: CalculatorInput = {
  propertyPrice,
  jurisdiction: "england",
  buyerType: "home-mover",
  depositMode: "percentage",
  depositPercentage: 10,
  assumptionLevel: "average",
  includeMoving: false,
  includeInsurance: false,
  includeFurnishing: false,
  includeContingency: false,
  contingencyPercentage: 10
};

const fullerInput: CalculatorInput = {
  ...coreInput,
  includeMoving: true,
  includeInsurance: true,
  includeContingency: true
};

function formatRange(minimum: number, maximum: number): string {
  return `${formatCurrency(minimum)}–${formatCurrency(maximum)}`;
}

function scenarioResult(
  depositPercentage: number,
  assumptionLevel: CalculatorInput["assumptionLevel"],
  buyerType: CalculatorInput["buyerType"] = "home-mover"
) {
  return calculateUpfrontCosts({
    ...coreInput,
    buyerType,
    depositPercentage,
    assumptionLevel
  });
}

function lineValue(result: ReturnType<typeof calculateUpfrontCosts>, key: string): number {
  return result.breakdown.find((line) => line.key === key)?.value ?? 0;
}

export function create600kPriceGuide(): GuidePageContent {
  const base = createConsistentPriceGuide(propertyPrice);
  const currentYear = new Date().getUTCFullYear();
  const lowCore = scenarioResult(10, "low");
  const averageCore = scenarioResult(10, "average");
  const highCore = scenarioResult(10, "high");
  const fuller = calculateUpfrontCosts(fullerInput);
  const { assumptionLevel: _assumptionLevel, ...coreInputWithoutLevel } = coreInput;
  const coreNonTaxRange = calculateScopeRange(
    coreInputWithoutLevel,
    "core-non-tax-transaction-costs"
  );
  const standardSdlt = calculatePropertyTax(propertyPrice, "england", "home-mover");
  const firstTimeBuyerSdlt = calculatePropertyTax(propertyPrice, "england", "first-time-buyer");
  const additionalPropertySdlt = calculatePropertyTax(
    propertyPrice,
    "england",
    "additional-property"
  );
  const scotlandLbtt = calculatePropertyTax(propertyPrice, "scotland", "home-mover");
  const walesLtt = calculatePropertyTax(propertyPrice, "wales", "home-mover");
  const depositRows = [5, 10, 15, 20].map((percentage) => {
    const low = scenarioResult(percentage, "low");
    const high = scenarioResult(percentage, "high");

    return [
      `${percentage}%`,
      formatCurrency(low.depositAmount),
      formatRange(low.totalUpfrontCash, high.totalUpfrontCash),
      formatCurrency(propertyPrice - low.depositAmount)
    ];
  });
  const sdltRows = calculateProgressiveTaxBreakdown(propertyPrice, sdltStandardBands).map(
    (band) => [
      band.lowerBound === 0
        ? `Up to ${formatCurrency(band.upperBound)}`
        : `${formatCurrency(band.lowerBound + 1)} to ${formatCurrency(band.upperBound)}`,
      band.rate === 0
        ? "0%"
        : `${formatCurrency(band.taxableAmount)} × ${Math.round(band.rate * 100)}%`,
      formatCurrency(band.tax)
    ]
  );
  const coreCostRows = coreNonTaxTransactionKeys.map((key) => {
    const lowLine = lowCore.breakdown.find((line) => line.key === key);
    const highLine = highCore.breakdown.find((line) => line.key === key);

    return [
      lowLine?.label ?? key,
      formatCurrency(lowLine?.value ?? 0),
      formatCurrency(highLine?.value ?? 0),
      lowLine?.classification.startsWith("official-")
        ? "Statutory or official charge"
        : "Typical market estimate"
    ];
  });
  const movingAmount = lineValue(fuller, "moving");
  const insuranceAmount = lineValue(fuller, "insurance");

  return {
    ...base,
    title: `£600k House Buying Costs UK (${currentYear}): Deposit, Stamp Duty & Fees`,
    description:
      "Buying a £600,000 house in the UK? See the deposit, £20,000 SDLT for an England home mover, legal fees, surveys and total cash needed.",
    h1: "How much does it cost to buy a £600,000 house in the UK?",
    intro:
      "First-time buyer relief does not apply because the property costs more than £500,000. Scotland and Wales use different property taxes, so their totals are higher.",
    directAnswer: `For a £600,000 home in England or Northern Ireland, a first-time buyer or standard home mover pays ${formatCurrency(firstTimeBuyerSdlt)} in Stamp Duty. With a 10% deposit, the core upfront cash required is approximately ${formatRange(lowCore.totalUpfrontCash, highCore.totalUpfrontCash)} before moving costs, insurance, furnishing and contingency. The fuller worked planning example totals ${formatCurrency(fuller.totalUpfrontCash)}.`,
    calculatorHref,
    showInlineCalculatorCta: false,
    faqBeforeSources: true,
    deferTrustSignals: true,
    introSections: [
      {
        title: "£600,000 house buying cost breakdown",
        paragraphs: [
          "This core example uses a 10% deposit, standard England home-mover SDLT and the shared low-to-high assumptions for legal work, searches, survey, mortgage fees, registration and bank transfer fees."
        ],
        table: {
          caption: "England and Northern Ireland standard home-mover example",
          summary:
            "A calculation-backed summary separating the deposit, SDLT, core transaction range and fuller planning example.",
          columns: ["Cost", "Amount"],
          rows: [
            ["Property price", formatCurrency(propertyPrice)],
            ["10% deposit", formatCurrency(lowCore.depositAmount)],
            ["Stamp Duty Land Tax", formatCurrency(standardSdlt)],
            [
              "Core legal, survey, mortgage and registration costs",
              formatScopeRange(coreNonTaxRange)
            ],
            [
              "Core upfront cash required",
              formatRange(lowCore.totalUpfrontCash, highCore.totalUpfrontCash)
            ],
            ["Fuller planning example", formatCurrency(fuller.totalUpfrontCash)]
          ]
        },
        afterParagraphs: [
          `The fuller ${formatCurrency(fuller.totalUpfrontCash)} example uses average core assumptions and adds ${formatCurrency(movingAmount)} for moving, ${formatCurrency(insuranceAmount)} for insurance and a ${formatCurrency(fuller.contingencyAmount)} contingency. Furnishing is excluded.`,
          "The core total excludes moving costs, insurance, furnishing and contingency so it can be compared consistently across deposit scenarios."
        ]
      },
      {
        title: "Calculate your exact costs for a £600,000 home",
        paragraphs: [
          "Open the main calculator with £600,000, a 10% deposit, England and standard home-mover settings prefilled. You can then change the deposit, UK nation, buyer type, optional fees, moving, insurance, furnishing and contingency."
        ],
        cta: {
          href: calculatorHref,
          label: "Calculate costs for a £600,000 home",
          description: "Opens the full TrueHomeCosts calculator with this worked scenario prefilled."
        }
      },
      {
        title: "How much cash do you need with different deposits?",
        paragraphs: [
          `Every core total includes ${formatCurrency(standardSdlt)} SDLT plus the shared ${formatScopeRange(coreNonTaxRange)} core transaction-cost range. Moving, insurance, furnishing and contingency are excluded.`
        ],
        table: {
          caption: "Deposit and core upfront cash scenarios for a £600,000 home",
          summary:
            "Deposit amounts, core cash required and illustrative mortgage balances at four common deposit percentages.",
          columns: [
            "Deposit",
            "Deposit amount",
            `Core upfront cash including ${formatCurrency(standardSdlt)} SDLT`,
            "Illustrative mortgage"
          ],
          rows: depositRows
        }
      },
      {
        title: "How much Stamp Duty is payable on a £600,000 house?",
        paragraphs: [
          `Stamp Duty on a £600,000 home in England or Northern Ireland is ${formatCurrency(standardSdlt)} for a standard home mover.`,
          "The shared SDLT bands apply 0% to the first £125,000, 2% to the next £125,000 and 5% to the remaining £350,000."
        ],
        table: {
          caption: "SDLT band calculation for a £600,000 standard home purchase",
          summary:
            "The standard SDLT calculation, generated from the same tax-band configuration used by the calculator.",
          columns: ["SDLT band", "Calculation", "Tax"],
          rows: [...sdltRows, ["Total", "", formatCurrency(standardSdlt)]]
        },
        afterParagraphs: [
          "Additional-property rates can apply to second homes and buy-to-let purchases. Scotland uses Land and Buildings Transaction Tax (LBTT), while Wales uses Land Transaction Tax (LTT)."
        ],
        links: [
          {
            href: "https://www.gov.uk/stamp-duty-land-tax/residential-property-rates",
            label: "GOV.UK residential SDLT rates"
          },
          {
            href: "/stamp-duty-explained",
            label: "TrueHomeCosts Stamp Duty guide"
          }
        ]
      }
    ],
    atGlance: [
      { label: "Property price", value: formatCurrency(propertyPrice) },
      { label: "10% deposit", value: formatCurrency(lowCore.depositAmount) },
      { label: "Standard SDLT", value: formatCurrency(standardSdlt) },
      {
        label: "Core upfront cash",
        value: formatRange(lowCore.totalUpfrontCash, highCore.totalUpfrontCash)
      }
    ],
    sections: [
      {
        title: "Legal, mortgage, survey and registration costs",
        paragraphs: [
          `The shared engine produces a core non-tax range of ${formatScopeRange(coreNonTaxRange)}. These figures exclude the deposit, SDLT, moving, insurance, furnishing and contingency.`,
          `The average core example is ${formatCurrency(averageCore.totalUpfrontCash)} including the 10% deposit and SDLT. Market estimates should be replaced with transaction-specific quotations when available.`
        ],
        table: {
          caption: "Core non-tax transaction costs at £600,000",
          columns: ["Cost", "Low assumption", "High assumption", "Basis"],
          rows: coreCostRows
        }
      },
      {
        title: "How costs differ in England, Northern Ireland, Scotland and Wales",
        paragraphs: [
          "England and Northern Ireland use the same SDLT rules, although registration treatment can differ. Scotland and Wales have separate progressive property taxes."
        ],
        table: {
          caption: "Home-mover property tax on a £600,000 purchase",
          columns: ["Nation", "Property tax", "Tax system"],
          rows: [
            ["England", formatCurrency(standardSdlt), "Stamp Duty Land Tax (SDLT)"],
            ["Northern Ireland", formatCurrency(standardSdlt), "Stamp Duty Land Tax (SDLT)"],
            ["Scotland", formatCurrency(scotlandLbtt), "Land and Buildings Transaction Tax (LBTT)"],
            ["Wales", formatCurrency(walesLtt), "Land Transaction Tax (LTT)"]
          ]
        }
      },
      {
        title: "First-time buyers and additional properties",
        paragraphs: [
          `Do first-time buyers get Stamp Duty relief on a £600,000 house? No. First-time buyer SDLT relief does not apply when the property costs more than £500,000. A first-time buyer purchasing a £600,000 property in England or Northern Ireland therefore pays the standard ${formatCurrency(firstTimeBuyerSdlt)} SDLT charge.`,
          `For an additional property in England or Northern Ireland, the shared tax engine calculates ${formatCurrency(additionalPropertySdlt)} SDLT at £600,000. Eligibility and replacement-of-main-residence rules can affect whether the higher rates apply.`
        ],
        links: [
          {
            href: "https://www.gov.uk/stamp-duty-land-tax/residential-property-rates",
            label: "GOV.UK first-time buyer and higher-rate rules"
          },
          {
            href: "/first-time-buyer-costs",
            label: "first-time buyer cost guide"
          }
        ]
      }
    ],
    faqs: [
      {
        question: "How much Stamp Duty do you pay on a £600,000 house?",
        answer: `${formatCurrency(standardSdlt)} is payable by a standard home mover buying a £600,000 home in England or Northern Ireland. The total is £0 on the first £125,000, £2,500 on the next £125,000 and £17,500 on the remaining £350,000.`
      },
      {
        question: "How much cash do I need for a £600,000 house with a 10% deposit?",
        answer: `${formatRange(lowCore.totalUpfrontCash, highCore.totalUpfrontCash)} is the core upfront cash range with a 10% deposit for an England home mover. It includes the £60,000 deposit, ${formatCurrency(standardSdlt)} SDLT and ${formatScopeRange(coreNonTaxRange)} of core transaction costs, but excludes moving, insurance, furnishing and contingency.`
      },
      {
        question: "Do first-time buyers get Stamp Duty relief on a £600,000 house?",
        answer: `No. First-time buyer SDLT relief does not apply above £500,000, so a first-time buyer purchasing for £600,000 in England or Northern Ireland pays the standard ${formatCurrency(firstTimeBuyerSdlt)} SDLT charge.`
      },
      {
        question: "How much does buying a second property for £600,000 cost?",
        answer: `${formatCurrency(additionalPropertySdlt)} is the calculator-derived SDLT for an additional £600,000 property in England or Northern Ireland. With a 10% deposit, the core upfront cash range is ${formatRange(
          scenarioResult(10, "low", "additional-property").totalUpfrontCash,
          scenarioResult(10, "high", "additional-property").totalUpfrontCash
        )}; higher-rate eligibility and refunds can depend on the transaction.`
      },
      {
        question: "What fees are payable on top of the deposit and Stamp Duty?",
        answer: `${formatScopeRange(coreNonTaxRange)} is the shared low-to-high range for solicitor or conveyancing work, searches, survey, mortgage fees, registration and bank transfer fees at £600,000. Moving, insurance, furnishing and contingency are separate choices.`
      },
      {
        question: "How do the costs differ in Scotland and Wales?",
        answer: `${formatCurrency(scotlandLbtt)} LBTT is payable by a standard home mover in Scotland and ${formatCurrency(walesLtt)} LTT in Wales on a £600,000 purchase, compared with ${formatCurrency(standardSdlt)} SDLT in England or Northern Ireland. Registration charges and estimate-led costs can also differ by nation.`
      },
      {
        question: "What mortgage might be needed with a 5%, 10%, 15% or 20% deposit?",
        answer:
          "The illustrative mortgage is £570,000 with a 5% deposit, £540,000 with 10%, £510,000 with 15% and £480,000 with 20%. Actual borrowing depends on lender affordability, product criteria and valuation."
      },
      {
        question: "Does the total include moving costs, insurance and furnishing?",
        answer: `The ${formatRange(lowCore.totalUpfrontCash, highCore.totalUpfrontCash)} core range excludes moving, insurance, furnishing and contingency. The ${formatCurrency(fuller.totalUpfrontCash)} planning example adds moving, insurance and a 10% contingency, but still excludes furnishing.`
      }
    ],
    showFaqAnswersExpanded: true,
    trustReviewedText: `Calculations were last checked against the shared calculator rules and official sources on ${base.lastReviewedLabel}. The statutory charges, typical market estimates and user-selected assumptions are labelled separately.`,
    ctaTitle: "Calculate your £600,000 buying costs",
    ctaText:
      "Open the full calculator with this scenario prefilled, then replace planning estimates with your own quotations and optional-cost choices."
  };
}
