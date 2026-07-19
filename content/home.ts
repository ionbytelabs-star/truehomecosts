import type { CalculatorInput } from "@/lib/calculator";

export const homePageFaqs = [
  {
    question: "What costs does the house buying calculator include?",
    answer:
      "It includes the deposit, property tax, legal and registration costs, surveys, mortgage fees, moving and setup allowances, and an optional contingency."
  },
  {
    question: "Does the calculator include stamp duty, LBTT and LTT?",
    answer:
      "Yes. It applies SDLT in England and Northern Ireland, LBTT in Scotland, or LTT in Wales using the selected buyer type."
  },
  {
    question: "How accurate are the estimates?",
    answer:
      "Taxes use published rules, while provider-led costs are planning estimates. Replace estimates with quotations and confirm every charge before committing."
  },
  {
    question: "Can first-time buyers use the calculator?",
    answer:
      "Yes. Select first-time buyer so the calculator can apply relevant tax treatment, subject to your eligibility."
  },
  {
    question: "Does the calculator cover every UK nation?",
    answer:
      "Yes. England, Scotland, Wales and Northern Ireland are separate choices so tax and registration treatment is not mixed between jurisdictions."
  }
] as const;

const commonScenarioInput = {
  jurisdiction: "england",
  depositMode: "percentage",
  depositPercentage: 10,
  assumptionLevel: "average",
  includeMoving: true,
  includeFurnishing: false,
  includeInsurance: true,
  includeContingency: true,
  contingencyPercentage: 10
} as const;

export const homeScenarioInputs: Array<{
  title: string;
  summary: string;
  input: CalculatorInput;
}> = [
  {
    title: "£200,000 first-time buyer",
    summary: "England, 10% deposit, average planning estimates and no furnishing allowance.",
    input: { ...commonScenarioInput, propertyPrice: 200_000, buyerType: "first-time-buyer" }
  },
  {
    title: "£300,000 home mover",
    summary: "England, 10% deposit, average planning estimates and no furnishing allowance.",
    input: { ...commonScenarioInput, propertyPrice: 300_000, buyerType: "home-mover" }
  },
  {
    title: "£450,000 additional-property buyer",
    summary: "England, 10% deposit, average planning estimates and additional-property SDLT.",
    input: { ...commonScenarioInput, propertyPrice: 450_000, buyerType: "additional-property" }
  }
];

export const homepageGuides = [
  { slug: "hidden-costs-buying-house", title: "Hidden costs of buying a house", description: "See the extra legal, survey, lender and setup costs buyers commonly overlook." },
  { slug: "how-much-money-needed-buy-house", title: "How much money is needed?", description: "Build a savings target that includes more than the deposit." },
  { slug: "first-time-buyer-costs", title: "First-time buyer costs", description: "Understand the fees and cash timing around a first purchase." },
  { slug: "stamp-duty-explained", title: "Stamp duty and UK property taxes", description: "Compare SDLT, LBTT and LTT and learn when different rates may apply." },
  { slug: "mortgage-fees-costs", title: "Mortgage fees", description: "Plan for lender, valuation, arrangement and possible broker charges." },
  { slug: "moving-costs-uk", title: "Moving costs", description: "Budget for removals, packing, storage and moving-day practicalities." }
] as const;
