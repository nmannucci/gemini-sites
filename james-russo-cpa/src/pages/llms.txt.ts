import { getAreas, getServicePillars, site } from "../data/site";

export const prerender = true;

export function GET() {
  const base = site.siteUrl || "https://www.jamesjrussocpa.com";
  const pillars = getServicePillars().map((pillar) => `- [${pillar.name}](${base}${pillar.path}): ${pillar.summary}`).join("\n");
  const areas = getAreas().map((area) => `- [${area.name}](${base}${area.path})`).join("\n");
  const body = `# ${site.businessName}\n\n${site.businessName} is a San Francisco CPA practice focused on individual tax preparation and year-round tax planning. James J. Russo has been a CPA since 1984, earned an MBA–Taxation from Golden Gate University in 1984, and founded the practice in 1990.\n\n## Services\n\n${pillars}\n\n## Who Jim helps\n\n- [Small-business owners](${base}/services/tax-preparation/small-business-tax-services/)\n- [Real estate owners and landlords](${base}/services/tax-planning/real-estate-and-landlord-tax/)\n- [High-income individuals](${base}/who-we-help/high-income-individuals/)\n- [Technology professionals with stock options](${base}/services/tax-planning/stock-option-tax-planning/)\n- [Retired taxpayers](${base}/services/tax-preparation/retirement-and-life-change-planning/)\n\n## Areas served\n\nJim primarily serves San Francisco, Marin, and San Mateo Counties, with select clients in Santa Clara, Alameda, and Contra Costa Counties.\n\n${areas}\n\n## Contact\n\n- Phone: ${site.phone}\n- Email: ${site.email}\n- Location: ${site.address}\n- Meetings: ${site.hours}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
