import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("builds the branded homepage with verified contact details", async () => {
  const html = await readFile(new URL("../dist/client/index.html", import.meta.url), "utf8");
  assert.match(html, /James J\. Russo, CPA/);
  assert.match(html, /Trusted San Francisco tax preparation/);
  assert.match(html, /\(415\) 759-5086/);
  assert.match(html, /jamesjrusso@gmail\.com/);
  assert.match(html, /Middle Sunset/);
  assert.match(html, /james-russo-headshot\.jpg/);
  assert.match(html, /Google Map of Middle Sunset, San Francisco/);
  assert.match(html, /google\.com\/maps\?q=Middle%20Sunset/);
  assert.match(html, /Send a confidential note/);
  assert.match(html, /href="\/contact\/"[^>]*>Contact<\/a>/);
  assert.match(html, /Please do not include Social Security numbers/);
  assert.doesNotMatch(html, /Ledger & Oak|Sample Client|120\+ client reviews|noindex/i);
});

test("uses matched imagery across the Who Jim serves cards", async () => {
  const html = await readFile(new URL("../dist/client/index.html", import.meta.url), "utf8");
  const cardImages = [
    "/assets/james-russo/who-small-business.webp",
    "/assets/james-russo/who-real-estate.webp",
    "/assets/james-russo/who-high-income.webp",
    "/assets/james-russo/who-technology.webp",
    "/assets/james-russo/who-retirement.webp",
  ];

  for (const image of cardImages) assert.ok(html.includes(image));
  assert.match(html, /href="\/who-we-help\/high-income-individuals\/"/);
  assert.match(html, /Primarily San Francisco, Marin, and San Mateo Counties/);
});

test("builds the audience hub and distinct high-income guidance page", async () => {
  await Promise.all([
    access(new URL("../dist/client/who-we-help/index.html", import.meta.url)),
    access(new URL("../dist/client/who-we-help/high-income-individuals/index.html", import.meta.url)),
  ]);

  const hub = await readFile(new URL("../dist/client/who-we-help/index.html", import.meta.url), "utf8");
  const highIncome = await readFile(new URL("../dist/client/who-we-help/high-income-individuals/index.html", import.meta.url), "utf8");
  const sitemap = await readFile(new URL("../dist/client/sitemap.xml", import.meta.url), "utf8");

  assert.match(hub, /Small-business owners/);
  assert.match(hub, /High-income individuals/);
  assert.match(highIncome, /Bring the moving parts into one tax picture/);
  assert.match(highIncome, /High-Income Individual Tax Planning and Preparation/);
  assert.match(highIncome, /FAQPage/);
  assert.match(sitemap, /who-we-help\/high-income-individuals/);
  assert.doesNotMatch(highIncome, /high net worth|wealth management/i);
});

test("builds the service structure, home-turf pages, county hubs, and crawler files", async () => {
  await Promise.all([
    access(new URL("../dist/client/services/tax-preparation/index.html", import.meta.url)),
    access(new URL("../dist/client/services/tax-planning/index.html", import.meta.url)),
    access(new URL("../dist/client/services/tax-preparation/individual-tax-preparation/index.html", import.meta.url)),
    access(new URL("../dist/client/services/tax-planning/stock-option-tax-planning/index.html", import.meta.url)),
    access(new URL("../dist/client/individual-tax-preparation-san-francisco-ca/index.html", import.meta.url)),
    access(new URL("../dist/client/stock-option-tax-planning-san-francisco-ca/index.html", import.meta.url)),
    access(new URL("../dist/client/areas/san-francisco-county/index.html", import.meta.url)),
    access(new URL("../dist/client/areas/marin-county/index.html", import.meta.url)),
    access(new URL("../dist/client/contact/index.html", import.meta.url)),
    access(new URL("../dist/client/sitemap.xml", import.meta.url)),
    access(new URL("../dist/client/robots.txt", import.meta.url)),
    access(new URL("../dist/client/llms.txt", import.meta.url)),
    access(new URL("../dist/server/index.js", import.meta.url)),
  ]);

  const sitemap = await readFile(new URL("../dist/client/sitemap.xml", import.meta.url), "utf8");
  const servicePage = await readFile(new URL("../dist/client/services/tax-preparation/individual-tax-preparation/index.html", import.meta.url), "utf8");
  const contactPage = await readFile(new URL("../dist/client/contact/index.html", import.meta.url), "utf8");
  assert.match(sitemap, /contact\//);
  assert.match(sitemap, /services\/tax-preparation\/individual-tax-preparation/);
  assert.match(sitemap, /stock-option-tax-planning-san-francisco-ca/);
  assert.doesNotMatch(sitemap, /services\/stock-option-tax-planning\/<\/loc>/);
  assert.match(servicePage, /Related services\./);
  assert.match(servicePage, /href="\/contact\/"/);
  assert.match(servicePage, /MBA–Taxation/);
  assert.match(servicePage, /Google Map of Middle Sunset, San Francisco/);
  assert.doesNotMatch(servicePage, /Local situations, San Francisco FAQs/i);
  assert.match(contactPage, /Send a confidential note/);
  assert.match(contactPage, /Google Map of Middle Sunset, San Francisco/);
  assert.doesNotMatch(servicePage, /silo|location-neutral|competing with/i);
});

test("the Sites worker delegates the root route to the static asset binding", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  let requestedPath = "";

  const response = await worker.fetch(new Request("https://example.com/"), {
    ASSETS: {
      fetch(request) {
        requestedPath = new URL(request.url).pathname;
        return new Response("James J. Russo, CPA", { status: 200 });
      },
    },
  });

  assert.equal(requestedPath, "/");
  assert.equal(response.status, 200);
  assert.match(await response.text(), /James J\. Russo, CPA/);
});

test("the Sites worker permanently redirects old flat service URLs", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("redirect-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(new Request("https://example.com/services/individual-tax-preparation/"), { ASSETS: { fetch() { throw new Error("redirect should run before assets"); } } });

  assert.equal(response.status, 301);
  assert.equal(response.headers.get("location"), "https://example.com/services/tax-preparation/individual-tax-preparation/");
});
