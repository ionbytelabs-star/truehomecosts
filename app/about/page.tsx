import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Disclaimer } from "@/components/Disclaimer";
import { StructuredData } from "@/components/StructuredData";
import { calculatorMetadata } from "@/data/assumptions/calculator";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, webpageSchema } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: "About TrueHomeCosts",
  description:
    "Learn what TrueHomeCosts does, how UK home-buying cost estimates are built, and how official charges are separated from market estimates.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <>
      <StructuredData
        data={webpageSchema({
          title: "About TrueHomeCosts",
          description:
            "What TrueHomeCosts does, who it is for, and how the site explains UK home-buying costs.",
          path: "/about"
        })}
      />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" }
        ])}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <section className="section-gap pb-6 pt-8">
        <div className="shell space-y-4">
          <p className="eyebrow">UK home-buying cost guidance</p>
          <div className="space-y-2">
            <h1 className="font-serif text-4xl text-text sm:text-5xl">About TrueHomeCosts</h1>
            <p className="max-w-prose text-lg text-muted">
              TrueHomeCosts is not a broker, lender or lead-generation site. It does not recommend products or
              providers. The focus is on explaining costs clearly so buyers can plan before speaking to
              professionals.
            </p>
          </div>
          <div className="surface max-w-prose border-brand/20 bg-panel-strong p-4">
            <p className="text-text">
              Most buyers know the listing price and the deposit. Fewer see the full cash picture before the
              transaction starts.
            </p>
          </div>
        </div>
      </section>

      <section className="shell grid gap-10 pb-16 lg:grid-cols-[1fr_320px]">
        <article className="space-y-8">
          <section className="space-y-4">
            <p>
              TrueHomeCosts is a UK home-buying cost information site. It brings the main upfront buying costs
              into one place so buyers can build a more realistic budget before relying on a deposit-only target.
            </p>
            <p>
              The site is for first-time buyers, home movers, additional-property buyers and anyone comparing
              how costs can change across England, Northern Ireland, Scotland and Wales.
            </p>
            <p>
              Reviewed and maintained by TrueHomeCosts using official UK sources and current market cost ranges.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">Why this site exists</h2>
            <p>
              Most property websites focus on mortgages or listings. Very few explain the full cost of buying a
              home in one place.
            </p>
            <p>
              A buyer can have the deposit ready and still be caught out by solicitor fees, searches, surveys,
              tax, lender fees, removals, insurance and the first wave of setup costs. TrueHomeCosts was built
              to show those lines together, in plain UK English, before the pressure of a live purchase.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">How our cost estimates work</h2>
            <p>
              The calculator combines official-rate items with planning estimates. Property tax rules and some
              registration fees use published sources where available. Variable costs, such as conveyancing,
              searches, surveys, mortgage fees, removals, insurance and furnishing, are shown as indicative
              planning ranges.
            </p>
            <p>
              The result is not a quote. It is a way to test whether a purchase budget has enough room for the
              costs that usually sit around the deposit. See the full explanation of{" "}
              <Link href="/methodology" className="underline hover:text-brand-deep">
                how estimates are built
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">Official charges vs market estimates</h2>
            <p>
              Official charges are costs set by published rules or public fee tables, such as SDLT, LBTT, LTT
              and relevant registration fees. These can still change when rules change, but they are not market
              quotes.
            </p>
            <p>
              Market estimates are different. A solicitor, surveyor, lender, removal firm or insurer can quote
              more or less depending on the property, region, timing and buyer circumstances. The site keeps
              those figures separate so buyers can see which numbers are fixed rules and which need checking
              against real quotes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">Review and update process</h2>
            <p>
              Pages are reviewed when tax rules, fee tables or assumptions change. Where a page does not show a
              specific review date, it follows the current shared review cycle, {calculatorMetadata.lastReviewedLabel}{" "}
              at the time of writing.
            </p>
            <p>
              Official-rate data is maintained separately from estimate-led assumptions so changes can be made
              without rewriting every page by hand.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">Important note</h2>
            <p>
              TrueHomeCosts is built for early-stage planning, not quotes or recommendations. It brings
              together deposit, tax and additional costs so buyers can understand the full cash requirement
              before committing to a purchase.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">Useful next pages</h2>
            <p>
              Start with the{" "}
              <Link href="/#calculator" className="underline hover:text-brand-deep">
                main calculator
              </Link>
              {" "}to estimate your total cash requirement, then use the{" "}
              <Link href="/stamp-duty-explained" className="underline hover:text-brand-deep">
                stamp duty guide
              </Link>
              {" "}and{" "}
              <Link href="/methodology" className="underline hover:text-brand-deep">
                methodology page
              </Link>
              {" "}to understand how the numbers are built
              .
            </p>
          </section>

          <Disclaimer />
        </article>

        <aside className="space-y-4">
          <div className="surface p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep">Built for</p>
            <ul className="mt-3 grid gap-2 text-sm text-muted">
              <li>First-time buyers checking the full cash target</li>
              <li>Home movers comparing purchase costs before making an offer</li>
              <li>Additional-property buyers checking tax and fee pressure</li>
              <li>Buyers comparing England, Northern Ireland, Scotland and Wales</li>
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
