"use client";

import Link from "next/link";
import { useState } from "react";

import { calculateUpfrontCosts, type CalculatorInput } from "@/lib/calculator";
import { defaultCalculatorInput } from "@/lib/default-calculator-input";
import { formatCurrency } from "@/lib/format";
import {
  buyerTypeLabels,
  jurisdictionLabels,
  type BuyerType,
  type Jurisdiction
} from "@/lib/site";

export function EmbedCalculator() {
  const [input, setInput] = useState<CalculatorInput>(defaultCalculatorInput);
  const result = calculateUpfrontCosts(input);

  const update = <K extends keyof CalculatorInput>(key: K, value: CalculatorInput[K]) => {
    setInput((current) => ({ ...current, [key]: value }));
  };

  return (
    <section className="embed-calculator-page min-h-screen bg-[#faf8f3] p-3 sm:p-5">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-line bg-white shadow-card">
        <div className="border-b border-line bg-panel-strong p-5 sm:p-6">
          <p className="eyebrow">True Home Costs</p>
          <h1 className="mt-3 font-serif text-3xl text-text">UK home-buying cost calculator</h1>
          <p className="mt-2 text-sm text-muted">
            Estimate the deposit, property tax, buying costs and selected allowances needed upfront.
          </p>
        </div>

        <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1fr_0.9fr]">
          <form className="grid content-start gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-text">Property price</span>
              <span className="relative">
                <span aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                  £
                </span>
                <input
                  type="number"
                  min={50_000}
                  max={10_000_000}
                  step={1_000}
                  value={input.propertyPrice}
                  onChange={(event) => update("propertyPrice", Number(event.target.value))}
                  className="min-h-12 w-full rounded-2xl border border-line px-9 py-3 text-text"
                />
              </span>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-text">UK jurisdiction</span>
              <select
                value={input.jurisdiction}
                onChange={(event) => update("jurisdiction", event.target.value as Jurisdiction)}
                className="min-h-12 rounded-2xl border border-line bg-white px-4 py-3 text-text"
              >
                {Object.entries(jurisdictionLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-text">Buyer type</span>
              <select
                value={input.buyerType}
                onChange={(event) => update("buyerType", event.target.value as BuyerType)}
                className="min-h-12 rounded-2xl border border-line bg-white px-4 py-3 text-text"
              >
                {Object.entries(buyerTypeLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-text">Deposit percentage</span>
              <span className="relative">
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={0.5}
                  value={input.depositPercentage ?? 0}
                  onChange={(event) => update("depositPercentage", Number(event.target.value))}
                  className="min-h-12 w-full rounded-2xl border border-line px-4 py-3 pr-10 text-text"
                />
                <span aria-hidden="true" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">
                  %
                </span>
              </span>
            </label>
          </form>

          <div aria-live="polite" className="rounded-3xl bg-brand-deep p-5 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">
              Estimated upfront cash
            </p>
            <p className="mt-3 font-serif text-4xl">{formatCurrency(result.totalUpfrontCash)}</p>
            <dl className="mt-5 grid gap-3 border-t border-white/20 pt-5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-white/75">Deposit</dt>
                <dd className="font-semibold">{formatCurrency(result.depositAmount)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-white/75">Property tax</dt>
                <dd className="font-semibold">{formatCurrency(result.propertyTaxAmount)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-white/75">Other costs and allowances</dt>
                <dd className="font-semibold">
                  {formatCurrency(
                    result.totalUpfrontCash - result.depositAmount - result.propertyTaxAmount
                  )}
                </dd>
              </div>
            </dl>
            <p className="mt-5 text-xs leading-5 text-white/70">
              Planning estimate, not a quotation. Tax uses the selected jurisdiction&apos;s official rules.
            </p>
          </div>
        </div>

        <div className="border-t border-line px-5 py-4 text-center text-sm text-muted sm:px-6">
          Powered by{" "}
          <Link href="/#calculator" target="_blank" className="font-semibold text-brand-deep underline">
            True Home Costs
          </Link>
          {" "}· Open the full calculator for editable quotes and a detailed breakdown.
        </div>
      </div>
    </section>
  );
}
