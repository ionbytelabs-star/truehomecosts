import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { guideMap, guideSummaries } from "../content/guides";
import { homepageGuides } from "../content/home";
import {
  conveyancingPlanning,
  englandWalesRegistrationRows,
  firstMonthCostRows,
  northernIrelandRegistrationRows,
  priorityThreeExamplePrice,
  scotlandRegistrationRows,
  simultaneousMoveCostRows,
  surveyLevelRows
} from "../data/editorial/priority-three-guides";
import { hmlrElectronicScale1Fees } from "../data/fees/hmlr";
import { northernIrelandLandRegistryTransferFees } from "../data/fees/northern-ireland";
import { scotlandDispositionRegistrationFees } from "../data/fees/scotland";
import { calculateUpfrontCosts, type CalculatorInput } from "../lib/calculator";

const priorityThreeSlugs = [
  "conveyancing-costs-uk",
  "property-survey-costs-uk",
  "land-registry-fees-uk",
  "costs-after-exchange",
  "costs-before-completion",
  "first-month-costs-after-buying-house",
  "buying-and-selling-house-same-time"
] as const;

const expectedLinks: Record<(typeof priorityThreeSlugs)[number], string[]> = {
  "conveyancing-costs-uk": [
    "/#calculator",
    "/stamp-duty-explained",
    "/land-registry-fees-uk",
    "/costs-before-completion",
    "/buying-and-selling-house-same-time",
    "/reports/true-cost-buying-home-uk-2026"
  ],
  "property-survey-costs-uk": [
    "/#calculator",
    "/hidden-costs-buying-house",
    "/first-year-cost-buying-house-uk",
    "/cost-of-owning-home-uk",
    "/reports/true-cost-buying-home-uk-2026"
  ],
  "land-registry-fees-uk": [
    "/#calculator",
    "/conveyancing-costs-uk",
    "/stamp-duty-explained",
    "/taxes-and-fees-uk",
    "/reports/true-cost-buying-home-uk-2026"
  ],
  "costs-after-exchange": [
    "/costs-before-completion",
    "/moving-costs-uk",
    "/insurance-costs-uk",
    "/#calculator",
    "/first-month-costs-after-buying-house"
  ],
  "costs-before-completion": [
    "/#calculator",
    "/conveyancing-costs-uk",
    "/property-survey-costs-uk",
    "/stamp-duty-explained",
    "/hidden-costs-buying-new-build-home-uk",
    "/gifted-deposit-mortgage"
  ],
  "first-month-costs-after-buying-house": [
    "/cost-of-owning-home-uk",
    "/furnishing-costs-uk",
    "/insurance-costs-uk",
    "/moving-costs-uk",
    "/#calculator",
    "/reports/true-cost-buying-home-uk-2026"
  ],
  "buying-and-selling-house-same-time": [
    "/#calculator",
    "/moving-costs-uk",
    "/conveyancing-costs-uk",
    "/costs-before-completion",
    "/cost-of-owning-home-uk",
    "/reports/true-cost-buying-home-uk-2026"
  ]
};

test("all seven Priority 3 routes resolve through the existing guide route", () => {
  for (const slug of priorityThreeSlugs) {
    const guide = guideMap[slug];
    assert.ok(guide, `Missing /${slug}`);
    assert.equal(guide.slug, slug);
    assert.ok(guide.sections.length >= 5, `${slug} needs substantive sections`);
    assert.ok(guide.faqs.length >= 3, `${slug} needs FAQs`);
  }
});

test("Priority 3 routes are included in the generated sitemap", () => {
  const sitemapSource = readFileSync("app/sitemap.ts", "utf8");
  assert.match(sitemapSource, /guideSummaries\.map/);
  const urls = new Set(guideSummaries.map((guide) => guide.href));
  for (const slug of priorityThreeSlugs) {
    assert.ok(urls.has(`/${slug}`), `Sitemap missing /${slug}`);
  }
});

test("Priority 3 metadata copy and H1s are unique", () => {
  const guides = priorityThreeSlugs.map((slug) => guideMap[slug]);
  assert.equal(new Set(guides.map((guide) => guide.title)).size, guides.length);
  assert.equal(new Set(guides.map((guide) => guide.description)).size, guides.length);
  assert.equal(new Set(guides.map((guide) => guide.h1)).size, guides.length);
  for (const guide of guides) {
    assert.equal(guide.lastReviewed, "2026-07-25");
    assert.ok(guide.description.length >= 110 && guide.description.length <= 170);
  }
});

test("each new guide contains its required journey links", () => {
  for (const slug of priorityThreeSlugs) {
    const guide = guideMap[slug];
    const links = new Set(guide.contextualLinks?.map((link) => link.href));
    for (const href of expectedLinks[slug]) {
      assert.ok(links.has(href), `${slug} missing ${href}`);
    }
  }
});

test("existing discovery pages link naturally into Priority 3", () => {
  const homepageSlugs = new Set(homepageGuides.map((guide) => guide.slug));
  assert.ok(homepageSlugs.has("conveyancing-costs-uk"));
  assert.ok(homepageSlugs.has("property-survey-costs-uk"));
  assert.ok(homepageSlugs.has("first-month-costs-after-buying-house"));

  const backlinks = [
    ["hidden-costs-buying-house", "/conveyancing-costs-uk"],
    ["hidden-costs-buying-house", "/property-survey-costs-uk"],
    ["stamp-duty-explained", "/land-registry-fees-uk"],
    ["moving-costs-uk", "/costs-after-exchange"],
    ["first-year-cost-buying-house-uk", "/first-month-costs-after-buying-house"],
    ["cost-of-owning-home-uk", "/buying-and-selling-house-same-time"]
  ] as const;
  for (const [slug, href] of backlinks) {
    assert.ok(
      guideMap[slug].contextualLinks?.some((link) => link.href === href),
      `${slug} missing backlink to ${href}`
    );
  }
});

test("guide examples reuse central assumptions and fee modules", () => {
  const baseInput: CalculatorInput = {
    propertyPrice: priorityThreeExamplePrice,
    jurisdiction: "england",
    buyerType: "home-mover",
    depositMode: "percentage",
    depositPercentage: 10,
    assumptionLevel: "average",
    includeMoving: true,
    includeInsurance: true,
    includeFurnishing: false,
    includeContingency: true,
    contingencyPercentage: 10
  };
  const result = calculateUpfrontCosts(baseInput);
  const legal = result.breakdown.find((line) => line.key === "solicitors");
  const survey = result.breakdown.find((line) => line.key === "survey");

  assert.equal(legal?.value, 1_400);
  assert.match(conveyancingPlanning.legalFeeRange, /£1,050–£1,800/);
  assert.equal(survey?.value, 700);
  assert.equal(surveyLevelRows[1][1], "£700");
  assert.equal(englandWalesRegistrationRows.length, hmlrElectronicScale1Fees.length);
  assert.equal(scotlandRegistrationRows.length, scotlandDispositionRegistrationFees.length);
  assert.equal(northernIrelandRegistrationRows.length, northernIrelandLandRegistryTransferFees.length);
  assert.ok(firstMonthCostRows.length >= 9);
  assert.ok(simultaneousMoveCostRows.length >= 5);
});

function publicFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const fullPath = path.join(directory, entry);
    return statSync(fullPath).isDirectory() ? publicFiles(fullPath) : [fullPath];
  });
}

test("public source does not expose the owner's personal identity", () => {
  const publicRoots = ["app", "components", "content", "data", "lib", "public"];
  const bannedName = ["Paul", "Addison"].join(" ");
  for (const root of publicRoots) {
    for (const file of publicFiles(root)) {
      if (/\.(?:ts|tsx|js|jsx|json|csv|md|txt|xml|svg|html|css)$/i.test(file)) {
        assert.doesNotMatch(readFileSync(file, "utf8"), new RegExp(bannedName, "i"), file);
      }
    }
  }
});
