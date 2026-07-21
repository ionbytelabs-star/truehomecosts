import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  anyVanAffiliate,
  anyVanPlacementKeys,
  buildAnyVanDeepLink,
  getAnyVanGuidePlacements,
  getAnyVanPlacement,
  trackAnyVanAffiliateClick
} from "../lib/affiliates/anyvan";

const affiliateComponentSource = readFileSync("components/affiliates/AnyVanAffiliate.tsx", "utf8");
const calculatorSource = readFileSync("components/CalculatorForm.tsx", "utf8");
const guideTemplateSource = readFileSync("components/GuidePageTemplate.tsx", "utf8");
const cookiePolicySource = readFileSync("app/cookies/page.tsx", "utf8");

test("AnyVan Awin advertiser and publisher IDs are fixed", () => {
  assert.equal(anyVanAffiliate.advertiserId, 2673);
  assert.equal(anyVanAffiliate.publisherId, 2980359);
  assert.equal(
    buildAnyVanDeepLink("moving-costs-guide-inline"),
    "https://www.awin1.com/cread.php?awinmid=2673&awinaffid=2980359&clickref=moving-costs-guide-inline&ued=https%3A%2F%2Fwww.anyvan.com%2Fremovals"
  );
});

test("all AnyVan placements use unique required click references", () => {
  const references = anyVanPlacementKeys.map((key) => getAnyVanPlacement(key).clickReference);
  assert.equal(new Set(references).size, references.length);
  assert.deepEqual(new Set(references), new Set([
    "moving-costs-guide-inline",
    "moving-costs-guide-banner",
    "calculator-removals-result",
    "first-year-costs-removals",
    "hidden-costs-removals"
  ]));
});

test("affiliate links use the required rel, tab, accessibility and banner attributes", () => {
  assert.match(affiliateComponentSource, /sponsored nofollow noopener/);
  assert.match(affiliateComponentSource, /target="_blank"/);
  assert.match(affiliateComponentSource, /aria-label=/);
  assert.match(affiliateComponentSource, /width="300"/);
  assert.match(affiliateComponentSource, /height="250"/);
  assert.match(affiliateComponentSource, /loading="lazy"/);
  assert.match(affiliateComponentSource, /decoding="async"/);
  assert.match(affiliateComponentSource, /onError=\{\(\) => setImageLoaded\(false\)\}/);
  assert.match(affiliateComponentSource, /Compare removal quotes/);
  assert.match(affiliateComponentSource, /<img/);
  assert.doesNotMatch(affiliateComponentSource, /next\/image/);
  assert.equal(
    anyVanAffiliate.banner.href,
    "https://www.awin1.com/cread.php?s=2225524&v=2673&q=344445&r=2980359"
  );
  assert.equal(
    anyVanAffiliate.banner.imageSrc,
    "https://www.awin1.com/cshow.php?s=2225524&v=2673&q=344445&r=2980359"
  );
});

test("affiliate disclosure renders beside promotions and Awin is covered by policy", () => {
  assert.match(affiliateComponentSource, /Affiliate link: True Home Costs may earn a commission if you book, at no extra cost to you\./);
  assert.match(cookiePolicySource, /AnyVan affiliate links supplied through the Awin\s+affiliate network/);
  assert.match(cookiePolicySource, /30-day tracking period/);
});

test("GA4 affiliate click fires only from the click handler and respects analytics consent", () => {
  const events: unknown[][] = [];
  const originalWindow = globalThis.window;

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      location: { pathname: "/moving-costs-uk" },
      localStorage: {
        getItem: () => JSON.stringify({ analytics: false })
      },
      gtag: (...args: unknown[]) => events.push(args)
    }
  });

  trackAnyVanAffiliateClick("movingGuideInline");
  assert.equal(events.length, 0);

  Object.defineProperty(globalThis.window, "localStorage", {
    configurable: true,
    value: { getItem: () => JSON.stringify({ analytics: true }) }
  });
  trackAnyVanAffiliateClick("movingGuideInline");

  assert.deepEqual(events, [["event", "affiliate_click", {
    affiliate: "anyvan",
    click_reference: "moving-costs-guide-inline",
    page_path: "/moving-costs-uk",
    placement_type: "contextual_card",
    destination_url: "https://www.anyvan.com/removals"
  }]]);
  assert.match(affiliateComponentSource, /onClick=\{\(\) => trackAnyVanAffiliateClick\(placement\)\}/);

  Object.defineProperty(globalThis, "window", { configurable: true, value: originalWindow });
});

test("calculator placement is conditional on the moving result row", () => {
  assert.match(calculatorSource, /result\.breakdown\.some\(\(line\) => line\.key === "moving"\)/);
  assert.match(calculatorSource, /hasMovingCost[\s\S]*calculatorRemovalsResult/);
  assert.match(calculatorSource, /key: "moving"/);
});

test("guide placements are scoped to relevant sections and unrelated pages have none", () => {
  assert.deepEqual(getAnyVanGuidePlacements("/moving-costs-uk", "What moving costs include"), ["movingGuideInline"]);
  assert.deepEqual(getAnyVanGuidePlacements("/moving-costs-uk", "What can change the quotation"), ["movingGuideBanner"]);
  assert.deepEqual(getAnyVanGuidePlacements("/first-year-cost-buying-house-uk", "Four first-year cost scopes"), ["firstYearCostsRemovals"]);
  assert.deepEqual(getAnyVanGuidePlacements("/hidden-costs-buying-house", "Survey, mortgage and practical move-in costs"), ["hiddenCostsRemovals"]);
  assert.deepEqual(getAnyVanGuidePlacements("/stamp-duty-explained", "Registration is a separate charge"), []);
  assert.match(guideTemplateSource, /getAnyVanGuidePlacements/);
});

test("site security configuration does not block the remote Awin banner", () => {
  const nextConfig = readFileSync("next.config.ts", "utf8");
  const netlifyConfig = readFileSync("netlify.toml", "utf8");
  assert.doesNotMatch(`${nextConfig}\n${netlifyConfig}`, /Content-Security-Policy/i);
});
