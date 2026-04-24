import { sourceLinks, type SourceKey } from "@/lib/source-links";

type DataSourcesProps = {
  sourceKeys: SourceKey[];
};

export function DataSources({ sourceKeys }: DataSourcesProps) {
  if (sourceKeys.length === 0) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-line bg-white p-5">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep">Data sources</p>
      <ul className="mt-3 grid gap-2 text-sm text-muted">
        {sourceKeys.map((key) => (
          <li key={key}>
            <a href={sourceLinks[key].href} target="_blank" rel="noreferrer" className="underline hover:text-brand-deep">
              {sourceLinks[key].label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
