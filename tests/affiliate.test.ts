import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  affiliatePlacementKeys,
  affiliates,
  buildAffiliateDeepLink,
  getAffiliateGuidePlacements,
  getAffiliatePlacement,
  trackAffiliateClick,
  validateClickReference
} from "../lib/affiliates/config";

const affiliateComponentSource = readFileSync("components/affiliates/Affiliate.tsx", "utf8");
const affiliateConfigSource = readFileSync("lib/affiliates/config.ts", "utf8");
const calculatorSource = readFileSync("components/CalculatorForm.tsx", "utf8");
const guideTemplateSource = readFileSync("components/GuidePageTemplate.tsx", "utf8");
const cookiePolicySource = readFileSync("app/cookies/page.tsx", "utf8");
const privacyPolicySource = readFileSync("app/privacy/page.tsx", "utf8");

test("Awin advertiser and publisher IDs and destinations are fixed", () => {
  assert.equal(affiliates.anyvan.advertiserId, 2673);
  assert.equal(affiliates.safestore.advertiserId, 5915);
  assert.equal(affiliates.anyvan.publisherId, 2980359);
  assert.equal(affiliates.safestore.publisherId, 2980359);
  assert.equal(affiliates.anyvan.destinationUrl, "https://www.anyvan.com/removals");
  assert.equal(affiliates.safestore.destinationUrl, "https://www.safestore.co.uk/storage-types/personal-storage/");
  assert.equal(
    buildAffiliateDeepLink("anyvan", "moving-costs-guide-anyvan-card"),
    "https://www.awin1.com/cread.php?awinmid=2673&awinaffid=2980359&clickref=moving-costs-guide-anyvan-card&ued=https%3A%2F%2Fwww.anyvan.com%2Fremovals"
  );
  assert.equal(
    buildAffiliateDeepLink("safestore", "moving-costs-guide-safestore-card"),
    "https://www.awin1.com/cread.php?awinmid=5915&awinaffid=2980359&clickref=moving-costs-guide-safestore-card&ued=https%3A%2F%2Fwww.safestore.co.uk%2Fstorage-types%2Fpersonal-storage%2F"
  );
});

test("click references are unique, non-empty and safely validated", () => {
  const references = affiliatePlacementKeys.map((key) => getAffiliatePlacement(key).clickReference);
  assert.equal(new Set(references).size, references.length);
  assert.ok(references.every((reference) => reference.length > 0));
  assert.throws(() => validateClickReference(""));
  assert.throws(() => validateClickReference("Invalid reference"));
  assert.throws(() => buildAffiliateDeepLink("anyvan", "bad/reference"));
});

test("affiliate links, image banner and iframe banner use the required safe markup", () => {
  assert.match(affiliateConfigSource, /sponsored nofollow noopener/);
  assert.match(affiliateComponentSource, /target="_blank"/);
  assert.match(affiliateComponentSource, /aria-label=/);
  assert.match(affiliateComponentSource, /width="300"/);
  assert.match(affiliateComponentSource, /height="250"/);
  assert.match(affiliateComponentSource, /loading="lazy"/);
  assert.match(affiliateComponentSource, /decoding="async"/);
  assert.match(affiliateComponentSource, /frameBorder="0"/);
  assert.match(affiliateComponentSource, /scrolling="no"/);
  assert.match(affiliateComponentSource, /title=\{banner.title\}/);
  assert.match(affiliateComponentSource, /<img/);
  assert.doesNotMatch(affiliateComponentSource, /next\/image/);
  assert.equal(affiliates.anyvan.banner.href, "https://www.awin1.com/cread.php?s=2225524&v=2673&q=344445&r=2980359");
  assert.equal(affiliates.anyvan.banner.imageSrc, "https://www.awin1.com/cshow.php?s=2225524&v=2673&q=344445&r=2980359");
  assert.equal(affiliates.safestore.banner.src, "https://www.awin1.com/cawshow.php?v=5915&s=2283216&q=350988&r=2980359&iframe=1");
  assert.equal(affiliates.safestore.banner.title, "Safestore personal storage offer");
});

test("affiliate disclosure renders beside promotions and policies cover Awin, AnyVan and Safestore", () => {
  assert.match(affiliateConfigSource, /Affiliate link: True Home Costs may earn a commission if you book, at no extra cost to you\./);
  assert.match(cookiePolicySource, /AnyVan or Safestore affiliate links supplied through\s+the Awin affiliate network/);
  assert.match(cookiePolicySource, /30-day tracking period/);
  assert.match(privacyPolicySource, /AnyVan or\s+Safestore through the Awin affiliate network/);
});

test("GA4 affiliate click fires only from the click handler and respects analytics consent", () => {
  const events: unknown[][] = [];
  const originalWindow = globalThis.window;

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      location: { pathname: "/moving-costs-uk" },
      localStorage: { getItem: () => JSON.stringify({ analytics: false }) },
      gtag: (...args: unknown[]) => events.push(args)
    }
  });

  trackAffiliateClick("movingGuideAnyVanCard");
  assert.equal(events.length, 0);

  Object.defineProperty(globalThis.window, "localStorage", {
    configurable: true,
    value: { getItem: () => JSON.stringify({ analytics: true }) }
  });
  trackAffiliateClick("movingGuideSafestoreCard");

  assert.deepEqual(events, [["event", "affiliate_click", {
    affiliate_name: "safestore",
    advertiser_id: 5915,
    click_reference: "moving-costs-guide-safestore-card",
    page_path: "/moving-costs-uk",
    placement_type: "recommendation_card",
    destination_url: "https://www.safestore.co.uk/storage-types/personal-storage/"
  }]]);
  assert.match(affiliateComponentSource, /onClick=\{\(\) => trackAffiliateClick\(placement\)\}/);

  Object.defineProperty(globalThis, "window", { configurable: true, value: originalWindow });
});

test("calculator placement is limited to a relevant moving result", () => {
  assert.match(calculatorSource, /result\.breakdown\.some\(\(line\) => line\.key === "moving"\)/);
  assert.match(calculatorSource, /hasMovingCost[\s\S]*calculatorAnyVanRemovals/);
  assert.match(calculatorSource, /key: "moving"/);
  assert.doesNotMatch(calculatorSource, /calculatorSafestoreStorage/);
});

test("guide placements are scoped to removal, storage and completion-delay content", () => {
  assert.deepEqual(getAffiliateGuidePlacements("/moving-costs-uk", "What moving costs include"), [
    "movingGuideAnyVanCard",
    "movingGuideSafestoreCard"
  ]);
  assert.deepEqual(getAffiliateGuidePlacements("/moving-costs-uk", "What can change the quotation"), ["movingGuideAnyVanBanner"]);
  assert.deepEqual(getAffiliateGuidePlacements("/first-year-cost-buying-house-uk", "Four first-year cost scopes"), [
    "firstYearAnyVan",
    "firstYearSafestore"
  ]);
  assert.deepEqual(getAffiliateGuidePlacements("/hidden-costs-buying-new-build-home-uk", "New build delays and temporary costs"), ["newBuildSafestoreDelays"]);
  assert.deepEqual(getAffiliateGuidePlacements("/hidden-costs-buying-new-build-home-uk", "Moving and first-year ownership costs"), ["newBuildAnyVanMoving"]);
  assert.deepEqual(getAffiliateGuidePlacements("/stamp-duty-explained", "Registration is a separate charge"), []);
  assert.match(guideTemplateSource, /getAffiliateGuidePlacements/);
  assert.match(guideTemplateSource, /AffiliateRecommendationGroup/);
});

test("site security configuration does not block the required Awin host", () => {
  const nextConfig = readFileSync("next.config.ts", "utf8");
  const netlifyConfig = readFileSync("netlify.toml", "utf8");
  assert.doesNotMatch(`${nextConfig}\n${netlifyConfig}`, /Content-Security-Policy/i);
});
