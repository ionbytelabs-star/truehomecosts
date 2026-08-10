import { calculatorMetadata } from "../data/assumptions/calculator";
import { getPageReview } from "../data/editorial/reviews";
import { calculatePropertyTax, calculateUpfrontCosts, type CalculatorInput } from "../lib/calculator";
import {
  calculateScopeRange,
  costScopeDefinitions,
  formatCostRange,
  formatScopeRange,
  getScopeTotal
} from "../lib/cost-scopes";
import { formatCurrency } from "../lib/format";

import type { GuidePageContent, GuideSection } from "./types";

const centralGuideSlugs = new Set([
  "hidden-costs-buying-house",
  "how-much-money-needed-buy-house",
  "first-time-buyer-costs",
  "mortgage-fees-costs",
  "moving-costs-uk",
  "insurance-costs-uk",
  "furnishing-costs-uk",
  "first-year-cost-buying-house-uk",
  "stamp-duty-explained",
  "taxes-and-fees-uk"
]);

const recoveryBacklinks: Record<string, Array<{ href: string; label: string }>> = {
  "hidden-costs-buying-house": [
    { href: "/conveyancing-costs-uk", label: "UK conveyancing costs" },
    { href: "/property-survey-costs-uk", label: "property survey levels and costs" }
  ],
  "hidden-costs-buying-new-build-home-uk": [
    { href: "/conveyancing-costs-uk", label: "conveyancing costs and new-build extras" },
    { href: "/costs-before-completion", label: "payments due before completion" }
  ],
  "stamp-duty-explained": [
    { href: "/costs-before-completion", label: "when completion funds are needed" }
  ],
  "mortgage-fees-costs": [
    { href: "/costs-before-completion", label: "costs payable before completion" },
    { href: "/buying-and-selling-house-same-time", label: "home-mover buying and selling costs" }
  ],
  "moving-costs-uk": [
    { href: "/costs-after-exchange", label: "costs after exchange" },
    { href: "/buying-and-selling-house-same-time", label: "costs when buying and selling together" }
  ],
  "insurance-costs-uk": [
    { href: "/costs-after-exchange", label: "insurance and other costs after exchange" }
  ],
  "first-year-cost-buying-house-uk": [
    { href: "/property-survey-costs-uk", label: "survey costs by level" }
  ],
  "cost-of-owning-home-uk": [
    { href: "/buying-and-selling-house-same-time", label: "home-mover costs" }
  ]
};

function addRecoveryBacklinks(guide: GuidePageContent): GuidePageContent {
  const additions = recoveryBacklinks[guide.slug] ?? [];
  if (additions.length === 0) return guide;

  return {
    ...guide,
    contextualLinks: [
      ...(guide.contextualLinks ?? []).filter(
        (link) => !additions.some((addition) => addition.href === link.href)
      ),
      ...additions
    ]
  };
}

function baseInput(overrides: Partial<CalculatorInput> = {}): CalculatorInput {
  return {
    propertyPrice: 300_000,
    jurisdiction: "england",
    buyerType: "home-mover",
    depositMode: "percentage",
    depositPercentage: 10,
    assumptionLevel: "average",
    includeMoving: true,
    includeInsurance: true,
    includeFurnishing: false,
    includeContingency: true,
    contingencyPercentage: 10,
    ...overrides
  };
}

function scopeRows(input: Omit<CalculatorInput, "assumptionLevel">) {
  const core = calculateScopeRange(input, "core-non-tax-transaction-costs");
  const wider = calculateScopeRange(input, "wider-moving-and-insurance");
  const furnishing = calculateScopeRange(
    { ...input, includeFurnishing: true },
    "optional-furnishing-and-setup"
  );
  return [
    ["Core non-tax transaction costs", formatScopeRange(core), costScopeDefinitions["core-non-tax-transaction-costs"]],
    ["Wider moving and insurance", formatScopeRange(wider), costScopeDefinitions["wider-moving-and-insurance"]],
    ["Optional furnishing and setup", formatScopeRange(furnishing), costScopeDefinitions["optional-furnishing-and-setup"]],
    ["Property tax", "Calculated separately", "Official calculation for the selected jurisdiction and buyer type"],
    ["Deposit", "User entered", "Kept outside hidden-cost ranges and included only in total upfront cash"],
    ["Contingency", "Adjustable", costScopeDefinitions.contingency]
  ];
}

function reviewedGuide(guide: GuidePageContent, changes: Partial<GuidePageContent>): GuidePageContent {
  const review = getPageReview(guide.slug);
  return {
    ...guide,
    ...changes,
    updatedLabel: `Reviewed ${review.lastReviewedLabel}`,
    lastReviewed: review.lastReviewed,
    lastReviewedLabel: review.lastReviewedLabel,
    calculatorDataVersion: review.calculatorDataVersion,
    trustReviewedText: `Figures and official sources were substantively reviewed on ${review.lastReviewedLabel}. Numerical examples use calculator data version ${review.calculatorDataVersion}.`
  };
}

function hiddenCosts(guide: GuidePageContent): GuidePageContent {
  const input = baseInput();
  const example = calculateUpfrontCosts(input);
  const { assumptionLevel: _assumptionLevel, ...rangeInput } = input;
  const core = calculateScopeRange(
    rangeInput,
    "core-non-tax-transaction-costs"
  );
  const sections: GuideSection[] = [
    {
      title: "What the hidden-cost ranges include",
      paragraphs: [
        `For a ${formatCurrency(input.propertyPrice)} England home-mover planning case, excluding the deposit and property tax, the central assumptions produce core non-tax transaction costs of ${formatScopeRange(core)}.`,
        "There is no single unexplained hidden-cost figure on this page. Moving and insurance, optional furnishing, property tax, deposit and contingency are stated separately."
      ],
      table: {
        caption: "Scope of each hidden-cost planning figure",
        columns: ["Cost scope", "Central treatment", "Included and excluded"],
        rows: scopeRows(input)
      }
    },
    {
      title: "Worked example using the production calculator",
      paragraphs: [
        `The worked example is an England home mover buying at ${formatCurrency(input.propertyPrice)} with a 10% deposit, average assumptions, moving and insurance included, furnishing excluded and a 10% contingency. Total upfront cash is ${formatCurrency(example.totalUpfrontCash)}.`,
        `Of that, the deposit is ${formatCurrency(example.depositAmount)}, property tax is ${formatCurrency(example.propertyTaxAmount)}, and the remaining lines are calculated from the shared assumptions.`
      ],
      table: {
        caption: "Calculator-derived hidden-cost example",
        columns: ["Cost", "Amount", "Classification"],
        rows: example.breakdown.map((line) => [line.label, formatCurrency(line.value), line.classification.replaceAll("-", " ")])
      }
    },
    {
      title: "Solicitor/conveyancing, searches and registration are separate",
      paragraphs: [
        "A solicitor quote may group several disbursements, but the planning taxonomy keeps the solicitor/conveyancing fee, searches, registration and bank transfer fee as distinct lines. This makes quotations easier to compare and prevents one line from hiding another.",
        `Across the central assumption set, solicitor/conveyancing is ${formatCostRange("solicitors")}, searches are ${formatCostRange("searches")}, and the bank transfer fee is ${formatCostRange("telegraphic-transfer")}. These are market estimates until replaced with a quotation.`
      ]
    },
    {
      title: "Survey, mortgage and practical move-in costs",
      paragraphs: [
        "Survey and valuation, mortgage fees, moving costs, insurance and furnishing each respond to different choices. A lender valuation does not replace a buyer's survey, and moving costs do not include insurance or furnishing.",
        "Optional costs should be switched on only when they reflect the plan. Contingency remains a separate adjustable cushion rather than being hidden inside a broad range."
      ]
    }
  ];

  return reviewedGuide(guide, {
    intro: "Hidden costs are the non-deposit costs buyers can overlook. This guide separates core transaction costs, wider moving and insurance costs, optional furnishing, property tax and contingency so every headline figure has a clear scope.",
    directAnswer: `Excluding the deposit and property tax, a ${formatCurrency(input.propertyPrice)} England home-mover example has core non-tax transaction costs of ${formatScopeRange(core)} on the central low-to-high assumptions. Moving, insurance, furnishing and contingency are also excluded from that range and shown separately.`,
    atGlance: [
      { label: "Core non-tax transaction costs", value: `${formatScopeRange(core)} for the stated £300,000 England home-mover case` },
      { label: "Deposit and property tax", value: "Excluded from the hidden-cost range and calculated separately" },
      { label: "Moving and insurance", value: "Separate optional planning scope" },
      { label: "Furnishing and contingency", value: "Separate, adjustable allowances" }
    ],
    introSections: [],
    sections,
    faqs: [
      { question: "Does the hidden-cost range include the deposit?", answer: "No. Deposit is a user-entered amount and is shown separately." },
      { question: "Does the hidden-cost range include property tax?", answer: "No. Property tax is an official jurisdiction-specific calculation and is shown separately." },
      { question: "Are moving, insurance and furnishing one category?", answer: "No. They remain separate categories, and furnishing is an optional allowance." },
      { question: "Are the non-statutory figures official charges?", answer: "No. They are market estimates for planning until you replace them with quotations." }
    ]
  });
}

function cashNeeded(guide: GuidePageContent): GuidePageContent {
  const scenarios = [
    baseInput({ propertyPrice: 200_000, buyerType: "first-time-buyer" }),
    baseInput({ propertyPrice: 300_000, buyerType: "home-mover" }),
    baseInput({ propertyPrice: 400_000, jurisdiction: "scotland", buyerType: "home-mover" })
  ];
  const results = scenarios.map(calculateUpfrontCosts);

  return reviewedGuide(guide, {
    intro: "The total cash needed to buy a house is not the same as mortgage affordability. It combines the deposit with completion costs and the optional practical allowances selected for the move.",
    directAnswer: "Total upfront cash means deposit plus property tax, core transaction costs, selected moving costs, insurance, furnishing and contingency. A useful answer must state the price, jurisdiction, buyer type, deposit and assumption settings.",
    introSections: [],
    atGlance: [
      { label: "Deposit", value: "User-entered cash contribution" },
      { label: "Property tax", value: "Official calculation for jurisdiction and buyer type" },
      { label: "Core transaction costs", value: costScopeDefinitions["core-transaction-costs"] },
      { label: "Optional planning lines", value: "Moving, insurance, furnishing and contingency remain separate" }
    ],
    sections: [
      {
        title: "What total upfront cash includes",
        table: {
          caption: "Complete upfront-cash taxonomy",
          columns: ["Part of the budget", "Treatment", "Planning point"],
          rows: scopeRows(baseInput())
        }
      },
      {
        title: "Worked cash requirements",
        paragraphs: ["Each scenario uses average assumptions, a 10% deposit, moving and insurance included, furnishing excluded and a 10% contingency."],
        table: {
          caption: "Calculator-derived total cash examples",
          columns: ["Scenario", "Deposit", "Property tax", "Total upfront cash"],
          rows: results.map((result, index) => [
            `${formatCurrency(result.propertyPrice)} ${scenarios[index].jurisdiction} ${scenarios[index].buyerType}`,
            formatCurrency(result.depositAmount),
            formatCurrency(result.propertyTaxAmount),
            formatCurrency(result.totalUpfrontCash)
          ])
        }
      },
      {
        title: "Mortgage affordability is a different question",
        paragraphs: [
          "Upfront cash answers whether the buyer can fund the purchase and move. Mortgage affordability concerns income, committed spending, lending policy and future repayments.",
          "Do not use an upfront-cost estimate as evidence that a mortgage is affordable or available."
        ]
      },
      {
        title: "How to turn the estimate into a working savings target",
        bullets: [
          "Set the deposit amount or percentage",
          "Choose the correct jurisdiction and buyer type",
          "Replace market estimates with quotations",
          "Include moving, insurance and furnishing only when relevant",
          "Choose a contingency deliberately"
        ]
      }
    ],
    faqs: [
      { question: "Is the deposit the same as total cash needed?", answer: "No. The deposit is only one line in total upfront cash." },
      { question: "Does total cash needed include mortgage repayments?", answer: "No. It covers upfront purchase and selected move-in costs, not ongoing mortgage repayments." },
      { question: "Can one UK-wide total apply to every buyer?", answer: "No. Jurisdiction, buyer type, property price and quotations change the result." }
    ]
  });
}

function firstTimeBuyer(guide: GuidePageContent): GuidePageContent {
  const prices = [200_000, 300_000, 400_000, 500_000];
  const taxRows = prices.flatMap((price) => [
    [formatCurrency(price), "England / Northern Ireland", formatCurrency(calculatePropertyTax(price, "england", "first-time-buyer"))],
    [formatCurrency(price), "Scotland", formatCurrency(calculatePropertyTax(price, "scotland", "first-time-buyer"))],
    [formatCurrency(price), "Wales", formatCurrency(calculatePropertyTax(price, "wales", "first-time-buyer"))]
  ]);
  const example = calculateUpfrontCosts(baseInput({ buyerType: "first-time-buyer" }));

  return reviewedGuide(guide, {
    intro: "First-time buyer costs include more than the deposit. Tax relief differs across the UK, while solicitor/conveyancing, searches, surveys, mortgage fees, registration and move-in costs still need their own budget.",
    directAnswer: `In the worked England example at ${formatCurrency(example.propertyPrice)}, a 10% deposit and average assumptions produce total upfront cash of ${formatCurrency(example.totalUpfrontCash)}. This is not a UK-wide first-time buyer total: Scotland and Wales use different tax rules.`,
    introSections: [],
    atGlance: [
      { label: "England and Northern Ireland", value: "SDLT first-time buyer relief may apply" },
      { label: "Scotland", value: "LBTT first-time buyer relief uses Scottish rules" },
      { label: "Wales", value: "LTT has no separate first-time buyer rate in the calculator" },
      { label: "Non-tax costs", value: "Use the same central market assumptions as every other buyer guide" }
    ],
    sections: [
      {
        title: "First-time buyer property-tax examples by jurisdiction",
        paragraphs: ["These results come from the production tax functions and are not manual threshold estimates."],
        table: {
          caption: "Current first-time buyer property-tax examples",
          columns: ["Property price", "Jurisdiction", "Calculated property tax"],
          rows: taxRows
        }
      },
      {
        title: "Worked England first-time buyer example",
        paragraphs: [
          "Scenario: £300,000 property, England, first-time buyer, 10% deposit, average assumptions, moving and insurance included, furnishing excluded and 10% contingency."
        ],
        table: {
          caption: "Calculator-derived first-time buyer breakdown",
          columns: ["Cost", "Amount", "Treatment"],
          rows: example.breakdown.map((line) => [line.label, formatCurrency(line.value), line.classification.replaceAll("-", " ")])
        }
      },
      {
        title: "Costs that relief does not remove",
        bullets: ["Solicitor/conveyancing", "Search fees", "Survey and valuation", "Mortgage fees", "Registration", "Bank transfer fee", "Selected moving, insurance, furnishing and contingency"]
      },
      {
        title: "Before relying on first-time buyer treatment",
        paragraphs: [
          "Eligibility depends on the official rules and the circumstances of every buyer in the transaction. Confirm relief with the solicitor handling the purchase.",
          "Do not apply an England example to Scotland or Wales."
        ]
      }
    ],
    faqs: [
      { question: "Do first-time buyers pay the same property tax across the UK?", answer: "No. SDLT, LBTT and LTT have different rules and relief structures." },
      { question: "Does tax relief remove legal and survey costs?", answer: "No. Those market-estimate costs still apply where required." },
      { question: "Are all mortgage fees compulsory?", answer: "No. Charges depend on the product, lender and broker arrangements." }
    ]
  });
}

function singleCategoryGuide(
  guide: GuidePageContent,
  category: "mortgage-fees" | "moving" | "insurance" | "furnishing"
): GuidePageContent {
  const idByCategory = { "mortgage-fees": "mortgage-fees", moving: "moving", insurance: "insurance", furnishing: "furnishing" } as const;
  const labelByCategory = { "mortgage-fees": "Mortgage fees", moving: "Moving costs", insurance: "Insurance", furnishing: "Furnishing and setup" } as const;
  const key = idByCategory[category];
  const low = calculateUpfrontCosts(baseInput({ assumptionLevel: "low", includeFurnishing: true }));
  const average = calculateUpfrontCosts(baseInput({ assumptionLevel: "average", includeFurnishing: true }));
  const high = calculateUpfrontCosts(baseInput({ assumptionLevel: "high", includeFurnishing: true }));
  const getLine = (result: typeof low) => result.breakdown.find((line) => line.key === category)?.value ?? 0;
  const range = `${formatCurrency(getLine(low))} to ${formatCurrency(getLine(high))}`;
  const label = labelByCategory[category];
  const isOptional = category !== "mortgage-fees";
  const categoryNotes = {
    "mortgage-fees": "Arrangement, booking, broker and valuation-related charges are product-dependent. A buyer does not necessarily pay every possible charge, and mortgage fees are market estimates rather than official charges.",
    moving: "Moving costs cover removals, van hire, packing or storage where selected. They do not include insurance or furnishing and setup.",
    insurance: "Insurance is a separate optional planning allowance. The quote depends on the property, cover and risk information; it is not part of moving costs.",
    furnishing: "Furnishing and setup is an optional allowance for furniture, appliances and initial household setup. It is kept separate from moving and insurance."
  } as const;

  return reviewedGuide(guide, {
    intro: `${label} use the same central assumptions as the calculator. ${categoryNotes[category]}`,
    directAnswer: `For a £300,000 England home-mover example, the central low-to-high ${label.toLowerCase()} range is ${range}, with an average planning amount of ${formatCurrency(getLine(average))}. It is ${isOptional ? "an optional allowance" : "a market estimate that may be zero or replaced with a quotation"}.`,
    introSections: [],
    atGlance: [
      { label: "Central example range", value: `${range} at £300,000 using low-to-high assumptions` },
      { label: "Average planning amount", value: formatCurrency(getLine(average)) },
      { label: "Classification", value: isOptional ? "Optional allowance" : "Market estimate or user-entered amount" },
      { label: "User override", value: "Replace the planning amount with a current quotation" }
    ],
    sections: [
      {
        title: `What ${label.toLowerCase()} include`,
        paragraphs: [categoryNotes[category]],
        table: {
          caption: `${label} by calculator assumption level for a £300,000 England example`,
          columns: ["Assumption level", "Amount", "Classification"],
          rows: [
            ["Low", formatCurrency(getLine(low)), isOptional ? "Optional allowance" : "Market estimate"],
            ["Average", formatCurrency(getLine(average)), isOptional ? "Optional allowance" : "Market estimate"],
            ["High", formatCurrency(getLine(high)), isOptional ? "Optional allowance" : "Market estimate"]
          ]
        }
      },
      {
        title: "What can change the quotation",
        paragraphs: [
          category === "moving"
            ? "Distance, property size, access, packing, storage and timing can all change the quote. Van hire and a full removal service are different scenarios."
            : category === "mortgage-fees"
              ? "The lender, product, loan size, broker arrangement, valuation policy and whether a fee is added to the loan can all change the upfront cash line."
              : category === "insurance"
                ? "Rebuild cost, location, construction, claims history, excess and selected cover affect the premium."
                : "Household size, existing possessions, chosen quality, delivery and whether appliances are included affect the allowance."
        ]
      },
      {
        title: "How to use a real quote",
        paragraphs: ["Enter the quotation in the calculator as a user-entered amount. Keep other categories separate so one quote does not overwrite unrelated costs."]
      },
      {
        title: "How this category fits total upfront cash",
        paragraphs: [costScopeDefinitions["total-upfront-cash"], "Switch optional costs off when they do not apply, but do not silently fold them into another label."]
      }
    ],
    faqs: [
      { question: `Is every buyer required to pay ${label.toLowerCase()}?`, answer: isOptional ? "No. It is optional and should be included only when relevant." : "No. Mortgage charges depend on the product and provider." },
      { question: "Is the planning range an official tariff?", answer: "No. It is a market estimate and should be replaced with a current quotation." },
      { question: "Can I enter my own amount?", answer: "Yes. The calculator supports a user-entered override for this category." }
    ]
  });
}

function taxGuide(guide: GuidePageContent): GuidePageContent {
  const prices = [125_000, 200_000, 300_000, 400_000, 500_000, 750_000];
  const rows = prices.flatMap((price) => [
    [formatCurrency(price), "England / Northern Ireland home mover", formatCurrency(calculatePropertyTax(price, "england", "home-mover")), "SDLT"],
    [formatCurrency(price), "Scotland home mover", formatCurrency(calculatePropertyTax(price, "scotland", "home-mover")), "LBTT"],
    [formatCurrency(price), "Wales home mover", formatCurrency(calculatePropertyTax(price, "wales", "home-mover")), "LTT"]
  ]);
  const registrationLink = guide.slug === "stamp-duty-explained"
    ? { href: "/land-registry-fees-uk", label: "Land Registry and registration fees" }
    : { href: "/land-registry-fees-uk", label: "UK registration fees by jurisdiction" };

  return reviewedGuide(guide, {
    contextualLinks: [
      ...(guide.contextualLinks ?? []).filter((link) => link.href !== registrationLink.href),
      registrationLink
    ],
    intro: "UK property tax depends on jurisdiction and buyer type. England and Northern Ireland use SDLT, Scotland uses LBTT and Wales uses LTT; the production calculator applies the appropriate shared rule set.",
    directAnswer: "There is no single UK stamp-duty table. Use SDLT for England and Northern Ireland, LBTT for Scotland and LTT for Wales, then apply the relevant first-time buyer or additional-property treatment.",
    introSections: [],
    atGlance: [
      { label: "England", value: "Stamp Duty Land Tax (SDLT)" },
      { label: "Northern Ireland", value: "Stamp Duty Land Tax (SDLT); registration is handled by LPS, not HMLR" },
      { label: "Scotland", value: "Land and Buildings Transaction Tax (LBTT)" },
      { label: "Wales", value: "Land Transaction Tax (LTT)" }
    ],
    sections: [
      {
        title: "Calculator-derived property-tax examples",
        paragraphs: ["The table is generated by the same tax functions used in the homepage calculator."],
        table: {
          caption: "Current owner-occupier property-tax examples by jurisdiction",
          columns: ["Price", "Scenario", "Calculated tax", "Tax name"],
          rows
        }
      },
      {
        title: "First-time buyer and additional-property treatment",
        paragraphs: [
          "Relief and supplements are jurisdiction-specific. England and Northern Ireland, Scotland and Wales do not share one first-time buyer rule or one additional-property calculation.",
          "The calculator asks for buyer type so it can select the relevant rule set; eligibility should still be confirmed for the actual transaction."
        ]
      },
      {
        title: "Registration is a separate charge",
        paragraphs: [
          "Property tax and registration are different cost categories. HM Land Registry applies to England and Wales, Registers of Scotland provides the Scottish disposition fee, and Land & Property Services handles Northern Ireland's Land Registry and Registry of Deeds systems.",
          "Northern Ireland is never described as an HM Land Registry charge; its registration systems are administered by Land & Property Services."
        ]
      },
      {
        title: "How official rules are reviewed",
        paragraphs: [
          `Official rules and fee tables were checked on 19 July 2026. Calculator data version ${calculatorMetadata.dataVersion} records the Scottish registration correction and sitewide derivation work.`,
          "Check the linked authority before exchange if a tax or registration result is material."
        ]
      }
    ],
    officialSourceKeys: ["sdlt", "lbtt", "lbttAds", "ltt", "hmlr", "ros", "lpsNi"],
    sourceKeys: ["sdlt", "lbtt", "lbttAds", "ltt", "hmlr", "ros", "lpsNi"],
    faqs: [
      { question: "Does Scotland use SDLT?", answer: "No. Scotland uses LBTT." },
      { question: "Does Wales use SDLT?", answer: "No. Wales uses LTT." },
      { question: "Does HM Land Registry administer Northern Ireland registration?", answer: "No. Northern Ireland uses Land & Property Services and its separate registers." }
    ]
  });
}

function firstYear(guide: GuidePageContent): GuidePageContent {
  const completion = calculateUpfrontCosts(baseInput());
  return reviewedGuide(guide, {
    intro: "First-year costs should be separated into purchase-completion costs, moving and setup costs, ongoing homeownership costs and optional improvements. Combining them into one headline number hides what is one-off, optional or recurring.",
    directAnswer: `In the calculator-derived £300,000 England home-mover example, total upfront cash is ${formatCurrency(completion.totalUpfrontCash)} under the stated settings. Ongoing mortgage payments, council tax, utilities, maintenance and improvements are not included in that upfront total and need separate household-specific estimates.`,
    introSections: [],
    atGlance: [
      { label: "Purchase completion", value: "Deposit, tax and core transaction costs" },
      { label: "Moving and setup", value: "Moving, insurance and optional furnishing remain separate" },
      { label: "Ongoing ownership", value: "Mortgage, council tax, utilities, maintenance and service charges where relevant" },
      { label: "Optional improvements", value: "Separate project budget, not a purchase-completion cost" }
    ],
    sections: [
      {
        title: "Four first-year cost scopes",
        table: {
          caption: "How to separate first-year home costs",
          columns: ["Scope", "Examples", "Calculator treatment"],
          rows: [
            ["Purchase completion", "Deposit, property tax, legal, searches, survey, mortgage and registration", "Included in upfront cash"],
            ["Moving and setup", "Moving, insurance and furnishing", "Separate selectable allowances"],
            ["Ongoing ownership", "Mortgage repayments, council tax, utilities, maintenance and service charges", "Not included in upfront buying-cost total"],
            ["Optional improvements", "Decoration, renovation and upgrades", "Not included; budget separately"]
          ]
        }
      },
      {
        title: "Calculator-derived completion example",
        paragraphs: ["Scenario: £300,000, England, home mover, 10% deposit, average assumptions, moving and insurance included, furnishing excluded and 10% contingency."],
        table: {
          caption: "Upfront cash before ongoing ownership bills",
          columns: ["Measure", "Amount", "Scope"],
          rows: [
            ["Deposit", formatCurrency(completion.depositAmount), "User-entered"],
            ["Property tax", formatCurrency(completion.propertyTaxAmount), "Official calculation"],
            ["Total upfront cash", formatCurrency(completion.totalUpfrontCash), "Purchase and selected move-in costs"]
          ]
        }
      },
      {
        title: "Build ongoing ownership costs from evidence",
        paragraphs: ["Use the mortgage illustration, council tax band, utility information, insurance quotation and property-specific maintenance needs. A universal fixed total would be misleading."],
      },
      {
        title: "Keep improvements optional",
        paragraphs: ["Decoration and renovation can be important, but they are not completion charges. Keep them in a separate project budget so the buying-cost total stays comparable."]
      }
    ],
    faqs: [
      { question: "Does the upfront calculator include mortgage repayments?", answer: "No. It covers upfront purchase and selected move-in costs." },
      { question: "Are furnishing and moving one cost?", answer: "No. They are separate categories." },
      { question: "Should renovations be included in buying costs?", answer: "Treat optional improvements as a separate project budget." }
    ]
  });
}

export function applyGuideConsistency(guide: GuidePageContent): GuidePageContent {
  if (!centralGuideSlugs.has(guide.slug)) return addRecoveryBacklinks(guide);
  if (guide.slug === "hidden-costs-buying-house") return addRecoveryBacklinks(hiddenCosts(guide));
  if (guide.slug === "how-much-money-needed-buy-house") return addRecoveryBacklinks(cashNeeded(guide));
  if (guide.slug === "first-time-buyer-costs") return addRecoveryBacklinks(firstTimeBuyer(guide));
  if (guide.slug === "mortgage-fees-costs") return addRecoveryBacklinks(singleCategoryGuide(guide, "mortgage-fees"));
  if (guide.slug === "moving-costs-uk") return addRecoveryBacklinks(singleCategoryGuide(guide, "moving"));
  if (guide.slug === "insurance-costs-uk") return addRecoveryBacklinks(singleCategoryGuide(guide, "insurance"));
  if (guide.slug === "furnishing-costs-uk") return addRecoveryBacklinks(singleCategoryGuide(guide, "furnishing"));
  if (guide.slug === "first-year-cost-buying-house-uk") return addRecoveryBacklinks(firstYear(guide));
  return addRecoveryBacklinks(taxGuide(guide));
}
