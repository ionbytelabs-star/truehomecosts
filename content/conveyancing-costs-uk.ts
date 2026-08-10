import { calculatorMetadata } from "../data/assumptions/calculator";
import { searchFeeByJurisdiction } from "../data/assumptions/searches";
import { solicitorFeeBands } from "../data/assumptions/solicitors";
import { telegraphicTransferFee } from "../data/assumptions/transfers";
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

function formatBandRange(bands: PriceBandRange[], price = examplePrice): string {
  const band = bandForPrice(bands, price);
  return `${formatCurrency(band.low)}–${formatCurrency(band.high)}`;
}

const conveyancingPlanning = {
  legalFeeRange: formatBandRange(solicitorFeeBands),
  englandSearchRange: formatPlanningRange(searchFeeByJurisdiction.england),
  transferFeeRange: formatPlanningRange(telegraphicTransferFee)
} as const;

export const conveyancingCostsGuide: GuidePageContent = {
  slug: "conveyancing-costs-uk",
  title: "UK Conveyancing Costs: Solicitor Fees Explained",
  description:
    "Plan UK conveyancing costs, understand solicitor legal fees, searches and disbursements, and see why leasehold, new-build or complex work can increase a quote.",
  keywords: [
    "conveyancing costs UK",
    "solicitors fees buying a house",
    "legal fees buying house UK",
    "conveyancing disbursements",
    "house purchase solicitor fees"
  ],
  h1: "UK conveyancing costs and solicitor fees",
  intro:
    `For a ${formatCurrency(examplePrice)} purchase, the central calculator currently uses ${conveyancingPlanning.legalFeeRange} as a planning range for standard purchase legal work. Searches, registration, property tax and bank transfer fees are separate lines, so a low headline quote is not necessarily the whole legal bill.`,
  directAnswer:
    "Conveyancing costs combine the conveyancer's own legal fee with third-party payments called disbursements. Ask for an itemised, VAT-clear quote and budget separately for searches, registration, tax and any leasehold, new-build, lender or title-specific work.",
  updatedLabel: "Reviewed 25 July 2026",
  lastReviewed: "2026-07-25",
  lastReviewedLabel: "25 July 2026",
  calculatorDataVersion: calculatorMetadata.dataVersion,
  trustReviewedText:
    "Reviewed by the True Home Costs editorial team against the central calculator assumptions and the cited official sources.",
  atGlance: [
    { label: "Legal-fee example", value: conveyancingPlanning.legalFeeRange },
    { label: "England search planning range", value: conveyancingPlanning.englandSearchRange },
    { label: "Transfer-fee planning range", value: conveyancingPlanning.transferFeeRange },
    { label: "Key distinction", value: "Legal fee ≠ disbursements" }
  ],
  introSections: [
    {
      title: "What is included in a conveyancing quote?",
      paragraphs: [
        "A conveyancer's legal fee pays for professional work such as reviewing the contract and title, raising enquiries, reporting to you and the lender, exchanging contracts, arranging completion and dealing with post-completion steps.",
        "Disbursements are payments to other organisations. Common examples include searches, registration charges and transaction-specific documents. Property tax is also normally sent through the conveyancer, but it is a tax calculation rather than legal income."
      ],
      callout:
        "The calculator keeps solicitor fees, searches, registration and bank transfer charges separate. Use the same separation when comparing quotes."
    }
  ],
  contextualLinks: [
    { href: "/#calculator", label: "home-buying cost calculator" },
    { href: "/stamp-duty-explained", label: "stamp duty and UK property tax guide" },
    { href: "/land-registry-fees-uk", label: "registration fee guide" },
    { href: "/costs-before-completion", label: "costs due before completion" },
    { href: "/buying-and-selling-house-same-time", label: "buying and selling together guide" }
  ],
  officialItems: [
    "property tax calculated from the applicable SDLT, LBTT or LTT rules",
    "registration charges taken from the applicable published fee scale"
  ],
  estimateItems: [
    "solicitor or conveyancer professional fees",
    "search packs and bank transfer charges",
    "additional legal work for the particular property or funding arrangement"
  ],
  sections: [
    {
      title: "Legal fees and disbursements are different",
      table: {
        caption: "How to read the main parts of a conveyancing quote",
        columns: ["Quote line", "What it pays for", "How to treat it"],
        rows: [
          ["Professional legal fee", "The conveyancer's work on the purchase", "Market estimate; compare scope and VAT"],
          ["Search pack", "Local authority, drainage and water, environmental or other relevant searches", "Third-party disbursement; location affects the pack"],
          ["Registration fee", "Registering the transaction with the relevant registry", "Official charge for a defined application type"],
          ["Bank transfer fee", "Sending completion money by same-day transfer", "Conveyancer charge or disbursement; ask how many apply"],
          ["Property tax", "SDLT, LBTT or LTT where due", "Official calculation, not a conveyancing fee"],
          ["Additional work", "Leasehold, new-build, gifted deposit, help-to-buy, unregistered title or complex lender work", "Conditional fee; request the trigger and amount"]
        ]
      }
    },
    {
      title: "How the four UK nations differ",
      table: {
        caption: "Jurisdiction checks for a purchase quote",
        columns: ["Area", "Legal and registration point", "Property tax point"],
        rows: [
          ["England", "HM Land Registry applies to qualifying registrations; the legal process uses English conveyancing practice", "SDLT"],
          ["Wales", "HM Land Registry also registers Welsh land, but Welsh tax is separate", "LTT"],
          ["Scotland", "The legal process and terminology differ; Registers of Scotland registration applies", "LBTT"],
          ["Northern Ireland", "Land & Property Services administers separate Land Registry / Registry of Deeds arrangements", "SDLT"]
        ]
      },
      afterParagraphs: [
        "Do not transplant an England-only registration line into a Scottish or Northern Irish budget. Ask the solicitor to confirm the registry, application type and tax regime for the property."
      ]
    },
    {
      title: "Why a quote can increase",
      bullets: [
        "The property is leasehold, shared ownership, new-build or part of an estate with management arrangements.",
        "The title is unregistered, defective, split, subject to restrictions or needs an indemnity policy.",
        "A gifted deposit, overseas funds, multiple lenders or additional identity and source-of-funds work is involved.",
        "The lender changes, raises extra requirements or uses a separate legal representative.",
        "The search pack or local authority charge differs from the initial assumption.",
        "Expedited, abortive, late or unusually complex work falls outside the quoted scope."
      ],
      callout:
        "A higher final bill is not automatically unreasonable, but every extra should have a clear contractual or transaction-specific reason."
    },
    {
      title: "Worked budgeting example",
      paragraphs: [
        `On a straightforward ${formatCurrency(examplePrice)} purchase in England, the calculator separates ${conveyancingPlanning.legalFeeRange} for legal work, ${conveyancingPlanning.englandSearchRange} for searches and ${conveyancingPlanning.transferFeeRange} for a bank transfer. It then calculates registration and property tax independently.`,
        "A leasehold flat or new-build home may need additional work not represented by the standard legal range. Replace each planning amount with the itemised quote as soon as it is available."
      ]
    },
    {
      title: "What to check before instructing",
      bullets: [
        "Is VAT included in every professional-fee figure?",
        "Which searches, registrations and transfer charges are included?",
        "What are the leasehold, new-build, gifted-deposit and mortgage extras?",
        "What happens to fees and disbursements if the purchase falls through?",
        "Will the firm act for your chosen lender?",
        "Who will handle the file and how are urgent completion issues escalated?"
      ]
    }
  ],
  faqs: [
    {
      question: "How much are solicitors' fees when buying a house?",
      answer:
        `For a ${formatCurrency(examplePrice)} purchase, the central planning range for standard legal work is ${conveyancingPlanning.legalFeeRange}. This excludes searches, registration, property tax, bank transfer charges and conditional additional work. A current itemised quote is more reliable than an average.`
    },
    {
      question: "Are searches included in conveyancing fees?",
      answer:
        "Sometimes they appear in the same quote total, but they are normally third-party disbursements rather than the conveyancer's professional fee. Check which searches are included and whether the amount is fixed or an estimate."
    },
    {
      question: "Do leasehold purchases cost more to convey?",
      answer:
        "They often can because the conveyancer may need to review the lease, management information, service charges, ground rent where still payable, consents and lender requirements. Ask for the leasehold supplement and likely third-party pack fees before instructing."
    }
  ],
  relatedGuides: [
    "land-registry-fees-uk",
    "stamp-duty-explained",
    "hidden-costs-buying-house",
    "costs-before-completion",
    "buying-and-selling-house-same-time"
  ],
  officialSourceKeys: ["hmlr", "ros", "lpsNi"],
  sourceKeys: ["moneyHelperBuyingMoving", "hmlr", "ros", "lpsNi"],
  ctaTitle: "Build the complete legal-cost budget",
  ctaText:
    "Enter the property price and UK nation, then replace the calculator's legal, search and transfer estimates with the itemised figures from your conveyancer.",
  mistakes: [
    "Comparing quote totals without checking VAT and disbursements",
    "Treating property tax as the solicitor's fee",
    "Ignoring conditional leasehold, new-build or lender work"
  ],
  checklist: [
    "Request an itemised VAT-clear quote",
    "Confirm the jurisdiction and registry",
    "Replace each calculator estimate separately"
  ]
};
