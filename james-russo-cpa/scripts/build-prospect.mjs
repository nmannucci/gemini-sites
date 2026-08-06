#!/usr/bin/env node
/**
 * Build the CPA template from one prospect JSON file.
 *
 * Usage:
 *   node scripts/build-prospect.mjs path/to/prospect.json --out path/to/output
 *   node scripts/build-prospect.mjs --allow-demo
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
const defaultProspectPath = join(root, "src/data/prospect.json");
const args = process.argv.slice(2);
const allowDemo = args.includes("--allow-demo");
const outIndex = args.indexOf("--out");
const outArg = outIndex === -1 ? null : args[outIndex + 1];
const outDir = outArg && !outArg.startsWith("--") ? resolve(outArg) : null;
const inputArg = args.find((arg, index) => !arg.startsWith("--") && index !== outIndex + 1);
const sourcePath = inputArg ? resolve(inputArg) : defaultProspectPath;

const fail = (message) => {
  console.error(`\n✗ ${message}`);
  process.exit(1);
};

if (outIndex !== -1 && !outDir) fail("--out requires a directory path");
if (!existsSync(sourcePath)) fail(`No prospect file at ${sourcePath}`);

let data;
try {
  data = JSON.parse(readFileSync(sourcePath, "utf8"));
} catch (error) {
  fail(`Could not parse ${sourcePath}: ${error.message}`);
}

const errors = [];
const requireString = (key) => {
  if (typeof data[key] !== "string" || !data[key].trim()) errors.push(`${key} must be a non-empty string`);
};

[
  "business_name",
  "business_phone",
  "business_email",
  "hours_of_operation",
  "address",
  "service_area"
].forEach(requireString);

for (const [key, max] of [["service_areas", 8], ["services_offered", 10]]) {
  const value = data[key];
  if (!Array.isArray(value) || value.length < 1 || value.length > max || value.some((item) => typeof item !== "string" || !item.trim())) {
    errors.push(`${key} must be an array of 1-${max} non-empty strings`);
  }
}

if (!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(data.primary_brand_color || "")) {
  errors.push("primary_brand_color must be a hex color such as #345a46");
}

if (typeof data.logo !== "string") errors.push('logo must be a string (use "" for the initials fallback)');
if (data.testimonials !== undefined && (
  !Array.isArray(data.testimonials)
  || data.testimonials.length > 3
  || data.testimonials.some((item) => !item || typeof item.quote !== "string" || !item.quote.trim() || typeof item.name !== "string" || !item.name.trim())
)) errors.push("testimonials must be an array of up to 3 objects with non-empty quote and name values");

for (const key of ["credentials", "client_types"]) {
  if (data[key] !== undefined && (!Array.isArray(data[key]) || data[key].some((item) => typeof item !== "string" || !item.trim()))) {
    errors.push(`${key} must be an array of non-empty strings`);
  }
}

if (data.year_founded !== undefined && data.year_founded !== null && (!Number.isInteger(data.year_founded) || data.year_founded < 1800 || data.year_founded > new Date().getFullYear())) {
  errors.push("year_founded must be a valid year or null");
}

let localLogoSource = null;
let localLogoOutput = null;
if (typeof data.logo === "string" && data.logo.trim() && !/^https?:\/\//.test(data.logo)) {
  const publicCandidate = join(root, "public", data.logo.replace(/^\//, ""));
  if (!existsSync(publicCandidate)) {
    const sourceCandidate = resolve(dirname(sourcePath), data.logo.replace(/^\/+/, ""));
    if (!existsSync(sourceCandidate) || !statSync(sourceCandidate).isFile()) {
      errors.push(`logo "${data.logo}" is not a URL, an existing public asset, or a file relative to the prospect JSON`);
    } else {
      const extension = extname(sourceCandidate).toLowerCase();
      if (![".svg", ".png", ".jpg", ".jpeg", ".webp", ".gif"].includes(extension)) {
        errors.push(`logo file must be SVG, PNG, JPG, WebP, or GIF (received ${extension || "no extension"})`);
      } else {
        localLogoSource = sourceCandidate;
        localLogoOutput = `prospect-logo${extension}`;
        data.logo = `/assets/brand/${localLogoOutput}`;
      }
    }
  }
}

if (errors.length) fail(`Invalid prospect data:\n  - ${errors.join("\n  - ")}`);

const isDemo = data.business_name === "Ledger & Oak Accounting";
if (isDemo && !allowDemo) {
  fail("The prospect file still contains the Ledger & Oak demo. Supply a real prospect JSON or use --allow-demo intentionally.");
}

const warnings = [];
if (!data.form_endpoint) warnings.push("form_endpoint is empty — the inquiry form remains in demo mode");
if (!data.testimonials?.length) warnings.push("no testimonials provided — the testimonial section is omitted");
if (!data.site_url) warnings.push("site_url is empty — canonical and social URLs are omitted");
if (data.demo_mode !== false) warnings.push("demo_mode is enabled — search engines receive noindex, nofollow");

const tempRoot = mkdtempSync(join(tmpdir(), "house36-cpa-build-"));
const installedProspectPath = join(tempRoot, "prospect.json");
const buildDir = join(tempRoot, "dist");
writeFileSync(installedProspectPath, `${JSON.stringify(data, null, 2)}\n`);

console.log(`→ Building ${data.business_name} from ${sourcePath}…`);
const astroCli = join(root, "node_modules/astro/astro.js");
if (!existsSync(astroCli)) fail("Astro is not installed. Run pnpm install before building a prospect.");
execFileSync(process.execPath, [astroCli, "build", "--outDir", buildDir], {
  cwd: root,
  env: { ...process.env, HOUSE36_CPA_PROSPECT_PATH: installedProspectPath },
  stdio: "inherit"
});

if (localLogoSource && localLogoOutput) {
  const brandDir = join(buildDir, "assets/brand");
  mkdirSync(brandDir, { recursive: true });
  copyFileSync(localLogoSource, join(brandDir, localLogoOutput));
}

const htmlFiles = [];
const walk = (directory) => {
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith(".html")) htmlFiles.push(path);
  }
};
walk(buildDir);

if (!isDemo) {
  const markers = [
    "Ledger & Oak Accounting",
    "(555) 014-0286",
    "hello@ledgerandoak.com",
    "214 Market Street",
    "Franklin, TN 37064"
  ];
  const leaks = [];
  for (const file of htmlFiles) {
    const html = readFileSync(file, "utf8");
    for (const marker of markers) if (html.includes(marker)) leaks.push(`${file}: ${marker}`);
    if (/\{\{[a-z_]+\}\}/i.test(html)) leaks.push(`${file}: unresolved template placeholder`);
  }
  if (leaks.length) fail(`Demo data leaked into the prospect build:\n  - ${leaks.join("\n  - ")}`);
}

const finalDir = outDir || join(root, "dist");
if (finalDir === root || finalDir === dirname(root) || finalDir === dirname(dirname(root))) {
  fail("Refusing to use the template directory or one of its parents as the output directory");
}

rmSync(finalDir, { recursive: true, force: true });
cpSync(buildDir, finalDir, { recursive: true });
rmSync(tempRoot, { recursive: true, force: true });

console.log(`→ Copied verified build to ${finalDir}`);
console.log(`\n✓ Built ${htmlFiles.length} pages for ${data.business_name}`);
warnings.forEach((warning) => console.log(`  ⚠ ${warning}`));
