type ResponsiveTableProps = {
  summary?: string;
  caption?: string;
  columns: readonly string[];
  rows: readonly (readonly string[])[];
};

function isNumericColumn(header: string | undefined): boolean {
  if (!header) {
    return false;
  }

  const normalised = header.trim().toLowerCase();

  if (/(item|type|why|what|note|notes|covers|scenario|category|band|nation)/i.test(normalised)) {
    return false;
  }

  return /^(amount|rate|fee|fees|deposit|cash|total|tax|price|value)$/.test(normalised);
}

function looksNumericValue(value: string | undefined): boolean {
  if (!value) {
    return false;
  }

  return /^£?\d|^\d+%|^\d[\d,.\s]*(to|-|–)/.test(value.trim());
}

function listColumns(columns: readonly string[]): string {
  if (columns.length === 0) {
    return "the key figures";
  }

  if (columns.length === 1) {
    return columns[0];
  }

  if (columns.length === 2) {
    return `${columns[0]} and ${columns[1]}`;
  }

  return `${columns.slice(0, -1).join(", ")}, and ${columns[columns.length - 1]}`;
}

function defaultSummary(caption?: string, columns: readonly string[] = []): string | undefined {
  if (!caption) {
    return undefined;
  }

  return `The table below shows ${caption.charAt(0).toLowerCase()}${caption.slice(
    1
  )}, with columns for ${listColumns(columns)}.`;
}

export function ResponsiveTable({ caption, columns, rows, summary }: ResponsiveTableProps) {
  const tableSummary = summary ?? defaultSummary(caption, columns);

  return (
    <div role="region" aria-label={caption ?? "Guide data table"} className="space-y-3">
      {tableSummary ? <p className="max-w-prose text-sm text-muted">{tableSummary}</p> : null}

      <div className="overflow-hidden rounded-3xl border border-line bg-white">
        <div
          tabIndex={0}
          className="overflow-x-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-deep/30"
        >
          <table className="min-w-full border-collapse text-left text-sm">
            {caption ? (
              <caption className="caption-top border-b border-line bg-panel-strong px-5 py-4 text-left text-sm font-medium text-text">
                {caption}
              </caption>
            ) : null}
            <thead className="bg-[#f7f8f4] text-muted">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className={`px-4 py-3 font-medium whitespace-nowrap ${
                      isNumericColumn(column) ? "text-right tabular-nums" : "text-left"
                    }`}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.join("-")} className="border-t border-line align-top">
                  {row.map((cell, index) =>
                    index === 0 ? (
                    <th
                      key={`${row[0]}-${index}`}
                      scope="row"
                      className="min-w-[11rem] bg-white px-4 py-3 font-medium text-text"
                    >
                      {cell}
                    </th>
                  ) : (
                      <td
                        key={`${row[0]}-${index}`}
                        className={`px-4 py-3 text-text/90 ${
                          isNumericColumn(columns[index]) || looksNumericValue(cell)
                            ? "min-w-[8rem] text-right tabular-nums whitespace-nowrap"
                            : "min-w-[12rem] text-left"
                        }`}
                      >
                        {cell}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="border-t border-line bg-[#fcfcf9] px-5 py-3 text-xs text-muted">
          On smaller screens, scroll sideways to view every column clearly.
        </p>
      </div>
    </div>
  );
}
