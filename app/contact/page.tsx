import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalloutBox } from "@/components/CalloutBox";
import { StructuredData } from "@/components/StructuredData";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, webpageSchema } from "@/lib/structured-data";

const contactEmail = "truehomecosts@proton.me";
const contactDescription =
  "Contact True Home Costs with questions about our calculators and guides, report an error or outdated information, or discuss media and partnership enquiries.";
const helpTopics = [
  "Questions about using the home-buying cost calculator",
  "Feedback on our guides or cost estimates",
  "Reporting errors, broken links or outdated information",
  "Suggestions for new topics, tools or calculators",
  "Media, partnership or business enquiries"
] as const;
const adviceLimitations = [
  "Personal financial advice",
  "Mortgage recommendations",
  "Legal advice",
  "Tax advice",
  "Property valuations"
] as const;

export const metadata = buildMetadata({
  title: "Contact True Home Costs | Questions, Feedback and Corrections",
  description: contactDescription,
  path: "/contact"
});

export default function ContactPage() {
  return (
    <>
      <StructuredData
        data={webpageSchema({
          title: "Contact True Home Costs",
          description: contactDescription,
          path: "/contact"
        })}
      />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" }
        ])}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <section className="section-gap pb-6 pt-8">
        <div className="shell space-y-4">
          <p className="eyebrow">Contact</p>
          <div className="space-y-2">
            <h1 className="max-w-prose font-serif text-3xl text-text sm:text-5xl">
              Contact True Home Costs
            </h1>
            <p className="max-w-prose text-lg text-muted">
              Have a question about the website, spotted something that needs correcting, or want to get in
              touch?
            </p>
          </div>
          <div className="surface max-w-prose border-brand/20 bg-panel-strong p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep">Direct answer</p>
            <p className="mt-2 text-text">We're always happy to hear from readers.</p>
          </div>
        </div>
      </section>

      <section className="shell grid gap-10 pb-16 lg:grid-cols-[1fr_320px]">
        <article className="min-w-0 max-w-prose space-y-8">
          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">General enquiries</h2>
            <div className="surface border-brand/20 bg-panel-strong p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep">Email</p>
              <p className="mt-3 break-words text-lg font-semibold text-text">
                <a href={`mailto:${contactEmail}`} className="underline hover:text-brand-deep">
                  {contactEmail}
                </a>
              </p>
              <p className="mt-4 text-muted">
                We aim to respond to genuine enquiries as quickly as possible, normally within 2-3 working
                days.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">What we can help with</h2>
            <ul className="grid gap-3">
              {helpTopics.map((item) => (
                <li key={item} className="surface px-4 py-3 text-text">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">Before contacting us</h2>
            <p>
              True Home Costs provides general information to help people understand the costs involved in
              buying and owning a home in the UK.
            </p>
            <div className="surface p-5">
              <p className="font-semibold text-text">Unfortunately, we cannot provide:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-text/95">
                {adviceLimitations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <p>For advice specific to your circumstances, please speak to an appropriately qualified professional.</p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">About True Home Costs</h2>
            <p>
              True Home Costs is an independent UK information website created to help buyers understand the
              full cost of purchasing and owning a home - not just the deposit.
            </p>
            <p>
              Learn more on the{" "}
              <Link href="/about" className="font-medium underline hover:text-brand-deep">
                About page
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">Privacy</h2>
            <p>
              If you contact us by email, we will only use the information you provide to read and respond to
              your enquiry. Please see our{" "}
              <Link href="/privacy" className="font-medium underline hover:text-brand-deep">
                Privacy Policy
              </Link>{" "}
              for more information.
            </p>
          </section>

          <CalloutBox title="Business enquiries">
            <p>
              For media requests, partnerships or advertising enquiries, please contact{" "}
              <a href={`mailto:${contactEmail}`} className="font-medium underline hover:text-brand-deep">
                {contactEmail}
              </a>
              .
            </p>
          </CalloutBox>
        </article>

        <aside className="space-y-4">
          <div className="surface p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep">Contact scope</p>
            <p className="mt-3 text-sm text-muted">
              This page is for website questions, corrections, feedback and business enquiries. True Home Costs
              does not provide regulated advice or individual recommendations.
            </p>
          </div>
          <div className="surface p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep">Useful links</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/about" className="link-chip">
                About
              </Link>
              <Link href="/privacy" className="link-chip">
                Privacy Policy
              </Link>
              <Link href="/methodology" className="link-chip">
                Methodology
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
