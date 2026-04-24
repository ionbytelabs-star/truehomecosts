import type { BreakdownLine } from "@/lib/calculator";
import { formatCurrency } from "@/lib/format";

type CostBreakdownTableProps = {
  items: BreakdownLine[];
};

export function CostBreakdownTable({ items }: CostBreakdownTableProps) {
  return (
    <div className="surface overflow-hidden">
      <div className="border-b border-line px-6 py-4">
        <h3 className="font-serif text-2xl text-text">Cost breakdown</h3>
        <p className="mt-1 text-sm text-muted">
          Official-rate lines are separated from planning estimates so you can see what is fixed and what may move.
        </p>
      </div>

      <div className="grid gap-3 p-4 md:hidden" aria-label="Cost breakdown">
        {items.map((item) => (
          <article key={item.key} className="rounded-2xl border border-line bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <h4 className="text-base font-semibold text-text">{item.label}</h4>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                  item.sourceType === "official" ? "bg-brand-soft text-brand-deep" : "bg-[#f5efe5] text-warning"
                }`}
              >
                {item.sourceType === "official" ? "Official / direct" : "Estimate"}
              </span>
            </div>
            <dl className="mt-4 grid gap-3 text-sm">
              <div className="grid gap-1">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-deep">Amount</dt>
                <dd className="font-semibold text-text">{formatCurrency(item.value)}</dd>
              </div>
              <div className="grid gap-1">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-deep">Why it is here</dt>
                <dd className="text-text/90">{item.detail}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full text-left">
          <caption className="sr-only">
            Cost breakdown showing the item name, whether it is an official charge or an estimate, the amount,
            and why it is included.
          </caption>
          <thead className="bg-[#f7f8f4] text-sm text-muted">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">Cost</th>
              <th scope="col" className="px-6 py-3 font-medium">Type</th>
              <th scope="col" className="px-6 py-3 font-medium">Amount</th>
              <th scope="col" className="px-6 py-3 font-medium">Why it is here</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.key} className="border-t border-line align-top">
                <th scope="row" className="px-6 py-4 font-medium text-text">{item.label}</th>
                <td className="px-6 py-4 text-sm text-muted">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 ${
                      item.sourceType === "official"
                        ? "bg-brand-soft text-brand-deep"
                        : "bg-[#f5efe5] text-warning"
                    }`}
                  >
                    {item.sourceType === "official" ? "Official / direct" : "Estimate"}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold text-text">{formatCurrency(item.value)}</td>
                <td className="px-6 py-4 text-sm text-muted">{item.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
