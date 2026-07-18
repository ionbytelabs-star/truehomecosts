import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalloutBox } from "@/components/CalloutBox";
import { CookieSettingsButton } from "@/components/CookieConsent";
import { PageIntro } from "@/components/PageIntro";
import { ResponsiveTable } from "@/components/ResponsiveTable";
import { StructuredData } from "@/components/StructuredData";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { breadcrumbSchema, webpageSchema } from "@/lib/structured-data";

const contactEmail = siteConfig.email;
const cookieDescription =
  "Learn how True Home Costs uses essential, analytics and advertising technologies, including how to manage your cookie choices.";
const cookieStorageRows = [
  [
    "truehomecosts_cookie_consent",
    "True Home Costs",
    "Strictly necessary local storage",
    "Stores whether analytics cookies have been accepted or rejected in this browser.",
    "Until you change your choice or clear browser storage."
  ]
] as const;
const cookieCategories = [
  {
    title: "Strictly necessary",
    status: "Currently used",
    text: "Used to keep the site working and to remember your cookie choice in this browser."
  },
  {
    title: "Analytics and performance",
    status: "Optional",
    text: "Google Analytics is available but is only loaded after you accept optional analytics cookies."
  },
  {
    title: "Advertising",
    status: "Preparing for AdSense",
    text: "The site has an AdSense ownership-verification meta tag, but live AdSense ad scripts are not loaded."
  },
  {
    title: "Preferences or functionality",
    status: "Limited current use",
    text: "No separate preference cookies were found beyond storing your cookie consent choice."
  }
] as const;

export const metadata = buildMetadata({
  title: "Cookie Policy | True Home Costs",
  description: cookieDescription,
  path: "/cookies"
});

export default function CookiesPage() {
  return (
    <>
      <StructuredData
        data={webpageSchema({
          title: "Cookie Policy",
          description: cookieDescription,
          path: "/cookies"
        })}
      />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Cookie Policy", path: "/cookies" }
        ])}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cookie Policy" }]} />
      <PageIntro
        title="Cookie Policy"
        description="This Cookie Policy explains how True Home Costs uses cookies and similar technologies when you visit truehomecosts.co.uk."
        summary="It should be read alongside our Privacy Policy. Last updated: 18 July 2026."
        badge="Cookies and consent"
      />

      <section className="shell grid gap-10 pb-16 lg:grid-cols-[1fr_320px]">
        <article className="min-w-0 max-w-prose space-y-8">
          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">What are cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. Similar
              technologies can include local storage, pixels, tags or scripts that help a website remember a
              choice, measure usage or provide a service.
            </p>
            <p>
              Some technologies are necessary for a website to function. Others may be used for analytics,
              preferences or advertising, where allowed and where the visitor has been given the appropriate
              choices.
            </p>
            <p>
              This page explains the current True Home Costs implementation. It is general information, not
              formal legal advice.
            </p>
            <p>
              You can also read our{" "}
              <Link href="/privacy" className="font-medium underline hover:text-brand-deep">
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">How we use cookies</h2>
            <p>True Home Costs may use cookies and similar technologies in these categories:</p>
            <div className="grid gap-3">
              {cookieCategories.map((category) => (
                <div key={category.title} className="surface p-5">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="font-semibold text-text">{category.title}</h3>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep">
                      {category.status}
                    </p>
                  </div>
                  <p className="mt-2 text-muted">{category.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">Strictly necessary cookies</h2>
            <p>
              Strictly necessary technologies support essential site functions, security and the storage of
              consent choices. They cannot normally be disabled through the site's consent controls because the
              website may not work correctly without them.
            </p>
            <p>
              The website currently uses local storage to remember your cookie choices. It does not currently
              set any additional first-party essential cookies that we have identified.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">Analytics and performance</h2>
            <p>
              True Home Costs uses Google Analytics 4 to understand broad site usage only after a visitor
              accepts optional analytics cookies in the cookie banner or settings panel.
            </p>
            <p>
              Google Analytics may collect information such as pages visited, approximate location, device and
              browser information, referral source, and interaction or usage information. We do not describe
              this data as completely anonymous.
            </p>
            <p>
              The code loads Google Analytics through Google Tag Manager only after analytics consent is stored
              as accepted. If optional cookies are rejected, the analytics script is not loaded by the site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">Google AdSense and advertising cookies</h2>
            <p>
              True Home Costs is preparing to use Google AdSense. Google and its advertising partners may use
              cookies, local storage or similar technologies to deliver, measure and personalise advertising,
              subject to your consent choices and applicable law.
            </p>
            <p>Advertising technologies may be used to:</p>
            <ul className="list-disc space-y-2 pl-5 text-text/95">
              <li>deliver advertisements;</li>
              <li>limit how often an advertisement is shown;</li>
              <li>measure advertisement performance;</li>
              <li>detect fraud and abuse;</li>
              <li>personalise advertisements where permission has been granted.</li>
            </ul>
            <p>
              Advertising cookies are not treated as strictly necessary. The website currently includes the
              Google AdSense account verification meta tag, but site verification is not the same as live
              advertising. The site does not currently load live AdSense ad scripts or display live
              advertisements.
            </p>
            <p>
              Visitors in the UK, EEA and Switzerland must be shown consent controls through a suitable
              Google-certified Consent Management Platform before relevant advertising technologies are used.
              The current first-party cookie banner is not a Google-certified CMP.
            </p>
            <p>
              Google explains how it uses information from sites and apps that use its services at{" "}
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

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">Affiliate links</h2>
            <p>
              True Home Costs does not currently use active affiliate tracking. Some pages may contain affiliate
              links in the future. An affiliate provider may use cookies or similar technologies to record
              referrals and attribute a purchase or enquiry to True Home Costs.
            </p>
            <p>
              Any such tracking should be disclosed and handled in accordance with the applicable consent
              requirements before it is enabled.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">Your cookie choices</h2>
            <p>
              You can accept optional analytics cookies, reject optional analytics cookies, or open cookie
              settings to review the current categories. Rejecting optional cookies is available from the same
              banner as accepting them.
            </p>
            <p>
              You can also change your browser settings to block or delete cookies and storage. Blocking
              strictly necessary storage may affect site functionality, including the ability to remember your
              cookie choice.
            </p>
            <CookieSettingsButton />
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">Withdrawing or changing consent</h2>
            <p>
              You should be able to change your optional-cookie choices as easily as you made them. Use the
              Manage cookie preferences button above to reopen the cookie settings interface without clearing
              browser data manually.
            </p>
            <p>
              If you reject optional cookies after previously accepting them, the site will stop loading Google
              Analytics on future page views and will try to clear common Google Analytics cookies for this
              domain.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">Cookies used by this website</h2>
            <p>
              The table lists verified storage used by the website. Google Analytics may set its own cookies
              after analytics consent is accepted, but exact names and durations can vary depending on Google's
              service behaviour.
            </p>
            <ResponsiveTable
              caption="Verified cookies and storage"
              columns={["Name", "Provider", "Category", "Purpose", "Duration"]}
              rows={cookieStorageRows}
            />
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">Third-party websites</h2>
            <p>
              Some pages link to third-party websites. Those websites are governed by their own privacy and
              cookie policies, not this Cookie Policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">Changes to this policy</h2>
            <p>
              We may update this Cookie Policy when site technologies, legal requirements or website
              functionality change.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">Contact us</h2>
            <p>
              If you have a question about this Cookie Policy, contact{" "}
              <a href={`mailto:${contactEmail}`} className="font-medium underline hover:text-brand-deep">
                {contactEmail}
              </a>
              .
            </p>
            <p>
              You can also visit the{" "}
              <Link href="/contact" className="font-medium underline hover:text-brand-deep">
                Contact page
              </Link>
              .
            </p>
          </section>
        </article>

        <aside className="space-y-4">
          <div className="surface p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep">Current status</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Analytics is optional and consent-controlled.</li>
              <li>AdSense verification meta tag is present.</li>
              <li>Live AdSense scripts are not loaded.</li>
              <li>No active affiliate tracking is used.</li>
            </ul>
          </div>
          <CalloutBox title="AdSense consent note">
            <p className="text-sm">
              A Google-certified CMP still needs to be configured before AdSense advertising is enabled for
              visitors in the UK, EEA and Switzerland.
            </p>
          </CalloutBox>
        </aside>
      </section>
    </>
  );
}
