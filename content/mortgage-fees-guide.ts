import { calculatorCostAssumptionById } from "../data/assumptions/calculator";
import { getPageReview } from "../data/editorial/reviews";
import { calculateUpfrontCosts, type CalculatorInput } from "../lib/calculator";
import { formatCurrency } from "../lib/format";

import type { GuidePageContent } from "./types";

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

export function mortgageFeesGuide(guide: GuidePageContent): GuidePageContent {
  const low = calculateUpfrontCosts(baseInput({ assumptionLevel: "low" }));
  const central = calculateUpfrontCosts(baseInput({ assumptionLevel: "average" }));
  const high = calculateUpfrontCosts(baseInput({ assumptionLevel: "high" }));
  const getMortgageFee = (result: typeof low) =>
    result.breakdown.find((line) => line.key === "mortgage-fees")?.value ?? 0;
  const mortgageFeeAssumption = calculatorCostAssumptionById.get("mortgage-fees");

  if (
    !mortgageFeeAssumption ||
    mortgageFeeAssumption.minimum === undefined ||
    mortgageFeeAssumption.typical === undefined ||
    mortgageFeeAssumption.maximum === undefined
  ) {
    throw new Error("Missing shared mortgage-fee planning values");
  }

  const fullPlanningRange = `${formatCurrency(mortgageFeeAssumption.minimum)} to ${formatCurrency(mortgageFeeAssumption.maximum)}`;
  const defaultPlanningAmount = formatCurrency(mortgageFeeAssumption.typical);
  const exampleLow = formatCurrency(getMortgageFee(low));
  const exampleDefault = formatCurrency(getMortgageFee(central));
  const exampleHigh = formatCurrency(getMortgageFee(high));

  return reviewedGuide(guide, {
    intro:
      "Mortgage products can include several lender, valuation, broker and legal charges, but not every fee applies to every mortgage. Names also vary between lenders, so use the mortgage illustration and product documents for the charges that apply to your deal.",
    directAnswer:
      `There is no universal total or reliable single average for UK mortgage fees. TrueHomeCosts uses one adjustable combined planning allowance of ${fullPlanningRange} across its property-price bands, with a ${defaultPlanningAmount} typical default. This is a budgeting input, not a claim that every borrower pays every fee listed below.`,
    introSections: [
      {
        title: "Mortgage fees at a glance",
        paragraphs: [
          "Some mortgages have no arrangement or product fee, lenders may include a basic valuation, and broker charging models differ. The external figures below are consumer reference points, not amounts to add together automatically.",
          `The main buying-cost calculator therefore uses one adjustable mortgage-fee allowance. Its ${fullPlanningRange} range covers the shared model's property-price bands; the ${defaultPlanningAmount} figure is a typical default, not a statistically measured UK average.`
        ],
        table: {
          summary:
            "This table separates common lender, broker and later mortgage charges, showing published consumer benchmarks only where a current source provides one.",
          caption: "Mortgage fees at a glance",
          columns: [
            "Fee type",
            "Current consumer reference / treatment",
            "Who charges it",
            "When it may apply",
            "Notes"
          ],
          rows: [
            ["Arrangement / product fee", "MoneyHelper: £1,000 to £2,000+ where charged", "Mortgage lender", "For access to or setup of a particular product", "Fee-free products also exist; payment and refund terms vary"],
            ["Booking / reservation / application fee", "MoneyHelper: booking fee £100 to £200 where charged", "Mortgage lender", "When reserving a product or submitting an application", "Lenders do not use these names consistently; check whether it is separate"],
            ["Mortgage account fee", "MoneyHelper: £100 to £300 where charged", "Mortgage lender", "For opening or administering the mortgage account", "May be bundled with another lender charge"],
            ["Lender valuation", "MoneyHelper: often lender-paid; £150 to £800 if charged", "Mortgage lender", "Before the lender approves lending against the property", "Protects the lender and is not a buyer's condition survey"],
            ["Mortgage broker / adviser fee", "Customer fee, lender commission or a combination", "Broker or adviser", "Under the service agreement, sometimes at application, offer or completion", "The charging model and cost should be disclosed before proceeding"],
            ["Lender-related legal / funds-transfer fee", "Product- or quote-specific; MoneyHelper gives £25 to £50 for electronic transfer where charged", "Lender or legal professional", "For lender requirements or moving mortgage funds", "Keep buyer conveyancing costs as a separate budget category"],
            ["Exit fee / early repayment charge (ERC)", "Product-specific; no universal range used here", "Existing mortgage lender", "On repayment, switching or excess overpayment if the terms trigger it", "A later or situation-dependent cost, not part of the initial buying allowance"]
          ]
        },
        callout:
          "Do not total every row as though it were mandatory. Replace the calculator allowance with the lender's illustration, broker agreement and legal quote when those figures are available.",
        links: [
          { href: "https://www.moneyhelper.org.uk/en/homes/buying-a-home/estimate-your-overall-buying-and-moving-costs", label: "MoneyHelper mortgage-fee benchmarks" },
          { href: "https://www.moneysavingexpert.com/mortgages/mortgage-fees-stamp-duty/", label: "MoneySavingExpert mortgage-fee context" }
        ]
      }
    ],
    contextualLinks: [
      { href: "/#calculator", label: "main house-buying cost calculator" },
      { href: "/hidden-costs-buying-house", label: "full hidden-cost budget" },
      { href: "/costs-before-completion", label: "costs paid before completion" },
      { href: "/property-survey-costs-uk", label: "property survey costs" },
      { href: "/conveyancing-costs-uk", label: "conveyancing costs" }
    ],
    atGlance: [
      { label: "Calculator planning allowance", value: `${fullPlanningRange} across all property-price bands` },
      { label: "Typical default", value: `${defaultPlanningAmount}; this is a model input, not an observed market average` },
      { label: "£300,000 example", value: `${exampleLow} low, ${exampleDefault} default, ${exampleHigh} high` },
      { label: "What the allowance means", value: "One adjustable planning category, replaced by written product-specific costs when known" }
    ],
    sections: [
      {
        title: "How much are mortgage fees in the UK?",
        paragraphs: [
          "The answer depends on the product and which services apply. Some mortgages have no product fee, some lenders include a basic valuation, brokers may or may not charge the customer, and later charges such as an ERC arise only in particular circumstances.",
          "That is why TrueHomeCosts does not publish a universal average total. It separates its combined planning allowance from actual product documents and external category benchmarks."
        ],
        table: {
          caption: "Three different mortgage-fee figures and how to use them",
          columns: ["Figure", "Current value or treatment", "What it means"],
          rows: [
            ["TrueHomeCosts calculator allowance", `${fullPlanningRange} across the model; typical default ${defaultPlanningAmount}`, "One combined adjustable budget category, not a mandatory fee total"],
            ["Individual product charges", "The amounts in the lender's illustration, tariff and product documents", "The fees that actually apply, including timing, refundability and whether borrowing is permitted"],
            ["External consumer benchmarks", "MoneyHelper category ranges shown in the at-a-glance table", "Reference points for individual fee types, not values to sum automatically"]
          ]
        },
        afterParagraphs: [
          "The figures do not match exactly because products package charges differently. A fee-free mortgage can have no arrangement fee; a lender may pay for the valuation; a broker can charge separately; and a buyer does not necessarily pay every category."
        ]
      },
      {
        title: "Mortgage application, booking and arrangement fees: what's the difference?",
        paragraphs: [
          "Lender terminology is not perfectly standardised. Arrangement fee and product fee commonly describe the charge for a selected deal. Booking, reservation and application fee can describe an early charge for reserving a product or processing an application, but a lender may use the labels differently or bundle the work.",
          "Do not assume all these fees will be charged separately. For each product, check the written illustration and product documents for the fee's name, amount, payment date, refund terms and whether the lender allows it to be added to the mortgage."
        ],
        table: {
          caption: "Arrangement, booking, application and account fee terminology",
          columns: ["Term", "Common use", "What to verify"],
          rows: [
            ["Arrangement / product fee", "Charge linked to setting up or accessing a mortgage product", "When it is payable, refundable and permitted to be borrowed"],
            ["Booking / reservation / application fee", "Early product reservation or application-processing charge", "Whether it is separate, what work starts and the refund position"],
            ["Mortgage account fee", "Opening or administering the mortgage account", "Whether it is bundled with another lender fee"]
          ]
        }
      },
      {
        title: "How much is a mortgage valuation fee?",
        paragraphs: [
          "MoneyHelper says lenders usually cover the basic mortgage valuation, but a borrower may need to budget £150 to £800 where it is charged, depending on the property's value. The lender uses the valuation to assess the property's value and suitability as security; the price can vary by lender, product and property.",
          "A lender valuation is not a full buyer condition survey. GOV.UK makes the same distinction: the mortgage provider's valuation supports its lending decision, while a home survey is commissioned to help the buyer understand the property's condition."
        ],
        table: {
          caption: "Mortgage valuation vs house survey",
          columns: ["Service", "Main purpose", "Main user", "Planning treatment"],
          rows: [
            ["Lender mortgage valuation", "Assess value and suitability as loan security", "Mortgage lender", "May be included or charged by the lender"],
            ["Buyer's home survey", "Assess property condition at the selected survey level", "Home buyer", "Separate survey-cost category"]
          ]
        },
        links: [
          { href: "/property-survey-costs-uk", label: "TrueHomeCosts property survey costs guide" },
          { href: "https://www.gov.uk/government/publications/how-to-buy-a-home/how-to-buy", label: "GOV.UK How to buy a home guide" },
          { href: "https://www.rics.org/consumer-guides/house-surveys-uk-the-costs-types-and-benefits-of-an-rics-home-survey", label: "RICS home survey guide" }
        ]
      },
      {
        title: "Mortgage broker fees",
        paragraphs: [
          "A mortgage broker may charge the customer a fee, receive commission from a lender, or use a combination. MoneyHelper says the adviser should explain beforehand how they will be paid and all costs involved; if a fee is added to the mortgage with your agreement, interest is charged on that extra borrowing.",
          "A firm carrying out regulated mortgage-broking activity must be FCA-authorised or an appointed representative with the relevant permissions. Check the firm and read its disclosure and service terms, including when a fee becomes payable and what happens if the transaction does not proceed."
        ],
        links: [
          { href: "https://www.moneyhelper.org.uk/en/homes/buying-a-home/choosing-a-mortgage-shop-around-or-get-advice", label: "MoneyHelper mortgage adviser guidance" },
          { href: "https://www.fca.org.uk/consumers/how-check-firm-individual-authorised", label: "FCA Firm Checker guidance" }
        ]
      },
      {
        title: "Is a mortgage with a fee cheaper than a fee-free mortgage?",
        paragraphs: [
          "A lower-rate mortgage with a product fee is not automatically cheaper than a slightly higher-rate no-fee deal, and the reverse is also true. The result depends on the mortgage balance, fee, interest rate, length of the introductory or fixed period, cashback or incentives, whether the fee is borrowed and how long the borrower expects to keep the deal.",
          "Compare the total cost relevant to your circumstances rather than only the headline rate. Product illustrations can support that comparison, but no single product structure is always cheapest."
        ]
      },
      {
        title: "Should you pay the mortgage fee upfront or add it to the loan?",
        paragraphs: [
          "Paying a permitted fee upfront increases the cash needed now. Adding it to the mortgage reduces the immediate cash payment but increases the amount borrowed, so interest is charged on that additional balance.",
          "Not every fee can be added to every mortgage. The lender's illustration should show how the fee is treated and how it affects the monthly payment and total amount repayable."
        ]
      },
      {
        title: "Interest rate vs APRC vs mortgage fees",
        paragraphs: [
          "The headline interest rate is the rate charged on the mortgage balance; it does not by itself show every mortgage cost. The FCA describes APRC as an annualised measure of the mortgage's lifetime cost that incorporates relevant charges, including fees related to the borrowing.",
          "APRC can help compare disclosures prepared on a consistent basis, but it does not by itself identify the best mortgage for an individual's circumstances. The initial deal period, likely holding period, monthly payments and product-specific fees still matter."
        ],
        links: [
          { href: "https://www.fca.org.uk/news/statements/annual-percentage-rate-charge-aprc-calculations", label: "FCA explanation of mortgage APRC" }
        ]
      },
      {
        title: "Are mortgage fees refundable if the purchase falls through?",
        paragraphs: [
          "It depends on the lender, fee type, product terms and stage reached. MoneyHelper advises checking whether booking and arrangement fees are refundable if the mortgage does not go ahead.",
          "The same caution applies to valuation, broker and legal charges: check each agreement before paying. A fee name alone does not prove that it will always be refunded or always retained."
        ]
      },
      {
        title: "Are legal fees included in mortgage fees?",
        paragraphs: [
          "Buyer conveyancing and legal costs are normally a separate TrueHomeCosts category. A mortgage can also create lender-related legal requirements, and some purchase or remortgage products include a standard legal service or incentive with limits.",
          "Check what the lender's product includes and what the conveyancer quotes separately. Do not mix the calculator's mortgage-fee allowance with the full buyer conveyancing budget."
        ],
        links: [
          { href: "/conveyancing-costs-uk", label: "TrueHomeCosts conveyancing costs guide" },
          { href: "/costs-before-completion", label: "TrueHomeCosts payment timing guide" }
        ]
      },
      {
        title: "Remortgage, early repayment and exit fees",
        paragraphs: [
          "Changing an existing mortgage may involve a new product or setup fee. The current mortgage may also have an early repayment charge if it is repaid, switched or overpaid beyond the terms, and an exit or account-closure fee may apply.",
          "These are later or situation-dependent costs. They are not the same as the initial home-buying mortgage-fee planning allowance, so check the existing lender's redemption statement and the new product documents separately."
        ]
      },
      {
        title: "Worked £300,000 mortgage-fee planning example",
        paragraphs: [
          `For a £300,000 England home-mover case, the production calculator selects the shared mortgage-fee band shown below. The ${exampleDefault} default is one adjustable planning category; it is not a mandatory sum of arrangement, booking, valuation, broker and account fees.`,
          "Replace the allowance with the total of the charges that actually apply in the lender's illustration, broker agreement and legal quote. The example updates automatically when the shared calculator source changes."
        ],
        table: {
          caption: "Calculator-derived mortgage-fee allowance for a £300,000 example",
          columns: ["Planning level", "Allowance", "How to use it"],
          rows: [
            ["Low", exampleLow, "Lower combined allowance for the selected property-price band"],
            ["Typical default", exampleDefault, "Starting input only; not a measured UK average"],
            ["High", exampleHigh, "Higher combined allowance for the selected property-price band"]
          ]
        },
        afterParagraphs: [
          `The homepage's ${fullPlanningRange} display summarises the minimum and maximum across every property-price band. The ${exampleLow} to ${exampleHigh} figures above are the narrower band selected at £300,000; both come from the same source of truth.`
        ],
        callout:
          "This is general budgeting information, not personalised mortgage advice or a recommendation."
      }
    ],
    faqs: [
      { question: "How much are mortgage fees in the UK?", answer: `There is no universal total. TrueHomeCosts uses one adjustable combined planning allowance of ${fullPlanningRange}, with a ${defaultPlanningAmount} typical default, while actual product charges come from the lender's illustration and other written agreements.` },
      { question: "What is a mortgage arrangement or product fee?", answer: "It is a lender charge linked to setting up or accessing a particular mortgage product. MoneyHelper gives £1,000 to £2,000+ where charged, but fee-free products also exist and payment terms vary." },
      { question: "Is a mortgage application fee the same as a booking fee?", answer: "Not necessarily. Booking, reservation and application labels can be used differently or bundled by lenders, so check the product documents for the charge, timing and refund terms." },
      { question: "How much is a mortgage valuation fee?", answer: "MoneyHelper says lenders usually pay for the basic valuation, but a borrower may need to budget £150 to £800 where it is charged. It is for the lender and is not a buyer's condition survey." },
      { question: "Can you add a mortgage arrangement fee to the mortgage?", answer: "Sometimes, if the lender permits it. This reduces the immediate cash payment but increases the amount borrowed, so interest is charged on the added fee." },
      { question: "Are mortgage fees refundable if the purchase falls through?", answer: "It depends on the lender, fee type, terms and stage reached. Check the refund rules for booking, arrangement, valuation, broker and legal charges separately before paying." },
      { question: "Is a fee-free mortgage always cheaper?", answer: "No. Compare the product fee, interest rate, mortgage balance, deal period, incentives and whether any fee is borrowed. Neither a fee-paying nor a fee-free structure is always cheapest." }
    ],
    showFaqAnswersExpanded: true,
    faqBeforeSources: true,
    showInlineCalculatorCta: false,
    relatedGuides: [
      "hidden-costs-buying-house",
      "costs-before-completion",
      "property-survey-costs-uk",
      "conveyancing-costs-uk"
    ],
    ctaTitle: "Add mortgage fees to your full buying budget",
    ctaText:
      "Use the main house-buying cost calculator for a planning allowance, then replace its mortgage-fee estimate with the current fees shown in your mortgage illustration, broker agreement and legal quote.",
    officialSourceKeys: [
      "fcaMortgageAprc",
      "fcaMortgageBrokerAuthorisation",
      "fcaFirmChecker",
      "govUkBuyingAHome",
      "ricsHouseSurveys"
    ],
    sourceKeys: [
      "moneyHelperBuyingMoving",
      "moneyHelperMortgageAdvice",
      "moneySavingExpertMortgageFees"
    ],
    officialItems: ["lender-published product fees, mortgage illustration terms and FCA-regulated disclosures"],
    estimateItems: ["TrueHomeCosts combined planning allowance and external consumer fee benchmarks"],
    mistakes: [
      "Comparing interest rates without product fees",
      "Treating a lender valuation as a buyer's survey",
      "Adding a fee to the mortgage without allowing for interest",
      "Assuming an early fee will be refunded",
      "Ignoring early repayment and exit charges"
    ],
    checklist: [
      "Read the mortgage illustration and lender tariff",
      "Confirm how the broker is paid and when its fee becomes due",
      "Check every refund and cancellation term before paying",
      "Compare the rate, APRC, fees and relevant deal-period cost",
      "Keep the lender valuation separate from the buyer's survey",
      "Replace the combined planning allowance with current written figures"
    ]
  });
}
