export const ongoingHomeCostReview = {
  date: "2026-08-03",
  label: "3 August 2026",
  changeNote:
    "August 2026: reviewed council-tax, utility, insurance and maintenance assumptions; added monthly and annual worked examples and clearer UK nation guidance."
} as const;

export const illustrativeMonthlyCosts = {
  councilTaxOrRates: 180,
  gasAndElectricity: 180,
  water: 40,
  broadbandCommunications: 40,
  buildingsInsurance: 20,
  contentsInsurance: 15,
  maintenanceReserve: 150,
  serviceCharge: 200
} as const;

export const freeholdMonthlyTotal =
  illustrativeMonthlyCosts.councilTaxOrRates +
  illustrativeMonthlyCosts.gasAndElectricity +
  illustrativeMonthlyCosts.water +
  illustrativeMonthlyCosts.broadbandCommunications +
  illustrativeMonthlyCosts.buildingsInsurance +
  illustrativeMonthlyCosts.contentsInsurance +
  illustrativeMonthlyCosts.maintenanceReserve;

export const managedMonthlyTotal = freeholdMonthlyTotal + illustrativeMonthlyCosts.serviceCharge;
export const freeholdAnnualTotal = freeholdMonthlyTotal * 12;
export const managedAnnualTotal = managedMonthlyTotal * 12;

export const ongoingHomeCostFaqs = [
  {
    question: "How much does it cost to own a home each month in the UK?",
    answer:
      "A practical worked non-mortgage budget in this guide is £625 a month, or £7,500 a year. It is an illustrative planning figure rather than a UK average, and mortgage repayments are additional."
  },
  {
    question: "What bills do homeowners pay each month?",
    answer:
      "Homeowners commonly pay a mortgage, council tax or domestic rates, energy, water, broadband, insurance and a maintenance reserve. Service charges, estate charges and other property-specific costs may also apply."
  },
  {
    question: "How much should homeowners budget for maintenance?",
    answer:
      "There is no single official maintenance amount, so use a property-specific sinking fund. This guide uses £150 a month as a TrueHomeCosts planning assumption, but an older, larger or poorly maintained home may need more."
  },
  {
    question: "Are service charges included in the cost of owning a flat?",
    answer:
      "Yes, service charges should be included when they apply. Check the lease, recent accounts, budget, reserve fund and planned works because the amount and services covered vary significantly."
  },
  {
    question: "Is buildings insurance included in a service charge?",
    answer:
      "It often is for a leasehold flat, but you must check the lease and service-charge documents. If it is included, do not add a separate buildings-insurance premium to the same budget."
  },
  {
    question: "What is the annual cost of owning a home excluding the mortgage?",
    answer:
      "The freehold worked example in this guide is £7,500 a year excluding the mortgage. Adding an illustrative £200 monthly service or estate charge produces £9,900 a year, but neither figure is a national average."
  },
  {
    question: "Do homeowners pay council tax in every part of the UK?",
    answer:
      "No. Council tax applies in England, Scotland and Wales, while Northern Ireland uses domestic rates. Discounts, reductions, bands and local charges depend on the relevant national and local rules."
  },
  {
    question: "What unexpected costs should homeowners budget for?",
    answer:
      "Homeowners should budget for repairs, appliance replacement, boiler servicing, insurance excesses and exterior maintenance. Leaseholders may also face reserve-fund contributions or major works demands."
  },
  {
    question: "How do I calculate my own monthly homeownership costs?",
    answer:
      "Add your mortgage to council tax or rates, utilities, insurance, service or estate charges and other recurring bills, then divide annual irregular costs by 12. The estimator on this page performs that calculation and separates mortgage and non-mortgage totals."
  }
];

export const ongoingHomeCostSources = [
  {
    label: "GOV.UK: How Council Tax works",
    href: "https://www.gov.uk/council-tax",
    supports: "Council-tax bands, local charges, discounts and exemptions in England, Wales and Scotland."
  },
  {
    label: "Ofgem: energy price-cap unit rates and standing charges",
    href: "https://www.ofgem.gov.uk/information-consumers/energy-advice-households/energy-price-cap-unit-rates-and-standing-charges",
    supports: "The Great Britain price-cap framework and its coverage of England, Scotland and Wales."
  },
  {
    label: "Ofwat: your household water bill",
    href: "https://www.ofwat.gov.uk/households/your-water-bill/",
    supports: "How water and sewerage bills in England and Wales vary by company, location and charging method."
  },
  {
    label: "Scottish Government: water charging principles",
    href: "https://www.gov.scot/policies/water/water-charges-and-exemptions/",
    supports: "Domestic water and sewerage charges are generally collected by local authorities with council tax."
  },
  {
    label: "nidirect: properties you pay rates on",
    href: "https://www.nidirect.gov.uk/articles/properties-you-pay-rates",
    supports: "Domestic rates as the residential property tax used in Northern Ireland."
  },
  {
    label: "Utility Regulator: Northern Ireland energy and water regulation",
    href: "https://www.uregni.gov.uk/",
    supports: "Northern Ireland's separate electricity, gas, water and sewerage regulatory context."
  },
  {
    label: "GOV.UK: leasehold service charges and other expenses",
    href: "https://www.gov.uk/leasehold-property/service-charges-and-other-expenses",
    supports: "Service charges, buildings insurance, reserve funds and Section 20 consultation."
  },
  {
    label: "GOV.UK: TV Licence",
    href: "https://www.gov.uk/find-licences/tv-licence",
    supports: "When a TV Licence is required and the current licence charge."
  }
] as const;

export type OngoingHomeCostInput = {
  nation: "england" | "scotland" | "wales" | "northern-ireland";
  mortgage: number;
  councilTaxOrRates: number;
  gasAndElectricity: number;
  water: number;
  broadbandCommunications: number;
  buildingsInsurance: number;
  contentsInsurance: number;
  maintenanceReserve: number;
  serviceCharge: number;
  estateCharge: number;
  otherMonthlyCosts: number;
  annualIrregularCosts: number;
  buildingsInsuranceIncludedInServiceCharge: boolean;
};

export const defaultOngoingHomeCostInput: OngoingHomeCostInput = {
  nation: "england",
  mortgage: 0,
  councilTaxOrRates: illustrativeMonthlyCosts.councilTaxOrRates,
  gasAndElectricity: illustrativeMonthlyCosts.gasAndElectricity,
  water: illustrativeMonthlyCosts.water,
  broadbandCommunications: illustrativeMonthlyCosts.broadbandCommunications,
  buildingsInsurance: illustrativeMonthlyCosts.buildingsInsurance,
  contentsInsurance: illustrativeMonthlyCosts.contentsInsurance,
  maintenanceReserve: illustrativeMonthlyCosts.maintenanceReserve,
  serviceCharge: 0,
  estateCharge: 0,
  otherMonthlyCosts: 0,
  annualIrregularCosts: 0,
  buildingsInsuranceIncludedInServiceCharge: false
};

const amountKeys = [
  "mortgage",
  "councilTaxOrRates",
  "gasAndElectricity",
  "water",
  "broadbandCommunications",
  "buildingsInsurance",
  "contentsInsurance",
  "maintenanceReserve",
  "serviceCharge",
  "estateCharge",
  "otherMonthlyCosts",
  "annualIrregularCosts"
] as const;

function toPence(value: number, field: string): number {
  if (!Number.isFinite(value) || value < 0 || value > 1_000_000) {
    throw new RangeError(`${field} must be a number between 0 and 1,000,000.`);
  }

  return Math.round(value * 100);
}

export function calculateOngoingHomeCosts(input: OngoingHomeCostInput) {
  const amounts = Object.fromEntries(
    amountKeys.map((key) => [key, toPence(input[key], key)])
  ) as Record<(typeof amountKeys)[number], number>;
  const effectiveBuildingsInsurance =
    input.buildingsInsuranceIncludedInServiceCharge && amounts.serviceCharge > 0
      ? 0
      : amounts.buildingsInsurance;
  const predictableNonMortgageMonthly =
    amounts.councilTaxOrRates +
    amounts.gasAndElectricity +
    amounts.water +
    amounts.broadbandCommunications +
    effectiveBuildingsInsurance +
    amounts.contentsInsurance +
    amounts.serviceCharge +
    amounts.estateCharge +
    amounts.otherMonthlyCosts;
  const irregularAnnual = amounts.maintenanceReserve * 12 + amounts.annualIrregularCosts;
  const nonMortgageAnnual = predictableNonMortgageMonthly * 12 + irregularAnnual;
  const mortgageAnnual = amounts.mortgage * 12;
  const totalAnnual = mortgageAnnual + nonMortgageAnnual;

  return {
    mortgageMonthly: amounts.mortgage / 100,
    mortgageAnnual: mortgageAnnual / 100,
    predictableRecurringMonthly: predictableNonMortgageMonthly / 100,
    irregularReserveMonthly: irregularAnnual / 12 / 100,
    irregularReserveAnnual: irregularAnnual / 100,
    nonMortgageMonthly: nonMortgageAnnual / 12 / 100,
    nonMortgageAnnual: nonMortgageAnnual / 100,
    totalMonthly: totalAnnual / 12 / 100,
    totalAnnual: totalAnnual / 100,
    buildingsInsuranceDeducted:
      input.buildingsInsuranceIncludedInServiceCharge && amounts.serviceCharge > 0
        ? amounts.buildingsInsurance / 100
        : 0
  };
}

if (freeholdMonthlyTotal !== 625 || freeholdAnnualTotal !== 7_500) {
  throw new Error("The freehold worked example must remain £625 a month and £7,500 a year.");
}

if (managedMonthlyTotal !== 825 || managedAnnualTotal !== 9_900) {
  throw new Error("The managed worked example must remain £825 a month and £9,900 a year.");
}
