"use client";

import { useEffect, useId, useState } from "react";

import { AffiliateRecommendationCard } from "@/components/affiliates/Affiliate";
import { CostBreakdownTable } from "@/components/CostBreakdownTable";
import { ResultsCard } from "@/components/ResultsCard";
import {
  calculateUpfrontCosts,
  type AdjustableCostKey,
  type CalculatorInput,
  type DepositMode
} from "@/lib/calculator";
import { propertyPriceBand, trackEvent } from "@/lib/analytics";
import { defaultCalculatorInput } from "@/lib/default-calculator-input";
import {
  assumptionLevelLabels,
  buyerTypeLabels,
  jurisdictionLabels,
  type AssumptionLevel,
  type BuyerType,
  type Jurisdiction
} from "@/lib/site";

const optionalToggles = [
  { key: "includeMoving", label: "Moving costs" },
  { key: "includeInsurance", label: "Insurance" },
  { key: "includeFurnishing", label: "Furnishing and setup" },
  { key: "includeContingency", label: "Contingency" }
] as const;

const adjustableCosts: Array<{ key: AdjustableCostKey; label: string }> = [
  { key: "solicitors", label: "Legal fees" },
  { key: "searches", label: "Search fees" },
  { key: "survey", label: "Survey" },
  { key: "mortgage-fees", label: "Mortgage fees" },
  { key: "land-registry", label: "Registration allowance / fee" },
  { key: "telegraphic-transfer", label: "Bank transfer fee" },
  { key: "moving", label: "Moving costs" },
  { key: "insurance", label: "Insurance" },
  { key: "furnishing", label: "Furnishing and setup" }
];

export function CalculatorForm() {
  const titleId = useId();
  const propertyHelpId = useId();
  const depositHelpId = useId();
  const [input, setInput] = useState<CalculatorInput>(defaultCalculatorInput);
  const [hasStarted, setHasStarted] = useState(false);
  const result = calculateUpfrontCosts(input);
  const hasMovingCost = result.breakdown.some((line) => line.key === "moving");
  const propertyPriceInvalid = input.propertyPrice < 50_000 || input.propertyPrice > 10_000_000;
  const depositAmountInvalid =
    input.depositMode === "amount" && (input.depositAmount ?? 0) > Math.max(0, input.propertyPrice);

  useEffect(() => {
    if (!hasStarted) return;
    const timeout = window.setTimeout(() => {
      const parameters = {
        jurisdiction: input.jurisdiction,
        buyer_type: input.buyerType,
        property_price_band: propertyPriceBand(input.propertyPrice),
        optional_costs_enabled: Boolean(
          input.includeMoving || input.includeInsurance || input.includeFurnishing || input.includeContingency
        )
      };
      trackEvent("calculator_calculate", parameters);
      trackEvent("calculator_result_view", parameters);
    }, 600);
    return () => window.clearTimeout(timeout);
  }, [hasStarted, input]);

  const update = <K extends keyof CalculatorInput>(key: K, value: CalculatorInput[K]) => {
    setInput((current) => ({ ...current, [key]: value }));
  };

  const markStarted = () => {
    if (hasStarted) return;
    setHasStarted(true);
    trackEvent("calculator_start", {
      jurisdiction: input.jurisdiction,
      buyer_type: input.buyerType,
      property_price_band: propertyPriceBand(input.propertyPrice)
    });
  };

  const updateOverride = (key: AdjustableCostKey, value: number) => {
    setInput((current) => ({
      ...current,
      costOverrides: { ...current.costOverrides, [key]: Math.max(0, value || 0) }
    }));
  };

  const currentCostValue = (key: AdjustableCostKey) =>
    input.costOverrides?.[key] ?? result.breakdown.find((line) => line.key === key)?.value ?? 0;

  return (
    <section id="calculator" aria-labelledby={titleId} className="shell pb-10 sm:pb-12">
      <div className="grid min-w-0 gap-6 xl:grid-cols-[0.92fr_1.08fr] xl:items-start">
        <div className="surface min-w-0 p-5 sm:p-7">
          <div className="space-y-2">
            <p className="eyebrow">Calculator</p>
            <h2 id={titleId} className="font-serif text-3xl text-text">Build your buying budget</h2>
            <p className="text-muted">Defaults are planning estimates. Replace them with quotations whenever you have them.</p>
          </div>

          <form className="mt-6 grid gap-5" onFocusCapture={markStarted} onChange={markStarted} noValidate>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-text">Property price</span>
              <span className="relative">
                <span aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">£</span>
                <input
                  type="number"
                  inputMode="decimal"
                  min={50000}
                  max={10000000}
                  step={1000}
                  value={input.propertyPrice}
                  aria-invalid={propertyPriceInvalid}
                  aria-describedby={propertyHelpId}
                  onChange={(event) => update("propertyPrice", Number(event.target.value))}
                  className="min-h-12 w-full rounded-2xl border border-line bg-white px-10 py-3 text-base text-text aria-[invalid=true]:border-warning"
                />
              </span>
              <span id={propertyHelpId} className={`text-sm ${propertyPriceInvalid ? "font-medium text-warning" : "text-muted"}`}>
                {propertyPriceInvalid ? "Enter a property price from £50,000 to £10,000,000." : "Enter the agreed or expected purchase price."}
              </span>
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-text">UK jurisdiction</span>
                <select value={input.jurisdiction} onChange={(event) => update("jurisdiction", event.target.value as Jurisdiction)} className="min-h-12 w-full rounded-2xl border border-line bg-white px-4 py-3 text-text">
                  {Object.entries(jurisdictionLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
                <span className="text-sm text-muted">Controls SDLT, LBTT or LTT and registration treatment.</span>
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-text">Buyer type</span>
                <select value={input.buyerType} onChange={(event) => update("buyerType", event.target.value as BuyerType)} className="min-h-12 w-full rounded-2xl border border-line bg-white px-4 py-3 text-text">
                  {Object.entries(buyerTypeLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
                <span className="text-sm text-muted">Tax reliefs and supplements depend on eligibility.</span>
              </label>
            </div>

            <fieldset className="grid gap-3 rounded-3xl border border-line p-4">
              <legend className="px-2 text-sm font-semibold text-text">Deposit</legend>
              <div className="grid grid-cols-2 gap-2">
                {(["percentage", "amount"] as DepositMode[]).map((mode) => (
                  <button key={mode} type="button" aria-pressed={input.depositMode === mode} onClick={() => update("depositMode", mode)} className={`min-h-11 rounded-full px-3 py-2 text-sm font-semibold ${input.depositMode === mode ? "bg-brand text-white" : "border border-line bg-white text-text"}`}>
                    {mode === "percentage" ? "Percentage" : "Amount"}
                  </button>
                ))}
              </div>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-text">{input.depositMode === "percentage" ? "Deposit percentage" : "Deposit amount"}</span>
                <span className="relative">
                  {input.depositMode === "amount" ? <span aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">£</span> : null}
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    max={input.depositMode === "percentage" ? 100 : Math.max(0, input.propertyPrice)}
                    step={input.depositMode === "percentage" ? 0.5 : 1000}
                    value={input.depositMode === "percentage" ? input.depositPercentage ?? 0 : input.depositAmount ?? 0}
                    aria-invalid={depositAmountInvalid}
                    aria-describedby={depositHelpId}
                    onChange={(event) => update(input.depositMode === "percentage" ? "depositPercentage" : "depositAmount", Number(event.target.value))}
                    className={`min-h-12 w-full rounded-2xl border border-line bg-white py-3 text-base text-text ${input.depositMode === "amount" ? "px-10" : "px-4 pr-10"}`}
                  />
                  {input.depositMode === "percentage" ? <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">%</span> : null}
                </span>
                <span id={depositHelpId} className={`text-sm ${depositAmountInvalid ? "font-medium text-warning" : "text-muted"}`}>
                  {depositAmountInvalid ? "The deposit cannot exceed the property price." : "Use the cash amount or percentage you plan to contribute."}
                </span>
              </label>
            </fieldset>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-text">Planning estimate level</span>
              <select value={input.assumptionLevel} onChange={(event) => update("assumptionLevel", event.target.value as AssumptionLevel)} className="min-h-12 w-full rounded-2xl border border-line bg-white px-4 py-3 text-text">
                {Object.entries(assumptionLevelLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
              <span className="text-sm text-muted">Changes market estimates, not official tax rates.</span>
            </label>

            <fieldset className="grid gap-2 rounded-3xl border border-line p-4">
              <legend className="px-2 text-sm font-semibold text-text">Optional allowances</legend>
              {optionalToggles.map(({ key, label }) => (
                <label key={key} className="flex min-h-12 items-center justify-between gap-4 rounded-2xl bg-panel-strong px-4 py-3">
                  <span className="text-sm font-medium text-text">Include {label.toLowerCase()}</span>
                  <input type="checkbox" checked={Boolean(input[key])} onChange={(event) => update(key, event.target.checked)} className="h-5 w-5 rounded border-line text-brand" />
                </label>
              ))}
              {input.includeContingency ? (
                <label className="mt-2 grid gap-2">
                  <span className="text-sm font-medium text-text">Contingency percentage</span>
                  <span className="relative">
                    <input type="number" inputMode="decimal" min={0} max={25} step={1} value={input.contingencyPercentage ?? 10} onChange={(event) => update("contingencyPercentage", Number(event.target.value))} className="min-h-12 w-full rounded-2xl border border-line bg-white px-4 py-3 pr-10 text-text" />
                    <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">%</span>
                  </span>
                </label>
              ) : null}
            </fieldset>

            <details className="rounded-3xl border border-line bg-white p-4">
              <summary className="min-h-11 cursor-pointer py-2 font-semibold text-text">Replace estimates with your quotes</summary>
              <p className="mt-2 text-sm text-muted">Values you change are labelled as user-entered in the result.</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {adjustableCosts.map(({ key, label }) => (
                  <label key={key} className="grid gap-2">
                    <span className="text-sm font-medium text-text">{label}</span>
                    <span className="relative">
                      <span aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">£</span>
                      <input type="number" inputMode="decimal" min={0} step={10} value={currentCostValue(key)} onChange={(event) => updateOverride(key, Number(event.target.value))} className="min-h-11 w-full rounded-xl border border-line bg-white px-8 py-2 text-text" />
                    </span>
                  </label>
                ))}
              </div>
            </details>
          </form>
        </div>

        <div className="min-w-0 space-y-5 xl:sticky xl:top-4" aria-live="polite" aria-atomic="false">
          <ResultsCard total={result.totalUpfrontCash} deposit={result.depositAmount} tax={result.propertyTaxAmount} notes={result.notes} />
          <CostBreakdownTable
            items={result.breakdown}
            rowSupplement={
              hasMovingCost
                ? {
                    key: "moving",
                    content: <AffiliateRecommendationCard placement="calculatorAnyVanRemovals" />
                  }
                : undefined
            }
          />
        </div>
      </div>
    </section>
  );
}
