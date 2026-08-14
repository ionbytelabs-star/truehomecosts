import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { OfficialSources } from "@/components/OfficialSources";
import { ResponsiveTable } from "@/components/ResponsiveTable";
import { StructuredData } from "@/components/StructuredData";
import {
  comparisonPropertyPrices,
  estimatedBuyingCosts,
  getPriceGuideFacts
} from "@/content/price-guide-builder";
import { calculatorMetadata } from "@/data/assumptions/calculator";
import { formatCurrency } from "@/lib/format";
import { buildMetadata } from "@/lib/metadata";
import { priceGuideLinks } from "@/lib/price-guide-links";
import { breadcrumbSchema, webpageSchema } from "@/lib/structured-data";

const path = "/house-buying-cost-by-property-price";
const description =
  "Compare deposits, buying costs, total cash and property tax for UK homes from £150,000 to £750,000 using the same calculations as the TrueHomeCosts calculator.";
const comparisonFacts = comparisonPropertyPrices.map(getPriceGuideFacts);

const depositRows = comparisonFacts.map((facts) => [
  facts.formattedPrice,
  formatCurrency(facts.deposits[5]),
  formatCurrency(facts.deposits[10]),
  formatCurrency(facts.deposits[15])
]);

const englandCashRows = comparisonFacts.map((facts) => [
  facts.formattedPrice,
  formatCurrency(facts.englandHomeMover.propertyTaxAmount),
  formatCurrency(estimatedBuyingCosts(facts.englandHomeMover)),
  formatCurrency(facts.englandHomeMover.totalUpfrontCash)
]);

const taxRows = comparisonFacts.map((facts) => [
  facts.formattedPrice,
  formatCurrency(facts.englandHomeMover.propertyTaxAmount),
  formatCurrency(facts.englandFirstTimeBuyer.propertyTaxAmount),
  formatCurrency(facts.scotlandHomeMover.propertyTaxAmount),
  formatCurrency(facts.walesHomeMover.propertyTaxAmount)
]);

export const metadata = buildMetadata({
  title: "House Buying Costs by Property Price: £150k to £750k",
  description,
  path,
  keywords: [
    "house buying costs by property price",
    "cash needed to buy a house UK",
    "house deposit comparison",
    "property tax comparison UK"
  ]
});

export default function PropertyPriceHubPage() {
  return (
    <>
      <StructuredData
        data={webpageSchema({
          title: "House buying costs by property price",
          description,
          path,
          dateModified: calculatorMetadata.lastReviewed
        })}
      />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Buying costs by property price", path }
        ])}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Buying costs by property price" }]} />

      <header className="shell pb-8 pt-8">
        <div className="max-w-4xl space-y-4">
          <p className="eyebrow">Calculated property-price comparison</p>
          <h1 className="font-serif text-4xl text-text sm:text-5xl">House buying costs from £150,000 to £750,000</h1>
          <p className="max-w-3xl text-lg text-muted">
            Compare sixteen purchase prices using the same tax rules, registration logic and planning assumptions as the main calculator. See how deposits rise in straight percentages while progressive taxes and jurisdiction-specific charges create less predictable changes in total cash.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/#calculator" className="inline-flex min-h-12 items-center rounded-full bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-deep">
              Calculate your exact buying costs
            </Link>
            <Link href="/methodology" className="inline-flex min-h-12 items-center rounded-full border border-line bg-white px-5 py-3 font-semibold text-text hover:border-brand">
              Read the calculation methodology
            </Link>
          </div>
        </div>
      </header>

      <div className="shell space-y-10 pb-16">
        <section className="surface p-5 sm:p-7" aria-labelledby="deposit-comparison-heading">
          <p className="eyebrow">Deposit comparison</p>
          <h2 id="deposit-comparison-heading" className="mt-2 font-serif text-3xl text-text">What 5%, 10% and 15% mean in cash</h2>
          <p className="mt-3 max-w-3xl text-text">
            Deposits are the linear part of the budget: doubling the property price doubles the cash needed at the same percentage. These figures are arithmetic planning points, not minimum-deposit recommendations or mortgage approvals.
          </p>
          <div className="mt-6">
            <ResponsiveTable
              caption="Deposit cash at all sixteen comparison prices"
              columns={["Property price", "5% deposit", "10% deposit", "15% deposit"]}
              rows={depositRows}
            />
          </div>
        </section>

        <section className="surface p-5 sm:p-7" aria-labelledby="cash-comparison-heading">
          <p className="eyebrow">Worked England home-mover scenario</p>
          <h2 id="cash-comparison-heading" className="mt-2 font-serif text-3xl text-text">Estimated buying costs and total cash with a 10% deposit</h2>
          <p className="mt-3 max-w-3xl text-text">
            Each row uses average cost assumptions, an England home mover, moving and insurance included, furnishing excluded, and a 10% contingency on estimate-led costs. “Buying costs above deposit” includes property tax, registration and the selected estimates and allowances. It is a budgeting illustration, not a quote.
          </p>
          <div className="mt-6">
            <ResponsiveTable
              caption="Calculated England home-mover cash examples"
              columns={["Property price", "Property tax", "Buying costs above deposit", "Total cash with 10% deposit"]}
              rows={englandCashRows}
            />
          </div>
          <p className="mt-4 max-w-3xl text-sm text-muted">
            Costs do not rise perfectly in step with price. Deposits are percentage-based, but property tax is progressive and some fees are fixed, banded or quote-led. This means the proportion of the purchase price represented by non-deposit costs changes between rows.
          </p>
        </section>

        <section className="surface p-5 sm:p-7" aria-labelledby="tax-comparison-heading">
          <p className="eyebrow">Nation and buyer status</p>
          <h2 id="tax-comparison-heading" className="mt-2 font-serif text-3xl text-text">Property-purchase tax at every comparison price</h2>
          <p className="mt-3 max-w-3xl text-text">
            England and Northern Ireland use Stamp Duty Land Tax (SDLT), Scotland uses Land and Buildings Transaction Tax (LBTT), and Wales uses Land Transaction Tax (LTT). Each system has its own progressive bands. The first-time buyer column shows the England or Northern Ireland calculator setting; eligibility can materially change the result and must be checked for the actual purchase.
          </p>
          <div className="mt-6">
            <ResponsiveTable
              caption="Calculated property tax by price, nation and buyer type"
              columns={["Property price", "England / NI home mover", "England / NI first-time buyer", "Scotland home mover", "Wales home mover"]}
              rows={taxRows}
            />
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2" aria-label="How to interpret the comparison">
          <div className="surface p-5 sm:p-7">
            <h2 className="font-serif text-3xl text-text">Why progressive bands change the pattern</h2>
            <p className="mt-3 text-text">
              Property tax is calculated in slices. When a price crosses a band boundary, only the slice inside the next band is charged at that rate. That is why the tax column changes in steps rather than as one flat percentage of the full purchase price.
            </p>
            <p className="mt-3 text-muted">
              Higher rates for additional properties, replacement-of-main-residence rules and relief eligibility can produce a different result from every standard example shown here.
            </p>
          </div>
          <div className="surface p-5 sm:p-7">
            <h2 className="font-serif text-3xl text-text">Why the exact calculator still matters</h2>
            <p className="mt-3 text-text">
              Legal complexity, survey choice, mortgage product, removals, insurance, furnishing and contingency are transaction-specific. Select your nation and buyer type, then replace the planning figures with current quotations wherever possible.
            </p>
            <Link href="/#calculator" className="mt-5 inline-flex min-h-12 items-center rounded-full bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-deep">
              Run your own circumstances
            </Link>
          </div>
        </section>

        <section className="surface p-5 sm:p-7" aria-labelledby="detailed-guides-heading">
          <p className="eyebrow">Distinct price guides</p>
          <h2 id="detailed-guides-heading" className="mt-2 font-serif text-3xl text-text">Read the guide nearest your target price</h2>
          <p className="mt-3 max-w-3xl text-muted">
            The comparison above covers all sixteen price points. These eight standalone guides are retained where a price has a genuinely useful tax threshold, deposit or budgeting story to explain in more depth.
          </p>
          <nav aria-label="Detailed property-price buying-cost guides" className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {priceGuideLinks.map((link) => (
              <Link key={link.slug} href={`/${link.slug}`} className="flex min-h-12 items-center rounded-2xl border border-line bg-white px-4 py-3 font-semibold text-text transition hover:border-brand hover:text-brand-deep">
                {link.label}
              </Link>
            ))}
          </nav>
        </section>

        <section className="surface p-5 sm:p-7" aria-labelledby="sources-heading">
          <h2 id="sources-heading" className="font-serif text-3xl text-text">Official rates and calculation scope</h2>
          <p className="mt-3 max-w-3xl text-text">
            Tax and applicable registration charges use the site's centrally maintained official-rate data. Solicitor, search, survey, mortgage, moving and insurance figures remain planning estimates until replaced with transaction-specific quotations. Rates and methodology were last reviewed on {calculatorMetadata.lastReviewedLabel}.
          </p>
          <div className="mt-6">
            <OfficialSources sourceKeys={["sdlt", "lbtt", "lbttAds", "ltt", "hmlr", "ros", "lpsNi"]} />
          </div>
        </section>
      </div>
    </>
  );
}
