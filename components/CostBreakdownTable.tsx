import Link from "next/link";
import { Fragment, type ReactNode } from "react";

import type { BreakdownLine } from "@/lib/calculator";
import { calculatorGuideLinks } from "@/lib/calculator-guide-links";
import { classificationLabels } from "@/lib/cost-scopes";
import { formatCurrency } from "@/lib/format";

type CostBreakdownTableProps = {
  items: BreakdownLine[];
  rowSupplement?: {
    key: BreakdownLine["key"];
    content: ReactNode;
  };
};

export function CostBreakdownTable({ items, rowSupplement }: CostBreakdownTableProps) {
  return (
    <div className="surface overflow-hidden" role="region" aria-labelledby="cost-breakdown-title">
      <div className="border-b border-line px-6 py-4">
        <h3 id="cost-breakdown-title" className="font-serif text-2xl text-text">
          Cost breakdown
        </h3>
        <p className="mt-1 text-sm text-muted">
          Official charges, market estimates, your amounts and optional allowances are labelled consistently.
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
            {items.map((item) => {
              const guideLink = calculatorGuideLinks[item.key];

              return (
                <Fragment key={item.key}>
                  <tr className="border-t border-line align-top">
                    <th scope="row" className="min-w-[10rem] px-6 py-4 font-medium text-text">
                      {item.label}
                    </th>
                    <td className="px-6 py-4 text-sm text-muted">
                      {classificationLabels[item.classification]}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-text whitespace-nowrap tabular-nums">
                      {formatCurrency(item.value)}
                    </td>
                    <td className="min-w-[14rem] px-6 py-4 text-sm text-muted">
                      {item.detail}
                      {guideLink ? (
                        <p className="mt-2 leading-6">
                          <Link
                            href={guideLink.href}
                            className="rounded-sm font-semibold text-brand-deep underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                          >
                            {guideLink.label}
                          </Link>
                        </p>
                      ) : null}
                    </td>
                  </tr>
                  {rowSupplement?.key === item.key ? (
                    <tr className="border-t border-brand/15 bg-[#fbfdf9]">
                      <td colSpan={4} className="px-4 py-4 sm:px-6">
                        {rowSupplement.content}
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="border-t border-line bg-[#fcfcf9] px-6 py-3 text-xs text-muted">
        This is a planning estimate, not a quotation. Confirm taxes, legal fees, mortgage charges and other costs before committing to a purchase. On smaller screens, scroll sideways for all columns.
      </p>
    </div>
  );
}
