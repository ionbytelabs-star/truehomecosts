import type { CalculatorInput } from "./calculator";

import { defaultCalculatorInput } from "./default-calculator-input";
import type { BuyerType, Jurisdiction } from "./site";

const jurisdictions = new Set<Jurisdiction>([
  "england",
  "scotland",
  "wales",
  "northern-ireland"
]);
const buyerTypes = new Set<BuyerType>([
  "first-time-buyer",
  "home-mover",
  "additional-property"
]);

function finiteNumber(value: string | null): number | undefined {
  if (value === null || value.trim() === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function calculatorInputFromSearchParams(
  searchParams: URLSearchParams,
  fallback: CalculatorInput = defaultCalculatorInput
): CalculatorInput {
  const propertyPrice = finiteNumber(searchParams.get("propertyPrice"));
  const depositPercentage = finiteNumber(searchParams.get("depositPercentage"));
  const jurisdiction = searchParams.get("jurisdiction") as Jurisdiction | null;
  const buyerType = searchParams.get("buyerType") as BuyerType | null;

  return {
    ...fallback,
    ...(propertyPrice !== undefined
      ? { propertyPrice: Math.min(10_000_000, Math.max(50_000, Math.round(propertyPrice))) }
      : {}),
    ...(depositPercentage !== undefined
      ? {
          depositMode: "percentage" as const,
          depositPercentage: Math.min(100, Math.max(0, depositPercentage))
        }
      : {}),
    ...(jurisdiction && jurisdictions.has(jurisdiction) ? { jurisdiction } : {}),
    ...(buyerType && buyerTypes.has(buyerType) ? { buyerType } : {})
  };
}
