export const sourceLinks = {
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
    href: "https://www.gov.uk/government/publications/registration-services-fees"
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
