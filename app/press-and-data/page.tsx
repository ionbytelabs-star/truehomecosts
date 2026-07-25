import Link from "next/link";
import Image from "next/image";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageIntro } from "@/components/PageIntro";
import { StructuredData } from "@/components/StructuredData";
import { formatCurrency } from "@/lib/format";
import { buildMetadata } from "@/lib/metadata";
import { generateHomeBuyingReport } from "@/lib/report-data";
import { siteConfig } from "@/lib/site";
import { breadcrumbSchema, webpageSchema } from "@/lib/structured-data";

const path = "/press-and-data";
const title = "Press & Data";
const description =
  "Download True Home Costs UK home-buying data, cite the 2026 report, reuse a chart and embed the home-buying cost calculator.";
const iframeCode =
  '<iframe src="https://truehomecosts.co.uk/embed/calculator" title="True Home Costs calculator" width="100%" height="720" loading="lazy" style="border:0;border-radius:20px"></iframe>';
const suggestedAttribution =
  "Data/source: True Home Costs, a UK home-buying cost calculator that estimates the total upfront cash needed to buy a home, including deposit, taxes, fees and moving costs.";

export const metadata = buildMetadata({
  title,
  description,
  path,
  keywords: ["True Home Costs data", "UK home buying statistics", "home buying costs press data"]
});

const report = generateHomeBuyingReport();

export default function PressAndDataPage() {
  return (
    <>
      <StructuredData
        data={webpageSchema({
          title: "True Home Costs Press & Data",
          description,
          path,
          dateModified: report.report.calculatorLastReviewed
        })}
      />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Press & Data", path }
        ])}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Press & Data" }]} />
      <PageIntro
        title="Press & Data"
        description="True Home Costs is a UK home-buying cost calculator and data resource built around one centrally maintained calculation model."
        summary={`The latest release contains ${report.basis.scenarioCount} calculator-generated scenarios across 13 property prices, four UK jurisdictions and three buyer types.`}
        badge="Data for journalists, researchers and publishers"
      />

      <section className="shell pb-10 sm:pb-12" aria-labelledby="latest-statistics">
        <div className="space-y-5">
          <div className="max-w-3xl space-y-2">
            <p className="eyebrow">Latest statistics</p>
            <h2 id="latest-statistics" className="font-serif text-3xl text-text">
              2026 report highlights
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {report.headlineStatistics.slice(0, 4).map((statistic) => (
              <article key={statistic.id} className="surface p-5">
                <p className="text-sm font-semibold text-brand-deep">{statistic.label}</p>
                <p className="mt-3 font-serif text-3xl text-text">{formatCurrency(statistic.valueGbp)}</p>
                <p className="mt-2 text-sm text-muted">{statistic.context}</p>
              </article>
            ))}
          </div>
          <Link href={report.report.reportPath} className="inline-flex font-semibold text-brand-deep underline">
            Read the complete 2026 report and methodology
          </Link>
        </div>
      </section>

      <section className="shell pb-10 sm:pb-12" aria-labelledby="downloads">
        <div className="surface p-5 sm:p-7">
          <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="min-w-0">
              <p className="eyebrow">Downloads</p>
              <h2 id="downloads" className="mt-3 font-serif text-3xl text-text">
                Tables and chart asset
              </h2>
              <p className="mt-3 text-muted">
                All assets use calculator data {report.report.calculatorDataVersion}. Credit True Home Costs and
                link to the report when publishing.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={report.report.downloads.csv} download className="link-chip min-h-11">
                  CSV table
                </a>
                <a href={report.report.downloads.json} download className="link-chip min-h-11">
                  JSON data
                </a>
                <a href={report.report.downloads.chartSvg} download className="link-chip min-h-11">
                  SVG chart
                </a>
              </div>
            </div>
            <figure className="overflow-hidden rounded-3xl border border-line bg-white p-3">
              <Image
                src={report.report.downloads.chartSvg}
                alt="Bar chart comparing total upfront cash for a £300,000 home-mover purchase in England, Northern Ireland, Scotland and Wales"
                width={1040}
                height={560}
                className="h-auto w-full"
              />
              <figcaption className="px-2 pb-2 pt-3 text-sm text-muted">
                Download the SVG for a scalable newsroom-ready chart, or recreate it from the CSV or JSON.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="shell grid gap-6 pb-10 sm:pb-12 lg:grid-cols-2">
        <article className="surface p-5 sm:p-7">
          <p className="eyebrow">Citation guidance</p>
          <h2 className="mt-3 font-serif text-3xl text-text">How to attribute the data</h2>
          <p className="mt-4 text-muted">Suggested attribution:</p>
          <blockquote className="mt-3 rounded-2xl border-l-4 border-brand bg-panel-strong p-4 text-text">
            “{suggestedAttribution}”
          </blockquote>
          <dl className="mt-5 grid gap-4 text-sm">
            <div>
              <dt className="font-semibold text-text">Main calculator</dt>
              <dd>
                <a href="https://truehomecosts.co.uk/" className="break-all text-brand-deep underline">
                  https://truehomecosts.co.uk/
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-text">2026 report</dt>
              <dd>
                <a
                  href="https://truehomecosts.co.uk/reports/true-cost-buying-home-uk-2026"
                  className="break-all text-brand-deep underline"
                >
                  https://truehomecosts.co.uk/reports/true-cost-buying-home-uk-2026
                </a>
              </dd>
            </div>
          </dl>
        </article>

        <article className="surface p-5 sm:p-7">
          <p className="eyebrow">Editorial notes</p>
          <h2 className="mt-3 font-serif text-3xl text-text">Use figures with their basis</h2>
          <ul className="mt-4 grid gap-3 pl-5 text-muted">
            <li className="list-disc">
              State the property price, buyer type, jurisdiction and {report.basis.depositPercentage}% deposit basis.
            </li>
            <li className="list-disc">
              Describe property tax as an official calculation and provider-led amounts as planning estimates.
            </li>
            <li className="list-disc">
              Keep optional moving, insurance, furnishing and contingency allowances visible when comparing totals.
            </li>
            <li className="list-disc">
              Link to the report methodology so readers can inspect the assumptions and verification date.
            </li>
          </ul>
          <p className="mt-4 text-sm text-muted">
            Supporting explainers cover{" "}
            <Link href="/conveyancing-costs-uk" className="underline hover:text-brand-deep">legal fees and disbursements</Link>,{" "}
            <Link href="/property-survey-costs-uk" className="underline hover:text-brand-deep">survey levels</Link> and{" "}
            <Link href="/land-registry-fees-uk" className="underline hover:text-brand-deep">the conditions behind registration-fee tables</Link>.
          </p>
        </article>
      </section>

      <section className="shell pb-10 sm:pb-12" aria-labelledby="embed-calculator">
        <div className="rounded-3xl border border-brand/25 bg-panel-strong p-5 sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">Embeddable calculator</p>
              <h2 id="embed-calculator" className="mt-3 font-serif text-3xl text-text">
                Add a lightweight calculator
              </h2>
              <p className="mt-3 text-muted">
                The iframe version uses the same production calculation function without the full site navigation.
                It includes clear True Home Costs attribution and a link to the full calculator.
              </p>
              <Link href="/embed/calculator" className="mt-5 inline-flex font-semibold text-brand-deep underline">
                Preview the embed
              </Link>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-text">Copy this iframe code</p>
              <pre className="mt-3 max-w-full overflow-x-auto rounded-2xl bg-[#17324d] p-4 text-sm leading-6 text-white">
                <code>{iframeCode}</code>
              </pre>
              <p className="mt-3 text-sm text-muted">
                You may adjust the height to suit your layout. Keep the title attribute and visible attribution.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="shell pb-16" aria-labelledby="press-contact">
        <div className="surface p-5 sm:p-7">
          <p className="eyebrow">Press contact</p>
          <h2 id="press-contact" className="mt-3 font-serif text-3xl text-text">
            Questions, corrections or custom cuts
          </h2>
          <p className="mt-3 max-w-3xl text-muted">
            Contact the True Home Costs team for methodology questions, corrections, higher-resolution assets or a
            clearly defined custom data cut.
          </p>
          <a
            href={`mailto:${siteConfig.email}?subject=True%20Home%20Costs%20press%20enquiry`}
            className="mt-5 inline-flex min-h-12 items-center rounded-full bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-deep"
          >
            Email {siteConfig.email}
          </a>
        </div>
      </section>
    </>
  );
}
