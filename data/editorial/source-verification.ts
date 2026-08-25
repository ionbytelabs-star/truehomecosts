export const officialSourceVerification = [
  {
    sourceName: "HM Revenue & Customs",
    sourceUrl: "https://www.gov.uk/stamp-duty-land-tax/residential-property-rates",
    dateChecked: "2026-07-19",
    jurisdiction: "England and Northern Ireland",
    verified: "SDLT standard bands, first-time buyer relief and the 5% additional-property surcharge"
  },
  {
    sourceName: "Revenue Scotland",
    sourceUrl: "https://revenue.scot/taxes/land-buildings-transaction-tax/residential-property",
    dateChecked: "2026-07-19",
    jurisdiction: "Scotland",
    verified: "LBTT bands and the first-time buyer nil-rate threshold"
  },
  {
    sourceName: "Revenue Scotland",
    sourceUrl: "https://revenue.scot/taxes/land-buildings-transaction-tax/additional-dwelling-supplement-ads",
    dateChecked: "2026-07-19",
    jurisdiction: "Scotland",
    verified: "8% Additional Dwelling Supplement for relevant transactions"
  },
  {
    sourceName: "Welsh Revenue Authority",
    sourceUrl: "https://www.gov.wales/land-transaction-tax-rates-and-bands",
    dateChecked: "2026-07-19",
    jurisdiction: "Wales",
    verified: "Main and higher residential LTT bands"
  },
  {
    sourceName: "HM Land Registry",
    sourceUrl: "https://www.gov.uk/guidance/hm-land-registry-registration-services-fees",
    dateChecked: "2026-08-25",
    jurisdiction: "England and Wales",
    verified: "Scale 1 and Scale 2 registration fee bands and supported submission routes"
  },
  {
    sourceName: "Registers of Scotland",
    sourceUrl: "https://kb.ros.gov.uk/fees/registration-fees",
    dateChecked: "2026-08-25",
    jurisdiction: "Scotland",
    verified: "Disposition registration fee bands"
  },
  {
    sourceName: "Land & Property Services Northern Ireland",
    sourceUrl: "https://www.finance-ni.gov.uk/publications/land-registry-and-registry-deeds-fees-guides",
    dateChecked: "2026-08-25",
    jurisdiction: "Northern Ireland",
    verified: "2014 Land Registry electronic transfer scale; proposed 2027 changes are not yet in force"
  }
] as const;
