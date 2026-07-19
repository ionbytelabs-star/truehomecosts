import { getPageReview } from "../data/editorial/reviews";
import type { SourceKey } from "../lib/source-links";

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
  contextualLinksSentence?: string;
  trustReviewedText?: string;
  updatedLabel?: string;
  atGlance?: AtGlanceItem[];
  sections: GuideSection[];
  faqs: FAQItem[];
  showFaqAnswersExpanded?: boolean;
  relatedGuides: string[];
  officialSourceKeys?: SourceKey[];
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
  includeGeneratedSections?: boolean;
  includeGeneratedFaqs?: boolean;
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
          )}. Those numbers are still useful for planning, especially early in the process, but they should be treated as ranges. That is why TrueHomeCosts separates official-rate logic from planning assumptions and clearly labels estimate lines in the calculator output.`
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
  const review = getPageReview(config.slug);
  const mergedFaqs = [
    ...config.faqs,
    ...(config.includeGeneratedFaqs === false ? [] : generatedFaqs(config))
  ].filter(
    (faq, index, array) => array.findIndex((entry) => entry.question === faq.question) === index
  );
  const sections = [
    ...config.sections,
    ...(config.includeGeneratedSections === false ? [] : generatedLongSections(config))
  ];

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
    contextualLinksSentence: config.contextualLinksSentence,
    trustReviewedText: config.trustReviewedText,
    updatedLabel: config.updatedLabel ?? `Reviewed ${review.lastReviewedLabel}`,
    lastReviewed: review.lastReviewed,
    lastReviewedLabel: review.lastReviewedLabel,
    calculatorDataVersion: review.calculatorDataVersion,
    atGlance: buildAtGlance(config),
    sections: addTableSummaries(sections, config.topicLabel),
    faqs: mergedFaqs,
    showFaqAnswersExpanded: config.showFaqAnswersExpanded,
    relatedGuides: config.relatedGuides,
    officialSourceKeys: config.officialSourceKeys,
    sourceKeys: config.sourceKeys,
    ctaTitle: config.ctaTitle,
    ctaText: config.ctaText,
    officialItems: config.officialItems,
    estimateItems: config.estimateItems,
    mistakes: config.mistakes,
    checklist: config.checklist
  };
}
