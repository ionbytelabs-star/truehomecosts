import type { CalculatorInput } from "@/lib/calculator";

export const defaultCalculatorInput: CalculatorInput = {
  propertyPrice: 300_000,
  jurisdiction: "england-ni",
  buyerType: "first-time-buyer",
  depositMode: "percentage",
  depositPercentage: 10,
  depositAmount: 30_000,
  assumptionLevel: "average",
  includeMoving: true,
  includeFurnishing: false,
  includeInsurance: true
};
