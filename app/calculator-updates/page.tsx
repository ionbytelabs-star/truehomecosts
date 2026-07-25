import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageIntro } from "@/components/PageIntro";
import { StructuredData } from "@/components/StructuredData";
import { calculatorMetadata } from "@/data/assumptions/calculator";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, webpageSchema } from "@/lib/structured-data";

const description = "Material changes to TrueHomeCosts calculator tax rules, registration fees, planning assumptions and corrections.";

export const metadata = buildMetadata({ title: "Calculator Data Updates", description, path: "/calculator-updates" });

const updates = [
  {
    version: "Report 2026.1",
    date: "25 July 2026",
    categories: "Reusable report data and publisher resources",
    details: "Added a calculator-generated 2026 report dataset covering 156 price, jurisdiction and buyer-type scenarios, with CSV, JSON, chart and embeddable calculator outputs."
  },
  {
    version: "2026.07.1",
    date: "19 July 2026",
    categories: "Registration, sitewide examples and editorial scopes",
    details: "Added the official Registers of Scotland disposition fee scale; moved all sixteen property-price examples and core guide totals onto the production calculator; defined named cost scopes and separated moving, insurance and furnishing throughout."
  },
  {
    version: "2026.07",
    date: "19 July 2026",
    categories: "Homepage calculator assumptions and classifications",
    details: "Centralised the twelve calculator categories, verified UK property-tax rules and corrected homepage inclusion and classification wording."
  }
] as const;

export default function CalculatorUpdatesPage() {
  return (
    <>
      <StructuredData data={webpageSchema({ title: "Calculator data updates", description, path: "/calculator-updates", dateModified: calculatorMetadata.lastReviewed })} />
      <StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Calculator data updates", path: "/calculator-updates" }])} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Calculator data updates" }]} />
      <PageIntro title="Calculator data updates" description="A lightweight record of material data and calculation changes. Layout-only and minor wording edits are not listed." summary={`The current calculator data version is ${calculatorMetadata.dataVersion}, last verified ${calculatorMetadata.lastReviewedLabel}.`} badge="Data change log" />
      <section className="shell pb-16">
        <div className="grid gap-5">
          {updates.map((update) => (
            <article key={update.version} className="surface p-5 sm:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="font-serif text-3xl text-text">Version {update.version}</h2>
                <p className="text-sm text-muted">{update.date}</p>
              </div>
              <p className="mt-3 font-semibold text-text">{update.categories}</p>
              <p className="mt-2 max-w-4xl text-muted">{update.details}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-muted">Read the <Link href="/methodology" className="underline hover:text-brand-deep">methodology</Link>, explore the <Link href="/reports/true-cost-buying-home-uk-2026" className="underline hover:text-brand-deep">2026 home-buying cost report</Link>, download <Link href="/press-and-data" className="underline hover:text-brand-deep">press and data resources</Link> or <Link href="/contact" className="underline hover:text-brand-deep">report a correction</Link>.</p>
      </section>
    </>
  );
}
