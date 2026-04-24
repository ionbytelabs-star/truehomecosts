import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageIntro } from "@/components/PageIntro";
import { StructuredData } from "@/components/StructuredData";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { breadcrumbSchema, webpageSchema } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact TrueHomeCosts for general site feedback, corrections or partnership enquiries.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <>
      <StructuredData
        data={webpageSchema({
          title: "Contact",
          description: "Contact information for TrueHomeCosts.",
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
      <PageIntro
        title="Contact"
        description="The current site is a straightforward static build, so contact is simple too."
        summary="For now, the contact route is a transparent static page rather than a live support desk. If you want to flag a correction or send a general note, use the email address below."
        badge="Simple contact page"
      />

      <section className="shell max-w-prose space-y-6 pb-16">
        <div className="surface p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep">Email</p>
          <p className="mt-3 text-lg text-text">
            <a href={`mailto:${siteConfig.email}`} className="underline hover:text-brand-deep">
              {siteConfig.email}
            </a>
          </p>
        </div>

        <p>
          This address is a placeholder contact route for the project and not a regulated advice channel. Do
          not send bank details, identity documents or urgent transaction information.
        </p>

        <p>
          If you want to go back to the main tool, head back to the{" "}
          <Link href="/#calculator" className="underline hover:text-brand-deep">
            homepage calculator
          </Link>
          {" "}or read the{" "}
          <Link href="/hidden-costs-buying-house" className="underline hover:text-brand-deep">
            hidden costs guide
          </Link>
          .
        </p>
      </section>
    </>
  );
}
