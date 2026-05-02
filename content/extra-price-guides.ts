import type { GuidePageContent } from "@/content/types";
import { formatCurrency } from "@/lib/format";

type ExtraPriceGuideConfig = {
  slug: string;
  price: number;
  totalRange: string;
  extraRange: string;
  taxRange: string;
  intro: string;
  bestFit: string;
  trustText: string;
  varyParagraphs: [string, string];
};

const sharedRelatedGuides = [
  "hidden-costs-buying-house",
  "stamp-duty-explained",
  "mortgage-fees-costs",
  "moving-costs-uk",
  "how-much-money-needed-buy-house"
];

const sharedContextualLinks = [
  { href: "/#calculator", label: "true cost of buying a house calculator" },
  { href: "/hidden-costs-buying-house", label: "hidden costs of buying a house" },
  { href: "/stamp-duty-explained", label: "stamp duty explained" },
  { href: "/mortgage-fees-costs", label: "mortgage fees and costs" },
  { href: "/moving-costs-uk", label: "moving costs in the UK" }
];

const extraPriceGuideConfigs: ExtraPriceGuideConfig[] = [
  {
    slug: "cost-to-buy-150k-house",
    price: 150_000,
    totalRange: "£18,000–£30,000+",
    extraRange: "£3,000–£12,000+",
    taxRange: "£0",
    intro:
      "This page gives a quick £150,000 buying-cost estimate for buyers who want the deposit, extra fees and likely total cash target in one place.",
    bestFit:
      "Useful for first-time buyers and budget-conscious movers comparing how a £150,000 purchase changes across the UK.",
    trustText:
      "Updated for 2026 where the property tax rules and planning ranges on this £150,000 page have been reviewed for budgeting use.",
    varyParagraphs: [
      "At £150,000, affordability is often the main pressure point because buyers are usually working with tighter cash margins. A first-time buyer, home mover and additional-property buyer can still face different outcomes, especially once buyer type changes the property tax line.",
      "Tax differences between SDLT, LBTT and LTT still matter, but practical costs matter just as much when the budget is tight. Survey choice, property condition, mortgage fees and moving costs can all feel bigger when there is less spare cash around the purchase."
    ]
  },
  {
    slug: "cost-to-buy-200k-house",
    price: 200_000,
    totalRange: "£24,000–£38,000+",
    extraRange: "£4,000–£15,000+",
    taxRange: "£0",
    intro:
      "This page gives a quick £200,000 buying-cost estimate for buyers who want the deposit, extra fees and likely total cash target in one place.",
    bestFit:
      "Useful for first-time buyers, home movers and buyers comparing how a £200,000 budget changes across the UK.",
    trustText:
      "Updated for 2026 where the property tax rules and planning ranges on this £200,000 page have been reviewed for budgeting use.",
    varyParagraphs: [
      "At £200,000, many buyers are still trying to keep the purchase affordable without stripping every pound out of their savings. Buyer type still matters because a first-time buyer, home mover and additional-property buyer can carry different tax and deposit pressures even at this level.",
      "Regional tax rules through SDLT, LBTT and LTT can alter the official side of the total, while survey choice, property condition, mortgage fees and moving costs affect the softer planning side. That is why a £200,000 purchase still needs a full upfront budget rather than a deposit-only target."
    ]
  },
  {
    slug: "cost-to-buy-225k-house",
    price: 225_000,
    totalRange: "£27,000–£42,000+",
    extraRange: "£4,000–£17,000+",
    taxRange: "£0–£2,500",
    intro:
      "This page gives a quick £225,000 buying-cost estimate for buyers who want the deposit, extra fees and likely total cash target in one place.",
    bestFit:
      "Useful for first-time buyers, home movers and buyers comparing how a £225,000 budget changes across the UK.",
    trustText:
      "Updated for 2026 where the property tax rules and planning ranges on this £225,000 page have been reviewed for budgeting use.",
    varyParagraphs: [
      "At £225,000, the budget can still look manageable at first glance, but buyer type can move the final total more than many buyers expect. A first-time buyer may face less tax pressure than a home mover or additional-property buyer, even though the purchase price itself looks modest.",
      "SDLT, LBTT and LTT can produce different official costs across the UK, and the practical lines still matter. Survey choice, property condition, mortgage fees and moving costs can easily turn a neat early estimate into a tighter real-world budget."
    ]
  },
  {
    slug: "cost-to-buy-275k-house",
    price: 275_000,
    totalRange: "£32,000–£50,000+",
    extraRange: "£5,000–£22,000+",
    taxRange: "£0–£5,000",
    intro:
      "This page gives a quick £275,000 buying-cost estimate for buyers who want the deposit, extra fees and likely total cash target in one place.",
    bestFit:
      "Useful for first-time buyers, home movers and buyers comparing how a £275,000 budget changes across the UK.",
    trustText:
      "Updated for 2026 where the property tax rules and planning ranges on this £275,000 page have been reviewed for budgeting use.",
    varyParagraphs: [
      "At £275,000, the total starts to vary more noticeably because buyer type and planning choices both matter. A first-time buyer, home mover and additional-property buyer can all approach the same price point with different tax treatment and different cash strain.",
      "Regional differences between SDLT, LBTT and LTT affect the official charge, while survey depth, property condition, mortgage fees and moving costs shape the rest of the budget. That is why a £275,000 purchase works best when buyers plan for the full transaction rather than the deposit alone."
    ]
  },
  {
    slug: "cost-to-buy-325k-house",
    price: 325_000,
    totalRange: "£37,000–£55,000+",
    extraRange: "£5,000–£25,000+",
    taxRange: "£0–£10,000",
    intro:
      "This page gives a quick £325,000 buying-cost estimate for buyers who want the deposit, extra fees and likely total cash target in one place.",
    bestFit:
      "Useful for first-time buyers, home movers and buyers comparing how a £325,000 budget changes across the UK.",
    trustText:
      "Updated for 2026 where the property tax rules and planning ranges on this £325,000 page have been reviewed for budgeting use.",
    varyParagraphs: [
      "At £325,000, planning matters more because the deposit is already substantial and the supporting costs are no longer easy to wave away. Buyer type still changes the result, with first-time buyers, home movers and additional-property buyers all facing different versions of the same price point.",
      "SDLT, LBTT and LTT shape the tax line, but survey choice, property condition, mortgage fees and moving costs can still move the final figure enough to matter. A £325,000 purchase usually works best when buyers leave room for variation rather than relying on the cheapest scenario."
    ]
  },
  {
    slug: "cost-to-buy-375k-house",
    price: 375_000,
    totalRange: "£42,000–£60,000+",
    extraRange: "£6,000–£28,000+",
    taxRange: "£0–£15,000",
    intro:
      "This page gives a quick £375,000 buying-cost estimate for buyers who want the deposit, extra fees and likely total cash target in one place.",
    bestFit:
      "Useful for first-time buyers, home movers and buyers comparing how a £375,000 budget changes across the UK.",
    trustText:
      "Updated for 2026 where the property tax rules and planning ranges on this £375,000 page have been reviewed for budgeting use.",
    varyParagraphs: [
      "At £375,000, the difference between a straightforward purchase and a more expensive version of the same move becomes easier to feel in cash terms. Buyer type still matters, because first-time buyers, home movers and additional-property buyers do not all land on the same tax and deposit profile.",
      "Regional tax treatment through SDLT, LBTT and LTT remains important, but surveys, property condition, mortgage fees and moving costs can all lift the total too. That makes realistic planning more useful than relying on the neatest possible estimate."
    ]
  },
  {
    slug: "cost-to-buy-425k-house",
    price: 425_000,
    totalRange: "£48,000–£70,000+",
    extraRange: "£6,000–£30,000+",
    taxRange: "£0–£20,000",
    intro:
      "This page gives a quick £425,000 buying-cost estimate for buyers who want the deposit, extra fees and likely total cash target in one place.",
    bestFit:
      "Useful for first-time buyers, home movers and buyers comparing how a £425,000 budget changes across the UK.",
    trustText:
      "Updated for 2026 where the property tax rules and planning ranges on this £425,000 page have been reviewed for budgeting use.",
    varyParagraphs: [
      "At £425,000, tax starts to have a stronger grip on the total because buyer type makes a bigger cash difference. A first-time buyer may still see a lighter result than a home mover, while an additional-property buyer can face a noticeably heavier upfront bill again.",
      "The official tax line still changes across SDLT, LBTT and LTT, but the purchase can also move because of survey choice, property condition, mortgage fees and moving costs. At this level, those decisions can shift the final number enough to change how comfortable the budget feels."
    ]
  },
  {
    slug: "cost-to-buy-475k-house",
    price: 475_000,
    totalRange: "£54,000–£78,000+",
    extraRange: "£7,000–£32,000+",
    taxRange: "£0–£25,000",
    intro:
      "This page gives a quick £475,000 buying-cost estimate for buyers who want the deposit, extra fees and likely total cash target in one place.",
    bestFit:
      "Useful for first-time buyers, home movers and buyers comparing how a £475,000 budget changes across the UK.",
    trustText:
      "Updated for 2026 where the property tax rules and planning ranges on this £475,000 page have been reviewed for budgeting use.",
    varyParagraphs: [
      "At £475,000, the total is more sensitive because tax treatment, deposit scale and buyer type all start to bite harder. A first-time buyer, home mover and additional-property buyer can all see meaningfully different totals even before practical extras are added.",
      "SDLT, LBTT and LTT still set the official framework, but survey choice, property condition, mortgage fees and moving costs remain important too. On a £475,000 purchase, even ordinary variation across those lines can move the total by several thousand pounds."
    ]
  },
  {
    slug: "cost-to-buy-600k-house",
    price: 600_000,
    totalRange: "£70,000–£100,000+",
    extraRange: "£10,000–£40,000+",
    taxRange: "£0–£35,000+",
    intro:
      "This page gives a quick £600,000 buying-cost estimate for buyers who want the deposit, extra fees and likely total cash target in one place.",
    bestFit:
      "Useful for home movers, higher-budget buyers and anyone comparing how a £600,000 budget changes across the UK.",
    trustText:
      "Updated for 2026 where the property tax rules and planning ranges on this £600,000 page have been reviewed for budgeting use.",
    varyParagraphs: [
      "At £600,000, the total can swing sharply because the official tax line becomes much more influential and buyer type matters more again. First-time buyers, home movers and additional-property buyers can all face materially different upfront cash demands at this price.",
      "Regional tax differences between SDLT, LBTT and LTT remain central, but higher-value homes can also bring more survey caution, property-condition questions, mortgage fees and moving complexity. That makes a £600,000 purchase much more sensitive to planning assumptions than a lower-priced home."
    ]
  },
  {
    slug: "cost-to-buy-750k-house",
    price: 750_000,
    totalRange: "£90,000–£130,000+",
    extraRange: "£15,000–£55,000+",
    taxRange: "£0–£50,000+",
    intro:
      "This page gives a quick £750,000 buying-cost estimate for buyers who want the deposit, extra fees and likely total cash target in one place.",
    bestFit:
      "Useful for higher-budget buyers, movers and anyone comparing how a £750,000 purchase changes across the UK.",
    trustText:
      "Updated for 2026 where the property tax rules and planning ranges on this £750,000 page have been reviewed for budgeting use.",
    varyParagraphs: [
      "At £750,000, the total can move dramatically because tax, buyer type and cash sensitivity all rise together. A first-time buyer, home mover and additional-property buyer can face very different versions of the same purchase price once the full upfront bill is counted.",
      "The official tax result still depends on whether SDLT, LBTT or LTT applies, but the wider transaction can also become more complex. Survey standards, property condition, mortgage fees and moving costs all have more room to shift the total on a premium purchase."
    ]
  }
];

function buildExtraPriceGuide(config: ExtraPriceGuideConfig): GuidePageContent {
  const formattedPrice = formatCurrency(config.price);
  const depositFive = formatCurrency(Math.round(config.price * 0.05));
  const depositTen = formatCurrency(Math.round(config.price * 0.1));
  const depositFifteen = formatCurrency(Math.round(config.price * 0.15));
  const depositTwenty = formatCurrency(Math.round(config.price * 0.2));

  return {
    slug: config.slug,
    title: `Cost to Buy a ${config.price / 1000}k House in the UK`,
    description: `Estimate the cost to buy a ${formattedPrice} house in the UK, including deposit, property tax, legal fees, surveys, mortgage costs, moving costs and the extra cash buyers usually need.`,
    keywords: [
      `cost to buy ${config.price / 1000}k house UK`,
      `how much money needed for ${config.price / 1000}k house UK`,
      `deposit and fees for ${config.price / 1000}k house UK`
    ],
    h1: `Cost to buy a ${formattedPrice} house in the UK`,
    intro: config.intro,
    directAnswer: `The total cost to buy a ${formattedPrice} house in the UK is the deposit plus all upfront costs needed to complete the purchase. A buyer using a 10% deposit would need around ${depositTen} for the deposit, plus several thousand pounds more for legal fees, surveys, mortgage costs, moving and setup.`,
    introSections: [
      {
        title: `Typical cost breakdown for a ${formattedPrice} house`,
        bullets: [
          `10% deposit: ${depositTen}`,
          `Stamp duty or property tax: ${config.taxRange}${config.taxRange === "£0" ? "" : " depending on buyer type"}`,
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
          `${config.totalRange} depending on buyer type, location and assumptions.`,
          `Most buyers should expect their deposit plus ${config.extraRange} in additional upfront costs.`
        ]
      },
      {
        title: "Why the total cost can vary",
        paragraphs: [
          ...config.varyParagraphs,
          "Use the true cost of buying a house calculator to personalise this estimate based on your deposit, buyer type and location."
        ]
      }
    ],
    contextualLinks: sharedContextualLinks,
    contextualLinksSentence:
      "Use the true cost of buying a house calculator, review the hidden costs of buying a house, and check stamp duty explained, mortgage fees and costs, and moving costs in the UK to compare this estimate with your full buying budget.",
    trustReviewedText: config.trustText,
    updatedLabel: "Updated for 2026",
    atGlance: [
      {
        label: "Typical total upfront cash needed",
        value: `About ${config.totalRange} on a ${formattedPrice} purchase, depending on deposit size, buyer type, tax treatment and moving assumptions.`
      },
      {
        label: "Example 10% deposit",
        value: `A 10% deposit is ${depositTen} before legal fees, surveys, mortgage costs and moving are added.`
      },
      {
        label: "Best fit",
        value: config.bestFit
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
        answer: `A 10% deposit is ${depositTen}. A 5% deposit would be ${depositFive}, a 15% deposit would be ${depositFifteen}, and a 20% deposit would be ${depositTwenty}, so the right target depends on mortgage options and how much cash you still need for fees.`
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
        answer: `A practical planning target is about ${config.totalRange} in total upfront cash on a ${formattedPrice} purchase, depending on buyer type, location and assumptions. That range is a planning estimate, not a guaranteed quote.`
      }
    ],
    relatedGuides: sharedRelatedGuides,
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

export const extraPriceGuides = Object.fromEntries(
  extraPriceGuideConfigs.map((config) => [config.slug, buildExtraPriceGuide(config)])
) as Record<string, GuidePageContent>;

