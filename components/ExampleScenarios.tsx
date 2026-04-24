import type { CalculatorResult } from "@/lib/calculator";
import { formatCurrency } from "@/lib/format";

type ExampleScenario = {
  title: string;
  summary: string;
  result: CalculatorResult;
};

type ExampleScenariosProps = {
  scenarios: ExampleScenario[];
};

export function ExampleScenarios({ scenarios }: ExampleScenariosProps) {
  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <p className="eyebrow">Worked examples</p>
        <h2 className="font-serif text-3xl text-text">Example scenarios</h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {scenarios.map((scenario) => (
          <article key={scenario.title} className="surface p-4">
            <h3 className="text-xl font-semibold text-text">{scenario.title}</h3>
            <p className="mt-2 text-sm text-muted">{scenario.summary}</p>
            <div className="mt-4 rounded-2xl bg-panel-strong p-4">
              <p className="text-sm uppercase tracking-[0.16em] text-brand-deep">Estimated upfront total</p>
              <p className="mt-2 font-serif text-4xl text-text">
                {formatCurrency(scenario.result.totalUpfrontCash)}
              </p>
            </div>
            <dl className="mt-4 grid gap-2.5 text-sm text-muted">
              <div className="flex items-center justify-between gap-4">
                <dt>Deposit</dt>
                <dd className="font-semibold text-text">{formatCurrency(scenario.result.depositAmount)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt>Property tax</dt>
                <dd className="font-semibold text-text">{formatCurrency(scenario.result.propertyTaxAmount)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt>Estimated extras and buffer</dt>
                <dd className="font-semibold text-text">
                  {formatCurrency(scenario.result.totalUpfrontCash - scenario.result.depositAmount - scenario.result.propertyTaxAmount)}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
