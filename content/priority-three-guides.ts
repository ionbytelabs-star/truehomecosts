import { calculatorMetadata } from "../data/assumptions/calculator";
import {
  afterExchangeTimelineRows,
  beforeCompletionTimelineRows,
  conveyancingPlanning,
  englandWalesRegistrationRows,
  firstMonthCostRows,
  firstMonthPlanning,
  northernIrelandRegistrationRows,
  priorityThreeExamplePrice,
  priorityThreeReviewDate,
  priorityThreeReviewLabel,
  scotlandRegistrationRows,
  simultaneousMoveCostRows,
  simultaneousMovePlanning,
  surveyLevelRows
} from "../data/editorial/priority-three-guides";
import { formatCurrency } from "../lib/format";

import type { GuidePageContent } from "./types";

const reviewFields = {
  updatedLabel: `Reviewed ${priorityThreeReviewLabel}`,
  lastReviewed: priorityThreeReviewDate,
  lastReviewedLabel: priorityThreeReviewLabel,
  calculatorDataVersion: calculatorMetadata.dataVersion,
  trustReviewedText:
    "Reviewed by the True Home Costs editorial team against the central calculator assumptions and the cited official sources."
} as const;

const reportLink = {
  href: "/reports/true-cost-buying-home-uk-2026",
  label: "2026 UK home-buying cost report"
};

export const priorityThreeGuides: GuidePageContent[] = [
  {
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
      `For a ${formatCurrency(priorityThreeExamplePrice)} purchase, the central calculator currently uses ${conveyancingPlanning.legalFeeRange} as a planning range for standard purchase legal work. Searches, registration, property tax and bank transfer fees are separate lines, so a low headline quote is not necessarily the whole legal bill.`,
    directAnswer:
      "Conveyancing costs combine the conveyancer's own legal fee with third-party payments called disbursements. Ask for an itemised, VAT-clear quote and budget separately for searches, registration, tax and any leasehold, new-build, lender or title-specific work.",
    ...reviewFields,
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
      { href: "/buying-and-selling-house-same-time", label: "buying and selling together guide" },
      reportLink
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
          `On a straightforward ${formatCurrency(priorityThreeExamplePrice)} purchase in England, the calculator separates ${conveyancingPlanning.legalFeeRange} for legal work, ${conveyancingPlanning.englandSearchRange} for searches and ${conveyancingPlanning.transferFeeRange} for a bank transfer. It then calculates registration and property tax independently.`,
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
          `For a ${formatCurrency(priorityThreeExamplePrice)} purchase, the central planning range for standard legal work is ${conveyancingPlanning.legalFeeRange}. This excludes searches, registration, property tax, bank transfer charges and conditional additional work. A current itemised quote is more reliable than an average.`
      },
      {
        question: "Are searches included in conveyancing fees?",
        answer:
          "Sometimes they appear in the same quote total, but they are normally third-party disbursements rather than the conveyancer's professional fee. Check which searches are included and whether the amount is fixed or an estimate."
      },
      {
        question: "Do leasehold purchases cost more to convey?",
        answer:
          "They often can because the conveyancer may need to review the lease, management information, service charges, ground rent, consents and lender requirements. Ask for the leasehold supplement and likely third-party pack fees before instructing."
      }
    ],
    relatedGuides: [
      "land-registry-fees-uk",
      "costs-before-completion",
      "buying-and-selling-house-same-time",
      "stamp-duty-explained",
      "hidden-costs-buying-house"
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
  },
  {
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
      `For the calculator's ${formatCurrency(priorityThreeExamplePrice)} example band, the central survey assumptions are ${surveyLevelRows[0][1]} for a basic condition-report style allowance, ${surveyLevelRows[1][1]} for a Level 2 / Home Survey style allowance and ${surveyLevelRows[2][1]} for a Level 3 / building survey allowance.`,
    directAnswer:
      "A Level 1-style report is the lightest overview, Level 2 suits many conventional homes, and Level 3 is the most detailed. The right survey depends on the property's age, condition, construction and alterations—not only its price. A lender valuation protects the lender and is not a substitute for the buyer's survey.",
    ...reviewFields,
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
      { href: "/cost-of-owning-home-uk", label: "cost of owning a home guide" },
      reportLink
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
          caption: `Central planning examples at ${formatCurrency(priorityThreeExamplePrice)}; these are not quotations`,
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
          `In the central ${formatCurrency(priorityThreeExamplePrice)} example band, the calculator uses ${surveyLevelRows[0][1]}, ${surveyLevelRows[1][1]} and ${surveyLevelRows[2][1]} as low, average and high planning points. Real quotes vary with the property and service scope.`
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
  },
  {
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
    ...reviewFields,
    atGlance: [
      { label: "England & Wales", value: "HM Land Registry" },
      { label: "Scotland", value: "Registers of Scotland" },
      { label: "Northern Ireland", value: "LPS arrangements" },
      { label: "Universal flat fee?", value: "No" }
    ],
    contextualLinks: [
      { href: "/#calculator", label: "home-buying cost calculator" },
      { href: "/conveyancing-costs-uk", label: "conveyancing costs guide" },
      { href: "/stamp-duty-explained", label: "UK property tax guide" },
      { href: "/taxes-and-fees-uk", label: "taxes and fees comparison" },
      reportLink
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
          rows: englandWalesRegistrationRows.map((row) => [...row])
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
          rows: scotlandRegistrationRows.map((row) => [...row])
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
          rows: northernIrelandRegistrationRows.map((row) => [...row])
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
      "conveyancing-costs-uk",
      "stamp-duty-explained",
      "taxes-and-fees-uk",
      "costs-before-completion",
      "hidden-costs-buying-house"
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
  },
  {
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
    ...reviewFields,
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
      { href: "/#calculator", label: "home-buying cost calculator" },
      { href: "/first-month-costs-after-buying-house", label: "first-month costs guide" }
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
      "first-month-costs-after-buying-house",
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
  },
  {
    slug: "costs-before-completion",
    title: "Costs Before Completion When Buying a House",
    description:
      "Plan what UK home buyers may pay before completion, from reservations, mortgage and survey costs to searches, exchange deposit, tax and the completion balance.",
    keywords: [
      "costs before completion",
      "what do I pay before completion",
      "upfront costs before buying house",
      "house purchase payment timeline",
      "exchange deposit completion balance"
    ],
    h1: "Costs payable before completion",
    intro:
      "Before completion, buyers can pay several costs in stages: a reservation or mortgage charge where relevant, legal money on account, searches, a survey, the exchange deposit and finally the completion balance. The timing matters because some early costs are spent even if the purchase does not complete.",
    directAnswer:
      "Separate costs paid during the transaction from money needed on completion day. Ask each provider when the charge becomes non-refundable, and use the conveyancer's completion statement—not a general checklist—to determine the final cleared balance.",
    ...reviewFields,
    atGlance: [
      { label: "Early checks", value: "Mortgage, legal, survey" },
      { label: "Contract stage", value: "Exchange deposit" },
      { label: "Final figure", value: "Completion statement" },
      { label: "Tax timing", value: "Jurisdiction-specific" }
    ],
    contextualLinks: [
      { href: "/#calculator", label: "home-buying cost calculator" },
      { href: "/conveyancing-costs-uk", label: "conveyancing costs guide" },
      { href: "/property-survey-costs-uk", label: "survey costs guide" },
      { href: "/stamp-duty-explained", label: "stamp duty and property tax guide" },
      { href: "/hidden-costs-buying-new-build-home-uk", label: "new-build hidden costs guide" },
      { href: "/gifted-deposit-mortgage", label: "gifted deposit guide" }
    ],
    officialItems: [
      "SDLT, LBTT or LTT calculated under the applicable rules",
      "registration charges under the applicable official scale"
    ],
    estimateItems: [
      "reservation, mortgage, survey, legal and search charges",
      "removals, storage and insurance",
      "optional snagging, specialist reports and planning allowances"
    ],
    sections: [
      {
        title: "Before-completion payment timeline",
        table: {
          caption: "A planning sequence; actual requests and refund terms vary",
          columns: ["Stage", "Possible costs"],
          rows: beforeCompletionTimelineRows.map((row) => [...row])
        }
      },
      {
        title: "Reservation and mortgage costs",
        paragraphs: [
          "A new-build developer may request a reservation fee and impose a reservation deadline. Read what is refundable, what is deducted from the price and what happens if the mortgage or legal work takes longer.",
          "A lender or broker may charge for a product, booking, valuation, advice or administration. Some charges are paid at application, some are added to the loan and others are payable only at completion. Adding a fee to the mortgage can increase the amount on which interest is charged."
        ]
      },
      {
        title: "Survey, searches and legal money on account",
        paragraphs: [
          "A surveyor may require payment before inspection. A conveyancer commonly asks for money on account so searches and other early disbursements can be ordered.",
          `For an England purchase, the central search allowance is ${conveyancingPlanning.englandSearchRange}; for a ${formatCurrency(priorityThreeExamplePrice)} property, the central survey points run from ${surveyLevelRows[0][1]} to ${surveyLevelRows[2][1]}. These are planning figures, not quotes.`,
          "If the transaction falls through, work already completed and third-party disbursements may still be payable. Ask about abortive-fee terms before instructing."
        ]
      },
      {
        title: "Exchange deposit and completion balance",
        paragraphs: [
          "The contractual exchange deposit is due at the contract stage used for the transaction. A gifted deposit, related sale or reduced exchange deposit needs to be discussed early with the lender and conveyancer.",
          "The completion statement then shows the remaining purchase money and reconciles mortgage funds, tax, registration, legal costs and earlier payments. Send only the verified figure by the stated deadline."
        ],
        callout:
          "Do not spend the entire savings pot on the exchange deposit. Ring-fence any remaining completion costs, moving money and a first-month emergency buffer."
      },
      {
        title: "When property tax is paid",
        table: {
          caption: "Tax regimes and practical funding",
          columns: ["Property location", "Tax", "Practical point"],
          rows: [
            ["England or Northern Ireland", "SDLT", "The conveyancer normally collects the amount needed for filing and payment after completion"],
            ["Scotland", "LBTT", "Funds are normally dealt with through the solicitor as part of settlement and return arrangements"],
            ["Wales", "LTT", "The conveyancer normally handles the return and payment funding"]
          ]
        },
        afterParagraphs: [
          "Legal deadlines and filing processes differ. Treat the money as part of the completion funding requirement even where the statutory payment occurs after the completion date."
        ]
      },
      {
        title: "Before completion versus after completion",
        table: {
          caption: "Keep transaction and ownership budgets separate",
          columns: ["Budget", "Examples", "Why separate it"],
          rows: [
            ["Before / on completion", "Survey, searches, legal work, exchange deposit, completion balance, tax, registration, removals", "Required to reach completion"],
            ["After completion", "First mortgage payment, council tax, utilities, repairs, furniture and setup", "Ownership starts with cash needs of its own"]
          ]
        }
      }
    ],
    faqs: [
      {
        question: "What do I pay before completion when buying a house?",
        answer:
          "Possible payments include mortgage or reservation fees, a legal payment on account, searches, survey, exchange deposit and the completion balance. The exact sequence depends on the transaction and jurisdiction."
      },
      {
        question: "Are stamp duty, LBTT or LTT paid before completion?",
        answer:
          "The tax return and statutory payment timing differ by jurisdiction, but the conveyancer normally needs the tax funds as part of the money reconciled for completion. Follow the completion statement and legal advice for the transaction."
      },
      {
        question: "What happens to survey and search costs if the purchase fails?",
        answer:
          "Money already spent on a completed survey, searches or legal work may not be refundable. Check each provider's abortive and refund terms before paying."
      }
    ],
    relatedGuides: [
      "costs-after-exchange",
      "conveyancing-costs-uk",
      "property-survey-costs-uk",
      "stamp-duty-explained",
      "hidden-costs-buying-new-build-home-uk"
    ],
    officialSourceKeys: ["sdlt", "lbtt", "ltt"],
    sourceKeys: ["moneyHelperBuyingMoving", "sdlt", "lbtt", "ltt"],
    ctaTitle: "Map every payment to a date",
    ctaText:
      "Use the calculator to build the total, then add the payment date, refund terms and confirmed quote beside each line in your own transaction plan.",
    mistakes: [
      "Treating every upfront cost as due on completion day",
      "Ignoring non-refundable early checks",
      "Leaving tax and moving money outside the final funding plan"
    ],
    checklist: [
      "Record amount, due date and refund terms",
      "Reconcile all deposits already paid",
      "Verify the final completion statement"
    ]
  },
  {
    slug: "first-month-costs-after-buying-house",
    title: "First-Month Costs After Buying a House UK",
    description:
      "Plan the first month after buying a UK home, including the first mortgage payment, council tax, utilities, insurance, repairs, furniture and moving-day extras.",
    keywords: [
      "first month costs after buying a house UK",
      "costs after buying a house",
      "first mortgage payment",
      "new homeowner bills UK",
      "moving in costs"
    ],
    h1: "First-month costs after buying a house",
    intro:
      "The first month can combine normal bills with one-off setup costs. The first mortgage payment may differ from the regular amount, council tax and utilities begin, and small repairs, locks, cleaning, furniture and moving extras often arrive together.",
    directAnswer:
      "Keep a separate first-month buffer after paying the completion balance. Ask the lender for the exact first-payment date and amount, set up council tax and utilities immediately, and prioritise safety or weatherproofing before optional furniture and cosmetic work.",
    ...reviewFields,
    atGlance: [
      { label: "First mortgage payment", value: "Confirm with lender" },
      { label: "Insurance planning range", value: firstMonthPlanning.insuranceRange },
      { label: "Move-in setup range", value: firstMonthPlanning.furnishingRange },
      { label: "Central moving range", value: firstMonthPlanning.movingRange }
    ],
    contextualLinks: [
      { href: "/cost-of-owning-home-uk", label: "cost of owning a home guide" },
      { href: "/furnishing-costs-uk", label: "furnishing costs guide" },
      { href: "/insurance-costs-uk", label: "insurance costs guide" },
      { href: "/moving-costs-uk", label: "moving costs guide" },
      { href: "/#calculator", label: "home-buying cost calculator" },
      reportLink
    ],
    officialItems: [
      "council tax band and liability information from the relevant authority",
      "contractual mortgage amounts confirmed by the lender"
    ],
    estimateItems: [
      "utilities, broadband, insurance, repairs and safety checks",
      "furniture, appliances, cleaning, locks and setup",
      "service charge, estate charge or ground rent where applicable"
    ],
    sections: [
      {
        title: "First-month cost checklist",
        table: {
          caption: "Immediate ownership costs to confirm",
          columns: ["Cost", "What to check"],
          rows: firstMonthCostRows.map((row) => [...row])
        }
      },
      {
        title: "Why the first mortgage payment can be higher",
        paragraphs: [
          "Mortgage payments normally begin after completion, but the first collection date may not align with a standard monthly cycle. The lender can include interest for the period from completion to the first normal payment date, so the first debit may be larger than the later regular payment.",
          "The calculation and notice process vary by lender. Ask for a written first-payment illustration once the completion date is known, and do not estimate it by simply adding one regular monthly payment."
        ]
      },
      {
        title: "Bills that start almost immediately",
        bullets: [
          "Council tax: notify the local authority and check the band, occupation date, instalments and any discount.",
          "Energy and water: photograph meter readings and contact suppliers even if you plan to switch.",
          "Broadband: check lead times, installation fees and mobile-data fallback.",
          "Insurance: keep buildings cover continuous where required and confirm contents cover.",
          "Leasehold or estate costs: read the completion apportionments and the next payment date."
        ]
      },
      {
        title: "Repairs, safety and urgent maintenance",
        paragraphs: [
          "Use the survey and pre-completion inspection to create a priority list. Active leaks, unsafe electrics, insecure doors, missing alarms and heating problems belong ahead of decoration.",
          "A survey figure is not a repair budget. Obtain specialist quotations where the report recommends them and retain contingency for defects that only become visible after occupation."
        ],
        callout:
          "General information cannot determine whether a property system is safe. Use appropriately qualified contractors where inspection or remedial work is needed."
      },
      {
        title: "Furniture, appliances and small setup costs",
        paragraphs: [
          `For the ${formatCurrency(priorityThreeExamplePrice)} band, the calculator's optional furnishing and setup allowance runs from ${firstMonthPlanning.furnishingRange}. It is deliberately separate from compulsory purchase costs.`,
          "Start with sleep, food storage, cooking, lighting, window privacy and basic cleaning. Measure spaces before ordering and delay cosmetic purchases until the first bills and repair needs are clearer."
        ],
        table: {
          caption: "A staged move-in plan",
          columns: ["Priority", "Examples", "Budget treatment"],
          rows: [
            ["Immediate", "Locks, alarms, cleaning, essential appliance or bed", "First-month buffer"],
            ["Soon", "Broadband setup, curtains, basic storage, small tools", "Planned setup allowance"],
            ["Later", "Decor, upgraded furniture, non-essential appliances", "Optional; delay until cash flow is stable"]
          ]
        }
      },
      {
        title: "Upfront buying costs versus first-month ownership",
        paragraphs: [
          "The calculator's upfront total is designed to reach completion and includes selected moving, insurance and setup allowances. Ongoing mortgage payments, council tax and household bills are not silently added to that upfront figure.",
          "Run the purchase budget first, then create a separate monthly ownership budget and an emergency reserve. That makes it clear whether the deposit is affordable without leaving the new household short of cash."
        ]
      }
    ],
    faqs: [
      {
        question: "What bills start in the first month after buying a house?",
        answer:
          "Typical bills include the first mortgage payment, council tax, energy, water, broadband and insurance. Leasehold or estate charges may also apply, alongside repairs and one-off setup costs."
      },
      {
        question: "Why can the first mortgage payment be higher?",
        answer:
          "It can include interest from completion to the lender's normal payment cycle. The exact amount depends on the lender, rate, completion date and collection date, so request a written figure."
      },
      {
        question: "How much should I keep for moving in?",
        answer:
          "There is no universal amount. Build it from known bills, urgent survey findings and essential items, then add a contingency. The calculator's optional setup range is a starting point, not a target to spend."
      }
    ],
    relatedGuides: [
      "cost-of-owning-home-uk",
      "furnishing-costs-uk",
      "insurance-costs-uk",
      "moving-costs-uk",
      "first-year-cost-buying-house-uk"
    ],
    officialSourceKeys: ["councilTax"],
    sourceKeys: ["moneyHelperBuyingMoving", "moneyHelperHomeBuying", "councilTax"],
    ctaTitle: "Protect the first month, not just completion day",
    ctaText:
      "Calculate the upfront purchase total, then keep a separate buffer for confirmed first bills, priority repairs and essential move-in items.",
    mistakes: [
      "Assuming the first mortgage debit equals a normal payment",
      "Spending the entire reserve on furniture",
      "Delaying council tax and utility notifications"
    ],
    checklist: [
      "Confirm the first mortgage debit",
      "Record meter readings and notify providers",
      "Prioritise safety and urgent repairs"
    ]
  },
  {
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
    ...reviewFields,
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
      { href: "/cost-of-owning-home-uk", label: "ongoing ownership costs guide" },
      reportLink
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
          `At ${formatCurrency(priorityThreeExamplePrice)}, the calculator's standard purchase legal range is ${simultaneousMovePlanning.buyerLegalRange}. Searches, survey, registration, tax and transfer fees remain separate.`,
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
  }
];
