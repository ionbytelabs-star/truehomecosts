"use client";

import { useId, useState } from "react";

import { CostBreakdownTable } from "@/components/CostBreakdownTable";
import { ResultsCard } from "@/components/ResultsCard";
import { calculateUpfrontCosts, type CalculatorInput, type DepositMode } from "@/lib/calculator";
import { defaultCalculatorInput } from "@/lib/default-calculator-input";
import { formatCurrency } from "@/lib/format";
import {
  assumptionLevelLabels,
  buyerTypeLabels,
  jurisdictionLabels,
  type AssumptionLevel,
  type BuyerType,
  type Jurisdiction
} from "@/lib/site";

export function CalculatorForm() {
  const titleId = useId();
  const [input, setInput] = useState<CalculatorInput>(defaultCalculatorInput);
  const result = calculateUpfrontCosts(input);
  const toggleOptions: Array<{
    key: "includeMoving" | "includeFurnishing" | "includeInsurance";
    label: string;
    value: boolean;
  }> = [
    {
      key: "includeMoving",
      label: "Include moving costs",
      value: input.includeMoving
    },
    {
      key: "includeFurnishing",
      label: "Include furnishing costs",
      value: input.includeFurnishing
    },
    {
      key: "includeInsurance",
      label: "Include insurance estimate",
      value: input.includeInsurance
    }
  ];

  const update = <K extends keyof CalculatorInput>(key: K, value: CalculatorInput[K]) => {
    setInput((current) => ({
      ...current,
      [key]: value
    }));
  };

  const updateToggle = (
    key: "includeMoving" | "includeFurnishing" | "includeInsurance",
    value: boolean
  ) => {
    setInput((current) => ({
      ...current,
      [key]: value
    }));
  };

  const depositMode = input.depositMode;

  return (
    <section id="calculator" aria-labelledby={titleId} className="shell section-gap pt-0">
      <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="surface p-6 sm:p-8">
          <div className="space-y-3">
            <p className="eyebrow">Calculator</p>
            <h2 id={titleId} className="font-serif text-3xl text-text">
              Buying a house costs UK calculator
            </h2>
            <p className="text-muted">
              Estimate the total upfront cost of buying property in the UK, not just the deposit.
            </p>
          </div>

          <form className="mt-8 grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-text">Property price</span>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">£</span>
                <input
                  type="number"
                  min={50000}
                  step={1000}
                  value={input.propertyPrice}
                  onChange={(event) => update("propertyPrice", Number(event.target.value) || 0)}
                  className="w-full rounded-2xl border border-line bg-white px-10 py-3 text-text"
                />
              </div>
            </label>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-text">Location / jurisdiction</span>
                <select
                  value={input.jurisdiction}
                  onChange={(event) => update("jurisdiction", event.target.value as Jurisdiction)}
                  className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-text"
                >
                  {Object.entries(jurisdictionLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-text">Buyer type</span>
                <select
                  value={input.buyerType}
                  onChange={(event) => update("buyerType", event.target.value as BuyerType)}
                  className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-text"
                >
                  {Object.entries(buyerTypeLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <fieldset className="grid gap-3 rounded-3xl border border-line p-4">
              <legend className="px-2 text-sm font-medium text-text">Deposit input mode</legend>
              <div className="flex flex-wrap gap-3">
                {[
                  { value: "amount", label: "Deposit amount" },
                  { value: "percentage", label: "Deposit percentage" }
                ].map((option) => {
                  const selected = depositMode === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => update("depositMode", option.value as DepositMode)}
                      className={`rounded-full px-4 py-2 text-sm font-medium ${
                        selected ? "bg-brand text-white" : "border border-line bg-white text-text"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>

              {depositMode === "amount" ? (
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-text">Deposit amount</span>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">£</span>
                    <input
                      type="number"
                      min={0}
                      step={1000}
                      value={input.depositAmount ?? 0}
                      onChange={(event) => update("depositAmount", Number(event.target.value) || 0)}
                      className="w-full rounded-2xl border border-line bg-white px-10 py-3 text-text"
                    />
                  </div>
                </label>
              ) : (
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-text">Deposit percentage</span>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      step={1}
                      value={input.depositPercentage ?? 0}
                      onChange={(event) => update("depositPercentage", Number(event.target.value) || 0)}
                      className="w-full rounded-2xl border border-line bg-white px-4 py-3 pr-10 text-text"
                    />
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">%</span>
                  </div>
                </label>
              )}
            </fieldset>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-text">Cost assumption level</span>
              <select
                value={input.assumptionLevel}
                onChange={(event) => update("assumptionLevel", event.target.value as AssumptionLevel)}
                className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-text"
              >
                {Object.entries(assumptionLevelLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <fieldset className="grid gap-3 rounded-3xl border border-line p-4">
              <legend className="px-2 text-sm font-medium text-text">Optional planning costs</legend>
              {toggleOptions.map((option) => (
                <label key={option.key} className="flex items-center justify-between gap-4 rounded-2xl bg-panel-strong px-4 py-3">
                  <span className="text-sm font-medium text-text">{option.label}</span>
                  <input
                    type="checkbox"
                    checked={option.value}
                    onChange={(event) => updateToggle(option.key, event.target.checked)}
                    className="h-5 w-5 rounded border-line text-brand"
                  />
                </label>
              ))}
            </fieldset>
          </form>
        </div>

        <div className="space-y-6" aria-live="polite">
          <ResultsCard
            total={result.totalUpfrontCash}
            deposit={result.depositAmount}
            tax={result.propertyTaxAmount}
            notes={result.notes}
          />

          <div className="surface p-5 text-sm text-muted">
            <p className="font-semibold text-text">Snapshot</p>
            <p className="mt-2">
              At the current settings, the calculator suggests a total upfront cash target of{" "}
              <span className="font-semibold text-text">{formatCurrency(result.totalUpfrontCash)}</span>.
            </p>
          </div>

          <CostBreakdownTable items={result.breakdown} />
        </div>
      </div>
    </section>
  );
}
