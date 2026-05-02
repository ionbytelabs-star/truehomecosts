import { calculateUpfrontCosts, type CalculatorInput } from "@/lib/calculator";
import { formatCurrency } from "@/lib/format";
import { buyerTypeLabels, jurisdictionLabels } from "@/lib/site";
import type { SourceKey } from "@/lib/source-links";

import type { AtGlanceItem, FAQItem, GuidePageContent, GuideSection } from "./types";

type TableRow = [string, string, string];

const breakdownTypeLabels: Record<string, string> = {
  deposit: "Buyer cash contribution",
  "property-tax": "Official charge",
  solicitors: "Solicitor / conveyancing estimate",
  searches: "Solicitor / conveyancing estimate",
  survey: "Market estimate",
  "mortgage-fees": "Lender charge",
  "land-registry": "Official charge",
  "telegraphic-transfer": "Solicitor / conveyancing estimate",
  moving: "Optional cost",
  insurance: "Optional cost",
  furnishing: "Optional cost",
  contingency: "Situation-dependent cost"
};

type LongGuideConfig = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  intro: string;
  directAnswer: string;
  introSections?: GuideSection[];
  contextualLinks?: Array<{
    href: string;
    label: string;
  }>;
  trustReviewedText?: string;
  updatedLabel?: string;
  atGlance?: AtGlanceItem[];
  sections: GuideSection[];
  faqs: FAQItem[];
  relatedGuides: string[];
  sourceKeys: SourceKey[];
  ctaTitle: string;
  ctaText: string;
  topicLabel: string;
  buyerContext: string;
  costDrivers: string[];
  paymentRows: TableRow[];
  comparisonCaption: string;
  comparisonRows: TableRow[];
  workedExampleCaption: string;
  workedExampleRows: TableRow[];
  officialItems: string[];
  estimateItems: string[];
  estimateMethodNote?: string;
  mistakes: string[];
  checklist: string[];
};

function sentenceList(items: string[]): string {
  if (items.length === 0) {
    return "";
  }

  if (items.length === 1) {
    return items[0];
  }

  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function describeTable(sectionTitle: string, columns: string[], topicLabel: string, caption?: string): string {
  const title = sectionTitle.toLowerCase();

  if (title.includes("when do") || title.includes("timing")) {
    return `The table below shows when ${topicLabel} usually becomes payable, which costs tend to appear at each stage, and why the timing matters for cash planning.`;
  }

  if (title.includes("worked examples") || title.includes("examples")) {
    return `The table below gives worked examples so buyers can compare likely outcomes, not just read the cost categories in isolation.`;
  }

  if (title.includes("buyer type") || title.includes("location") || title.includes("comparison")) {
    return `The table below compares how ${topicLabel} can shift across different buyer, property or location scenarios, so the differences are easier to scan.`;
  }

  if (columns.some((column) => /deposit/i.test(column))) {
    return `The table below compares deposit levels and related planning notes so buyers can see how different deposit choices affect the upfront cash target.`;
  }

  if (columns.some((column) => /rate|band/i.test(column))) {
    return `The table below lists the relevant official bands and rates for this topic, so the published charge can be checked more easily.`;
  }

  if (columns.some((column) => /fee|fees|cost|amount|cash|tax|price/i.test(column))) {
    return `The table below summarises the main costs for ${topicLabel}, showing how the figures or ranges are grouped and what each line is there to explain.`;
  }

  if (caption) {
    return `The table below shows ${caption.charAt(0).toLowerCase()}${caption.slice(1)} so the key figures can be read row by row.`;
  }

  return `The table below organises the key information for ${topicLabel} into rows and columns so it is easier to compare.`;
}

function addTableSummaries(sections: GuideSection[], topicLabel: string): GuideSection[] {
  return sections.map((section) => {
    if (!section.table) {
      return section;
    }

    return {
      ...section,
      table: {
        ...section.table,
        summary:
          section.table.summary ??
          describeTable(section.title, section.table.columns, topicLabel, section.table.caption)
      }
    };
  });
}

function generatedLongSections(config: LongGuideConfig): GuideSection[] {
  return [
    {
      title: `What shifts ${config.topicLabel} most?`,
      paragraphs: [
        `Two buyers can look at a similar property and still end up with noticeably different totals. On this part of the budget, the main pressure points are usually ${sentenceList(
          config.costDrivers
        )}. A straightforward freehold purchase is often easier to cost than an older home, a leasehold flat, an additional property or a purchase where the solicitor, lender or surveyor uncovers extra work.`,
        `That is why headline averages only get you so far. They are useful for early planning, but they are not a promise. If you budget only for the cheapest version of the total, even a modest change in one or two lines can leave the whole purchase feeling tighter than it should.`,
        `A steadier approach is to split the budget into firm charges and softer estimate-led items. Lock in the official costs first, then stress-test the more variable lines at low, average and high levels so you can see whether the purchase still feels manageable once real quotes start arriving.`
      ],
      bullets: config.costDrivers
    },
    {
      title: "When does the money usually leave your account?",
      paragraphs: [
        `Timing matters just as much as the final total. Buyers often focus on the number they will need on completion day, but many costs are triggered earlier in the process. That matters because money spent before exchange may still be gone if the chain breaks or the survey reveals something serious enough to make you walk away.`,
        `Some charges show up as early as the mortgage application stage, some appear while your solicitor is carrying out checks, and the largest cash call often lands shortly before exchange or completion. Knowing that sequence helps you avoid a common mistake: having enough savings overall, but not having the right amount accessible at the right time.`,
        `The safest habit is to keep a live running total as the transaction moves on. Treat each new quote, survey recommendation, lender charge or legal update as part of the same buying budget rather than as a separate inconvenience. Buyers who do that tend to feel far less rushed when the final statement lands.`
      ],
      table: {
        caption: `Typical timing points for ${config.topicLabel}`,
        columns: ["Stage", "Costs that may show up", "Why buyers should care"],
        rows: config.paymentRows
      }
    },
    {
      title: "How do buyer type, property and location change the picture?",
      paragraphs: [
        `${config.buyerContext} can change the numbers more than people expect. A first-time buyer may get relief on tax or have less to move, but may also need more help with surveys, furnishing and mortgage setup. A home mover may own the basics already, yet still face chain pressure, removals and overlap costs.`,
        `The property itself matters just as much. Older homes, leasehold flats, unusual construction, new-build purchases and second homes all bring different levels of legal, survey and insurance complexity. That is often where a tidy-looking budget starts to drift.`,
        `Location then changes the official side of the picture. England and Northern Ireland, Scotland and Wales do not use the same property tax rules, and some fee patterns can vary too. Buyers should treat location as a core part of the calculation rather than a detail to check at the end.`
      ],
      table: {
        caption: config.comparisonCaption,
        columns: ["Scenario", "Why the total changes", "Budgeting impact"],
        rows: config.comparisonRows
      }
    },
    {
      title: "Worked examples: what do they show in practice?",
      paragraphs: [
        `Worked examples are useful because they turn abstract cost categories into a number you can compare with your own savings position. They are not a substitute for your solicitor's completion statement, but they do show how quickly smaller lines can add up once deposit, tax, legal work, searches, surveys and practical extras are considered together.`,
        `The exact figures on your purchase will move with the quotes you receive, the nation you are buying in, and whether the property is a straightforward freehold purchase or something more complex. Even so, benchmarking against realistic examples is one of the quickest ways to see whether your plan is broadly on track or undercooked.`,
        `If your own numbers look lower than every realistic example you can find, that is often a sign that something has been missed rather than a sign that your purchase is uniquely cheap.`
      ],
      table: {
        summary:
          "The table below gives example scenarios so buyers can compare realistic outcomes and see how the same topic can feel very different across price points and property types.",
        caption: config.workedExampleCaption,
        columns: ["Example", "Likely outcome", "What to notice"],
        rows: config.workedExampleRows
      }
    },
    {
      title: "Which figures are official and which are working estimates?",
      paragraphs: [
        `A strong home-buying budget draws a line between official published charges and market-based estimates. Official figures are usually the easiest to sense-check because they come from published tax bands or fee scales. Estimate-based lines are still essential, but they require more caution because they depend on the property, the provider and the timing of the transaction.`,
        `For this topic, the official or near-official side includes ${sentenceList(
          config.officialItems
        )}. Those are the lines buyers should cross-check directly against the relevant authority or current solicitor paperwork before relying on the result.`,
        config.estimateMethodNote ??
          `The estimate-based side includes ${sentenceList(
            config.estimateItems
          )}. Those numbers are still useful for planning, especially early in the process, but they should be treated as ranges. That is why TrueHomeCosts separates official-rate logic from editable assumption data in the codebase and clearly labels estimate lines in the calculator output.`
      ],
      bullets: [
        `Official or published-reference items: ${sentenceList(config.officialItems)}`,
        `Estimate-led items: ${sentenceList(config.estimateItems)}`,
        "Best practice: lock in official figures, then pressure-test estimate-based costs at more than one level"
      ]
    },
    {
      title: "What do buyers most often get wrong here?",
      paragraphs: [
        `The usual problem is not that buyers have never heard of ${config.topicLabel}. It is that they budget for the neatest version of it. People often pick the lowest online quote they can find, assume it will apply to their purchase, and then treat every higher figure as an unpleasant surprise rather than ordinary variation.`,
        `Another common slip is putting all the focus on the deposit and treating the surrounding costs as small change. In practice, buyers who reach their deposit target but leave no room for the rest of the process can still feel short of cash just when the purchase becomes serious.`,
        `A safer plan leaves room for ordinary friction. If the survey needs to be upgraded, the solicitor uncovers an extra issue, the lender charges a product fee or the move costs more than expected, the budget should still hold together.`
      ],
      bullets: config.mistakes
    },
    {
      title: "How can you budget with more breathing room?",
      paragraphs: [
        `A good rule is to hold separate pots for deposit, transaction costs, and move-in resilience. That makes it far easier to see whether your buying budget really works. It also stops you from treating every available pound as exchange money when some of it is needed for searches, surveys, legal work or immediate setup costs.`,
        `It is also worth running the same purchase through more than one scenario. Use a lower-cost planning case to understand the best realistic outcome, an average case for day-to-day planning, and a higher-cost case to see how exposed you would be if the property or transaction proves less straightforward than expected.`,
        `If the purchase only works on the cheapest possible assumptions, that is a warning sign. A budget should survive ordinary variation, not just ideal conditions.`
      ],
      bullets: [
        "Keep the deposit and fee pot separate",
        "Check when each cost is likely to become payable",
        "Assume at least one or two lines will come in above the cheapest online estimate",
        "Leave yourself breathing room after completion for the first month in the property"
      ]
    },
    {
      title: "How should you use this page with the homepage calculator?",
      paragraphs: [
        `This page is designed to explain the moving parts in plain English. The calculator on the homepage is there to turn those moving parts into a quick headline number. Used together, they give you both the overview and the detail: the calculator shows the total, while the guide helps you understand why the total changes.`,
        `A sensible way to use the tool is to start with your likely purchase price, choose the right nation and buyer type, and then switch the assumption level between low, average and high. After that, turn optional items such as moving, insurance or furnishing on and off so you can see the difference between a bare-minimum legal budget and a more realistic move-in budget.`,
        `Once real quotes begin arriving, compare them with the planning number rather than replacing the planning number entirely. The aim is not to trust the first estimate forever; it is to use the estimate to stop obvious blind spots before the transaction picks up speed.`
      ]
    },
    {
      title: "What should you check before you rely on the number?",
      paragraphs: [
        `Before exchange or any major commitment, buyers should move from generic planning into evidence-based checking. That means confirming the official charges, reading the solicitor's completion statement carefully, and making sure the timing of each payment still matches the cash you actually have available.`,
        `It also means treating this page as an informational guide, not as a substitute for transaction-specific professional advice. The closer you get to exchange and completion, the more the exact property and the exact paperwork matter.`
      ],
      bullets: config.checklist
    }
  ];
}

function buildAtGlance(config: LongGuideConfig): AtGlanceItem[] {
  if (config.atGlance) {
    return config.atGlance;
  }

  const workedExample = config.workedExampleRows[0]?.[1] ?? "Varies by price, property and buyer type";

  return [
    {
      label: "Typical cost range",
      value: workedExample
    },
    {
      label: "Usually applies when",
      value: config.buyerContext
    },
    {
      label: "Status",
      value: `Official items include ${sentenceList(config.officialItems)}. Estimate-led items include ${sentenceList(config.estimateItems)}.`
    },
    {
      label: "Buyers should check",
      value: sentenceList(config.checklist.slice(0, 2))
    }
  ];
}

function generatedFaqs(config: LongGuideConfig): FAQItem[] {
  return [
    {
      question: `What should buyers usually include when budgeting for ${config.topicLabel}?`,
      answer: `Buyers should usually include ${sentenceList(
        config.estimateItems
      )} as well as any official-rate items that apply. The safer approach is to cost the whole chain of expenses rather than relying on one headline figure or the cheapest online quote.`
    },
    {
      question: "When does this usually become a real cash cost rather than a planning number?",
      answer: `Some of these costs can start appearing soon after an offer is accepted, while the biggest cash demand usually arrives nearer exchange or completion. That timing matters because early spending can still be lost if the transaction falls through.`
    },
    {
      question: "How can buyers sense-check the figure before relying on it?",
      answer: `Start by cross-checking the official side of the budget, such as ${sentenceList(
        config.officialItems
      )}, then compare the softer lines with real quotes and current paperwork. ${config.checklist[0]}. ${config.checklist[1]}.`
    }
  ];
}

export function createLongGuide(config: LongGuideConfig): GuidePageContent {
  const mergedFaqs = [...config.faqs, ...generatedFaqs(config)].filter(
    (faq, index, array) => array.findIndex((entry) => entry.question === faq.question) === index
  );

  return {
    slug: config.slug,
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    h1: config.h1,
    intro: config.intro,
    directAnswer: config.directAnswer,
    introSections: config.introSections,
    contextualLinks: config.contextualLinks,
    trustReviewedText: config.trustReviewedText,
    updatedLabel: config.updatedLabel ?? "Updated for 2026",
    atGlance: buildAtGlance(config),
    sections: addTableSummaries([...config.sections, ...generatedLongSections(config)], config.topicLabel),
    faqs: mergedFaqs,
    relatedGuides: config.relatedGuides,
    sourceKeys: config.sourceKeys,
    ctaTitle: config.ctaTitle,
    ctaText: config.ctaText,
    officialItems: config.officialItems,
    estimateItems: config.estimateItems,
    mistakes: config.mistakes,
    checklist: config.checklist
  };
}

function scenarioResult(input: CalculatorInput) {
  return calculateUpfrontCosts(input);
}

type PriceGuideProfile = {
  intro: string;
  overview: string[];
  forgotten: string[];
  firstTimeBuyer: string[];
  mover: string[];
  ctaText: string;
  buyerContext: string;
  costDrivers: string[];
};

const priceGuideProfiles: Record<number, PriceGuideProfile> = {
  250_000: {
    intro:
      "A £250,000 purchase often sits in entry-level territory for many UK buyers, so the balance between keeping the deposit achievable and avoiding nasty fee surprises matters more than ever.",
    overview: [
      "At £250,000, buyers are often trying to stretch into a first purchase without draining every available pound. That makes the non-deposit costs especially important. A few thousand pounds of extra fees can make the difference between feeling prepared and feeling exposed halfway through the conveyancing process.",
      "This is also a price point where first-time buyer relief, lighter moving plans and careful furnishing choices can genuinely help. Even so, solicitor fees, searches, surveys and lender-related costs still need to be budgeted from day one."
    ],
    forgotten: [
      "At this level, buyers often focus so hard on the deposit that they underestimate the costs that arrive between offer accepted and move-in. Search fees, survey choice, telegraphic transfer fees and the first wave of moving-day spending are the usual culprits.",
      "It is also common for entry-level buyers to overlook what happens in the first month after completion. A small buffer for locks, cleaning, basic furniture gaps and the first direct debits can be just as important as the legal fees themselves."
    ],
    firstTimeBuyer: [
      "This price point is often closely tied to first-time buyer searches because the deposit can still feel achievable. A 5% deposit is £12,500, a 10% deposit is £25,000, and the non-deposit costs still need their own savings pot.",
      "Where first-time buyer relief applies, it can reduce the tax pressure, but it does not remove the rest of the transaction bill. Buyers should still plan for legal work, searches, survey costs and a realistic move-in buffer."
    ],
    mover: [
      "Home movers at £250,000 can sometimes carry less furnishing pressure because they already own the basics, but tax and legal costs still apply in the normal way. The transaction should still be planned as a full cash exercise rather than a simple deposit swap.",
      "Additional-property buyers need to be much more careful. Even at this price point, higher-rate tax treatment and larger deposit expectations can make the all-in cash need look very different from the standard first-time buyer case."
    ],
    ctaText:
      "Use the calculator to compare a lean first-time buyer setup with a more realistic mover or additional-property budget at the same £250,000 price point.",
    buyerContext: "Entry-level purchase planning, first-time buyer relief, and lower-deposit scenarios",
    costDrivers: [
      "deposit size",
      "whether first-time buyer relief applies",
      "survey choice",
      "search and legal fees",
      "moving-day setup costs"
    ]
  },
  300_000: {
    intro:
      "A £300,000 purchase is a common planning point for both first-time buyers and home movers, which makes it a useful benchmark for total savings targets rather than deposit-only thinking.",
    overview: [
      "At £300,000, the deposit already matters a lot, but the surrounding buying costs become too large to treat as an afterthought. This is exactly where many buyers realise that a neat deposit target is not the same as a complete buying budget.",
      "The practical question at this level is not just whether you can save the deposit. It is whether you can cover tax, legal work, searches, surveys, lender fees and a move-in buffer without the purchase feeling tight from day one."
    ],
    forgotten: [
      "Buyers at this price often forget that a straightforward-looking purchase can still absorb several thousand pounds beyond the deposit. Survey choice, mortgage fees, removals and a realistic contingency are where the budget often drifts.",
      "It is also a classic price point for chains, which means timing matters. Having enough cash overall is not always enough if the survey, search fees and legal payments arrive before you expected them to."
    ],
    firstTimeBuyer: [
      "For first-time buyers, £300,000 is often the point where the deposit target feels serious but still achievable. A 10% deposit is £30,000, yet the bigger planning risk is often the fee pot around it rather than the deposit itself.",
      "If relief applies, it can help with the tax line, but buyers should still plan for the full chain of non-deposit costs. That is why this price works well as a calculator test case for savings planning."
    ],
    mover: [
      "For home movers, £300,000 is a mainstream example of why total cash planning matters. Tax may be less generous than in the first-time buyer case, and moving logistics can add more than buyers expect once removals, overlap costs and setup are counted.",
      "Second-home buyers should assume a very different budget at this level. Higher-rate tax treatment and larger deposit expectations can lift the total far above the headline move-up example."
    ],
    ctaText:
      "Use the calculator to compare how a £300,000 purchase changes for a first-time buyer, a home mover and an additional-property buyer.",
    buyerContext: "Mainstream savings planning for first-time buyers and home movers",
    costDrivers: [
      "deposit percentage",
      "buyer type",
      "regional tax treatment",
      "survey depth",
      "moving costs"
    ]
  },
  350_000: {
    intro:
      "A £350,000 purchase often pushes buyers from starter-home budgeting into a more stretched middle-market calculation, where the buffer becomes just as important as the deposit itself.",
    overview: [
      "At £350,000, the deposit is substantial enough to dominate the conversation, yet the surrounding fees still rise in a way that can catch buyers out. That makes this a price point where total-cash discipline really matters.",
      "It is also a common family-home or move-up budget, so survey quality, removals, furnishing gaps and a stronger contingency start to matter more than they do on smaller purchases."
    ],
    forgotten: [
      "What buyers often miss here is not one single fee, but the cumulative effect of several medium-sized lines. A fuller survey, higher moving costs, a larger insurance allowance and family-home setup spending can all stack up quickly.",
      "This is also a level where buyers sometimes overcommit on the deposit and leave themselves too little flexibility for the practical side of moving."
    ],
    firstTimeBuyer: [
      "For first-time buyers, a £350,000 purchase can still work, but it usually needs a clearer savings plan. A 10% deposit is £35,000, and the extra buying costs still need a separate pot rather than being squeezed into whatever is left.",
      "If tax relief applies, it can soften the official charge, but it should not be mistaken for permission to ignore the rest of the transaction costs."
    ],
    mover: [
      "For movers, £350,000 often means a bigger home, a more involved move and a higher chance of overlapping practical costs. The move itself can become a meaningful part of the total rather than a small add-on.",
      "For second-home buyers, the same price can produce a noticeably heavier upfront total because both the tax and deposit expectations usually change."
    ],
    ctaText:
      "Use the calculator to test how much extra breathing room a stronger buffer gives you on a £350,000 purchase.",
    buyerContext: "Middle-market budgeting, family-home planning and stronger buffer needs",
    costDrivers: [
      "deposit size",
      "family-home moving costs",
      "survey quality",
      "regional tax differences",
      "insurance and setup allowances"
    ]
  },
  400_000: {
    intro:
      "A £400,000 purchase usually means a materially larger upfront cash need, which is why tax, survey quality and buffer planning start to matter much more than on smaller purchases.",
    overview: [
      "At £400,000, buyers are often looking at larger family homes or properties in higher-cost areas. That shifts the budget in two directions at once: the deposit rises sharply and the supporting costs become harder to wave away as minor extras.",
      "This is the sort of purchase where it helps to be honest about what a smoother, lower-risk transaction costs rather than modelling everything on the cheapest possible assumptions."
    ],
    forgotten: [
      "At this price, the big oversight is usually contingency. Buyers often allow for deposit, tax and basic legal work, but underplay the risk of a fuller survey, more expensive removals and the everyday setup costs of a larger home.",
      "The wider the property and the more belongings involved, the less sensible it becomes to treat moving and setup as a token allowance."
    ],
    firstTimeBuyer: [
      "A £400,000 first purchase is less common, but where it does happen it usually needs disciplined planning. A 10% deposit is £40,000, and the surrounding non-deposit costs can still be several thousand pounds on top of that.",
      "Relief may still help in some cases, but buyers should check the exact tax position rather than assuming the first-time buyer label automatically solves the tax question."
    ],
    mover: [
      "For movers, £400,000 is often where the tax and fee picture becomes noticeably heavier. A larger move, more survey diligence and the possibility of chain-related friction make the full cash target more important than the headline asking price.",
      "For additional-property buyers, this is a price where higher-rate tax treatment can change the budget decisively, not marginally."
    ],
    ctaText:
      "Use the calculator to compare a cautious £400,000 family-home budget with a leaner legal-only version of the same purchase.",
    buyerContext: "Larger family-home budgeting and higher-cost-area purchases",
    costDrivers: [
      "deposit percentage",
      "tax sensitivity",
      "survey depth",
      "moving complexity",
      "contingency size"
    ]
  },
  450_000: {
    intro:
      "A £450,000 purchase sits in a more tax-sensitive part of the market, so buyers need to watch not just the deposit but the effect of region, buyer type and survey quality on the final total.",
    overview: [
      "At £450,000, the official tax line becomes more noticeable and the margin for error shrinks. Buyers who were comfortable with a smaller purchase can be surprised by how quickly the all-in cash need grows here.",
      "This is also a level where it usually pays to spend properly on due diligence. Survey quality and legal caution matter more than shaving every estimate to the lowest possible number."
    ],
    forgotten: [
      "At this level, one of the easiest mistakes is underestimating how much a stronger survey, more involved legal work or a heavier move can add to the final bill. The purchase can still look manageable until all of those lines arrive together.",
      "It is also common for buyers to focus on the tax headline and miss the practical costs around it, especially if the property is older or the move is more complex."
    ],
    firstTimeBuyer: [
      "A £450,000 first purchase is already a serious savings exercise. A 10% deposit is £45,000, and buyers still need room for the non-deposit side of the purchase rather than treating it as a minor afterthought.",
      "Where any relief or special treatment applies, it should be checked carefully because this is a level where misunderstandings can become expensive."
    ],
    mover: [
      "For movers, £450,000 is often where tax sensitivity, survey quality and contingency planning all pull in the same direction. A cleaner budget is one that allows for a proper survey and a realistic moving plan rather than trying to force everything into the lowest estimate.",
      "Second-home or additional-property buyers should expect a more dramatic shift at this price, because the higher-rate tax position starts to carry more weight."
    ],
    ctaText:
      "Use the calculator to see how much the £450,000 total changes when you switch nation, buyer type and assumption level.",
    buyerContext: "Higher-budget purchase planning with stronger tax and survey sensitivity",
    costDrivers: [
      "regional tax treatment",
      "buyer type",
      "survey quality",
      "legal complexity",
      "contingency strength"
    ]
  },
  500_000: {
    intro:
      "A £500,000 purchase needs a serious upfront cash plan because the deposit is already large and the effect of tax differences, survey choices and second-home rules becomes much harder to ignore.",
    overview: [
      "At £500,000, buyers are no longer tweaking a modest budget. They are managing a sizeable cash commitment where a change in nation, buyer status or deposit level can shift the total by a meaningful amount.",
      "This is why a single rough estimate is rarely enough. A £500,000 purchase works best when buyers compare multiple scenarios before they commit to the property or assume the deposit is the main hurdle."
    ],
    forgotten: [
      "At this price, the most common oversight is how quickly the non-deposit side of the transaction scales up once tax, survey diligence, removals and contingency are all taken seriously.",
      "It is also the kind of purchase where second-home implications can completely change the planning number, so buyer type needs to be confirmed early rather than treated as a detail."
    ],
    firstTimeBuyer: [
      "A £500,000 first purchase is unusual for many households, but where it does happen the tax and fee planning needs to be precise. A 10% deposit is £50,000 and a 20% deposit is £100,000, so the transaction already demands strong cash discipline before fees are added.",
      "Any relief or special treatment should be checked carefully because the stakes are much higher once the purchase price reaches this level."
    ],
    mover: [
      "For movers, £500,000 is a clear example of why the all-in cash number matters more than the headline price alone. Tax, survey quality and a larger moving operation all have room to shift the total in a meaningful way.",
      "For second-home buyers, this is usually the sharpest warning of all. Higher-rate tax treatment and larger deposit expectations can create a very different budget from the owner-occupier case."
    ],
    ctaText:
      "Use the calculator to compare mainstream owner-occupier planning with a second-home scenario on a £500,000 purchase.",
    buyerContext: "Upper mid-market purchases with significant upfront cash requirements",
    costDrivers: [
      "deposit size",
      "regional tax differences",
      "second-home treatment",
      "survey quality",
      "moving and contingency costs"
    ]
  }
};

export function createPriceGuide(price: number): GuidePageContent {
  const pricePoints = [250_000, 300_000, 350_000, 400_000, 450_000, 500_000];
  const currentIndex = pricePoints.indexOf(price);
  const slug = `cost-to-buy-${price / 1000}k-house`;
  const formattedPrice = formatCurrency(price);
  const keywords = [
    `cost to buy ${price / 1000}k house UK`,
    price === 300_000 ? "total cost buying 300k house UK" : `total cost buying ${price / 1000}k house UK`
  ];

  const englandFtb = scenarioResult({
    propertyPrice: price,
    jurisdiction: "england-ni",
    buyerType: "first-time-buyer",
    depositMode: "percentage",
    depositPercentage: 10,
    assumptionLevel: "average",
    includeMoving: true,
    includeFurnishing: false,
    includeInsurance: true
  });

  const englandMover = scenarioResult({
    propertyPrice: price,
    jurisdiction: "england-ni",
    buyerType: "home-mover",
    depositMode: "percentage",
    depositPercentage: 10,
    assumptionLevel: "average",
    includeMoving: true,
    includeFurnishing: false,
    includeInsurance: true
  });

  const scotlandMover = scenarioResult({
    propertyPrice: price,
    jurisdiction: "scotland",
    buyerType: "home-mover",
    depositMode: "percentage",
    depositPercentage: 10,
    assumptionLevel: "average",
    includeMoving: true,
    includeFurnishing: false,
    includeInsurance: true
  });

  const walesMover = scenarioResult({
    propertyPrice: price,
    jurisdiction: "wales",
    buyerType: "home-mover",
    depositMode: "percentage",
    depositPercentage: 10,
    assumptionLevel: "average",
    includeMoving: true,
    includeFurnishing: false,
    includeInsurance: true
  });

  const additionalProperty = scenarioResult({
    propertyPrice: price,
    jurisdiction: "england-ni",
    buyerType: "additional-property",
    depositMode: "percentage",
    depositPercentage: 25,
    assumptionLevel: "average",
    includeMoving: true,
    includeFurnishing: false,
    includeInsurance: true
  });

  const depositRows = [5, 10, 15, 20].map((percentage) => [
    `${percentage}% deposit`,
    formatCurrency(Math.round(price * (percentage / 100))),
    percentage === 5
      ? "Smaller cash deposit, but mortgage choice may be narrower"
      : percentage === 10
        ? "Common planning benchmark for mainstream budgeting"
        : percentage === 15
          ? "Can improve mortgage flexibility without exhausting every pound"
          : "Bigger deposit often reduces borrowing pressure and rate sensitivity"
  ]);

  const neighbouringPriceGuides = [
    pricePoints[currentIndex - 1],
    pricePoints[currentIndex + 1]
  ]
    .filter((value): value is number => typeof value === "number")
    .map((value) => `cost-to-buy-${value / 1000}k-house`);

  const profile = priceGuideProfiles[price];
  const ownerOccupierResults = [englandFtb, englandMover, scotlandMover, walesMover];
  const ownerOccupierExtras = ownerOccupierResults.map((result) => result.totalUpfrontCash - result.depositAmount);
  const extraMin = Math.min(...ownerOccupierExtras);
  const extraMax = Math.max(...ownerOccupierExtras);
  const fivePercentDeposit = formatCurrency(Math.round(price * 0.05));
  const tenPercentDeposit = formatCurrency(Math.round(price * 0.1));
  const fifteenPercentDeposit = formatCurrency(Math.round(price * 0.15));
  const twentyPercentDeposit = formatCurrency(Math.round(price * 0.2));
  const extraCostRows = englandMover.breakdown
    .filter((item) => item.key !== "deposit")
    .map((item) => [
      item.label,
      breakdownTypeLabels[item.key] ?? (item.sourceType === "official" ? "Official charge" : "Estimate"),
      formatCurrency(item.value),
      item.detail
    ]);

  if (price === 250_000) {
    return {
      slug,
      title: `Cost to Buy a ${price / 1000}k House in the UK`,
      description:
        "Estimate the cost to buy a £250,000 house in the UK, including deposit, property tax, legal fees, surveys, mortgage costs, moving costs and the extra cash buyers usually need.",
      keywords,
      h1: `Cost to buy a ${formattedPrice} house in the UK`,
      intro:
        "This page gives a quick £250,000 buying-cost estimate for buyers who want the deposit, extra fees and likely total cash target in one place.",
      directAnswer:
        "The total cost to buy a £250,000 house in the UK is the deposit plus all upfront costs needed to complete the purchase. A buyer using a 10% deposit would need around £25,000 for the deposit, plus several thousand pounds more for legal fees, surveys, mortgage costs, moving and setup.",
      introSections: [
        {
          title: "Typical cost breakdown for a £250,000 house",
          bullets: [
            "10% deposit: £25,000",
            "Stamp duty or property tax: £0–£2,500 depending on buyer type",
            "Legal fees: ~£800–£1,800",
            "Surveys: £300–£1,000+",
            "Mortgage fees: £0–£2,000+",
            "Moving and setup costs: £500–£2,000+"
          ],
          callout:
            "Deposit, property tax, legal fees, surveys, mortgage costs and moving and setup are the main lines buyers usually need to cover."
        },
        {
          title: "Typical total upfront cash needed",
          paragraphs: [
            "Typical total upfront cash needed for a £250,000 house:",
            "£28,000–£40,000+ depending on buyer type, location and assumptions.",
            "Most buyers should expect their deposit plus £3,000 to £10,000+ in additional upfront costs."
          ]
        },
        {
          title: "Why the total cost can vary",
          paragraphs: [
            "The total can change quickly because buyer type matters. A first-time buyer may pay little or no property tax at this price in some parts of the UK, while an additional-property buyer can face a much higher total.",
            "Tax differences between SDLT, LBTT and LTT also matter, so the same £250,000 price can behave differently in England and Northern Ireland, Scotland and Wales. On top of that, survey choice, property condition, mortgage fees and moving costs can all shift the final number by more than buyers expect.",
            "Use the true cost of buying a house calculator to personalise this estimate based on your deposit, buyer type and location."
          ]
        }
      ],
      contextualLinks: [
        { href: "/#calculator", label: "true cost of buying a house calculator" },
        { href: "/hidden-costs-buying-house", label: "hidden costs of buying a house" },
        { href: "/stamp-duty-explained", label: "stamp duty explained" },
        { href: "/mortgage-fees-costs", label: "mortgage fees and costs" },
        { href: "/moving-costs-uk", label: "moving costs in the UK" }
      ],
      contextualLinksSentence:
        "Use the true cost of buying a house calculator, review the hidden costs of buying a house, and check stamp duty explained, mortgage fees and costs, and moving costs in the UK to compare this estimate with your full buying budget.",
      trustReviewedText:
        "Updated for 2026 where the property tax rules and planning ranges on this £250,000 page have been reviewed for budgeting use.",
      updatedLabel: "Updated for 2026",
      atGlance: [
        {
          label: "Typical total upfront cash needed",
          value: "About £28,000 to £40,000+ on a £250,000 purchase, depending on deposit size, buyer type, tax treatment and moving assumptions."
        },
        {
          label: "Example 10% deposit",
          value: "A 10% deposit is £25,000 before legal fees, surveys, mortgage costs and moving are added."
        },
        {
          label: "Best fit",
          value: "Useful for first-time buyers, home movers and buyers comparing how a £250,000 budget changes across the UK."
        },
        {
          label: "Buyers should check",
          value: "Property tax treatment, survey scope, mortgage charges, moving costs and whether the property is simple or more complex."
        }
      ],
      sections: [],
      faqs: [
        {
          question: "How much deposit do I need for a £250,000 house?",
          answer:
            "A 10% deposit is £25,000, while a 5% deposit is £12,500 and a 20% deposit is £50,000. The right deposit depends on mortgage options and how much cash you still need to keep back for fees and buffer."
        },
        {
          question: "What are the extra costs beyond the deposit?",
          answer:
            "The extra costs usually include property tax where it applies, legal fees, surveys, mortgage charges, moving costs and setup spending. Buyers should treat those separately from the deposit rather than hoping they stay small."
        },
        {
          question: "Do first-time buyers pay stamp duty on £250,000?",
          answer:
            "Some first-time buyers may pay no SDLT at this price in England and Northern Ireland, but the answer depends on the nation and buyer status. It is still worth checking the property tax position because SDLT, LBTT and LTT do not use the same rules."
        },
        {
          question: "How much savings should I have in total?",
          answer:
            "A safer target is the deposit plus several thousand pounds more for the rest of the purchase. On a £250,000 house, many buyers will want roughly £28,000 to £40,000+ available depending on buyer type, location and assumptions."
        }
      ],
      relatedGuides: [
        "hidden-costs-buying-house",
        "stamp-duty-explained",
        "mortgage-fees-costs",
        "moving-costs-uk",
        "how-much-money-needed-buy-house"
      ],
      sourceKeys: ["sdlt", "lbtt", "lbttAds", "ltt", "hmlr"],
      ctaTitle: "Try your own £250,000 scenario",
      ctaText:
        "Use the calculator to test a £250,000 purchase with your own deposit, buyer type and location instead of relying on one fixed estimate.",
      officialItems: ["property tax for the relevant UK nation", "published registration fee scales where applicable"],
      estimateItems: ["legal fees", "surveys", "mortgage fees", "moving costs", "setup buffer"],
      mistakes: [
        "Using only the deposit as the target",
        "Assuming buyer type does not change the tax line",
        "Forgetting surveys, legal fees and moving costs",
        "Treating a planning estimate as if it were a fixed quote"
      ],
      checklist: [
        "Confirm the tax position for your nation and buyer type",
        "Check that the deposit still leaves room for fees and a buffer",
        "Sense-check survey, mortgage and moving assumptions",
        "Use the calculator again if the property or assumptions change"
      ]
    };
  }

  const streamlinedPricePageConfig: Record<
    number,
    {
      intro: string;
      taxRange: string;
      totalRange: string;
      extraRange: string;
      trustText: string;
      bestFit: string;
      varyParagraphs: string[];
    }
  > = {
    300_000: {
      intro:
        "This page gives a quick £300,000 buying-cost estimate for buyers who want the deposit, extra fees and likely total cash target in one place.",
      taxRange: "£0–£7,500 depending on buyer type",
      totalRange: "£34,000–£48,000+",
      extraRange: "£4,000 to £18,000+",
      trustText:
        "Updated for 2026 where the property tax rules and planning ranges on this £300,000 page have been reviewed for budgeting use.",
      bestFit:
        "Useful for first-time buyers, home movers and buyers comparing how a £300,000 budget changes across the UK.",
      varyParagraphs: [
        "At £300,000, the buyer type can swing the total more than many people expect. A first-time buyer may face a much lighter tax line than a home mover or additional-property buyer, so the same headline price can lead to a very different cash target.",
        "SDLT, LBTT and LTT also create different outcomes across the UK. Survey choice, property condition, mortgage fees and moving costs then add another layer, which is why a £300,000 purchase should be treated as a full budget exercise rather than a deposit-only target."
      ]
    },
    350_000: {
      intro:
        "This page gives a quick £350,000 buying-cost estimate for buyers who want the deposit, extra fees and likely total cash target in one place.",
      taxRange: "£0–£12,500 depending on buyer type",
      totalRange: "£39,000–£55,000+",
      extraRange: "£4,000 to £20,000+",
      trustText:
        "Updated for 2026 where the property tax rules and planning ranges on this £350,000 page have been reviewed for budgeting use.",
      bestFit:
        "Useful for first-time buyers, home movers and buyers comparing how a £350,000 budget changes across the UK.",
      varyParagraphs: [
        "At £350,000, the gap between a straightforward owner-occupier purchase and a more expensive version of the same move can widen quickly. First-time buyers, home movers and additional-property buyers can all land on noticeably different totals once tax treatment is taken into account.",
        "Regional tax differences between SDLT, LBTT and LTT matter here, but so do the practical choices. A fuller survey, a more worn property, mortgage fees and heavier moving costs can all push a £350,000 purchase beyond the neatest early estimate."
      ]
    },
    400_000: {
      intro:
        "This page gives a quick £400,000 buying-cost estimate for buyers who want the deposit, extra fees and likely total cash target in one place.",
      taxRange: "£0–£17,500 depending on buyer type",
      totalRange: "£45,000–£65,000+",
      extraRange: "£5,000 to £25,000+",
      trustText:
        "Updated for 2026 where the property tax rules and planning ranges on this £400,000 page have been reviewed for budgeting use.",
      bestFit:
        "Useful for first-time buyers, home movers and buyers comparing how a £400,000 budget changes across the UK.",
      varyParagraphs: [
        "At £400,000, the total can move more sharply because buyer type and tax treatment start to matter more in cash terms. A first-time buyer, home mover and additional-property buyer can all approach the same property price with very different upfront obligations.",
        "The nation you buy in still changes the official tax line through SDLT, LBTT or LTT, but surveys, property condition, mortgage fees and moving costs also become more meaningful at this level. That makes a realistic buffer more important than it was on a smaller purchase."
      ]
    },
    450_000: {
      intro:
        "This page gives a quick £450,000 buying-cost estimate for buyers who want the deposit, extra fees and likely total cash target in one place.",
      taxRange: "£0–£22,500 depending on buyer type",
      totalRange: "£51,000–£75,000+",
      extraRange: "£6,000 to £30,000+",
      trustText:
        "Updated for 2026 where the property tax rules and planning ranges on this £450,000 page have been reviewed for budgeting use.",
      bestFit:
        "Useful for first-time buyers, home movers and buyers comparing how a £450,000 budget changes across the UK.",
      varyParagraphs: [
        "At £450,000, the total is more sensitive to buyer type because the tax differences begin to carry real weight. A first-time buyer may still see a very different outcome from a home mover, while an additional-property purchase can look much heavier again.",
        "Differences between SDLT, LBTT and LTT are still central, but they are not the whole story. Survey choice, property condition, mortgage fees and moving costs can all push a £450,000 purchase higher than buyers expect if they budget only for the headline deposit."
      ]
    },
    500_000: {
      intro:
        "This page gives a quick £500,000 buying-cost estimate for buyers who want the deposit, extra fees and likely total cash target in one place.",
      taxRange: "£0–£30,000+ depending on buyer type",
      totalRange: "£58,000–£85,000+",
      extraRange: "£8,000 to £35,000+",
      trustText:
        "Updated for 2026 where the property tax rules and planning ranges on this £500,000 page have been reviewed for budgeting use.",
      bestFit:
        "Useful for first-time buyers, home movers and buyers comparing how a £500,000 budget changes across the UK.",
      varyParagraphs: [
        "At £500,000, buyer type can change the total dramatically because the tax stakes and deposit expectations are both much higher. A first-time buyer, home mover and additional-property buyer can all see very different upfront numbers even when the property price is identical.",
        "Regional tax differences between SDLT, LBTT and LTT remain important, but so do survey standards, property condition, mortgage fees and moving costs. On a £500,000 purchase, even ordinary variation across those lines can add up quickly."
      ]
    }
  };

  const streamlinedConfig = streamlinedPricePageConfig[price];

  if (streamlinedConfig) {
    return {
      slug,
      title: `Cost to Buy a ${price / 1000}k House in the UK`,
      description: `Estimate the cost to buy a ${formattedPrice} house in the UK, including deposit, property tax, legal fees, surveys, mortgage costs, moving costs and the extra cash buyers usually need.`,
      keywords,
      h1: `Cost to buy a ${formattedPrice} house in the UK`,
      intro: streamlinedConfig.intro,
      directAnswer: `The total cost to buy a ${formattedPrice} house in the UK is the deposit plus all upfront costs needed to complete the purchase. A buyer using a 10% deposit would need around ${tenPercentDeposit} for the deposit, plus several thousand pounds more for legal fees, surveys, mortgage costs, moving and setup.`,
      introSections: [
        {
          title: `Typical cost breakdown for a ${formattedPrice} house`,
          bullets: [
            `10% deposit: ${tenPercentDeposit}`,
            `Stamp duty or property tax: ${streamlinedConfig.taxRange}`,
            "Legal fees: ~£800–£1,800",
            "Surveys: £300–£1,000+",
            "Mortgage fees: £0–£2,000+",
            "Moving and setup costs: £500–£2,500+"
          ],
          callout:
            "Deposit, property tax, legal fees, surveys, mortgage costs and moving and setup are the main lines buyers usually need to cover."
        },
        {
          title: "Typical total upfront cash needed",
          paragraphs: [
            `Typical total upfront cash needed for a ${formattedPrice} house:`,
            `${streamlinedConfig.totalRange} depending on buyer type, location and assumptions.`,
            `Most buyers should expect their deposit plus ${streamlinedConfig.extraRange} in additional upfront costs.`
          ]
        },
        {
          title: "Why the total cost can vary",
          paragraphs: [
            ...streamlinedConfig.varyParagraphs,
            "Use the true cost of buying a house calculator to personalise this estimate based on your deposit, buyer type and location."
          ]
        }
      ],
      contextualLinks: [
        { href: "/#calculator", label: "true cost of buying a house calculator" },
        { href: "/hidden-costs-buying-house", label: "hidden costs of buying a house" },
        { href: "/stamp-duty-explained", label: "stamp duty explained" },
        { href: "/mortgage-fees-costs", label: "mortgage fees and costs" },
        { href: "/moving-costs-uk", label: "moving costs in the UK" }
      ],
      contextualLinksSentence:
        "Use the true cost of buying a house calculator, review the hidden costs of buying a house, and check stamp duty explained, mortgage fees and costs, and moving costs in the UK to compare this estimate with your full buying budget.",
      trustReviewedText: streamlinedConfig.trustText,
      updatedLabel: "Updated for 2026",
      atGlance: [
        {
          label: "Typical total upfront cash needed",
          value: `About ${streamlinedConfig.totalRange} on a ${formattedPrice} purchase, depending on deposit size, buyer type, tax treatment and moving assumptions.`
        },
        {
          label: "Example 10% deposit",
          value: `A 10% deposit is ${tenPercentDeposit} before legal fees, surveys, mortgage costs and moving are added.`
        },
        {
          label: "Best fit",
          value: streamlinedConfig.bestFit
        },
        {
          label: "Buyers should check",
          value: "Property tax treatment, survey scope, mortgage charges, moving costs and whether the property is simple or more complex."
        }
      ],
      sections: [],
      faqs: [
        {
          question: `How much deposit do I need for a ${formattedPrice} house?`,
          answer: `A 10% deposit is ${tenPercentDeposit}. A 5% deposit would be ${fivePercentDeposit}, a 15% deposit would be ${fifteenPercentDeposit}, and a 20% deposit would be ${twentyPercentDeposit}, so the right target depends on mortgage options and how much cash you still need for fees.`
        },
        {
          question: "What are the extra costs beyond the deposit?",
          answer:
            "The extra costs usually include legal fees, surveys, mortgage costs, property tax where it applies, and moving and setup spending. Buyers should treat those separately from the deposit rather than assuming they will stay small."
        },
        {
          question: `Do first-time buyers pay stamp duty on a ${formattedPrice} house?`,
          answer:
            "That depends on the nation, the current rules and the buyer's exact situation. First-time buyers may face a lighter tax position than home movers or additional-property buyers, but SDLT, LBTT and LTT do not all work the same way."
        },
        {
          question: "How much savings should I have in total?",
          answer: `A practical planning target is about ${streamlinedConfig.totalRange} in total upfront cash on a ${formattedPrice} purchase, depending on buyer type, location and assumptions. That range is a planning estimate, not a guaranteed quote.`
        }
      ],
      relatedGuides: [
        "hidden-costs-buying-house",
        "stamp-duty-explained",
        "mortgage-fees-costs",
        "moving-costs-uk",
        "how-much-money-needed-buy-house"
      ],
      sourceKeys: ["sdlt", "lbtt", "lbttAds", "ltt", "hmlr"],
      ctaTitle: `Try your own ${formattedPrice} scenario`,
      ctaText: `Use the calculator to test a ${formattedPrice} purchase with your own deposit, buyer type and location instead of relying on one fixed estimate.`,
      officialItems: ["property tax for the relevant UK nation", "published registration fee scales where applicable"],
      estimateItems: ["legal fees", "surveys", "mortgage fees", "moving costs", "setup buffer"],
      mistakes: [
        "Using only the deposit as the target",
        "Assuming buyer type does not change the tax line",
        "Forgetting surveys, legal fees and moving costs",
        "Treating a planning estimate as if it were a fixed quote"
      ],
      checklist: [
        "Confirm the tax position for your nation and buyer type",
        "Check that the deposit still leaves room for fees and a buffer",
        "Sense-check survey, mortgage and moving assumptions",
        "Use the calculator again if the property or assumptions change"
      ]
    };
  }

  return createLongGuide({
    slug,
    title: `Cost to Buy a ${price / 1000}k House in the UK`,
    description: `Estimate the cost to buy a ${formattedPrice} home in the UK, including deposit, SDLT or regional property tax, legal fees, searches, surveys and the extra costs buyers often forget.`,
    keywords,
    h1: `Cost to buy a ${formattedPrice} house in the UK`,
    intro: profile.intro,
    directAnswer:
      price === 250_000
        ? `On a ${formattedPrice} purchase, a 10% deposit is ${tenPercentDeposit} and mainstream extra buying costs beyond the deposit often land around ${formatCurrency(extraMin)} to ${formatCurrency(extraMax)}. A lean first-time buyer case may sit nearer the lower end, while movers who want removals, a fuller survey and a stronger buffer should plan for more.`
        : price === 300_000
          ? `For a ${formattedPrice} house, a 10% deposit is ${tenPercentDeposit} and the extra buying costs beyond the deposit often come out around ${formatCurrency(extraMin)} to ${formatCurrency(extraMax)} on mainstream owner-occupier examples. The exact total depends on region, buyer type, survey choice and how much moving-day spending you include.`
          : price === 350_000
            ? `A ${formattedPrice} purchase usually needs more than the deposit alone. With a 10% deposit of ${tenPercentDeposit}, buyers often still need roughly ${formatCurrency(extraMin)} to ${formatCurrency(extraMax)} beyond the deposit for tax, legal work, surveys, moving costs and a sensible buffer.`
            : price === 400_000
              ? `For a ${formattedPrice} house, buyers often need a large deposit plus another ${formatCurrency(extraMin)} to ${formatCurrency(extraMax)} or more beyond the deposit for tax, legal fees, surveys, lender charges and moving costs. At this level, region and buyer type can materially change the official tax line.`
              : price === 450_000
                ? `A ${formattedPrice} purchase is tax-sensitive enough that the full upfront cash figure deserves careful modelling. A 10% deposit is ${tenPercentDeposit}, while mainstream extra buying costs beyond the deposit often fall around ${formatCurrency(extraMin)} to ${formatCurrency(extraMax)} before any second-home premium is considered.`
                : `On a ${formattedPrice} purchase, a 10% deposit is ${tenPercentDeposit}, a 20% deposit is ${twentyPercentDeposit}, and the extra buying costs beyond the deposit often sit around ${formatCurrency(extraMin)} to ${formatCurrency(extraMax)} for owner-occupier cases. Additional-property buyers can need materially more because both tax and deposit expectations change at this level.`,
    atGlance: [
      {
        label: "Typical extra buying costs beyond deposit",
        value: `About ${formatCurrency(extraMin)} to ${formatCurrency(extraMax)} on mainstream owner-occupier examples at this price.`
      },
      {
        label: "Example deposits",
        value: `5% is ${fivePercentDeposit}, 10% is ${tenPercentDeposit}, and 20% is ${twentyPercentDeposit}.`
      },
      {
        label: "Usually applies when",
        value: profile.buyerContext
      },
      {
        label: "Buyers should check",
        value: "Tax treatment for the nation, survey scope, lender fees and how much moving-day spending should be included."
      }
    ],
    sections: [
      {
        title: `How much does it cost to buy a ${formattedPrice} house in the UK?`,
        paragraphs: profile.overview
      },
      {
        title: `How much deposit do you need for a ${formattedPrice} house?`,
        paragraphs: [
          `The deposit is still the biggest single cash line for most buyers, but it should not swallow the rest of the budget. At ${formattedPrice}, even a modest change in deposit percentage can move the required cash by many thousands of pounds, so it is worth checking how much flexibility you really want after completion.`,
          `A larger deposit can help with mortgage pricing and resilience, but there is no prize for putting every available pound into the deposit if it leaves you exposed on surveys, fees, moving costs or the first month of ownership.`
        ],
        table: {
          summary: `The table below compares common deposit levels on a ${formattedPrice} purchase so buyers can see the cash commitment before any tax, legal or moving costs are added.`,
          caption: `Deposit examples for a ${formattedPrice} purchase`,
          columns: ["Deposit level", "Cash needed", "Planning note"],
          rows: depositRows
        }
      },
      {
        title: `What extra buying costs apply beyond the deposit on a ${formattedPrice} house?`,
        paragraphs: [
          `The deposit is the number most buyers remember, but the rest of the transaction still needs its own cash allowance. At ${formattedPrice}, solicitor fees, searches, surveys, mortgage fees, transfer charges and a realistic contingency can all add up faster than many buyers expect.`,
          `That is why the extra buying costs beyond the deposit need to be treated as a proper savings target rather than a vague add-on. This is especially important if the purchase is older, leasehold, further away to move into, or likely to need a fuller survey.`
        ],
        bullets: [
          "Property tax or regional purchase tax",
          "Solicitor and conveyancing costs",
          "Search fees and registration costs",
          "Survey or inspection costs",
          "Mortgage product or valuation charges",
          "Moving, locks, cleaning and setup spending"
        ],
        table: {
          summary: `The table below shows a mainstream extra-cost breakdown for a ${formattedPrice} purchase, separating official charges from estimate-led and optional items so buyers can see what sits beyond the deposit.`,
          caption: `Example extra buying costs beyond the deposit on a ${formattedPrice} purchase`,
          columns: ["Extra cost item", "Type", "Example amount", "Why it matters"],
          rows: extraCostRows
        }
      },
      {
        title: `How this changes for first-time buyers at ${formattedPrice}`,
        paragraphs: profile.firstTimeBuyer
      },
      {
        title: `How this changes for movers or second-home buyers at ${formattedPrice}`,
        paragraphs: profile.mover
      },
      {
        title: `What buyers often forget at this price point`,
        paragraphs: profile.forgotten
      },
      {
        title: `How does the tax change on a ${formattedPrice} house in England, Scotland and Wales?`,
        paragraphs: [
          `The same headline property price can produce very different upfront totals once nation and buyer type are factored in. Tax treatment is the main reason, but not the only one. Buyers should think in terms of complete scenarios, not one universal UK total.`,
          `The examples below use the TrueHomeCosts calculator with average assumptions and a 10% deposit for owner-occupier examples. The additional-property example uses a 25% deposit because that is a more common planning assumption for second-home or similar purchases.`
        ],
        table: {
          summary: `The table below compares how the same ${formattedPrice} price point can behave across England and Northern Ireland, Scotland and Wales, with an additional-property example to show how buyer type changes the total again.`,
          caption: `Illustrative upfront totals and tax effects for a ${formattedPrice} purchase`,
          columns: ["Scenario", "Estimated total upfront cash", "What changes the result"],
          rows: [
            [
              `England / NI first-time buyer, 10% deposit`,
              formatCurrency(englandFtb.totalUpfrontCash),
              `Deposit ${formatCurrency(englandFtb.depositAmount)} and tax ${formatCurrency(englandFtb.propertyTaxAmount)}`
            ],
            [
              `England / NI home mover, 10% deposit`,
              formatCurrency(englandMover.totalUpfrontCash),
              `Tax treatment is less generous than the first-time buyer case`
            ],
            [
              `Scotland home mover, 10% deposit`,
              formatCurrency(scotlandMover.totalUpfrontCash),
              `LBTT changes the total even at the same purchase price`
            ],
            [
              `Wales home mover, 10% deposit`,
              formatCurrency(walesMover.totalUpfrontCash),
              `LTT uses a different threshold and rate pattern`
            ],
            [
              `Additional property, England / NI, 25% deposit`,
              formatCurrency(additionalProperty.totalUpfrontCash),
              `Higher deposit and higher-rate tax treatment can change the budget sharply`
            ]
          ]
        }
      },
    ],
    faqs: [
      {
        question: `How much cash do I need to buy a ${price / 1000}k house in the UK?`,
        answer: `For many mainstream owner-occupier cases, buyers need the deposit plus another ${formatCurrency(extraMin)} to ${formatCurrency(extraMax)} or so for the rest of the transaction. The exact total depends on region, buyer type, survey choice and whether moving costs are included.`
      },
      {
        question: `How much deposit do I need for a ${price / 1000}k house?`,
        answer: `A 5% deposit is ${fivePercentDeposit}, a 10% deposit is ${tenPercentDeposit}, a 15% deposit is ${formatCurrency(Math.round(price * 0.15))}, and a 20% deposit is ${twentyPercentDeposit}. The right choice depends on mortgage options and how much cash you still want left for fees and buffer.`
      },
      {
        question: `What extra costs apply beyond the deposit on a ${price / 1000}k house?`,
        answer: `Beyond the deposit, buyers usually need to budget for property tax, solicitor fees, searches, surveys, mortgage charges, registration and a move-in buffer. At this price, those extra costs are large enough that they should be planned separately from the deposit.`
      },
      {
        question: `Does the cost to buy a ${price / 1000}k house change across the UK?`,
        answer: `Yes. SDLT, LBTT and LTT do not use the same thresholds or rates, so the same ${formattedPrice} purchase can produce a different tax line in England and Northern Ireland, Scotland and Wales.`
      },
      {
        question: `How does a ${price / 1000}k purchase change for first-time buyers?`,
        answer: `First-time buyers may get more help on the tax side than home movers, but they still need a separate budget for legal work, searches, surveys and move-in costs. This is why a relief on tax does not remove the need for a full savings plan.`
      },
      {
        question: `What should movers or second-home buyers watch on a ${price / 1000}k purchase?`,
        answer: `Movers should watch the combination of tax, removals and chain-related timing. Additional-property buyers should be even more careful because higher-rate tax treatment and larger deposit expectations can change the budget materially.`
      },
      {
        question: `Should I include moving and insurance when budgeting for a ${price / 1000}k purchase?`,
        answer: `If you want a realistic all-in figure, yes. They may not appear on the solicitor's statement, but they still affect how much cash you need around completion and the first weeks of ownership.`
      }
    ],
    relatedGuides: [
      "hidden-costs-buying-house",
      "how-much-money-needed-buy-house",
      "stamp-duty-explained",
      ...neighbouringPriceGuides
    ],
    sourceKeys: ["sdlt", "lbtt", "lbttAds", "ltt", "hmlr"],
    ctaTitle: `Try your own ${formattedPrice} scenario`,
    ctaText: profile.ctaText,
    topicLabel: `the cost to buy a ${formattedPrice} house`,
    buyerContext: profile.buyerContext,
    costDrivers: profile.costDrivers,
    paymentRows: [
      ["Early planning", "Broker advice, agreement in principle work, initial legal instruction", "Useful stage for stress-testing the budget before you commit emotionally to one property"],
      ["After offer accepted", "Survey, lender valuation, early solicitor payments", "These costs can arise before exchange and may still be spent if the deal falls through"],
      ["Before exchange or completion", "Deposit balance, property tax, registration and final legal statement", "Usually the largest concentrated cash requirement"],
      ["After move-in", "Moving, locks, setup costs, furnishing and early bills", "Still part of the true cost of buying if your cash is tight"]
    ],
    comparisonCaption: `Why a ${formattedPrice} purchase does not produce one universal UK total`,
    comparisonRows: [
      ["First-time buyer", "May qualify for relief depending on nation and price", "Tax can fall, but legal and practical costs still remain"],
      ["Home mover", "Usually faces standard owner-occupier treatment", "A good benchmark for mainstream budgeting"],
      ["Additional property buyer", "Higher deposit expectations and higher-rate tax treatment are common", "Upfront cash can jump sharply"],
      ["Older or more complex property", "May need a fuller survey or extra legal work", "Buffer matters more than average online quotes suggest"]
    ],
    workedExampleCaption: `Planning examples for buyers researching the cost to buy a ${price / 1000}k house UK`,
    workedExampleRows: [
      [`${formattedPrice} first-time buyer route`, `${formatCurrency(englandFtb.totalUpfrontCash)} in the England / NI example`, "Shows how relief can help without removing the need for extra cash above the deposit"],
      [`${formattedPrice} home mover route`, `${formatCurrency(englandMover.totalUpfrontCash)} in the England / NI example`, "Useful baseline if you are not a first-time buyer"],
      [`${formattedPrice} Scotland route`, `${formatCurrency(scotlandMover.totalUpfrontCash)}`, "Highlights the effect of LBTT at the same purchase price"],
      [`${formattedPrice} Wales route`, `${formatCurrency(walesMover.totalUpfrontCash)}`, "Shows how LTT can change the total"],
      [`${formattedPrice} additional property route`, `${formatCurrency(additionalProperty.totalUpfrontCash)}`, "Illustrates how higher deposit and higher-rate tax treatment can dominate the budget"]
    ],
    officialItems: ["property tax bands for the relevant nation", "published registration fee scales where applicable"],
    estimateItems: ["legal quotes", "search bundles", "survey costs", "mortgage fees", "moving costs", "insurance and furnishing allowances"],
    mistakes: [
      "Using only the deposit as the target and ignoring the wider buying budget",
      "Assuming the same tax treatment applies in every UK nation",
      "Treating the cheapest online legal or survey number as the likely real cost",
      "Forgetting the post-completion cash need for moving and setup"
    ],
    checklist: [
      "Recheck the tax position for your exact nation and buyer type",
      "Confirm whether your deposit target still leaves room for fees and a buffer",
      "Ask for updated quotes once the property and lender are known",
      "Review completion timing so cash is accessible when needed",
      "Use the homepage calculator again if the property type or assumptions change"
    ]
  });
}
