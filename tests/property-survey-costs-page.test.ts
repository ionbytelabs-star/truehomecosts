import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { guideMap, guideSummaries } from "../content/guides";
import { surveyFeeBands } from "../data/assumptions/surveys";
import { formatCurrency } from "../lib/format";
import { sourceLinks } from "../lib/source-links";

const slug = "property-survey-costs-uk";
const guide = guideMap[slug];

test("survey guide owns its target route and query-aligned metadata", () => {
  assert.ok(guide);
  assert.equal(guideSummaries.filter((entry) => entry.slug === slug).length, 1);
  assert.equal(guide.title, "House Survey Cost UK 2026: Level 1, 2 & 3");
  assert.equal(guide.h1, "House Survey Costs UK 2026: Level 1, Level 2 and Level 3");
  assert.match(guide.description, /How much does a house survey cost in the UK\?/);
  assert.equal(guide.lastReviewed, "2026-08-10");
});

test("published survey guidance is reconciled with shared calculator assumptions", () => {
  const sharedBand = surveyFeeBands.find((band) => band.upTo === 350_000);
  assert.ok(sharedBand);

  const quickTable = guide.introSections?.find(
    (section) => section.title === "House survey costs at a glance"
  )?.table;
  assert.ok(quickTable);
  assert.equal(quickTable.rows.length, 4);
  assert.deepEqual(
    quickTable.rows.slice(1).map((row) => row[2]),
    [
      formatCurrency(sharedBand.low),
      formatCurrency(sharedBand.average),
      formatCurrency(sharedBand.high)
    ]
  );
  assert.match(guide.directAnswer, /£400–£1,500/);
  assert.match(guide.directAnswer, /mortgage valuation is a separate lender service/i);
});

test("survey intent sections and visible FAQs cover the GSC query clusters", () => {
  const sectionTitles = guide.sections.map((section) => section.title);
  for (const title of [
    "House survey Level 1 cost",
    "House survey Level 2 cost",
    "House survey Level 3 cost",
    "Level 2 vs Level 3 survey cost",
    "Mortgage valuation vs house survey",
    "What affects the cost of a house survey?",
    "How to choose the right survey",
    "Survey costs within the full buying budget"
  ]) {
    assert.ok(sectionTitles.includes(title), "Missing section: " + title);
  }

  assert.equal(guide.faqs.length, 6);
  assert.ok(guide.faqs.some((faq) => faq.question === "How much does a Level 2 survey cost?"));
  assert.ok(guide.faqs.some((faq) => faq.question === "How much does a Level 3 survey cost?"));
  assert.ok(guide.faqs.some((faq) => faq.question === "Is a mortgage valuation the same as a house survey?"));

  const templateSource = readFileSync("components/GuidePageTemplate.tsx", "utf8");
  assert.match(templateSource, /faqPageSchema\(guide\.faqs\)/);
  assert.match(templateSource, /<FAQSection items=\{guide\.faqs\}/);
  assert.match(templateSource, /webpageSchema/);
  assert.match(templateSource, /articleSchema/);
  assert.match(templateSource, /breadcrumbSchema/);
});

test("current RICS and MoneyHelper references are configured", () => {
  assert.deepEqual(guide.sourceKeys, [
    "ricsHouseSurveys",
    "ricsHomeSurveyStandard",
    "moneyHelperBuyingMoving"
  ]);
  assert.match(sourceLinks.ricsHouseSurveys.href, /^https:\/\/www\.rics\.org\/consumer-guides\//);
  assert.match(sourceLinks.ricsHomeSurveyStandard.href, /^https:\/\/www\.rics\.org\/profession-standards\//);
  assert.match(sourceLinks.moneyHelperBuyingMoving.href, /^https:\/\/www\.moneyhelper\.org\.uk\//);
});

test("survey route remains crawlable, self-canonical and included through the sitemap", () => {
  const routeSource = readFileSync("app/[slug]/page.tsx", "utf8");
  const metadataSource = readFileSync("lib/metadata.ts", "utf8");
  const sitemapSource = readFileSync("app/sitemap.ts", "utf8");
  const robotsSource = readFileSync("app/robots.txt/route.ts", "utf8");
  const backtick = String.fromCharCode(96);
  const dollar = "$";

  assert.ok(routeSource.includes("path: " + backtick + "/" + dollar + "{guide.slug}" + backtick));
  assert.doesNotMatch(routeSource, /noindex/i);
  assert.match(metadataSource, /alternates:\s*\{\s*canonical: url/);
  assert.match(sitemapSource, /guideSummaries\.map/);
  assert.match(robotsSource, /"Allow: \/"/);
});

test("new homepage and mortgage-fees links point to the survey guide once", () => {
  const homepageSource = readFileSync("app/page.tsx", "utf8");
  assert.equal(homepageSource.match(/href="\/property-survey-costs-uk"/g)?.length, 1);

  const mortgageLinks = guideMap["mortgage-fees-costs"].contextualLinks?.filter(
    (link) => link.href === "/property-survey-costs-uk"
  );
  assert.equal(mortgageLinks?.length, 1);
});
