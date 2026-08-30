"use client";

import { useState } from "react";

import { trackEvent } from "@/lib/analytics";
import {
  compareMortgageFees,
  mortgageFeeWorkedExample,
  type FeeTreatment,
  type MortgageDealResult,
  type MortgageFeeComparisonInput,
  type MortgageFeeComparisonResult
} from "@/lib/mortgage-fee-comparison";

type DealFormState = {
  annualRatePercent: string;
  productFee: string;
  feeTreatment: FeeTreatment;
  otherOneOffCost: string;
  cashback: string;
};

type FormState = {
  originalMortgageAmount: string;
  termYears: string;
  comparisonMonths: string;
  dealA: DealFormState;
  dealB: DealFormState;
};

type FieldErrors = Record<string, string>;

const initialDeal: DealFormState = {
  annualRatePercent: "",
  productFee: "",
  feeTreatment: "upfront",
  otherOneOffCost: "0",
  cashback: "0"
};

const initialForm: FormState = {
  originalMortgageAmount: "",
  termYears: "25",
  comparisonMonths: "60",
  dealA: { ...initialDeal },
  dealB: { ...initialDeal }
};

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

function formatGbp(value: number) {
  return gbp.format(Math.abs(value));
}

function formatInputNumber(value: number) {
  return String(value);
}

function parseField(value: string) {
  return value.trim() === "" ? Number.NaN : Number(value);
}

function validateForm(form: FormState): { input?: MortgageFeeComparisonInput; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const mortgageAmount = parseField(form.originalMortgageAmount);
  const termYears = parseField(form.termYears);
  const comparisonMonths = parseField(form.comparisonMonths);

  if (!Number.isFinite(mortgageAmount) || mortgageAmount <= 0) {
    errors.originalMortgageAmount = "Enter a mortgage amount greater than £0.";
  }
  if (!Number.isFinite(termYears) || termYears <= 0 || !Number.isInteger(termYears * 12)) {
    errors.termYears = "Enter a term that resolves to a whole number of months.";
  }
  if (!Number.isFinite(comparisonMonths) || comparisonMonths <= 0 || !Number.isInteger(comparisonMonths)) {
    errors.comparisonMonths = "Enter a whole number of months greater than 0.";
  } else if (Number.isFinite(termYears) && comparisonMonths > termYears * 12) {
    errors.comparisonMonths = "The comparison period cannot exceed the mortgage term.";
  }

  const parseDeal = (deal: DealFormState, key: "dealA" | "dealB") => {
    const annualRatePercent = parseField(deal.annualRatePercent);
    const productFee = parseField(deal.productFee);
    const otherOneOffCost = parseField(deal.otherOneOffCost || "0");
    const cashback = parseField(deal.cashback || "0");

    if (!Number.isFinite(annualRatePercent) || annualRatePercent < 0 || annualRatePercent > 100) {
      errors[`${key}.annualRatePercent`] = "Enter a rate from 0% to 100%.";
    }
    if (!Number.isFinite(productFee) || productFee < 0) {
      errors[`${key}.productFee`] = "Enter a product fee of £0 or more.";
    }
    if (!Number.isFinite(otherOneOffCost) || otherOneOffCost < 0) {
      errors[`${key}.otherOneOffCost`] = "Enter an additional cost of £0 or more.";
    }
    if (!Number.isFinite(cashback) || cashback < 0) {
      errors[`${key}.cashback`] = "Enter cashback of £0 or more.";
    }

    return {
      annualRatePercent,
      productFee,
      feeTreatment: deal.feeTreatment,
      otherOneOffCost,
      cashback
    };
  };

  const dealA = parseDeal(form.dealA, "dealA");
  const dealB = parseDeal(form.dealB, "dealB");

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return {
    errors,
    input: {
      originalMortgageAmount: mortgageAmount,
      termYears,
      comparisonMonths,
      dealA,
      dealB
    }
  };
}

type NumberFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  prefix?: string;
  suffix?: string;
  step?: string;
  helper?: string;
};

function NumberField({
  id,
  label,
  value,
  onChange,
  error,
  prefix,
  suffix,
  step = "1",
  helper
}: NumberFieldProps) {
  const descriptionId = `${id}-description`;
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-text">
        {label}
      </label>
      <div className="flex min-h-12 overflow-hidden rounded-2xl border border-line bg-white focus-within:border-brand">
        {prefix ? <span className="flex items-center border-r border-line bg-[#f7f8f4] px-3 text-muted">{prefix}</span> : null}
        <input
          id={id}
          name={id}
          type="number"
          inputMode="decimal"
          min="0"
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error || helper ? descriptionId : undefined}
          className="min-w-0 flex-1 bg-white px-3 py-2 text-text"
        />
        {suffix ? <span className="flex items-center border-l border-line bg-[#f7f8f4] px-3 text-muted">{suffix}</span> : null}
      </div>
      {error ? (
        <p id={descriptionId} className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : helper ? (
        <p id={descriptionId} className="text-xs text-muted">{helper}</p>
      ) : null}
    </div>
  );
}

type DealPanelProps = {
  label: "Deal A" | "Deal B";
  dealKey: "dealA" | "dealB";
  value: DealFormState;
  errors: FieldErrors;
  onChange: (field: keyof DealFormState, value: string) => void;
};

function DealPanel({ label, dealKey, value, errors, onChange }: DealPanelProps) {
  return (
    <fieldset className="rounded-3xl border border-line bg-[#fcfcf9] p-4 sm:p-5">
      <legend className="px-2 font-serif text-2xl text-text">{label}</legend>
      <div className="mt-2 grid gap-4 sm:grid-cols-2">
        <NumberField
          id={`${dealKey}-rate`}
          label="Interest rate"
          value={value.annualRatePercent}
          onChange={(next) => onChange("annualRatePercent", next)}
          error={errors[`${dealKey}.annualRatePercent`]}
          suffix="%"
          step="0.01"
        />
        <NumberField
          id={`${dealKey}-fee`}
          label="Arrangement / product fee"
          value={value.productFee}
          onChange={(next) => onChange("productFee", next)}
          error={errors[`${dealKey}.productFee`]}
          prefix="£"
          step="0.01"
        />
      </div>

      <fieldset className="mt-4 space-y-2">
        <legend className="text-sm font-semibold text-text">How is the product fee paid?</legend>
        <div className="grid grid-cols-2 gap-2">
          {(["upfront", "financed"] as const).map((treatment) => (
            <label
              key={treatment}
              className={`flex min-h-12 cursor-pointer items-center justify-center rounded-2xl border px-3 text-center text-sm font-medium transition ${
                value.feeTreatment === treatment
                  ? "border-brand bg-brand-soft text-brand-deep"
                  : "border-line bg-white text-text hover:border-brand/60"
              }`}
            >
              <input
                type="radio"
                name={`${dealKey}-fee-treatment`}
                value={treatment}
                checked={value.feeTreatment === treatment}
                onChange={() => onChange("feeTreatment", treatment)}
                className="mr-2 size-4"
              />
              {treatment === "upfront" ? "Paid upfront" : "Added to mortgage"}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <NumberField
          id={`${dealKey}-other-cost`}
          label="Other one-off cost"
          value={value.otherOneOffCost}
          onChange={(next) => onChange("otherOneOffCost", next)}
          error={errors[`${dealKey}.otherOneOffCost`]}
          prefix="£"
          step="0.01"
          helper="Optional product-specific cost"
        />
        <NumberField
          id={`${dealKey}-cashback`}
          label="Cashback / incentive"
          value={value.cashback}
          onChange={(next) => onChange("cashback", next)}
          error={errors[`${dealKey}.cashback`]}
          prefix="£"
          step="0.01"
          helper="Enter only an incentive you expect to keep"
        />
      </div>
    </fieldset>
  );
}

function ResultRows({ result }: { result: MortgageDealResult }) {
  const rows = [
    ["Monthly repayment", formatGbp(result.monthlyRepayment)],
    ["Product fee", `${formatGbp(result.productFee)} · ${result.feeTreatment === "upfront" ? "paid upfront" : "added to mortgage"}`],
    ["Starting amortised balance", formatGbp(result.startingAmortisedBalance)],
    ["Scheduled payments", formatGbp(result.scheduledPayments)],
    ["Interest during period", formatGbp(result.interestPaid)],
    ["Remaining balance", formatGbp(result.remainingBalance)],
    ["Other one-off costs", formatGbp(result.otherOneOffCost)],
    ["Cashback / incentive", `−${formatGbp(result.cashback)}`]
  ];

  if (result.feeTreatment === "financed" && result.productFee > 0) {
    rows.splice(4, 0, ["Interest from financing fee", formatGbp(result.additionalInterestFromFinancingFee)]);
  }

  return (
    <dl className="mt-4 divide-y divide-line text-sm">
      {rows.map(([label, value]) => (
        <div key={label} className="flex items-start justify-between gap-4 py-2.5">
          <dt className="text-muted">{label}</dt>
          <dd className="text-right font-medium tabular-nums text-text">{value}</dd>
        </div>
      ))}
      <div className="flex items-start justify-between gap-4 border-t-2 border-brand/20 py-3">
        <dt className="font-semibold text-text">Comparison cost</dt>
        <dd className="text-right text-lg font-semibold tabular-nums text-brand-deep">
          {formatGbp(result.comparisonCost)}
        </dd>
      </div>
    </dl>
  );
}

function periodLabel(months: number) {
  if (months % 12 === 0) {
    const years = months / 12;
    return `${years}-year`;
  }
  return `${months}-month`;
}

function ComparisonResults({ result, months }: { result: MortgageFeeComparisonResult; months: number }) {
  const summary = result.lowerCostDeal === "equal"
    ? `The deals have the same calculated cost over the ${periodLabel(months)} comparison period under these inputs.`
    : `Under these assumptions, Deal ${result.lowerCostDeal} has the lower calculated cost over the ${periodLabel(months)} comparison period by ${formatGbp(result.difference)}.`;

  return (
    <section aria-labelledby="mortgage-fee-results-heading" className="border-t border-line bg-panel-strong p-5 sm:p-6">
      <div aria-live="polite" aria-atomic="true">
        <p className="eyebrow">Calculated result</p>
        <h3 id="mortgage-fee-results-heading" className="mt-3 font-serif text-3xl text-text">
          {summary}
        </h3>
        <p className="mt-3 max-w-prose text-sm text-muted">
          {result.breakEvenMonth && result.breakEvenDeal
            ? `The higher-fee, lower-rate Deal ${result.breakEvenDeal} becomes cheaper at approximately month ${result.breakEvenMonth}.`
            : "There is no break-even point for a higher-fee, lower-rate deal within the selected comparison period."}
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {(["A", "B"] as const).map((deal) => {
          const dealResult = deal === "A" ? result.dealA : result.dealB;
          return (
            <article key={deal} className="rounded-3xl border border-line bg-white p-4 sm:p-5">
              <h4 className="font-serif text-2xl text-text">Deal {deal}</h4>
              <ResultRows result={dealResult} />
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function MortgageFeeComparisonCalculator() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [result, setResult] = useState<MortgageFeeComparisonResult | null>(null);
  const [status, setStatus] = useState("");

  const updateDeal = (dealKey: "dealA" | "dealB", field: keyof DealFormState, value: string) => {
    setForm((current) => ({
      ...current,
      [dealKey]: { ...current[dealKey], [field]: value }
    }));
  };

  const loadWorkedExample = () => {
    const example = mortgageFeeWorkedExample;
    setForm({
      originalMortgageAmount: formatInputNumber(example.originalMortgageAmount),
      termYears: formatInputNumber(example.termYears),
      comparisonMonths: formatInputNumber(example.comparisonMonths),
      dealA: {
        annualRatePercent: formatInputNumber(example.dealA.annualRatePercent),
        productFee: formatInputNumber(example.dealA.productFee),
        feeTreatment: example.dealA.feeTreatment,
        otherOneOffCost: formatInputNumber(example.dealA.otherOneOffCost),
        cashback: formatInputNumber(example.dealA.cashback)
      },
      dealB: {
        annualRatePercent: formatInputNumber(example.dealB.annualRatePercent),
        productFee: formatInputNumber(example.dealB.productFee),
        feeTreatment: example.dealB.feeTreatment,
        otherOneOffCost: formatInputNumber(example.dealB.otherOneOffCost),
        cashback: formatInputNumber(example.dealB.cashback)
      }
    });
    setErrors({});
    setResult(null);
    setStatus("Worked example loaded. Select Compare deals to calculate the result.");
  };

  const reset = () => {
    setForm({ ...initialForm, dealA: { ...initialDeal }, dealB: { ...initialDeal } });
    setErrors({});
    setResult(null);
    setStatus("Calculator reset.");
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateForm(form);
    setErrors(validation.errors);

    if (!validation.input) {
      setResult(null);
      setStatus("Check the highlighted fields and try again.");
      return;
    }

    try {
      const nextResult = compareMortgageFees(validation.input);
      setResult(nextResult);
      setStatus("Comparison calculated.");
      trackEvent("mortgage_fee_comparison_calculated", {
        comparison_period_months: validation.input.comparisonMonths,
        deal_a_fee_treatment: validation.input.dealA.feeTreatment,
        deal_b_fee_treatment: validation.input.dealB.feeTreatment,
        lower_cost_deal: nextResult.lowerCostDeal
      });
    } catch (error) {
      setResult(null);
      setStatus(error instanceof Error ? error.message : "The comparison could not be calculated.");
    }
  };

  return (
    <section id="mortgage-fee-comparison-calculator" className="scroll-mt-24 overflow-hidden rounded-3xl border border-brand/20 bg-white shadow-card">
      <div className="border-b border-brand/15 bg-panel-strong p-5 sm:p-6">
        <p className="eyebrow">Decision tool</p>
        <h2 className="mt-3 font-serif text-3xl text-text sm:text-4xl">Mortgage fee comparison calculator</h2>
        <p className="mt-3 max-w-3xl text-muted">
          Compare a fee-paying, lower-rate repayment mortgage with a lower-fee or fee-free alternative over the period you choose. Enter real product figures from the lender's documents where possible.
        </p>
        <button
          type="button"
          onClick={loadWorkedExample}
          className="mt-5 inline-flex min-h-12 items-center rounded-full border border-brand bg-white px-5 py-3 font-semibold text-brand-deep transition hover:bg-brand-soft"
        >
          Load worked example
        </button>
      </div>

      <form onSubmit={submit} noValidate className="p-5 sm:p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <NumberField
            id="originalMortgageAmount"
            label="Original mortgage amount"
            value={form.originalMortgageAmount}
            onChange={(value) => setForm((current) => ({ ...current, originalMortgageAmount: value }))}
            error={errors.originalMortgageAmount}
            prefix="£"
            step="0.01"
            helper="Borrowing before any financed product fee"
          />
          <NumberField
            id="termYears"
            label="Remaining mortgage term"
            value={form.termYears}
            onChange={(value) => setForm((current) => ({ ...current, termYears: value }))}
            error={errors.termYears}
            suffix="years"
            step="1"
          />
          <NumberField
            id="comparisonMonths"
            label="Comparison / deal period"
            value={form.comparisonMonths}
            onChange={(value) => setForm((current) => ({ ...current, comparisonMonths: value }))}
            error={errors.comparisonMonths}
            suffix="months"
            step="1"
          />
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <DealPanel
            label="Deal A"
            dealKey="dealA"
            value={form.dealA}
            errors={errors}
            onChange={(field, value) => updateDeal("dealA", field, value)}
          />
          <DealPanel
            label="Deal B"
            dealKey="dealB"
            value={form.dealB}
            errors={errors}
            onChange={(field, value) => updateDeal("dealB", field, value)}
          />
        </div>

        <p role="status" aria-live="polite" className="mt-4 min-h-6 text-sm font-medium text-muted">
          {status}
        </p>

        <div className="mt-3 flex flex-wrap gap-3">
          <button type="submit" className="inline-flex min-h-12 items-center rounded-full bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-deep">
            Compare deals
          </button>
          <button type="button" onClick={reset} className="inline-flex min-h-12 items-center rounded-full border border-line bg-white px-6 py-3 font-semibold text-text transition hover:border-brand">
            Reset
          </button>
        </div>

        <details className="mt-6 rounded-2xl border border-line bg-[#fcfcf9] p-4 text-sm text-muted">
          <summary className="cursor-pointer font-semibold text-text">Calculation scope and assumptions</summary>
          <ul className="mt-3 grid gap-2 pl-5">
            <li className="list-disc">Repayment mortgages with monthly payments only.</li>
            <li className="list-disc">The entered interest rate stays constant during the comparison period.</li>
            <li className="list-disc">No overpayments, interest-only, offset, ERC or post-period rate predictions.</li>
            <li className="list-disc">This is not an APRC calculator, regulated illustration or mortgage recommendation.</li>
          </ul>
          <p className="mt-3">
            Repayment of the original mortgage principal is not treated as a cost because it reduces the balance you still owe. The comparison therefore considers both cash paid during the selected period and the mortgage balance remaining at the end.
          </p>
        </details>
      </form>

      {result ? <ComparisonResults result={result} months={Number(form.comparisonMonths)} /> : null}
    </section>
  );
}
