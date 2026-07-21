import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageIntro } from "@/components/PageIntro";
import { StructuredData } from "@/components/StructuredData";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, webpageSchema } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: "Privacy Policy | True Home Costs",
  description:
    "Learn how True Home Costs handles personal information, analytics, cookies and future advertising services.",
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <>
      <StructuredData
        data={webpageSchema({
          title: "Privacy Policy",
          description:
            "How True Home Costs handles personal information, analytics, cookies and future advertising services.",
          path: "/privacy"
        })}
      />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" }
        ])}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy policy" }]} />
      <PageIntro
        title="Privacy Policy"
        description="This privacy policy explains what True Home Costs currently does with data."
        summary="True Home Costs does not require an account, login or database. The calculator runs in the browser and does not need you to submit personal financial information to use it."
        badge="Plain-English policy"
      />

      <section className="shell max-w-prose space-y-6 pb-16">
        <section className="space-y-3">
          <h2 className="font-serif text-3xl text-text">What we collect</h2>
          <p>
            The site does not include a database, user accounts or a live contact form. Calculator inputs stay
            in your browser session while you use the page.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-3xl text-text">What we do not collect</h2>
          <p>
            We do not ask for your name, address, mortgage details or identity documents to use the calculator.
            We do not run a CRM, user login system or personalised account area.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-3xl text-text">Email contact</h2>
          <p>
            If you email the contact address shown on the site, your email provider and our inbox provider will
            process the message in the normal way so we can read and reply to it.
          </p>
          <p>
            The public contact address is{" "}
            <a href="mailto:hello@truehomecosts.co.uk" className="font-medium underline hover:text-brand-deep">
              hello@truehomecosts.co.uk
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-3xl text-text">Third-party services</h2>
          <p>
            The site can load Google Analytics to understand broad site usage, but this is controlled by the
            cookie consent choice shown to visitors. Relevant editorial pages may also link to AnyVan through
            the Awin affiliate network. Those links are labelled, and clicking one takes you to third-party
            websites governed by their own privacy policies. The site does not include a login, CRM, live chat
            tool or live advertising scripts.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-3xl text-text">Future advertising services</h2>
          <p>
            True Home Costs may use Google AdSense to display advertising. If advertising is enabled, Google
            and its advertising partners may use cookies, local storage or similar technologies to deliver and
            measure ads, prevent fraud and, where permission has been granted, personalise advertising.
          </p>
          <p>
            Advertising technologies are optional and are not strictly necessary for using the website.
            Personalised advertising will depend on your consent choices and settings. Non-personalised
            advertising may still use limited storage for purposes such as fraud prevention, frequency capping
            and measurement where permitted.
          </p>
          <p>
            You can manage optional cookie choices through the site's consent controls. The{" "}
            <Link href="/cookies" className="font-medium underline hover:text-brand-deep">
              Cookie Policy
            </Link>{" "}
            explains this in more detail.
          </p>
          <p>
            Google explains how it uses information from sites and apps that use its services on{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline hover:text-brand-deep"
            >
              Google's partner-sites information page
            </a>
            .
          </p>
        </section>

        <p className="text-sm text-muted">
          For general information about the site itself, visit the{" "}
          <Link href="/about" className="underline hover:text-brand-deep">
            about page
          </Link>
          .
        </p>
      </section>
    </>
  );
}
