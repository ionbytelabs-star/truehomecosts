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
    status: "AdSense technology implemented",
    text: "Google AdSense code may load across the site, although advertisement display depends on Google's approval, account status and advertising availability. Relevant pages may also contain clearly disclosed affiliate links provided through the Awin network."
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
        summary="It should be read alongside our Privacy Policy. Last updated: 10 August 2026."
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
              The site loads the Google Analytics Google tag only after analytics consent is accepted. If
              optional cookies are rejected, the analytics script is not loaded by the site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-3xl text-text">Google AdSense and advertising cookies</h2>
            <p>
              True Home Costs uses Google AdSense advertising technology. The AdSense script may load on pages
              across the website, although the display of advertisements depends on Google's approval, account
              status and advertising availability.
            </p>
            <p>
              Where permitted, Google and its advertising partners may use cookies, local storage or similar
              technologies for advertising purposes, subject to your consent choices and applicable law.
            </p>
            <p>Advertising technologies may be used to:</p>
            <ul className="list-disc space-y-2 pl-5 text-text/95">
              <li>deliver advertisements;</li>
              <li>limit how often an advertisement is shown;</li>
              <li>measure advertisement performance;</li>
              <li>detect fraud and abuse;</li>
              <li>understand advertising interactions; and</li>
              <li>
                provide personalised or non-personalised advertising depending on your consent choices and
                applicable law.
              </li>
            </ul>
            <p>
              Advertising cookies are not treated as strictly necessary. The website includes both the Google
              AdSense account verification meta tag and the global AdSense script. Their technical presence is
              separate from whether an advertisement is displayed. AdSense is still being reviewed and
              configured, so advertisements may not be available until Google approves the site and the account
              is ready to serve them.
            </p>
            <p>
              For visitors in the UK, EEA and Switzerland, True Home Costs uses Google's European regulations
              consent message and certified consent-management functionality to request and manage advertising
              consent where required. That Google interface allows visitors to accept, reject or manage relevant
              advertising choices. It operates alongside the site's own cookie settings, which separately manage
              optional Google Analytics consent; neither interface replaces or overrides the other.
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
              Relevant pages may contain clearly labelled AnyVan or Safestore affiliate links supplied through
              the Awin affiliate network. If you click one of these links and later book, True Home Costs may
              earn a commission at no extra cost to you.
            </p>
            <p>
              Clicking an Awin affiliate link takes you directly through Awin to AnyVan or Safestore. Awin or
              the relevant advertiser may use cookies or similar technologies to record the referral and
              attribute a booking. The AnyVan programme has a 30-day tracking period. True Home Costs does not
              cloak these links or route them through an internal redirect.
            </p>
            <p>
              Affiliate click measurement in Google Analytics is separate and only occurs if you have accepted
              optional analytics cookies. You can review Awin's own information on its{" "}
              <a
                href="https://www.awin.com/gb/privacy"
                target="_blank"
                rel="nofollow noopener"
                className="font-medium underline hover:text-brand-deep"
              >
                privacy page
              </a>
              .
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
              Where Google's European regulations consent message is shown, you can use that interface to accept,
              reject or manage relevant advertising choices. The site's cookie settings manage optional analytics
              separately and do not replace Google's advertising-consent interface.
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
              service behaviour. Where permitted, Google AdSense and its advertising partners may also use
              cookies, local storage or similar technologies; exact storage can vary by consent choice, region and
              Google's service behaviour.
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
              <li>The global AdSense script is implemented; advertisement display depends on Google.</li>
              <li>AnyVan and Safestore affiliate links use Awin and are disclosed beside each promotion.</li>
            </ul>
          </div>
          <CalloutBox title="AdSense consent note">
            <p className="text-sm">
              Google's European regulations consent message and certified consent-management functionality are
              used for relevant advertising choices in the UK, EEA and Switzerland. This is separate from the
              site's optional analytics settings.
            </p>
          </CalloutBox>
        </aside>
      </section>
    </>
  );
}
