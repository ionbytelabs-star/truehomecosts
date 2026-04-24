import Link from "next/link";

import { guideMap } from "@/content/guides";

type RelatedGuidesProps = {
  slugs: string[];
};

export function RelatedGuides({ slugs }: RelatedGuidesProps) {
  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <p className="eyebrow">Related guides</p>
        <h2 className="font-serif text-3xl text-text">Read next</h2>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {slugs.map((slug) => {
          const guide = guideMap[slug];

          if (!guide) {
            return null;
          }

          return (
            <Link key={slug} href={`/${slug}`} className="surface block p-4 transition hover:-translate-y-0.5 hover:shadow-soft">
              <h3 className="text-lg font-semibold text-text">{guide.h1}</h3>
              <p className="mt-2 text-sm text-muted">{guide.description}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
