import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import { defaultCalculatorInput } from "../lib/default-calculator-input";
import {
  generateHomeBuyingReport,
  homeBuyingReportBuyerTypes,
  homeBuyingReportJurisdictions,
  homeBuyingReportPrices,
  serializeHomeBuyingReportChartSvg,
  serializeHomeBuyingReportCsv,
  serializeHomeBuyingReportJson
} from "../lib/report-data";

const report = generateHomeBuyingReport();
const reportPagePath = "app/reports/true-cost-buying-home-uk-2026/page.tsx";
const pressPagePath = "app/press-and-data/page.tsx";
const embedPagePath = "app/embed/calculator/page.tsx";
const csvPath = "public/data/true-cost-buying-home-uk-2026.csv";
const jsonPath = "public/data/true-cost-buying-home-uk-2026.json";
const chartPath = "public/data/true-cost-buying-home-uk-2026-home-mover.svg";

test("report scenarios cover every requested price, jurisdiction and buyer type", () => {
  assert.equal(
    report.scenarios.length,
    homeBuyingReportPrices.length *
      homeBuyingReportJurisdictions.length *
      homeBuyingReportBuyerTypes.length
  );
  assert.equal(report.scenarios.length, 156);

  for (const price of homeBuyingReportPrices) {
    for (const jurisdiction of homeBuyingReportJurisdictions) {
      for (const buyerType of homeBuyingReportBuyerTypes) {
        assert.ok(
          report.scenarios.some(
            (scenario) =>
              scenario.propertyPriceGbp === price &&
              scenario.jurisdiction === jurisdiction &&
              scenario.buyerType === buyerType
          ),
          `Missing ${price}, ${jurisdiction}, ${buyerType}`
        );
      }
    }
  }
});

test("report configuration inherits central calculator defaults", () => {
  assert.equal(report.basis.assumptionLevel, defaultCalculatorInput.assumptionLevel);
  assert.equal(report.basis.depositPercentage, defaultCalculatorInput.depositPercentage);
  assert.equal(report.basis.includedAllowances.moving, defaultCalculatorInput.includeMoving);
  assert.equal(report.basis.includedAllowances.insurance, defaultCalculatorInput.includeInsurance);
  assert.equal(
    report.basis.includedAllowances.furnishingSetup,
    defaultCalculatorInput.includeFurnishing
  );
  assert.equal(
    report.basis.includedAllowances.contingency,
    defaultCalculatorInput.includeContingency
  );
  assert.equal(
    report.basis.includedAllowances.contingencyPercentage,
    defaultCalculatorInput.contingencyPercentage
  );
});

test("every report total equals its separated cost fields", () => {
  for (const scenario of report.scenarios) {
    const { totalUpfrontCash, ...costs } = scenario.amountsGbp;
    assert.equal(
      totalUpfrontCash,
      Object.values(costs).reduce((sum, value) => sum + value, 0),
      scenario.id
    );
    assert.equal(scenario.classifications.propertyTax, "official-calculation");
    assert.notEqual(scenario.classifications.legalFees, "official-charge");
  }
});

test("CSV and JSON serialisers expose a reusable, journalist-friendly shape", () => {
  const csv = serializeHomeBuyingReportCsv(report);
  const csvLines = csv.trim().split(/\r?\n/);
  assert.equal(csvLines.length, report.scenarios.length + 1);
  assert.match(csvLines[0], /property_price_gbp/);
  assert.match(csvLines[0], /property_tax_basis/);
  assert.match(csvLines[0], /total_upfront_cash_gbp/);

  const json = JSON.parse(serializeHomeBuyingReportJson(report)) as typeof report;
  assert.equal(json.basis.scenarioCount, 156);
  assert.equal(json.scenarios.length, 156);
  assert.equal(json.report.currency, "GBP");
});

test("committed downloads are generated from the reusable report layer", () => {
  for (const path of [csvPath, jsonPath, chartPath]) assert.ok(existsSync(path), `Missing ${path}`);
  assert.equal(readFileSync(csvPath, "utf8"), serializeHomeBuyingReportCsv(report));
  assert.equal(readFileSync(jsonPath, "utf8"), serializeHomeBuyingReportJson(report));
  assert.equal(readFileSync(chartPath, "utf8"), serializeHomeBuyingReportChartSvg(report));
});

test("new routes, canonical metadata, sitemap entries and iframe code are present", () => {
  for (const path of [reportPagePath, pressPagePath, embedPagePath]) {
    assert.ok(existsSync(path), `Missing ${path}`);
  }

  const reportPage = readFileSync(reportPagePath, "utf8");
  const pressPage = readFileSync(pressPagePath, "utf8");
  const sitemap = readFileSync("app/sitemap.ts", "utf8");

  assert.match(reportPage, /path = "\/reports\/true-cost-buying-home-uk-2026"/);
  assert.match(pressPage, /path = "\/press-and-data"/);
  assert.match(
    pressPage,
    /https:\/\/truehomecosts\.co\.uk\/embed\/calculator/
  );
  assert.match(sitemap, /\/reports\/true-cost-buying-home-uk-2026/);
  assert.match(sitemap, /\/press-and-data/);
});

test("new public pages use brand attribution and contain no personal identity", () => {
  const publicSources = [
    reportPagePath,
    pressPagePath,
    embedPagePath,
    "components/EmbedCalculator.tsx"
  ]
    .map((path) => readFileSync(path, "utf8"))
    .join("\n");

  assert.match(publicSources, /True Home Costs/);
  assert.doesNotMatch(publicSources, /Paul Addison/i);
});
