import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StructuredData } from "@/components/StructuredData";
import { calculatorMetadata } from "@/data/assumptions/calculator";
import { buildMetadata } from "@/lib/metadata";
import { priceGuideLinks } from "@/lib/price-guide-links";
import { breadcrumbSchema, webpageSchema } from "@/lib/structured-data";

const path = "/house-buying-cost-by-property-price";
const description =
  "Compare UK house buying cost examples by property price, with links to every TrueHomeCosts price-specific guide and the main calculator.";

export const metadata = buildMetadata({
  title: "House Buying Costs by Property Price",
  description,
  path
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
      <StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Buying costs by property price", path }])} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Buying costs by property price" }]} />

      <header className="shell pb-8 pt-8">
        <div className="max-w-4xl space-y-4">
          <p className="eyebrow">Property-price examples</p>
          <h1 className="font-serif text-4xl text-text sm:text-5xl">House buying costs by property price</h1>
          <p className="max-w-3xl text-lg text-muted">
            These pages show how deposit, property tax and planning estimates can combine at different purchase prices. Your jurisdiction, buyer type, deposit, quotations and optional setup choices can materially change the result.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/#calculator" className="inline-flex min-h-12 items-center rounded-full bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-deep">Calculate your own buying costs</Link>
            <Link href="/methodology" className="inline-flex min-h-12 items-center rounded-full border border-line bg-white px-5 py-3 font-semibold text-text hover:border-brand">How the estimates work</Link>
          </div>
        </div>
      </header>

      <section className="shell pb-12" aria-labelledby="all-prices-heading">
        <div className="surface p-5 sm:p-7">
          <h2 id="all-prices-heading" className="font-serif text-3xl text-text">All property-price examples</h2>
          <p className="mt-2 max-w-3xl text-muted">Choose the nearest price, then use the calculator to replace the example assumptions with your own purchase details.</p>
          <nav aria-label="All property-price buying-cost guides" className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {priceGuideLinks.map((link) => (
              <Link key={link.slug} href={`/${link.slug}`} className="flex min-h-12 items-center rounded-2xl border border-line bg-white px-4 py-3 font-semibold text-text transition hover:border-brand hover:text-brand-deep">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="shell pb-16">
        <div className="surface max-w-4xl p-5 sm:p-7">
          <h2 className="font-serif text-3xl text-text">What changes between examples?</h2>
          <p className="mt-3 text-text">
            Purchase price affects deposit, progressive property tax and some market estimates. First-time buyer relief, additional-property rates and the rules in England, Scotland, Wales or Northern Ireland can produce a different tax result at the same price. Legal complexity, survey level, mortgage product and moving choices also remain transaction-specific.
          </p>
          <p className="mt-3 text-muted">Every example is a budgeting illustration, not a quotation or statement of the exact cash your transaction will require.</p>
        </div>
      </section>
    </>
  );
}
