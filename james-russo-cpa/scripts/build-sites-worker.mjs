import { mkdir, readdir, rename, writeFile } from "node:fs/promises";

const dist = new URL("../dist/", import.meta.url);
const client = new URL("../dist/client/", import.meta.url);

await mkdir(client, { recursive: true });

for (const entry of await readdir(dist, { withFileTypes: true })) {
  if (["client", "server", ".openai"].includes(entry.name)) continue;
  await rename(new URL(entry.name, dist), new URL(entry.name, client));
}

const source = `const redirects = {
  "/services/individual-tax-preparation/": "/services/tax-preparation/individual-tax-preparation/",
  "/services/small-business-tax-services/": "/services/tax-preparation/small-business-tax-services/",
  "/services/retirement-and-life-change-planning/": "/services/tax-preparation/retirement-and-life-change-planning/",
  "/services/year-round-tax-planning/": "/services/tax-planning/year-round-tax-planning/",
  "/services/stock-option-tax-planning/": "/services/tax-planning/stock-option-tax-planning/",
  "/services/real-estate-and-landlord-tax/": "/services/tax-planning/real-estate-and-landlord-tax/"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const redirect = redirects[url.pathname];
    if (redirect) return Response.redirect(new URL(redirect, url.origin), 301);
    if (env?.ASSETS?.fetch) return env.ASSETS.fetch(request);
    return new Response("Not found", { status: 404 });
  }
};
`;

await mkdir(new URL("server/", dist), { recursive: true });
await writeFile(new URL("server/index.js", dist), source);
