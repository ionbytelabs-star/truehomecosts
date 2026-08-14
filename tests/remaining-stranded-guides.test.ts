import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import { guideMap, guideSummaries } from "../content/guides";

const retainedHistoricalGuides = [
  {
    slug: "property-survey-costs-uk",
    title: "House Survey Cost UK 2026: Level 1, 2 & 3",
    firstSection: "What is a house survey?"
  },
  {
    slug: "buying-and-selling-house-same-time",
    title: "Cost of Buying and Selling a House at the Same Time",
    firstSection: "One move, two cost schedules"
  }
] as const;

test("retained historical guides remain registered once", () => {
  for (const expected of retainedHistoricalGuides) {
    const guide = guideMap[expected.slug];
    assert.ok(guide, `Missing /${expected.slug}`);
    assert.equal(guide.title, expected.title);
    assert.equal(guide.sections[0].title, expected.firstSection);
    assert.equal(
      guideSummaries.filter((entry) => entry.slug === expected.slug).length,
      1
    );
  }
});

test("costs after exchange is merged into the definitive completion timeline", () => {
  assert.equal(guideMap["costs-after-exchange"], undefined);
  assert.ok(!guideSummaries.some((entry) => entry.slug === "costs-after-exchange"));
  assert.ok(!existsSync("content/costs-after-exchange.ts"));

  const destination = guideMap["costs-before-completion"];
  const content = JSON.stringify(destination);
  assert.match(content, /Between exchange and completion/);
  assert.match(content, /buildings insurance/i);
  assert.match(content, /trusted channel/i);
  assert.match(content, /Immediately after completion/);
});

test("moving and insurance guides link only to the merged completion destination", () => {
  for (const sourceSlug of ["moving-costs-uk", "insurance-costs-uk"]) {
    const links = guideMap[sourceSlug].contextualLinks ?? [];
    assert.ok(links.some((link) => link.href === "/costs-before-completion"));
    assert.ok(!links.some((link) => link.href === "/costs-after-exchange"));
  }

  const conveyancing = guideMap["conveyancing-costs-uk"].contextualLinks ?? [];
  assert.equal(
    conveyancing.filter((link) => link.href === "/costs-before-completion").length,
    1
  );
});

test("guide template continues to expose article, FAQ and breadcrumb schemas", () => {
  const source = readFileSync("components/GuidePageTemplate.tsx", "utf8");
  assert.match(source, /webpageSchema/);
  assert.match(source, /articleSchema/);
  assert.match(source, /faqPageSchema\(guide\.faqs\)/);
  assert.match(source, /breadcrumbSchema/);
});
