import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageIntro } from "@/components/PageIntro";
import { StructuredData } from "@/components/StructuredData";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, webpageSchema } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: "Cookie Policy",
  description:
    "Cookie policy for TrueHomeCosts, explaining essential browser behaviour, analytics and ad placeholder status.",
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
        summary="The current build uses a browser-based calculator and loads a basic analytics script. It does not include live advertising scripts or personalised ad network tags."
        badge="Current build"
      />

      <section className="shell max-w-prose space-y-6 pb-16">
        <section className="space-y-3">
          <h2 className="font-serif text-3xl text-text">Essential site behaviour</h2>
          <p>
            The calculator works in the browser without a login or account. Calculator inputs are used to show
            the result in the page rather than being submitted through a user account system.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-3xl text-text">Analytics and ad placeholders</h2>
          <p>
            The site currently loads a basic analytics script to understand broad site usage. It also includes
            labelled ad placeholder areas only. No live advertising scripts, ad network tags or personalised
            advertising cookies are loaded in this build.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-3xl text-text">If cookies are added later</h2>
          <p>
            If advertising or other non-essential tools are added before deployment, the cookie policy and any
            consent mechanism should be updated to reflect that change clearly.
          </p>
        </section>

        <p className="text-sm text-muted">
          The current build remains a lightweight static site with a client-side calculator and no live ad
          network scripts.
        </p>
      </section>
    </>
  );
}
