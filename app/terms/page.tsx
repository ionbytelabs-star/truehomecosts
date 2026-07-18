import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Disclaimer } from "@/components/Disclaimer";
import { PageIntro } from "@/components/PageIntro";
import { StructuredData } from "@/components/StructuredData";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, webpageSchema } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: "Terms",
  description:
    "Terms for using TrueHomeCosts, including the limits of general UK home-buying cost information.",
  path: "/terms"
});

export default function TermsPage() {
  return (
    <>
      <StructuredData
        data={webpageSchema({
          title: "Terms",
          description: "Terms for using TrueHomeCosts.",
          path: "/terms"
        })}
      />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" }
        ])}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
      <PageIntro
        title="Terms"
        description="These terms explain the limits of the information on TrueHomeCosts."
        summary="The site is a planning aid for UK home-buying costs. It does not provide personal financial, mortgage, tax or legal advice."
        badge="Site terms"
      />

      <section className="shell max-w-prose space-y-8 pb-16">
        <section className="space-y-3">
          <h2 className="font-serif text-3xl text-text">Using the site</h2>
          <p>
            TrueHomeCosts provides general information and calculator estimates for UK home-buying costs. You
            can use the site to plan, compare scenarios and understand common cost categories.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-3xl text-text">No personal advice</h2>
          <p>
            The site does not know your full circumstances and does not provide personal financial, mortgage,
            tax or legal advice. Buyers should confirm important figures with official sources and qualified
            professionals before making decisions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-3xl text-text">Estimates and changes</h2>
          <p>
            Calculator results and guide figures are planning estimates unless they are clearly described as
            official-rate items. Tax rules, fees, market prices and provider quotes can change.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-3xl text-text">Useful related pages</h2>
          <p>
            Read{" "}
            <Link href="/methodology" className="underline hover:text-brand-deep">
              how estimates work
            </Link>
            {" "}and the{" "}
            <Link href="/privacy" className="underline hover:text-brand-deep">
              privacy policy
            </Link>
            {" "}for more detail about how the site handles data.
          </p>
        </section>

        <Disclaimer />
      </section>
    </>
  );
}
