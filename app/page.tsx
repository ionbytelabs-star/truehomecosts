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
  homeCostSummaryTable,
  homeKeywords,
  homePageFaqs,
  homepageGuideLinks,
  homepagePriceGuideLinks,
  homeScenarioInputs,
  homeSections
} from "@/content/home";
import { buildMetadata } from "@/lib/metadata";
import { calculateUpfrontCosts } from "@/lib/calculator";
import { defaultCalculatorInput } from "@/lib/default-calculator-input";
import { formatCurrency } from "@/lib/format";
import { priceGuideLinks } from "@/lib/price-guide-links";
import { calculatorApplicationSchema, faqPageSchema, webpageSchema } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: "True Cost of Buying a House UK Calculator | Full Cost Breakdown 2026",
  description:
    "Use this UK house buying cost calculator to estimate your deposit, stamp duty or regional property tax, solicitor fees, surveys, mortgage costs, moving costs and total upfront cash needed.",
  path: "/",
  keywords: [...homeKeywords]
});

const scenarios = homeScenarioInputs.map((scenario) => ({
  title: scenario.title,
  summary: scenario.summary,
  result: calculateUpfrontCosts(scenario.input)
}));

const defaultHomepageResult = calculateUpfrontCosts(defaultCalculatorInput);

const homepageBreakdownTypeLabels: Record<string, string> = {
  deposit: "Buyer cash contribution",
  "property-tax": "Official charge",
  solicitors: "Solicitor / conveyancing estimate",
  searches: "Solicitor / conveyancing estimate",
  survey: "Market estimate",
  "mortgage-fees": "Lender charge",
  "land-registry": "Official charge",
  "telegraphic-transfer": "Solicitor / conveyancing estimate",
  moving: "Optional cost",
  insurance: "Optional cost",
  furnishing: "Optional cost",
  contingency: "Situation-dependent cost"
};

export default function HomePage() {
  return (
    <>
      <StructuredData
        data={webpageSchema({
          title: "True Cost of Buying a House UK Calculator",
          description:
            "Estimate the total upfront cost of buying a house in the UK with deposit, property tax, legal fees, survey costs, mortgage fees, moving costs and a cash buffer.",
          path: "/",
          keywords: [...homeKeywords]
        })}
      />
      <StructuredData data={calculatorApplicationSchema()} />
      <StructuredData data={faqPageSchema(homePageFaqs.map((faq) => ({ ...faq })))} />

      <Hero />

      <section className="shell pb-8">
        <div className="surface grid gap-5 p-5 sm:p-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="eyebrow">Planning the full budget</p>
            <h2 className="font-serif text-3xl text-text">What this calculator helps you include</h2>
            <p className="max-w-prose text-text">
              A deposit-only savings target can look comfortable until legal, tax, lender and moving costs are
              added. This page brings those buying costs into one view so you can plan the cash needed before
              completion more calmly.
            </p>
            <p className="max-w-prose text-text">
              The calculator separates official charges, such as stamp duty bands and registration fees, from
              estimate-led items such as conveyancing disbursements, surveys, removals and a mortgage arrangement
              fee where relevant.
            </p>
            <p className="max-w-prose text-text">
              You can use the result as an early planning baseline, then refine it when real quotes arrive from
              your solicitor, lender, surveyor or removal firm.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-[#f8fbfa] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep">Why buyers use this site</p>
            <ul className="mt-4 grid gap-3 text-sm text-muted">
              <li>Clear split between official published rates and planning estimates</li>
              <li>UK English, GBP formatting and UK-specific tax treatment</li>
              <li>Calculator-first homepage with worked examples for common purchase prices</li>
              <li>No signup needed and no sales-led wording</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="shell pb-8">
        <ResponsiveTable {...homeCostSummaryTable} />
      </section>

      <section className="shell pb-8">
        <div className="surface p-5 sm:p-6">
          <div className="max-w-3xl space-y-3">
            <p className="eyebrow">Before you calculate</p>
            <h2 className="font-serif text-3xl text-text">Who this UK house buying cost calculator is for</h2>
            <p className="text-muted">
              This calculator estimates the total upfront cash needed to buy a house in the UK. Adjust the
              property price, deposit, buyer type and location to see how the overall cost changes.
            </p>
          </div>
          <ul className="mt-5 grid gap-3 text-sm text-text sm:grid-cols-2">
            <li className="rounded-2xl border border-line bg-white px-4 py-3">
              First-time buyers planning deposit and upfront costs
            </li>
            <li className="rounded-2xl border border-line bg-white px-4 py-3">
              Home movers budgeting for their next purchase
            </li>
            <li className="rounded-2xl border border-line bg-white px-4 py-3">
              Buyers comparing costs across England, Scotland, Wales and Northern Ireland
            </li>
            <li className="rounded-2xl border border-line bg-white px-4 py-3">
              Anyone trying to understand the full cost of buying a property in the UK
            </li>
          </ul>
        </div>
      </section>

      <CalculatorForm />

      <section className="shell pb-8">
        <div className="surface p-5">
          <div className="space-y-2">
            <p className="eyebrow">Example breakdown</p>
            <h2 className="font-serif text-3xl text-text">
              How a typical £300,000 first-time buyer example breaks down
            </h2>
            <p className="max-w-prose text-muted">
              The table below shows the default calculator setup for a £300,000 first-time buyer purchase in
              England and Northern Ireland with a 10% deposit. It separates official charges from estimate-led
              costs so you can see how the main buying costs are usually grouped before running your own figures.
            </p>
          </div>
          <div className="mt-5">
            <ResponsiveTable
              summary="The table below shows an example cost breakdown for a £300,000 first-time buyer, with one row per cost item and clear headers for type, amount and reason."
              caption="Example cost breakdown for a £300,000 first-time buyer"
              columns={["Cost item", "Type", "Amount", "Why it applies"]}
              rows={defaultHomepageResult.breakdown.map((item) => [
                item.label,
                homepageBreakdownTypeLabels[item.key] ??
                  (item.sourceType === "official" ? "Official charge" : "Estimate"),
                formatCurrency(item.value),
                item.detail
              ])}
            />
          </div>
        </div>
      </section>

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
            <p className="rounded-3xl border border-line bg-white px-5 py-4 text-sm text-muted">
              These figures are designed to give a realistic planning estimate based on typical UK buying costs,
              not a guaranteed quote.
            </p>

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

            <section className="space-y-5">
              <article className="surface p-5">
                <h2 className="font-serif text-3xl text-text">
                  How much money do you really need to buy a house in the UK?
                </h2>
                <p className="mt-3 text-text">
                  You usually need your deposit, property tax if it applies, legal fees, survey costs, lender
                  charges, moving costs and a buffer for the first few weeks of ownership. The exact figure depends
                  on the purchase price, buyer type, UK nation and whether the property is freehold, leasehold,
                  older, new-build or complex.
                </p>
                <p className="mt-3 text-text">
                  For a stage-by-stage view, read the guide to{" "}
                  <Link href="/how-much-money-needed-buy-house" className="underline hover:text-brand-deep">
                    how much money you need to buy a house
                  </Link>
                  .
                </p>
              </article>

              <article className="surface p-5">
                <h2 className="font-serif text-3xl text-text">
                  What are the hidden costs of buying a house in the UK?
                </h2>
                <p className="mt-3 text-text">
                  Hidden costs are usually the smaller lines that appear after buyers have focused on the deposit
                  and stamp duty. They can include searches, conveyancing disbursements, bank transfer fees,
                  survey upgrades, mortgage fees, indemnity policies, lock changes and moving-day setup costs.
                </p>
                <p className="mt-3 text-text">
                  If you want a fuller checklist, see the guide to{" "}
                  <Link href="/hidden-costs-buying-house" className="underline hover:text-brand-deep">
                    hidden costs of buying a house
                  </Link>{" "}
                  and the breakdown of{" "}
                  <Link href="/mortgage-fees-costs" className="underline hover:text-brand-deep">
                    mortgage fees and costs
                  </Link>
                  .
                </p>
              </article>

              <article className="surface p-5">
                <h2 className="font-serif text-3xl text-text">
                  Why can the total upfront cost be higher than expected?
                </h2>
                <p className="mt-3 text-text">
                  The total can rise because several costs are not known with confidence at the start. A survey may
                  lead to extra checks, the buyer may need a different mortgage product, removals can cost more than
                  expected, and first-time buyer relief or higher-rate tax treatment may change the property tax line.
                </p>
                <p className="mt-3 text-text">
                  To understand the tax side, use the guide to{" "}
                  <Link href="/stamp-duty-explained" className="underline hover:text-brand-deep">
                    stamp duty explained
                  </Link>
                  . For practical move-in costs, compare typical{" "}
                  <Link href="/moving-costs-uk" className="underline hover:text-brand-deep">
                    moving costs in the UK
                  </Link>
                  .
                </p>
              </article>
            </section>

            <section className="space-y-4">
              <div className="space-y-2">
                <p className="eyebrow">Useful next reads</p>
                <h2 className="font-serif text-3xl text-text">Key guides that answer the next question</h2>
                <p className="max-w-prose text-muted">
                  Use these guides to go deeper into the house buying costs that sit behind the calculator result.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/hidden-costs-buying-house" className="link-chip">
                  Hidden costs of buying a house
                </Link>
                <Link href="/how-much-money-needed-buy-house" className="link-chip">
                  How much money you need to buy a house
                </Link>
                <Link href="/stamp-duty-explained" className="link-chip">
                  Stamp duty explained
                </Link>
                <Link href="/first-time-buyer-costs" className="link-chip">
                  First-time buyer costs
                </Link>
                <Link href="/mortgage-fees-costs" className="link-chip">
                  Mortgage fees and costs
                </Link>
                <Link href="/moving-costs-uk" className="link-chip">
                  Moving costs in the UK
                </Link>
                <Link href="/insurance-costs-uk" className="link-chip">
                  Insurance costs for home buyers
                </Link>
                <Link href="/leasehold-costs-uk" className="link-chip">
                  Leasehold costs in the UK
                </Link>
                <Link href="/cost-of-owning-home-uk" className="link-chip">
                  Cost of owning a home in the UK
                </Link>
              </div>
            </section>

            <section className="space-y-4">
              <div className="space-y-2">
                <p className="eyebrow">Price-specific guides</p>
                <h2 className="font-serif text-3xl text-text">Explore buying costs by property price</h2>
                <p className="max-w-prose text-muted">
                  Compare estimated deposit, fees and upfront cash needed at common UK property prices.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {priceGuideLinks.map((link) => (
                  <Link key={link.slug} href={`/${link.slug}`} className="link-chip">
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>

            <FAQSection items={homePageFaqs.map((faq) => ({ ...faq }))} />
            <RelatedGuides slugs={[...homepageGuideLinks]} />
            <DataSources sourceKeys={["sdlt", "lbtt", "lbttAds", "ltt", "hmlr"]} />
            <section className="rounded-3xl border border-warning/20 bg-[#fff4eb] p-5 text-sm text-text">
              <p className="font-semibold uppercase tracking-[0.16em] text-warning">Last updated: 2026</p>
              <p className="mt-2">
                Figures are planning estimates unless marked as official-rate items. Tax bands, registration
                fees and market prices can change, and the site is informational only. It is not financial,
                mortgage, legal or tax advice, so buyers should verify important figures with the relevant
                professional or official source before making decisions.
              </p>
            </section>
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
                  Moving costs in the UK
                </Link>
                <Link href="/insurance-costs-uk" className="underline hover:text-brand-deep">
                  Insurance costs for home buyers
                </Link>
                <Link href="/regional-property-costs-uk" className="underline hover:text-brand-deep">
                  Regional property costs in the UK
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
