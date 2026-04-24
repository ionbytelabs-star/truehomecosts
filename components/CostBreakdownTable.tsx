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

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <caption className="sr-only">
            Cost breakdown showing the item name, whether it is an official charge or an estimate, the amount,
            and why it is included.
          </caption>
          <thead className="bg-[#f7f8f4] text-sm text-muted">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">Cost</th>
              <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">Type</th>
              <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">Amount</th>
              <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">Why it is here</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.key} className="border-t border-line align-top">
                <th scope="row" className="px-6 py-4 font-medium text-text">
                  <span className="block min-w-[10rem]">{item.label}</span>
                </th>
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
                <td className="px-6 py-4 font-semibold text-text whitespace-nowrap">{formatCurrency(item.value)}</td>
                <td className="px-6 py-4 text-sm text-muted">
                  <span className="block min-w-[14rem]">{item.detail}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
