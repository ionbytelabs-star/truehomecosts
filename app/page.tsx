import Link from "next/link";

import { AdPlaceholder } from "@/components/AdPlaceholder";
import { AtAGlance } from "@/components/AtAGlance";
import { CalculatorForm } from "@/components/CalculatorForm";
import { ContentSection } from "@/components/ContentSection";
import { DataSources } from "@/components/DataSources";
import { Disclaimer } from "@/components/Disclaimer";
import { ExampleScenarios } from "@/components/ExampleScenarios";
import { FAQSection } from "@/components/FAQSection";
import { Hero } from "@/components/Hero";
import { RateTypeSplit } from "@/components/RateTypeSplit";
import { RelatedGuides } from "@/components/RelatedGuides";
import { ResponsiveTable } from "@/components/ResponsiveTable";
import { StructuredData } from "@/components/StructuredData";
import { TrustSignals } from "@/components/TrustSignals";
import { guideMap } from "@/content/guides";
import {
  homeAtGlance,
  homeKeywords,
  homePageFaqs,
  homepageGuideLinks,
  homepagePriceGuideLinks,
  homeScenarioInputs,
  homeSections
} from "@/content/home";
import { buildMetadata } from "@/lib/metadata";
import { calculateUpfrontCosts } from "@/lib/calculator";
import { faqPageSchema, webpageSchema } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: "True cost of buying a house UK calculator",
  description:
    "Estimate the true cost of buying a house in the UK with a fast calculator covering deposit, SDLT or regional property tax, legal fees, searches, surveys, mortgage fees and optional moving costs.",
  path: "/",
  keywords: [...homeKeywords]
});

const scenarios = homeScenarioInputs.map((scenario) => ({
  title: scenario.title,
  summary: scenario.summary,
  result: calculateUpfrontCosts(scenario.input)
}));

export default function HomePage() {
  return (
    <>
      <StructuredData
        data={webpageSchema({
          title: "True cost of buying a house UK calculator",
          description:
            "Estimate the true cost of buying a house in the UK with deposit, property tax and the hidden extras buyers often miss.",
          path: "/",
          keywords: [...homeKeywords]
        })}
      />
      <StructuredData data={faqPageSchema(homePageFaqs.map((faq) => ({ ...faq })))} />

      <Hero />

      <section className="shell pb-8">
        <div className="surface grid gap-5 p-5 sm:p-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="eyebrow">Direct answer</p>
            <h2 className="font-serif text-3xl text-text">What is the true cost of buying a house in the UK?</h2>
            <p className="max-w-prose text-text">
              The true cost of buying a house in the UK is your deposit plus the extra upfront costs around it.
              For many mainstream purchases, those extra buying costs run from a few thousand pounds to well
              over £10,000 before you even count the deposit, depending on the property price, location, buyer
              type, survey choice and moving plans.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-[#f8fbfa] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep">Why buyers use this site</p>
            <ul className="mt-4 grid gap-3 text-sm text-muted">
              <li>Clear split between official published rates and planning estimates</li>
              <li>UK English, GBP formatting and UK-specific tax treatment</li>
              <li>Calculator-first homepage with worked examples for common purchase prices</li>
              <li>Static, lightweight build with no login, database or CMS</li>
            </ul>
          </div>
        </div>
      </section>

      <CalculatorForm />

      <section className="shell pb-8">
        <AdPlaceholder label="Ad placeholder below calculator results" />
      </section>

      <section className="shell section-gap pt-0">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <TrustSignals updatedLabel="Updated for 2026" sourceKeys={["sdlt", "lbtt", "ltt", "hmlr"]} />
            <AtAGlance items={[...homeAtGlance]} />
            <RateTypeSplit
              officialItems={["SDLT, LBTT or LTT bands", "published HMLR fee bands where relevant"]}
              estimateItems={[
                "solicitor and conveyancing fees",
                "searches",
                "surveys",
                "mortgage costs",
                "moving costs",
                "insurance and furnishing allowances"
              ]}
            />
            <ExampleScenarios scenarios={scenarios} />

            {homeSections.map((section) => (
              <ContentSection key={section.title} title={section.title}>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets ? (
                  <ul className="grid gap-2 pl-5 text-text">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="list-disc">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {section.table ? <ResponsiveTable {...section.table} /> : null}
              </ContentSection>
            ))}

            <section className="space-y-4">
              <div className="space-y-2">
                <p className="eyebrow">Useful next reads</p>
                <h2 className="font-serif text-3xl text-text">Key guides that answer the next question</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/hidden-costs-buying-house" className="link-chip">
                  Hidden costs of buying a house UK
                </Link>
                <Link href="/how-much-money-needed-buy-house" className="link-chip">
                  How much money do I need?
                </Link>
                <Link href="/stamp-duty-explained" className="link-chip">
                  Stamp duty explained
                </Link>
                <Link href="/first-time-buyer-costs" className="link-chip">
                  First-time buyer costs
                </Link>
                <Link href="/mortgage-fees-costs" className="link-chip">
                  Mortgage fees UK
                </Link>
                <Link href="/moving-costs-uk" className="link-chip">
                  Moving costs UK
                </Link>
              </div>
            </section>

            <section className="space-y-4">
              <div className="space-y-2">
                <p className="eyebrow">Price-specific guides</p>
                <h2 className="font-serif text-3xl text-text">Start with the purchase price you are actually targeting</h2>
                <p className="max-w-prose text-muted">
                  These guides are written around common UK price points so buyers can compare deposits, tax
                  treatment and hidden costs without relying on generic averages.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {homepagePriceGuideLinks.map((slug) => (
                  <Link key={slug} href={`/${slug}`} className="link-chip">
                    {guideMap[slug]?.h1 ?? slug}
                  </Link>
                ))}
              </div>
            </section>

            <FAQSection items={homePageFaqs.map((faq) => ({ ...faq }))} />
            <RelatedGuides slugs={[...homepageGuideLinks]} />
            <DataSources sourceKeys={["sdlt", "lbtt", "lbttAds", "ltt", "hmlr"]} />
            <Disclaimer />
          </div>

          <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <div className="surface p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep">Quick note</p>
              <p className="mt-3 text-sm text-muted">
                This calculator is designed for residential purchases and general planning. Leasehold, new-build,
                cash purchases, unusual titles and complex chains can change the real number.
              </p>
            </div>
            <div className="surface p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep">Internal links</p>
              <div className="mt-4 grid gap-2 text-sm">
                <Link href="/mortgage-fees-costs" className="underline hover:text-brand-deep">
                  Mortgage fees and costs
                </Link>
                <Link href="/moving-costs-uk" className="underline hover:text-brand-deep">
                  Moving costs UK
                </Link>
                <Link href="/insurance-costs-uk" className="underline hover:text-brand-deep">
                  Insurance costs UK
                </Link>
                <Link href="/regional-property-costs-uk" className="underline hover:text-brand-deep">
                  Regional property costs UK
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
