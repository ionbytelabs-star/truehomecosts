export const sourceLinks = {
  govUkSdltGuide: {
    label: "GOV.UK Stamp Duty Land Tax guidance",
    href: "https://www.gov.uk/stamp-duty-land-tax"
  },
  moneyHelperBuyingMoving: {
    label: "MoneyHelper guide to buying and moving costs",
    href: "https://www.moneyhelper.org.uk/en/homes/buying-a-home/estimate-your-overall-buying-and-moving-costs"
  },
  moneyHelperConveyancing: {
    label: "MoneyHelper guide to comparing solicitors and conveyancers",
    href: "https://www.moneyhelper.org.uk/en/homes/buying-a-home/find-the-right-solicitor-or-conveyancer"
  },
  sraPriceTransparency: {
    label: "Solicitors Regulation Authority price-transparency guidance",
    href: "https://www.sra.org.uk/price/"
  },
  govUkBuyingConveyancing: {
    label: "GOV.UK home-buying conveyancing guidance",
    href: "https://www.gov.uk/buying-a-home/transferring-ownership"
  },
  moneyHelperHomeBuying: {
    label: "MoneyHelper home buying guidance",
    href: "https://www.moneyhelper.org.uk/en/homes/buying-a-home"
  },
  moneyHelperMortgageAdvice: {
    label: "MoneyHelper guidance on using a mortgage adviser",
    href: "https://www.moneyhelper.org.uk/en/homes/buying-a-home/choosing-a-mortgage-shop-around-or-get-advice"
  },
  fcaFirmChecker: {
    label: "FCA guidance on checking a financial firm is authorised",
    href: "https://www.fca.org.uk/consumers/how-check-firm-individual-authorised"
  },
  fcaMortgageAprc: {
    label: "FCA explanation of mortgage APRC and relevant charges",
    href: "https://www.fca.org.uk/news/statements/annual-percentage-rate-charge-aprc-calculations"
  },
  fcaMortgageIllustration: {
    label: "FCA Handbook requirements for mortgage illustrations and fees",
    href: "https://handbook.fca.org.uk/handbook/mcob5/mcob5s6"
  },
  fcaMortgageBrokerAuthorisation: {
    label: "FCA mortgage broker authorisation and disclosure requirements",
    href: "https://www.fca.org.uk/firms/authorisation/mortgage-brokers"
  },
  govUkBuyingAHome: {
    label: "GOV.UK guide to buying a home, valuations and surveys",
    href: "https://www.gov.uk/government/publications/how-to-buy-a-home/how-to-buy"
  },
  moneySavingExpertMortgageFees: {
    label: "MoneySavingExpert guide to mortgage and home-buying fees",
    href: "https://www.moneysavingexpert.com/mortgages/mortgage-fees-stamp-duty/"
  },
  ricsHouseSurveys: {
    label: "RICS consumer guide to house surveys",
    href: "https://www.rics.org/consumer-guides/house-surveys-uk-the-costs-types-and-benefits-of-an-rics-home-survey"
  },
  ricsHomeSurveyStandard: {
    label: "RICS Home Survey Standard and current survey levels",
    href: "https://www.rics.org/profession-standards/rics-standards-and-guidance/sector-standards/building-surveying-standards/home-surveys"
  },
  revenueScotlandLbttGuide: {
    label: "Revenue Scotland LBTT guidance",
    href: "https://revenue.scot/taxes/land-buildings-transaction-tax"
  },
  govWalesLttGuide: {
    label: "GOV.WALES Land Transaction Tax guidance",
    href: "https://www.gov.wales/land-transaction-tax-return-guidance-contents"
  },
  fcaConsumers: {
    label: "FCA consumer guidance on financial services and authorised firms",
    href: "https://www.fca.org.uk/consumers"
  },
  sdlt: {
    label: "HMRC SDLT residential property rates",
    href: "https://www.gov.uk/stamp-duty-land-tax/residential-property-rates"
  },
  lbtt: {
    label: "Revenue Scotland LBTT residential rates and bands",
    href: "https://revenue.scot/taxes/land-buildings-transaction-tax/residential-property"
  },
  lbttAds: {
    label: "Revenue Scotland Additional Dwelling Supplement guidance",
    href: "https://www.revenue.scot/taxes/land-buildings-transaction-tax/additional-dwelling-supplement-ads"
  },
  ltt: {
    label: "Welsh Revenue Authority LTT rates and bands",
    href: "https://www.gov.wales/land-transaction-tax-rates-and-bands"
  },
  hmlr: {
    label: "HM Land Registry registration service fees",
    href: "https://www.gov.uk/guidance/hm-land-registry-registration-services-fees"
  },
  ros: {
    label: "Registers of Scotland registration fees",
    href: "https://kb.ros.gov.uk/fees/registration-fees"
  },
  lpsNi: {
    label: "Land & Property Services Northern Ireland fee guidance",
    href: "https://www.finance-ni.gov.uk/publications/land-registry-and-registry-deeds-fees-guides"
  },
  lisa: {
    label: "GOV.UK Lifetime ISA guidance",
    href: "https://www.gov.uk/lifetime-isa"
  },
  rightToBuy: {
    label: "GOV.UK Right to Buy overview",
    href: "https://www.gov.uk/right-to-buy-buying-your-council-home"
  },
  helpToBuy: {
    label: "GOV.UK Help to Buy: Equity Loan guidance",
    href: "https://www.gov.uk/help-to-buy-equity-loan"
  },
  sharedOwnership: {
    label: "GOV.UK Shared Ownership guidance",
    href: "https://www.gov.uk/shared-ownership-scheme"
  },
  councilTax: {
    label: "GOV.UK Council Tax information",
    href: "https://www.gov.uk/council-tax"
  }
} as const;

export type SourceKey = keyof typeof sourceLinks;
