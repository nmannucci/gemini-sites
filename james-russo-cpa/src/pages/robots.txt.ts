import { site } from "../data/site";

export const prerender = true;

export function GET() {
  const base = site.siteUrl || "https://www.jamesjrussocpa.com";
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
