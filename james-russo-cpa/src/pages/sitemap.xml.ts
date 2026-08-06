import { getAreas, getSanFranciscoServicePages, getServicePillars, getServices, site } from "../data/site";

export const prerender = true;

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export function GET() {
  const base = site.siteUrl || "https://www.jamesjrussocpa.com";
  const paths = [
    "/",
    "/contact/",
    "/who-we-help/",
    "/who-we-help/high-income-individuals/",
    ...getServicePillars().map((pillar) => pillar.path),
    ...getServices().map((service) => service.path),
    ...getSanFranciscoServicePages().map((service) => service.localPath),
    ...getAreas().map((area) => area.path)
  ];
  const urls = [...new Set(paths)].map((path) => `<url><loc>${escapeXml(`${base}${path}`)}</loc></url>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
}
