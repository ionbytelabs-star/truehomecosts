import { calculatorMetadata } from "../data/assumptions/calculator";
import { mortgageFeeBands } from "../data/assumptions/mortgageFees";
import { movingCostBands } from "../data/assumptions/moving";
import { solicitorFeeBands } from "../data/assumptions/solicitors";
import type { PriceBandRange } from "../data/assumptions/types";
import { formatCurrency } from "../lib/format";

import type { GuidePageContent } from "./types";

const examplePrice = 300_000;

function bandForPrice(bands: PriceBandRange[], price: number): PriceBandRange {
  return bands.find((band) => band.upTo === null || price <= band.upTo) ?? bands.at(-1)!;
}

function formatBandRange(bands: PriceBandRange[]): string {
  const band = bandForPrice(bands, examplePrice);
  return `${formatCurrency(band.low)}–${formatCurrency(band.high)}`;
}

const simultaneousMovePlanning = {
  buyerLegalRange: formatBandRange(solicitorFeeBands),
  mortgageFeeRange: formatBandRange(mortgageFeeBands),
  movingRange: formatBandRange(movingCostBands)
} as const;

const simultaneousMoveCostRows = [
  ["Selling", "Estate agent fee, selling conveyancing, EPC where required, mortgage exit or early-repayment charge where applicable"],
  ["Buying", "Buying conveyancing, searches, survey, tax, registration and mortgage product or arrangement charges"],
  ["Physical move", "Removals, packing, storage, cleaning and access or parking costs"],
  ["Timing risk", "Extra storage, temporary accommodation, duplicated bills or short-term funding if dates do not align"],
  ["After completion", "Repairs, insurance, first mortgage payment and ongoing ownership costs"]
] as const;

export const buyingAndSellingHouseGuide: GuidePageContent = {
  slug: "buying-and-selling-house-same-time",
  title: "Cost of Buying and Selling a House at the Same Time",
  description:
    "Plan the UK cost of buying and selling a house simultaneously, including two legal matters, estate agent fees, EPC, removals, mortgage charges and chain risk.",
  keywords: [
    "cost of buying and selling a house at the same time UK",
    "buying and selling simultaneously costs",
    "home mover costs UK",
    "house chain costs",
    "selling and buying fees"
  ],
  h1: "Buying and selling a house at the same time",
  intro:
    "A home mover funds two transactions: selling costs on the existing home and buying costs on the next one. The chain can reduce the cash needed for the purchase deposit, but it also adds timing risk, two legal workstreams and possible storage or temporary-funding costs.",
  directAnswer:
    "Budget estate agent and selling legal fees separately from the buyer's tax, survey, searches and conveyancing. Add removals, EPC where required, mortgage exit or product charges, and a contingency for chain delays. Do not rely on sale proceeds until the conveyancer confirms how funds will flow.",
  updatedLabel: "Reviewed 25 July 2026",
  lastReviewed: "2026-07-25",
  lastReviewedLabel: "25 July 2026",
  calculatorDataVersion: calculatorMetadata.dataVersion,
  trustReviewedText:
    "Reviewed by the True Home Costs editorial team against the central calculator assumptions and the cited official sources.",
  atGlance: [
    { label: "Transactions", value: "Sale + purchase" },
    { label: "Buyer legal range example", value: simultaneousMovePlanning.buyerLegalRange },
    { label: "Mortgage-fee range example", value: simultaneousMovePlanning.mortgageFeeRange },
    { label: "Moving range example", value: simultaneousMovePlanning.movingRange }
  ],
  contextualLinks: [
    { href: "/#calculator", label: "home-buying cost calculator" },
    { href: "/moving-costs-uk", label: "moving costs guide" },
    { href: "/conveyancing-costs-uk", label: "conveyancing costs guide" },
    { href: "/costs-before-completion", label: "before-completion costs guide" },
    { href: "/cost-of-owning-home-uk", label: "ongoing ownership costs guide" }
  ],
  officialItems: [
    "property tax on the purchase under the applicable rules",
    "registration charge for the purchase application",
    "EPC requirements where an EPC is legally required for marketing"
  ],
  estimateItems: [
    "estate agent, sale and purchase conveyancing fees",
    "mortgage exit, product, arrangement and broker charges",
    "removals, storage, temporary accommodation and duplicated running costs"
  ],
  sections: [
    {
      title: "One move, two cost schedules",
      table: {
        caption: "Main cost groups for a simultaneous sale and purchase",
        columns: ["Part of the move", "Possible costs"],
        rows: simultaneousMoveCostRows.map((row) => [...row])
      }
    },
    {
      title: "Selling costs",
      bullets: [
        "Estate agent fee: check the percentage or fixed fee, VAT, tie-in, sole-agency terms and when payment is due.",
        "Selling conveyancing: title review, contract pack, enquiries, mortgage redemption and completion work.",
        "EPC: normally needed for marketing unless a valid certificate or exemption applies.",
        "Mortgage redemption: ask the lender for an illustration of the balance, early-repayment charge and exit fee.",
        "Leasehold or managed estate packs: third-party information fees and lead times can be material.",
        "Preparation: optional cleaning, minor repairs, photography or staging."
      ]
    },
    {
      title: "Buying costs",
      paragraphs: [
        `At ${formatCurrency(examplePrice)}, the calculator's standard purchase legal range is ${simultaneousMovePlanning.buyerLegalRange}. Searches, survey, registration, tax and transfer fees remain separate.`,
        "A home mover normally does not receive first-time buyer tax treatment. If an old main residence has not been disposed of by the relevant completion date, additional-property tax treatment may arise, subject to the rules and possible refund provisions. Confirm the position before exchange."
      ]
    },
    {
      title: "Chain timing and completion risk",
      paragraphs: [
        "A same-day chain depends on money and documents moving through several transactions in order. Delays can affect key release, removals waiting time and access to sale proceeds.",
        "Agree a contingency plan for late keys, failed completion or a gap between sale and purchase. Storage, accommodation and duplicated utilities are planning risks, not inevitable costs."
      ],
      callout:
        "Bridging or other short-term funding can be expensive and secured against property. This page is general planning information, not a recommendation; obtain regulated financial and independent legal advice before committing."
    },
    {
      title: "Mortgage costs on both sides",
      table: {
        caption: "Questions for the existing and new mortgage",
        columns: ["Existing mortgage", "New mortgage"],
        rows: [
          ["What is the redemption balance on the target date?", "Is there a product, booking, valuation, arrangement or broker fee?"],
          ["Does an early-repayment charge or exit fee apply?", "Can a fee be added to the loan, and what interest would that create?"],
          ["Is the product portable and what does porting actually require?", "When will funds be released and what conditions remain?"]
        ]
      }
    },
    {
      title: "Home mover versus first-time buyer",
      table: {
        caption: "Why the budget profile changes",
        columns: ["First-time buyer", "Home mover"],
        rows: [
          ["No property sale costs", "Estate agent, sale conveyancing and redemption costs"],
          ["May qualify for buyer-specific tax relief subject to rules", "Usually assessed under home-mover treatment; timing of disposal can matter"],
          ["May need more furniture and setup", "May own more belongings, increasing removal or storage needs"],
          ["No chain below", "Sale and purchase timelines are linked"]
        ]
      }
    },
    {
      title: "Questions to settle before exchange",
      bullets: [
        "What is the net sale equity after mortgage redemption and selling costs?",
        "How much of the purchase deposit will come from sale proceeds?",
        "Are exchange deposits being passed up the chain, reduced or topped up?",
        "Which fees are due even if one transaction fails?",
        "What is the removals plan if keys are delayed?",
        "Would temporary accommodation or storage be affordable without short-term borrowing?",
        "Does the completion date stay within every mortgage-offer and search-validity period?"
      ]
    }
  ],
  faqs: [
    {
      question: "What does it cost to buy and sell a house at the same time?",
      answer:
        "Add selling costs—estate agent, sale conveyancing, EPC and mortgage redemption charges—to the full purchase budget of deposit, tax, buying conveyancing, searches, survey, mortgage fees, registration and moving."
    },
    {
      question: "Can sale proceeds fund the purchase deposit?",
      answer:
        "Often they can, but the contractual exchange deposit and timing need to be coordinated through the chain. Give the conveyancer a full source-of-funds picture early and do not assume proceeds will be accessible outside the legal process."
    },
    {
      question: "Should I use bridging finance if dates do not align?",
      answer:
        "That is a high-impact financial decision, not a routine moving-cost line. Short-term funding can be expensive and secured; obtain regulated financial and independent legal advice based on the actual transaction."
    }
  ],
  relatedGuides: [
    "moving-costs-uk",
    "conveyancing-costs-uk",
    "costs-before-completion",
    "cost-of-owning-home-uk",
    "stamp-duty-explained"
  ],
  officialSourceKeys: ["sdlt", "lbtt", "ltt"],
  sourceKeys: ["moneyHelperBuyingMoving", "moneyHelperHomeBuying", "sdlt", "lbtt", "ltt"],
  ctaTitle: "Model the purchase, then add the sale",
  ctaText:
    "Use the calculator for the next home, then add itemised estate agent, selling legal and mortgage-redemption figures to produce the complete home-mover budget.",
  mistakes: [
    "Counting gross sale price as available equity",
    "Budgeting one conveyancing fee for two legal matters",
    "Ignoring chain-delay and mortgage-redemption charges"
  ],
  checklist: [
    "Calculate net sale equity",
    "Itemise both legal matters",
    "Agree a chain-delay contingency"
  ]
};
