import { calculatorMetadata } from "../data/assumptions/calculator";
import { searchFeeByJurisdiction } from "../data/assumptions/searches";
import { surveyFeeBands } from "../data/assumptions/surveys";
import type { PriceBandRange, RangeByLevel } from "../data/assumptions/types";
import { formatCurrency } from "../lib/format";

import type { GuidePageContent } from "./types";

const examplePrice = 300_000;

function bandForPrice(bands: PriceBandRange[], price: number): PriceBandRange {
  return bands.find((band) => band.upTo === null || price <= band.upTo) ?? bands.at(-1)!;
}

function formatPlanningRange(range: RangeByLevel): string {
  return `${formatCurrency(range.low)}–${formatCurrency(range.high)}`;
}

const surveyBand = bandForPrice(surveyFeeBands, examplePrice);

const beforeCompletionTimelineRows = [
  ["Reservation / application", "Reservation fee on some new builds; mortgage booking, valuation or broker fee where charged"],
  ["Legal work begins", "Conveyancing payment on account and search pack"],
  ["Property checks", "Buyer survey or snagging inspection"],
  ["Exchange", "Exchange deposit, less any deposit already held under the agreed contract process"],
  ["Immediately before completion", "Completion balance shown on the conveyancer's statement, plus tax and registration money handled through the legal process"],
  ["Moving arrangements", "Removal deposit or balance, storage and insurance where needed"]
] as const;

export const costsBeforeCompletionGuide: GuidePageContent = {
  slug: "costs-before-completion",
  title: "Costs Before Completion When Buying a House",
  description:
    "Plan what UK home buyers may pay before completion, from reservations, mortgage and survey costs to searches, exchange deposit, tax and the completion balance.",
  keywords: [
    "costs before completion",
    "what do I pay before completion",
    "upfront costs before buying house",
    "house purchase payment timeline",
    "exchange deposit completion balance"
  ],
  h1: "Costs payable before completion",
  intro:
    "Before completion, buyers can pay several costs in stages: a reservation or mortgage charge where relevant, legal money on account, searches, a survey, the exchange deposit and finally the completion balance. The timing matters because some early costs are spent even if the purchase does not complete.",
  directAnswer:
    "Separate costs paid during the transaction from money needed on completion day. Ask each provider when the charge becomes non-refundable, and use the conveyancer's completion statement—not a general checklist—to determine the final cleared balance.",
  updatedLabel: "Reviewed 25 July 2026",
  lastReviewed: "2026-07-25",
  lastReviewedLabel: "25 July 2026",
  calculatorDataVersion: calculatorMetadata.dataVersion,
  trustReviewedText:
    "Reviewed by the True Home Costs editorial team against the central calculator assumptions and the cited official sources.",
  atGlance: [
    { label: "Early checks", value: "Mortgage, legal, survey" },
    { label: "Contract stage", value: "Exchange deposit" },
    { label: "Final figure", value: "Completion statement" },
    { label: "Tax timing", value: "Jurisdiction-specific" }
  ],
  contextualLinks: [
    { href: "/#calculator", label: "home-buying cost calculator" },
    { href: "/conveyancing-costs-uk", label: "conveyancing costs guide" },
    { href: "/property-survey-costs-uk", label: "survey costs guide" },
    { href: "/stamp-duty-explained", label: "stamp duty and property tax guide" },
    { href: "/hidden-costs-buying-new-build-home-uk", label: "new-build hidden costs guide" },
    { href: "/gifted-deposit-mortgage", label: "gifted deposit guide" }
  ],
  officialItems: [
    "SDLT, LBTT or LTT calculated under the applicable rules",
    "registration charges under the applicable official scale"
  ],
  estimateItems: [
    "reservation, mortgage, survey, legal and search charges",
    "removals, storage and insurance",
    "optional snagging, specialist reports and planning allowances"
  ],
  sections: [
    {
      title: "Before-completion payment timeline",
      table: {
        caption: "A planning sequence; actual requests and refund terms vary",
        columns: ["Stage", "Possible costs"],
        rows: beforeCompletionTimelineRows.map((row) => [...row])
      }
    },
    {
      title: "Reservation and mortgage costs",
      paragraphs: [
        "A new-build developer may request a reservation fee and impose a reservation deadline. Read what is refundable, what is deducted from the price and what happens if the mortgage or legal work takes longer.",
        "A lender or broker may charge for a product, booking, valuation, advice or administration. Some charges are paid at application, some are added to the loan and others are payable only at completion. Adding a fee to the mortgage can increase the amount on which interest is charged."
      ]
    },
    {
      title: "Survey, searches and legal money on account",
      paragraphs: [
        "A surveyor may require payment before inspection. A conveyancer commonly asks for money on account so searches and other early disbursements can be ordered.",
        `For an England purchase, the central search allowance is ${formatPlanningRange(searchFeeByJurisdiction.england)}; for a ${formatCurrency(examplePrice)} property, the central survey points run from ${formatCurrency(surveyBand.low)} to ${formatCurrency(surveyBand.high)}. These are planning figures, not quotes.`,
        "If the transaction falls through, work already completed and third-party disbursements may still be payable. Ask about abortive-fee terms before instructing."
      ]
    },
    {
      title: "Exchange deposit and completion balance",
      paragraphs: [
        "The contractual exchange deposit is due at the contract stage used for the transaction. A gifted deposit, related sale or reduced exchange deposit needs to be discussed early with the lender and conveyancer.",
        "The completion statement then shows the remaining purchase money and reconciles mortgage funds, tax, registration, legal costs and earlier payments. Send only the verified figure by the stated deadline."
      ],
      callout:
        "Do not spend the entire savings pot on the exchange deposit. Ring-fence any remaining completion costs, moving money and a first-month emergency buffer."
    },
    {
      title: "When property tax is paid",
      table: {
        caption: "Tax regimes and practical funding",
        columns: ["Property location", "Tax", "Practical point"],
        rows: [
          ["England or Northern Ireland", "SDLT", "The conveyancer normally collects the amount needed for filing and payment after completion"],
          ["Scotland", "LBTT", "Funds are normally dealt with through the solicitor as part of settlement and return arrangements"],
          ["Wales", "LTT", "The conveyancer normally handles the return and payment funding"]
        ]
      },
      afterParagraphs: [
        "Legal deadlines and filing processes differ. Treat the money as part of the completion funding requirement even where the statutory payment occurs after the completion date."
      ]
    },
    {
      title: "Before completion versus after completion",
      table: {
        caption: "Keep transaction and ownership budgets separate",
        columns: ["Budget", "Examples", "Why separate it"],
        rows: [
          ["Before / on completion", "Survey, searches, legal work, exchange deposit, completion balance, tax, registration, removals", "Required to reach completion"],
          ["After completion", "First mortgage payment, council tax, utilities, repairs, furniture and setup", "Ownership starts with cash needs of its own"]
        ]
      }
    }
  ],
  faqs: [
    {
      question: "What do I pay before completion when buying a house?",
      answer:
        "Possible payments include mortgage or reservation fees, a legal payment on account, searches, survey, exchange deposit and the completion balance. The exact sequence depends on the transaction and jurisdiction."
    },
    {
      question: "Are stamp duty, LBTT or LTT paid before completion?",
      answer:
        "The tax return and statutory payment timing differ by jurisdiction, but the conveyancer normally needs the tax funds as part of the money reconciled for completion. Follow the completion statement and legal advice for the transaction."
    },
    {
      question: "What happens to survey and search costs if the purchase fails?",
      answer:
        "Money already spent on a completed survey, searches or legal work may not be refundable. Check each provider's abortive and refund terms before paying."
    }
  ],
  relatedGuides: [
    "costs-after-exchange",
    "conveyancing-costs-uk",
    "property-survey-costs-uk",
    "stamp-duty-explained",
    "hidden-costs-buying-new-build-home-uk"
  ],
  officialSourceKeys: ["sdlt", "lbtt", "ltt"],
  sourceKeys: ["moneyHelperBuyingMoving", "sdlt", "lbtt", "ltt"],
  ctaTitle: "Map every payment to a date",
  ctaText:
    "Use the calculator to build the total, then add the payment date, refund terms and confirmed quote beside each line in your own transaction plan.",
  mistakes: [
    "Treating every upfront cost as due on completion day",
    "Ignoring non-refundable early checks",
    "Leaving tax and moving money outside the final funding plan"
  ],
  checklist: [
    "Record amount, due date and refund terms",
    "Reconcile all deposits already paid",
    "Verify the final completion statement"
  ]
};
