import { calculatorMetadata } from "../data/assumptions/calculator";
import { hmlrElectronicScale1Fees } from "../data/fees/hmlr";
import { northernIrelandLandRegistryTransferFees } from "../data/fees/northern-ireland";
import { scotlandDispositionRegistrationFees } from "../data/fees/scotland";
import { formatCurrency } from "../lib/format";

import type { GuidePageContent } from "./types";

export const landRegistryPageTitle =
  "Land Registry Fees 2026: HMLR Scale 1 & 2 Calculator | TrueHomeCosts";
export const landRegistryGuideTitle = "Land Registry Fees 2026: HMLR Scale 1 & 2 Calculator";
export const landRegistryMetaDescription =
  "Calculate HM Land Registry fees for England and Wales using current Scale 1 and Scale 2 rates, with guidance for Scotland and Northern Ireland.";
export const landRegistryH1 = "Land Registry Fees 2026: Calculate HM Land Registry Costs";
export const landRegistryReviewDate = "2026-08-25";
export const landRegistryReviewLabel = "25 August 2026";

export const landRegistryFaqs = [
  {
    question: "How much are Land Registry fees when buying a house?",
    answer:
      "For a typical electronic transfer of the whole of an already registered title in England or Wales, Scale 1 fees currently range from £20 to £500. The exact fee depends on the purchase price or value, application type and submission route."
  },
  {
    question: "What is Land Registry Scale 1?",
    answer:
      "Scale 1 broadly covers first registrations and transfers of registered land for monetary consideration, as well as certain leases, surrenders and large-scale applications."
  },
  {
    question: "What is Land Registry Scale 2?",
    answer:
      "Scale 2 applies to a range of other applications, including various transfers or assents not for monetary consideration, registered charges and other applications affecting registered estates."
  },
  {
    question: "Does my mortgage have a separate Land Registry fee?",
    answer:
      "On a typical purchase where the mortgage charge accompanies the transfer, HM Land Registry says only the transfer fee is payable. A separate Scale 2 fee can apply if the charge is lodged as a separate application after the transfer has completed or in other circumstances."
  },
  {
    question: "Does Wales use HM Land Registry?",
    answer:
      "Yes. HM Land Registry covers England and Wales. Welsh property transaction tax is separate and uses Land Transaction Tax rather than SDLT."
  },
  {
    question: "Are Land Registry fees the same in Scotland?",
    answer:
      "No. Scotland uses Registers of Scotland and its own registration-fee schedule. Those charges are not HM Land Registry fees."
  },
  {
    question: "Is Northern Ireland covered by HM Land Registry?",
    answer:
      "No. Land & Property Services administers Northern Ireland's Land Registry and Registry of Deeds under separate rules and fee arrangements."
  }
] as const;

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
  title: landRegistryGuideTitle,
  description: landRegistryMetaDescription,
  keywords: [
    "Land Registry fees UK",
    "HM Land Registry fee",
    "registration fees buying house",
    "Registers of Scotland registration fee",
    "Northern Ireland Land Registry fees"
  ],
  h1: landRegistryH1,
  intro:
    "Use the calculator for England and Wales, then check the separate registration systems for Scotland and Northern Ireland where relevant.",
  directAnswer:
    "HM Land Registry fees in England and Wales depend on the property value, application type and how the application is submitted. For a typical electronic transfer of the whole of an already registered title, current Scale 1 fees range from £20 to £500.",
  updatedLabel: `Reviewed ${landRegistryReviewLabel}`,
  lastReviewed: landRegistryReviewDate,
  lastReviewedLabel: landRegistryReviewLabel,
  calculatorDataVersion: calculatorMetadata.dataVersion,
  trustReviewedText:
    "Reviewed by True Home Costs against the central calculator assumptions and the cited official sources.",
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
  faqs: [...landRegistryFaqs],
  relatedGuides: [
    "conveyancing-costs-uk",
    "stamp-duty-explained",
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
