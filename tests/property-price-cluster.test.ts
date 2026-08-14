import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

import { extraPriceGuides } from "../content/extra-price-guides";
import { guideMap, guideSummaries } from "../content/guides";
import {
  comparisonPropertyPrices,
  retainedPropertyPrices
} from "../content/price-guide-builder";
import {
  priceGuideSlugs,
  removedPriceGuideSlugs
} from "../lib/price-guide-links";

const expectedRetained = [
  "cost-to-buy-150k-house",
  "cost-to-buy-200k-house",
  "cost-to-buy-250k-house",
  "cost-to-buy-300k-house",
  "cost-to-buy-400k-house",
  "cost-to-buy-500k-house",
  "cost-to-buy-600k-house",
  "cost-to-buy-750k-house"
];

const expectedRemoved = [
  "cost-to-buy-225k-house",
  "cost-to-buy-275k-house",
  "cost-to-buy-325k-house",
  "cost-to-buy-350k-house",
  "cost-to-buy-375k-house",
  "cost-to-buy-425k-house",
  "cost-to-buy-450k-house",
  "cost-to-buy-475k-house"
];

function sourceFiles(root: string): string[] {
  if (!existsSync(root)) return [];

  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.(?:ts|tsx|txt)$/.test(entry.name) ? [path] : [];
  });
}

test("the comparison hub keeps all sixteen price points but only eight standalone guides", () => {
  assert.equal(comparisonPropertyPrices.length, 16);
  assert.deepEqual([...retainedPropertyPrices], [
    150_000,
    200_000,
    250_000,
    300_000,
    400_000,
    500_000,
    600_000,
    750_000
  ]);
  assert.deepEqual(priceGuideSlugs, expectedRetained);
  assert.deepEqual([...removedPriceGuideSlugs], expectedRemoved);

  const hubSource = readFileSync("app/house-buying-cost-by-property-price/page.tsx", "utf8");
  assert.match(hubSource, /comparisonPropertyPrices\.map\(getPriceGuideFacts\)/);
  assert.match(hubSource, /5% deposit/);
  assert.match(hubSource, /10% deposit/);
  assert.match(hubSource, /15% deposit/);
  assert.match(hubSource, /England \/ NI home mover/);
  assert.match(hubSource, /Scotland home mover/);
  assert.match(hubSource, /Wales home mover/);
});

test("retained guides exist and removed guides are not generated as content", () => {
  const summarySlugs = new Set(guideSummaries.map((guide) => guide.slug));

  for (const slug of expectedRetained) {
    assert.ok(guideMap[slug] ?? extraPriceGuides[slug], `Missing retained guide ${slug}`);
  }

  for (const slug of expectedRemoved) {
    assert.equal(guideMap[slug], undefined, `${slug} remains in the dynamic guide map`);
    assert.equal(extraPriceGuides[slug], undefined, `${slug} remains in the explicit guide map`);
    assert.ok(!summarySlugs.has(slug), `${slug} remains in sitemap-backed guide summaries`);
    assert.ok(!existsSync(`app/${slug}/page.tsx`), `${slug} still has an explicit page`);
  }
});

test("every removed route is configured as a permanent redirect to the comparison hub", () => {
  const redirectsSource = readFileSync("next.config.ts", "utf8");
  for (const slug of expectedRemoved) {
    assert.ok(redirectsSource.includes(`\"/${slug}\"`), `Missing redirect source for ${slug}`);
  }
  assert.match(redirectsSource, /destination: "\/house-buying-cost-by-property-price"/);
  assert.match(redirectsSource, /permanent: true/);
});

test("sitemap inputs contain the hub and retained pages but no redirecting URL", () => {
  const sitemapSource = readFileSync("app/sitemap.ts", "utf8");
  assert.match(sitemapSource, /"\/house-buying-cost-by-property-price"/);
  assert.match(sitemapSource, /priceGuideSlugs\.filter/);

  const publishedPriceSlugs = new Set([
    ...guideSummaries.map((guide) => guide.slug),
    ...priceGuideSlugs
  ]);
  for (const slug of expectedRetained) assert.ok(publishedPriceSlugs.has(slug));
  for (const slug of expectedRemoved) assert.ok(!publishedPriceSlugs.has(slug));
});

test("public content and internal-link sources do not point at redirected price guides", () => {
  const files = [
    ...sourceFiles("app"),
    ...sourceFiles("components"),
    ...sourceFiles("content"),
    ...sourceFiles("public"),
    ...sourceFiles("lib").filter((path) => !path.endsWith("price-guide-links.ts"))
  ];

  for (const file of files) {
    const source = readFileSync(file, "utf8");
    for (const slug of expectedRemoved) {
      assert.ok(!source.includes(`/${slug}`), `${file} still links to /${slug}`);
    }
  }
});

test("retained guides require distinct editorial section structures", () => {
  const guides = expectedRetained.map((slug) => guideMap[slug] ?? extraPriceGuides[slug]);
  const sectionSignatures = guides.map((guide) =>
    guide.sections.map((section) => section.title).join("|")
  );
  const directAnswers = guides.map((guide) => guide.directAnswer);

  assert.equal(new Set(sectionSignatures).size, guides.length);
  assert.equal(new Set(directAnswers).size, guides.length);
  for (const guide of guides) {
    assert.ok(guide.sections.length >= 3, `${guide.slug} needs substantive price-specific sections`);
  }
});
