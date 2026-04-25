import type { BreakdownLine } from "@/lib/calculator";
import { formatCurrency } from "@/lib/format";

type CostBreakdownTableProps = {
  items: BreakdownLine[];
};

const breakdownTypeLabels: Record<string, string> = {
  deposit: "Buyer cash contribution",
  "property-tax": "Official charge",
  solicitors: "Solicitor / conveyancing estimate",
  searches: "Solicitor / conveyancing estimate",
  survey: "Market estimate",
  "mortgage-fees": "Lender charge",
  "land-registry": "Official charge",
  "telegraphic-transfer": "Solicitor / conveyancing estimate",
  moving: "Optional cost",
  insurance: "Optional cost",
  furnishing: "Optional cost",
  contingency: "Situation-dependent cost"
};

export function CostBreakdownTable({ items }: CostBreakdownTableProps) {
  return (
    <div className="surface overflow-hidden" role="region" aria-labelledby="cost-breakdown-title">
      <div className="border-b border-line px-6 py-4">
        <h3 id="cost-breakdown-title" className="font-serif text-2xl text-text">
          Cost breakdown
        </h3>
        <p className="mt-1 text-sm text-muted">
          The table below shows the current calculator result by cost item, separating official charges from
          lender, conveyancing, market and optional estimates so the total is easier to sense-check.
        </p>
      </div>

      <div
        tabIndex={0}
        className="overflow-x-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-deep/30"
      >
        <table className="min-w-full border-collapse text-left">
          <caption className="caption-top border-b border-line bg-panel-strong px-6 py-4 text-left text-sm font-medium text-text">
            Calculator result breakdown for the current property price, jurisdiction and buyer type
          </caption>
          <thead className="bg-[#f7f8f4] text-sm text-muted">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">Cost</th>
              <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">Type</th>
              <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap text-right">Amount</th>
              <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">Why it is here</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.key} className="border-t border-line align-top">
                <th scope="row" className="min-w-[10rem] px-6 py-4 font-medium text-text">
                  {item.label}
                </th>
                <td className="px-6 py-4 text-sm text-muted">
                  {breakdownTypeLabels[item.key] ?? (item.sourceType === "official" ? "Official charge" : "Estimate")}
                </td>
                <td className="px-6 py-4 text-right font-semibold text-text whitespace-nowrap tabular-nums">
                  {formatCurrency(item.value)}
                </td>
                <td className="min-w-[14rem] px-6 py-4 text-sm text-muted">
                  {item.detail}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-line bg-[#fcfcf9] px-6 py-3 text-xs text-muted">
        On smaller screens, scroll sideways to read the amount and explanation columns in full.
      </p>
    </div>
  );
}
