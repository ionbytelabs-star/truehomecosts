import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const renderedSourceRoots = ["app", "components", "content", "lib"];
const renderedSourceExtensions = new Set([".css", ".js", ".jsx", ".ts", ".tsx"]);
const forbiddenPlaceholderText = [
  ["Mid-content ad", "placeholder"].join(" "),
  ["Reserved space", "only"].join(" "),
  ["No ad scripts", "loaded"].join(" "),
  ["Ad", "placeholder"].join(" "),
  ["Advertisement", "placeholder"].join(" "),
  ["Ad", "slot"].join(" "),
  ["Reserved for", "advertising"].join(" ")
];

function collectRenderedSourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) return collectRenderedSourceFiles(entryPath);
    return renderedSourceExtensions.has(path.extname(entry.name)) ? [entryPath] : [];
  });
}

test("inactive advertising placeholders stay out of rendered source", () => {
  const files = renderedSourceRoots.flatMap(collectRenderedSourceFiles);

  for (const file of files) {
    const source = readFileSync(file, "utf8");

    for (const wording of forbiddenPlaceholderText) {
      assert.ok(!source.toLowerCase().includes(wording.toLowerCase()), `${file} contains ${wording}`);
    }

    assert.doesNotMatch(source, /\bAdPlaceholder\b/, `${file} renders the retired placeholder component`);
  }
});

test("retired advertising placeholder component is not present", () => {
  assert.equal(existsSync("components/AdPlaceholder.tsx"), false);
});

test("shared guide template skips the intro wrapper when its content arrays are empty", () => {
  const templateSource = readFileSync("components/GuidePageTemplate.tsx", "utf8");

  assert.match(
    templateSource,
    /const hasIntroContent = Boolean\(guide\.introSections\?\.length \|\| guide\.contextualLinks\?\.length\)/
  );
  assert.match(templateSource, /\{hasIntroContent \? \(/);
});
