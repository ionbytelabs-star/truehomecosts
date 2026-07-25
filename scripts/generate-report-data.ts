import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import {
  generateHomeBuyingReport,
  serializeHomeBuyingReportChartSvg,
  serializeHomeBuyingReportCsv,
  serializeHomeBuyingReportJson
} from "../lib/report-data";

const outputDirectory = resolve(process.cwd(), "public", "data");
const report = generateHomeBuyingReport();

mkdirSync(outputDirectory, { recursive: true });
writeFileSync(
  resolve(outputDirectory, "true-cost-buying-home-uk-2026.csv"),
  serializeHomeBuyingReportCsv(report),
  "utf8"
);
writeFileSync(
  resolve(outputDirectory, "true-cost-buying-home-uk-2026.json"),
  serializeHomeBuyingReportJson(report),
  "utf8"
);
writeFileSync(
  resolve(outputDirectory, "true-cost-buying-home-uk-2026-home-mover.svg"),
  serializeHomeBuyingReportChartSvg(report),
  "utf8"
);

console.log(`Generated ${report.basis.scenarioCount} report scenarios in ${outputDirectory}`);
