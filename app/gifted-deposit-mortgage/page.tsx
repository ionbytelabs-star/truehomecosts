import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { GiftedDepositLetter } from "@/components/GiftedDepositLetter";
import { ResponsiveTable } from "@/components/ResponsiveTable";
import { StructuredData } from "@/components/StructuredData";
import { buildMetadata } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema, faqPageSchema, webpageSchema } from "@/lib/structured-data";

const path = "/gifted-deposit-mortgage";
const title = "Gifted Deposit Mortgage UK: Rules, Letter and Rejection Risks";
const description =
  "Learn how gifted deposit mortgages work, who can gift a deposit, evidence lenders require, tax rules, rejection risks and how to write a gifted deposit letter.";

export const metadata: Metadata = {
  ...buildMetadata({
    title,
    description,
    path,
    keywords: [
      "gifted deposit mortgage",
      "gifted deposit letter",
      "gifted deposit rules",
      "gifted deposit mortgage rejection",
      "gifted deposit from parents",
      "gifted deposit documents"
    ]
  }),
  title: { absolute: title }
};

const contents = [
  ["what-is-a-gifted-deposit-mortgage", "What a gifted deposit is"],
  ["how-a-gifted-deposit-works", "How the process works"],
  ["who-can-gift-a-house-deposit", "Who can give the money"],
  ["which-lenders-accept-gifted-deposits", "How lender policies differ"],
  ["can-the-whole-deposit-be-gifted", "Gifting the whole deposit"],
  ["gifted-deposit-documents", "Documents and bank statements"],
  ["gifted-deposit-letter", "What the letter should include"],
  ["gifted-deposit-letter-template", "Copyable letter template"],
  ["gifted-deposit-rejection", "Rejection and delay risks"],
  ["gifted-deposit-from-abroad", "Gifts from abroad"],
  ["tax-on-a-gifted-deposit", "Tax and the seven-year rule"],
  ["gifted-money-for-buying-fees", "Stamp duty and buying fees"],
  ["gifted-deposit-examples", "Worked examples"],
  ["buyer-checklist", "Buyer checklist"],
  ["donor-checklist", "Donor checklist"],
  ["frequently-asked-questions", "Frequently asked questions"],
  ["sources-and-methodology", "Sources and methodology"]
] as const;

const faqs = [
  {
    question: "Can my parents gift me a house deposit?",
    answer:
      "Usually, yes. A gifted deposit from parents is accepted by many UK lenders, provided the contribution is declared and supported by the requested letter, identity checks and bank evidence. The lender will normally want to know whether it is non-repayable and whether your parents expect any interest in the property."
  },
  {
    question: "Can grandparents gift a mortgage deposit?",
    answer:
      "Grandparents are within the accepted family definitions of many lenders, although the required evidence still varies. A gifted deposit from grandparents may require their signed declaration, proof of identity, proof of address and statements tracing the money. Tell the lender and conveyancer before moving it."
  },
  {
    question: "Can a friend gift me a house deposit?",
    answer:
      "Possibly, but not with every lender. Santander and NatWest publish routes that may accept gifts from friends, while Halifax publishes a narrower family list. A gifted deposit from a friend should therefore be checked against the intended mortgage lender's current criteria before an application is submitted."
  },
  {
    question: "Can more than one person contribute?",
    answer:
      "Some lenders accept multiple donors. Each contribution should be disclosed separately, and each donor may need to complete identity, source-of-funds and declaration checks. Keep a clear record of who provided each amount and avoid combining unexplained cash before the conveyancer has advised on the transfer route."
  },
  {
    question: "Can the whole deposit be gifted?",
    answer:
      "Some lenders allow the whole deposit gifted by acceptable donors, including NatWest's published position that family can provide all or some of it. Product, residency, property and donor restrictions can still apply. The buyer must independently pass affordability, credit scoring and all other underwriting checks."
  },
  {
    question: "Can a gifted deposit be repayable?",
    answer:
      "A standard gift is normally non-repayable, but criteria are not universal. NatWest says its declaration may record a family contribution as repayable or non-repayable; a repayment is then considered in affordability. Never call a deposit loan a gift. Disclose the real terms and obtain lender approval."
  },
  {
    question: "Can a gifted deposit mortgage be rejected?",
    answer:
      "Yes. A gifted deposit mortgage can be declined where the donor is unacceptable, evidence is incomplete, funds cannot be traced or the stated gift is actually a loan or ownership arrangement. The applicant may also fail ordinary affordability, credit or property checks that have nothing to do with the gift."
  },
  {
    question: "Do I pay tax on a gifted deposit?",
    answer:
      "Receiving a cash gift does not normally create an immediate income-tax charge for the buyer. However, inheritance tax may become relevant if the donor dies within seven years, depending on exemptions, earlier gifts and the estate. The £3,000 annual exemption is not a limit on how much can be given."
  },
  {
    question: "When should the money be transferred?",
    answer:
      "Ask the conveyancer and lender before transferring it. They may prefer to review evidence while the funds remain in the donor's account, or require the money in the buyer's or conveyancer's account by a set stage. A late, unexplained transfer can create extra checks close to exchange."
  },
  {
    question: "Can the donor live in the property?",
    answer:
      "Often not under standard gifted deposit rules, especially if the donor is not named on the mortgage. Occupation may create rights that concern the lender. Some arrangements need consent forms or a different mortgage structure, so disclose the intended occupiers at the outset rather than relying on a generic letter."
  },
  {
    question: "Is inherited money treated as a gifted deposit?",
    answer:
      "Money inherited directly by the buyer is usually described as inheritance rather than a gift, but proof of funds is still required. A grant of probate, estate account, solicitor's letter, will or bank trail may be requested. If one beneficiary passes inherited money to another, that later transfer may be a gift."
  },
  {
    question: "Does a gifted deposit affect mortgage affordability?",
    answer:
      "A genuine non-repayable gift normally has no monthly repayment, while a declared loan may be included as a commitment. A larger deposit can reduce the mortgage and loan-to-value, but the lender still tests income, spending, credit commitments and stress affordability under its own rules."
  },
  {
    question: "Can gifted money cover stamp duty and legal fees?",
    answer:
      "It can sometimes cover stamp duty, conveyancing, surveys or other buying costs as well as the deposit. The full gift and intended allocation should be declared because the lender needs to understand how the deposit and remaining purchase costs are funded. Keep enough separate cash for changing quotes and contingencies."
  },
  {
    question: "Do I declare a gift already held for several months?",
    answer:
      "Yes. Time in your account does not change where the money originally came from. Santander expressly says transferred gifted money still needs to be disclosed. The lender or conveyancer may ask for older statements to connect the credit to the donor, so retain the original transfer record and declaration."
  }
];

function Section({ id, title: sectionTitle, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8 space-y-4">
      <h2 className="font-serif text-3xl text-text sm:text-4xl">{sectionTitle}</h2>
      <div className="space-y-4 text-text/95">{children}</div>
    </section>
  );
}

const lenderRows = [
  [
    "Santander",
    "Generally accepts family and friends",
    "Usually non-repayable; donor should not own an interest or occupy the property",
    "Confirm the exact residential product criteria"
  ],
  [
    "NatWest",
    "May accept family, friends and other third parties",
    "Family can provide all or some; a declared repayable family contribution may be assessed in affordability",
    "A gifted deposit letter is required"
  ],
  [
    "Halifax",
    "Publishes a defined, narrower family list",
    "Standard gift must be non-repayable and give the donor no interest",
    "Letter and UK bank evidence may be requested"
  ]
];

const rejectionRows = [
  ["Gift not disclosed", "Application and legal records are incomplete", "Tell the lender, broker and conveyancer immediately"],
  ["Disguised loan or repayment expected", "Changes debt and affordability", "Record the true terms and use a lender that accepts them"],
  ["Ownership or occupancy expected", "May conflict with the lender's security", "Disclose rights and occupiers before applying"],
  ["Donor relationship not accepted", "The lender's donor policy is not met", "Check the named relationship against current criteria"],
  ["Incomplete declaration", "Key confirmations are missing or inconsistent", "Use the lender's form and answer every field"],
  ["Unexplained cash or large credits", "The source cannot be verified", "Provide statements and documentary evidence for each credit"],
  ["Missing statements or ID", "Identity and anti-money-laundering checks cannot finish", "Prepare valid ID, address evidence and requested statements"],
  ["Untraceable transfer", "The banking trail breaks", "Use regulated accounts in the donor and buyer's names"],
  ["Overseas funds", "Extra jurisdiction and document checks are needed", "Disclose early; arrange certified translations if requested"],
  ["Late disclosure", "Underwriting or conveyancing must be reopened", "Declare the gift before money moves"],
  ["Conflicting information", "Letter, application and statements do not agree", "Reconcile names, amounts, terms and dates"],
  ["Lender or deposit amount changes", "The new policy or funding mix may differ", "Reconfirm acceptance and update every document"],
  ["Donor identity cannot be proved", "Mandatory verification cannot be completed", "Ask the conveyancer what alternative evidence is acceptable"]
];

export default function GiftedDepositMortgagePage() {
  return (
    <>
      <StructuredData data={webpageSchema({ title, description, path, keywords: ["gifted deposit mortgage", "gifted deposit letter", "gifted deposit rules"] })} />
      <StructuredData
        data={articleSchema({
          headline: "Gifted Deposit Mortgages: Rules, Evidence and Rejection Risks",
          description,
          path,
          keywords: ["gifted deposit mortgage", "gifted deposit letter", "gifted deposit mortgage rejection"],
          datePublished: "2026-07-19",
          dateModified: "2026-07-19"
        })}
      />
      <StructuredData data={faqPageSchema(faqs)} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "First-time buyers", path: "/first-time-buyer-costs" },
          { name: "Gifted Deposit Mortgages", path }
        ])}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "First-time buyers", href: "/first-time-buyer-costs" },
          { label: "Gifted Deposit Mortgages" }
        ]}
      />

      <header className="section-gap pb-8 pt-8">
        <div className="shell">
          <div className="max-w-4xl space-y-5">
            <p className="eyebrow">Published 19 July 2026 · Reviewed 19 July 2026</p>
            <h1 className="font-serif text-4xl leading-tight text-text sm:text-5xl lg:text-6xl">
              Gifted Deposit Mortgages: Rules, Evidence and Rejection Risks
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted">
              A gifted deposit mortgage can help a buyer reach the required deposit, but the money must be declared and evidenced. This guide explains donor rules, letters, bank checks, tax, timing and the problems that cause avoidable delay. Lender criteria differ, so confirm them before transferring money.
            </p>
          </div>

          <div className="mt-7 max-w-4xl rounded-3xl border border-brand/20 bg-panel-strong p-5 shadow-card sm:p-6">
            <p className="eyebrow">Direct answer</p>
            <h2 className="mt-4 font-serif text-2xl text-text sm:text-3xl">What is a gifted deposit mortgage?</h2>
            <p className="mt-3 max-w-3xl text-text">
              A gifted deposit mortgage is a standard mortgage where some or all of the buyer's deposit has been given by another person. The money will usually need to be a genuine non-repayable gift, and the donor will normally receive no ownership or legal interest in the property. The gift must be disclosed to the mortgage lender and conveyancer, who may request identification, bank statements and evidence showing where the money came from.
            </p>
            <Link
              href="/#calculator"
              className="mt-5 inline-flex rounded-full bg-brand px-5 py-3 font-semibold text-white transition hover:bg-brand-deep"
            >
              Calculate all your home-buying costs
            </Link>
          </div>
        </div>
      </header>

      <section className="shell pb-10" aria-labelledby="contents-heading">
        <div className="surface p-5 sm:p-6">
          <h2 id="contents-heading" className="font-serif text-2xl text-text">Contents</h2>
          <nav aria-label="Article contents" className="mt-4 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {contents.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="rounded-lg py-1 font-medium text-brand-deep underline decoration-line underline-offset-4 hover:text-brand">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="shell pb-14">
        <article className="mx-auto max-w-4xl space-y-12">
          <Section id="what-is-a-gifted-deposit-mortgage" title="What is a gifted deposit mortgage?">
            <p>
              An ordinary deposit is usually built from the buyer's salary and savings. A gifted house deposit comes from somebody else: often parents or grandparents, but sometimes another relative, friend or third party if the chosen lender allows it. The mortgage itself is generally an ordinary residential loan; the different part is how the buyer's cash contribution is funded.
            </p>
            <p>
              The central rule for a gifted deposit mortgage is accurate disclosure. A standard gifted mortgage deposit is usually documented as a non-repayable gift that gives the donor no legal or beneficial share in the home. If the donor expects monthly repayments, repayment after a sale or a protected share of the equity, that is a deposit loan or ownership arrangement, not a simple gift. It may still be possible with a suitable lender and legal structure, but it must be described accurately.
            </p>
          </Section>

          <Section id="how-a-gifted-deposit-works" title="How does a gifted deposit mortgage work?">
            <ol className="grid gap-3 pl-5">
              <li className="list-decimal pl-2">Tell the broker or mortgage lender how much of the deposit is gifted and identify every donor.</li>
              <li className="list-decimal pl-2">Ask whether the lender has its own gifted deposit declaration and acceptable-donor rules.</li>
              <li className="list-decimal pl-2">The donor completes the declaration and supplies any requested identity and banking evidence.</li>
              <li className="list-decimal pl-2">The conveyancer checks identity, source of funds and, where relevant, source of wealth.</li>
              <li className="list-decimal pl-2">The money moves through a traceable regulated banking route at the time the conveyancer specifies.</li>
              <li className="list-decimal pl-2">The lender and conveyancer finish their checks before exchange or completion.</li>
            </ol>
            <p>
              The sequence is simple when information is consistent, but timings vary. Disclosure after the mortgage offer or just before exchange can force both underwriting and legal checks to be reopened. Plan the deposit alongside <Link href="/how-much-money-needed-buy-house" className="underline hover:text-brand-deep">how much cash you need to buy a house</Link>, not as an isolated transfer.
            </p>
          </Section>

          <Section id="who-can-gift-a-house-deposit" title="Who can gift a house deposit?">
            <p>
              Parents, stepparents and grandparents are widely accepted, so a first-time buyer gifted deposit commonly comes from close family. Many lenders also consider siblings, adult children, aunts, uncles and relatives by marriage. A gifted deposit from grandparents or several family members normally requires a separate paper trail for each donor.
            </p>
            <p>
              Friends, employers, overseas relatives and more distant relatives are policy-sensitive. Santander generally permits family and friends; NatWest refers to family, friends and other third parties; Halifax excludes friends, employers and several relationships from its published standard list. A gift for a house deposit should therefore be checked against the proposed product, not against a general list found online.
            </p>
          </Section>

          <Section id="which-lenders-accept-gifted-deposits" title="Which lenders accept gifted deposits?">
            <p>
              Most major lenders have a route for gifted deposits, but their donor, repayment and occupancy rules differ. This compact comparison is based on the lenders' published guidance reviewed on 19 July 2026; it is not a list of every condition or product exception.
            </p>
            <ResponsiveTable
              caption="Published gifted-deposit policy differences"
              summary="A general comparison of Santander, NatWest and Halifax donor and gift requirements."
              columns={["Lender", "Who may gift", "Published position", "Practical check"]}
              rows={lenderRows}
            />
            <div className="rounded-3xl border border-[#d6b96f] bg-[#fff9e8] p-5 text-sm text-text">
              <strong>Lender criteria can change.</strong> This table is a general guide, not a substitute for checking the lender's current mortgage criteria. Read the official guidance from <a href="https://www.santander.co.uk/personal/mortgages/gifted-deposits" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-deep">Santander</a>, <a href="https://www.intermediary.natwest.com/first-time-buyers.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-deep">NatWest Intermediaries</a> and <a href="https://www.halifax-intermediaries.co.uk/criteria.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-deep">Halifax Intermediaries</a>.
            </div>
          </Section>

          <Section id="can-the-whole-deposit-be-gifted" title="Can the whole mortgage deposit be gifted?">
            <p>
              Yes, some lenders may accept the whole deposit gifted by one or more acceptable donors. A mortgage deposit gift can improve the numbers for a gifted deposit mortgage, but others restrict the donor relationship, product, residency status or property type. The applicant still has to pass affordability, credit scoring, identity checks and property underwriting; a house deposit gift does not guarantee approval.
            </p>
            <ResponsiveTable
              caption="A 5% buyer contribution becoming a 10% total deposit"
              columns={["Item", "Amount"]}
              rows={[["Property price", "£250,000"], ["Buyer's savings", "£12,500"], ["Gift from parents", "£12,500"], ["Total deposit", "£25,000"], ["Mortgage required", "£225,000"], ["Loan-to-value", "90%"]]}
            />
            <p>
              Without the gift, the buyer has 5%; with it, the buyer reaches 10% and reduces the loan-to-value. That may change product choice, but it does not promise a particular rate. Compare the deposit with <Link href="/first-time-buyer-costs" className="underline hover:text-brand-deep">first-time buyer costs beyond the deposit</Link> before committing all available cash.
            </p>
          </Section>

          <Section id="gifted-deposit-documents" title="What documents are needed for a gifted deposit?">
            <p>
              For a gifted deposit mortgage, the lender and conveyancer may ask for different gifted deposit documents. A typical evidence pack includes:
            </p>
            <ul className="grid gap-2 rounded-3xl border border-line bg-white p-5 sm:grid-cols-2">
              {["Gifted deposit letter or lender declaration", "Donor passport or driving licence", "Recent proof of address", "Gifted deposit bank statements", "Evidence of long-term savings", "Property or other asset-sale completion statement", "Probate, inheritance or estate evidence", "Share-sale or investment evidence", "Pension-withdrawal evidence", "Explanation and proof for recent large credits", "Transfer confirmations", "Lender- and conveyancer-specific forms"].map((item) => <li key={item} className="flex gap-2"><span aria-hidden="true" className="text-brand">✓</span><span>{item}</span></li>)}
            </ul>
            <p>
              <strong>Source of funds</strong> means where the specific gifted money came from, such as a savings account or asset sale. <strong>Source of wealth</strong> explains how the donor accumulated their wider wealth, such as long-term employment, business ownership or investments. Three to six months of statements may sometimes be requested, and more may be needed where large credits, multiple accounts or overseas funds complicate the trail. Requirements vary, so proof of funds should be prepared, not guessed.
            </p>
          </Section>

          <Section id="gifted-deposit-letter" title="What should a gifted deposit letter include?">
            <p>
              A gifted deposit letter commonly gives the donor's full name and address, the buyer's full name, their relationship, the amount, the source of funds and the property address if known. It should state the real repayment terms, whether the donor expects a legal or beneficial interest, and whether they will occupy the property. The donor signs and dates it.
            </p>
            <p>
              The lender may require its own wording, a recent date, an application reference or a statement addressed to it. The conveyancer may separately issue a gifted deposit declaration for anti-money-laundering and title checks. Complete both where requested; one does not automatically replace the other.
            </p>
          </Section>

          <Section id="gifted-deposit-letter-template" title="Gifted deposit letter template">
            <GiftedDepositLetter />
            <p className="rounded-2xl border border-[#d6b96f] bg-[#fff9e8] p-4 text-sm">
              <strong>This is a general template, not a lender-approved form.</strong> Your lender or conveyancer may require its own wording or declaration. Do not describe the money as repayable unless the intended lender has confirmed that a repayable contribution is acceptable.
            </p>
          </Section>

          <Section id="gifted-deposit-rejection" title="Can a gifted deposit cause a mortgage rejection?">
            <p>
              <strong>Yes, but the gift itself is rarely the problem.</strong> Applications are more commonly delayed or rejected because the gift was not disclosed, is actually a loan, comes from an unacceptable donor, or cannot be supported by adequate identity and source-of-funds evidence. A search for gifted deposit mortgage rejection often reflects an evidence or policy mismatch rather than a blanket ban.
            </p>
            <ResponsiveTable
              caption="Gifted deposit rejection and delay risks"
              summary="Common issues, why lenders or conveyancers are concerned, and the practical action to take."
              columns={["Issue", "Why it causes concern", "Practical action"]}
              rows={rejectionRows}
            />
          </Section>

          <Section id="gifted-deposit-from-abroad" title="Can a gifted deposit come from abroad?">
            <p>
              A gifted deposit mortgage using money from abroad may be accepted, but not by every lender or conveyancer. Expect additional anti-money-laundering checks and allow more time. The donor may need foreign bank statements, valid identity and address evidence, certified translations, evidence of the currency conversion and documents proving the original source.
            </p>
            <p>
              Use a traceable transfer between regulated accounts and retain the foreign and UK transaction records. Do not bring cash into the process or split transfers to avoid banking limits. Halifax, for example, says an overseas family gift must have been transferred into a UK bank account. Disclose the country and donor early so the professionals can confirm what is acceptable.
            </p>
          </Section>

          <Section id="tax-on-a-gifted-deposit" title="Do you pay tax on a gifted deposit?">
            <p>
              Receiving a cash gift does not normally create an immediate income-tax bill for the buyer. The donor can give more than £3,000: the annual inheritance-tax exemption is not a maximum permitted gift. Instead, it determines how much is immediately outside the donor's estate under that exemption.
            </p>
            <p>
              Inheritance-tax gifted deposit consequences can arise if the donor dies within seven years. The result depends on the gift date, other lifetime gifts, available exemptions and reliefs, and the donor's estate. Qualifying gifts between spouses and civil partners are normally exempt. Large gifts, trusts, international estates or retained benefits justify individual tax advice. Read the current <a href="https://www.gov.uk/inheritance-tax/gifts" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-deep">GOV.UK inheritance-tax gift guidance</a> and keep a dated record.
            </p>
            <p className="rounded-2xl border border-[#d6b96f] bg-[#fff9e8] p-4 text-sm"><strong>Do not describe a gifted deposit simply as “tax-free” without qualification.</strong> This guide does not calculate personal inheritance-tax liability.</p>
          </Section>

          <Section id="gifted-money-for-buying-fees" title="Can gifted money pay stamp duty and buying fees?">
            <p>
              Gifted money can sometimes pay stamp duty, conveyancing, surveys, mortgage fees, removals, initial furnishing or repairs. Tell the lender how the entire gift will be used so it can see both the deposit and the buyer's remaining funds. Review <Link href="/stamp-duty-explained" className="underline hover:text-brand-deep">stamp duty</Link>, <Link href="/conveyancing-costs-uk" className="underline hover:text-brand-deep">conveyancing costs</Link>, <Link href="/property-survey-costs-uk" className="underline hover:text-brand-deep">survey choices</Link>, <Link href="/mortgage-fees-costs" className="underline hover:text-brand-deep">typical mortgage fees</Link>, <Link href="/costs-before-completion" className="underline hover:text-brand-deep">the before-completion payment timeline</Link>, and <Link href="/moving-costs-uk" className="underline hover:text-brand-deep">moving and removal costs</Link> before allocating the balance.
            </p>
            <ResponsiveTable caption="Gift split between deposit and buying costs" columns={["Use", "Amount"]} rows={[["Gift received", "£35,000"], ["Mortgage deposit", "£30,000"], ["Remaining gift", "£5,000"]]} />
            <p>
              The remaining £5,000 may help with buying costs, but the lender and conveyancer should know the plan. Use the <Link href="/#calculator" className="underline hover:text-brand-deep">home-buying cost calculator</Link> and the guide to <Link href="/hidden-costs-buying-house" className="underline hover:text-brand-deep">hidden costs of buying a house</Link> to test whether £5,000 is sufficient for the actual property.
            </p>
          </Section>

          <Section id="gifted-deposit-examples" title="Gifted deposit worked examples">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="surface p-5"><p className="eyebrow">Example 1</p><h3 className="mt-3 text-lg font-semibold">Five per cent becomes ten</h3><p className="mt-2 text-sm text-muted">On £250,000, the buyer saves £12,500 and parents add £12,500. The £25,000 total means a £225,000 mortgage at 90% LTV.</p></div>
              <div className="surface p-5"><p className="eyebrow">Example 2</p><h3 className="mt-3 text-lg font-semibold">Entire deposit gifted</h3><p className="mt-2 text-sm text-muted">On £300,000, a £30,000 gift and £0 buyer savings fund a 10% deposit. The mortgage is £270,000 at 90% LTV, subject to all normal checks.</p></div>
              <div className="surface p-5"><p className="eyebrow">Example 3</p><h3 className="mt-3 text-lg font-semibold">Deposit plus fees</h3><p className="mt-2 text-sm text-muted">A £35,000 gift funds a £30,000 deposit and leaves £5,000 for evidenced costs. A separate contingency may still be sensible.</p></div>
            </div>
            <p>
              Some lenders may accept each structure and some may not. For a fuller benchmark, compare <Link href="/cost-to-buy-300k-house" className="underline hover:text-brand-deep">the total cost of buying a £300,000 home</Link> and plan for <Link href="/first-year-cost-buying-house-uk" className="underline hover:text-brand-deep">first-year homeownership costs</Link>, not only completion day.
            </p>
          </Section>

          <Section id="buyer-checklist" title="Buyer checklist">
            <ul className="grid gap-2 rounded-3xl border border-line bg-white p-5 sm:grid-cols-2">
              {["Disclose the gift early", "Identify every donor", "Confirm gift versus loan", "Check the lender accepts the relationship", "Ask whether the lender has its own form", "Tell the conveyancer", "Keep every bank and transfer record", "Avoid cash and unexplained movements", "Confirm the transfer timing", "Calculate all remaining buying costs", "Keep a contingency fund", "Recheck if the lender or amount changes"].map((item) => <li key={item} className="flex gap-2"><span aria-hidden="true" className="text-brand">✓</span><span>{item}</span></li>)}
            </ul>
          </Section>

          <Section id="donor-checklist" title="Donor checklist">
            <ul className="grid gap-2 rounded-3xl border border-line bg-white p-5 sm:grid-cols-2">
              {["Confirm the amount and real terms", "Decide whether any ownership is expected", "Prepare photo ID and proof of address", "Collect the requested bank statements", "Prepare source-of-funds evidence", "Explain recent large deposits", "Avoid unnecessary account-to-account moves", "Expect anti-money-laundering checks", "Keep a record for the estate", "Consider tax advice where appropriate", "Sign the required lender form", "Transfer only through the agreed route"].map((item) => <li key={item} className="flex gap-2"><span aria-hidden="true" className="text-brand">✓</span><span>{item}</span></li>)}
            </ul>
          </Section>

          <section id="frequently-asked-questions" className="scroll-mt-8">
            <FAQSection items={faqs} />
          </section>

          <Section id="sources-and-methodology" title="Sources and methodology">
            <p>
              This guide was prepared by the TrueHomeCosts editorial team using official lender guidance, GOV.UK inheritance-tax guidance and practical mortgage and conveyancing evidence requirements available on 19 July 2026. Policy statements are attributed to the lender rather than presented as market-wide rules. Worked examples use purchase price minus deposit equals mortgage, with loan-to-value calculated as mortgage divided by price.
            </p>
            <ul className="grid gap-2 pl-5">
              <li className="list-disc"><a href="https://www.santander.co.uk/personal/mortgages/gifted-deposits" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-deep">Santander: gifted deposit mortgages and common problems</a></li>
              <li className="list-disc"><a href="https://www.intermediary.natwest.com/first-time-buyers.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-deep">NatWest Intermediaries: first-time buyer deposit policy</a></li>
              <li className="list-disc"><a href="https://www.natwest.com/mortgages/applying-for-a-mortgage.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-deep">NatWest: evidence needed when applying for a mortgage</a></li>
              <li className="list-disc"><a href="https://www.halifax-intermediaries.co.uk/criteria.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-deep">Halifax Intermediaries: deposit acceptance and documentation</a></li>
              <li className="list-disc"><a href="https://www.gov.uk/inheritance-tax/gifts" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-deep">GOV.UK: inheritance tax rules on giving gifts</a></li>
            </ul>
            <p>
              TrueHomeCosts is independent of the lenders named. Read <Link href="/methodology" className="underline hover:text-brand-deep">how our estimates and sources work</Link>, then check the live lender criteria before acting.
            </p>
          </Section>

          <section className="rounded-3xl border border-line bg-white p-5 sm:p-6">
            <p className="eyebrow">Final check</p>
            <h2 className="mt-3 font-serif text-3xl text-text">Declare early, preserve the paper trail</h2>
            <p className="mt-3 text-text">
              A gifted deposit mortgage works best when the donor, amount, repayment terms and source are agreed before the application. Use the lender's form, keep the banking trail intact and leave enough cash for the rest of the purchase and <Link href="/cost-of-owning-home-uk" className="underline hover:text-brand-deep">the ongoing cost of owning a home</Link>.
            </p>
            <p className="mt-4 text-sm text-muted">
              This guide provides general UK information and is not personalised mortgage, legal or tax advice. Mortgage criteria vary by lender and can change. Confirm the required documents and donor rules with your lender, mortgage adviser and conveyancer before transferring any money.
            </p>
          </section>

          <section className="surface p-5 sm:p-6">
            <p className="eyebrow">Related planning guides</p>
            <h2 className="mt-3 font-serif text-3xl text-text">Build the rest of the buying budget</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/insurance-costs-uk" className="link-chip">Buildings and insurance costs</Link>
              <Link href="/regional-property-costs-uk" className="link-chip">Regional buying costs</Link>
              <Link href="/first-time-buyer-costs" className="link-chip">First-time buyer cost guide</Link>
              <Link href="/#calculator" className="link-chip">Calculate the full upfront total</Link>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
