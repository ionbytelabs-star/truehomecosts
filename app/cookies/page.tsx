import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageIntro } from "@/components/PageIntro";
import { StructuredData } from "@/components/StructuredData";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, webpageSchema } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: "Cookie Policy",
  description:
    "Cookie policy for TrueHomeCosts, explaining that this local-first static build does not currently load advertising or analytics cookies.",
  path: "/cookies"
});

export default function CookiesPage() {
  return (
    <>
      <StructuredData
        data={webpageSchema({
          title: "Cookie Policy",
          description: "Cookie policy for TrueHomeCosts.",
          path: "/cookies"
        })}
      />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Cookie Policy", path: "/cookies" }
        ])}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cookie policy" }]} />
      <PageIntro
        title="Cookie Policy"
        description="This page explains the limited cookie position for the current TrueHomeCosts build."
        summary="The current local-first static build does not include analytics scripts, ad scripts or a cookie banner because it does not currently place non-essential tracking cookies."
        badge="Current build"
      />

      <section className="shell max-w-prose space-y-6 pb-16">
        <section className="space-y-3">
          <h2 className="font-serif text-3xl text-text">Essential site behaviour</h2>
          <p>
            The calculator works in the browser without a login and without relying on advertising or analytics
            cookies. Any temporary browser behaviour is incidental to normal page use rather than a tracking
            system.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-3xl text-text">Ad placeholders</h2>
          <p>
            The site includes labelled ad placeholder areas only. No live advertising scripts, ad network tags
            or personalisation cookies are loaded in this build.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-3xl text-text">If cookies are added later</h2>
          <p>
            If analytics, advertising or other non-essential tools are added before deployment, the cookie
            policy and any consent mechanism should be updated to reflect that change clearly.
          </p>
        </section>

        <p className="text-sm text-muted">
          The current build remains a lightweight static site with a client-side calculator and no live ad or
          analytics scripts.
        </p>
      </section>
    </>
  );
}
