import type { AtGlanceItem } from "@/content/types";

type AtAGlanceProps = {
  items: AtGlanceItem[];
};

export function AtAGlance({ items }: AtAGlanceProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4" aria-labelledby="at-a-glance-heading">
      <div className="space-y-2">
        <p className="eyebrow">At a glance</p>
        <h2 id="at-a-glance-heading" className="font-serif text-3xl text-text">
          Key facts buyers should know first
        </h2>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.label} className="surface p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep">{item.label}</h3>
            <p className="mt-3 text-sm text-text/95">{item.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
