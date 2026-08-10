import { calculatorMetadata } from "../data/assumptions/calculator";
import { surveyFeeBands } from "../data/assumptions/surveys";
import type { PriceBandRange } from "../data/assumptions/types";
import { formatCurrency } from "../lib/format";

import type { GuidePageContent } from "./types";

const examplePrice = 300_000;

function bandForPrice(bands: PriceBandRange[], price: number): PriceBandRange {
  return bands.find((band) => band.upTo === null || price <= band.upTo) ?? bands.at(-1)!;
}

const surveyBand = bandForPrice(surveyFeeBands, examplePrice);
const surveyLevelRows = [
  [
    "Level 1 / condition report style",
    formatCurrency(surveyBand.low),
    "A concise overview for a conventional, apparently sound property; limited detail and no repair advice."
  ],
  [
    "Level 2 / Home Survey style",
    formatCurrency(surveyBand.average),
    "A mid-level inspection for many conventional homes, with defects and maintenance advice."
  ],
  [
    "Level 3 / building survey",
    formatCurrency(surveyBand.high),
    "The most detailed inspection, often considered for older, altered, unusual or visibly defective property."
  ]
] as const;

export const propertySurveyCostsGuide: GuidePageContent = {
  slug: "property-survey-costs-uk",
  title: "UK Property Survey Costs: Level 1, 2 and 3",
  description:
    "Compare UK property survey costs and RICS-style survey levels, understand Level 2 versus Level 3, and separate a buyer survey from a mortgage valuation.",
  keywords: [
    "house survey cost UK",
    "RICS survey levels explained",
    "Level 2 vs Level 3 survey",
    "HomeBuyer survey cost",
    "building survey cost UK"
  ],
  h1: "Property survey costs by survey level",
  intro:
    `For the calculator's ${formatCurrency(examplePrice)} example band, the central survey assumptions are ${surveyLevelRows[0][1]} for a basic condition-report style allowance, ${surveyLevelRows[1][1]} for a Level 2 / Home Survey style allowance and ${surveyLevelRows[2][1]} for a Level 3 / building survey allowance.`,
  directAnswer:
    "A Level 1-style report is the lightest overview, Level 2 suits many conventional homes, and Level 3 is the most detailed. The right survey depends on the property's age, condition, construction and alterations—not only its price. A lender valuation protects the lender and is not a substitute for the buyer's survey.",
  updatedLabel: "Reviewed 25 July 2026",
  lastReviewed: "2026-07-25",
  lastReviewedLabel: "25 July 2026",
  calculatorDataVersion: calculatorMetadata.dataVersion,
  trustReviewedText:
    "Reviewed by the True Home Costs editorial team against the central calculator assumptions and the cited official sources.",
  atGlance: [
    { label: "Level 1-style allowance", value: surveyLevelRows[0][1] },
    { label: "Level 2-style allowance", value: surveyLevelRows[1][1] },
    { label: "Level 3 allowance", value: surveyLevelRows[2][1] },
    { label: "Not the same as", value: "Lender valuation" }
  ],
  contextualLinks: [
    { href: "/#calculator", label: "home-buying cost calculator" },
    { href: "/hidden-costs-buying-house", label: "hidden buying costs guide" },
    { href: "/first-year-cost-buying-house-uk", label: "first-year costs guide" },
    { href: "/cost-of-owning-home-uk", label: "cost of owning a home guide" }
  ],
  officialItems: [
    "none of the survey planning figures is a statutory fee",
    "the surveyor's named service and terms define the inspection"
  ],
  estimateItems: [
    "Level 1, Level 2 and Level 3-style planning amounts",
    "specialist reports, valuations and follow-up inspections",
    "repair allowances arising from findings"
  ],
  sections: [
    {
      title: "Survey level comparison",
      table: {
        caption: `Central planning examples at ${formatCurrency(examplePrice)}; these are not quotations`,
        columns: ["Survey level", "Planning amount", "Typical scope"],
        rows: surveyLevelRows.map((row) => [...row])
      },
      afterParagraphs: [
        "Names vary between providers. Confirm the inspection level, report format, exclusions and whether a valuation or reinstatement figure is included."
      ]
    },
    {
      title: "Level 1, Level 2 and Level 3 explained",
      paragraphs: [
        "A Level 1 or condition-report style service gives a concise overview and flags visible matters, but usually offers the least diagnosis or repair advice.",
        "A Level 2 or HomeBuyer-style service is a common middle option for a conventional property in reasonable condition. It normally gives more explanation of defects and maintenance considerations.",
        "A Level 3 building survey is the most detailed of the three. It can be worth considering for older, substantially altered, extended, unusual, neglected or visibly defective homes, or when major work is planned."
      ]
    },
    {
      title: "When a higher-level survey may be worthwhile",
      bullets: [
        "The building is old, listed, thatched or of non-standard construction.",
        "There are cracks, damp, roof concerns, movement or signs of poor maintenance.",
        "The property has extensive extensions, conversions or structural alterations.",
        "You plan major refurbishment and need a clearer understanding of fabric and defects.",
        "The Level 2 terms exclude a question that is important to your decision."
      ],
      callout:
        "A survey does not guarantee that every defect will be found. Read access limitations and exclusions, and ask whether specialist follow-up reports are recommended."
    },
    {
      title: "Lender valuation versus buyer survey",
      table: {
        caption: "Two checks with different purposes",
        columns: ["Check", "Who it primarily protects", "What it tells you"],
        rows: [
          ["Mortgage valuation", "The lender", "Whether the property appears adequate security for the loan; it may be brief or automated"],
          ["Buyer's survey", "The buyer", "Condition, visible defects and advice within the chosen survey scope"]
        ]
      },
      afterParagraphs: [
        "Paying a valuation fee does not necessarily mean you will receive a detailed condition report. Ask the lender and surveyor what document, if any, you will receive."
      ]
    },
    {
      title: "What changes the quote?",
      bullets: [
        "Property value, size, age, location and construction",
        "Level of inspection and report detail",
        "Outbuildings, land, access or mixed-use elements",
        "Listed status, extensive alterations or suspected defects",
        "Valuation, reinstatement figure, drone work or specialist testing",
        "Urgency, travel and the local availability of appropriately experienced surveyors"
      ]
    },
    {
      title: "Practical buyer scenarios",
      table: {
        caption: "Match the question to the property",
        columns: ["Scenario", "Starting point to discuss", "Question to ask"],
        rows: [
          ["Modern conventional flat in good order", "Level 1 or 2 depending on concerns", "What can be inspected inside the flat and common parts?"],
          ["1930s house with an extension", "Level 2 or 3", "Will the report address the extension, roof and signs of movement?"],
          ["Victorian renovation project", "Level 3", "Which defects need specialist follow-up before exchange?"],
          ["New build", "Snagging inspection may be relevant", "When can inspection occur and what is outside the snagging scope?"]
        ]
      }
    }
  ],
  faqs: [
    {
      question: "How much does a house survey cost in the UK?",
      answer:
        `In the central ${formatCurrency(examplePrice)} example band, the calculator uses ${surveyLevelRows[0][1]}, ${surveyLevelRows[1][1]} and ${surveyLevelRows[2][1]} as low, average and high planning points. Real quotes vary with the property and service scope.`
    },
    {
      question: "What is the difference between a Level 2 and Level 3 survey?",
      answer:
        "Level 2 is a mid-level inspection often used for conventional homes in reasonable condition. Level 3 is more detailed and is commonly considered for older, altered, unusual or defective property. The surveyor's terms determine the exact scope."
    },
    {
      question: "Is a mortgage valuation enough?",
      answer:
        "Not if you want a condition assessment for your own decision. A mortgage valuation is primarily for the lender and may not describe defects in useful detail."
    }
  ],
  relatedGuides: [
    "hidden-costs-buying-house",
    "first-year-cost-buying-house-uk",
    "cost-of-owning-home-uk",
    "hidden-costs-buying-new-build-home-uk",
    "costs-before-completion"
  ],
  sourceKeys: ["moneyHelperBuyingMoving", "moneyHelperHomeBuying"],
  ctaTitle: "Test the survey level in your buying budget",
  ctaText:
    "Choose the low, average or high calculator assumption as a starting point, then replace it with a written survey quote for the actual property.",
  mistakes: [
    "Treating a lender valuation as a buyer survey",
    "Choosing only by price without considering the building",
    "Ignoring report exclusions and specialist follow-up"
  ],
  checklist: [
    "Describe the property accurately to the surveyor",
    "Compare scope as well as price",
    "Allow time for follow-up checks before exchange"
  ]
};
