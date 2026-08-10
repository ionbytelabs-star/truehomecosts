import { calculatorMetadata } from "../data/assumptions/calculator";

import type { GuidePageContent } from "./types";

const afterExchangeTimelineRows = [
  ["At exchange", "Exchange deposit; buildings insurance where the contract or lender requires it", "Confirmed contractual amount / provider quote"],
  ["Between exchange and completion", "Final searches or legal disbursements; removals booking; mortgage conditions", "Transaction-specific charges and planning estimates"],
  ["Before funds are sent", "Conveyancer's completion statement and completion balance", "Confirmed statement, including tax and registration funding where applicable"],
  ["Completion day", "Removal balance, key collection and moving-day extras", "Provider quote and optional planning allowance"]
] as const;

export const costsAfterExchangeGuide: GuidePageContent = {
  slug: "costs-after-exchange",
  title: "Costs After Exchange of Contracts: UK Buyer Guide",
  description:
    "See what UK home buyers may pay after exchange and before completion, including the exchange deposit, insurance, completion statement, legal items and removals.",
  keywords: [
    "costs after exchange",
    "what do you pay after exchange",
    "costs between exchange and completion",
    "exchange deposit UK",
    "completion statement costs"
  ],
  h1: "Costs after exchange of contracts",
  intro:
    "After exchange, the purchase is legally binding and the buyer usually needs to protect a much larger, date-specific cash commitment. The exchange deposit is the main payment, followed by any balance shown on the completion statement and practical costs such as insurance and removals.",
  directAnswer:
    "The exact costs after exchange depend on the contract and what has already been paid. Check the exchange deposit, buildings-insurance start date, final legal disbursements, mortgage conditions, removals balance and the conveyancer's deadline for cleared completion funds.",
  updatedLabel: "Reviewed 25 July 2026",
  lastReviewed: "2026-07-25",
  lastReviewedLabel: "25 July 2026",
  calculatorDataVersion: calculatorMetadata.dataVersion,
  trustReviewedText:
    "Reviewed by the True Home Costs editorial team against the central calculator assumptions and the cited official sources.",
  atGlance: [
    { label: "Legal status", value: "Binding after exchange" },
    { label: "Main payment", value: "Exchange deposit" },
    { label: "Final control document", value: "Completion statement" },
    { label: "Practical booking", value: "Removals" }
  ],
  contextualLinks: [
    { href: "/costs-before-completion", label: "before-completion costs guide" },
    { href: "/moving-costs-uk", label: "moving costs guide" },
    { href: "/insurance-costs-uk", label: "home insurance costs guide" },
    { href: "/#calculator", label: "home-buying cost calculator" }
  ],
  officialItems: [
    "property tax and applicable registration charges funded through the completion process",
    "contractual sums confirmed by the conveyancer"
  ],
  estimateItems: [
    "buildings and contents insurance",
    "removals, storage and moving-day extras",
    "additional lender or legal administration where applicable"
  ],
  sections: [
    {
      title: "After-exchange cost timeline",
      table: {
        caption: "Typical sequence; the contract and conveyancer's instructions control your transaction",
        columns: ["Stage", "Possible payment or action", "Basis"],
        rows: afterExchangeTimelineRows.map((row) => [...row])
      }
    },
    {
      title: "Exchange deposit and completion balance",
      paragraphs: [
        "The exchange deposit is the contractual deposit paid or committed when contracts are exchanged. It is not automatically identical to the mortgage deposit percentage used in an affordability illustration.",
        "Before completion, the conveyancer issues a completion statement. This reconciles the purchase price, deposit already held, mortgage funds, tax, registration, legal bill and other items, producing the balance you must send as cleared funds."
      ],
      callout:
        "Never infer the amount to transfer from an online average. Use the conveyancer's verified completion statement and independently check payment instructions using the firm's published contact route."
    },
    {
      title: "Buildings insurance timing",
      paragraphs: [
        "In many England and Wales transactions, the buyer may need buildings insurance from exchange because risk can pass under the contract before the keys are collected. The contract, tenure and lender requirements determine the actual date.",
        "Scotland and Northern Ireland follow different legal processes and terminology. Ask the solicitor and insurer to confirm when cover must begin rather than applying an England-only rule."
      ]
    },
    {
      title: "Final legal and mortgage checks",
      bullets: [
        "Confirm every mortgage offer condition is satisfied and the offer remains valid through completion.",
        "Check whether the lender has a completion, transfer or administration charge.",
        "Read the final search and legal-disbursement lines on the completion statement.",
        "Confirm when cleared buyer funds must reach the client account.",
        "Verify bank details safely; payment-redirection fraud is a serious completion risk.",
        "Keep the solicitor informed if the source or route of funds changes."
      ]
    },
    {
      title: "Practical buyer checklist",
      bullets: [
        "Book removals with terms that match the agreed completion date.",
        "Arrange buildings insurance from the date the contract and lender require.",
        "Keep accessible cash for storage, parking, cleaning, food, pets and travel.",
        "Take final meter readings and prepare first-month account changes.",
        "Do not order irreversible work or deliveries before the legal position is confirmed.",
        "Retain an emergency buffer after sending the completion balance."
      ]
    }
  ],
  faqs: [
    {
      question: "What costs do you pay after exchange?",
      answer:
        "Common items are the exchange deposit, buildings insurance where required, final legal disbursements, the completion balance and removals. What remains depends on what you paid earlier and the completion statement."
    },
    {
      question: "Is exchange of contracts legally binding?",
      answer:
        "In the usual England and Wales process, exchange creates a binding contract. Other UK jurisdictions use different processes and terminology, so follow the advice for the property's location."
    },
    {
      question: "When do I receive the completion statement?",
      answer:
        "Your conveyancer normally sends it before completion once the figures can be reconciled. Ask when to expect it and the deadline for cleared funds, especially if money is coming from several accounts."
    }
  ],
  relatedGuides: [
    "costs-before-completion",
    "moving-costs-uk",
    "insurance-costs-uk",
    "conveyancing-costs-uk"
  ],
  sourceKeys: ["moneyHelperBuyingMoving", "moneyHelperHomeBuying"],
  ctaTitle: "Check the cash left after exchange",
  ctaText:
    "Use the calculator for the complete purchase budget, then reconcile its planning lines against the conveyancer's completion statement and your confirmed provider quotes.",
  mistakes: [
    "Treating the mortgage deposit and exchange deposit as interchangeable",
    "Starting insurance on an assumed date",
    "Sending funds without independently verifying instructions"
  ],
  checklist: [
    "Obtain the completion statement",
    "Confirm insurance and removals",
    "Keep a post-completion buffer"
  ]
};
