import { AnalyticsLink } from "@/components/AnalyticsLink";
import { CalculatorForm } from "@/components/CalculatorForm";
import { ExampleScenarios } from "@/components/ExampleScenarios";
import { FAQSection } from "@/components/FAQSection";
import { Hero } from "@/components/Hero";
import { ResponsiveTable } from "@/components/ResponsiveTable";
import { StructuredData } from "@/components/StructuredData";
import { homePageFaqs, homepageGuides, homeScenarioInputs } from "@/content/home";
import {
  calculatorCostAssumptionById,
  calculatorCostAssumptions,
  calculatorMetadata,
  homepageCostRows
} from "@/data/assumptions/calculator";
import { calculateUpfrontCosts } from "@/lib/calculator";
import { formatCurrency } from "@/lib/format";
import { buildMetadata } from "@/lib/metadata";
import { popularBuyingCostExampleSlugs, priceGuideLabelMap } from "@/lib/price-guide-links";
import {
  calculatorApplicationReference,
  calculatorApplicationSchema,
  faqPageSchema,
  webpageSchema
} from "@/lib/structured-data";

const title = "UK House Buying Cost Calculator 2026 | TrueHomeCosts";
const description =
  "Calculate the total upfront cost of buying a home in the UK, including deposit, stamp duty, legal fees, surveys, mortgage fees and moving costs.";

export const metadata = buildMetadata({ title, description, path: "/", absoluteTitle: true });

const scenarios = homeScenarioInputs.map((scenario) => ({
  title: scenario.title,
  summary: scenario.summary,
  result: calculateUpfrontCosts(scenario.input)
}));

function planningRange(assumption: (typeof calculatorCostAssumptions)[number]) {
  if (assumption.unit === "calculated") return "Calculated from your inputs";
  if (assumption.unit === "percentage") {
    return `${assumption.minimum ?? 0}–${assumption.maximum ?? 0}% (default ${assumption.typical ?? 0}%)`;
  }
  if (assumption.minimum === undefined || assumption.maximum === undefined) return "Varies";
  const range = `${formatCurrency(assumption.minimum)}–${formatCurrency(assumption.maximum)}`;
  return assumption.typical === undefined ? range : `${range} (typical default ${formatCurrency(assumption.typical)})`;
}

function homepagePlanningBasis(row: (typeof homepageCostRows)[number]) {
  if (row.planningBasis) return row.planningBasis;
  const assumption = calculatorCostAssumptionById.get(row.assumptionIds[0]);
  if (!assumption) throw new Error(`Missing calculator assumption for homepage row: ${row.id}`);
  return planningRange(assumption);
}

export default function HomePage() {
  return (
    <>
      <StructuredData
        data={webpageSchema({
          title: "UK House Buying Cost Calculator",
          description,
          path: "/",
          dateModified: calculatorMetadata.lastReviewed,
          about: [
            { "@type": "Thing", name: "UK house buying costs" },
            { "@type": "Thing", name: "UK residential property taxes" }
          ],
          mainEntity: calculatorApplicationReference()
        })}
      />
      <StructuredData data={calculatorApplicationSchema()} />
      <StructuredData data={faqPageSchema(homePageFaqs.map((faq) => ({ ...faq })))} />

      <Hero />
      <CalculatorForm />

      <section className="shell pb-10 sm:pb-12" aria-labelledby="included-heading">
        <div className="surface p-5 sm:p-7">
          <div className="mb-5 max-w-3xl space-y-2">
            <p className="eyebrow">What the result includes</p>
            <h2 id="included-heading" className="font-serif text-3xl text-text">One complete upfront-cost view</h2>
            <p className="text-muted">The ranges below come from the same central assumptions used by the calculator.</p>
            <p className="text-sm text-muted">
              This calculator covers the purchase and move. After completion, use our{" "}
              <AnalyticsLink
                href="/cost-of-owning-home-uk"
                eventName="homepage_guide_click"
                eventParameters={{ guide: "cost-of-owning-home-uk" }}
                className="font-semibold underline hover:text-brand-deep"
              >
                monthly costs of owning a home
              </AnalyticsLink>{" "}
              guide to plan council tax, utilities, insurance, maintenance and property-specific charges.
            </p>
          </div>
          <ResponsiveTable
            caption="Buying-cost categories and planning basis"
            summary="Cost categories included in the calculator, how each is classified and the shared planning range or calculation method."
            columns={["Cost category", "What it covers", "Basis", "Planning range"]}
            rows={homepageCostRows.map((row) => [
              row.label,
              row.description,
              row.basis,
              homepagePlanningBasis(row)
            ])}
          />
          <p className="mt-4 text-sm text-muted">
            The solicitor/conveyancing line is a VAT-inclusive planning estimate for standard purchase legal work.
            Compare the full breakdown of{" "}
            <AnalyticsLink
              href="/conveyancing-costs-uk"
              eventName="homepage_guide_click"
              eventParameters={{ guide: "conveyancing-costs-uk" }}
              className="font-semibold underline hover:text-brand-deep"
            >
              solicitor and conveyancing fees
            </AnalyticsLink>{" "}
            before replacing it with an itemised quote.
          </p>
          <p className="mt-4 text-sm text-muted">
            The survey line is a planning allowance rather than a quotation. Compare{" "}
            <AnalyticsLink
              href="/property-survey-costs-uk"
              eventName="homepage_guide_click"
              eventParameters={{ guide: "property-survey-costs-uk" }}
              className="font-semibold underline hover:text-brand-deep"
            >
              house survey costs for Level 1, Level 2 and Level 3
            </AnalyticsLink>{" "}
            before replacing it with a property-specific quote.
          </p>
        </div>
      </section>

      <section className="shell pb-10 sm:pb-12" aria-labelledby="method-heading">
        <div className="surface grid gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl space-y-3">
            <p className="eyebrow">How the figures are calculated</p>
            <h2 id="method-heading" className="font-serif text-3xl text-text">Official rules where possible, estimates where necessary</h2>
            <p className="text-text">
              Property tax uses rules for the selected jurisdiction. HM Land Registry fees for qualifying England and Wales applications are official; legal fees, surveys, mortgage charges, moving costs and jurisdiction-dependent registration allowances are estimates. You can replace estimates with quotations and remove optional costs.
            </p>
            <p className="text-sm text-muted">The calculator is for budgeting, not regulated financial, legal or tax advice.</p>
          </div>
          <AnalyticsLink href="/methodology" eventName="methodology_click" className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-deep">
            Read the calculator methodology
          </AnalyticsLink>
        </div>
      </section>

      <div className="shell pb-10 sm:pb-12">
        <ExampleScenarios scenarios={scenarios} />
      </div>

      <section className="shell pb-10 sm:pb-12" aria-labelledby="guides-heading">
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="eyebrow">Supporting guides</p>
            <h2 id="guides-heading" className="font-serif text-3xl text-text">Understand each buying cost</h2>
            <p className="max-w-3xl text-muted">Use the calculator for your total, then open the relevant guide for more detail.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {homepageGuides.map((guide) => (
              <article key={guide.slug} className="surface p-5">
                <h3 className="text-lg font-semibold text-text">{guide.title}</h3>
                <p className="mt-2 text-sm text-muted">{guide.description}</p>
                <AnalyticsLink href={`/${guide.slug}`} eventName="homepage_guide_click" eventParameters={{ guide: guide.slug }} className="mt-4 inline-flex min-h-11 items-center font-semibold text-brand-deep underline">
                  Open the {guide.title.toLowerCase()} guide
                </AnalyticsLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell pb-10 sm:pb-12" aria-labelledby="prices-heading">
        <div className="surface p-5 sm:p-7">
          <div className="space-y-2">
            <p className="eyebrow">Property-price examples</p>
            <h2 id="prices-heading" className="font-serif text-3xl text-text">Buying costs at common prices</h2>
            <p className="text-muted">Explore six useful starting points, or browse every existing price-specific page.</p>
          </div>
          <nav aria-label="Common property-price examples" className="mt-5 flex flex-wrap gap-3">
            {popularBuyingCostExampleSlugs.map((slug) => (
              <AnalyticsLink key={slug} href={`/${slug}`} eventName="property_price_example_click" eventParameters={{ price_page: slug }} className="link-chip min-h-11">
                {priceGuideLabelMap[slug]}
              </AnalyticsLink>
            ))}
          </nav>
          <AnalyticsLink
            href="/cost-to-buy-600k-house"
            eventName="property_price_example_click"
            eventParameters={{ price_page: "cost-to-buy-600k-house" }}
            className="mt-5 inline-flex min-h-11 items-center font-semibold text-brand-deep underline"
          >
            {priceGuideLabelMap["cost-to-buy-600k-house"]}: deposit, SDLT and upfront cash
          </AnalyticsLink>
          <AnalyticsLink href="/house-buying-cost-by-property-price" eventName="property_price_example_click" eventParameters={{ price_page: "all_prices_hub" }} className="mt-5 inline-flex min-h-12 items-center rounded-full bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-deep">
            View buying costs for all property prices
          </AnalyticsLink>
        </div>
      </section>

      <section className="shell pb-10 sm:pb-12" aria-labelledby="review-heading">
        <div className="rounded-3xl border border-brand/25 bg-panel-strong p-5 sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-3">
              <p className="eyebrow">Sources and editorial transparency</p>
              <h2 id="review-heading" className="font-serif text-3xl text-text">Calculator review record</h2>
              <dl className="grid gap-2 text-sm sm:grid-cols-2">
                <div><dt className="font-semibold text-text">Last reviewed</dt><dd className="text-muted">{calculatorMetadata.lastReviewedLabel}</dd></div>
                <div><dt className="font-semibold text-text">Calculator data version</dt><dd className="text-muted">{calculatorMetadata.dataVersion}</dd></div>
              </dl>
              <p className="text-sm text-muted">Official figures are checked against the relevant national authority. Market assumptions use reputable consumer context and remain clearly labelled as estimates.</p>
              <div className="flex flex-wrap gap-3 text-sm font-semibold">
                <AnalyticsLink href="/methodology" eventName="methodology_click" className="underline hover:text-brand-deep">Methodology</AnalyticsLink>
                <AnalyticsLink href="/about" eventName="homepage_guide_click" eventParameters={{ guide: "about" }} className="underline hover:text-brand-deep">About TrueHomeCosts</AnalyticsLink>
                <AnalyticsLink href={calculatorMetadata.correctionHref} eventName="report_error_click" className="underline hover:text-brand-deep">Report an error or outdated figure</AnalyticsLink>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text">Sources checked</h3>
              <ul className="mt-3 grid gap-2 text-sm text-muted sm:grid-cols-2">
                {calculatorMetadata.sources.map((source) => (
                  <li key={source.name}><a href={source.href} rel="noreferrer" className="underline hover:text-brand-deep">{source.name}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="shell pb-16">
        <FAQSection items={homePageFaqs.map((faq) => ({ ...faq }))} />
      </div>
    </>
  );
}
