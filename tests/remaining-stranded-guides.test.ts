import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { guideMap, guideSummaries } from "../content/guides";

const recovered = [
  {
    slug: "costs-after-exchange",
    title: "Costs After Exchange of Contracts: UK Buyer Guide",
    h1: "Costs after exchange of contracts",
    firstSection: "After-exchange cost timeline",
    lastReviewed: "2026-07-25",
    faqCount: 3
  },
  {
    slug: "property-survey-costs-uk",
    title: "House Survey Cost UK 2026: Level 1, 2 & 3",
    h1: "House Survey Costs UK 2026: Level 1, Level 2 and Level 3",
    firstSection: "What is a house survey?",
    lastReviewed: "2026-08-10",
    faqCount: 6
  },
  {
    slug: "buying-and-selling-house-same-time",
    title: "Cost of Buying and Selling a House at the Same Time",
    h1: "Buying and selling a house at the same time",
    firstSection: "One move, two cost schedules",
    lastReviewed: "2026-07-25",
    faqCount: 3
  }
] as const;

test("remaining historical guides are restored once at their exact indexed slugs", () => {
  for (const expected of recovered) {
    const guide = guideMap[expected.slug];
    assert.ok(guide, `Missing recovered route /${expected.slug}`);
    assert.equal(guide.title, expected.title);
    assert.equal(guide.h1, expected.h1);
    assert.equal(guide.sections[0].title, expected.firstSection);
    assert.equal(guide.lastReviewed, expected.lastReviewed);
    assert.equal(guide.faqs.length, expected.faqCount);
    assert.equal(
      guideSummaries.filter((entry) => entry.slug === expected.slug).length,
      1,
      `Recovered route /${expected.slug} must be registered exactly once`
    );
  }
});

test("recovered guides retain distinct intent and structured-data inputs", () => {
  assert.equal(guideMap["costs-after-exchange"].sections[2].title, "Buildings insurance timing");
  assert.equal(guideMap["property-survey-costs-uk"].sections[5].title, "Mortgage valuation vs house survey");
  assert.equal(guideMap["buying-and-selling-house-same-time"].sections[3].title, "Chain timing and completion risk");

  const templateSource = readFileSync("components/GuidePageTemplate.tsx", "utf8");
  assert.match(templateSource, /webpageSchema/);
  assert.match(templateSource, /articleSchema/);
  assert.match(templateSource, /faqPageSchema\(guide\.faqs\)/);
  assert.match(templateSource, /breadcrumbSchema/);
});

test("safe historical backlinks are restored for all three guides", () => {
  const contextualBacklinks: Record<string, string[]> = {
    "costs-after-exchange": ["moving-costs-uk", "insurance-costs-uk"],
    "property-survey-costs-uk": ["hidden-costs-buying-house", "first-year-cost-buying-house-uk"],
    "buying-and-selling-house-same-time": ["mortgage-fees-costs", "moving-costs-uk", "cost-of-owning-home-uk", "conveyancing-costs-uk"]
  };

  for (const [targetSlug, sourceSlugs] of Object.entries(contextualBacklinks)) {
    for (const sourceSlug of sourceSlugs) {
      const matches = guideMap[sourceSlug].contextualLinks?.filter(
        (link) => link.href === `/${targetSlug}`
      ) ?? [];
      assert.equal(matches.length, 1, `Expected one /${targetSlug} link from /${sourceSlug}`);
    }
  }

  assert.ok(guideMap["costs-before-completion"].relatedGuides.includes("costs-after-exchange"));
  assert.ok(guideMap["costs-before-completion"].contextualLinks?.some((link) => link.href === "/property-survey-costs-uk"));

  const giftedDepositSource = readFileSync("app/gifted-deposit-mortgage/page.tsx", "utf8");
  const methodologySource = readFileSync("app/methodology/page.tsx", "utf8");
  const ownershipCostsSource = readFileSync("app/cost-of-owning-home-uk/page.tsx", "utf8");
  assert.match(giftedDepositSource, /href="\/property-survey-costs-uk"/);
  assert.match(methodologySource, /href="\/property-survey-costs-uk"/);
  assert.match(ownershipCostsSource, /"\/buying-and-selling-house-same-time"/);
});

test("excluded branch-only routes remain absent from recovered guide links", () => {
  const excluded = [
    "/first-month-costs-after-buying-house",
    "/reports/true-cost-buying-home-uk-2026",
    "/press-and-data",
    "/embed/calculator"
  ];

  for (const expected of recovered) {
    const guide = guideMap[expected.slug];
    for (const path of excluded) {
      assert.ok(!guide.contextualLinks?.some((link) => link.href === path));
      assert.ok(!guide.relatedGuides.includes(path.slice(1)));
    }
  }

  assert.ok(!guideMap["first-month-costs-after-buying-house"]);
});
