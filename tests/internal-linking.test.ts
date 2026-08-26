import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { calculatorGuideLinks } from "../lib/calculator-guide-links";
import { guideMap } from "../content/guides";

const expectedCalculatorLinks = {
  "property-tax": ["/stamp-duty-explained", "Understand this property tax"],
  solicitors: ["/conveyancing-costs-uk", "See conveyancing cost details"],
  "mortgage-fees": ["/mortgage-fees-costs", "Understand mortgage fees"],
  "land-registry": ["/land-registry-fees-uk", "See registration fee details"],
  moving: ["/moving-costs-uk", "Plan moving costs"]
} as const;

test("calculator explanations link only the five decision-support cost lines", () => {
  assert.deepEqual(Object.keys(calculatorGuideLinks), Object.keys(expectedCalculatorLinks));

  for (const [key, [href, label]] of Object.entries(expectedCalculatorLinks)) {
    assert.deepEqual(calculatorGuideLinks[key], { href, label });
    assert.ok(guideMap[href.slice(1)], `Missing guide destination: ${href}`);
    assert.doesNotMatch(label, /click here/i);
  }

  assert.equal(
    new Set(Object.values(calculatorGuideLinks).map((link) => link?.href)).size,
    Object.keys(expectedCalculatorLinks).length
  );
});

test("calculator guide links render as crawlable hrefs with visible focus treatment", () => {
  const source = readFileSync("components/CostBreakdownTable.tsx", "utf8");
  assert.match(source, /<Link/);
  assert.match(source, /href=\{guideLink\.href\}/);
  assert.match(source, /focus-visible:ring-2/);
  assert.doesNotMatch(source, /onClick=|role="link"/);
});

test("the sticky sidebar no longer repeats the same related-guide destinations", () => {
  const source = readFileSync("components/GuidePageTemplate.tsx", "utf8");
  const sidebarSource = source.slice(source.indexOf("<aside"));

  assert.match(sidebarSource, />Calculator<\/p>/);
  assert.match(sidebarSource, />\s*Use the calculator\s*<\/Link>/);
  assert.doesNotMatch(sidebarSource, /combinedGuideLinks\.slice/);
  assert.match(source, /<RelatedGuides slugs=\{combinedGuideLinks\.slice\(0, 5\)\}/);
});
