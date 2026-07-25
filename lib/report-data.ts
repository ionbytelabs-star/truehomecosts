import { calculatorMetadata } from "../data/assumptions/calculator";
import { calculateUpfrontCosts, type BreakdownLine, type CalculatorInput } from "./calculator";
import { defaultCalculatorInput } from "./default-calculator-input";
import {
  buyerTypeLabels,
  jurisdictionLabels,
  type BuyerType,
  type Jurisdiction
} from "./site";

export const homeBuyingReportPrices = [
  150_000,
  200_000,
  225_000,
  250_000,
  275_000,
  300_000,
  325_000,
  350_000,
  400_000,
  450_000,
  500_000,
  600_000,
  750_000
] as const;

export const homeBuyingReportJurisdictions = [
  "england",
  "northern-ireland",
  "scotland",
  "wales"
] as const satisfies readonly Jurisdiction[];

export const homeBuyingReportBuyerTypes = [
  "first-time-buyer",
  "home-mover",
  "additional-property"
] as const satisfies readonly BuyerType[];

const reportPath = "/reports/true-cost-buying-home-uk-2026";
const csvPath = "/data/true-cost-buying-home-uk-2026.csv";
const jsonPath = "/data/true-cost-buying-home-uk-2026.json";
const chartPath = "/data/true-cost-buying-home-uk-2026-home-mover.svg";

function defaultDepositPercentage(): number {
  if (
    defaultCalculatorInput.depositMode !== "percentage" ||
    defaultCalculatorInput.depositPercentage === undefined
  ) {
    throw new Error("The report requires the central calculator default to use a percentage deposit.");
  }
  return defaultCalculatorInput.depositPercentage;
}

const reportInputDefaults = {
  assumptionLevel: defaultCalculatorInput.assumptionLevel,
  depositMode: defaultCalculatorInput.depositMode,
  depositPercentage: defaultDepositPercentage(),
  includeMoving: defaultCalculatorInput.includeMoving,
  includeInsurance: defaultCalculatorInput.includeInsurance,
  includeFurnishing: defaultCalculatorInput.includeFurnishing,
  includeContingency: defaultCalculatorInput.includeContingency ?? false,
  contingencyPercentage: defaultCalculatorInput.contingencyPercentage ?? 0
} as const;

export type ReportAmountKey =
  | "deposit"
  | "propertyTax"
  | "legalFees"
  | "searches"
  | "registration"
  | "survey"
  | "mortgageFees"
  | "bankTransferFee"
  | "movingCosts"
  | "insurance"
  | "furnishingSetup"
  | "contingency"
  | "totalUpfrontCash";

export type ReportScenario = {
  id: string;
  propertyPriceGbp: number;
  jurisdiction: Jurisdiction;
  jurisdictionLabel: string;
  buyerType: BuyerType;
  buyerTypeLabel: string;
  assumptionLevel: CalculatorInput["assumptionLevel"];
  depositPercentage: number;
  includedAllowances: {
    moving: boolean;
    insurance: boolean;
    furnishingSetup: boolean;
    contingency: boolean;
    contingencyPercentage: number;
  };
  amountsGbp: Record<ReportAmountKey, number>;
  classifications: {
    deposit: string;
    propertyTax: string;
    legalFees: string;
    searches: string;
    registration: string;
    survey: string;
    mortgageFees: string;
    bankTransferFee: string;
    movingCosts: string;
    insurance: string;
    furnishingSetup: string;
    contingency: string;
  };
  propertyTaxName: string;
  notes: string[];
};

export type ReportHeadlineStatistic = {
  id: string;
  label: string;
  valueGbp: number;
  context: string;
};

export type HomeBuyingReport = {
  report: {
    title: string;
    year: 2026;
    published: string;
    calculatorDataVersion: string;
    calculatorLastReviewed: string;
    currency: "GBP";
    locale: "en-GB";
    reportPath: string;
    downloads: {
      csv: string;
      json: string;
      chartSvg: string;
    };
  };
  basis: {
    summary: string;
    assumptionLevel: CalculatorInput["assumptionLevel"];
    depositPercentage: number;
    includedAllowances: ReportScenario["includedAllowances"];
    scenarioCount: number;
    estimateNote: string;
    officialNote: string;
  };
  headlineStatistics: ReportHeadlineStatistic[];
  sources: readonly {
    name: string;
    href: string;
  }[];
  scenarios: ReportScenario[];
};

function getLine(breakdown: BreakdownLine[], key: string): BreakdownLine | undefined {
  return breakdown.find((line) => line.key === key);
}

function amount(breakdown: BreakdownLine[], key: string): number {
  return getLine(breakdown, key)?.value ?? 0;
}

function classification(breakdown: BreakdownLine[], key: string): string {
  return getLine(breakdown, key)?.classification ?? "not-included";
}

function buildReportScenario(
  propertyPrice: number,
  jurisdiction: Jurisdiction,
  buyerType: BuyerType
): ReportScenario {
  const input: CalculatorInput = {
    ...defaultCalculatorInput,
    propertyPrice,
    jurisdiction,
    buyerType,
    assumptionLevel: reportInputDefaults.assumptionLevel,
    depositMode: reportInputDefaults.depositMode,
    depositPercentage: reportInputDefaults.depositPercentage,
    includeMoving: reportInputDefaults.includeMoving,
    includeInsurance: reportInputDefaults.includeInsurance,
    includeFurnishing: reportInputDefaults.includeFurnishing,
    includeContingency: reportInputDefaults.includeContingency,
    contingencyPercentage: reportInputDefaults.contingencyPercentage,
    costOverrides: undefined
  };
  const result = calculateUpfrontCosts(input);
  const propertyTax = getLine(result.breakdown, "property-tax");

  return {
    id: `${jurisdiction}-${buyerType}-${propertyPrice}`,
    propertyPriceGbp: propertyPrice,
    jurisdiction,
    jurisdictionLabel: jurisdictionLabels[jurisdiction],
    buyerType,
    buyerTypeLabel: buyerTypeLabels[buyerType],
    assumptionLevel: input.assumptionLevel,
    depositPercentage: reportInputDefaults.depositPercentage,
    includedAllowances: {
      moving: input.includeMoving,
      insurance: input.includeInsurance,
      furnishingSetup: input.includeFurnishing,
      contingency: input.includeContingency ?? false,
      contingencyPercentage: input.contingencyPercentage ?? 0
    },
    amountsGbp: {
      deposit: result.depositAmount,
      propertyTax: result.propertyTaxAmount,
      legalFees: amount(result.breakdown, "solicitors"),
      searches: amount(result.breakdown, "searches"),
      registration: amount(result.breakdown, "land-registry"),
      survey: amount(result.breakdown, "survey"),
      mortgageFees: amount(result.breakdown, "mortgage-fees"),
      bankTransferFee: amount(result.breakdown, "telegraphic-transfer"),
      movingCosts: amount(result.breakdown, "moving"),
      insurance: amount(result.breakdown, "insurance"),
      furnishingSetup: amount(result.breakdown, "furnishing"),
      contingency: amount(result.breakdown, "contingency"),
      totalUpfrontCash: result.totalUpfrontCash
    },
    classifications: {
      deposit: classification(result.breakdown, "deposit"),
      propertyTax: classification(result.breakdown, "property-tax"),
      legalFees: classification(result.breakdown, "solicitors"),
      searches: classification(result.breakdown, "searches"),
      registration: classification(result.breakdown, "land-registry"),
      survey: classification(result.breakdown, "survey"),
      mortgageFees: classification(result.breakdown, "mortgage-fees"),
      bankTransferFee: classification(result.breakdown, "telegraphic-transfer"),
      movingCosts: classification(result.breakdown, "moving"),
      insurance: classification(result.breakdown, "insurance"),
      furnishingSetup: classification(result.breakdown, "furnishing"),
      contingency: classification(result.breakdown, "contingency")
    },
    propertyTaxName: propertyTax?.label ?? "Property tax",
    notes: result.notes
  };
}

function findScenario(
  scenarios: ReportScenario[],
  jurisdiction: Jurisdiction,
  buyerType: BuyerType,
  propertyPrice = 300_000
): ReportScenario {
  const scenario = scenarios.find(
    (item) =>
      item.propertyPriceGbp === propertyPrice &&
      item.jurisdiction === jurisdiction &&
      item.buyerType === buyerType
  );
  if (!scenario) throw new Error(`Missing report scenario: ${jurisdiction}, ${buyerType}, ${propertyPrice}`);
  return scenario;
}

function buildHeadlineStatistics(scenarios: ReportScenario[]): ReportHeadlineStatistic[] {
  const englandFirstTime = findScenario(scenarios, "england", "first-time-buyer");
  const englandMover = findScenario(scenarios, "england", "home-mover");
  const englandAdditional = findScenario(scenarios, "england", "additional-property");
  const scotlandMover = findScenario(scenarios, "scotland", "home-mover");
  const walesMover = findScenario(scenarios, "wales", "home-mover");
  const northernIrelandMover = findScenario(scenarios, "northern-ireland", "home-mover");

  return [
    {
      id: "england-first-time-300",
      label: "First-time buyer in England",
      valueGbp: englandFirstTime.amountsGbp.totalUpfrontCash,
      context: "Total upfront cash on a £300,000 purchase using the report basis."
    },
    {
      id: "england-home-mover-300",
      label: "Home mover in England",
      valueGbp: englandMover.amountsGbp.totalUpfrontCash,
      context: "Total upfront cash on a £300,000 purchase using the report basis."
    },
    {
      id: "england-additional-300",
      label: "Additional-property buyer in England",
      valueGbp: englandAdditional.amountsGbp.totalUpfrontCash,
      context: "Total upfront cash on a £300,000 purchase using the report basis."
    },
    {
      id: "england-additional-premium-300",
      label: "Additional-property cash premium",
      valueGbp:
        englandAdditional.amountsGbp.totalUpfrontCash - englandMover.amountsGbp.totalUpfrontCash,
      context: "Difference from the England home-mover scenario at £300,000."
    },
    {
      id: "scotland-home-mover-300",
      label: "Home mover in Scotland",
      valueGbp: scotlandMover.amountsGbp.totalUpfrontCash,
      context: "Total upfront cash on a £300,000 purchase using LBTT."
    },
    {
      id: "wales-home-mover-300",
      label: "Home mover in Wales",
      valueGbp: walesMover.amountsGbp.totalUpfrontCash,
      context: "Total upfront cash on a £300,000 purchase using LTT."
    },
    {
      id: "northern-ireland-home-mover-300",
      label: "Home mover in Northern Ireland",
      valueGbp: northernIrelandMover.amountsGbp.totalUpfrontCash,
      context: "Total upfront cash on a £300,000 purchase using SDLT and the LPS allowance."
    },
    {
      id: "england-first-time-non-deposit-300",
      label: "First-time buyer costs beyond the deposit",
      valueGbp:
        englandFirstTime.amountsGbp.totalUpfrontCash - englandFirstTime.amountsGbp.deposit,
      context: `Report-basis upfront cash beyond the ${reportInputDefaults.depositPercentage}% deposit at £300,000 in England.`
    }
  ];
}

export function generateHomeBuyingReport(): HomeBuyingReport {
  const scenarios = homeBuyingReportPrices.flatMap((propertyPrice) =>
    homeBuyingReportJurisdictions.flatMap((jurisdiction) =>
      homeBuyingReportBuyerTypes.map((buyerType) =>
        buildReportScenario(propertyPrice, jurisdiction, buyerType)
      )
    )
  );

  const includedAllowances = {
    moving: reportInputDefaults.includeMoving,
    insurance: reportInputDefaults.includeInsurance,
    furnishingSetup: reportInputDefaults.includeFurnishing,
    contingency: reportInputDefaults.includeContingency,
    contingencyPercentage: reportInputDefaults.contingencyPercentage
  };

  return {
    report: {
      title: "True Cost of Buying a Home in the UK 2026",
      year: 2026,
      published: "2026-07-25",
      calculatorDataVersion: calculatorMetadata.dataVersion,
      calculatorLastReviewed: calculatorMetadata.lastReviewed,
      currency: "GBP",
      locale: "en-GB",
      reportPath,
      downloads: {
        csv: csvPath,
        json: jsonPath,
        chartSvg: chartPath
      }
    },
    basis: {
      summary:
        "Representative scenarios generated from the production True Home Costs calculator using its central default deposit, average estimate level and optional-allowance settings.",
      assumptionLevel: reportInputDefaults.assumptionLevel,
      depositPercentage: reportInputDefaults.depositPercentage,
      includedAllowances,
      scenarioCount: scenarios.length,
      estimateNote:
        "Legal, search, survey, mortgage, moving, insurance and contingency amounts are planning estimates or optional allowances, not quotations.",
      officialNote:
        "Property tax is calculated from the official jurisdiction-specific rules. Registration is an official charge where supported and otherwise an adjustable allowance."
    },
    headlineStatistics: buildHeadlineStatistics(scenarios),
    sources: calculatorMetadata.sources,
    scenarios
  };
}

function csvCell(value: string | number | boolean): string {
  const text = String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function serializeHomeBuyingReportCsv(report = generateHomeBuyingReport()): string {
  const headers = [
    "report_year",
    "calculator_data_version",
    "property_price_gbp",
    "jurisdiction",
    "buyer_type",
    "assumption_level",
    "deposit_percentage",
    "deposit_gbp",
    "property_tax_name",
    "property_tax_gbp",
    "property_tax_basis",
    "legal_fees_gbp",
    "legal_fees_basis",
    "searches_gbp",
    "searches_basis",
    "registration_gbp",
    "registration_basis",
    "survey_gbp",
    "survey_basis",
    "mortgage_fees_gbp",
    "mortgage_fees_basis",
    "bank_transfer_fee_gbp",
    "moving_costs_gbp",
    "moving_costs_included",
    "insurance_gbp",
    "insurance_included",
    "furnishing_setup_gbp",
    "furnishing_setup_included",
    "contingency_gbp",
    "contingency_percentage",
    "total_upfront_cash_gbp",
    "notes"
  ];

  const rows = report.scenarios.map((scenario) => [
    report.report.year,
    report.report.calculatorDataVersion,
    scenario.propertyPriceGbp,
    scenario.jurisdictionLabel,
    scenario.buyerTypeLabel,
    scenario.assumptionLevel,
    scenario.depositPercentage,
    scenario.amountsGbp.deposit,
    scenario.propertyTaxName,
    scenario.amountsGbp.propertyTax,
    scenario.classifications.propertyTax,
    scenario.amountsGbp.legalFees,
    scenario.classifications.legalFees,
    scenario.amountsGbp.searches,
    scenario.classifications.searches,
    scenario.amountsGbp.registration,
    scenario.classifications.registration,
    scenario.amountsGbp.survey,
    scenario.classifications.survey,
    scenario.amountsGbp.mortgageFees,
    scenario.classifications.mortgageFees,
    scenario.amountsGbp.bankTransferFee,
    scenario.amountsGbp.movingCosts,
    scenario.includedAllowances.moving,
    scenario.amountsGbp.insurance,
    scenario.includedAllowances.insurance,
    scenario.amountsGbp.furnishingSetup,
    scenario.includedAllowances.furnishingSetup,
    scenario.amountsGbp.contingency,
    scenario.includedAllowances.contingencyPercentage,
    scenario.amountsGbp.totalUpfrontCash,
    scenario.notes.join(" ")
  ]);

  return [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n") + "\r\n";
}

export function serializeHomeBuyingReportJson(report = generateHomeBuyingReport()): string {
  return `${JSON.stringify(report, null, 2)}\n`;
}

function escapeXml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export function serializeHomeBuyingReportChartSvg(report = generateHomeBuyingReport()): string {
  const chartScenarios = homeBuyingReportJurisdictions.map((jurisdiction) =>
    findScenario(report.scenarios, jurisdiction, "home-mover")
  );
  const maxValue = Math.max(...chartScenarios.map((scenario) => scenario.amountsGbp.totalUpfrontCash));
  const chartWidth = 1040;
  const chartHeight = 560;
  const plotLeft = 250;
  const plotWidth = 700;
  const barHeight = 56;
  const barGap = 52;

  const bars = chartScenarios
    .map((scenario, index) => {
      const y = 150 + index * (barHeight + barGap);
      const width = Math.round((scenario.amountsGbp.totalUpfrontCash / maxValue) * plotWidth);
      const value = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        maximumFractionDigits: 0
      }).format(scenario.amountsGbp.totalUpfrontCash);
      return `
  <text x="40" y="${y + 36}" class="label">${escapeXml(scenario.jurisdictionLabel)}</text>
  <rect x="${plotLeft}" y="${y}" width="${plotWidth}" height="${barHeight}" rx="14" fill="#edf3f1"/>
  <rect x="${plotLeft}" y="${y}" width="${width}" height="${barHeight}" rx="14" fill="#0d7a6f"/>
  <text x="${plotLeft + 18}" y="${y + 36}" class="value">${escapeXml(value)}</text>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${chartWidth}" height="${chartHeight}" viewBox="0 0 ${chartWidth} ${chartHeight}" role="img" aria-labelledby="title desc">
  <title id="title">Total upfront cash for a £300,000 home-mover purchase by UK jurisdiction</title>
  <desc id="desc">A bar chart generated from True Home Costs calculator data using a ${reportInputDefaults.depositPercentage}% deposit and the report's central assumptions.</desc>
  <style>
    .title { font: 700 34px Arial, sans-serif; fill: #17324d; }
    .subtitle { font: 400 18px Arial, sans-serif; fill: #526774; }
    .label { font: 600 19px Arial, sans-serif; fill: #17324d; }
    .value { font: 700 19px Arial, sans-serif; fill: white; }
    .source { font: 400 15px Arial, sans-serif; fill: #526774; }
  </style>
  <rect width="100%" height="100%" fill="#fffdf8"/>
  <text x="40" y="55" class="title">£300,000 home-mover scenarios</text>
  <text x="40" y="88" class="subtitle">Total upfront cash, including a ${reportInputDefaults.depositPercentage}% deposit and report-basis allowances</text>${bars}
  <text x="40" y="535" class="source">Source: True Home Costs · Calculator data ${escapeXml(report.report.calculatorDataVersion)}</text>
</svg>
`;
}
