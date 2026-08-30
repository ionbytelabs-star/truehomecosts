import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalloutBox } from "@/components/CalloutBox";
import { ContentSection } from "@/components/ContentSection";
import { DataSources } from "@/components/DataSources";
import { MortgageFeeComparisonCalculator } from "@/components/MortgageFeeComparisonCalculator";
import { OfficialSources } from "@/components/OfficialSources";
import { PageIntro } from "@/components/PageIntro";
import { RelatedGuides } from "@/components/RelatedGuides";
import { ResponsiveTable } from "@/components/ResponsiveTable";
import { StructuredData } from "@/components/StructuredData";
import type { GuidePageContent, GuideSection } from "@/content/types";
import { formatCurrencyPrecise } from "@/lib/format";
import { headingToId } from "@/lib/guide-links";
import { compareMortgageFees, mortgageFeeWorkedExample } from "@/lib/mortgage-fee-comparison";
import { articleSchema, breadcrumbSchema, webpageSchema } from "@/lib/structured-data";

type MortgageFeesPageProps = {
  guide: GuidePageContent;
};

function SectionLinks({ links }: { links: NonNullable<GuideSection["links"]> }) {
  return (
    <p className="text-sm text-muted">
      Sources and further reading:{" "}
      {links.map((link, index) => (
        <span key={link.href}>
          <Link href={link.href} className="underline hover:text-brand-deep">
            {link.label}
          </Link>
          {index < links.length - 1 ? " · " : ""}
        </span>
      ))}
    </p>
  );
}

function MortgageGuideSection({ section }: { section: GuideSection }) {
  return (
    <ContentSection id={headingToId(section.title)} title={section.title}>
      {section.intro ? <p>{section.intro}</p> : null}
      {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.bullets ? (
        <ul className="grid gap-2 pl-5 text-text">
          {section.bullets.map((bullet) => (
            <li key={bullet} className="list-disc">{bullet}</li>
          ))}
        </ul>
      ) : null}
      {section.table ? <ResponsiveTable {...section.table} showMobileHint={false} /> : null}
      {section.tables?.map((table) => (
        <ResponsiveTable key={table.caption ?? table.summary} {...table} showMobileHint={false} />
      ))}
      {section.afterParagraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.callout ? <CalloutBox>{section.callout}</CalloutBox> : null}
      {section.links ? <SectionLinks links={section.links} /> : null}
      {section.cta ? (
        <div className="rounded-3xl border border-brand/20 bg-panel-strong p-5">
          {section.cta.description ? <p className="max-w-prose text-sm text-muted">{section.cta.description}</p> : null}
          <Link
            href={section.cta.href}
            className="mt-4 inline-flex min-h-12 items-center rounded-full bg-brand px-5 py-3 font-semibold text-white transition hover:bg-brand-deep"
          >
            {section.cta.label}
          </Link>
        </div>
      ) : null}
    </ContentSection>
  );
}

function MortgageWorkedExample() {
  const result = compareMortgageFees(mortgageFeeWorkedExample);

  return (
    <ContentSection id="worked-fee-comparison-example" title="Worked example: £999 fee vs a fee-free deal">
      <p>
        On a £225,000 repayment mortgage over 25 years, compare five years at 4.19% with a £999 product fee paid upfront against 4.34% with no product fee.
      </p>
      <p className="text-sm font-medium text-muted">
        Illustrative figures only. These rates are example inputs, not current mortgage recommendations or live products.
      </p>
      <ResponsiveTable
        showMobileHint={false}
        caption="Five-year worked mortgage comparison"
        summary="The comparison includes payments and the remaining balance after 60 months."
        columns={["Measure", "Deal A: 4.19% + £999", "Deal B: 4.34% + £0"]}
        rows={[
          ["Monthly repayment", formatCurrencyPrecise(result.dealA.monthlyRepayment), formatCurrencyPrecise(result.dealB.monthlyRepayment)],
          ["Interest over 60 months", formatCurrencyPrecise(result.dealA.interestPaid), formatCurrencyPrecise(result.dealB.interestPaid)],
          ["Remaining balance", formatCurrencyPrecise(result.dealA.remainingBalance), formatCurrencyPrecise(result.dealB.remainingBalance)],
          ["Product fee", "£999 paid upfront", "£0"],
          ["Comparison cost", formatCurrencyPrecise(result.dealA.comparisonCost), formatCurrencyPrecise(result.dealB.comparisonCost)]
        ]}
      />
      <CalloutBox title="Result">
        <p>
          Deal A has the lower calculated five-year cost by {formatCurrencyPrecise(result.difference)} and becomes cheaper at approximately month {result.breakEvenMonth}. Its lower interest cost and slightly lower remaining balance together exceed the £999 fee.
        </p>
      </CalloutBox>
      <div className="rounded-3xl border border-line bg-[#fcfcf9] p-5">
        <h3 className="text-lg font-semibold text-text">How the comparison cost works</h3>
        <p className="mt-2 text-muted">
          Repayment of the original mortgage principal is not treated as a cost because it reduces the balance still owed. The calculation adds cash paid during the selected period to the remaining balance, then removes the original mortgage amount. This allows for different repayment speeds as well as fees and interest.
        </p>
        <p className="mt-2 text-sm font-medium text-muted">This is not an APRC calculation.</p>
      </div>
      <a href="#mortgage-fee-comparison-calculator" className="inline-flex min-h-12 items-center rounded-full border border-brand bg-white px-5 py-3 font-semibold text-brand-deep transition hover:bg-brand-soft">
        Go to the calculator and load this example
      </a>
    </ContentSection>
  );
}

export function MortgageFeesPage({ guide }: MortgageFeesPageProps) {
  const comparisonSectionIndex = guide.sections.findIndex(
    (section) => section.title === "Is a fee-paying mortgage cheaper than a fee-free mortgage?"
  );
  const sectionsBeforeCalculator = guide.sections.slice(0, comparisonSectionIndex + 1);
  const sectionsAfterCalculator = guide.sections.slice(comparisonSectionIndex + 1);
  const feeSummary = guide.introSections?.[0];

  return (
    <>
      <StructuredData
        data={webpageSchema({
          title: guide.h1,
          description: guide.description,
          path: `/${guide.slug}`,
          keywords: guide.keywords,
          dateModified: guide.lastReviewed
        })}
      />
      <StructuredData
        data={articleSchema({
          headline: guide.h1,
          description: guide.description,
          path: `/${guide.slug}`,
          keywords: guide.keywords,
          dateModified: guide.lastReviewed
        })}
      />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: guide.h1, path: `/${guide.slug}` }
        ])}
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: guide.h1 }]} />
      <PageIntro
        title={guide.h1}
        description={guide.intro}
        summary={guide.directAnswer}
        badge={guide.updatedLabel}
      />

      <div className="shell pb-14">
        <article className="mx-auto max-w-4xl space-y-10">
          {feeSummary ? (
            <section className="surface space-y-5 p-5 sm:p-6" aria-labelledby="mortgage-fees-at-a-glance">
              <h2 id="mortgage-fees-at-a-glance" className="font-serif text-3xl text-text">{feeSummary.title}</h2>
              {feeSummary.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p className="text-xs text-muted">Tables can be scrolled horizontally on smaller screens.</p>
              {feeSummary.table ? <ResponsiveTable {...feeSummary.table} showMobileHint={false} /> : null}
              {feeSummary.callout ? <CalloutBox>{feeSummary.callout}</CalloutBox> : null}
              {feeSummary.links ? <SectionLinks links={feeSummary.links} /> : null}
            </section>
          ) : null}

          {sectionsBeforeCalculator.map((section) => (
            <MortgageGuideSection key={section.title} section={section} />
          ))}

          <MortgageWorkedExample />
          <MortgageFeeComparisonCalculator />

          {sectionsAfterCalculator.map((section) => (
            <MortgageGuideSection key={section.title} section={section} />
          ))}

          <section className="rounded-3xl border border-line bg-white p-5 sm:p-6" aria-labelledby="review-and-method-heading">
            <p className="eyebrow">Review and method</p>
            <h2 id="review-and-method-heading" className="mt-3 font-serif text-3xl text-text">How this page is maintained</h2>
            <p className="mt-3 text-muted">
              Reviewed and maintained by TrueHomeCosts. Consumer fee references, FCA disclosure material, the valuation distinction and calculator fixtures were checked on {guide.lastReviewedLabel}. Published fee ranges remain separate from the TrueHomeCosts planning allowance.
            </p>
            <p className="mt-3 text-sm text-muted">
              The comparison engine uses standard repayment-mortgage amortisation and is tested against fixed expected figures and an independently implemented month-by-month calculation path. General information only; not personalised financial advice.
            </p>
            <p className="mt-3 text-sm text-muted">
              Home-buying calculator data version: {guide.calculatorDataVersion}. Read the{" "}
              <Link href="/methodology" className="underline hover:text-brand-deep">full TrueHomeCosts methodology</Link>.
            </p>
          </section>

          <OfficialSources sourceKeys={guide.officialSourceKeys ?? []} title="Primary guidance used" />
          <DataSources sourceKeys={guide.sourceKeys} />
          <RelatedGuides slugs={guide.relatedGuides} />
        </article>
      </div>
    </>
  );
}
