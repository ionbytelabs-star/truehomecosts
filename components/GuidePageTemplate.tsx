import Link from "next/link";

import { AdPlaceholder } from "@/components/AdPlaceholder";
import { AtAGlance } from "@/components/AtAGlance";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalloutBox } from "@/components/CalloutBox";
import { ContentSection } from "@/components/ContentSection";
import { DataSources } from "@/components/DataSources";
import { Disclaimer } from "@/components/Disclaimer";
import { FAQSection } from "@/components/FAQSection";
import { PageIntro } from "@/components/PageIntro";
import { RateTypeSplit } from "@/components/RateTypeSplit";
import { RelatedGuides } from "@/components/RelatedGuides";
import { ResponsiveTable } from "@/components/ResponsiveTable";
import { StructuredData } from "@/components/StructuredData";
import { TrustSignals } from "@/components/TrustSignals";
import { guideMap } from "@/content/guides";
import type { GuidePageContent } from "@/content/types";
import { getStrategicGuideSlugs, headingToId } from "@/lib/guide-links";
import { articleSchema, breadcrumbSchema, faqPageSchema, webpageSchema } from "@/lib/structured-data";

type GuidePageTemplateProps = {
  guide: GuidePageContent;
};

export function GuidePageTemplate({ guide }: GuidePageTemplateProps) {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: guide.h1 }
  ];
  const jumpLinks = guide.sections.map((section) => ({
    id: headingToId(section.title),
    title: section.title
  }));
  const strategicLinks = getStrategicGuideSlugs(guide.slug);
  const combinedGuideLinks = Array.from(new Set([...guide.relatedGuides, ...strategicLinks])).filter(
    (slug) => slug !== guide.slug
  );

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
          <TrustSignals updatedLabel={guide.updatedLabel} sourceKeys={guide.sourceKeys} />
          <AtAGlance items={guide.atGlance} />
          <RateTypeSplit officialItems={guide.officialItems} estimateItems={guide.estimateItems} />
          <section className="surface p-5">
            <p className="eyebrow">Plan the full picture</p>
            <h2 className="mt-3 font-serif text-3xl text-text">Use this guide with the right follow-up pages</h2>
            <p className="mt-3 max-w-prose text-muted">
              Start with the{" "}
              <Link href="/#calculator" className="underline hover:text-brand-deep">
                homepage calculator
              </Link>{" "}
              to test your own numbers, then compare this topic with{" "}
              {combinedGuideLinks.slice(0, 4).map((slug, index) => (
                <span key={slug}>
                  <Link href={`/${slug}`} className="underline hover:text-brand-deep">
                    {guideMap[slug]?.h1 ?? slug}
                  </Link>
                  {index < Math.min(combinedGuideLinks.length, 4) - 2
                    ? ", "
                    : index === Math.min(combinedGuideLinks.length, 4) - 2
                      ? " and "
                      : ""}
                </span>
              ))}
              .
            </p>
          </section>

          {guide.sections.map((section, index) => (
            <div key={section.title} className="space-y-8">
              <ContentSection id={headingToId(section.title)} title={section.title}>
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
                {section.table ? <ResponsiveTable {...section.table} /> : null}
                {section.callout ? <CalloutBox>{section.callout}</CalloutBox> : null}
              </ContentSection>

              {index === 2 ? (
                <section className="surface p-5">
                  <p className="eyebrow">Try this in the calculator</p>
                  <h2 className="mt-3 font-serif text-3xl text-text">Run your own version of this scenario</h2>
                  <p className="mt-3 max-w-prose text-muted">
                    Use the homepage calculator to change the property price, nation, buyer type and assumption
                    level so you can compare the simple version of the budget with a more realistic one.
                  </p>
                  <Link
                    href="/#calculator"
                    className="mt-5 inline-flex rounded-full bg-brand px-5 py-3 font-medium text-white transition hover:bg-brand-deep"
                  >
                    Open the calculator
                  </Link>
                </section>
              ) : null}

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
          <RelatedGuides slugs={combinedGuideLinks.slice(0, 5)} />
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
              {combinedGuideLinks.slice(0, 4).map((slug) => (
                <Link key={slug} href={`/${slug}`} className="link-chip justify-center">
                  {guideMap[slug]?.h1 ?? "Related guide"}
                </Link>
              ))}
            </div>
          </div>
          <div className="surface p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep">Jump to a section</p>
            <div className="mt-4 grid gap-2 text-sm">
              {jumpLinks.slice(0, 7).map((section) => (
                <a key={section.id} href={`#${section.id}`} className="underline decoration-line underline-offset-4 hover:text-brand-deep">
                  {section.title}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
