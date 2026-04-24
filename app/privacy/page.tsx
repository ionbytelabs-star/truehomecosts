import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageIntro } from "@/components/PageIntro";
import { StructuredData } from "@/components/StructuredData";
import { buildMetadata } from "@/lib/metadata";
import { webpageSchema } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for TrueHomeCosts, including what local calculator data is and is not collected on this static site.",
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <>
      <StructuredData
        data={webpageSchema({
          title: "Privacy Policy",
          description: "Privacy policy for the TrueHomeCosts static site and calculator.",
          path: "/privacy"
        })}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy policy" }]} />
      <PageIntro
        title="Privacy Policy"
        description="This privacy policy explains what TrueHomeCosts currently does with data in this local-first static site build."
        summary="TrueHomeCosts does not require an account, login or database. The calculator runs in the browser and does not need you to submit personal financial information to use it."
        badge="Plain-English policy"
      />

      <section className="shell max-w-prose space-y-6 pb-16">
        <section className="space-y-3">
          <h2 className="font-serif text-3xl text-text">What we collect</h2>
          <p>
            In this static build, the site does not include a database, user accounts or a live contact form.
            Calculator inputs stay in your browser session while you use the page.
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
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-3xl text-text">Third-party services</h2>
          <p>
            This build does not include analytics, ad scripts, live chat tools or embedded tracking pixels. If
            those are added later, this policy should be updated before deployment.
          </p>
        </section>
      </section>
    </>
  );
}
