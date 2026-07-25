import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Disclaimer } from "@/components/Disclaimer";
import { PageIntro } from "@/components/PageIntro";
import { ResponsiveTable } from "@/components/ResponsiveTable";
import { StructuredData } from "@/components/StructuredData";
import { calculatorMetadata } from "@/data/assumptions/calculator";
import { formatCurrency } from "@/lib/format";
import { absoluteUrl, buildMetadata } from "@/lib/metadata";
import { generateHomeBuyingReport } from "@/lib/report-data";
import { breadcrumbSchema, webpageSchema } from "@/lib/structured-data";

const path = "/reports/true-cost-buying-home-uk-2026";
const title = "True Cost of Buying a Home in the UK 2026";
const description =
  "Original True Home Costs data for 156 UK home-buying scenarios, covering deposits, property taxes, legal fees, searches, surveys, mortgage fees, moving costs and total upfront cash.";

export const metadata = buildMetadata({
  title,
  description,
  path,
  keywords: [
    "true cost of buying a home UK 2026",
    "home buying costs data UK",
    "total upfront cash buying a house",
    "UK property buying costs report"
  ]
});

const report = generateHomeBuyingReport();
const englandFirstTimeAt300 =
  report.scenarios.find(
    (scenario) =>
      scenario.propertyPriceGbp === 300_000 &&
      scenario.jurisdiction === "england" &&
      scenario.buyerType === "first-time-buyer"
  ) ??
  (() => {
    throw new Error("The report is missing its primary £300,000 first-time buyer scenario.");
  })();

const homeMoverRows = report.scenarios.filter((scenario) => scenario.buyerType === "home-mover");

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: title,
  description,
  url: absoluteUrl(path),
  datePublished: report.report.published,
  dateModified: report.report.calculatorLastReviewed,
  inLanguage: "en-GB",
  creator: {
    "@type": "Organization",
    name: "True Home Costs",
    url: absoluteUrl("/")
  },
  measurementTechnique:
    "Scenarios generated from the production True Home Costs calculator using official jurisdiction-specific property-tax rules and centrally maintained planning estimates.",
  distribution: [
    {
      "@type": "DataDownload",
      encodingFormat: "text/csv",
      contentUrl: absoluteUrl(report.report.downloads.csv)
    },
    {
      "@type": "DataDownload",
      encodingFormat: "application/json",
      contentUrl: absoluteUrl(report.report.downloads.json)
    }
  ]
};

export default function HomeBuyingReportPage() {
  const directAnswer = `For a £300,000 first home in England, the report-basis total is ${formatCurrency(
    englandFirstTimeAt300.amountsGbp.totalUpfrontCash
  )}: a ${formatCurrency(englandFirstTimeAt300.amountsGbp.deposit)} deposit plus ${formatCurrency(
    englandFirstTimeAt300.amountsGbp.totalUpfrontCash - englandFirstTimeAt300.amountsGbp.deposit
  )} of taxes, buying costs and selected allowances.`;

  return (
    <>
      <StructuredData
        data={webpageSchema({
          title,
          description,
          path,
          dateModified: report.report.calculatorLastReviewed,
          about: [
            { "@type": "Thing", name: "UK home-buying costs" },
            { "@type": "Thing", name: "Upfront cash required to buy a home" }
          ]
        })}
      />
      <StructuredData data={datasetSchema} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Reports", path },
          { name: title, path }
        ])}
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "2026 home-buying cost report" }]} />
      <PageIntro
        title={title}
        description="A reusable UK data asset showing the total upfront cash needed across property prices, buyer types and jurisdictions."
        summary={directAnswer}
        badge={`156 calculator-generated scenarios · data ${report.report.calculatorDataVersion}`}
      />

      <section className="shell pb-10 sm:pb-12" aria-labelledby="headline-statistics">
        <div className="space-y-5">
          <div className="max-w-3xl space-y-2">
            <p className="eyebrow">Headline statistics</p>
            <h2 id="headline-statistics" className="font-serif text-3xl text-text">
              What £300,000 scenarios show
            </h2>
            <p className="text-muted">
              Every statistic below is calculated from the same report data, using the central calculator defaults
              described in the methodology.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {report.headlineStatistics.map((statistic) => (
              <article key={statistic.id} className="surface p-5">
                <p className="text-sm font-semibold text-brand-deep">{statistic.label}</p>
                <p className="mt-3 font-serif text-3xl text-text">{formatCurrency(statistic.valueGbp)}</p>
                <p className="mt-2 text-sm text-muted">{statistic.context}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell pb-10 sm:pb-12" aria-labelledby="download-report-data">
        <div className="rounded-3xl border border-brand/25 bg-panel-strong p-5 sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl space-y-3">
              <p className="eyebrow">Open report data</p>
              <h2 id="download-report-data" className="font-serif text-3xl text-text">
                Download all 156 scenarios
              </h2>
              <p className="text-muted">
                The CSV is flat and spreadsheet-friendly. The JSON preserves report metadata, classifications,
                assumptions, notes and the complete scenario structure.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={report.report.downloads.csv}
                download
                className="inline-flex min-h-12 items-center rounded-full bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-deep"
              >
                Download CSV
              </a>
              <a
                href={report.report.downloads.json}
                download
                className="inline-flex min-h-12 items-center rounded-full border border-line bg-white px-5 py-3 font-semibold text-text hover:border-brand"
              >
                Download JSON
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="shell pb-10 sm:pb-12" aria-labelledby="scenario-table">
        <div className="space-y-5">
          <div className="max-w-3xl space-y-2">
            <p className="eyebrow">Representative scenarios</p>
            <h2 id="scenario-table" className="font-serif text-3xl text-text">
              Home-mover totals by property price and nation
            </h2>
            <p className="text-muted">
              These totals include the deposit and the report-basis buying-cost allowances. First-time buyer and
              additional-property scenarios are included in the downloads.
            </p>
          </div>
          <ResponsiveTable
            caption="Total upfront cash for home movers across the four UK jurisdictions"
            summary="Thirteen representative property prices with the total report-basis upfront cash required in England, Northern Ireland, Scotland and Wales."
            columns={["Property price", "England", "Northern Ireland", "Scotland", "Wales"]}
            rows={report.scenarios
              .filter(
                (scenario) =>
                  scenario.buyerType === "home-mover" && scenario.jurisdiction === "england"
              )
              .map((englandScenario) => {
                const rowScenarios = homeMoverRows.filter(
                  (scenario) => scenario.propertyPriceGbp === englandScenario.propertyPriceGbp
                );
                const totalFor = (jurisdiction: string) => {
                  const scenario = rowScenarios.find((item) => item.jurisdiction === jurisdiction);
                  if (!scenario) throw new Error(`Missing ${jurisdiction} home-mover scenario.`);
                  return formatCurrency(scenario.amountsGbp.totalUpfrontCash);
                };
                return [
                  formatCurrency(englandScenario.propertyPriceGbp),
                  totalFor("england"),
                  totalFor("northern-ireland"),
                  totalFor("scotland"),
                  totalFor("wales")
                ];
              })}
          />
        </div>
      </section>

      <section className="shell pb-10 sm:pb-12" aria-labelledby="regional-notes">
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="eyebrow">Regional notes</p>
            <h2 id="regional-notes" className="font-serif text-3xl text-text">
              The tax and registration basis changes by nation
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <article className="surface p-5">
              <h3 className="text-xl font-semibold text-text">England and Northern Ireland</h3>
              <p className="mt-3 text-muted">
                Both use SDLT rules. Qualifying England registration uses the official HM Land Registry electronic
                Scale 1 fee. Northern Ireland uses a separate adjustable LPS registration allowance because the
                final registry treatment can differ.
              </p>
            </article>
            <article className="surface p-5">
              <h3 className="text-xl font-semibold text-text">Scotland</h3>
              <p className="mt-3 text-muted">
                Scottish purchases use LBTT, including first-time buyer treatment and the Additional Dwelling
                Supplement where applicable. Registration uses the official Registers of Scotland disposition fee
                scale.
              </p>
            </article>
            <article className="surface p-5">
              <h3 className="text-xl font-semibold text-text">Wales</h3>
              <p className="mt-3 text-muted">
                Welsh purchases use LTT main or higher residential rates. Qualifying registration scenarios use the
                official HM Land Registry electronic Scale 1 fee.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="shell grid gap-8 pb-10 sm:pb-12 lg:grid-cols-[1fr_0.8fr]">
        <article className="surface p-5 sm:p-7">
          <p className="eyebrow">Methodology</p>
          <h2 className="mt-3 font-serif text-3xl text-text">How the report is generated</h2>
          <div className="mt-4 space-y-3 text-muted">
            <p>
              The report runs the production calculator for 13 property prices, four jurisdictions and three buyer
              types. It uses the calculator&apos;s {report.basis.depositPercentage}% default deposit and{" "}
              {report.basis.assumptionLevel} estimate level.
            </p>
            <p>
              Moving costs and insurance are included because they are enabled in the calculator defaults.
              Furnishing and setup is shown as a separate zero-value field because it is optional and not enabled by
              default. The default {report.basis.includedAllowances.contingencyPercentage}% contingency applies only
              to estimate-led costs.
            </p>
            <p>
              Official calculations are never relabelled as estimates, and planning estimates are not presented as
              fixed quotations. A real legal, survey, lender or removals quote should replace the central allowance
              when available.
            </p>
            <p>
              Read the full <Link href="/methodology" className="underline hover:text-brand-deep">calculator methodology</Link>{" "}
              and <Link href="/calculator-updates" className="underline hover:text-brand-deep">data change log</Link>.
            </p>
            <p>
              For the detail behind individual lines, use the guides to{" "}
              <Link href="/conveyancing-costs-uk" className="underline hover:text-brand-deep">UK conveyancing costs</Link>,{" "}
              <Link href="/property-survey-costs-uk" className="underline hover:text-brand-deep">survey levels and costs</Link>,{" "}
              <Link href="/land-registry-fees-uk" className="underline hover:text-brand-deep">registration fees by jurisdiction</Link>{" "}
              and <Link href="/first-month-costs-after-buying-house" className="underline hover:text-brand-deep">first-month ownership costs</Link>.
            </p>
          </div>
        </article>

        <aside className="surface p-5 sm:p-7">
          <p className="eyebrow">Sources and assumptions</p>
          <h2 className="mt-3 font-serif text-3xl text-text">Current central data</h2>
          <dl className="mt-4 grid gap-3 text-sm">
            <div>
              <dt className="font-semibold text-text">Calculator data</dt>
              <dd className="text-muted">{report.report.calculatorDataVersion}</dd>
            </div>
            <div>
              <dt className="font-semibold text-text">Official rules last verified</dt>
              <dd className="text-muted">{calculatorMetadata.lastReviewedLabel}</dd>
            </div>
            <div>
              <dt className="font-semibold text-text">Currency and formatting</dt>
              <dd className="text-muted">GBP, en-GB</dd>
            </div>
          </dl>
          <ul className="mt-5 grid gap-2 text-sm text-muted">
            {report.sources.map((source) => (
              <li key={source.name}>
                <a href={source.href} rel="noreferrer" className="underline hover:text-brand-deep">
                  {source.name}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="shell pb-10 sm:pb-12" aria-labelledby="related-guides">
        <div className="surface p-5 sm:p-7">
          <p className="eyebrow">Use the data</p>
          <h2 id="related-guides" className="mt-3 font-serif text-3xl text-text">
            Check a scenario against your own circumstances
          </h2>
          <p className="mt-3 max-w-3xl text-muted">
            Start with the <Link href="/#calculator" className="underline hover:text-brand-deep">homepage calculator</Link>,
            then read the guides on{" "}
            <Link href="/stamp-duty-explained" className="underline hover:text-brand-deep">stamp duty</Link>,{" "}
            <Link href="/moving-costs-uk" className="underline hover:text-brand-deep">moving costs</Link>,{" "}
            <Link href="/mortgage-fees-costs" className="underline hover:text-brand-deep">mortgage fees</Link>,{" "}
            <Link href="/cost-of-owning-home-uk" className="underline hover:text-brand-deep">the cost of owning a home</Link>,{" "}
            <Link href="/hidden-costs-buying-house" className="underline hover:text-brand-deep">hidden buying costs</Link>{" "}
            and <Link href="/gifted-deposit-mortgage" className="underline hover:text-brand-deep">gifted deposits</Link>.
          </p>
        </div>
      </section>

      <section className="shell pb-10 sm:pb-12">
        <div className="rounded-3xl bg-brand-deep p-6 text-white sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/75">
            For journalists and publishers
          </p>
          <h2 className="mt-3 font-serif text-3xl">Download, cite or embed the data</h2>
          <p className="mt-3 max-w-3xl text-white/80">
            Citation guidance, a downloadable chart and iframe code are available in the press and data resources.
          </p>
          <Link
            href="/press-and-data"
            className="mt-5 inline-flex min-h-12 items-center rounded-full bg-white px-5 py-3 font-semibold text-brand-deep hover:bg-panel-strong"
          >
            Open Press &amp; Data
          </Link>
        </div>
      </section>

      <div className="shell pb-16">
        <Disclaimer />
      </div>
    </>
  );
}
