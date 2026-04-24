import { calculateUpfrontCosts, type CalculatorInput } from "@/lib/calculator";
import { formatCurrency } from "@/lib/format";
import { buyerTypeLabels, jurisdictionLabels } from "@/lib/site";
import type { SourceKey } from "@/lib/source-links";

import type { AtGlanceItem, FAQItem, GuidePageContent, GuideSection } from "./types";

type TableRow = [string, string, string];

type LongGuideConfig = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  intro: string;
  directAnswer: string;
  updatedLabel?: string;
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

function generatedLongSections(config: LongGuideConfig): GuideSection[] {
  return [
    {
      title: `What usually pushes ${config.topicLabel} up or down?`,
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
      title: "When do buyers usually pay these costs?",
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
      title: "How do buyer type, property type and location change the picture?",
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
      title: "What do worked examples show buyers in practice?",
      paragraphs: [
        `Worked examples are useful because they turn abstract cost categories into a number you can compare with your own savings position. They are not a substitute for your solicitor's completion statement, but they do show how quickly smaller lines can add up once deposit, tax, legal work, searches, surveys and practical extras are considered together.`,
        `The exact figures on your purchase will move with the quotes you receive, the nation you are buying in, and whether the property is a straightforward freehold purchase or something more complex. Even so, benchmarking against realistic examples is one of the quickest ways to see whether your plan is broadly on track or undercooked.`,
        `If your own numbers look lower than every realistic example you can find, that is often a sign that something has been missed rather than a sign that your purchase is uniquely cheap.`
      ],
      table: {
        caption: config.workedExampleCaption,
        columns: ["Example", "Likely outcome", "What to notice"],
        rows: config.workedExampleRows
      }
    },
    {
      title: "Which figures are official and which are estimates?",
      paragraphs: [
        `A strong home-buying budget draws a line between official published charges and market-based estimates. Official figures are usually the easiest to sense-check because they come from published tax bands or fee scales. Estimate-based lines are still essential, but they require more caution because they depend on the property, the provider and the timing of the transaction.`,
        `For this topic, the official or near-official side includes ${sentenceList(
          config.officialItems
        )}. Those are the lines buyers should cross-check directly against the relevant authority or current solicitor paperwork before relying on the result.`,
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
      title: "What do buyers most often get wrong on this part of the budget?",
      paragraphs: [
        `The usual problem is not that buyers have never heard of ${config.topicLabel}. It is that they budget for the neatest version of it. People often pick the lowest online quote they can find, assume it will apply to their purchase, and then treat every higher figure as an unpleasant surprise rather than ordinary variation.`,
        `Another common slip is putting all the focus on the deposit and treating the surrounding costs as small change. In practice, buyers who reach their deposit target but leave no room for the rest of the process can still feel short of cash just when the purchase becomes serious.`,
        `A safer plan leaves room for ordinary friction. If the survey needs to be upgraded, the solicitor uncovers an extra issue, the lender charges a product fee or the move costs more than expected, the budget should still hold together.`
      ],
      bullets: config.mistakes
    },
    {
      title: "How can you budget more safely without overstretching?",
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
      title: "What should you check before you rely on a number?",
      paragraphs: [
        `Before exchange or any major commitment, buyers should move from generic planning into evidence-based checking. That means confirming the official charges, reading the solicitor's completion statement carefully, and making sure the timing of each payment still matches the cash you actually have available.`,
        `It also means treating this page as an informational guide, not as a substitute for transaction-specific professional advice. The closer you get to exchange and completion, the more the exact property and the exact paperwork matter.`
      ],
      bullets: config.checklist
    }
  ];
}

function buildAtGlance(config: LongGuideConfig): AtGlanceItem[] {
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
      question: `What does ${config.topicLabel} usually include?`,
      answer: `${config.topicLabel} usually includes ${sentenceList(config.estimateItems)} alongside any official-rate items that apply. Buyers should budget for the full chain of costs rather than one headline fee on its own.`
    },
    {
      question: "Which parts of the total are official and which parts are estimated?",
      answer: `The official or published-reference side usually includes ${sentenceList(config.officialItems)}. The estimate-led side usually includes ${sentenceList(config.estimateItems)}, so those numbers should be treated as planning ranges rather than fixed charges.`
    },
    {
      question: "When do buyers usually have to pay these costs?",
      answer: `Some costs can arrive early, especially once an offer is accepted and the legal work starts. The biggest cash demand usually lands closer to exchange or completion, so buyers should track both the total and the timing.`
    },
    {
      question: "How can buyers sense-check the number before relying on it?",
      answer: `${config.checklist[0]}. ${config.checklist[1]}. Once real quotes and paperwork arrive, compare them with the planning number rather than assuming the earliest estimate is exact.`
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
    updatedLabel: config.updatedLabel ?? "Updated for 2026",
    atGlance: buildAtGlance(config),
    sections: [...config.sections, ...generatedLongSections(config)],
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

  return createLongGuide({
    slug,
    title: `Cost to Buy a ${price / 1000}k House in the UK`,
    description: `Estimate the cost to buy a ${formattedPrice} home in the UK, including deposit, SDLT or regional property tax, legal fees, searches, surveys and the extra costs buyers often forget.`,
    keywords,
    h1: `Cost to buy a ${formattedPrice} house in the UK`,
    intro: `If you are wondering about the cost to buy a ${formattedPrice} house in the UK, the main question is not just the deposit. You need to allow for property tax, legal work, searches, surveys, mortgage costs, registration charges and a buffer for the practical extras that arrive around exchange, completion and move-in.`,
    directAnswer: `For a ${formattedPrice} house in the UK, the true upfront cost is the deposit plus the extra buying costs around it. On top of the purchase price, buyers often need cash for property tax, solicitor fees, search fees, surveys, mortgage charges, registration costs and a sensible contingency.`,
    sections: [
      {
        title: `How much does it cost to buy a ${formattedPrice} house in the UK?`,
        paragraphs: [
          `A ${formattedPrice} purchase sits in an awkward middle ground where the deposit is already significant, but the non-deposit costs are large enough to matter properly as well. That means the buying budget needs to be treated as a full transaction budget, not as a deposit target with a few extras bolted on later.`,
          `The core lines are the same as on most residential purchases: deposit, SDLT or regional property tax, legal fees, searches, survey costs, mortgage fees, registration charges and a working buffer. What changes at this price point is that the property is often more likely to attract a fuller survey, higher moving costs, or more variation in tax depending on the nation and buyer type.`,
          `That is why a page focused on the cost to buy a ${price / 1000}k house UK is useful. It lets you test a specific price point instead of relying on general advice that may be too low or too broad.`
        ]
      },
      {
        title: `How much deposit do you need for a ${formattedPrice} house?`,
        paragraphs: [
          `The deposit is still the biggest single cash line for most buyers, but it should not swallow the rest of the budget. At ${formattedPrice}, even a modest change in deposit percentage can move the required cash by many thousands of pounds, so it is worth checking how much flexibility you really want after completion.`,
          `A larger deposit can help with mortgage pricing and resilience, but there is no prize for putting every available pound into the deposit if it leaves you exposed on surveys, fees, moving costs or the first month of ownership.`
        ],
        table: {
          caption: `Deposit examples for a ${formattedPrice} purchase`,
          columns: ["Deposit level", "Cash needed", "Planning note"],
          rows: depositRows
        }
      },
      {
        title: `How does the tax change on a ${formattedPrice} house in England, Scotland and Wales?`,
        paragraphs: [
          `The same headline property price can produce very different upfront totals once nation and buyer type are factored in. Tax treatment is the main reason, but not the only one. Buyers should think in terms of complete scenarios, not one universal UK total.`,
          `The examples below use the TrueHomeCosts calculator with average assumptions and a 10% deposit for owner-occupier examples. The additional-property example uses a 25% deposit because that is a more common planning assumption for second-home or similar purchases.`
        ],
        table: {
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
      {
        title: `What extra costs apply beyond the deposit on a ${formattedPrice} house?`,
        paragraphs: [
          `The deposit is the largest line, but it is not the only line that matters at ${formattedPrice}. Buyers should still budget for solicitor fees, searches, surveys, lender-related charges, registration fees, telegraphic transfer fees and a practical contingency for the smaller items that show up late in the process.`,
          `This is where many price-specific searches go wrong. A buyer looks at a ${formattedPrice} property, works out the deposit, and assumes the rest will be marginal. In practice, the non-deposit total can still be several thousand pounds and can move up further if the property is older, leasehold, unusual or being bought as an additional property.`,
          `For a realistic planning number, it is usually better to think in three pots: deposit, transaction costs and move-in resilience. That gives you a much clearer answer to the question "what extra costs apply beyond the deposit?" than a tax-only estimate ever can.`
        ],
        bullets: [
          "Solicitor and conveyancing fees",
          "Search bundles and follow-up checks",
          "Survey or inspection costs",
          "Mortgage product, valuation or broker charges",
          "Registration fees and bank transfer costs",
          "Moving, locks, cleaning, insurance and setup costs"
        ]
      },
      {
        title: `How do first-time buyers, home movers and second-home buyers differ at ${formattedPrice}?`,
        paragraphs: [
          `First-time buyers looking at a ${formattedPrice} home are often balancing two goals at once: keeping the deposit achievable while not underestimating the non-deposit costs. Reliefs may help with property tax depending on the nation and the price, but the rest of the buying budget still needs to stand up.`,
          `Home movers at this level may already own furniture and may have more transaction experience, but they can still face chain pressure, overlapping costs and practical moving spend that first-time buyers do not always carry in the same way.`,
          `Second-home or additional-property buyers need to be especially careful because the tax treatment and lender expectations can shift the budget far more dramatically than the listing price alone suggests.`
        ]
      }
    ],
    faqs: [
      {
        question: `How much cash do I need to buy a ${price / 1000}k house in the UK?`,
        answer: `You need more than the deposit alone. Most buyers also need cash for property tax, legal fees, searches, surveys, mortgage costs and a working buffer.`
      },
      {
        question: `What is the biggest extra cost after the deposit on a ${price / 1000}k house?`,
        answer: `That depends on location and buyer type, but property tax is often the biggest single extra line where it applies.`
      },
      {
        question: `Does the cost to buy a ${price / 1000}k house change across the UK?`,
        answer: `Yes. SDLT, LBTT and LTT work differently, so the same purchase price can produce a different total in England and Northern Ireland, Scotland and Wales.`
      },
      {
        question: `Should I include moving and insurance when budgeting for a ${price / 1000}k purchase?`,
        answer: `If you want a realistic all-in number, yes. They are not always part of the solicitor's legal total, but they still affect how much cash you need around completion.`
      }
    ],
    relatedGuides: [
      "how-much-money-needed-buy-house",
      "stamp-duty-explained",
      "hidden-costs-buying-house",
      ...neighbouringPriceGuides
    ],
    sourceKeys: ["sdlt", "lbtt", "lbttAds", "ltt", "hmlr"],
    ctaTitle: `Try your own ${formattedPrice} scenario`,
    ctaText: "Use the homepage calculator to change the deposit, jurisdiction, buyer type and optional costs instead of relying on one fixed example.",
    topicLabel: `the cost to buy a ${formattedPrice} house`,
    buyerContext: `Buyer type at this price point`,
    costDrivers: [
      "deposit percentage",
      "SDLT, LBTT or LTT treatment",
      "whether the purchase is a first home, onward move or additional property",
      "survey depth and legal complexity",
      "moving, insurance and furnishing choices"
    ],
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
