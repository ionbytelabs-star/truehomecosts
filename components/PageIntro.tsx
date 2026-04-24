type PageIntroProps = {
  title: string;
  description: string;
  summary?: string;
  badge?: string;
};

export function PageIntro({ title, description, summary, badge }: PageIntroProps) {
  return (
    <section className="section-gap pb-6 pt-8">
      <div className="shell space-y-4">
        {badge ? <p className="eyebrow">{badge}</p> : null}
        <div className="space-y-2">
          <h1 className="font-serif text-4xl text-text sm:text-5xl">{title}</h1>
          <p className="max-w-prose text-lg text-muted">{description}</p>
        </div>
        {summary ? (
          <div className="surface max-w-prose border-brand/20 bg-panel-strong p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep">Direct answer</p>
            <p className="mt-2 text-text">{summary}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
