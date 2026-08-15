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
  ["Before an offer", "Agreement-in-principle or broker work where charged, affordability checks and a protected fee buffer"],
  ["Reservation / mortgage application", "Reservation fee on some new builds; mortgage booking, valuation or broker fee where charged"],
  ["Legal work begins", "Conveyancing payment on account and search pack"],
  ["Property checks", "Buyer survey or snagging inspection"],
  ["Exchange", "Exchange deposit, less any deposit already held under the agreed contract process"],
  ["Between exchange and completion", "Buildings insurance where required, removal balance, storage, final mortgage and legal checks"],
  ["Completion", "Cleared balance shown on the conveyancer's statement, plus tax and registration money handled through the legal process"],
  ["Immediately after completion", "Locks, cleaning, utilities, council tax, urgent repairs and essential move-in spending"]
] as const;

export const costsBeforeCompletionGuide: GuidePageContent = {
  slug: "costs-before-completion",
  title: "When Home-Buying Costs Are Paid Before Completion",
  description:
    "A definitive UK home-buying payment timeline covering costs before exchange, at exchange, between exchange and completion, on completion and immediately after.",
  keywords: [
    "costs before completion",
    "what do I pay before completion",
    "upfront costs before buying house",
    "house purchase payment timeline",
    "exchange deposit completion balance"
  ],
  h1: "When home-buying costs are paid before completion",
  intro:
    "Home-buying costs arrive in stages before exchange, at exchange, between exchange and completion, on completion and immediately after. The timing matters because some early costs are non-refundable, while the largest cleared balance is usually needed shortly before the keys are released.",
  directAnswer:
    "Separate costs paid during the transaction from money needed on completion day. Ask each provider when the charge becomes non-refundable, and use the conveyancer's completion statement—not a general checklist—to determine the final cleared balance.",
  updatedLabel: "Reviewed 25 July 2026",
  lastReviewed: "2026-07-25",
  lastReviewedLabel: "25 July 2026",
  calculatorDataVersion: calculatorMetadata.dataVersion,
  trustReviewedText:
    "Reviewed by True Home Costs against the central calculator assumptions and the cited official sources.",
  atGlance: [
    { label: "Early checks", value: "Mortgage, legal, survey" },
    { label: "At exchange", value: "Contract deposit and insurance timing" },
    { label: "At completion", value: "Verified completion statement" },
    { label: "Immediately after", value: "Move-in, bills and urgent setup" }
  ],
  contextualLinks: [
    { href: "/#calculator", label: "home-buying cost calculator" },
    { href: "/conveyancing-costs-uk", label: "conveyancing costs guide" },
    { href: "/property-survey-costs-uk", label: "survey costs guide" },
    { href: "/stamp-duty-explained", label: "stamp duty and property tax guide" },
    { href: "/moving-costs-uk", label: "moving and storage costs" },
    { href: "/insurance-costs-uk", label: "buildings insurance timing" },
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
      title: "Between exchange and completion",
      paragraphs: [
        "Once contracts are exchanged, the purchase is normally binding and the practical work accelerates. Confirm when buildings insurance must begin: on many England and Wales purchases the buyer is advised to insure from exchange, but the contract, tenure, lender requirements and legal system can change the position. Follow the conveyancer's transaction-specific advice rather than a generic date.",
        "This is also the point to confirm the removal booking, packing help, storage and access arrangements. Final mortgage conditions and legal checks may still need to be satisfied before lender funds and buyer funds can be released.",
        "Treat every request for completion money as security-sensitive. Verify the completion statement and bank details through a trusted channel already agreed with the conveyancer, especially if an email appears to change payment instructions."
      ]
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
      title: "Completion day and the immediate move-in period",
      paragraphs: [
        "On completion, the conveyancer sends the verified funds, the seller's side confirms receipt and the keys can be released. The first ownership costs then begin quickly, even though they are not part of the legal completion balance.",
        "Keep accessible cash for removals or van hire, storage, cleaning, lock changes, council tax and utility setup, insurance, urgent repairs and essential furnishings. A separate emergency buffer prevents those predictable first-week costs from competing with the purchase money."
      ],
      table: {
        caption: "Keep transaction and ownership budgets separate",
        columns: ["Budget", "Examples", "Why separate it"],
        rows: [
          ["Before / on completion", "Survey, searches, legal work, exchange deposit, completion balance, tax, registration, removals", "Required to reach completion"],
          ["Immediately after completion", "Removals, storage, locks, cleaning, council tax, utilities, repairs, furniture and setup", "Ownership starts with cash needs of its own"],
          ["First one to three months", "First mortgage payment, recurring bills, insurance and repair follow-up", "Early ownership needs a separate buffer after the transaction closes"]
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
    },
    {
      question: "What costs usually arise after exchange but before completion?",
      answer:
        "Common items include buildings insurance where required, the removal balance, packing or storage, and the final mortgage, legal and completion-funding checks."
    },
    {
      question: "When should buildings insurance start?",
      answer:
        "The contract, tenure, lender and jurisdiction determine the exact timing. Many buyers are advised to arrange cover from exchange, but the conveyancer should confirm the position for the purchase."
    }
  ],
  relatedGuides: [
    "conveyancing-costs-uk",
    "property-survey-costs-uk",
    "stamp-duty-explained",
    "hidden-costs-buying-new-build-home-uk",
    "moving-costs-uk",
    "insurance-costs-uk"
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
