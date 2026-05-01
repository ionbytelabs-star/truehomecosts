import type { CalculatorInput } from "@/lib/calculator";

import type { AtGlanceItem, GuideSection } from "@/content/types";

export const homeKeywords = [
  "true cost of buying a house UK",
  "buying a house costs UK calculator",
  "total upfront cost buying property UK",
  "upfront costs buying a house UK",
  "cost of buying a house calculator UK",
  "house buying costs UK",
  "UK property buying costs calculator"
] as const;

export const homePageFaqs = [
  {
    question: "How much money do I need to buy a house in the UK?",
    answer:
      "You usually need your deposit plus the extra upfront costs needed to complete and move in. Those extra costs often include property tax, solicitor fees, searches, surveys, mortgage fees, moving costs and a cash buffer."
  },
  {
    question: "What upfront costs do you pay when buying a house?",
    answer:
      "The main upfront costs are the deposit, stamp duty or regional property tax, solicitor and conveyancing fees, searches, survey costs, mortgage fees, insurance, removals and initial setup spending."
  },
  {
    question: "Is stamp duty included in the calculator?",
    answer:
      "Yes. The calculator estimates SDLT for England and Northern Ireland, LBTT for Scotland, and LTT for Wales. It keeps tax separate from estimate-led costs so buyers can see which parts are official-rate items."
  },
  {
    question: "Do first-time buyers have lower buying costs?",
    answer:
      "Sometimes. First-time buyers may pay less property tax in some UK nations and may have smaller moving costs, but they still need to budget for legal fees, searches, surveys, mortgage costs and move-in spending."
  },
  {
    question: "What costs are often forgotten when buying a house?",
    answer:
      "Buyers often forget searches, survey upgrades, telegraphic transfer fees, mortgage product fees, removals, locks, insurance and the first wave of setup costs after completion."
  },
  {
    question: "How much should I budget for solicitor fees and surveys?",
    answer:
      "A straightforward purchase may need around £950 to £1,950 or more for legal work, with disbursements on top. Surveys can range from the mid-hundreds to £2,000 or more depending on the property and report level."
  },
  {
    question: "Is the calculator financial advice?",
    answer:
      "No. The calculator is an informational planning tool. It is not financial, mortgage, legal or tax advice, and buyers should check important figures with the right professional or official source."
  },
  {
    question: "Does the calculator work for England, Scotland, Wales and Northern Ireland?",
    answer:
      "Yes. It supports England and Northern Ireland, Scotland and Wales, with separate property tax logic for SDLT, LBTT and LTT."
  }
] as const;

export const homeAtGlance: AtGlanceItem[] = [
  {
    label: "Typical cost range",
    value: "Buyers should budget for the deposit plus several thousand pounds of extra upfront costs, with the exact total changing by nation, buyer type and property complexity."
  },
  {
    label: "Usually applies when",
    value: "You are planning a residential purchase in England and Northern Ireland, Scotland or Wales and want the full upfront cash picture rather than a deposit-only target."
  },
  {
    label: "Status",
    value: "Property tax and relevant HMLR fee bands use centrally maintained official data. Legal fees, surveys, mortgage costs, moving, insurance and furnishing are estimate-led planning ranges."
  },
  {
    label: "What buyers should check",
    value: "Confirm the tax position for your nation and buyer type, then sense-check the estimate-led costs against real quotes from your solicitor, lender and surveyor."
  }
] as const;

export const homeScenarioInputs: Array<{
  title: string;
  summary: string;
  input: CalculatorInput;
}> = [
  {
    title: "£200,000 first-time buyer",
    summary: "Shows how a lower-price first purchase can still need legal, survey, mortgage and moving money beyond the deposit.",
    input: {
      propertyPrice: 200_000,
      jurisdiction: "england-ni",
      buyerType: "first-time-buyer",
      depositMode: "percentage",
      depositPercentage: 10,
      assumptionLevel: "average",
      includeMoving: true,
      includeFurnishing: false,
      includeInsurance: true
    }
  },
  {
    title: "£300,000 home mover",
    summary: "Illustrates a mainstream move where deposit, tax, survey choice and removals can all affect the cash needed before completion.",
    input: {
      propertyPrice: 300_000,
      jurisdiction: "england-ni",
      buyerType: "home-mover",
      depositMode: "percentage",
      depositPercentage: 10,
      assumptionLevel: "average",
      includeMoving: true,
      includeFurnishing: false,
      includeInsurance: false
    }
  },
  {
    title: "£450,000 additional property buyer",
    summary: "Highlights how a second home or additional property can need a larger deposit assumption and higher-rate tax treatment.",
    input: {
      propertyPrice: 450_000,
      jurisdiction: "england-ni",
      buyerType: "additional-property",
      depositMode: "percentage",
      depositPercentage: 25,
      assumptionLevel: "average",
      includeMoving: true,
      includeFurnishing: false,
      includeInsurance: true
    }
  }
] as const;

export const homeCostSummaryTable = {
  summary:
    "The table below summarises common UK house buying costs. Ranges are planning estimates unless the item is an official tax or published fee, and the exact total changes by property price, nation and buyer type.",
  caption: "Typical UK upfront house buying cost summary",
  columns: ["Cost item", "Typical UK planning range", "Notes"],
  rows: [
    ["Deposit", "Usually 5% to 20%+ of the price", "The largest cash item for most buyers and separate from fees"],
    ["Stamp duty / property tax", "£0 to five figures+", "Official SDLT, LBTT or LTT depends on nation, price and buyer type"],
    ["Solicitor / conveyancing fees", "About £950 to £1,950+", "Estimate for legal work before disbursements and property-specific extras"],
    ["Searches and disbursements", "About £180 to £430+", "Covers local authority, drainage, environmental and related checks"],
    ["Survey", "About £400 to £2,000+", "Market estimate depending on report level, age and condition"],
    ["Mortgage fees", "£0 to £2,500+", "May include broker, product, booking or valuation charges"],
    ["Moving costs", "About £300 to £2,000+", "Depends on distance, property size, packing and storage needs"],
    ["Insurance", "Often low hundreds per year+", "Buildings cover is commonly arranged around exchange or completion"],
    ["Furnishing / setup buffer", "About £800 to £4,500+", "Optional but useful for first homes, essentials and move-in gaps"]
  ]
} as const;

export const homepageGuideLinks = [
  "hidden-costs-buying-house",
  "how-much-money-needed-buy-house",
  "stamp-duty-explained",
  "first-time-buyer-costs",
  "mortgage-fees-costs",
  "moving-costs-uk",
  "insurance-costs-uk",
  "leasehold-costs-uk",
  "cost-of-owning-home-uk"
] as const;

export const homepagePriceGuideLinks = [
  "cost-to-buy-250k-house",
  "cost-to-buy-300k-house",
  "cost-to-buy-350k-house",
  "cost-to-buy-400k-house",
  "cost-to-buy-500k-house"
] as const;

export const homeSections: GuideSection[] = [
  {
    title: "What does the true cost of buying a house in the UK actually include?",
    paragraphs: [
      "The true cost of buying a house in the UK is not just the deposit and not just the purchase price. It is the total upfront cash needed to get from accepted offer to completion and move-in without being caught short by the fees and practical costs that appear around the legal process.",
      "For most buyers, that total includes the deposit, property tax, solicitor or conveyancing fees, search fees, survey costs, mortgage fees, registration charges and a sensible contingency. Depending on the household, it may also include moving costs, initial insurance and furnishing.",
      "This is why a buying a house costs UK calculator is useful only if it goes beyond the headline tax calculation. Buyers need a joined-up view of the whole transaction, not just one or two lines in isolation."
    ]
  },
  {
    title: "How the homepage calculator works",
    paragraphs: [
      "The calculator is designed to answer a practical question quickly: how much cash do I really need upfront for this purchase? It does that by combining official-rate logic for property tax and registration where relevant with estimate-based assumptions for costs such as legal fees, searches, surveys, mortgage fees and optional moving or furnishing spend.",
      "You can change the property price, select England and Northern Ireland, Scotland or Wales, and choose whether the buyer is a first-time buyer, home mover or additional-property buyer. The deposit can be entered as an amount or a percentage so it is easy to model the same purchase in more than one way.",
      "The optional toggles matter because not every buyer wants the same definition of upfront cost. Some people want the bare minimum needed to complete legally. Others want the truer all-in figure that includes moving, insurance and furnishing. Both views are valid, but they answer different questions."
    ],
    table: {
      summary:
        "The table below explains what each major calculator input or output area does so buyers can see why the result goes beyond a simple stamp duty figure.",
      caption: "What the calculator covers",
      columns: ["Input or output area", "What it does", "Why it matters"],
      rows: [
        ["Property price and jurisdiction", "Sets the purchase context", "Tax rules and some fees change by nation"],
        ["Buyer type", "Applies first-time buyer or higher-rate logic where relevant", "Status can materially change the tax line"],
        ["Deposit mode", "Lets you model amount or percentage", "Useful for comparing affordability scenarios"],
        ["Assumption level", "Switches estimate-led costs between low, average and high", "Helps buyers stress-test the budget"],
        ["Optional toggles", "Adds moving, furnishing and insurance planning", "Shows the difference between legal minimum and realistic all-in spend"]
      ]
    }
  },
  {
    title: "Why the total changes across the UK",
    paragraphs: [
      "The same property price can create a different total upfront cost buying property UK depending on the nation where the property sits. England and Northern Ireland use SDLT, Scotland uses LBTT, and Wales uses LTT. Those systems do not share the same thresholds or relief rules.",
      "Buyer type matters too. A first-time buyer can face a different tax position from a home mover, and an additional-property buyer can face a significantly heavier total because both deposit expectations and higher-rate tax treatment may change at the same time.",
      "That is why the calculator asks for location and buyer type before giving the result. Without those two pieces of information, the number is too vague to be useful."
    ],
    bullets: [
      "England / Northern Ireland: SDLT applies",
      "Scotland: LBTT applies",
      "Wales: LTT applies",
      "First-time buyer relief and higher-rate treatment differ across those systems"
    ]
  },
  {
    title: "Which figures are official and which are estimates?",
    paragraphs: [
      "One of the most important distinctions on this site is the split between official figures and planning estimates. Official figures come from published tax bands or published fee scales, which makes them easier to verify. Estimate-based figures are still important, but they depend on the market, the property and the providers involved.",
      "On this homepage, property tax and relevant registration fee data are drawn from central data files so they can be updated in one place. Legal fees, searches, surveys, mortgage costs, moving budgets, insurance allowances and furnishing allowances are estimate-led assumptions that can be edited centrally too.",
      "That separation matters for trust. Buyers should not confuse a realistic planning estimate with an official government charge, and they should not ignore the estimate-led side simply because it is less exact."
    ]
  },
  {
    title: "When do buying costs usually show up in the process?",
    paragraphs: [
      "Some buyers search for the total upfront cost buying property UK because they want one number. In practice, the better way to think about it is as a timeline of cash calls. Some costs appear before exchange, some gather on the completion statement, and others sit in the first few days after move-in.",
      "The earlier costs often include survey work, initial solicitor money and some lender-related fees. The heaviest concentration is usually closer to exchange and completion, when the deposit balance, tax and final legal statement need to be settled. Then the move-in layer arrives with removals, locks, cleaning, insurance and immediate setup costs.",
      "Understanding that timing helps buyers avoid a common trap: having enough money overall but not enough accessible money at the point the transaction needs it."
    ],
    table: {
      summary:
        "The table below shows when the main buying costs usually appear, helping buyers plan not just the total but the order in which the money is likely to be needed.",
      caption: "Simple timing guide for the true buying cost",
      columns: ["Stage", "Typical costs", "Why it matters"],
      rows: [
        ["Before or just after offer", "Broker costs, lender valuation, early legal spend", "These costs can be spent before the deal is guaranteed"],
        ["Before exchange", "Searches, survey and legal follow-up", "This is where hidden costs become more visible"],
        ["Completion stage", "Deposit balance, tax, registration and final legal fees", "Usually the largest single cash demand"],
        ["Move-in week", "Removals, locks, cleaning, insurance and setup", "Still part of the true buying budget"]
      ]
    }
  },
  {
    title: "What buyers most often forget when budgeting upfront costs",
    paragraphs: [
      "Upfront costs buying a house UK often feels like a deposit conversation until the transaction becomes real. Then the forgotten lines appear: searches, survey fees, telegraphic transfer fees, mortgage product fees, moving costs, lock changes, cleaning, broadband setup or furnishing. None of those is unusual. The problem is simply that they are rarely shown together at the start.",
      "This is why many buyers feel they are close to ready, then suddenly feel stretched when the offer is accepted. It is not always because the purchase changed. Often it is because the real buying budget finally became visible.",
      "The homepage is designed to reduce that shock by showing the full structure before the transaction reaches that stressful stage."
    ],
    bullets: [
      "Search fees and disbursements",
      "Survey costs that sit outside the lender valuation",
      "Mortgage product or broker fees",
      "Registration and bank transfer charges",
      "Moving and move-in setup costs",
      "Optional but realistic costs such as furnishing and insurance"
    ]
  },
  {
    title: "How to use the result on this page properly",
    paragraphs: [
      "The result card is not a legal completion statement and it is not financial advice. It is a planning tool designed to help you understand the shape of the budget before the transaction reaches the point where every decision feels urgent.",
      "A useful way to work with the result is to run more than one scenario. Try a low assumption level if the property looks simple, then switch to average and high to see how much the number changes. Change the deposit percentage too. A purchase that only feels comfortable at the cheapest possible settings may not be as safe as it first appears.",
      "When real quotes start to arrive from the lender, solicitor or surveyor, compare them against the planning number rather than throwing the planning number away. The goal is to refine the budget, not to start from zero each time a new piece of information appears."
    ]
  },
  {
    title: "What the calculator does not try to do",
    paragraphs: [
      "This site is designed for fast, static, client-side planning. It does not replace a solicitor's transaction-specific advice, a mortgage broker's recommendation or the exact tax treatment confirmed by the relevant official authority. It also does not pretend every purchase is simple.",
      "Leasehold purchases, unusual titles, new-build complications, major survey findings, cash purchases with special circumstances and complex chains can all change the real number. That is why the site uses a disclaimer and keeps estimate-based lines clearly labelled.",
      "The right expectation is that the calculator gives a strong early planning baseline. The closer you get to exchange and completion, the more your own paperwork takes over."
    ]
  },
  {
    title: "Why this calculator gives a fuller answer than stamp duty tools",
    paragraphs: [
      "A stamp duty tool can be useful, but it only answers one part of the question. Buyers still need to budget for the deposit, conveyancing, searches, surveys, mortgage fees, moving costs, insurance and a sensible buffer for the items that tend to appear late in the process.",
      "This calculator is built to show that bigger picture. It keeps official charges separate from estimate-led costs, which helps you see what is set by published rules and what is still a planning allowance that may move once quotes arrive.",
      "You can change the property price, location, buyer type and cost assumptions so the result reflects the purchase you are actually considering. The aim is to give you a fuller upfront cost picture before you commit to an offer or rely on a deposit-only number."
    ]
  }
];
