import { calculatorMetadata } from "../data/assumptions/calculator";
import { searchFeeByJurisdiction } from "../data/assumptions/searches";
import { solicitorFeeBands, solicitorFeeVatTreatment } from "../data/assumptions/solicitors";
import { telegraphicTransferFee } from "../data/assumptions/transfers";
import type { PriceBandRange, RangeByLevel } from "../data/assumptions/types";
import { hmlrElectronicScale1Fees } from "../data/fees/hmlr";
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

function registrationFeeForPrice(price: number): number {
  return hmlrElectronicScale1Fees.find((band) => band.upTo === null || price <= band.upTo)?.fee
    ?? hmlrElectronicScale1Fees.at(-1)!.fee;
}

const legalFeeBand = bandForPrice(solicitorFeeBands, examplePrice);
const exampleRegistrationFee = registrationFeeForPrice(examplePrice);
const exampleSubtotalLow = legalFeeBand.low
  + searchFeeByJurisdiction.england.low
  + telegraphicTransferFee.low
  + exampleRegistrationFee;
const exampleSubtotalHigh = legalFeeBand.high
  + searchFeeByJurisdiction.england.high
  + telegraphicTransferFee.high
  + exampleRegistrationFee;

const conveyancingPlanning = {
  legalFeeRange: formatBandRange(solicitorFeeBands),
  englandSearchRange: formatPlanningRange(searchFeeByJurisdiction.england),
  transferFeeRange: formatPlanningRange(telegraphicTransferFee),
  registrationFee: formatCurrency(exampleRegistrationFee),
  standardSubtotalRange: `${formatCurrency(exampleSubtotalLow)}–${formatCurrency(exampleSubtotalHigh)}`
} as const;

export const conveyancingCostsGuide: GuidePageContent = {
  slug: "conveyancing-costs-uk",
  title: "Conveyancing Costs UK 2026: Solicitor Fees Explained",
  description:
    "How much does conveyancing cost in the UK? Compare solicitor fees, searches, disbursements and common extras with a clear 2026 cost breakdown.",
  keywords: [
    "conveyancing costs UK",
    "residential conveyancing costs",
    "property conveyancing costs",
    "property conveyancing fees",
    "solicitor fees for buying a house",
    "conveyancing disbursements",
    "fixed-fee conveyancing"
  ],
  h1: "Conveyancing Costs UK 2026: Solicitor Fees and Disbursements",
  intro:
    `For a straightforward ${formatCurrency(examplePrice)} purchase in England, the current TrueHomeCosts planning subtotal is ${conveyancingPlanning.standardSubtotalRange} before property tax and conditional extras. That combines standard legal work, searches, one bank transfer and a qualifying electronic HM Land Registry fee without presenting them as one solicitor charge.`,
  directAnswer:
    `The professional legal-work element is ${conveyancingPlanning.legalFeeRange}, including VAT for planning, at this property price. Searches, registration and bank transfer charges are separate; leasehold, new-build, gifted-deposit, shared-ownership, lender or complex-title work can add more.`,
  updatedLabel: "Reviewed 11 August 2026",
  lastReviewed: "2026-08-11",
  lastReviewedLabel: "11 August 2026",
  calculatorDataVersion: calculatorMetadata.dataVersion,
  trustReviewedText:
    "Reviewed against the central calculator assumptions, current MoneyHelper consumer guidance, SRA price-transparency guidance and the cited UK registration sources.",
  atGlance: [
    { label: "£300,000 England planning subtotal", value: conveyancingPlanning.standardSubtotalRange },
    { label: "Professional legal work", value: `${conveyancingPlanning.legalFeeRange}, including VAT` },
    { label: "Searches and bank transfer", value: `${conveyancingPlanning.englandSearchRange} plus ${conveyancingPlanning.transferFeeRange}` },
    { label: "Property tax and conditional extras", value: "Calculated or quoted separately" }
  ],
  introSections: [
    {
      title: "Residential conveyancing costs at a glance",
      paragraphs: [
        `This ${formatCurrency(examplePrice)} England example uses the shared TrueHomeCosts assumptions. It is a planning breakdown for a standard purchase, not an average quote or a promise that every transaction contains the same work.`
      ],
      table: {
        caption: `Conveyancing cost planning for a straightforward ${formatCurrency(examplePrice)} England purchase`,
        columns: ["Cost component", "Current planning treatment", "What the figure means"],
        rows: [
          ["Solicitor or conveyancer legal fee", conveyancingPlanning.legalFeeRange, "Standard purchase legal work; the planning range includes VAT"],
          ["Searches", conveyancingPlanning.englandSearchRange, "England search-pack estimate; the property and provider can change it"],
          ["Bank transfer", conveyancingPlanning.transferFeeRange, "Planning range for one completion transfer charge"],
          ["HM Land Registry fee", conveyancingPlanning.registrationFee, "Official electronic Scale 1 fee for a qualifying transfer of a whole registered title at this price"],
          ["Planning subtotal", conveyancingPlanning.standardSubtotalRange, "Legal work, searches, one transfer and the stated registration route"],
          ["SDLT, LBTT or LTT", "Separate official calculation", "Property tax is not part of the conveyancer's professional fee"],
          ["Leasehold, new-build or other extras", "Additional if applicable", "Ask for the trigger, scope and VAT treatment of each extra"]
        ]
      },
      callout:
        `The ${conveyancingPlanning.standardSubtotalRange} subtotal excludes property tax and conditional extra work. Registration treatment also changes if the application does not match the stated common England route.`
    }
  ],
  contextualLinks: [
    { href: "/#calculator", label: "home-buying cost calculator" },
    { href: "/land-registry-fees-uk", label: "Land Registry and registration fee guide" },
    { href: "/stamp-duty-explained", label: "stamp duty and UK property tax guide" },
    { href: "/buying-and-selling-house-same-time", label: "buying and selling a house at the same time" },
    { href: "/costs-before-completion", label: "costs due before completion" },
    { href: "/costs-after-exchange", label: "costs and timing after exchange" },
    { href: "/hidden-costs-buying-new-build-home-uk", label: "hidden costs of buying a new-build home" }
  ],
  officialItems: [
    "property tax calculated from the applicable SDLT, LBTT or LTT rules",
    "registration charges taken from the applicable published fee scale"
  ],
  estimateItems: [
    "VAT-inclusive solicitor or conveyancer professional-fee planning ranges",
    "search packs and bank transfer charges",
    "additional legal work for the particular property or funding arrangement"
  ],
  sections: [
    {
      title: "How much does conveyancing cost in the UK?",
      paragraphs: [
        `For the stated ${formatCurrency(examplePrice)} England purchase, TrueHomeCosts uses ${conveyancingPlanning.legalFeeRange}, including VAT, for standard legal work. Adding the current search, bank-transfer and qualifying registration assumptions produces ${conveyancingPlanning.standardSubtotalRange} before property tax and conditional extras.`,
        "Residential conveyancing costs vary because quotes do not always use the same scope. One headline may show only the professional fee, another may include searches and other disbursements, and a sale-and-purchase quote covers two legal matters rather than one.",
        "MoneyHelper currently says legal fees are usually about £2,000 including VAT and separately gives a broad consumer range from £800 to over £2,000. Those figures cover a wide market and are a benchmark rather than an input forced into the TrueHomeCosts model. Compare the work, VAT and disbursements included before comparing totals."
      ],
      links: [
        { href: "https://www.moneyhelper.org.uk/en/homes/buying-a-home/estimate-your-overall-buying-and-moving-costs", label: "MoneyHelper buying and moving costs" },
        { href: "https://www.moneyhelper.org.uk/en/homes/buying-a-home/find-the-right-solicitor-or-conveyancer", label: "MoneyHelper solicitor and conveyancer comparison guidance" }
      ]
    },
    {
      title: "What are conveyancing fees?",
      paragraphs: [
        "Conveyancing fees pay a solicitor, licensed conveyancer or other suitably regulated legal professional for transferring ownership and completing the transaction's legal work. On a purchase, this commonly includes reviewing the contract and title, raising enquiries, reporting to the buyer and lender, exchanging contracts, arranging completion and handling post-completion steps.",
        "The professional fee is not the same as every amount shown on a completion statement. Disbursements are payments connected with the matter that go to third parties, while property tax is an official calculation that is commonly handled through the conveyancer."
      ]
    },
    {
      title: "What's included in conveyancing fees and what's charged separately?",
      table: {
        caption: "How to read the main parts of a property conveyancing quote",
        columns: ["Quote line", "What it pays for", "How to treat it"],
        rows: [
          ["Professional legal fee", "The conveyancer's agreed work on the purchase or sale", "Market price; check scope and whether VAT is included"],
          ["Search pack", "Local authority, drainage and water, environmental or other relevant searches", "Usually a third-party disbursement; the property and location affect the pack"],
          ["Registration fee", "Registering the transaction with the relevant registry", "Official charge for a defined jurisdiction and application type"],
          ["Bank transfer fee", "Sending completion money", "May be a firm charge or disbursement; ask how many transfers apply and whether VAT is included"],
          ["Property tax", "SDLT, LBTT or LTT where due", "Official calculation, not the solicitor's professional fee"],
          ["Lender work", "Acting for the mortgage lender or meeting extra lender requirements", "May be included or separately itemised"],
          ["Conditional work", "Leasehold, new-build, gifted deposit, shared ownership, equity loan or complex title", "Request the trigger and price before instructing"]
        ]
      },
      afterParagraphs: [
        "An item can be listed inside the same quote total without becoming part of the professional fee. Keep legal work, disbursements, registration and tax separate when comparing property conveyancing costs."
      ]
    },
    {
      title: "How are conveyancing fees calculated?",
      paragraphs: [
        "There is no universal single percentage used to calculate conveyancing fees. A firm may use a fixed fee, an hourly rate, a property-value-linked scale or a combination, then add transaction-specific work and disbursements.",
        "The most useful comparison is therefore the price for the known scope, not a headline number in isolation. Ask what happens if the transaction changes after the initial quote."
      ],
      table: {
        caption: "Common factors that change residential conveyancing costs",
        columns: ["Cost factor", "Why it can affect the quote"],
        rows: [
          ["Property price or value", "Some firms use value bands, and official registration charges can also be value-dependent"],
          ["Purchase, sale or both", "Buying and selling are separate legal matters with different tasks"],
          ["Freehold or leasehold", "Lease review, management information, notices and consents can add work and third-party charges"],
          ["Mortgage lender", "Panel membership and lender requirements can add or change legal work"],
          ["New build or shared ownership", "Developer deadlines, scheme documents and more complex title or lease terms can require extra review"],
          ["Gifted deposit or source of funds", "Additional identity, evidence and reporting may be required"],
          ["Unregistered or complex title", "Missing, split, restricted or defective title issues can require extra investigation"],
          ["Urgency or extra legal work", "Expedited, abortive or out-of-scope work may be charged separately"],
          ["Search requirements", "Location, provider, property type and lender requirements can change the search pack"]
        ]
      }
    },
    {
      title: "Fixed-fee vs hourly conveyancing",
      table: {
        caption: "How common conveyancing fee structures compare",
        columns: ["Fee structure", "How it works", "Main budgeting point"],
        rows: [
          ["Fixed fee", "An agreed price for a defined scope", "Easier to budget, but extra or changed work can still be charged"],
          ["Hourly rate", "Charges reflect time spent at the stated rate", "May suit unusual work but the final cost is less predictable"],
          ["Property-value linked", "The professional fee changes by purchase or sale value band", "It is not the same as a universal legal-fee percentage"],
          ["Estimate", "A likely cost is given before all facts are known", "Ask which assumptions could move the final bill"]
        ]
      },
      afterParagraphs: [
        "The SRA requires regulated firms publishing residential conveyancing prices to explain the basis of charges, likely disbursements, inclusions and VAT treatment. Compare those details rather than choosing on headline price alone."
      ],
      links: [
        { href: "https://www.sra.org.uk/price/", label: "SRA price-transparency guidance" }
      ]
    },
    {
      title: "Buying vs selling conveyancing costs",
      table: {
        caption: "Why buying and selling legal costs are different",
        columns: ["Matter", "Work and charges commonly involved"],
        rows: [
          ["Buying", "Title investigation, searches, lender work, property-tax administration, registration and completion"],
          ["Selling", "Title preparation, contract pack, replies to buyer enquiries, mortgage redemption and leasehold information where relevant"],
          ["Buying and selling", "Two legal matters, even if the same firm handles both; request an itemised quote for each side"]
        ]
      },
      afterParagraphs: [
        "A home mover should budget for both legal matters. The wider journey—estate-agent fees, chains, timing and total moving cash—belongs in the separate buying-and-selling guide."
      ]
    },
    {
      title: "Why conveyancing costs more for some properties",
      bullets: [
        "Leasehold ownership can require lease review, management packs, notices, certificates, consents and service-charge enquiries.",
        "Shared-ownership transactions can add scheme, lease and housing-provider requirements.",
        "Gifted deposits or overseas funds can require additional identity and source-of-funds evidence.",
        "Legacy Help to Buy or other equity-loan work can require separate scheme documents where applicable.",
        "Unregistered, defective, split or restricted titles can require additional investigation or applications.",
        "Multiple mortgages, separate representation or unusual lender requirements can add legal work.",
        "Property-specific risks can require additional searches or indemnity products.",
        "Leasehold sales can involve a third-party management pack whose charge is not the conveyancer's professional fee."
      ],
      callout:
        "A higher final bill is not automatically unreasonable, but every extra should have a clear trigger, scope, VAT treatment and amount."
    },
    {
      title: "New-build conveyancing costs",
      paragraphs: [
        "New-build solicitor fees can be higher where the conveyancer must review a larger developer contract pack, estate or lease arrangements, planning obligations, warranties, access and service rights, incentives and a short exchange deadline.",
        "Ask whether the quote includes the new-build supplement, lender reporting, any leasehold or estate-management work and post-completion registration. Reservation fees, upgrades, snagging, service charges and broader move-in costs sit outside this legal-cost section and are covered in the specialist new-build guide."
      ]
    },
    {
      title: "Conveyancing costs in England, Wales, Scotland and Northern Ireland",
      table: {
        caption: "Jurisdiction checks for a UK residential conveyancing budget",
        columns: ["Nation", "Legal and registration point", "Property tax"],
        rows: [
          ["England", "English conveyancing process; HM Land Registry for qualifying registrations", "SDLT"],
          ["Wales", "HM Land Registry also registers Welsh land, while the legal transaction sits under the England-and-Wales system", "LTT"],
          ["Scotland", "Scottish property law, terminology and transaction process; Registers of Scotland", "LBTT"],
          ["Northern Ireland", "Separate legal process and Land Registry or Registry of Deeds arrangements administered by Land & Property Services", "SDLT"]
        ]
      },
      afterParagraphs: [
        "Do not apply an England-only search, registration or transaction assumption unchanged throughout the UK. Ask the solicitor to confirm the applicable process, registry, tax and disbursement scope."
      ]
    },
    {
      title: "When do you pay conveyancing fees?",
      paragraphs: [
        "A firm may ask for money on account when instructed. Buyers commonly pay search money early because the searches must be ordered, while identity checks or other disbursements can also be collected before completion.",
        "The remaining professional fee, registration amount, property tax and other outstanding items are commonly shown on a completion statement and funded before completion. A firm can use different interim billing terms, so confirm the payment schedule and what happens if the transaction falls through."
      ]
    },
    {
      title: "How to compare conveyancing quotes",
      bullets: [
        "Check whether every professional fee and supplement includes VAT.",
        "Identify the search pack, Land Registry or registration charge and each bank-transfer fee.",
        "Confirm any mortgage-lender, leasehold, new-build, gifted-deposit or shared-ownership supplement.",
        "Look for separate identity, anti-money-laundering, source-of-funds, postage or administration charges.",
        "Check whether the quote is fixed, value-linked, hourly or only an estimate.",
        "Ask what is excluded and what event would trigger an additional fee.",
        "Understand the fall-through or abortive-work policy and which disbursements are non-refundable.",
        "Compare the final likely bill for the same scope, not the cheapest headline legal fee."
      ]
    },
    {
      title: "Worked example: £300,000 England purchase",
      paragraphs: [
        "This standard planning example is assembled from the same central ranges and official registration module used by the homepage calculator. It does not add a separate conveyancing model or change calculator output."
      ],
      table: {
        caption: "TrueHomeCosts conveyancing planning example",
        columns: ["Line", "Planning amount", "Treatment"],
        rows: [
          ["Professional legal work", conveyancingPlanning.legalFeeRange, `Market-estimate range; includes VAT at ${Math.round(solicitorFeeVatTreatment.rate * 100)}% for planning`],
          ["Search pack", conveyancingPlanning.englandSearchRange, "Market-estimate range for England"],
          ["Bank transfer", conveyancingPlanning.transferFeeRange, "Market-estimate range for one transfer"],
          ["HM Land Registry", conveyancingPlanning.registrationFee, "Official electronic Scale 1 whole-title fee for this price and route"],
          ["Standard planning subtotal", conveyancingPlanning.standardSubtotalRange, "Excludes property tax and conditional extras"],
          ["Property tax", "Calculate separately", "Official SDLT result depends on buyer circumstances"],
          ["Conditional extras", "Quote separately", "Leasehold, new-build, gifted-deposit, shared-ownership, lender or title-specific work"]
        ]
      },
      callout:
        "Do not add a quote's bundled search, registration or transfer amount to these lines again. Replace the relevant planning line with the itemised real quote."
    }
  ],
  faqs: [
    {
      question: "How much does conveyancing cost in the UK?",
      answer:
        `For a straightforward ${formatCurrency(examplePrice)} England purchase, the current TrueHomeCosts planning subtotal is ${conveyancingPlanning.standardSubtotalRange} before property tax and conditional extras. It includes ${conveyancingPlanning.legalFeeRange} for VAT-inclusive professional legal work plus separate searches, one bank transfer and the stated qualifying registration fee.`
    },
    {
      question: "How are conveyancing fees calculated?",
      answer:
        "There is no universal percentage. Firms may use a fixed fee, hourly rate, property-value band or estimate, then price extra work according to tenure, lender, funding, title, scheme and urgency."
    },
    {
      question: "What is included in conveyancing fees?",
      answer:
        "The professional fee pays for the agreed legal work. Searches, registration, transfer fees, property tax and transaction-specific extras may appear in the same quote or completion statement but should be itemised separately."
    },
    {
      question: "Are property searches included in conveyancing fees?",
      answer:
        "Sometimes a quote total includes them, but searches are normally third-party disbursements rather than professional legal income. Check the pack, price and refund position."
    },
    {
      question: "Do leasehold or new-build homes cost more to convey?",
      answer:
        "They often can because the conveyancer may need to review more documents, lease or estate arrangements, management information, developer requirements and lender conditions. Ask for each supplement and third-party charge."
    },
    {
      question: "Are conveyancing fees different when selling a house?",
      answer:
        "Yes. A sale involves preparing title and contract papers, answering enquiries and dealing with redemption or leasehold information. Buying and selling are two legal matters even when one firm handles both."
    },
    {
      question: "When do you pay conveyancing fees?",
      answer:
        "A firm may request money on account at instruction, collect search and other disbursement money during the matter, then collect the remaining balance before completion. Check the firm's own schedule and fall-through terms."
    }
  ],
  showFaqAnswersExpanded: true,
  faqBeforeSources: true,
  relatedGuides: [
    "land-registry-fees-uk",
    "costs-before-completion",
    "buying-and-selling-house-same-time",
    "hidden-costs-buying-new-build-home-uk",
    "stamp-duty-explained"
  ],
  officialSourceKeys: ["sraPriceTransparency", "hmlr", "ros", "lpsNi", "sdlt", "lbtt", "ltt"],
  sourceKeys: [
    "moneyHelperBuyingMoving",
    "moneyHelperConveyancing",
    "sraPriceTransparency",
    "govUkBuyingConveyancing",
    "hmlr",
    "ros",
    "lpsNi"
  ],
  ctaTitle: "Build the complete legal-cost budget",
  ctaText:
    "Enter the property price and UK nation, then replace the calculator's legal, search, registration and transfer planning lines with the corresponding itemised figures from your conveyancer.",
  mistakes: [
    "Comparing headline legal fees without checking VAT, scope and disbursements",
    "Treating property tax or registration as the solicitor's professional fee",
    "Ignoring conditional leasehold, new-build, funding, lender or title work"
  ],
  checklist: [
    "Request an itemised VAT-clear quote",
    "Confirm the jurisdiction, registry and search pack",
    "Replace each calculator planning line separately"
  ]
};
