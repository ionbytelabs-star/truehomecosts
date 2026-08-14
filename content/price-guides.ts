import { formatCurrency } from "../lib/format";

import { create600kPriceGuide } from "./price-guide-600k";
import {
  createPriceGuide,
  depositTable,
  estimatedBuyingCosts,
  getPriceGuideFacts,
  jurisdictionTable,
  sharedCostExplanation,
  standardAtGlance,
  type PriceGuideEditorial,
  type RetainedPropertyPrice
} from "./price-guide-builder";
import type { GuidePageContent } from "./types";

const editorialByPrice: Partial<Record<RetainedPropertyPrice, PriceGuideEditorial>> = {
  150000: {
    title: "Cost to Buy a £150k House: Deposit, Tax and Cash Budget",
    description:
      "Calculate the cash needed to buy a £150,000 home, including deposit examples, property-tax differences and the fees that matter most at this price.",
    h1: "What does it cost to buy a £150,000 house?",
    intro:
      "At £150,000, the deposit is comparatively modest, but legal, survey and mortgage costs do not shrink in the same proportion as the property price. That makes the cash needed above the deposit especially important.",
    directAnswer: (facts) =>
      `With a 10% deposit, the calculator's England home-mover example requires ${formatCurrency(facts.englandHomeMover.totalUpfrontCash)} in total cash. ${formatCurrency(estimatedBuyingCosts(facts.englandHomeMover))} of that sits above the ${formatCurrency(facts.deposits[10])} deposit and includes property tax, transaction estimates, moving, insurance and contingency under the stated assumptions.`,
    atGlance: (facts) =>
      standardAtGlance(facts, "Fixed transaction fees weigh more heavily against a smaller deposit budget."),
    sections: (facts) => [
      {
        title: "Why fees matter more to a £150,000 budget",
        paragraphs: [
          sharedCostExplanation(facts),
          `In the England home-mover planning example, costs above the 10% deposit are ${formatCurrency(estimatedBuyingCosts(facts.englandHomeMover))}. This is why a buyer who has saved exactly ${formatCurrency(facts.deposits[10])} has not yet funded the full purchase process.`
        ]
      },
      {
        title: "A smaller price, three different deposit targets",
        paragraphs: [
          "A five-point change in deposit percentage moves the cash deposit by £7,500 at this price. The mortgage figures are arithmetic illustrations, not lending or affordability decisions."
        ],
        table: depositTable(facts, "Deposit amounts for a £150,000 purchase")
      },
      {
        title: "Property tax is not the same across the UK",
        paragraphs: [
          `The calculator produces ${formatCurrency(facts.englandHomeMover.propertyTaxAmount)} SDLT for an England home mover, ${formatCurrency(facts.scotlandHomeMover.propertyTaxAmount)} LBTT in Scotland and ${formatCurrency(facts.walesHomeMover.propertyTaxAmount)} LTT in Wales. Registration and estimate-led costs can also vary.`,
          "First-time buyer status changes the England example, so use the row matching both your nation and buyer type."
        ],
        table: jurisdictionTable(facts, "Calculated £150,000 examples by nation and buyer type")
      }
    ],
    faqs: (facts) => [
      {
        question: "Is £15,000 enough to buy a £150,000 house?",
        answer: `£15,000 is a 10% deposit, but it is not the full cash target. The stated England home-mover example totals ${formatCurrency(facts.englandHomeMover.totalUpfrontCash)} after tax, estimated transaction costs and selected planning allowances.`
      },
      {
        question: "How much is a 5% deposit on £150,000?",
        answer: `A 5% deposit is ${formatCurrency(facts.deposits[5])}. Product availability and affordability are lender decisions.`
      },
      {
        question: "Does every £150,000 buyer pay property tax?",
        answer: "No. The result depends on the UK nation, buyer type and any additional-property treatment. The comparison table uses the site's current tax engine for each stated scenario."
      }
    ],
    ctaTitle: "Replace the £150,000 example with your own quotes",
    ctaText: "Run this price in the calculator, choose your nation and buyer type, then replace market estimates with current transaction quotations.",
    mistakes: ["Saving only the deposit", "Assuming low price means negligible fixed fees"],
    checklist: ["Choose the correct nation and buyer type", "Keep cash above the deposit for fees and a buffer"]
  },
  200000: {
    title: "Cost to Buy a £200k House: UK Cash and Tax Examples",
    description:
      "See deposit amounts and calculator-derived buying-cost examples for a £200,000 home, including the notable property-tax differences between UK nations.",
    h1: "Buying a £200,000 house: how much cash is needed?",
    intro:
      "A £200,000 purchase is a useful example of why one UK-wide tax estimate is unreliable: the same home-mover price produces different tax results in England, Scotland and Wales.",
    directAnswer: (facts) =>
      `The 10% deposit is ${formatCurrency(facts.deposits[10])}. Under the calculator's England home-mover assumptions, total upfront cash is ${formatCurrency(facts.englandHomeMover.totalUpfrontCash)}, while the nation-specific examples differ because property tax and registration rules are not uniform.`,
    atGlance: (facts) =>
      standardAtGlance(facts, "Wales, Scotland and England do not produce the same tax result at £200,000."),
    sections: (facts) => {
      const lower = getPriceGuideFacts(150_000);
      const higher = getPriceGuideFacts(250_000);
      return [
        {
          title: "The £200,000 tax split across Britain",
          paragraphs: [
            `An England or Northern Ireland home mover has ${formatCurrency(facts.englandHomeMover.propertyTaxAmount)} SDLT in this example. Scotland produces ${formatCurrency(facts.scotlandHomeMover.propertyTaxAmount)} LBTT and Wales produces ${formatCurrency(facts.walesHomeMover.propertyTaxAmount)} LTT.`,
            "Those figures come from the calculator's jurisdiction-specific bands; they are not a blended UK estimate."
          ],
          table: jurisdictionTable(facts, "Cash and property-tax examples at £200,000")
        },
        {
          title: "What another £50,000 does to the savings target",
          paragraphs: [
            `At a 10% deposit, moving from £150,000 to £200,000 adds ${formatCurrency(facts.deposits[10] - lower.deposits[10])} to the deposit. Moving from £200,000 to £250,000 adds the same amount again, but the tax difference is determined by progressive bands rather than a single flat percentage.`,
            `The England home-mover tax examples are ${formatCurrency(lower.englandHomeMover.propertyTaxAmount)}, ${formatCurrency(facts.englandHomeMover.propertyTaxAmount)} and ${formatCurrency(higher.englandHomeMover.propertyTaxAmount)} at those three prices.`
          ]
        },
        {
          title: "Deposit choices and the remaining mortgage",
          paragraphs: [
            "The deposit rises evenly with the percentage selected. Fees do not: some are estimates, while property tax follows the rules for the chosen nation and buyer status."
          ],
          table: depositTable(facts, "Deposit planning points on a £200,000 home")
        }
      ];
    },
    faqs: (facts) => [
      {
        question: "What is a 10% deposit on a £200,000 house?",
        answer: `It is ${formatCurrency(facts.deposits[10])}. The worked England home-mover total is higher because it also includes tax and the stated cost assumptions.`
      },
      {
        question: "Why can a Welsh £200,000 example be cheaper on tax?",
        answer: `The current calculator bands produce ${formatCurrency(facts.walesHomeMover.propertyTaxAmount)} LTT for the stated Welsh home-mover example, compared with ${formatCurrency(facts.englandHomeMover.propertyTaxAmount)} SDLT in England. Rules and eligibility should always be checked for the actual transaction.`
      },
      {
        question: "How much is needed above the £20,000 deposit?",
        answer: `The calculator's England home-mover planning example places ${formatCurrency(estimatedBuyingCosts(facts.englandHomeMover))} above the deposit, including tax and its selected estimates and allowances.`
      }
    ],
    ctaTitle: "Model your own £200,000 purchase",
    ctaText: "Use your actual nation, buyer status, deposit and quotations rather than treating a national example as a quote.",
    mistakes: ["Using an England tax figure for a Welsh purchase", "Treating the mortgage balance as an affordability result"],
    checklist: ["Check the jurisdiction first", "Separate deposit cash from the rest of the buying budget"]
  },
  250000: {
    title: "Cost to Buy a £250k House: Deposits and Tax Thresholds",
    description:
      "Plan a £250,000 home purchase with calculated deposits, cash requirements and UK property-tax examples, including why this price interacts with important bands.",
    h1: "The cost of buying a £250,000 house",
    intro:
      "At £250,000, several tax-band effects become visible: an England home mover reaches the top of the standard 2% SDLT slice, while a Welsh home mover is above the current zero-rate starting band used by the calculator.",
    directAnswer: (facts) =>
      `A 10% deposit is ${formatCurrency(facts.deposits[10])}. The calculator's England home-mover scenario totals ${formatCurrency(facts.englandHomeMover.totalUpfrontCash)}, including ${formatCurrency(facts.englandHomeMover.propertyTaxAmount)} SDLT and the selected estimates, moving, insurance and contingency.`,
    atGlance: (facts) =>
      standardAtGlance(facts, "This price exposes different band edges in England and Wales."),
    sections: (facts) => [
      {
        title: "Why £250,000 is a useful tax-band example",
        paragraphs: [
          `For an England home mover, the engine calculates ${formatCurrency(facts.englandHomeMover.propertyTaxAmount)} SDLT. The amount is progressive: only the part above the zero-rate band is taxed.`,
          `The same price produces ${formatCurrency(facts.scotlandHomeMover.propertyTaxAmount)} LBTT in Scotland and ${formatCurrency(facts.walesHomeMover.propertyTaxAmount)} LTT in Wales. These are separate systems, not regional adjustments to SDLT.`
        ],
        table: jurisdictionTable(facts, "Nation and buyer examples for a £250,000 purchase")
      },
      {
        title: "£12,500 separates each five-point deposit step",
        paragraphs: [
          "At this price, moving from a 5% to 10% deposit adds £12,500 in cash; the same increment applies from 10% to 15%. The associated mortgage figures remain illustrative."
        ],
        table: depositTable(facts, "Deposit and illustrative mortgage amounts at £250,000")
      },
      {
        title: "How much should sit outside the deposit?",
        paragraphs: [
          sharedCostExplanation(facts),
          `With the page's broader average assumptions selected, the England home-mover example needs ${formatCurrency(estimatedBuyingCosts(facts.englandHomeMover))} above the deposit. A real total changes when quotes, optional costs or buyer circumstances change.`
        ]
      }
    ],
    faqs: (facts) => [
      {
        question: "How much Stamp Duty is due on £250,000 for a home mover?",
        answer: `The calculator returns ${formatCurrency(facts.englandHomeMover.propertyTaxAmount)} SDLT for an England or Northern Ireland standard home-mover purchase at this price.`
      },
      {
        question: "Does a first-time buyer pay SDLT at £250,000?",
        answer: `The current England first-time buyer calculation is ${formatCurrency(facts.englandFirstTimeBuyer.propertyTaxAmount)} for this price. Eligibility conditions still need to be satisfied.`
      },
      {
        question: "Is £25,000 the full cash needed?",
        answer: `No. £25,000 is the 10% deposit; the worked England home-mover cash total is ${formatCurrency(facts.englandHomeMover.totalUpfrontCash)} under the stated settings.`
      }
    ],
    ctaTitle: "Test the band effects on your £250,000 scenario",
    ctaText: "Change nation and buyer type in the calculator, then replace the planning estimates with quotes from your transaction.",
    mistakes: ["Applying tax to the full price as one flat rate", "Stopping the savings target at £25,000"],
    checklist: ["Check buyer relief eligibility", "Budget explicitly for cash above the deposit"]
  },
  300000: {
    title: "Cost to Buy a £300k House: First-Time Buyer Comparison",
    description:
      "See what is distinctive about a £300,000 purchase, including deposit cash, England first-time buyer relief and calculated comparisons across Scotland and Wales.",
    h1: "How much cash do you need for a £300,000 house?",
    intro:
      "A £300,000 purchase clearly shows the effect of buyer status in England: the calculator gives a different SDLT result for an eligible first-time buyer and a standard home mover at the same price.",
    directAnswer: (facts) =>
      `The 10% deposit is ${formatCurrency(facts.deposits[10])}. An eligible England first-time buyer has ${formatCurrency(facts.englandFirstTimeBuyer.propertyTaxAmount)} SDLT in the calculator, while the standard England home-mover example has ${formatCurrency(facts.englandHomeMover.propertyTaxAmount)} and total cash of ${formatCurrency(facts.englandHomeMover.totalUpfrontCash)}.`,
    atGlance: (facts) =>
      standardAtGlance(facts, "Buyer status creates a material England SDLT difference at this price."),
    sections: (facts) => {
      const lower = getPriceGuideFacts(250_000);
      const higher = getPriceGuideFacts(400_000);
      return [
        {
          title: "The first-time buyer and home-mover split",
          paragraphs: [
            `At £300,000, the calculator returns ${formatCurrency(facts.englandFirstTimeBuyer.propertyTaxAmount)} SDLT for an eligible England first-time buyer and ${formatCurrency(facts.englandHomeMover.propertyTaxAmount)} for a standard home mover.`,
            "Relief depends on the buyer and transaction meeting the rules; it should not be assumed from price alone. Scotland and Wales apply their own systems."
          ],
          table: jurisdictionTable(facts, "Worked £300,000 scenarios with a 10% deposit")
        },
        {
          title: "From £250,000 to £400,000: deposit and tax do different things",
          paragraphs: [
            `A 10% deposit rises from ${formatCurrency(lower.deposits[10])} at £250,000 to ${formatCurrency(facts.deposits[10])} here and ${formatCurrency(higher.deposits[10])} at £400,000. That is a straight percentage relationship.`,
            `England home-mover SDLT changes from ${formatCurrency(lower.englandHomeMover.propertyTaxAmount)} to ${formatCurrency(facts.englandHomeMover.propertyTaxAmount)} and then ${formatCurrency(higher.englandHomeMover.propertyTaxAmount)} because progressive bands apply to slices of the price.`
          ]
        },
        {
          title: "Four deposit positions for a £300,000 purchase",
          paragraphs: [
            "The table isolates the deposit and illustrative mortgage so they are not confused with taxes and transaction fees."
          ],
          table: depositTable(facts, "Deposit amounts at £300,000")
        }
      ];
    },
    faqs: (facts) => [
      {
        question: "Is £30,000 enough for a £300,000 home?",
        answer: `£30,000 is the 10% deposit. The stated England home-mover scenario totals ${formatCurrency(facts.englandHomeMover.totalUpfrontCash)}; a qualifying first-time buyer scenario differs because of tax treatment.`
      },
      {
        question: "What is the England first-time buyer tax example?",
        answer: `The calculator returns ${formatCurrency(facts.englandFirstTimeBuyer.propertyTaxAmount)} SDLT at £300,000 for its first-time buyer setting. Eligibility must still be checked.`
      },
      {
        question: "Why is Scotland not the same as England?",
        answer: `Scotland uses LBTT and the calculator returns ${formatCurrency(facts.scotlandHomeMover.propertyTaxAmount)} for the stated home-mover example, rather than applying England's SDLT bands.`
      }
    ],
    ctaTitle: "Compare buyer types at £300,000",
    ctaText: "Run the calculator twice—once with your actual buyer status and once as a comparison—then add current quotes.",
    mistakes: ["Assuming every buyer receives first-time buyer relief", "Comparing deposits without comparing tax"],
    checklist: ["Confirm relief eligibility", "Use the calculator for the correct UK nation"]
  },
  400000: {
    title: "Cost to Buy a £400k House: Relief, Tax and Extra Cash",
    description:
      "Calculate deposits and cash for a £400,000 home, with price-specific guidance on partial first-time buyer relief and nation-by-nation tax differences.",
    h1: "Buying a £400,000 house: deposit, tax and fees",
    intro:
      "At £400,000, an eligible England first-time buyer may still receive relief, but the tax is no longer zero. This makes it a better example of partial relief than lower-price guides.",
    directAnswer: (facts) =>
      `A 10% deposit is ${formatCurrency(facts.deposits[10])}. The calculator produces ${formatCurrency(facts.englandFirstTimeBuyer.propertyTaxAmount)} SDLT for an eligible England first-time buyer and ${formatCurrency(facts.englandHomeMover.propertyTaxAmount)} for a standard home mover; the home-mover cash total is ${formatCurrency(facts.englandHomeMover.totalUpfrontCash)} under the stated assumptions.`,
    atGlance: (facts) =>
      standardAtGlance(facts, "First-time buyer relief can reduce SDLT here without reducing it to zero."),
    sections: (facts) => [
      {
        title: "Partial first-time buyer relief at £400,000",
        paragraphs: [
          `The calculator's England first-time buyer tax is ${formatCurrency(facts.englandFirstTimeBuyer.propertyTaxAmount)}, compared with ${formatCurrency(facts.englandHomeMover.propertyTaxAmount)} for a home mover. The difference is ${formatCurrency(facts.englandHomeMover.propertyTaxAmount - facts.englandFirstTimeBuyer.propertyTaxAmount)}.`,
          "This is an eligibility-dependent example, not a promise that a particular purchase qualifies."
        ]
      },
      {
        title: "The cash above a £40,000 deposit",
        paragraphs: [
          sharedCostExplanation(facts),
          `The broader England home-mover example places ${formatCurrency(estimatedBuyingCosts(facts.englandHomeMover))} above the 10% deposit. It includes the selected moving, insurance and contingency settings but excludes furnishing.`
        ],
        table: depositTable(facts, "Deposit choices for a £400,000 home")
      },
      {
        title: "Why the nation matters more than the headline price",
        paragraphs: [
          `Home-mover property tax is ${formatCurrency(facts.englandHomeMover.propertyTaxAmount)} in the England example, ${formatCurrency(facts.scotlandHomeMover.propertyTaxAmount)} in Scotland and ${formatCurrency(facts.walesHomeMover.propertyTaxAmount)} in Wales.`,
          "The calculator also handles jurisdiction-specific registration treatment, so total cash can differ even where headline tax figures look close."
        ],
        table: jurisdictionTable(facts, "£400,000 cash examples across the UK")
      }
    ],
    faqs: (facts) => [
      {
        question: "Does a first-time buyer pay SDLT on £400,000?",
        answer: `The calculator returns ${formatCurrency(facts.englandFirstTimeBuyer.propertyTaxAmount)} for an eligible England first-time buyer at this price. It is partial relief, not a zero-tax example.`
      },
      {
        question: "How much cash is needed above a 10% deposit?",
        answer: `The stated England home-mover planning example needs ${formatCurrency(estimatedBuyingCosts(facts.englandHomeMover))} above the ${formatCurrency(facts.deposits[10])} deposit.`
      },
      {
        question: "Is Scottish LBTT the same as SDLT?",
        answer: `No. Scotland has its own LBTT bands; the calculator returns ${formatCurrency(facts.scotlandHomeMover.propertyTaxAmount)} for this home-mover example.`
      }
    ],
    ctaTitle: "Check whether relief changes your £400,000 total",
    ctaText: "Select the actual buyer type and nation, then compare the result with your saved deposit and real provider quotes.",
    mistakes: ["Treating partial relief as zero tax", "Reusing an England total for Scotland or Wales"],
    checklist: ["Verify first-time buyer eligibility", "Keep a separate allowance for costs above the deposit"]
  },
  500000: {
    title: "Cost to Buy a £500k House: The First-Time Buyer Cut-Off",
    description:
      "See why £500,000 is a distinctive buying-price threshold, with calculated deposits, first-time buyer SDLT and UK home-mover tax comparisons.",
    h1: "What does it cost to buy a £500,000 house?",
    intro:
      "£500,000 is the upper property-price limit used by the calculator for England and Northern Ireland first-time buyer SDLT relief. A purchase just above it is treated differently.",
    directAnswer: (facts) =>
      `The 10% deposit is ${formatCurrency(facts.deposits[10])}. At exactly £500,000, the calculator returns ${formatCurrency(facts.englandFirstTimeBuyer.propertyTaxAmount)} SDLT for an eligible first-time buyer and ${formatCurrency(facts.englandHomeMover.propertyTaxAmount)} for a standard home mover; the broader home-mover cash example totals ${formatCurrency(facts.englandHomeMover.totalUpfrontCash)}.`,
    atGlance: (facts) =>
      standardAtGlance(facts, "Exactly £500,000 sits at the calculator's first-time buyer relief price limit."),
    sections: (facts) => {
      const aboveCutOff = getPriceGuideFacts(500_001);
      return [
        {
          title: "Why £500,000 and £500,001 are not equivalent",
          paragraphs: [
            `At exactly £500,000, the England first-time buyer calculation is ${formatCurrency(facts.englandFirstTimeBuyer.propertyTaxAmount)}. At £500,001, the engine calculates ${formatCurrency(aboveCutOff.englandFirstTimeBuyer.propertyTaxAmount)} because the purchase is above the relief price limit.`,
            "That one-pound comparison isolates the eligibility boundary; it does not imply that every first-time buyer or transaction qualifies at £500,000."
          ]
        },
        {
          title: "Deposit scale at half a million pounds",
          paragraphs: [
            "Every five percentage points of deposit equals £25,000 at this price. The larger cash increments make it especially important to keep transaction costs separate from the deposit target."
          ],
          table: depositTable(facts, "Deposit and illustrative borrowing at £500,000")
        },
        {
          title: "Four tax systems and buyer positions",
          paragraphs: [
            `The England home-mover example has ${formatCurrency(facts.englandHomeMover.propertyTaxAmount)} SDLT, Scotland has ${formatCurrency(facts.scotlandHomeMover.propertyTaxAmount)} LBTT and Wales has ${formatCurrency(facts.walesHomeMover.propertyTaxAmount)} LTT.`,
            `Under the broader England home-mover assumptions, cash above the deposit is ${formatCurrency(estimatedBuyingCosts(facts.englandHomeMover))}. Quotes and optional choices can change that figure.`
          ],
          table: jurisdictionTable(facts, "£500,000 tax and cash comparison")
        }
      ];
    },
    faqs: (facts) => [
      {
        question: "Can a first-time buyer get SDLT relief at £500,000?",
        answer: `The calculator applies the relief bands at exactly £500,000 and returns ${formatCurrency(facts.englandFirstTimeBuyer.propertyTaxAmount)} for an eligible England first-time buyer. Eligibility ends when the price exceeds £500,000.`
      },
      {
        question: "What is a 15% deposit on £500,000?",
        answer: `It is ${formatCurrency(facts.deposits[15])}, leaving an illustrative mortgage of ${formatCurrency(facts.price - facts.deposits[15])}.`
      },
      {
        question: "How much is needed beyond a £50,000 deposit?",
        answer: `The England home-mover planning example adds ${formatCurrency(estimatedBuyingCosts(facts.englandHomeMover))} above the 10% deposit under its stated settings.`
      }
    ],
    ctaTitle: "Run the exact £500,000 buyer-status scenario",
    ctaText: "Use the calculator's buyer-type control carefully at this threshold and replace estimate-led lines with live quotes.",
    mistakes: ["Rounding an above-threshold purchase down to £500,000", "Assuming relief eligibility from price alone"],
    checklist: ["Use the exact agreed price", "Confirm buyer eligibility before relying on relief"]
  },
  750000: {
    title: "Cost to Buy a £750k House: Higher-Band Tax and Cash",
    description:
      "Calculate deposits and upfront cash for a £750,000 home, with higher-price tax-band interpretation and comparisons for England, Scotland and Wales.",
    h1: "Buying a £750,000 house: the full cash picture",
    intro:
      "At £750,000, first-time buyer SDLT relief is unavailable in England and Northern Ireland, while progressive tax bands create a much wider nation-by-nation spread than at lower prices.",
    directAnswer: (facts) =>
      `A 10% deposit is ${formatCurrency(facts.deposits[10])}. The calculator's standard England home-mover example includes ${formatCurrency(facts.englandHomeMover.propertyTaxAmount)} SDLT and totals ${formatCurrency(facts.englandHomeMover.totalUpfrontCash)}; Scotland and Wales produce different tax and cash results.`,
    atGlance: (facts) =>
      standardAtGlance(facts, "Higher progressive bands and the loss of first-time buyer relief dominate this example."),
    sections: (facts) => {
      const lower = getPriceGuideFacts(600_000);
      return [
        {
          title: "The £150,000 step up from £600,000",
          paragraphs: [
            `A 10% deposit rises by ${formatCurrency(facts.deposits[10] - lower.deposits[10])} between £600,000 and £750,000. England home-mover SDLT rises from ${formatCurrency(lower.englandHomeMover.propertyTaxAmount)} to ${formatCurrency(facts.englandHomeMover.propertyTaxAmount)}.`,
            "The tax increase is not calculated as one percentage of the whole price; each progressive band applies only to the slice within it."
          ]
        },
        {
          title: "Large deposit percentages in cash terms",
          paragraphs: [
            "At this price, each five-point deposit step is £37,500. The mortgage column is illustrative and does not assess income, rates or lender criteria."
          ],
          table: depositTable(facts, "Deposit positions for a £750,000 purchase")
        },
        {
          title: "Higher-price tax differences across the UK",
          paragraphs: [
            `The calculated home-mover taxes are ${formatCurrency(facts.englandHomeMover.propertyTaxAmount)} SDLT in England or Northern Ireland, ${formatCurrency(facts.scotlandHomeMover.propertyTaxAmount)} LBTT in Scotland and ${formatCurrency(facts.walesHomeMover.propertyTaxAmount)} LTT in Wales.`,
            `The England first-time buyer result is ${formatCurrency(facts.englandFirstTimeBuyer.propertyTaxAmount)} because the purchase is above the relief price limit.`
          ],
          table: jurisdictionTable(facts, "£750,000 tax and cash scenarios")
        },
        {
          title: "Do not let the deposit hide the rest of the budget",
          paragraphs: [
            sharedCostExplanation(facts),
            `The broader England home-mover planning example needs ${formatCurrency(estimatedBuyingCosts(facts.englandHomeMover))} above the 10% deposit. Higher tax is a major part of that difference, but quote-led costs and optional settings still matter.`
          ]
        }
      ];
    },
    faqs: (facts) => [
      {
        question: "Does first-time buyer SDLT relief apply at £750,000?",
        answer: `No. The price is above the relief limit, so the calculator returns the standard ${formatCurrency(facts.englandFirstTimeBuyer.propertyTaxAmount)} SDLT result for England or Northern Ireland.`
      },
      {
        question: "What is a 20% deposit on £750,000?",
        answer: `It is ${formatCurrency(facts.deposits[20])}, leaving an illustrative mortgage of ${formatCurrency(facts.price - facts.deposits[20])}.`
      },
      {
        question: "Why is the Scottish example higher?",
        answer: `Scotland uses separate LBTT bands, which produce ${formatCurrency(facts.scotlandHomeMover.propertyTaxAmount)} for this home-mover example. It is not an SDLT surcharge.`
      }
    ],
    ctaTitle: "Stress-test the £750,000 cash requirement",
    ctaText: "Run the exact jurisdiction and buyer type, then test different deposits and replace every estimate you can with a quotation.",
    mistakes: ["Applying first-time buyer relief above its limit", "Budgeting for a large deposit but not higher-band tax"],
    checklist: ["Compare all relevant UK tax systems", "Keep tax and quote-led costs outside the deposit figure"]
  }
};

export function createRetainedPriceGuide(price: RetainedPropertyPrice): GuidePageContent {
  if (price === 600_000) {
    return create600kPriceGuide();
  }

  const editorial = editorialByPrice[price];
  if (!editorial) {
    throw new Error(`Missing price-specific editorial for ${price}`);
  }

  return createPriceGuide(price, editorial);
}
