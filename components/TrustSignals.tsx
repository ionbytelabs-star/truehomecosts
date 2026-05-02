import { sourceLinks, type SourceKey } from "@/lib/source-links";

type TrustSignalsProps = {
  updatedLabel: string;
  sourceKeys?: SourceKey[];
  reviewedText?: string;
};

export function TrustSignals({ updatedLabel, sourceKeys = [], reviewedText }: TrustSignalsProps) {
  const hasOfficialSources = sourceKeys.length > 0;

  return (
    <section className="surface p-5" aria-labelledby="trust-signals-heading">
      <div className="space-y-2">
        <p className="eyebrow">What this page is based on</p>
        <h2 id="trust-signals-heading" className="font-serif text-3xl text-text">
          Trust and data notes
        </h2>
      </div>

      <ul className="mt-4 grid gap-3 text-sm text-text/90 md:grid-cols-2">
        <li className="rounded-2xl border border-line bg-white p-4">
          <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-brand-deep">Reviewed</span>
          <span className="mt-2 block">
            {reviewedText ?? `${updatedLabel} where the underlying rates and assumptions are maintained in the codebase.`}
          </span>
        </li>
        <li className="rounded-2xl border border-line bg-white p-4">
          <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-brand-deep">How to read the figures</span>
          <span className="mt-2 block">Official charges and estimate-led costs are shown separately so buyers can see which parts of the total are fixed rules and which parts are planning ranges.</span>
        </li>
        <li className="rounded-2xl border border-line bg-white p-4">
          <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-brand-deep">When to double-check</span>
          <span className="mt-2 block">Figures are guidance only. Buyers should check important numbers with their solicitor, lender or the relevant official authority before making financial decisions.</span>
        </li>
        <li className="rounded-2xl border border-line bg-white p-4">
          <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-brand-deep">Source style</span>
          <span className="mt-2 block">
            {hasOfficialSources
              ? "This page includes official-rate references and linked source notes where applicable."
              : "This page is mainly built from UK planning estimates rather than direct government fee tables."}
          </span>
        </li>
      </ul>

      {hasOfficialSources ? (
        <p className="mt-4 text-sm text-muted">
          Official reference points used on this page include{" "}
          {sourceKeys.slice(0, 2).map((key, index) => (
            <span key={key}>
              <a href={sourceLinks[key].href} target="_blank" rel="noreferrer" className="underline hover:text-brand-deep">
                {sourceLinks[key].label}
              </a>
              {index < Math.min(sourceKeys.length, 2) - 1 ? " and " : ""}
            </span>
          ))}
          .
        </p>
      ) : null}
    </section>
  );
}
