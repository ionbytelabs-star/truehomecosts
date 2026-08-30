import { calculatorCostAssumptionById } from "../data/assumptions/calculator";
import { mortgageFeeConsumerReferences } from "../data/assumptions/mortgageFees";
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
    trustReviewedText:
      `Mortgage-fee figures, regulatory references and calculation methodology were reviewed on ${review.lastReviewedLabel}. The home-buying calculator continues to use data version ${review.calculatorDataVersion}.`
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

  const fullPlanningRange =
    `${formatCurrency(mortgageFeeAssumption.minimum)} to ${formatCurrency(mortgageFeeAssumption.maximum)}`;
  const defaultPlanningAmount = formatCurrency(mortgageFeeAssumption.typical);
  const exampleLow = formatCurrency(getMortgageFee(low));
  const exampleDefault = formatCurrency(getMortgageFee(central));
  const exampleHigh = formatCurrency(getMortgageFee(high));
  const references = mortgageFeeConsumerReferences;

  return reviewedGuide(guide, {
    description:
      "Compare UK mortgage arrangement, product, booking, valuation and broker fees, then check whether a fee-paying or fee-free deal costs less.",
    directAnswer:
      "Mortgage fees are not one fixed UK charge. Depending on the lender and product, you may encounter an arrangement or product fee, booking or application fee, mortgage account fee, valuation charge or broker fee, while some products waive particular charges. The mortgage illustration and product documents show the fees that actually apply to a specific deal.",
    intro:
      `TrueHomeCosts uses an adjustable mortgage-fee planning allowance in its home-buying calculator. Its ${defaultPlanningAmount} typical default is a budgeting input, not a statistically measured UK average and not a claim that every borrower pays ${defaultPlanningAmount}.`,
    introSections: [
      {
        title: "Mortgage fees at a glance",
        paragraphs: [
          "Not every borrower pays every fee below. Product names and bundles vary, fee-free mortgages exist, and a lender may cover its basic valuation. Published figures are category reference points, not amounts to add together as a universal total."
        ],
        table: {
          summary:
            "Common mortgage-related charges, who may charge them and what to verify before choosing a product.",
          caption: "Mortgage fees at a glance",
          columns: ["Fee", "Published reference or treatment", "Who charges it", "What to check"],
          rows: [
            ["Arrangement / product fee", `${references.product.sourceOrganisation}: ${references.product.value} where charged`, "Mortgage lender", "Rate trade-off, payment method and refund terms"],
            ["Booking / application / reservation fee", `${references.booking.sourceOrganisation}: booking fee ${references.booking.value} where charged`, "Mortgage lender", "Whether it is separate, when payable and whether refundable"],
            ["Mortgage account fee", `${references.account.sourceOrganisation}: ${references.account.value} where charged`, "Mortgage lender", "Whether it is bundled with another lender charge"],
            ["Lender valuation", `${references.valuation.sourceOrganisation}: usually lender-paid; ${references.valuation.value} if charged`, "Mortgage lender", "It is for the lender and is not a buyer's condition survey"],
            ["Broker / adviser fee", "Customer fee, lender commission or a combination; no universal range used", "Broker or adviser", "Charging model, payee, timing and cancellation terms"],
            ["Funds transfer / lender administration", `${references.electronicTransfer.sourceOrganisation}: electronic transfer ${references.electronicTransfer.value} where charged`, "Lender or legal professional", "Whether it is already included in the legal quote"],
            ["Exit fee / early repayment charge", "Product-specific; no universal range used", "Existing mortgage lender", "A later or situation-dependent charge, separate from initial buying fees"]
          ]
        },
        callout:
          "Do not total every row as though it were mandatory. Replace planning figures with the lender's illustration, broker agreement and legal quote when available.",
        links: [
          {
            href: references.product.sourceUrl,
            label: `MoneyHelper mortgage-fee benchmarks (verified ${references.product.dateVerified})`
          }
        ]
      }
    ],
    contextualLinks: [
      { href: "/property-survey-costs-uk", label: "property survey costs" },
      { href: "/conveyancing-costs-uk", label: "conveyancing costs" },
      { href: "/#calculator", label: "complete home-buying cost calculator" }
    ],
    contextualLinksSentence:
      "Use the related guides only where the costs genuinely overlap: compare a lender valuation with property survey costs, keep buyer conveyancing costs separate, then transfer the fees that apply to the complete home-buying cost calculator.",
    atGlance: [
      { label: "Published fee ranges", value: "Conditional MoneyHelper category references, not a combined total" },
      { label: "Product source of truth", value: "Your mortgage illustration, tariff and product documents" },
      { label: "TrueHomeCosts planning default", value: `${defaultPlanningAmount}; a budgeting placeholder, not a UK average` },
      { label: "Comparison method", value: "Payments plus remaining balance, so repayment of original principal is not mislabelled as a cost" }
    ],
    sections: [
      {
        title: "Arrangement or product fees",
        paragraphs: [
          "Arrangement fee and product fee commonly describe the lender charge attached to a particular mortgage deal. Fee-free products also exist. A lower headline rate can carry a higher product fee, so a fee-paying deal is not automatically cheaper or more expensive.",
          "The mortgage balance and the period you expect to keep the deal both matter. A small rate saving can outweigh a fee on a larger balance or over a longer period, while the same fee may not be recovered on a smaller mortgage or a short holding period.",
          "A lender may allow the fee to be paid upfront or added to the borrowing. Financing protects cash now but means interest is charged on the added amount. Payment and refund rules vary, so check the mortgage illustration and product terms rather than relying on the fee name alone."
        ],
        callout:
          `${references.product.sourceOrganisation} currently gives ${references.product.value} as its consumer reference for an arrangement or product fee where charged. Fee-free products mean this is not a minimum or an average.`
      },
      {
        title: "Booking, application and reservation fees",
        paragraphs: [
          "Lender terminology is not fully standardised. Booking, reservation and application fee can describe an early charge for reserving a product or processing an application, but lenders may use the labels differently or bundle the work into another charge.",
          `Do not assume every borrower separately pays a booking fee, application fee, reservation fee and arrangement fee. ${references.booking.sourceOrganisation} currently gives ${references.booking.value} for a booking fee where charged. Check what starts when you pay, whether the fee is separate and whether it is refundable if the mortgage does not proceed.`
        ]
      },
      {
        title: "Mortgage account and other lender charges",
        paragraphs: [
          `A mortgage account fee may cover opening or administering the mortgage account. ${references.account.sourceOrganisation} currently gives ${references.account.value} where charged, but a lender may bundle the work or use different terminology.`,
          `A lender or conveyancer may also charge for transferring mortgage funds. ${references.electronicTransfer.sourceOrganisation} gives ${references.electronicTransfer.value} for electronic transfer where charged. Check the lender tariff and legal quote so the same transfer is not budgeted twice.`
        ]
      },
      {
        title: "Mortgage valuation vs a buyer's survey",
        paragraphs: [
          `MoneyHelper says lenders usually cover the basic mortgage valuation, but a borrower may need to budget ${references.valuation.value} where it is charged, depending on the property's value. The lender uses the valuation to decide whether it is willing to lend against the property.`,
          "A lender's mortgage valuation is primarily for the lender's lending and security decision. It is not the same as a buyer's home-condition survey. GOV.UK notes that a valuation may not include a physical inspection and does not protect the buyer if something is wrong with the property."
        ],
        table: {
          caption: "Lender valuation and buyer survey compared",
          columns: ["Service", "Primary purpose", "Main user", "Budget treatment"],
          rows: [
            ["Lender mortgage valuation", "Assess value and suitability as loan security", "Mortgage lender", "May be included or charged by the lender"],
            ["Buyer's home survey", "Assess condition at the chosen survey level", "Home buyer", "Separate survey-cost category"]
          ]
        },
        links: [
          { href: "/property-survey-costs-uk", label: "TrueHomeCosts property survey costs guide" },
          { href: "https://www.gov.uk/government/publications/how-to-buy-a-home/how-to-buy", label: "GOV.UK How to buy a home" }
        ]
      },
      {
        title: "Mortgage broker or adviser fees",
        paragraphs: [
          "A mortgage broker or adviser may charge the customer, receive commission from a lender, or use a combination. The charging and remuneration model should be explained before you proceed, including the amount or calculation basis, when a customer fee becomes payable and what happens if the transaction stops.",
          "Do not assume there is one representative broker-fee range. Check the service agreement and disclosure documents. For regulated mortgage broking, the firm must be FCA-authorised or an appointed representative with relevant permissions; the FCA Firm Checker can help confirm status and permissions."
        ],
        links: [
          { href: "https://www.moneyhelper.org.uk/en/homes/buying-a-home/choosing-a-mortgage-shop-around-or-get-advice", label: "MoneyHelper mortgage adviser guidance" },
          { href: "https://www.fca.org.uk/consumers/how-check-firm-individual-authorised", label: "FCA Firm Checker guidance" }
        ]
      },
      {
        title: "Is a fee-paying mortgage cheaper than a fee-free mortgage?",
        paragraphs: [
          "A lower-rate mortgage with a product fee is not automatically cheaper than a higher-rate fee-free deal, and the reverse is also true. The result depends on the mortgage balance, product fee, rate, comparison period, cashback or incentives and whether the fee is borrowed.",
          "A sound comparison must also allow for the balance left at the end of the selected period. Comparing only monthly payment multiplied by the number of months plus a fee can give the wrong winner because different rates repay principal at different speeds."
        ]
      },
      {
        title: "Paying the fee upfront vs adding it to borrowing",
        paragraphs: [
          "Paying a permitted product fee upfront increases the cash needed now. Adding it to the mortgage reduces the immediate cash payment but increases the starting balance and monthly repayment, so interest is charged on that extra borrowing.",
          "Paying upfront is not an automatic recommendation: preserving cash may matter, and lender terms determine what can be financed. Compare both treatments and check the illustration for the impact on the loan amount, payment and total repayable."
        ]
      },
      {
        title: "What to check in your mortgage illustration",
        paragraphs: [
          "The lender's mortgage illustration or ESIS and product documents are the source of truth for the actual deal. FCA mortgage-disclosure rules require relevant fees and financed charges to be shown, with prescribed treatment for charges added to the borrowing; disclosures also cover intermediary remuneration and later charges such as ERCs where applicable."
        ],
        bullets: [
          "Fee name and what the charge is for",
          "Amount, payee and when it becomes payable",
          "Whether the amount is an estimate",
          "Whether it is refundable, and under what conditions",
          "Whether the fee can be added to borrowing",
          "The resulting loan balance and payment if it is financed",
          "Any cashback or incentive that could have to be repaid",
          "Early repayment charges and other exit costs outside this calculator"
        ],
        links: [
          { href: "https://handbook.fca.org.uk/handbook/mcob5/mcob5s6", label: "FCA Handbook: content of mortgage illustrations" }
        ]
      },
      {
        title: "Interest rate vs APRC vs this calculator",
        paragraphs: [
          "The headline interest rate is the rate charged on the mortgage balance; it does not show every product cost. APRC is a regulated annualised comparison measure with defined assumptions and relevant charges across the mortgage term.",
          "This TrueHomeCosts tool is not an APRC calculator or a regulated illustration. It compares the costs you enter over a selected period under stated repayment assumptions. Use it alongside, not instead of, the lender's illustration or ESIS."
        ],
        links: [
          { href: "https://www.fca.org.uk/news/statements/annual-percentage-rate-charge-aprc-calculations", label: "FCA explanation of mortgage APRC" }
        ]
      },
      {
        title: "Are mortgage fees refundable if the purchase falls through?",
        paragraphs: [
          "It depends on the lender, fee type, product terms and stage reached. MoneyHelper advises checking whether booking and arrangement fees are refundable if the mortgage does not go ahead.",
          "Apply the same caution to valuation, broker and legal charges. Check each agreement before paying: the fee name alone does not prove it will always be refunded or always retained."
        ]
      },
      {
        title: "Legal costs are separate from mortgage fees",
        paragraphs: [
          "Buyer conveyancing and legal costs are a separate TrueHomeCosts category. A mortgage can create lender-related legal requirements, and some products include a standard legal service or incentive with limits, but that does not make the buyer's full conveyancing work a mortgage fee.",
          "Check what the lender includes and what the conveyancer quotes separately. Keep the mortgage-fee allowance and buyer legal budget distinct to avoid omissions or double counting."
        ],
        links: [
          { href: "/conveyancing-costs-uk", label: "TrueHomeCosts conveyancing costs guide" }
        ]
      },
      {
        title: "Remortgage, exit and early repayment charges",
        paragraphs: [
          "Changing an existing mortgage may involve a new product fee. The current mortgage may also have an early repayment charge if it is repaid, switched or overpaid beyond the terms, and an exit or account-closure fee may apply.",
          "These are later or situation-dependent costs and are not modelled by the comparison calculator. Check the existing lender's redemption statement and the new product documents separately."
        ]
      },
      {
        title: "TrueHomeCosts mortgage-fee planning allowance",
        paragraphs: [
          `The complete home-buying calculator uses one adjustable mortgage-fee planning allowance of ${fullPlanningRange} across its property-price bands. Its ${defaultPlanningAmount} typical default is a planning placeholder, not a statistically measured UK average.`,
          `For the £300,000 example band, the shared model produces ${exampleLow} low, ${exampleDefault} typical default and ${exampleHigh} high. Replace those values with the total charges in your mortgage illustration, broker documentation and legal quote once known.`
        ],
        table: {
          caption: "Mortgage-fee planning allowance for a £300,000 example",
          columns: ["Planning level", "Allowance", "How to use it"],
          rows: [
            ["Low", exampleLow, "Lower combined planning allowance for this property-price band"],
            ["Typical default", exampleDefault, "Starting placeholder only; not a measured UK average"],
            ["High", exampleHigh, "Higher combined planning allowance for this property-price band"]
          ]
        },
        cta: {
          href: "/#calculator",
          label: "Open the complete home-buying calculator",
          description:
            "Transfer the fees that actually apply to your wider deposit, tax, legal, survey and moving budget."
        },
        callout:
          "General budgeting information only. This page does not recommend a mortgage product or provide personalised mortgage advice."
      }
    ],
    faqs: [],
    relatedGuides: ["property-survey-costs-uk", "conveyancing-costs-uk", "costs-before-completion"],
    ctaTitle: "Add the real fees to your full buying budget",
    ctaText:
      "Replace the planning placeholder with the charges shown in your mortgage illustration, broker agreement and legal quote.",
    officialSourceKeys: [
      "fcaMortgageIllustration",
      "fcaMortgageAprc",
      "fcaMortgageBrokerAuthorisation",
      "fcaFirmChecker",
      "govUkBuyingAHome"
    ],
    sourceKeys: ["moneyHelperBuyingMoving", "moneyHelperMortgageAdvice"],
    officialItems: ["lender-published product fees, mortgage illustration terms and FCA-regulated disclosures"],
    estimateItems: ["TrueHomeCosts combined planning allowance and conditional consumer fee benchmarks"],
    mistakes: [
      "Comparing rates without product fees or the remaining balance",
      "Treating a lender valuation as a buyer's survey",
      "Adding a fee to borrowing without allowing for interest",
      "Assuming an early fee will be refunded",
      "Ignoring early repayment and exit charges"
    ],
    checklist: [
      "Read the mortgage illustration and lender tariff",
      "Confirm how the broker is paid and when any customer fee is due",
      "Check every refund and cancellation term before paying",
      "Compare the rate, fees, incentives and relevant deal-period cost",
      "Keep the lender valuation separate from the buyer's survey",
      "Replace planning placeholders with current written figures"
    ]
  });
}
