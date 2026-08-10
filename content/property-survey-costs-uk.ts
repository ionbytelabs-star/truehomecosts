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
const examplePriceLabel = formatCurrency(examplePrice);
const level1PlanningAmount = formatCurrency(surveyBand.low);
const level2PlanningAmount = formatCurrency(surveyBand.average);
const level3PlanningAmount = formatCurrency(surveyBand.high);

const costComparisonRows = [
  [
    "Mortgage/lender valuation",
    "£150–£800 when the buyer is charged",
    "Not separated from the survey category",
    "A limited check for the lender; not a buyer's condition survey"
  ],
  [
    "RICS Home Survey Level 1",
    "Around £380",
    level1PlanningAmount,
    "Conventional, apparently sound homes where a concise condition overview is appropriate"
  ],
  [
    "RICS Home Survey Level 2",
    "Around £400",
    level2PlanningAmount,
    "Many conventional homes in reasonable condition; survey-only and valuation variants exist"
  ],
  [
    "RICS Home Survey Level 3",
    "£600+; bespoke work can exceed £1,000",
    level3PlanningAmount,
    "Older, larger, altered, unusual or run-down homes, or where major work is planned"
  ]
] as const;

export const propertySurveyCostsGuide: GuidePageContent = {
  slug: "property-survey-costs-uk",
  title: "House Survey Cost UK 2026: Level 1, 2 & 3",
  description:
    "How much does a house survey cost in the UK? Compare Level 1, Level 2 and Level 3 survey costs, what each includes and what affects surveyor fees.",
  keywords: [
    "house survey cost UK",
    "property survey cost",
    "home survey cost",
    "Level 1 survey cost",
    "Level 2 survey cost",
    "Level 3 survey cost",
    "Level 2 vs Level 3 survey cost",
    "building survey cost",
    "mortgage valuation vs house survey",
    "surveyor fees"
  ],
  h1: "House Survey Costs UK 2026: Level 1, Level 2 and Level 3",
  intro:
    "House survey costs depend on the level of inspection and the property being examined. Use the published indications and TrueHomeCosts planning points below to set a budget, then replace the allowance with a written quote for the actual home.",
  directAnswer:
    "MoneyHelper gives an overall homebuyer-survey planning range of £400–£1,500. For a " +
    examplePriceLabel +
    " property, the TrueHomeCosts calculator uses " +
    level1PlanningAmount +
    ", " +
    level2PlanningAmount +
    " and " +
    level3PlanningAmount +
    " as Level 1-, Level 2- and Level 3-style planning points. Survey level is a major driver, but size, age, construction, condition and complexity affect the final quote. A mortgage valuation is a separate lender service and does not replace a buyer's home survey.",
  introSections: [
    {
      title: "House survey costs at a glance",
      paragraphs: [
        "The published figures below are indicative consumer guidance, not fixed national prices. RICS says Level 1 starts at the lower end at a few hundred pounds, while some bespoke Level 3 work costs more than £1,000. MoneyHelper's current examples and overall planning range provide the more specific reference points shown here.",
        "The TrueHomeCosts column reuses the calculator's existing " +
          examplePriceLabel +
          " price band. Its low, average and high points are budget settings, not claimed market averages or survey quotations."
      ],
      table: {
        summary:
          "Indicative current consumer guidance compared with the shared TrueHomeCosts planning points for a £300,000 property.",
        caption: "House survey and lender valuation cost comparison",
        columns: ["Survey or check", "Published indication", "TrueHomeCosts £300,000 planning point", "Typical purpose"],
        rows: costComparisonRows.map((row) => [...row])
      },
      afterParagraphs: [
        "MoneyHelper says homebuyer surveys can range from £400 to £1,500 overall. Get property-specific quotes and compare the inspection scope, report, exclusions, VAT treatment and any valuation or reinstatement figure—not only the headline fee."
      ]
    }
  ],
  updatedLabel: "Reviewed 10 August 2026",
  lastReviewed: "2026-08-10",
  lastReviewedLabel: "10 August 2026",
  calculatorDataVersion: calculatorMetadata.dataVersion,
  trustReviewedText:
    "Reviewed against the current RICS consumer guidance, RICS Home Survey terminology, MoneyHelper cost guidance and the shared TrueHomeCosts calculator assumptions.",
  atGlance: [
    { label: "Overall published planning range", value: "£400–£1,500" },
    { label: "Level 1 planning point at £300,000", value: level1PlanningAmount },
    { label: "Level 2 planning point at £300,000", value: level2PlanningAmount },
    { label: "Level 3 planning point at £300,000", value: level3PlanningAmount },
    { label: "Mortgage valuation", value: "Separate lender service" }
  ],
  contextualLinks: [
    { href: "/#calculator", label: "home-buying cost calculator" },
    { href: "/hidden-costs-buying-house", label: "hidden buying costs guide" },
    { href: "/mortgage-fees-costs", label: "mortgage fees and valuation charges guide" },
    { href: "/first-year-cost-buying-house-uk", label: "first-year costs guide" },
    { href: "/cost-of-owning-home-uk", label: "cost of owning a home guide" }
  ],
  officialItems: [
    "RICS publishes the current Level 1, Level 2 and Level 3 Home Survey terminology and scope guidance",
    "MoneyHelper publishes consumer planning indications for survey and lender-valuation costs",
    "survey prices themselves are market quotes rather than statutory fees"
  ],
  estimateItems: [
    "the shared Level 1-, Level 2- and Level 3-style calculator planning points",
    "the final surveyor fee for the property and agreed service",
    "specialist reports, valuations, follow-up inspections and repair allowances"
  ],
  sections: [
    {
      title: "What is a house survey?",
      paragraphs: [
        "A house survey—also called a home survey or property survey—is a professional inspection and report on a home's condition. It helps a buyer understand visible defects, risks and possible further investigations before committing to the purchase.",
        "RICS Home Surveys are benchmarked at Level 1, Level 2 or Level 3. The levels differ in inspection depth, analysis and repair advice. The appropriate service depends on the property and the buyer's concerns, so the cheapest option is not automatically the right one."
      ],
      callout:
        "In Scotland, the seller normally provides a Home Report before marketing. That process is different from the buyer-arranged survey described for England, Wales and Northern Ireland."
    },
    {
      title: "House survey Level 1 cost",
      paragraphs: [
        "MoneyHelper currently indicates around £380 for a Level 1 Home Survey, increasing with property value. The shared TrueHomeCosts planning point for a " +
          examplePriceLabel +
          " property is " +
          level1PlanningAmount +
          ". Treat both as indicative and request a quote for the actual property.",
        "Level 1 is the most concise RICS Home Survey. It describes condition, identifies risks and urgent visible defects, but generally does not provide repair advice. RICS positions it for conventional homes built from common materials and apparently in good condition.",
        "A Level 1 service can be too limited where the property is older, altered, unusual, neglected or where there are specific concerns. Confirm the exact inspection and report scope before choosing it."
      ]
    },
    {
      title: "House survey Level 2 cost",
      paragraphs: [
        "MoneyHelper currently indicates around £400 for a Level 2 Home Survey, rising with property value. The shared TrueHomeCosts " +
          examplePriceLabel +
          " planning point is " +
          level2PlanningAmount +
          "; this deliberately leaves more room than the published starting indication for property and service differences.",
        "Level 2 is a mid-level survey commonly considered for conventional homes in reasonable condition. It gives more detail about defects, maintenance and repairs than Level 1 and includes a more extensive roof-space and drainage-chamber inspection where accessible.",
        "RICS distinguishes a Level 2 survey-only service from a Level 2 survey with valuation. The latter adds a market valuation and insurance reinstatement figure, so check which version is included in the quote."
      ]
    },
    {
      title: "House survey Level 3 cost",
      paragraphs: [
        "MoneyHelper describes Level 3 pricing as £600 or more, while RICS notes that some bespoke services exceed £1,000. The shared TrueHomeCosts planning point at " +
          examplePriceLabel +
          " is " +
          level3PlanningAmount +
          ". Larger, unusual or complex homes can cost more, so this is not a cap.",
        "Level 3—previously commonly called a building survey—is the most comprehensive RICS Home Survey. It provides more extensive analysis of construction and condition, considers visible defects and potential hidden-defect risks, and gives fuller advice on repairs, priorities and consequences.",
        "It is commonly discussed for older, larger, altered, unusual or run-down properties, and where major works are planned. The agreed terms still control access, exclusions and whether estimated repair costs are included as an additional service."
      ]
    },
    {
      title: "Level 2 vs Level 3 survey cost",
      intro:
        "The price difference pays for a different depth of inspection and reporting, not simply a longer document. Compare the service against the building and the questions you need answered.",
      table: {
        summary:
          "A practical comparison of Level 2 and Level 3 survey cost, inspection depth, property suitability, repair advice and valuation treatment.",
        caption: "Level 2 versus Level 3 home survey",
        columns: ["Feature", "Level 2", "Level 3"],
        rows: [
          ["Published cost indication", "Around £400", "£600+; bespoke work can exceed £1,000"],
          ["TrueHomeCosts planning point at £300,000", level2PlanningAmount, level3PlanningAmount],
          ["Inspection and detail", "Mid-level inspection and report", "Most comprehensive inspection and report"],
          ["Typical property", "Conventional construction, reasonable condition and simple form", "Older, larger, altered, unusual or run-down property"],
          ["Repair advice", "Advice on defects, maintenance and repairs", "More detailed repair options, priorities, timescales and consequences"],
          ["Valuation treatment", "Available as survey-only or survey plus valuation", "Not included in the standard RICS Level 3 report; agree separately if needed"]
        ]
      },
      afterParagraphs: [
        "A Level 3 survey is not universally necessary, and Level 2 is not automatically sufficient. Explain the property's age, construction, alterations and any visible concerns when asking surveyors to recommend and quote for a service."
      ]
    },
    {
      title: "Mortgage valuation vs house survey",
      paragraphs: [
        "A mortgage valuation is commissioned for the lender to check whether the property appears adequate security for the loan. It may be brief, remote or automated and is not designed to give the buyer a detailed condition assessment.",
        "MoneyHelper says lenders often cover the valuation, but where the buyer is charged the indicative cost can be £150–£800 depending on property value. That charge is separate from the fee for a buyer's home survey."
      ],
      table: {
        caption: "Lender valuation and buyer survey serve different purposes",
        columns: ["Check", "Who it primarily protects", "Condition and repair detail", "Cost treatment"],
        rows: [
          ["Mortgage/lender valuation", "The lender", "Limited; not a substitute for a condition survey", "Often lender-paid; £150–£800 where charged to the buyer"],
          ["Buyer's Level 1, 2 or 3 survey", "The buyer", "Varies with the selected RICS survey level", "Separate market quote paid by the commissioning client"]
        ]
      },
      afterParagraphs: [
        "Do not assume that paying a mortgage valuation charge means you will receive a useful condition report. Ask the lender what assessment is being carried out and ask the surveyor exactly what your separate survey includes."
      ]
    },
    {
      title: "What affects the cost of a house survey?",
      bullets: [
        "Survey level and the inspection/report detail agreed",
        "Property size, value, age and overall complexity",
        "Construction type, listed status, alterations and extensions",
        "Condition, visible defects and specific concerns raised in advance",
        "Outbuildings, land, access constraints or mixed-use elements",
        "Location, travel time, urgency and local surveyor availability",
        "A Level 2 valuation option, reinstatement figure or other additional service",
        "Specialist reports or follow-up inspections recommended after the survey"
      ],
      callout:
        "Compare like with like. A lower quote can reflect a narrower scope, different exclusions or no valuation rather than a cheaper price for the same service."
    },
    {
      title: "How to choose the right survey",
      paragraphs: [
        "Describe the property accurately and tell the surveyor about extensions, unusual construction, visible cracking, damp, roof concerns or planned building work. Ask which survey level they recommend and why.",
        "Request written quotes that identify the inspection level, report type, access assumptions, exclusions, VAT, turnaround time and any valuation or reinstatement figure. For an important defect or specialist question, ask whether the main survey can address it or whether separate expertise is needed.",
        "This guide provides general budgeting information, not a property-specific recommendation. The surveyor's professional assessment and terms should match the actual home."
      ]
    },
    {
      title: "Survey costs within the full buying budget",
      paragraphs: [
        "The survey is one upfront cost alongside the deposit, property tax, conveyancing, searches, mortgage charges, registration and moving expenses. It may be paid before exchange and may not be refundable if the purchase falls through.",
        "Use the main calculator to test the low, average and high survey planning points within the complete buying budget. Once you have a written quote, replace the allowance with that amount without changing the other cost categories."
      ],
      cta: {
        href: "/#calculator",
        label: "Open the home-buying cost calculator",
        description:
          "The calculator provides a planning allowance, not a survey quotation or property-specific pricing formula."
      }
    }
  ],
  faqs: [
    {
      question: "How much does a house survey cost in the UK?",
      answer:
        "MoneyHelper gives an overall homebuyer-survey range of £400–£1,500. For a " +
        examplePriceLabel +
        " property, TrueHomeCosts uses " +
        level1PlanningAmount +
        ", " +
        level2PlanningAmount +
        " and " +
        level3PlanningAmount +
        " as Level 1-, Level 2- and Level 3-style planning points. Actual quotes vary with the property and service scope."
    },
    {
      question: "How much does a Level 2 survey cost?",
      answer:
        "MoneyHelper's current indicative example is around £400 and increases with property value. The TrueHomeCosts planning point for a " +
        examplePriceLabel +
        " property is " +
        level2PlanningAmount +
        ". Check whether the quote is survey-only or includes a market valuation and reinstatement figure."
    },
    {
      question: "How much does a Level 3 survey cost?",
      answer:
        "MoneyHelper indicates £600 or more, and RICS says some bespoke Level 3 services cost over £1,000. The shared TrueHomeCosts " +
        examplePriceLabel +
        " planning point is " +
        level3PlanningAmount +
        ", but larger or more complex properties can cost more."
    },
    {
      question: "Is a Level 3 survey worth the extra cost?",
      answer:
        "It can be appropriate where the home is older, large, altered, unusual, run-down or intended for major work because Level 3 provides more detailed analysis and repair advice. It is not automatically necessary for every property; discuss the building and your concerns with the surveyor."
    },
    {
      question: "Is a mortgage valuation the same as a house survey?",
      answer:
        "No. A mortgage valuation is a limited assessment for the lender and does not replace a buyer's condition survey. MoneyHelper says it is often lender-paid, but can cost the buyer £150–£800 where a charge applies."
    },
    {
      question: "What makes a property survey more expensive?",
      answer:
        "A higher survey level, larger or older property, unusual construction, alterations, poor condition, access constraints, travel and extra valuation or specialist services can all increase the quote."
    }
  ],
  relatedGuides: [
    "hidden-costs-buying-house",
    "mortgage-fees-costs",
    "first-year-cost-buying-house-uk",
    "cost-of-owning-home-uk",
    "hidden-costs-buying-new-build-home-uk",
    "costs-before-completion"
  ],
  sourceKeys: ["ricsHouseSurveys", "ricsHomeSurveyStandard", "moneyHelperBuyingMoving"],
  ctaTitle: "Put the survey quote into your buying budget",
  ctaText:
    "Use the shared survey planning point as a starting allowance, then replace it with the written quote for the property without changing the calculator's other cost categories.",
  mistakes: [
    "Treating a lender valuation as a buyer's condition survey",
    "Choosing only by price without considering the building and service scope",
    "Assuming a published indication is a guaranteed national quote",
    "Ignoring report exclusions and specialist follow-up"
  ],
  checklist: [
    "Describe the property and your concerns accurately",
    "Compare survey scope, exclusions and VAT as well as price",
    "Confirm whether a valuation or reinstatement figure is included",
    "Allow time and budget for any recommended follow-up checks"
  ]
};
