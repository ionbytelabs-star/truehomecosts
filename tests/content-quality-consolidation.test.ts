import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

import { guideMap, guideSummaries } from "../content/guides";

const redirectedRoutes = {
  "/taxes-and-fees-uk": "/stamp-duty-explained",
  "/costs-after-exchange": "/costs-before-completion"
} as const;

function sourceFiles(root: string): string[] {
  if (!existsSync(root)) return [];
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name);
    return entry.isDirectory()
      ? sourceFiles(path)
      : /\.(?:ts|tsx|txt)$/.test(entry.name)
        ? [path]
        : [];
  });
}

test("both consolidated routes have permanent redirects and no standalone guide", () => {
  const source = readFileSync("next.config.ts", "utf8");

  for (const [from, to] of Object.entries(redirectedRoutes)) {
    assert.ok(source.includes(`source: "${from}"`));
    assert.ok(source.includes(`destination: "${to}"`));
    assert.equal(guideMap[from.slice(1)], undefined);
    assert.ok(!guideSummaries.some((entry) => entry.slug === from.slice(1)));
  }
});

test("merged destinations retain the useful content from both source intents", () => {
  const tax = JSON.stringify(guideMap["stamp-duty-explained"]);
  assert.match(tax, /SDLT/);
  assert.match(tax, /LBTT/);
  assert.match(tax, /LTT/);
  assert.match(tax, /Registration fees and other official charges/);
  assert.match(tax, /Council tax and later tax context/);
  assert.match(tax, /Official charges versus planning estimates/);

  const completion = JSON.stringify(guideMap["costs-before-completion"]);
  assert.match(completion, /Before an offer/);
  assert.match(completion, /Between exchange and completion/);
  assert.match(completion, /Completion day and the immediate move-in period/);
});

test("remaining priority guides have distinct, topic-specific editorial structures", () => {
  const expectations: Record<string, RegExp[]> = {
    "hidden-costs-buying-house": [/Search fees/, /Leasehold paperwork/, /post-completion/i],
    "how-much-money-needed-buy-house": [/Minimum completion cash/, /emergency reserve/i],
    "first-time-buyer-costs": [/relief, thresholds and UK differences/i, /Lifetime ISA/i],
    "moving-costs-uk": [/DIY moving and van-hire/, /Packing services, storage/],
    "insurance-costs-uk": [/Rebuild value, contents cover/, /Landlord insurance/],
    "furnishing-costs-uk": [/Room-by-room essentials/, /new versus used/i],
    "first-year-cost-buying-house-uk": [/Months 1-3/, /Rest of year one/]
  };

  const signatures: string[] = [];
  for (const [slug, patterns] of Object.entries(expectations)) {
    const guide = guideMap[slug];
    const content = JSON.stringify(guide);
    for (const pattern of patterns) assert.match(content, pattern, `${slug} missing ${pattern}`);
    signatures.push(guide.sections.map((section) => section.title).join("|"));
  }
  assert.equal(new Set(signatures).size, signatures.length);
});

test("internal content does not link to either redirected route", () => {
  const files = [
    ...sourceFiles("app"),
    ...sourceFiles("components"),
    ...sourceFiles("content"),
    ...sourceFiles("lib"),
    ...sourceFiles("public")
  ];

  for (const file of files) {
    const source = readFileSync(file, "utf8");
    for (const from of Object.keys(redirectedRoutes)) {
      assert.ok(!source.includes(`href: "${from}"`), `${file} links to ${from}`);
      assert.ok(!source.includes(`href=\"${from}\"`), `${file} links to ${from}`);
    }
  }
});

test("sitemap excludes redirected routes, calculator updates and llms.txt", () => {
  const source = readFileSync("app/sitemap.ts", "utf8");
  assert.ok(!source.includes('"/calculator-updates"'));
  assert.ok(!source.includes('"/llms.txt"'));
  assert.ok(!guideSummaries.some((entry) => entry.slug === "taxes-and-fees-uk"));
  assert.ok(!guideSummaries.some((entry) => entry.slug === "costs-after-exchange"));
});

test("calculator updates is noindex follow without a robots block", () => {
  const source = readFileSync("app/calculator-updates/page.tsx", "utf8");
  const robots = readFileSync("app/robots.txt/route.ts", "utf8");
  assert.match(source, /robots:\s*\{[\s\S]*?index: false,[\s\S]*?follow: true/);
  assert.doesNotMatch(robots, /calculator-updates/);
});

test("privacy accurately describes implemented AdSense technology", () => {
  const source = readFileSync("app/privacy/page.tsx", "utf8");
  assert.match(source, /Last updated: 14 August 2026/);
  assert.match(source, /implemented Google AdSense technology/);
  assert.match(source, /approval, account status and available advertising inventory/);
  assert.match(source, /consent choices where consent is required/);
});
