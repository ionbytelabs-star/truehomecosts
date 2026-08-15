import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import {
  calculateOngoingHomeCosts,
  defaultOngoingHomeCostInput,
  freeholdAnnualTotal,
  freeholdMonthlyTotal,
  managedAnnualTotal,
  managedMonthlyTotal,
  ongoingHomeCostFaqs,
  ongoingHomeCostReview,
  ongoingHomeCostSources
} from "../data/assumptions/ongoing-home-costs";

const pageSource = readFileSync("app/cost-of-owning-home-uk/page.tsx", "utf8");

test("worked monthly and annual examples are calculated from one central model", () => {
  assert.equal(freeholdMonthlyTotal, 625);
  assert.equal(freeholdAnnualTotal, 7_500);
  assert.equal(managedMonthlyTotal, 825);
  assert.equal(managedAnnualTotal, 9_900);
  assert.equal(freeholdMonthlyTotal * 12, freeholdAnnualTotal);
  assert.equal(managedMonthlyTotal * 12, managedAnnualTotal);
});

test("the estimator separates mortgage, non-mortgage and annual totals", () => {
  const result = calculateOngoingHomeCosts({ ...defaultOngoingHomeCostInput, mortgage: 1_200 });
  assert.equal(result.nonMortgageMonthly, 625);
  assert.equal(result.nonMortgageAnnual, 7_500);
  assert.equal(result.mortgageMonthly, 1_200);
  assert.equal(result.totalMonthly, 1_825);
  assert.equal(result.totalAnnual, 21_900);
});

test("annual irregular costs are converted into a monthly reserve without floating-point drift", () => {
  const result = calculateOngoingHomeCosts({ ...defaultOngoingHomeCostInput, annualIrregularCosts: 1_200 });
  assert.equal(result.irregularReserveAnnual, 3_000);
  assert.equal(result.irregularReserveMonthly, 250);
  assert.equal(result.nonMortgageAnnual, 8_700);
  assert.equal(result.nonMortgageMonthly, 725);
});

test("invalid estimator amounts are rejected", () => {
  assert.throws(
    () => calculateOngoingHomeCosts({ ...defaultOngoingHomeCostInput, water: -1 }),
    RangeError
  );
  assert.throws(
    () => calculateOngoingHomeCosts({ ...defaultOngoingHomeCostInput, water: Number.NaN }),
    RangeError
  );
});

test("buildings insurance is not double counted when included in a service charge", () => {
  const result = calculateOngoingHomeCosts({
    ...defaultOngoingHomeCostInput,
    serviceCharge: 200,
    buildingsInsuranceIncludedInServiceCharge: true
  });
  assert.equal(result.buildingsInsuranceDeducted, 20);
  assert.equal(result.nonMortgageMonthly, 805);
  assert.equal(result.nonMortgageAnnual, 9_660);
});

test("page metadata, canonical inputs and one H1 are explicit", () => {
  assert.match(pageSource, /Cost of Owning a Home UK: Monthly Bills & Budget 2026/);
  assert.match(pageSource, /See the monthly cost of owning a home in the UK/);
  assert.match(pageSource, /const path = "\/cost-of-owning-home-uk"/);
  assert.equal(pageSource.match(/<h1\b/g)?.length, 1);
});

test("visible FAQ content and FAQ schema use the same shared array", () => {
  assert.equal(ongoingHomeCostFaqs.length, 9);
  assert.match(pageSource, /faqPageSchema\(ongoingHomeCostFaqs\)/);
  assert.match(pageSource, /ongoingHomeCostFaqs\.map/);
  assert.match(pageSource, /<details key=\{faq\.question\} open/);
});

test("Article schema uses the TrueHomeCosts organization author, dates and ImageObject", () => {
  const schemaSource = readFileSync("lib/structured-data.ts", "utf8");
  assert.match(pageSource, /datePublished: "2026-04-24"/);
  assert.match(pageSource, /dateModified: ongoingHomeCostReview\.date/);
  assert.doesNotMatch(pageSource, /authorName:/);
  assert.match(schemaSource, /author: organizationReference\(\)/);
  assert.match(schemaSource, /"@type": "ImageObject"/);
});

test("source register contains only direct HTTPS links", () => {
  assert.ok(ongoingHomeCostSources.length >= 8);
  for (const source of ongoingHomeCostSources) {
    assert.match(source.href, /^https:\/\//);
    assert.ok(source.supports.length > 20);
  }
});

test("dedicated route, social image and responsive table wrapper exist", () => {
  assert.ok(existsSync("app/cost-of-owning-home-uk/page.tsx"));
  assert.ok(existsSync("app/cost-of-owning-home-uk/opengraph-image.tsx"));
  const responsiveTable = readFileSync("components/ResponsiveTable.tsx", "utf8");
  assert.match(responsiveTable, /overflow-x-auto/);
  assert.match(responsiveTable, /<caption/);
  assert.match(responsiveTable, /scope="col"/);
  assert.match(responsiveTable, /scope="row"/);
  assert.match(
    readFileSync("app/[slug]/page.tsx", "utf8"),
    /guide\.slug !== "cost-of-owning-home-uk"/
  );
});

test("contextual inbound-link routes point to the dedicated page", () => {
  const template = readFileSync("components/GuidePageTemplate.tsx", "utf8");
  for (const slug of [
    "hidden-costs-buying-house",
    "how-much-money-needed-buy-house",
    "first-year-cost-buying-house-uk",
    "insurance-costs-uk",
    "leasehold-costs-uk",
    "furnishing-costs-uk",
    "regional-property-costs-uk",
    "cost-to-buy-300k-house",
    "cost-to-buy-400k-house"
  ]) {
    assert.ok(template.includes(`"${slug}"`), `Missing ownership-cost link mapping for ${slug}`);
  }
  assert.match(template, /href="\/cost-of-owning-home-uk"/);
  assert.match(readFileSync("app/page.tsx", "utf8"), /href="\/cost-of-owning-home-uk"/);
});
