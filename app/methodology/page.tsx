import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Disclaimer } from "@/components/Disclaimer";
import { PageIntro } from "@/components/PageIntro";
import { ResponsiveTable } from "@/components/ResponsiveTable";
import { StructuredData } from "@/components/StructuredData";
import { calculatorMetadata } from "@/data/assumptions/calculator";
import { officialSourceVerification } from "@/data/editorial/source-verification";
import { classificationLabels, costScopeDefinitions, costTaxonomy } from "@/lib/cost-scopes";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, webpageSchema } from "@/lib/structured-data";

const description =
  "How TrueHomeCosts uses one sitewide set of UK home-buying assumptions, official rules, market estimates, calculation scopes, review dates and calculator versions.";

export const metadata = buildMetadata({
  title: "How TrueHomeCosts Estimates Work",
  description,
  path: "/methodology"
});

export default function MethodologyPage() {
  return (
    <>
      <StructuredData data={webpageSchema({ title: "How TrueHomeCosts estimates work", description, path: "/methodology", dateModified: calculatorMetadata.lastReviewed })} />
      <StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "How estimates work", path: "/methodology" }])} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "How estimates work" }]} />
      <PageIntro
        title="How estimates work"
        description="TrueHomeCosts uses the same central assumptions and production calculation functions in the homepage calculator, core guides and every property-price example."
        summary="Official calculations and charges are separated from market estimates, user-entered amounts and optional or adjustable allowances. Every headline total has a defined scope."
        badge={`Calculator data ${calculatorMetadata.dataVersion}`}
      />

      <section className="shell grid gap-10 pb-16 lg:grid-cols-[1fr_320px]">
        <article className="min-w-0 space-y-8">
          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">One sitewide cost taxonomy</h2>
            <p>The calculator, guides and price pages use these twelve categories. Natural wording can vary in prose, but tables do not merge categories that are calculated separately.</p>
            <ol className="grid gap-2 pl-5 sm:grid-cols-2">
              {costTaxonomy.map((category) => <li key={category} className="list-decimal text-text">{category}</li>)}
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">How figures are classified</h2>
            <ResponsiveTable
              caption="Classification labels used across calculator results and editorial content"
              columns={["Classification", "Meaning"]}
              rows={[
                [classificationLabels["official-calculation"], "A result calculated from published jurisdiction-specific rules, such as property tax."],
                [classificationLabels["official-charge"], "A charge taken from a published official fee scale for the applicable transaction."],
                [classificationLabels["market-estimate"], "A planning amount based on the central estimate bands, not a statutory tariff."],
                [classificationLabels["user-entered"], "An amount or percentage supplied by the user."],
                [classificationLabels["optional-allowance"], "A selected planning allowance that can be excluded."],
                [classificationLabels["adjustable-allowance"], "A centrally suggested amount that should be confirmed or replaced for the transaction."]
              ]}
            />
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">What each headline scope means</h2>
            <ResponsiveTable
              caption="Named total scopes used by TrueHomeCosts"
              columns={["Scope", "Definition"]}
              rows={Object.entries(costScopeDefinitions).map(([scope, definition]) => [scope.replaceAll("-", " "), definition])}
            />
            <p>First-year costs are discussed separately as purchase-completion costs, moving and setup, ongoing ownership costs and optional improvements. Ongoing mortgage payments and household bills are not silently added to the upfront calculator total.</p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">Low, average and high assumptions</h2>
            <p>Market-estimate categories have low, average and high planning values. The appropriate price band and jurisdiction are selected where relevant. The figures are judgement-based planning ranges, so a real quotation should replace the estimate as soon as it is available.</p>
            <p>Derived ranges are calculated by summing named categories from the same calculator result. They are not separately maintained headline figures.</p>
            <p>The supporting guides use the same layers: for example, <Link href="/conveyancing-costs-uk" className="underline hover:text-brand-deep">conveyancing planning figures</Link> reuse the solicitor, search and transfer assumptions, <Link href="/property-survey-costs-uk" className="underline hover:text-brand-deep">survey-level examples</Link> reuse the survey bands, and <Link href="/land-registry-fees-uk" className="underline hover:text-brand-deep">registration tables</Link> come from the verified jurisdiction modules.</p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">Jurisdiction handling</h2>
            <p>England and Northern Ireland use SDLT, Scotland uses LBTT and Wales uses LTT. First-time buyer and additional-property treatment is selected from the relevant official rule set.</p>
            <p><Link href="/land-registry-fees-uk" className="underline hover:text-brand-deep">Registration is also jurisdiction-specific</Link>: HM Land Registry for qualifying England and Wales applications, Registers of Scotland for Scottish dispositions, and Land &amp; Property Services for Northern Ireland. Northern Ireland is never treated as an HM Land Registry jurisdiction.</p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">Source and review practice</h2>
            <p>Official tax and registration sources are checked when rules or fee tables change and during substantive factual reviews. Market estimates are reviewed for internal consistency and explainability; one commercial quote does not automatically replace the central range.</p>
            <ResponsiveTable
              caption={`Official sources checked for calculator data version ${calculatorMetadata.dataVersion}`}
              columns={["Source", "Jurisdiction", "Checked", "Rule or fee verified"]}
              rows={officialSourceVerification.map((source) => [source.sourceName, source.jurisdiction, source.dateChecked, source.verified])}
            />
            <p>A visible review date records a substantive factual review, not a build or formatting date. Article schema uses the same substantive date shown on the page.</p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">Versioning, changes and corrections</h2>
            <p>Calculator data version {calculatorMetadata.dataVersion} is separate from individual article review dates. Material tax, registration or market-assumption changes are recorded in the <Link href="/calculator-updates" className="underline hover:text-brand-deep">calculator data change log</Link>.</p>
            <p>Report an incorrect tax result, outdated fee, broken source, misleading wording or calculator fault through the <Link href="/contact" className="underline hover:text-brand-deep">public corrections route</Link>.</p>
          </section>

          <Disclaimer />
        </article>

        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <div className="surface p-5">
            <p className="eyebrow">Current data</p>
            <dl className="mt-3 grid gap-3 text-sm">
              <div><dt className="font-semibold">Version</dt><dd className="text-muted">{calculatorMetadata.dataVersion}</dd></div>
              <div><dt className="font-semibold">Last verified</dt><dd className="text-muted">{calculatorMetadata.lastReviewedLabel}</dd></div>
            </dl>
          </div>
          <div className="surface p-5">
            <p className="eyebrow">Useful checks</p>
            <div className="mt-4 grid gap-2 text-sm">
              <Link href="/#calculator" className="underline hover:text-brand-deep">Use the calculator</Link>
              <Link href="/calculator-updates" className="underline hover:text-brand-deep">Data change log</Link>
              <Link href="/contact" className="underline hover:text-brand-deep">Report a correction</Link>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
