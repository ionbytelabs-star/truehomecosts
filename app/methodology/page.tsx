import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Disclaimer } from "@/components/Disclaimer";
import { PageIntro } from "@/components/PageIntro";
import { StructuredData } from "@/components/StructuredData";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, webpageSchema } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: "How TrueHomeCosts Estimates Work",
  description:
    "How TrueHomeCosts builds UK home-buying cost estimates, separates official charges from market ranges, and explains calculator limits.",
  path: "/methodology"
});

export default function MethodologyPage() {
  return (
    <>
      <StructuredData
        data={webpageSchema({
          title: "How TrueHomeCosts estimates work",
          description:
            "How UK home-buying cost estimates are built and how buyers should use them for planning.",
          path: "/methodology"
        })}
      />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "How estimates work", path: "/methodology" }
        ])}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "How estimates work" }]} />
      <PageIntro
        title="How estimates work"
        description="This page explains how TrueHomeCosts separates official charges from planning estimates, and how to use the calculator without treating it as a quote."
        summary="The useful number is not just the deposit. It is the deposit plus tax, legal work, searches, surveys, lender fees, moving costs and a sensible buffer."
        badge="Methodology"
      />

      <section className="shell grid gap-10 pb-16 lg:grid-cols-[1fr_320px]">
        <article className="space-y-8">
          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">Official charges</h2>
            <p>
              Official charges are taken from public sources where available. This includes UK property tax
              systems such as SDLT, LBTT and LTT, and relevant published registration fee information.
            </p>
            <p>
              These figures are still time-sensitive. Tax bands, reliefs, supplements and fee tables can change,
              so important numbers should be checked against the relevant official source before a buyer relies
              on them.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">Market estimates</h2>
            <p>
              Some buying costs are not fixed by a public table. Solicitor fees, search packs, surveys, mortgage
              fees, removals, insurance and furnishing costs vary by provider and by property.
            </p>
            <p>
              TrueHomeCosts treats these as indicative ranges. They are useful for early planning, but they are
              not a substitute for a solicitor quote, lender illustration, survey quote, insurance quote or
              removal quote.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">What can change the number</h2>
            <p>
              The same purchase price can produce a different total depending on region, buyer type, property
              age, tenure, lender, solicitor, survey level, moving distance and whether the buyer wants a
              realistic setup buffer.
            </p>
            <p>
              Leasehold homes, older buildings, new-build purchases, unusual titles, cash purchases and complex
              chains can all move the real cost away from a simple estimate.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">How to use the calculator</h2>
            <p>
              Start with the{" "}
              <Link href="/#calculator" className="underline hover:text-brand-deep">
                calculator
              </Link>
              {" "}to build a first version of the budget. Then change the buyer type, assumption level, moving
              choices and deposit setting to see how much room the purchase really has.
            </p>
            <p>
              Treat the result as a planning baseline. When real quotes arrive, compare them with the estimate
              and update the budget instead of relying on the first number.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">Before you rely on a figure</h2>
            <p>
              Check official tax and fee figures at source, read solicitor quotes with VAT and disbursements in
              mind, and choose a survey level that fits the property. If the decision is material, use qualified
              professional advice before committing.
            </p>
          </section>

          <Disclaimer />
        </article>

        <aside className="space-y-4">
          <div className="surface p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep">Useful checks</p>
            <div className="mt-4 grid gap-2 text-sm">
              <Link href="/stamp-duty-explained" className="underline hover:text-brand-deep">
                Stamp duty and UK property tax
              </Link>
              <Link href="/hidden-costs-buying-house" className="underline hover:text-brand-deep">
                Hidden costs of buying
              </Link>
              <Link href="/mortgage-fees-costs" className="underline hover:text-brand-deep">
                Mortgage fees and costs
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
