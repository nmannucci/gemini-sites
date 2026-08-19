#!/usr/bin/env node
/**
 * Build the baseball-trainer template for a prospect.
 *
 * Usage:
 *   node scripts/build-prospect.mjs [path/to/prospect.json] [--out <dir>] [--allow-defaults]
 *
 * With no JSON path, builds whatever is in src/data/prospect.json.
 * Fails the build if template placeholder data leaks into dist/
 * (pass --allow-defaults to intentionally build the Summit demo).
 */
import { execFileSync } from "node:child_process";
import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const prospectPath = join(root, "src/data/prospect.json");

const args = process.argv.slice(2);
const allowDefaults = args.includes("--allow-defaults");
const outIndex = args.indexOf("--out");
const outValue = outIndex !== -1 ? args[outIndex + 1] : null;
const outDir = outValue && !outValue.startsWith("--") ? resolve(outValue) : null;
const inputPath = args.find((a, i) => !a.startsWith("--") && (outIndex === -1 || i !== outIndex + 1));

const fail = (msg) => {
  console.error(`\n✗ ${msg}`);
  process.exit(1);
};

if (outIndex !== -1 && !outDir) fail("--out requires a directory path");

// --- 1. Load and validate the prospect JSON ---
const sourcePath = inputPath ? resolve(inputPath) : prospectPath;
if (!existsSync(sourcePath)) fail(`No prospect file at ${sourcePath}`);

let data;
try {
  data = JSON.parse(readFileSync(sourcePath, "utf8"));
} catch (e) {
  fail(`Could not parse ${sourcePath}: ${e.message}`);
}

const errors = [];
const requireString = (key) => {
  if (typeof data[key] !== "string" || !data[key].trim()) errors.push(`${key} must be a non-empty string`);
};
["business_name", "business_phone", "business_email", "hours_of_operation", "address", "service_area"].forEach(requireString);

for (const key of ["service_areas", "services_offered"]) {
  const v = data[key];
  if (!Array.isArray(v) || v.length < 1 || v.length > 6 || v.some((x) => typeof x !== "string" || !x.trim())) {
    errors.push(`${key} must be an array of 1-6 non-empty strings`);
  }
}
if (!/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(data.primary_brand_color ?? "")) {
  errors.push("primary_brand_color must be a hex color like #123c7c");
}
let localLogoSource = null;
let localLogoOutput = null;
if (typeof data.logo !== "string") {
  errors.push('logo must be a string (use "" for the initials fallback)');
} else if (data.logo.trim() && !/^https?:\/\//.test(data.logo)) {
  const publicCandidate = join(root, "public", data.logo.replace(/^\//, ""));
  if (!existsSync(publicCandidate)) {
    const sourceCandidate = resolve(dirname(sourcePath), data.logo.replace(/^\/+/, ""));
    if (!existsSync(sourceCandidate) || !statSync(sourceCandidate).isFile()) {
      errors.push(`logo "${data.logo}" is not a URL, a public asset, or a file relative to the prospect JSON`);
    } else {
      const extension = extname(sourceCandidate).toLowerCase();
      const allowedLogoTypes = new Set([".svg", ".png", ".jpg", ".jpeg", ".webp", ".gif"]);
      if (!allowedLogoTypes.has(extension)) {
        errors.push(`logo file must be SVG, PNG, JPG, WebP, or GIF (received ${extension || "no extension"})`);
      } else {
        localLogoSource = sourceCandidate;
        localLogoOutput = `prospect-logo${extension}`;
        data.logo = `/assets/brand/${localLogoOutput}`;
      }
    }
  }
}
if (data.testimonials !== undefined) {
  const t = data.testimonials;
  if (!Array.isArray(t) || t.length > 3 || t.some((x) => !x || typeof x.quote !== "string" || !x.quote.trim() || typeof x.name !== "string" || !x.name.trim())) {
    errors.push("testimonials must be an array of up to 3 objects with non-empty quote and name");
  }
}
if (errors.length) fail(`Invalid prospect data:\n  - ${errors.join("\n  - ")}`);

const warnings = [];
if (!data.testimonials?.length) warnings.push("no testimonials provided — the homepage testimonial section is omitted (check their Google Business Profile and website for real reviews first)");
if (!data.form_endpoint) warnings.push("form_endpoint is empty — the lead form will not submit anywhere");
if (data.demo_mode === false) warnings.push("demo_mode is false — pages will be indexable (only intended for production hosting)");
if (!data.site_url) warnings.push("site_url is empty — og:image link previews will be skipped");

// --- 2. Build from an isolated prospect file and output directory ---
const tempRoot = mkdtempSync(join(tmpdir(), "house36-baseball-build-"));
const installedProspectPath = join(tempRoot, "prospect.json");
const buildDir = join(tempRoot, "dist");
writeFileSync(installedProspectPath, JSON.stringify(data, null, 2) + "\n");

console.log(`→ Building from ${sourcePath} in an isolated workspace…`);
const npmExecPath = process.env.npm_execpath;
if (npmExecPath) {
  execFileSync(process.execPath, [npmExecPath, "run", "build", "--", "--outDir", buildDir], {
    cwd: root,
    env: { ...process.env, HOUSE36_PROSPECT_PATH: installedProspectPath },
    stdio: "inherit"
  });
} else {
  execFileSync("npm", ["run", "build", "--", "--outDir", buildDir], {
    cwd: root,
    env: { ...process.env, HOUSE36_PROSPECT_PATH: installedProspectPath },
    stdio: "inherit"
  });
}

if (localLogoSource && localLogoOutput) {
  const brandDir = join(buildDir, "assets/brand");
  mkdirSync(brandDir, { recursive: true });
  copyFileSync(localLogoSource, join(brandDir, localLogoOutput));
}

// --- 3. QA guard: no template placeholder data may leak into a real prospect build ---
const DEFAULT_MARKERS = [
  "Summit Baseball Academy",
  "(555) 214-4500",
  "555) 214-4500",
  "training@summitbaseball.com",
  "1240 Diamond Way",
  "Jenna Kowalczyk",
  "Marcus Trewhitt",
  "Dana Okafor-Ellis"
];
const isDefaultBuild = data.business_name === "Summit Baseball Academy";
if (isDefaultBuild && !allowDefaults) {
  fail("prospect.json still contains the Summit Baseball Academy template defaults.\n  Fill in real prospect data, or pass --allow-defaults to build the demo on purpose.");
}

const htmlFiles = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name.endsWith(".html")) htmlFiles.push(p);
  }
};
walk(buildDir);

if (!isDefaultBuild) {
  const leaks = [];
  for (const file of htmlFiles) {
    const html = readFileSync(file, "utf8");
    for (const marker of DEFAULT_MARKERS) {
      if (html.includes(marker)) leaks.push(`${file.replace(root + "/", "")}: "${marker}"`);
    }
    if (/\{\{[a-z_]+\}\}/i.test(html)) leaks.push(`${file.replace(root + "/", "")}: unresolved {{placeholder}}`);
  }
  if (leaks.length) fail(`Template placeholder data leaked into the build:\n  - ${leaks.join("\n  - ")}`);
}

// --- 4. Copy the verified build to the requested destination ---
const finalDir = outDir ?? join(root, "dist");
if (finalDir === root || finalDir === dirname(root)) fail("refusing to use the template directory or its parent as --out");
rmSync(finalDir, { recursive: true, force: true });
cpSync(buildDir, finalDir, { recursive: true });
rmSync(tempRoot, { recursive: true, force: true });
console.log(`→ Copied verified build to ${finalDir}`);

console.log(`\n✓ Built ${htmlFiles.length} pages for ${data.business_name}`);
warnings.forEach((w) => console.log(`  ⚠ ${w}`));
console.log(`\nNext: publish ${finalDir} to here.now.`);
