"use client";

import { useState } from "react";

import {
  getHmlrScale1Fee,
  getHmlrScale2Fee,
  hmlrFeeCalculatorUrl,
  parseHmlrAssessmentValue,
  type HmlrScale1Route,
  type HmlrScale2Route
} from "@/data/fees/hmlr";
import { formatCurrency } from "@/lib/format";

type ApplicationMode = "purchase" | "first-registration" | "scale-2" | "other";

type ModeOption = {
  value: ApplicationMode;
  label: string;
  description: string;
};

const modeOptions: ModeOption[] = [
  {
    value: "purchase",
    label: "Typical property purchase",
    description: "Transfer of registered land for monetary consideration — Scale 1."
  },
  {
    value: "first-registration",
    label: "First registration",
    description: "Registration of land that is not already registered."
  },
  {
    value: "scale-2",
    label: "Scale 2 / other applicable transaction",
    description: "For users who already know the fee-assessment value."
  },
  {
    value: "other",
    label: "Other / I’m not sure",
    description: "Use official guidance rather than guessing an application route."
  }
];

const purchaseRoutes: Array<{ value: HmlrScale1Route; label: string; detail: string }> = [
  {
    value: "portal-whole",
    label: "Portal / Business Gateway — whole registered title",
    detail: "Scale 1 · Electronic · Whole registered title"
  },
  {
    value: "portal-part-lease",
    label: "Portal / Business Gateway — part title or lease",
    detail: "Scale 1 · Electronic · Part title / lease"
  },
  { value: "post", label: "Postal application", detail: "Scale 1 · Postal application" }
];

const firstRegistrationRoutes: Array<{ value: HmlrScale1Route; label: string; detail: string }> = [
  {
    value: "post",
    label: "Standard first registration",
    detail: "Scale 1 · Standard first registration"
  },
  {
    value: "voluntary-first-registration",
    label: "Voluntary first registration (reduced fee)",
    detail: "Scale 1 · Voluntary first registration"
  }
];

const scale2Routes: Array<{ value: HmlrScale2Route; label: string; detail: string }> = [
  {
    value: "portal-whole",
    label: "Portal / Business Gateway — whole registered title",
    detail: "Scale 2 · Electronic · Whole registered title"
  },
  {
    value: "portal-part-other",
    label: "Portal / Business Gateway — part title / other",
    detail: "Scale 2 · Electronic · Part title / other application"
  },
  { value: "post", label: "Postal application", detail: "Scale 2 · Postal application" }
];

function formatInputValue(value: number): string {
  return new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 }).format(value);
}

export function HmlrFeeCalculator() {
  const [mode, setMode] = useState<ApplicationMode>("purchase");
  const [rawValue, setRawValue] = useState("300,000");
  const [scale1Route, setScale1Route] = useState<HmlrScale1Route>("portal-whole");
  const [scale2Route, setScale2Route] = useState<HmlrScale2Route>("portal-whole");

  const value = parseHmlrAssessmentValue(rawValue);
  const valueError = rawValue.trim().length === 0
    ? "Enter the value used to assess the fee."
    : value === null
      ? "Enter a valid amount of £0 or more using numbers only."
      : null;

  const scale1Routes = mode === "first-registration" ? firstRegistrationRoutes : purchaseRoutes;
  const activeRoute = mode === "scale-2" ? scale2Route : scale1Route;
  const activeRouteOption = mode === "scale-2"
    ? scale2Routes.find((route) => route.value === scale2Route)
    : scale1Routes.find((route) => route.value === scale1Route);
  const fee = value === null || mode === "other"
    ? null
    : mode === "scale-2"
      ? getHmlrScale2Fee(value, scale2Route)
      : getHmlrScale1Fee(value, scale1Route);

  function changeMode(nextMode: ApplicationMode) {
    setMode(nextMode);

    if (nextMode === "purchase") {
      setScale1Route("portal-whole");
    } else if (nextMode === "first-registration") {
      setScale1Route("post");
    } else if (nextMode === "scale-2") {
      setScale2Route("portal-whole");
    }
  }

  function formatValueOnBlur() {
    const parsedValue = parseHmlrAssessmentValue(rawValue);
    if (parsedValue !== null) {
      setRawValue(formatInputValue(parsedValue));
    }
  }

  return (
    <section
      id="calculator"
      aria-labelledby="calculator-heading"
      className="scroll-mt-24 rounded-3xl border border-brand/25 bg-white p-5 shadow-card sm:p-7 lg:p-8"
    >
      <div className="max-w-3xl">
        <h2 id="calculator-heading" className="font-serif text-3xl text-text sm:text-4xl">
          Calculate your HM Land Registry fee
        </h2>
        <p className="mt-2 text-muted">
          For England and Wales. Choose the application route and enter the value used to assess the fee.
        </p>
      </div>

      <fieldset className="mt-7">
        <legend className="text-base font-semibold text-text">What is the application for?</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {modeOptions.map((option) => (
            <label
              key={option.value}
              className={`flex min-h-24 cursor-pointer gap-3 rounded-2xl border p-4 transition ${
                mode === option.value
                  ? "border-brand bg-brand-soft/55 shadow-sm"
                  : "border-line bg-white hover:border-brand/60"
              }`}
            >
              <input
                type="radio"
                name="application-mode"
                value={option.value}
                checked={mode === option.value}
                onChange={() => changeMode(option.value)}
                className="mt-1 h-5 w-5 shrink-0 accent-brand"
              />
              <span>
                <span className="block font-semibold text-text">{option.label}</span>
                <span className="mt-1 block text-sm leading-6 text-muted">{option.description}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {mode === "other" ? (
        <div className="mt-7 min-h-44 rounded-2xl border border-brand/20 bg-panel-strong p-5 sm:p-6">
          <h3 className="text-xl font-semibold text-text">Check the application rather than guessing</h3>
          <p className="mt-2 max-w-3xl text-muted">
            Land-registration applications can be complex, and the correct fee can depend on details this calculator
            does not collect. Ask your solicitor or conveyancer to confirm the route, or use HM Land Registry’s official
            fee calculator.
          </p>
          <a
            href={hmlrFeeCalculatorUrl}
            className="mt-4 inline-flex min-h-11 items-center font-semibold text-brand-deep underline hover:text-brand"
          >
            Open the official HM Land Registry fee calculator
          </a>
        </div>
      ) : (
        <>
          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            <div>
              <label htmlFor="hmlr-value" className="block font-semibold text-text">
                {mode === "scale-2"
                  ? "Fee assessment value"
                  : mode === "first-registration"
                    ? "Property value or consideration"
                    : "Purchase price or value"}
              </label>
              <div className="mt-2 flex overflow-hidden rounded-xl border border-line bg-white focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/25">
                <span aria-hidden="true" className="flex min-h-12 items-center border-r border-line bg-[#f7f8f4] px-4 text-lg text-muted">
                  £
                </span>
                <input
                  id="hmlr-value"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  value={rawValue}
                  onChange={(event) => setRawValue(event.target.value)}
                  onBlur={formatValueOnBlur}
                  aria-invalid={Boolean(valueError)}
                  aria-describedby={valueError ? "hmlr-value-error" : "hmlr-value-help"}
                  className="min-h-12 min-w-0 flex-1 bg-transparent px-4 text-lg font-semibold tabular-nums text-text focus-visible:ring-0"
                />
              </div>
              {valueError ? (
                <p id="hmlr-value-error" role="alert" className="mt-2 text-sm font-medium text-warning">
                  {valueError}
                </p>
              ) : (
                <p id="hmlr-value-help" className="mt-2 text-sm text-muted">
                  {mode === "scale-2"
                    ? "This may not equal the full property value in every situation. Enter the assessment value only if you know it."
                    : mode === "first-registration"
                      ? "Use the consideration or open-market value that applies under HMLR guidance."
                      : "For a purchase, this is usually the VAT-inclusive consideration paid."}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="hmlr-route" className="block font-semibold text-text">
                Application route
              </label>
              <select
                id="hmlr-route"
                value={activeRoute}
                onChange={(event) => {
                  if (mode === "scale-2") {
                    setScale2Route(event.target.value as HmlrScale2Route);
                  } else {
                    setScale1Route(event.target.value as HmlrScale1Route);
                  }
                }}
                className="mt-2 min-h-12 w-full rounded-xl border border-line bg-white px-4 py-3 font-medium text-text"
              >
                {(mode === "scale-2" ? scale2Routes : scale1Routes).map((route) => (
                  <option key={route.value} value={route.value}>{route.label}</option>
                ))}
              </select>
              <p className="mt-2 text-sm text-muted">
                Choose the route your conveyancer expects to use. Part-title, lease and postal applications do not get
                the common whole-title electronic reduction.
              </p>
            </div>
          </div>

          <div
            aria-live="polite"
            aria-atomic="true"
            className="mt-7 min-h-64 rounded-2xl border border-brand/20 bg-panel-strong p-5 sm:min-h-60 sm:p-6"
          >
            {fee === null || value === null ? (
              <div>
                <p className="font-semibold text-text">Estimated HM Land Registry fee</p>
                <p className="mt-3 text-muted">Enter a valid value to see a fee for the selected route.</p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)] sm:items-start">
                <div>
                  <p className="font-semibold text-text">Estimated HM Land Registry fee</p>
                  <p className="mt-2 font-serif text-5xl text-brand-deep sm:text-6xl">{formatCurrency(fee)}</p>
                </div>
                <div className="sm:pt-1">
                  <p className="font-semibold text-brand-deep">{activeRouteOption?.detail}</p>
                  <p className="mt-2 text-text">
                    Based on a {formatCurrency(value)} {mode === "purchase" ? "purchase" : "assessment value"}.
                  </p>
                </div>
              </div>
            )}
            <p className="mt-5 border-t border-brand/15 pt-4 text-sm leading-6 text-muted">
              This is the current published HM Land Registry fee for the options selected. Your solicitor or
              conveyancer should confirm that your application falls within this route before submission.
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              <a href="#scale-1-fees" className="text-brand-deep underline hover:text-brand">View the full Scale 1 table</a>
              <a href="#scale-2-fees" className="text-brand-deep underline hover:text-brand">View the full Scale 2 table</a>
              <a href={hmlrFeeCalculatorUrl} className="text-brand-deep underline hover:text-brand">Official HMLR fee calculator</a>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
