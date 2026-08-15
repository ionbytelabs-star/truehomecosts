import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentSection } from "@/components/ContentSection";
import { OngoingHomeCostEstimator } from "@/components/OngoingHomeCostEstimator";
import { ResponsiveTable } from "@/components/ResponsiveTable";
import { StructuredData } from "@/components/StructuredData";
import {
  freeholdAnnualTotal,
  freeholdMonthlyTotal,
  illustrativeMonthlyCosts,
  managedAnnualTotal,
  managedMonthlyTotal,
  ongoingHomeCostFaqs,
  ongoingHomeCostReview,
  ongoingHomeCostSources
} from "@/data/assumptions/ongoing-home-costs";
import { buildMetadata } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema, faqPageSchema, webpageSchema } from "@/lib/structured-data";

const title = "Cost of Owning a Home UK: Monthly Bills & Budget 2026";
const description =
  "See the monthly cost of owning a home in the UK, including council tax, energy, water, insurance, maintenance and leasehold charges, with a worked 2026 budget.";
const path = "/cost-of-owning-home-uk";

export const metadata = buildMetadata({
  title,
  description,
  path,
  absoluteTitle: true,
  socialImage: `${path}/opengraph-image`,
  socialImageAlt: "Monthly and annual UK homeownership budget examples for 2026"
});

const money = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0
});

const exampleRows = [
  ["Council tax", illustrativeMonthlyCosts.councilTaxOrRates],
  ["Gas and electricity", illustrativeMonthlyCosts.gasAndElectricity],
  ["Water", illustrativeMonthlyCosts.water],
  ["Broadband and communications", illustrativeMonthlyCosts.broadbandCommunications],
  ["Buildings insurance", illustrativeMonthlyCosts.buildingsInsurance],
  ["Contents insurance", illustrativeMonthlyCosts.contentsInsurance],
  ["Maintenance reserve", illustrativeMonthlyCosts.maintenanceReserve]
] as const;

const visualSegments = [
  { label: "Council tax", value: illustrativeMonthlyCosts.councilTaxOrRates, className: "bg-brand-deep" },
  { label: "Energy", value: illustrativeMonthlyCosts.gasAndElectricity, className: "bg-brand" },
  { label: "Water", value: illustrativeMonthlyCosts.water, className: "bg-success" },
  { label: "Communications", value: illustrativeMonthlyCosts.broadbandCommunications, className: "bg-accent" },
  {
    label: "Insurance",
    value: illustrativeMonthlyCosts.buildingsInsurance + illustrativeMonthlyCosts.contentsInsurance,
    className: "bg-warning"
  },
  { label: "Maintenance", value: illustrativeMonthlyCosts.maintenanceReserve, className: "bg-muted" }
] as const;

function BudgetBar({ managed = false }: { managed?: boolean }) {
  const segments = managed
    ? [
        ...visualSegments,
        { label: "Service or estate charge", value: illustrativeMonthlyCosts.serviceCharge, className: "bg-text" }
      ]
    : visualSegments;
  const total = managed ? managedMonthlyTotal : freeholdMonthlyTotal;

  return (
    <div>
      <div className="mb-2 flex items-end justify-between gap-4">
        <p className="font-semibold text-text">{managed ? "Managed or leasehold example" : "Freehold example"}</p>
        <p className="font-semibold tabular-nums text-text">{money.format(total)}/month</p>
      </div>
      <div className="flex h-12 overflow-hidden rounded-2xl bg-panel-strong" aria-hidden="true">
        {segments.map((segment) => (
          <span
            key={segment.label}
            className={segment.className}
            style={{ width: `${(segment.value / managedMonthlyTotal) * 100}%` }}
            title={`${segment.label}: ${money.format(segment.value)}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function CostOfOwningHomeUkPage() {
  return (
    <>
      <StructuredData
        data={webpageSchema({
          title: "Ongoing Costs of Owning a Home in the UK",
          description,
          path,
          dateModified: ongoingHomeCostReview.date,
          about: [
            { "@type": "Thing", name: "UK homeownership costs" },
            { "@type": "Thing", name: "Household budgeting" }
          ]
        })}
      />
      <StructuredData
        data={articleSchema({
          headline: "Ongoing Costs of Owning a Home in the UK",
          description,
          path,
          datePublished: "2026-04-24",
          dateModified: ongoingHomeCostReview.date,
          imagePath: `${path}/opengraph-image`
        })}
      />
      <StructuredData data={faqPageSchema(ongoingHomeCostFaqs)} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Ongoing Costs of Owning a Home in the UK", path }
        ])}
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Ongoing homeownership costs" }]} />

      <header className="shell pb-8 pt-8 sm:pb-10">
        <div className="max-w-4xl space-y-5">
          <p className="eyebrow">Reviewed {ongoingHomeCostReview.label}</p>
          <h1 className="font-serif text-4xl text-text sm:text-5xl">Ongoing Costs of Owning a Home in the UK</h1>
          <p className="max-w-prose text-lg text-muted">
            A practical guide to the regular bills, maintenance reserves and property-specific charges that continue
            after completion, with mortgage costs kept separate.
          </p>
          <section className="surface max-w-3xl border-brand/25 bg-panel-strong p-5 sm:p-6" aria-labelledby="direct-answer-heading">
            <p className="eyebrow">Direct answer</p>
            <h2 id="direct-answer-heading" className="mt-3 font-serif text-2xl text-text">
              How much does it cost to own a home each month?
            </h2>
            <p className="mt-3 text-lg leading-8 text-text">
              A practical non-mortgage homeowner budget is about {money.format(freeholdMonthlyTotal)} a month, or{" "}
              {money.format(freeholdAnnualTotal)} a year, using the worked example in this guide. A{" "}
              {money.format(illustrativeMonthlyCosts.serviceCharge)} monthly leasehold or estate charge would increase
              that to about {money.format(managedMonthlyTotal)} a month, or {money.format(managedAnnualTotal)} a year.
              Mortgage repayments are additional, and actual costs depend on the property, location, energy use and
              condition.
            </p>
            <p className="mt-3 font-semibold text-brand-deep">
              These are illustrative planning figures, not a UK average or financial advice.
            </p>
          </section>
          <p className="text-sm text-muted">
            Reviewed and maintained by{" "}
            <Link href="/methodology" className="font-semibold underline hover:text-brand-deep">
              TrueHomeCosts
            </Link>
            .
          </p>
        </div>
      </header>

      <div className="shell grid gap-10 pb-16 lg:grid-cols-[minmax(0,1fr)_290px]">
        <article className="min-w-0 space-y-12">
          <ContentSection id="monthly-cost-table" title="Typical monthly ownership costs">
            <p>
              The figures below are the shared inputs for the worked examples. They are planning assumptions, not
              official averages. Replace them with your council bill, tariffs, insurance quote and property-specific
              reserve as soon as those are available.
            </p>
            <ResponsiveTable
              caption="Monthly homeownership budget checklist and worked planning figures"
              summary="The table separates user-entered costs, published reference points, TrueHomeCosts planning assumptions and situation-dependent charges."
              columns={["Cost category", "Monthly planning figure or range", "Annual equivalent", "Basis", "Notes"]}
              rows={[
                ["Mortgage payment", "User-provided amount", "Depends on borrowing", "User-provided amount", "Add separately; loan size, rate and term determine the payment"],
                ["Council tax or domestic rates", money.format(illustrativeMonthlyCosts.councilTaxOrRates), money.format(illustrativeMonthlyCosts.councilTaxOrRates * 12), "TrueHomeCosts planning assumption", "Use the actual local-authority bill or Northern Ireland rates bill"],
                ["Gas and electricity", money.format(illustrativeMonthlyCosts.gasAndElectricity), money.format(illustrativeMonthlyCosts.gasAndElectricity * 12), "TrueHomeCosts planning assumption", "Usage, tariff, heating and efficiency can change this substantially"],
                ["Water", money.format(illustrativeMonthlyCosts.water), money.format(illustrativeMonthlyCosts.water * 12), "TrueHomeCosts planning assumption", "Billing arrangements differ by nation, provider and meter status"],
                ["Broadband, phone and television services", money.format(illustrativeMonthlyCosts.broadbandCommunications), money.format(illustrativeMonthlyCosts.broadbandCommunications * 12), "Market estimate", "Use the package price; keep optional subscriptions separate"],
                ["Buildings insurance", money.format(illustrativeMonthlyCosts.buildingsInsurance), money.format(illustrativeMonthlyCosts.buildingsInsurance * 12), "TrueHomeCosts planning assumption", "Check whether leasehold service charges already include it"],
                ["Contents insurance", money.format(illustrativeMonthlyCosts.contentsInsurance), money.format(illustrativeMonthlyCosts.contentsInsurance * 12), "TrueHomeCosts planning assumption", "Cover and excess choices affect the premium"],
                ["Maintenance reserve", money.format(illustrativeMonthlyCosts.maintenanceReserve), money.format(illustrativeMonthlyCosts.maintenanceReserve * 12), "TrueHomeCosts planning assumption", "A sinking fund, not a prediction of the repairs you will need"],
                ["Service charge", "£0 or actual charge", "Depends on lease", "Situation-dependent", "Check the lease, accounts, budget, reserve fund and planned works"],
                ["Estate charge", "£0 or actual charge", "Depends on transfer documents", "Situation-dependent", "Can apply to some freehold homes on managed estates"],
                ["Other situation-dependent ownership costs", "Enter actual amount", "Depends on property", "User-provided amount", "Examples include parking permits, alarms or communal heating not counted elsewhere"]
              ]}
            />
          </ContentSection>

          <ContentSection id="freehold-versus-leasehold" title="Freehold versus leasehold or managed-property totals">
            <ResponsiveTable
              caption="Worked non-mortgage ownership-cost comparison"
              summary="The comparison applies the same core example to a freehold home and to a managed or leasehold home with one illustrative £200 monthly charge."
              columns={["Example", "Monthly non-mortgage cost", "Annual equivalent"]}
              rows={[
                ["Freehold example without estate charge", money.format(freeholdMonthlyTotal), money.format(freeholdAnnualTotal)],
                ["Managed or leasehold example with £200 charge", money.format(managedMonthlyTotal), money.format(managedAnnualTotal)],
                ["Mortgage payment", "Additional", "Depends on borrowing"]
              ]}
            />
            <p>
              These are worked illustrations. Leasehold and estate charges vary widely, and not every property has a
              £200 monthly charge. Some service charges include buildings insurance, communal heating, water or other
              services, so remove any separate line already covered to avoid double counting.
            </p>
            <p>
              Major works and Section 20 demands are not included in this simple monthly illustration. Read the{" "}
              <Link href="/leasehold-costs-uk" className="underline hover:text-brand-deep">
                leasehold-cost guide
              </Link>{" "}
              before relying on a management-company budget.
            </p>
          </ContentSection>

          <ContentSection id="uk-differences" title="How homeowner costs differ across the UK">
            <p>
              The same checklist applies across the UK, but property tax, water billing and energy regulation are not
              uniform. Always replace a broad planning figure with the bill or tariff for the property.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <section className="rounded-3xl border border-line bg-white p-5">
                <h3 className="text-xl font-semibold text-text">England</h3>
                <p className="mt-2 text-sm text-muted">
                  Council tax normally applies. Water and sewerage are usually billed by regulated water companies,
                  and household energy sits within the Great Britain energy-market framework.
                </p>
              </section>
              <section className="rounded-3xl border border-line bg-white p-5">
                <h3 className="text-xl font-semibold text-text">Scotland</h3>
                <p className="mt-2 text-sm text-muted">
                  Council tax applies. Domestic water and sewerage charges are generally collected by the local
                  authority alongside council tax, although they remain distinct charges.
                </p>
              </section>
              <section className="rounded-3xl border border-line bg-white p-5">
                <h3 className="text-xl font-semibold text-text">Wales</h3>
                <p className="mt-2 text-sm text-muted">
                  Council tax applies. Water and sewerage are generally billed separately, and the provider, meter
                  status and regional charging scheme affect the bill.
                </p>
              </section>
              <section className="rounded-3xl border border-line bg-white p-5">
                <h3 className="text-xl font-semibold text-text">Northern Ireland</h3>
                <p className="mt-2 text-sm text-muted">
                  Domestic rates apply instead of council tax. Northern Ireland also has its own utility regulator and
                  a separate electricity, gas, water and sewerage regulatory context.
                </p>
              </section>
            </div>
            <p>
              For transaction taxes and wider location effects, use the{" "}
              <Link href="/regional-property-costs-uk" className="underline hover:text-brand-deep">
                regional property-cost comparison
              </Link>
              .
            </p>
          </ContentSection>

          <ContentSection id="mortgage-tax-utilities" title="Mortgage, council tax and utilities">
            <h3 className="text-xl font-semibold text-text">Keep the mortgage separate</h3>
            <p>
              Mortgage repayments are usually the largest monthly line, but no universal amount is useful: borrowing,
              rate, term and product all matter. Enter your lender illustration or current repayment in the estimator
              rather than treating the £625 example as an all-in housing cost.
            </p>
            <h3 className="text-xl font-semibold text-text">Use actual tax and rates bills</h3>
            <p>
              Council tax depends on the property band, local charge and any discount or reduction. Northern Ireland
              domestic rates are based on a different system. The £180 example is deliberately labelled as a
              TrueHomeCosts planning assumption and is not an official national average.
            </p>
            <h3 className="text-xl font-semibold text-text">Treat energy and water as variable</h3>
            <p>
              Ofgem publishes capped unit rates and standing charges for eligible default tariffs in Great Britain,
              but the cap is not a limit on a household&apos;s total bill. Usage, location, meter, tariff and the
              property&apos;s efficiency still matter. Water arrangements also differ across the nations and providers.
            </p>
          </ContentSection>

          <ContentSection id="maintenance" title="Maintenance, repairs and irregular costs">
            <p>
              A maintenance reserve converts lumpy ownership costs into a monthly sinking fund. The £150 monthly line
              is a planning assumption rather than an official rule: the right amount depends on age, condition,
              construction, size and any work already identified by a survey.
            </p>
            <p>
              Do not count the reserve as money that must be spent each month. Keep it available for servicing,
              replacements and repairs, and increase it when the property has known defects or ageing systems. A year
              without a major repair does not make the reserve unnecessary.
            </p>
          </ContentSection>

          <ContentSection id="insurance-and-charges" title="Insurance, service charges and ownership-specific costs">
            <p>
              Buildings and contents insurance cover different risks. For many leasehold flats, the freeholder or
              landlord arranges buildings insurance and recovers it through the service charge; contents cover remains
              the occupier&apos;s separate decision. Check the paperwork rather than assuming either treatment.
            </p>
            <p>
              Service charges can cover maintenance, cleaning, management, insurance, utilities and reserve funds.
              Freehold estate charges may cover shared landscaping, roads or facilities. The budget should show the
              actual charge and then remove any separate cost already included within it.
            </p>
          </ContentSection>

          <ContentSection id="forgotten-costs" title="Costs homeowners often forget">
            <p>
              Not every cost arrives monthly. Convert likely annual and irregular spending into a monthly sinking-fund
              allowance, while keeping lifestyle subscriptions outside the ownership-cost total.
            </p>
            <ul className="grid gap-x-8 gap-y-2 pl-5 sm:grid-cols-2">
              {[
                "Boiler servicing",
                "Replacement appliances",
                "Emergency plumbing or electrical repairs",
                "Roof, gutter and exterior maintenance",
                "Parking permits where applicable",
                "Garden maintenance",
                "Chimney servicing where applicable",
                "Security or alarm monitoring",
                "Pest treatment",
                "Freehold estate charges",
                "Leasehold reserve funds",
                "Major works demands",
                "Communal heating",
                "Insurance excesses",
                "Repairs not covered by insurance",
                "TV Licence where applicable"
              ].map((cost) => (
                <li key={cost} className="list-disc">{cost}</li>
              ))}
            </ul>
          </ContentSection>

          <ContentSection id="worked-examples" title="Worked monthly examples">
            <h3 className="text-xl font-semibold text-text">Example 1: freehold house</h3>
            <p>
              Illustrative England scenario; freehold; no estate charge; mortgage excluded; no major repair during the
              example period; moderate utility assumptions. This is a planning example, not a national average.
            </p>
            <ResponsiveTable
              caption="Freehold-house non-mortgage worked example"
              summary="The seven central components add to £625 a month and £7,500 a year."
              columns={["Component", "Monthly", "Annual"]}
              rows={[
                ...exampleRows.map(([label, value]) => [label, money.format(value), money.format(value * 12)]),
                ["Total", money.format(freeholdMonthlyTotal), money.format(freeholdAnnualTotal)]
              ]}
            />

            <h3 className="pt-3 text-xl font-semibold text-text">Example 2: managed or leasehold property</h3>
            <p>
              This starts with the same core assumptions and adds an illustrative £200 monthly service or estate
              charge. The example assumes buildings insurance is not included in that £200; if it is included, remove
              the separate £20 insurance line.
            </p>
            <ResponsiveTable
              caption="Managed or leasehold non-mortgage worked example"
              summary="The £625 core example plus one £200 monthly charge produces £825 a month and £9,900 a year."
              columns={["Component", "Monthly", "Annual"]}
              rows={[
                ["Core non-mortgage example", money.format(freeholdMonthlyTotal), money.format(freeholdAnnualTotal)],
                ["Illustrative service or estate charge", money.format(illustrativeMonthlyCosts.serviceCharge), money.format(illustrativeMonthlyCosts.serviceCharge * 12)],
                ["Total", money.format(managedMonthlyTotal), money.format(managedAnnualTotal)]
              ]}
            />
            <p>
              Service charges vary significantly; major works are excluded; and communal services may change separate
              energy or water costs. Inspect the lease, management pack, recent accounts, current budget and planned
              works before relying on the result.
            </p>
          </ContentSection>

          <section className="surface p-5 sm:p-7" aria-labelledby="budget-visual-heading">
            <p className="eyebrow">Original comparison</p>
            <h2 id="budget-visual-heading" className="mt-3 font-serif text-3xl text-text">
              Monthly non-mortgage homeowner budget example
            </h2>
            <figure className="mt-6">
              <div
                role="img"
                aria-label="Comparison of the £625 freehold monthly example and the £825 managed or leasehold monthly example. The managed example adds a £200 service or estate charge."
                className="space-y-6"
              >
                <BudgetBar />
                <BudgetBar managed />
              </div>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted" aria-label="Chart legend">
                {[...visualSegments, { label: "Service or estate charge", value: 200, className: "bg-text" }].map((segment) => (
                  <li key={segment.label} className="flex items-center gap-2">
                    <span className={`h-3 w-3 rounded-sm ${segment.className}`} aria-hidden="true" />
                    {segment.label}: {money.format(segment.value)}
                  </li>
                ))}
              </ul>
              <figcaption className="mt-5 text-sm text-muted">
                The managed illustration adds £200 to the same core budget. The worked tables above are the accessible
                text equivalent and use the same central values.
              </figcaption>
            </figure>
          </section>

          <OngoingHomeCostEstimator />

          <ContentSection id="sources" title="Sources, assumptions and how to use these figures">
            <p>
              Official sources below support the tax, utility, water, leasehold and licensing explanations. They do
              not turn the £625 example into an official average. Council tax, energy, water, insurance, broadband and
              maintenance amounts in the worked example remain clearly labelled planning assumptions or market
              estimates until replaced with a bill or quote.
            </p>
            <div className="rounded-3xl border border-line bg-white p-5">
              <dl className="grid gap-3 text-sm sm:grid-cols-2">
                <div><dt className="font-semibold text-text">Last reviewed</dt><dd className="text-muted">{ongoingHomeCostReview.label}</dd></div>
                <div><dt className="font-semibold text-text">Worked-example basis</dt><dd className="text-muted">TrueHomeCosts planning assumptions</dd></div>
              </dl>
              <p className="mt-4 text-sm text-muted">{ongoingHomeCostReview.changeNote}</p>
            </div>
            <ol className="grid gap-4 pl-5">
              {ongoingHomeCostSources.map((source) => (
                <li key={source.href} className="list-decimal pl-1">
                  <a href={source.href} target="_blank" rel="noreferrer" className="font-semibold underline hover:text-brand-deep">
                    {source.label}
                  </a>
                  <span className="block text-sm text-muted">{source.supports}</span>
                </li>
              ))}
            </ol>
            <p>
              Read{" "}
              <Link href="/methodology" className="underline hover:text-brand-deep">how TrueHomeCosts researches and classifies estimates</Link>{" "}
              or <Link href="/contact" className="underline hover:text-brand-deep">submit a correction</Link>. The
              information is educational and is not personalised financial advice.
            </p>
          </ContentSection>

          <section id="faqs" className="scroll-mt-24 space-y-5" aria-labelledby="faq-heading">
            <div>
              <p className="eyebrow">FAQ</p>
              <h2 id="faq-heading" className="mt-3 font-serif text-3xl text-text">Homeownership cost questions</h2>
            </div>
            <div className="grid gap-3">
              {ongoingHomeCostFaqs.map((faq) => (
                <details key={faq.question} open className="surface group p-4">
                  <summary className="cursor-pointer list-none pr-6 text-lg font-semibold text-text marker:hidden">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <ContentSection id="related-guides" title="Related guides">
            <div className="flex flex-wrap gap-3">
              {[
                ["/first-year-cost-buying-house-uk", "First-year cost of buying a house"],
                ["/insurance-costs-uk", "Home insurance costs"],
                ["/leasehold-costs-uk", "Leasehold costs"],
                ["/furnishing-costs-uk", "Furnishing costs"],
                ["/hidden-costs-buying-house", "Hidden buying costs"],
                ["/buying-and-selling-house-same-time", "Home-mover buying and selling costs"],
                ["/regional-property-costs-uk", "Regional property costs"]
              ].map(([href, label]) => (
                <Link key={href} href={href} className="link-chip min-h-11">{label}</Link>
              ))}
            </div>
          </ContentSection>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <nav className="surface p-5" aria-label="On this page">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep">On this page</p>
            <div className="mt-4 grid gap-2 text-sm">
              {[
                ["#monthly-cost-table", "Monthly cost table"],
                ["#freehold-versus-leasehold", "Freehold vs leasehold"],
                ["#uk-differences", "UK nation differences"],
                ["#forgotten-costs", "Often-forgotten costs"],
                ["#worked-examples", "Worked examples"],
                ["#calculator", "Personal estimator"],
                ["#sources", "Sources and assumptions"],
                ["#faqs", "FAQs"]
              ].map(([href, label]) => (
                <a key={href} href={href} className="underline decoration-line underline-offset-4 hover:text-brand-deep">{label}</a>
              ))}
            </div>
          </nav>
          <div className="rounded-3xl border border-brand/20 bg-panel-strong p-5">
            <p className="font-semibold text-text">Start with your own bills</p>
            <p className="mt-2 text-sm text-muted">The example is useful for structure, but your council bill, tariffs and property documents should replace it.</p>
            <a href="#calculator" className="mt-4 inline-flex min-h-11 items-center rounded-full bg-brand px-4 py-2 font-semibold text-white hover:bg-brand-deep">
              Use the estimator
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
