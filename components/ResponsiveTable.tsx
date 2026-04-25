type ResponsiveTableProps = {
  caption?: string;
  columns: string[];
  rows: string[][];
};

export function ResponsiveTable({ caption, columns, rows }: ResponsiveTableProps) {
  return (
    <div
      role="region"
      aria-label={caption ?? "Guide data table"}
      className="overflow-hidden rounded-3xl border border-line"
    >
      {caption ? (
        <div className="border-b border-line bg-panel-strong px-5 py-4 text-sm font-medium text-text">
          {caption}
        </div>
      ) : null}

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <thead className="bg-[#f7f8f4] text-muted">
            <tr>
              {columns.map((column) => (
                <th key={column} scope="col" className="px-4 py-3 font-medium whitespace-nowrap">
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
                    <th key={`${row[0]}-${index}`} scope="row" className="px-4 py-3 font-medium text-text">
                      <span className="block min-w-[10rem]">{cell}</span>
                    </th>
                  ) : (
                    <td key={`${row[0]}-${index}`} className="px-4 py-3 text-text/90">
                      <span className="block min-w-[12rem]">{cell}</span>
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
