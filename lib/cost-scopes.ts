import {
  calculatorCostAssumptionById,
  type CostAssumption,
  type CostClassification
} from "../data/assumptions/calculator";
import { calculateUpfrontCosts, type CalculatorInput, type CalculatorResult } from "./calculator";
import { formatCurrency } from "./format";

export const costTaxonomy = [
  "Deposit",
  "Property tax",
  "Solicitor/conveyancing",
  "Search fees",
  "Survey and valuation",
  "Mortgage fees",
  "Registration fee or allowance",
  "Bank transfer fee",
  "Moving costs",
  "Insurance",
  "Furnishing and setup",
  "Contingency"
] as const;

export const coreTransactionKeys = [
  "property-tax",
  "solicitors",
  "searches",
  "survey",
  "mortgage-fees",
  "land-registry",
  "telegraphic-transfer"
] as const;

export const coreNonTaxTransactionKeys = coreTransactionKeys.filter(
  (key) => key !== "property-tax"
);
export const widerMovingAndInsuranceKeys = ["moving", "insurance"] as const;
export const optionalSetupKeys = ["furnishing"] as const;

export type CostScope =
  | "total-upfront-cash"
  | "core-transaction-costs"
  | "core-non-tax-transaction-costs"
  | "wider-moving-and-insurance"
  | "optional-furnishing-and-setup"
  | "contingency";

export const costScopeDefinitions: Record<CostScope, string> = {
  "total-upfront-cash":
    "Deposit, property tax, core transaction costs, selected moving costs, insurance, furnishing and contingency.",
  "core-transaction-costs":
    "Property tax, solicitor/conveyancing, searches, survey and valuation, mortgage fees, registration and bank transfer fee. Moving costs are excluded.",
  "core-non-tax-transaction-costs":
    "Solicitor/conveyancing, searches, survey and valuation, mortgage fees, registration and bank transfer fee. Deposit, property tax, moving, insurance, furnishing and contingency are excluded.",
  "wider-moving-and-insurance":
    "Moving costs and insurance only. Furnishing and setup are excluded.",
  "optional-furnishing-and-setup": "The optional furnishing and setup allowance only.",
  contingency: "The selected contingency percentage applied to estimate-led costs."
};

export const classificationLabels: Record<CostClassification, string> = {
  "official-calculation": "Official calculation",
  "official-charge": "Official charge",
  "market-estimate": "Market estimate",
  "user-entered": "User-entered amount",
  "optional-allowance": "Optional allowance",
  "adjustable-allowance": "Adjustable allowance"
};

export function getCostAssumption(id: string): CostAssumption {
  const assumption = calculatorCostAssumptionById.get(id);
  if (!assumption) throw new Error(`Unknown cost assumption: ${id}`);
  return assumption;
}

export function getTypicalCost(id: string): number | undefined {
  return getCostAssumption(id).typical;
}

export function getCostClassification(id: string): string {
  return classificationLabels[getCostAssumption(id).classification];
}

export function formatCostRange(id: string): string {
  const assumption = getCostAssumption(id);
  if (assumption.minimum === undefined || assumption.maximum === undefined) {
    return "Calculated from your purchase details";
  }
  if (assumption.minimum === assumption.maximum) return formatCurrency(assumption.minimum);
  return `${formatCurrency(assumption.minimum)} to ${formatCurrency(assumption.maximum)}`;
}

export function getScopeTotal(result: CalculatorResult, scope: CostScope): number {
  if (scope === "total-upfront-cash") return result.totalUpfrontCash;

  const keys =
    scope === "core-transaction-costs"
      ? coreTransactionKeys
      : scope === "core-non-tax-transaction-costs"
        ? coreNonTaxTransactionKeys
        : scope === "wider-moving-and-insurance"
          ? widerMovingAndInsuranceKeys
          : scope === "optional-furnishing-and-setup"
            ? optionalSetupKeys
            : (["contingency"] as const);

  return result.breakdown
    .filter((line) => (keys as readonly string[]).includes(line.key))
    .reduce((sum, line) => sum + line.value, 0);
}

export function calculateScopeRange(
  input: Omit<CalculatorInput, "assumptionLevel">,
  scope: CostScope
): { minimum: number; typical: number; maximum: number } {
  const calculate = (assumptionLevel: CalculatorInput["assumptionLevel"]) =>
    getScopeTotal(calculateUpfrontCosts({ ...input, assumptionLevel }), scope);

  return {
    minimum: calculate("low"),
    typical: calculate("average"),
    maximum: calculate("high")
  };
}

export function formatScopeRange(range: { minimum: number; maximum: number }): string {
  return `${formatCurrency(range.minimum)} to ${formatCurrency(range.maximum)}`;
}
