import { sourceLinks, type SourceKey } from "@/lib/source-links";

type OfficialSourcesProps = {
  sourceKeys: SourceKey[];
  title?: string;
};

export function OfficialSources({
  sourceKeys,
  title = "Official UK guidance"
}: OfficialSourcesProps) {
  if (sourceKeys.length === 0) {
    return null;
  }

  return (
    <section className="surface p-5" aria-labelledby="official-sources-heading">
      <div className="space-y-2">
        <p className="eyebrow">Reference points</p>
        <h2 id="official-sources-heading" className="font-serif text-3xl text-text">
          {title}
        </h2>
        <p className="max-w-prose text-sm text-muted">
          This guide is informed by publicly available UK guidance from official and consumer-support
          sources where relevant.
        </p>
      </div>
      <ul className="mt-4 grid gap-2 text-sm text-muted">
        {sourceKeys.map((key) => (
          <li key={key}>
            <a href={sourceLinks[key].href} className="underline hover:text-brand-deep">
              {sourceLinks[key].label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
