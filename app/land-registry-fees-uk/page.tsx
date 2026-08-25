import Link from "next/link";

import { HmlrFeeCalculator } from "@/components/HmlrFeeCalculator";
import { ResponsiveTable } from "@/components/ResponsiveTable";
import { StructuredData } from "@/components/StructuredData";
import {
  landRegistryFaqs,
  landRegistryH1,
  landRegistryMetaDescription,
  landRegistryPageTitle,
  landRegistryReviewDate,
  landRegistryReviewLabel
} from "@/content/land-registry-fees-uk";
import {
  hmlrFeeCalculatorUrl,
  hmlrScale1FeeBands,
  hmlrScale2FeeBands,
  hmlrSourceUrl
} from "@/data/fees/hmlr";
import {
  northernIrelandFeesReviewSourceUrl,
  northernIrelandLandRegistrySourceUrl,
  northernIrelandLandRegistryTransferFees
} from "@/data/fees/northern-ireland";
import {
  scotlandDispositionRegistrationFees,
  scotlandRegistrationSourceUrl
} from "@/data/fees/scotland";
import { formatCurrency } from "@/lib/format";
import { buildMetadata } from "@/lib/metadata";
import { sourceLinks } from "@/lib/source-links";
import { articleSchema, breadcrumbSchema, faqPageSchema, webpageSchema } from "@/lib/structured-data";

const path = "/land-registry-fees-uk";

export const metadata = buildMetadata({
  title: landRegistryPageTitle,
  description: landRegistryMetaDescription,
  path,
  keywords: [
    "land registry fees",
    "HM Land Registry fees",
    "HMLR fee calculator",
    "Scale 1 fees",
    "Scale 2 fees"
  ],
  absoluteTitle: true
});

function rangeLabel(index: number, bands: readonly { upTo: number | null }[]): string {
  const upTo = bands[index]?.upTo;
  const previousUpTo = index === 0 ? -1 : bands[index - 1]?.upTo;
  const from = typeof previousUpTo === "number" ? previousUpTo + 1 : 0;

  if (upTo === null || upTo === undefined) {
    return `${formatCurrency(from)}+`;
  }

  return `${formatCurrency(from)}–${formatCurrency(upTo)}`;
}

const commonScale1Rows = hmlrScale1FeeBands.map((band) => [band.label, formatCurrency(band.portalWhole)]);

const fullScale1Rows = hmlrScale1FeeBands.map((band) => [
  band.label,
  formatCurrency(band.post),
  formatCurrency(band.portalWhole),
  formatCurrency(band.portalPartLease),
  formatCurrency(band.voluntaryFirstRegistration)
]);

const fullScale2Rows = hmlrScale2FeeBands.map((band) => [
  band.label,
  formatCurrency(band.post),
  formatCurrency(band.portalWhole),
  formatCurrency(band.portalPartOther)
]);

const scotlandRows = scotlandDispositionRegistrationFees.map((band, index) => [
  rangeLabel(index, scotlandDispositionRegistrationFees),
  formatCurrency(band.fee)
]);

const northernIrelandRows = northernIrelandLandRegistryTransferFees.map((band, index) => [
  rangeLabel(index, northernIrelandLandRegistryTransferFees),
  formatCurrency(band.electronic),
  formatCurrency(band.other)
]);

const sectionClass = "scroll-mt-24 border-t border-line pt-10 sm:pt-12";

export default function LandRegistryFeesPage() {
  return (
    <>
      <StructuredData
        data={webpageSchema({
          title: landRegistryPageTitle,
          description: landRegistryMetaDescription,
          path,
          dateModified: landRegistryReviewDate,
          keywords: ["land registry fees", "HM Land Registry fees", "Scale 1", "Scale 2"]
        })}
      />
      <StructuredData
        data={articleSchema({
          headline: landRegistryH1,
          description: landRegistryMetaDescription,
          path,
          dateModified: landRegistryReviewDate,
          keywords: ["land registry fees", "HM Land Registry fees", "Scale 1", "Scale 2"]
        })}
      />
      <StructuredData data={faqPageSchema([...landRegistryFaqs])} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Land Registry fees", path }
        ])}
      />

      <div className="shell">
        <article className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-3 pt-7 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:pt-8">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="underline hover:text-brand-deep">Home</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">Land Registry fees</li>
              </ol>
            </nav>
            <p>
              Reviewed <time dateTime={landRegistryReviewDate}>{landRegistryReviewLabel}</time>
            </p>
          </div>

          <header className="pb-8 pt-6 sm:pb-10 sm:pt-8">
            <h1 className="max-w-4xl font-serif text-4xl leading-tight text-text sm:text-5xl">
              {landRegistryH1}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-text">
              HM Land Registry fees in England and Wales depend on the property value, application type and how the
              application is submitted. For a typical electronic transfer of the whole of an already registered title,
              current Scale 1 fees range from £20 to £500.
            </p>
            <p className="mt-3 max-w-3xl text-muted">
              Use the calculator below for England and Wales. Buying in Scotland or Northern Ireland? Jump to the{" "}
              <a href="#scotland" className="font-semibold text-brand-deep underline hover:text-brand">Scotland registration fees</a>
              {" "}or{" "}
              <a href="#northern-ireland" className="font-semibold text-brand-deep underline hover:text-brand">Northern Ireland registration fees</a>.
            </p>
          </header>

          <HmlrFeeCalculator />

          <div className="space-y-10 pb-12 pt-10 sm:space-y-12 sm:pb-16 sm:pt-12">
            <section aria-labelledby="at-a-glance-heading">
              <h2 id="at-a-glance-heading" className="font-serif text-3xl text-text sm:text-4xl">
                Land Registry fees at a glance
              </h2>
              <p className="mt-3 max-w-3xl text-muted">
                This is the common Scale 1 portal or Business Gateway rate for a transfer of the whole of an already
                registered title. It is not a universal fee for every HM Land Registry application.
              </p>
              <div className="mt-5">
                <ResponsiveTable
                  caption="Common electronic whole-title Scale 1 fees"
                  summary="The most common HM Land Registry Scale 1 portal or Business Gateway fees for a transfer of the whole of a registered title."
                  columns={["Property value", "Fee"]}
                  rows={commonScale1Rows}
                />
              </div>
            </section>

            <section className={sectionClass} aria-labelledby="which-scale-heading">
              <h2 id="which-scale-heading" className="font-serif text-3xl text-text sm:text-4xl">
                Which Land Registry fee scale applies?
              </h2>
              <div className="mt-4 grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-xl font-semibold text-text">Scale 1</h3>
                  <p className="mt-2 text-muted">
                    Scale 1 broadly covers transactions including transfers of registered land for monetary
                    consideration and first registrations. It also covers certain leases, surrenders and large-scale
                    applications.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text">Scale 2</h3>
                  <p className="mt-2 text-muted">
                    Scale 2 applies to a range of other applications including various transfers or assents not for
                    monetary consideration, registered charges and other applications affecting registered estates.
                  </p>
                </div>
              </div>
              <p className="mt-5 rounded-2xl border border-brand/20 bg-brand-soft/65 p-4 font-semibold text-text">
                Not sure which applies? Don’t guess. Check the application with your conveyancer or HM Land Registry.
              </p>
            </section>

            <section id="scale-1-fees" className={sectionClass} aria-labelledby="scale-1-heading">
              <h2 id="scale-1-heading" className="font-serif text-3xl text-text sm:text-4xl">Full Scale 1 fees</h2>
              <p className="mt-3 max-w-3xl text-muted">
                Scale 1 is assessed on the value or amount relevant to the application. Portal reductions apply only
                to the routes described in HM Land Registry guidance.
              </p>
              <div className="mt-5">
                <ResponsiveTable
                  caption="HM Land Registry Scale 1 fees"
                  summary="Current HM Land Registry Scale 1 fees by value and submission route, verified 25 August 2026."
                  columns={[
                    "Value or amount",
                    "Post",
                    "Portal: whole registered title",
                    "Portal: part title or lease",
                    "Voluntary first registration"
                  ]}
                  rows={fullScale1Rows}
                />
              </div>
            </section>

            <section id="scale-2-fees" className={sectionClass} aria-labelledby="scale-2-heading">
              <h2 id="scale-2-heading" className="font-serif text-3xl text-text sm:text-4xl">Full Scale 2 fees</h2>
              <p className="mt-3 max-w-3xl text-muted">
                Scale 2 calculations can depend on an assessment value that is not the full property value. Do not
                infer mortgage, share or equity calculations unless the application details have been checked.
              </p>
              <div className="mt-5">
                <ResponsiveTable
                  caption="HM Land Registry Scale 2 fees"
                  summary="Current HM Land Registry Scale 2 fees by assessment value and submission route, verified 25 August 2026."
                  columns={[
                    "Value or amount",
                    "Post",
                    "Portal: whole registered title",
                    "Portal: part title or other"
                  ]}
                  rows={fullScale2Rows}
                />
              </div>
            </section>

            <section className={sectionClass} aria-labelledby="other-nations-heading">
              <h2 id="other-nations-heading" className="font-serif text-3xl text-text sm:text-4xl">
                Buying in Scotland or Northern Ireland?
              </h2>
              <p className="mt-3 max-w-3xl text-muted">
                HM Land Registry covers England and Wales. Scotland and Northern Ireland operate separate registration
                systems, with their own terminology and fee schedules.
              </p>
            </section>

            <section id="scotland" className={sectionClass} aria-labelledby="scotland-heading">
              <h2 id="scotland-heading" className="font-serif text-3xl text-text sm:text-4xl">
                Scotland: Registers of Scotland
              </h2>
              <p className="mt-3 max-w-3xl text-muted">
                For a deed transferring ownership, Registers of Scotland bases the fee on the consideration stated in
                the deed or the property value, whichever is greater. Other deeds and applications can attract
                different or additional charges.
              </p>
              <div className="mt-5">
                <ResponsiveTable
                  caption="Registers of Scotland disposition registration fees"
                  summary="Current Registers of Scotland fees for deeds transferring property ownership."
                  columns={["Consideration or value", "Fee"]}
                  rows={scotlandRows}
                />
              </div>
            </section>

            <section id="northern-ireland" className={sectionClass} aria-labelledby="northern-ireland-heading">
              <h2 id="northern-ireland-heading" className="font-serif text-3xl text-text sm:text-4xl">
                Northern Ireland: Land &amp; Property Services
              </h2>
              <p className="mt-3 max-w-3xl text-muted">
                Northern Ireland is not an HM Land Registry jurisdiction. Land &amp; Property Services administers the
                Land Registry and Registry of Deeds. The table below shows the current Land Registry transfer scale;
                Registry of Deeds or other treatment can differ.
              </p>
              <div className="mt-5">
                <ResponsiveTable
                  caption="Northern Ireland Land Registry transfer fees"
                  summary="Current Northern Ireland Land Registry transfer fees under the 2014 Fee Order. Proposed 2027 changes were still consultation proposals when checked."
                  columns={["Consideration or value", "Electronic", "Other"]}
                  rows={northernIrelandRows}
                />
              </div>
            </section>

            <section className={sectionClass} aria-labelledby="differences-heading">
              <h2 id="differences-heading" className="font-serif text-3xl text-text sm:text-4xl">
                Why two similar purchases can have different registration fees
              </h2>
              <ul className="mt-5 grid gap-3 pl-5 text-text md:grid-cols-2 md:gap-x-10">
                <li className="list-disc">Registered land can use a different route from land requiring first registration.</li>
                <li className="list-disc">A transfer of the whole title can receive a reduction that a part-title transfer does not.</li>
                <li className="list-disc">Electronic and postal submission routes can carry different fees.</li>
                <li className="list-disc">The consideration, property value or fee-assessment value can put the application in another band.</li>
                <li className="list-disc">The application type, additional deeds and separately lodged applications can change the total.</li>
                <li className="list-disc">England and Wales, Scotland and Northern Ireland use different registration systems.</li>
              </ul>
            </section>

            <section className={sectionClass} aria-labelledby="comparison-heading">
              <h2 id="comparison-heading" className="font-serif text-3xl text-text sm:text-4xl">
                Land Registry fee vs Stamp Duty vs conveyancing fee
              </h2>
              <p className="mt-3 max-w-3xl text-muted">
                These can all appear in the legal budget, but they pay for different things and should not be combined
                into one vague “solicitor fee”.
              </p>
              <div className="mt-5">
                <ResponsiveTable
                  caption="Three different home-buying cost lines"
                  columns={["Cost", "What it pays for", "Who receives it"]}
                  rows={[
                    ["Registration fee", "Registering the application under the relevant registration system", "HM Land Registry, Registers of Scotland or Land & Property Services"],
                    ["Property transaction tax", "Tax on the property transaction under the applicable national rules", "HMRC, Revenue Scotland or Welsh Revenue Authority"],
                    ["Conveyancing fee", "The solicitor or conveyancer’s professional work", "Your solicitor or licensed conveyancer"]
                  ]}
                />
              </div>
            </section>

            <section className={sectionClass} aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="font-serif text-3xl text-text sm:text-4xl">Land Registry fee FAQs</h2>
              <dl className="mt-5 divide-y divide-line border-y border-line">
                {landRegistryFaqs.map((faq) => (
                  <div key={faq.question} className="py-5 sm:grid sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-8">
                    <dt className="text-lg font-semibold text-text">{faq.question}</dt>
                    <dd className="mt-2 text-muted sm:mt-0">{faq.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className={sectionClass} aria-labelledby="sources-heading">
              <h2 id="sources-heading" className="font-serif text-3xl text-text sm:text-4xl">Sources and review</h2>
              <p className="mt-3 text-text">
                Last reviewed: <time dateTime={landRegistryReviewDate}>{landRegistryReviewLabel}</time>
              </p>
              <p className="mt-3 max-w-3xl text-muted">
                HMLR figures were checked against the official HM Land Registry Registration Services fees guidance.
                Scotland and Northern Ireland figures were checked against their respective official sources. This
                independent guide is not endorsed by any government body.
              </p>
              <ul className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                <li><a href={hmlrSourceUrl} className="font-semibold text-brand-deep underline hover:text-brand">HM Land Registry Registration Services fees</a></li>
                <li><a href={hmlrFeeCalculatorUrl} className="font-semibold text-brand-deep underline hover:text-brand">Official HM Land Registry fee calculator</a></li>
                <li><a href={scotlandRegistrationSourceUrl} className="font-semibold text-brand-deep underline hover:text-brand">Registers of Scotland registration fees</a></li>
                <li><a href={sourceLinks.lpsNi.href} className="font-semibold text-brand-deep underline hover:text-brand">Land &amp; Property Services fee guidance</a></li>
                <li><a href={northernIrelandLandRegistrySourceUrl} className="font-semibold text-brand-deep underline hover:text-brand">Northern Ireland Land Registry Fee Order 2014</a></li>
                <li><a href={northernIrelandFeesReviewSourceUrl} className="font-semibold text-brand-deep underline hover:text-brand">Northern Ireland 2026 fee review consultation</a></li>
              </ul>
            </section>

            <section className={sectionClass} aria-labelledby="related-heading">
              <h2 id="related-heading" className="font-serif text-3xl text-text sm:text-4xl">Related guides</h2>
              <ul className="mt-5 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                <li><Link href="/#calculator" className="font-semibold text-brand-deep underline hover:text-brand">Calculate your full house-buying costs</Link></li>
                <li><Link href="/conveyancing-costs-uk" className="font-semibold text-brand-deep underline hover:text-brand">Understand solicitor and conveyancing costs</Link></li>
                <li><Link href="/stamp-duty-explained" className="font-semibold text-brand-deep underline hover:text-brand">Compare Stamp Duty and UK property taxes</Link></li>
                <li><Link href="/costs-before-completion" className="font-semibold text-brand-deep underline hover:text-brand">See which costs are due before completion</Link></li>
              </ul>
            </section>
          </div>
        </article>
      </div>
    </>
  );
}
