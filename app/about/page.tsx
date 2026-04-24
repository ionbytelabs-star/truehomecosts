import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Disclaimer } from "@/components/Disclaimer";
import { PageIntro } from "@/components/PageIntro";
import { StructuredData } from "@/components/StructuredData";
import { buildMetadata } from "@/lib/metadata";
import { webpageSchema } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: "About TrueHomeCosts",
  description:
    "Learn why TrueHomeCosts exists, how it stays independent, and why the site focuses on plain-English UK home-buying cost guidance rather than sales funnels.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <>
      <StructuredData
        data={webpageSchema({
          title: "About TrueHomeCosts",
          description:
            "Why TrueHomeCosts exists and how the site approaches UK home-buying costs in a practical, independent way.",
          path: "/about"
        })}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <PageIntro
        title="About TrueHomeCosts"
        description="TrueHomeCosts exists to make UK home-buying costs easier to understand without sales pressure, lead forms or jargon."
        summary="The site was built to answer a simple problem: too many buyers know the listing price and deposit, but not the full cash needed to complete and move in."
        badge="Independent"
      />

      <section className="shell grid gap-10 pb-16 lg:grid-cols-[1fr_320px]">
        <article className="space-y-8">
          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">Why this site exists</h2>
            <p>
              Many home-buying articles explain one fee in isolation. Buyers then have to stitch together tax,
              legal costs, surveys, mortgage fees, moving costs and post-completion setup on their own. This
              site puts those pieces in one place.
            </p>
            <p>
              The aim is not to push a mortgage, a broker or an estate agent. It is to help people plan with
              clearer numbers and fewer surprises.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">How the site is positioned</h2>
            <p>
              TrueHomeCosts is independent, UK-focused and practical. It separates official rates from market
              estimates, explains where uncertainty sits, and uses plain English rather than finance-heavy
              jargon.
            </p>
            <p>
              The calculator runs client-side and the site is designed to stay lightweight, static and easy to
              maintain.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">What the site is not</h2>
            <p>
              TrueHomeCosts is not a lender, broker, law firm or regulated financial adviser. It does not
              replace personal advice from a solicitor, tax specialist or mortgage professional when a real
              transaction is on the line.
            </p>
          </section>

          <Disclaimer />
        </article>

        <aside className="space-y-4">
          <div className="surface p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep">Built for</p>
            <ul className="mt-3 grid gap-2 text-sm text-muted">
              <li>First-time buyers</li>
              <li>Home movers</li>
              <li>Second-home and additional-property planners</li>
              <li>Anyone comparing the true upfront cost across UK nations</li>
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
