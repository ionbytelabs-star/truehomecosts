import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  landRegistryH1,
  landRegistryMetaDescription,
  landRegistryPageTitle,
  landRegistryReviewDate
} from "../content/land-registry-fees-uk";
import { guideMap, guideSummaries } from "../content/guides";
import {
  getHmlrScale1Fee,
  getHmlrScale2Fee,
  hmlrElectronicScale1Fees,
  hmlrScale1FeeBands,
  hmlrScale2FeeBands,
  parseHmlrAssessmentValue,
  type HmlrScale1Route,
  type HmlrScale2Route
} from "../data/fees/hmlr";

const slug = "land-registry-fees-uk";
const guide = guideMap[slug];

test("historical Land Registry URL keeps one current guide entry", () => {
  assert.ok(guide);
  assert.equal(guide.slug, slug);
  assert.equal(guide.h1, landRegistryH1);
  assert.equal(guide.description, landRegistryMetaDescription);
  assert.equal(guide.lastReviewed, landRegistryReviewDate);
  assert.equal(guideSummaries.filter((entry) => entry.slug === slug).length, 1);
});

test("dedicated page locks the requested metadata, canonical and indexable route", () => {
  const pageSource = readFileSync("app/land-registry-fees-uk/page.tsx", "utf8");
  const metadataSource = readFileSync("lib/metadata.ts", "utf8");
  const robotsSource = readFileSync("app/robots.txt/route.ts", "utf8");

  assert.match(pageSource, /const path = "\/land-registry-fees-uk"/);
  assert.match(pageSource, /title: landRegistryPageTitle/);
  assert.match(pageSource, /absoluteTitle: true/);
  assert.match(pageSource, /articleSchema/);
  assert.match(pageSource, /faqPageSchema\(\[\.\.\.landRegistryFaqs\]\)/);
  assert.match(pageSource, /breadcrumbSchema/);
  assert.match(metadataSource, /alternates:\s*\{\s*canonical: url/);
  assert.match(robotsSource, /"Allow: \/"/);
  assert.doesNotMatch(pageSource, /noindex/i);
  assert.equal(landRegistryPageTitle, "Land Registry Fees 2026: HMLR Scale 1 & 2 Calculator | TrueHomeCosts");
});

test("page information architecture keeps the calculator and fee tables before supporting content", () => {
  const pageSource = readFileSync("app/land-registry-fees-uk/page.tsx", "utf8");
  const headings = [
    "Land Registry fees at a glance",
    "Which Land Registry fee scale applies?",
    "Full Scale 1 fees",
    "Full Scale 2 fees",
    "Buying in Scotland or Northern Ireland?",
    "Scotland: Registers of Scotland",
    "Northern Ireland: Land &amp; Property Services",
    "Why two similar purchases can have different registration fees",
    "Land Registry fee vs Stamp Duty vs conveyancing fee",
    "Land Registry fee FAQs",
    "Sources and review",
    "Related guides"
  ];

  let previousIndex = pageSource.indexOf("<HmlrFeeCalculator />");
  assert.ok(previousIndex > 0, "calculator should render near the top");

  for (const heading of headings) {
    const currentIndex = pageSource.lastIndexOf(heading);
    assert.ok(currentIndex > previousIndex, `${heading} should follow the previous section`);
    previousIndex = currentIndex;
  }
});

test("common homepage HMLR dependency still maps to Scale 1 electronic whole-title fees", () => {
  assert.deepEqual(
    hmlrElectronicScale1Fees,
    hmlrScale1FeeBands.map((band) => ({ upTo: band.upTo, fee: band.portalWhole }))
  );
});

test("Scale 1 returns every official route at every requested boundary", () => {
  const boundaryBandIndexes: Array<[number, number]> = [
    [0, 0], [80_000, 0], [80_001, 1], [100_000, 1], [100_001, 2], [200_000, 2],
    [200_001, 3], [500_000, 3], [500_001, 4], [1_000_000, 4], [1_000_001, 5]
  ];
  const routeKeys: Array<[HmlrScale1Route, "post" | "portalWhole" | "portalPartLease" | "voluntaryFirstRegistration"]> = [
    ["post", "post"],
    ["portal-whole", "portalWhole"],
    ["portal-part-lease", "portalPartLease"],
    ["voluntary-first-registration", "voluntaryFirstRegistration"]
  ];

  for (const [value, bandIndex] of boundaryBandIndexes) {
    for (const [route, key] of routeKeys) {
      assert.equal(getHmlrScale1Fee(value, route), hmlrScale1FeeBands[bandIndex][key], `${value} ${route}`);
    }
  }
});

test("Scale 2 returns every official route at every requested boundary", () => {
  const boundaryBandIndexes: Array<[number, number]> = [
    [0, 0], [80_000, 0], [80_001, 0], [100_000, 0], [100_001, 1], [200_000, 1],
    [200_001, 2], [500_000, 2], [500_001, 3], [1_000_000, 3], [1_000_001, 4]
  ];
  const routeKeys: Array<[HmlrScale2Route, "post" | "portalWhole" | "portalPartOther"]> = [
    ["post", "post"],
    ["portal-whole", "portalWhole"],
    ["portal-part-other", "portalPartOther"]
  ];

  for (const [value, bandIndex] of boundaryBandIndexes) {
    for (const [route, key] of routeKeys) {
      assert.equal(getHmlrScale2Fee(value, route), hmlrScale2FeeBands[bandIndex][key], `${value} ${route}`);
    }
  }
});

test("representative calculator values match the published whole-title electronic fees", () => {
  const samples: Array<[number, number, number]> = [
    [75_000, 20, 20],
    [90_000, 40, 20],
    [150_000, 100, 30],
    [300_000, 150, 45],
    [750_000, 295, 65],
    [1_500_000, 500, 140]
  ];

  for (const [value, scale1Fee, scale2Fee] of samples) {
    assert.equal(getHmlrScale1Fee(value, "portal-whole"), scale1Fee);
    assert.equal(getHmlrScale2Fee(value, "portal-whole"), scale2Fee);
  }
});

test("assessment input parsing safely handles formatted, empty, negative and malformed values", () => {
  assert.equal(parseHmlrAssessmentValue("£300,000"), 300_000);
  assert.equal(parseHmlrAssessmentValue(" 100000.50 "), 100_000.5);
  assert.equal(parseHmlrAssessmentValue("0"), 0);
  assert.equal(parseHmlrAssessmentValue(""), null);
  assert.equal(parseHmlrAssessmentValue("-1"), null);
  assert.equal(parseHmlrAssessmentValue("abc"), null);
  assert.equal(parseHmlrAssessmentValue("100,00x"), null);
  assert.equal(getHmlrScale1Fee(-1, "portal-whole"), null);
  assert.equal(getHmlrScale2Fee(Number.NaN, "portal-whole"), null);
});

test("relevant pages provide restrained contextual backlinks", () => {
  const expectedGuideBacklinks = ["hidden-costs-buying-house", "conveyancing-costs-uk", "stamp-duty-explained"];

  for (const sourceSlug of expectedGuideBacklinks) {
    const links = guideMap[sourceSlug].contextualLinks?.filter((link) => link.href === `/${slug}`) ?? [];
    assert.equal(links.length, 1, `Expected one backlink from ${sourceSlug}`);
  }

  const homepageSource = readFileSync("app/page.tsx", "utf8");
  assert.match(homepageSource, /href="\/land-registry-fees-uk"/);
});
