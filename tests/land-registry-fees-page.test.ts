import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { guideMap, guideSummaries } from "../content/guides";
import { hmlrElectronicScale1Fees } from "../data/fees/hmlr";
import { northernIrelandLandRegistryTransferFees } from "../data/fees/northern-ireland";
import { scotlandDispositionRegistrationFees } from "../data/fees/scotland";

const slug = "land-registry-fees-uk";
const guide = guideMap[slug];

test("historical Land Registry guide is restored at its indexed slug", () => {
  assert.ok(guide);
  assert.equal(guide.slug, slug);
  assert.equal(guide.title, "UK Land Registry and Registration Fees Explained");
  assert.equal(guide.h1, "Land Registry and registration fees in the UK");
  assert.equal(guide.lastReviewed, "2026-07-25");
  assert.equal(guideSummaries.filter((entry) => entry.slug === slug).length, 1);
});

test("registration tables use the current shared official fee modules", () => {
  const tables = Object.fromEntries(
    guide.sections.flatMap((section) => section.table ? [[section.table.caption, section.table.rows]] : [])
  );

  assert.equal(tables["HM Land Registry electronic Scale 1 whole-title transfer fees"].length, hmlrElectronicScale1Fees.length);
  assert.equal(tables["Registers of Scotland disposition registration fees"].length, scotlandDispositionRegistrationFees.length);
  assert.equal(tables["Current Northern Ireland Land Registry transfer scale used for calculator planning"].length, northernIrelandLandRegistryTransferFees.length);
});

test("route metadata, crawlability, sitemap and structured data remain wired", () => {
  const routeSource = readFileSync("app/[slug]/page.tsx", "utf8");
  const metadataSource = readFileSync("lib/metadata.ts", "utf8");
  const sitemapSource = readFileSync("app/sitemap.ts", "utf8");
  const robotsSource = readFileSync("app/robots.txt/route.ts", "utf8");
  const templateSource = readFileSync("components/GuidePageTemplate.tsx", "utf8");

  assert.match(routeSource, /path: `\/\$\{guide\.slug\}`/);
  assert.doesNotMatch(routeSource, /noindex/i);
  assert.match(metadataSource, /alternates:\s*\{\s*canonical: url/);
  assert.match(sitemapSource, /guideSummaries\.map/);
  assert.match(robotsSource, /"Allow: \/"/);
  assert.match(templateSource, /articleSchema/);
  assert.match(templateSource, /faqPageSchema\(guide\.faqs\)/);
});

test("historical contextual backlinks are restored without duplicates", () => {
  const links = guideMap["stamp-duty-explained"].contextualLinks?.filter(
    (link) => link.href === `/${slug}`
  ) ?? [];
  assert.equal(links.length, 1, "Expected one backlink from stamp-duty-explained");

  const methodologySource = readFileSync("app/methodology/page.tsx", "utf8");
  assert.match(methodologySource, /href="\/land-registry-fees-uk"/);
});
