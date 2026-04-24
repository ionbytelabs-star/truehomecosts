type ResponsiveTableProps = {
  caption?: string;
  columns: string[];
  rows: string[][];
};

export function ResponsiveTable({ caption, columns, rows }: ResponsiveTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-line">
      {caption ? (
        <div className="border-b border-line bg-panel-strong px-5 py-4 text-sm font-medium text-text">
          {caption}
        </div>
      ) : null}

      <div className="grid gap-3 p-3 md:hidden" aria-label={caption ?? "Table data"}>
        {rows.map((row) => (
          <article key={row.join("-")} className="rounded-2xl border border-line bg-white p-4">
            <dl className="grid gap-3">
              {row.map((cell, index) => (
                <div key={`${columns[index]}-${cell}`} className="grid gap-1">
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-deep">
                    {columns[index]}
                  </dt>
                  <dd className="text-sm text-text/90">{cell}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full text-left text-sm">
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <thead className="bg-[#f7f8f4] text-muted">
            <tr>
              {columns.map((column) => (
                <th key={column} scope="col" className="px-4 py-3 font-medium">
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
                    <th key={cell} scope="row" className="px-4 py-3 font-medium text-text">
                      {cell}
                    </th>
                  ) : (
                    <td key={cell} className="px-4 py-3 text-text/90">
                      {cell}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
