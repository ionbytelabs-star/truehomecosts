import { calculatorMetadata } from "../data/assumptions/calculator";
import { hmlrElectronicScale1Fees } from "../data/fees/hmlr";
import { northernIrelandLandRegistryTransferFees } from "../data/fees/northern-ireland";
import { scotlandDispositionRegistrationFees } from "../data/fees/scotland";
import { formatCurrency } from "../lib/format";

import type { GuidePageContent } from "./types";

function bandLabel(upTo: number | null): string {
  return upTo === null ? "Above the previous band" : `Up to ${formatCurrency(upTo)}`;
}

const englandWalesRegistrationRows = hmlrElectronicScale1Fees.map((band) => [
  bandLabel(band.upTo),
  formatCurrency(band.fee)
]);

const scotlandRegistrationRows = scotlandDispositionRegistrationFees.map((band) => [
  bandLabel(band.upTo),
  formatCurrency(band.fee)
]);

const northernIrelandRegistrationRows = northernIrelandLandRegistryTransferFees.map((band) => [
  bandLabel(band.upTo),
  formatCurrency(band.electronic),
  formatCurrency(band.other)
]);

export const landRegistryFeesGuide: GuidePageContent = {
  slug: "land-registry-fees-uk",
  title: "UK Land Registry and Registration Fees Explained",
  description:
    "Understand HM Land Registry fees in England and Wales, Registers of Scotland fees and Northern Ireland arrangements without treating one charge as universal.",
  keywords: [
    "Land Registry fees UK",
    "HM Land Registry fee",
    "registration fees buying house",
    "Registers of Scotland registration fee",
    "Northern Ireland Land Registry fees"
  ],
  h1: "Land Registry and registration fees in the UK",
  intro:
    "There is no single UK Land Registry fee. England and Wales use HM Land Registry, Scotland uses Registers of Scotland, and Northern Ireland has separate Land Registry and Registry of Deeds arrangements administered by Land & Property Services.",
  directAnswer:
    "Registration fees depend on the jurisdiction and application. Price band is only one input: registered or unregistered land, transfer of whole or part, electronic or paper submission and the type of application can all change the charge. Use the applicable official scale and have the conveyancer confirm the exact route.",
  updatedLabel: "Reviewed 25 July 2026",
  lastReviewed: "2026-07-25",
  lastReviewedLabel: "25 July 2026",
  calculatorDataVersion: calculatorMetadata.dataVersion,
  trustReviewedText:
    "Reviewed by the True Home Costs editorial team against the central calculator assumptions and the cited official sources.",
  atGlance: [
    { label: "England & Wales", value: "HM Land Registry" },
    { label: "Scotland", value: "Registers of Scotland" },
    { label: "Northern Ireland", value: "LPS arrangements" },
    { label: "Universal flat fee?", value: "No" }
  ],
  contextualLinks: [
    { href: "/#calculator", label: "home-buying cost calculator" },
    { href: "/conveyancing-costs-uk", label: "solicitor and conveyancing fees" },
    { href: "/stamp-duty-explained", label: "UK property tax guide" },
    { href: "/costs-before-completion", label: "costs due before completion" }
  ],
  officialItems: [
    "HM Land Registry electronic Scale 1 whole-title transfer fees for qualifying England and Wales applications",
    "Registers of Scotland disposition registration fees",
    "Northern Ireland Land Registry transfer scale"
  ],
  estimateItems: [
    "any allowance used before the application route is confirmed",
    "legal work for preparing and submitting the registration",
    "fees for additional documents or separate applications"
  ],
  sections: [
    {
      title: "England and Wales: HM Land Registry",
      paragraphs: [
        "The table below is the official electronic Scale 1 fee table used by the calculator for a transfer of the whole of a registered title. It is a common residential route, not a universal tariff for every application."
      ],
      table: {
        caption: "HM Land Registry electronic Scale 1 whole-title transfer fees",
        columns: ["Consideration or value band", "Fee"],
        rows: englandWalesRegistrationRows
      },
      afterParagraphs: [
        "Paper applications, transfers of part, first registrations and other application types can use different scales or calculations. Wales uses HM Land Registry for registration but LTT—not SDLT—for Welsh land transaction tax."
      ]
    },
    {
      title: "Scotland: Registers of Scotland",
      paragraphs: [
        "Scottish purchases use Registers of Scotland. The calculator applies the published disposition registration fee based on the consideration or property value, whichever is greater."
      ],
      table: {
        caption: "Registers of Scotland disposition registration fees",
        columns: ["Consideration or value band", "Fee"],
        rows: scotlandRegistrationRows
      },
      afterParagraphs: [
        "A disposition fee is separate from LBTT and from the solicitor's professional fee. Other deeds or applications may attract separate charges."
      ]
    },
    {
      title: "Northern Ireland: separate registration arrangements",
      paragraphs: [
        "Northern Ireland is not an HM Land Registry jurisdiction. Land & Property Services administers Land Registry and Registry of Deeds arrangements, and the correct treatment depends on how the land is registered and which application is made."
      ],
      table: {
        caption: "Current Northern Ireland Land Registry transfer scale used for calculator planning",
        columns: ["Consideration or value band", "Electronic", "Other"],
        rows: northernIrelandRegistrationRows
      },
      afterParagraphs: [
        "The calculator labels the Northern Ireland amount as an adjustable allowance because Registry of Deeds or other treatment can differ. The conveyancer should confirm the exact charge."
      ]
    },
    {
      title: "Why apparently similar purchases can have different fees",
      bullets: [
        "The title is already registered or requires first registration.",
        "The application transfers the whole title or only part of it.",
        "The application is submitted electronically or on paper.",
        "The consideration, value or fee band differs.",
        "Additional deeds, notices, restrictions or lender applications are required.",
        "The property sits in a different UK registration and tax jurisdiction."
      ],
      callout:
        "A published table is accurate only when the application matches the table's conditions. Ask the conveyancer to name the scale and application type."
    },
    {
      title: "Registration fee is not property tax",
      table: {
        caption: "Keep three legal-budget lines separate",
        columns: ["Cost", "Basis", "Who receives it"],
        rows: [
          ["Registration fee", "Registry and application type", "Relevant land registration body"],
          ["Property tax", "Jurisdiction, price and buyer circumstances", "HMRC, Revenue Scotland or Welsh Revenue Authority"],
          ["Conveyancing fee", "Professional work and transaction complexity", "Solicitor or conveyancer"]
        ]
      }
    }
  ],
  faqs: [
    {
      question: "How much is the Land Registry fee when buying a house?",
      answer:
        "It depends on the jurisdiction, value band and application. A qualifying electronic transfer of a whole registered title in England or Wales uses HM Land Registry Scale 1; Scotland and Northern Ireland use separate arrangements."
    },
    {
      question: "Does Wales have its own Land Registry?",
      answer:
        "Wales uses HM Land Registry for registration. Its property tax is nevertheless separate: Welsh transactions use Land Transaction Tax."
    },
    {
      question: "Is Northern Ireland covered by HM Land Registry?",
      answer:
        "No. Northern Ireland has separate Land Registry and Registry of Deeds arrangements administered by Land & Property Services."
    }
  ],
  relatedGuides: [
    "stamp-duty-explained",
    "hidden-costs-buying-house",
    "costs-before-completion"
  ],
  officialSourceKeys: ["hmlr", "ros", "lpsNi"],
  sourceKeys: ["hmlr", "ros", "lpsNi", "sdlt", "lbtt", "ltt"],
  ctaTitle: "Calculate the applicable registration line",
  ctaText:
    "Select the property's UK nation and price to see the calculator treatment, then confirm the exact application and fee with the conveyancer.",
  mistakes: [
    "Publishing one fee as applicable throughout the UK",
    "Mixing registration fees with property tax",
    "Ignoring application type and submission method"
  ],
  checklist: [
    "Confirm the registration jurisdiction",
    "Ask whether the title and application match the quoted scale",
    "Keep tax, registration and legal fees separate"
  ]
};
