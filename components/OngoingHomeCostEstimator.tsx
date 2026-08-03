"use client";

import { useState } from "react";

import {
  calculateOngoingHomeCosts,
  defaultOngoingHomeCostInput,
  type OngoingHomeCostInput
} from "@/data/assumptions/ongoing-home-costs";

const monthlyFields = [
  ["mortgage", "Monthly mortgage payment", "Add your own repayment; the example starts at £0."],
  ["councilTaxOrRates", "Council tax or domestic rates", "Use the amount on your bill."],
  ["gasAndElectricity", "Gas and electricity", "Enter your combined monthly amount."],
  ["water", "Water", "For Scotland, use the water and sewerage amount shown with your council-tax bill."],
  ["broadbandCommunications", "Broadband and communications", "Include phone or television services only when part of this budget."],
  ["buildingsInsurance", "Buildings insurance", "Enter £0 if it is already included in a service charge."],
  ["contentsInsurance", "Contents insurance", "Keep this separate from buildings cover."],
  ["maintenanceReserve", "Monthly maintenance reserve", "A sinking fund for repairs, servicing and replacements."],
  ["serviceCharge", "Monthly service charge", "Use £0 if it does not apply."],
  ["estateCharge", "Monthly estate charge", "Use £0 if it does not apply."],
  ["otherMonthlyCosts", "Other monthly ownership costs", "Add only costs not already counted above."]
] as const;

const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function OngoingHomeCostEstimator() {
  const [input, setInput] = useState<OngoingHomeCostInput>(defaultOngoingHomeCostInput);
  let result: ReturnType<typeof calculateOngoingHomeCosts> | null = null;
  let validationMessage = "";

  try {
    result = calculateOngoingHomeCosts(input);
  } catch (error) {
    validationMessage = error instanceof Error ? error.message : "Check the amounts entered.";
  }

  function updateAmount(key: (typeof monthlyFields)[number][0] | "annualIrregularCosts", value: number) {
    setInput((current) => ({ ...current, [key]: Number.isNaN(value) ? 0 : value }));
  }

  function resetExample() {
    setInput(defaultOngoingHomeCostInput);
  }

  return (
    <section id="calculator" className="scroll-mt-24 surface overflow-hidden" aria-labelledby="estimator-heading">
      <div className="border-b border-line bg-panel-strong p-5 sm:p-7">
        <p className="eyebrow">Personal budgeting tool</p>
        <h2 id="estimator-heading" className="mt-3 font-serif text-3xl text-text">
          Monthly homeownership cost estimator
        </h2>
        <p className="mt-3 max-w-prose text-muted">
          Replace every example amount with your own bill, quote or reserve. Calculations stay in your browser and
          are not sent to a third party or stored.
        </p>
      </div>

      <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[1.15fr_0.85fr]">
        <form className="space-y-6" onSubmit={(event) => event.preventDefault()} noValidate>
          <div>
            <label htmlFor="home-cost-nation" className="block text-sm font-semibold text-text">
              UK nation
            </label>
            <select
              id="home-cost-nation"
              value={input.nation}
              onChange={(event) =>
                setInput((current) => ({
                  ...current,
                  nation: event.target.value as OngoingHomeCostInput["nation"]
                }))
              }
              className="mt-2 min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-text"
            >
              <option value="england">England</option>
              <option value="scotland">Scotland</option>
              <option value="wales">Wales</option>
              <option value="northern-ireland">Northern Ireland</option>
            </select>
            <p className="mt-2 text-xs text-muted">
              Changing nation does not guess your bill: enter the actual council tax, domestic rates or water amount.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {monthlyFields.map(([key, label, hint]) => (
              <div key={key}>
                <label htmlFor={`home-cost-${key}`} className="block text-sm font-semibold text-text">
                  {label}
                </label>
                <div className="relative mt-2">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted" aria-hidden="true">
                    £
                  </span>
                  <input
                    id={`home-cost-${key}`}
                    name={key}
                    type="number"
                    inputMode="decimal"
                    min="0"
                    max="1000000"
                    step="0.01"
                    value={input[key]}
                    onChange={(event) => updateAmount(key, event.currentTarget.valueAsNumber)}
                    aria-describedby={`home-cost-${key}-hint`}
                    className="min-h-12 w-full rounded-2xl border border-line bg-white py-2 pl-8 pr-4 tabular-nums text-text"
                  />
                </div>
                <p id={`home-cost-${key}-hint`} className="mt-1 text-xs leading-5 text-muted">
                  {hint}
                </p>
              </div>
            ))}

            <div>
              <label htmlFor="home-cost-annualIrregularCosts" className="block text-sm font-semibold text-text">
                Annual irregular costs
              </label>
              <div className="relative mt-2">
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted" aria-hidden="true">
                  £
                </span>
                <input
                  id="home-cost-annualIrregularCosts"
                  name="annualIrregularCosts"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  max="1000000"
                  step="0.01"
                  value={input.annualIrregularCosts}
                  onChange={(event) => updateAmount("annualIrregularCosts", event.currentTarget.valueAsNumber)}
                  aria-describedby="home-cost-annualIrregularCosts-hint"
                  className="min-h-12 w-full rounded-2xl border border-line bg-white py-2 pl-8 pr-4 tabular-nums text-text"
                />
              </div>
              <p id="home-cost-annualIrregularCosts-hint" className="mt-1 text-xs leading-5 text-muted">
                Annual servicing or other irregular bills not already covered by the monthly maintenance reserve.
              </p>
            </div>
          </div>

          <label className="flex items-start gap-3 rounded-2xl border border-line bg-panel-strong p-4 text-sm text-text">
            <input
              type="checkbox"
              checked={input.buildingsInsuranceIncludedInServiceCharge}
              onChange={(event) =>
                setInput((current) => ({
                  ...current,
                  buildingsInsuranceIncludedInServiceCharge: event.target.checked
                }))
              }
              className="mt-1 h-5 w-5 shrink-0 accent-brand"
            />
            <span>
              <strong className="block">Buildings insurance is included in the service charge</strong>
              When selected and a service charge is entered, the estimator removes the separate buildings-insurance
              amount to avoid double counting.
            </span>
          </label>

          <button
            type="button"
            onClick={resetExample}
            className="min-h-11 rounded-full border border-brand px-5 py-2 font-semibold text-brand-deep transition hover:bg-brand-soft"
          >
            Reset to the £625 example
          </button>
        </form>

        <div aria-live="polite" className="lg:sticky lg:top-6 lg:self-start">
          {validationMessage || !result ? (
            <div role="alert" className="rounded-3xl border border-warning bg-white p-5 text-text">
              <h3 className="font-semibold">Check the amount entered</h3>
              <p className="mt-2 text-sm text-muted">{validationMessage}</p>
            </div>
          ) : (
            <div className="rounded-3xl bg-brand-deep p-5 text-white shadow-soft sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">Your estimate</p>
              <div className="mt-5 grid gap-4">
                <div>
                  <p className="text-sm text-white/75">Monthly non-mortgage total</p>
                  <p className="mt-1 text-3xl font-semibold tabular-nums">{formatCurrency(result.nonMortgageMonthly)}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 border-t border-white/20 pt-4 text-sm">
                  <div>
                    <p className="text-white/70">Mortgage monthly</p>
                    <p className="mt-1 font-semibold tabular-nums">{formatCurrency(result.mortgageMonthly)}</p>
                  </div>
                  <div>
                    <p className="text-white/70">Total monthly</p>
                    <p className="mt-1 font-semibold tabular-nums">{formatCurrency(result.totalMonthly)}</p>
                  </div>
                  <div>
                    <p className="text-white/70">Non-mortgage annual</p>
                    <p className="mt-1 font-semibold tabular-nums">{formatCurrency(result.nonMortgageAnnual)}</p>
                  </div>
                  <div>
                    <p className="text-white/70">Total annual</p>
                    <p className="mt-1 font-semibold tabular-nums">{formatCurrency(result.totalAnnual)}</p>
                  </div>
                  <div>
                    <p className="text-white/70">Predictable recurring</p>
                    <p className="mt-1 font-semibold tabular-nums">{formatCurrency(result.predictableRecurringMonthly)}/month</p>
                  </div>
                  <div>
                    <p className="text-white/70">Irregular-cost reserve</p>
                    <p className="mt-1 font-semibold tabular-nums">{formatCurrency(result.irregularReserveMonthly)}/month</p>
                  </div>
                </div>
              </div>

              {result.buildingsInsuranceDeducted > 0 ? (
                <p className="mt-5 rounded-2xl bg-white/10 p-3 text-sm text-white/90">
                  {formatCurrency(result.buildingsInsuranceDeducted)} a month of separate buildings insurance has
                  been removed because you marked it as included in the service charge.
                </p>
              ) : null}
              {input.serviceCharge > 0 || input.estateCharge > 0 ? (
                <p className="mt-3 text-xs leading-5 text-white/75">
                  Check the lease, management pack, recent accounts and planned works. Major works and future charge
                  changes are not predicted here.
                </p>
              ) : null}
              <p className="mt-4 text-xs leading-5 text-white/70">
                Planning estimate only. This is not a quotation, a UK average or financial advice.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
