import Link from "next/link";

import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalloutBox } from "@/components/CalloutBox";
import { ContentSection } from "@/components/ContentSection";
import { DataSources } from "@/components/DataSources";
import { Disclaimer } from "@/components/Disclaimer";
import { FAQSection } from "@/components/FAQSection";
import { PageIntro } from "@/components/PageIntro";
import { RelatedGuides } from "@/components/RelatedGuides";
import { StructuredData } from "@/components/StructuredData";
import { guideMap } from "@/content/guides";
import type { GuidePageContent } from "@/content/types";
import { articleSchema, breadcrumbSchema, faqPageSchema, webpageSchema } from "@/lib/structured-data";

type GuidePageTemplateProps = {
  guide: GuidePageContent;
};

export function GuidePageTemplate({ guide }: GuidePageTemplateProps) {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: guide.h1 }
  ];

  return (
    <>
      <StructuredData
        data={webpageSchema({
          title: guide.h1,
          description: guide.description,
          path: `/${guide.slug}`,
          keywords: guide.keywords
        })}
      />
      <StructuredData
        data={articleSchema({
          headline: guide.h1,
          description: guide.description,
          path: `/${guide.slug}`,
          keywords: guide.keywords
        })}
      />
      <StructuredData data={faqPageSchema(guide.faqs)} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: guide.h1, path: `/${guide.slug}` }
        ])}
      />

      <Breadcrumbs items={breadcrumbItems} />
      <PageIntro
        title={guide.h1}
        description={guide.intro}
        summary={guide.directAnswer}
        badge={guide.updatedLabel}
      />

      <div className="shell grid gap-8 lg:grid-cols-[1fr_320px]">
        <article className="space-y-8">
          {guide.sections.map((section, index) => (
            <div key={section.title} className="space-y-8">
              <ContentSection title={section.title}>
                {section.intro ? <p>{section.intro}</p> : null}
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets ? (
                  <ul className="grid gap-2 pl-5 text-text">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="list-disc">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {section.table ? (
                  <div className="overflow-hidden rounded-3xl border border-line">
                    <div className="border-b border-line bg-panel-strong px-5 py-4 text-sm font-medium text-text">
                      {section.table.caption}
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-left text-sm">
                        <thead className="bg-[#f7f8f4] text-muted">
                          <tr>
                            {section.table.columns.map((column) => (
                              <th key={column} className="px-4 py-3 font-medium">
                                {column}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row) => (
                            <tr key={row.join("-")} className="border-t border-line">
                              {row.map((cell) => (
                                <td key={cell} className="px-4 py-3 align-top text-text/90">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : null}
                {section.callout ? <CalloutBox>{section.callout}</CalloutBox> : null}
              </ContentSection>

              {index === 1 ? <AdPlaceholder label="Mid-content ad placeholder" /> : null}
            </div>
          ))}

          <section className="surface p-5">
            <h2 className="font-serif text-3xl text-text">{guide.ctaTitle}</h2>
            <p className="mt-3 max-w-prose text-muted">{guide.ctaText}</p>
            <Link href="/#calculator" className="mt-5 inline-flex rounded-full bg-brand px-5 py-3 font-medium text-white transition hover:bg-brand-deep">
              Go to the calculator
            </Link>
          </section>

          <FAQSection items={guide.faqs} />
          <RelatedGuides slugs={guide.relatedGuides} />
          <DataSources sourceKeys={guide.sourceKeys} />
          <Disclaimer />
        </article>

        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <div className="surface p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep">Quick links</p>
            <div className="mt-4 grid gap-3 text-sm">
              <Link href="/#calculator" className="link-chip justify-center">
                Use the calculator
              </Link>
              {guide.relatedGuides.slice(0, 3).map((slug) => (
                <Link key={slug} href={`/${slug}`} className="link-chip justify-center">
                  {guideMap[slug]?.h1 ?? "Related guide"}
                </Link>
              ))}
            </div>
          </div>
          <Disclaimer />
        </aside>
      </div>
    </>
  );
}
