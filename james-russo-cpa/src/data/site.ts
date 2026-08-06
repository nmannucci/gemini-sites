import { readFileSync } from "node:fs";
import defaultProspect from "./prospect.json";

type Testimonial = { quote: string; name: string; source?: string };
type Prospect = typeof defaultProspect & {
  brand_display_name?: string;
  headline?: string;
  introduction?: string;
  owner_name?: string;
  credentials?: string[];
  year_founded?: number | null;
  client_types?: string[];
  appointment_url?: string;
  form_endpoint?: string;
  site_url?: string;
  demo_mode?: boolean;
  testimonials?: Testimonial[];
  hero_image?: string;
  team_image?: string;
  testimonial_image?: string;
  client_portal_url?: string;
  payment_url?: string;
  review_rating?: number | null;
  review_count?: number | null;
  review_url?: string;
  google_maps_embed_url?: string;
};

const externalProspectPath = process.env.HOUSE36_CPA_PROSPECT_PATH;
const prospect = (externalProspectPath
  ? JSON.parse(readFileSync(externalProspectPath, "utf8"))
  : defaultProspect) as Prospect;

function initialsFrom(name: string) {
  return name
    .split(/\s+/)
    .filter((word) => /^[a-z0-9]/i.test(word))
    .slice(0, 3)
    .map((word) => word[0].toUpperCase())
    .join("");
}

function contrastFor(hex: string) {
  const normalized = hex.replace("#", "");
  const value = normalized.length === 3
    ? normalized.split("").map((character) => character + character).join("")
    : normalized;
  const [r, g, b] = [0, 2, 4].map((index) => Number.parseInt(value.slice(index, index + 2), 16) / 255);
  const linear = [r, g, b].map((channel) => channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  const luminance = 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  return luminance > 0.179 ? "#171813" : "#fffdf6";
}

function darkenHex(hex: string, amount = 0.24) {
  const normalized = hex.replace("#", "");
  const value = normalized.length === 3
    ? normalized.split("").map((character) => character + character).join("")
    : normalized;
  const channels = [0, 2, 4].map((index) => Number.parseInt(value.slice(index, index + 2), 16));
  if (channels.some(Number.isNaN)) return "#242421";
  return `#${channels.map((channel) => Math.round(channel * (1 - amount)).toString(16).padStart(2, "0")).join("")}`;
}

const primaryColor = prospect.primary_brand_color;
const primaryDark = darkenHex(primaryColor);

export const site = {
  businessName: prospect.business_name,
  brandDisplayName: prospect.brand_display_name || prospect.business_name,
  phone: prospect.business_phone,
  email: prospect.business_email,
  hours: prospect.hours_of_operation,
  address: prospect.address,
  serviceArea: prospect.service_area,
  serviceAreas: prospect.service_areas,
  services: prospect.services_offered,
  primaryColor,
  primaryDark,
  primaryContrast: contrastFor(primaryColor),
  primaryDarkContrast: contrastFor(primaryDark),
  logoImage: prospect.logo || "",
  logoText: prospect.logo_text || initialsFrom(prospect.business_name),
  headline: prospect.headline || "Clear numbers. Confident decisions.",
  introduction: prospect.introduction || `${prospect.business_name} provides practical tax, accounting, and advisory support for clients across ${prospect.service_area}.`,
  ownerName: prospect.owner_name || "",
  credentials: (prospect.credentials || []).filter(Boolean),
  yearFounded: prospect.year_founded || null,
  clientTypes: (prospect.client_types || ["Small businesses", "Independent professionals", "Families & individuals"]).filter(Boolean),
  appointmentUrl: prospect.appointment_url || "",
  formEndpoint: prospect.form_endpoint || "",
  siteUrl: (prospect.site_url || "").replace(/\/$/, ""),
  demoMode: prospect.demo_mode ?? true,
  testimonials: (prospect.testimonials || []).filter((testimonial) => testimonial?.quote?.trim() && testimonial?.name?.trim()),
  heroImage: prospect.hero_image || "/assets/cpa-template/hero-consultation.webp",
  teamImage: prospect.team_image || "/assets/cpa-template/team-office.webp",
  testimonialImage: prospect.testimonial_image || "/assets/cpa-template/client-portrait.webp",
  clientPortalUrl: prospect.client_portal_url || "",
  paymentUrl: prospect.payment_url || "",
  reviewRating: prospect.review_rating || null,
  reviewCount: prospect.review_count || null,
  reviewUrl: prospect.review_url || "",
  mapEmbedUrl: prospect.google_maps_embed_url || `https://www.google.com/maps?q=${encodeURIComponent(prospect.address || prospect.service_area)}&output=embed`,
  mapSearchUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(prospect.address || prospect.service_area)}`
};

export const contact = site.phone
  ? { href: `tel:${site.phone.replace(/[^\d+]/g, "")}`, label: `Call ${site.phone}`, shortLabel: "Call the firm" }
  : { href: `mailto:${site.email}`, label: `Email ${site.email}`, shortLabel: "Email the firm" };

export const primaryCta = site.appointmentUrl
  ? { href: site.appointmentUrl, label: "Schedule a consultation", external: true }
  : { href: "/contact/", label: "Start a conversation", external: false };

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const servicePillarDefinitions = [
  {
    name: "Tax Preparation Services",
    slug: "tax-preparation",
    headline: "Tax preparation that looks beyond the forms.",
    summary: "Careful filing for individuals, business owners, and taxpayers navigating retirement or another major life change.",
    intro: "Accurate preparation starts with understanding what changed, which records matter, and how this year connects to the decisions ahead.",
    serviceNames: ["Individual Tax Preparation", "Small Business Tax Services", "Retirement & Life-Change Planning"]
  },
  {
    name: "Tax Planning Services",
    slug: "tax-planning",
    headline: "Plan before the tax result is fixed.",
    summary: "Year-round guidance for estimates, equity compensation, property, and other decisions with meaningful tax consequences.",
    intro: "Planning creates room to compare options while timing, withholding, and transaction details can still be changed.",
    serviceNames: ["Year-Round Tax Planning", "Stock Option Tax Planning", "Real Estate & Landlord Tax"]
  }
] as const;

function getPillarForService(name: string) {
  return servicePillarDefinitions.find((pillar) => pillar.serviceNames.includes(name as never)) || servicePillarDefinitions[0];
}

export function getServices() {
  return site.services.map((name, index) => {
    const slug = slugify(name);
    const pillar = getPillarForService(name);
    return {
      name,
      slug,
      pillarName: pillar.name,
      pillarSlug: pillar.slug,
      path: `/services/${pillar.slug}/${slug}/`,
      homeTurfPath: `/${slug}-san-francisco-ca/`,
      number: String(index + 1).padStart(2, "0"),
      ...getServiceDetail(name),
      strategies: getServiceStrategies(name),
      faqs: getServiceFaqs(name),
      image: getServiceImage(name)
    };
  });
}

export function getServicePillars() {
  const services = getServices();
  return servicePillarDefinitions.map((pillar) => ({
    ...pillar,
    path: `/services/${pillar.slug}/`,
    services: services.filter((service) => service.pillarSlug === pillar.slug)
  }));
}

export function getServiceImage(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("individual")) return "/assets/cpa-template/service-tax.webp";
  if (lower.includes("stock option") || lower.includes("equity")) return "/assets/cpa-template/hero-consultation.webp";
  if (lower.includes("year-round") || lower.includes("tax planning")) return "/assets/cpa-template/service-advisory.webp";
  if (lower.includes("small business") || lower.includes("bookkeep")) return "/assets/cpa-template/service-bookkeeping.webp";
  if (lower.includes("real estate") || lower.includes("landlord")) return "/assets/cpa-template/team-office.webp";
  if (lower.includes("retirement") || lower.includes("life-change")) return "/assets/cpa-template/client-portrait.webp";
  if (lower.includes("payroll")) return "/assets/cpa-template/service-payroll.webp";
  if (lower.includes("advis") || lower.includes("cfo") || lower.includes("consult")) return "/assets/cpa-template/service-advisory.webp";
  return "/assets/cpa-template/service-tax.webp";
}

export function getAreas() {
  const details: Record<string, {
    tier: string;
    communities: string[];
    intro: string;
    focus: string;
    localContext: string;
    serviceGuide: string;
    landmarks: Array<{ name: string; detail: string }>;
    metaDescription: string;
  }> = {
    "san-francisco-county": {
      tier: "Home turf",
      communities: ["Middle Sunset", "Inner and Outer Sunset", "Richmond District", "Parkside", "West Portal"],
      intro: "Jim's practice is based in Middle Sunset and serves taxpayers across San Francisco, from west-side neighborhoods to downtown and the city's southern districts.",
      focus: "Individual returns, year-round planning, small-business taxes, stock options, rental property, and retirement transitions.",
      localContext: "San Francisco tax questions often combine technology compensation, rental property, home sales, investments, and the financial changes that come with a move, a new role, or retirement. Jim’s west-side practice brings those moving pieces into one practical conversation.",
      serviceGuide: "Explore guidance for San Francisco returns, equity compensation, property decisions, small-business ownership, and the planning that connects them.",
      landmarks: [
        { name: "Golden Gate Park", detail: "A familiar west-side reference point for clients from the Sunset, Richmond, and Parkside neighborhoods." },
        { name: "Ocean Beach", detail: "Part of the nearby west-side landscape served from Jim’s Middle Sunset practice." },
        { name: "Ferry Building", detail: "A downtown reference point for clients balancing business, investment, and property decisions across the city." }
      ],
      metaDescription: "San Francisco CPA services for individual taxes, planning, small businesses, stock options, real estate, and retirement. Contact James J. Russo, CPA."
    },
    "marin-county": {
      tier: "Primary service area",
      communities: ["San Rafael", "Mill Valley", "Novato", "Larkspur", "Corte Madera"],
      intro: "Jim expanded his Bay Area practice by acquiring a Marin County accounting firm in 2004 and continues to serve clients throughout the county.",
      focus: "Individual and business tax work, real estate decisions, retirement income, and ongoing planning.",
      localContext: "Marin clients often come to Jim with a mix of long-held investments, rental or second-property questions, retirement income, trust activity, and small-business decisions. His Marin relationships date back to the firm he acquired in 2004.",
      serviceGuide: "Start with the service that fits the decision in front of you—whether it involves a return, estimated payments, property, retirement income, or a closely held business.",
      landmarks: [
        { name: "Mount Tamalpais", detail: "A defining Marin landmark visible across much of the county’s residential and business communities." },
        { name: "Muir Woods", detail: "A well-known Marin reference point for clients in the Mill Valley and southern-county area." },
        { name: "Marin Civic Center", detail: "A San Rafael landmark that anchors the county’s civic and professional center." }
      ],
      metaDescription: "Marin County CPA and tax services for individuals, business owners, real estate decisions, and retirement income. Work directly with James J. Russo."
    },
    "san-mateo-county": {
      tier: "Primary service area",
      communities: ["Daly City", "South San Francisco", "Burlingame", "San Mateo", "Redwood City"],
      intro: "The practice serves clients along the Peninsula, including professionals, property owners, retirees, and business owners in San Mateo County.",
      focus: "Equity compensation, high-income returns, property transactions, estimates, and tax planning around career changes.",
      localContext: "Across the Peninsula, tax planning commonly turns on equity compensation, career changes, multiple income sources, property transactions, and estimated taxes. Jim helps clients connect the annual return to the decisions that may change next year’s result.",
      serviceGuide: "These services are especially relevant for Peninsula professionals managing stock compensation, bonus income, property, retirement accounts, or a changing tax picture.",
      landmarks: [
        { name: "Coyote Point", detail: "A San Mateo shoreline landmark with views of the bay, the San Mateo Bridge, and air traffic near SFO." },
        { name: "San Francisco International Airport", detail: "A familiar Peninsula reference point for clients in South San Francisco, Burlingame, and nearby communities." },
        { name: "Filoli", detail: "A widely recognized Woodside landmark on the western side of San Mateo County." }
      ],
      metaDescription: "San Mateo County CPA services for high-income returns, stock compensation, property, estimates, and tax planning. Contact James J. Russo, CPA."
    },
    "santa-clara-county": {
      tier: "Extended service area",
      communities: ["Palo Alto", "Mountain View", "Sunnyvale", "Santa Clara", "San Jose"],
      intro: "Jim works with a smaller number of Santa Clara County clients whose tax lives often include technology income, stock options, or business ownership.",
      focus: "ISO, NQSO, ESPP and AMT planning, individual returns, business taxes, and multi-part financial decisions.",
      localContext: "Santa Clara County clients frequently need to coordinate stock-option exercises, ESPP sales, bonuses, concentrated positions, and the cash impact of alternative minimum tax. Those questions benefit from planning before a transaction is locked in.",
      serviceGuide: "Use these service pages to explore stock-option planning, year-round estimates, individual preparation, and small-business tax decisions common across Silicon Valley.",
      landmarks: [
        { name: "Levi’s Stadium", detail: "A Santa Clara landmark at the center of major events and the county’s technology-driven economy." },
        { name: "The Tech Interactive", detail: "A downtown San José reference point for the innovation culture that shapes many local compensation questions." },
        { name: "Mission Santa Clara", detail: "A historic Santa Clara landmark near the heart of the county’s university and business community." }
      ],
      metaDescription: "Santa Clara County CPA services for technology professionals, stock options, AMT planning, individual returns, and business owners. Contact Jim Russo."
    },
    "alameda-county": {
      tier: "Extended service area",
      communities: ["Oakland", "Berkeley", "Alameda", "Emeryville", "Fremont"],
      intro: "The practice supports select Alameda County clients with individual, business, real estate, and year-round tax needs.",
      focus: "Small-business ownership, rental property, individual filing, estimates, and planning before major transactions.",
      localContext: "Alameda County clients may be balancing an owner-operated business, rental property, investment income, a home sale, or more than one source of earnings. Jim brings the return, estimates, and longer-term planning into the same view.",
      serviceGuide: "Explore the services that support East Bay business owners, landlords, investors, and individuals whose tax questions reach beyond a straightforward filing.",
      landmarks: [
        { name: "Lake Merritt", detail: "An Oakland landmark at the center of the county’s civic, residential, and professional activity." },
        { name: "UC Berkeley", detail: "A familiar East Bay reference point for Berkeley-area professionals, faculty, and families." },
        { name: "Jack London Square", detail: "A waterfront Oakland landmark connected to the county’s business and investment activity." }
      ],
      metaDescription: "Alameda County CPA services for individual filing, small businesses, rental property, estimates, and tax planning. Work directly with James J. Russo."
    },
    "contra-costa-county": {
      tier: "Extended service area",
      communities: ["Richmond", "Orinda", "Lafayette", "Walnut Creek", "Concord"],
      intro: "Jim serves select Contra Costa County taxpayers who want direct access to an experienced CPA for preparation and planning.",
      focus: "Retirement income, real estate, small-business taxes, individual returns, and important life transitions.",
      localContext: "Contra Costa County clients often bring questions about retirement distributions, real estate, a closely held business, or the tax effect of a life transition. Jim helps identify the records, timing, and planning choices that deserve attention.",
      serviceGuide: "Choose the service that matches your immediate filing or planning need, then use the conversation to connect it to property, retirement, business, or family decisions already in motion.",
      landmarks: [
        { name: "Mount Diablo", detail: "A defining East Bay landmark that rises over the county’s central and eastern communities." },
        { name: "Lafayette Reservoir", detail: "A familiar Lamorinda reference point for clients in Lafayette, Orinda, and nearby communities." },
        { name: "Martinez waterfront", detail: "A county-seat reference point along the Carquinez Strait and the county’s northern shoreline." }
      ],
      metaDescription: "Contra Costa County CPA services for retirement income, real estate, small businesses, individual returns, and tax planning with James J. Russo."
    }
  };

  return site.serviceAreas.map((name) => {
    const slug = slugify(name);
    return { name, slug, path: `/areas/${slug}/`, ...details[slug] };
  });
}

export function getServiceStrategies(name: string) {
  const lower = name.toLowerCase();

  if (lower.includes("bookkeep")) return [
    { title: "A dependable monthly close", body: "Keep accounts reconciled and reporting current so decisions are based on complete information." },
    { title: "Cleaner financial reporting", body: "Turn transaction data into understandable statements that reveal cash flow, margins, and trends." },
    { title: "A smoother tax handoff", body: "Maintain organized records throughout the year so tax preparation starts from a stronger position." }
  ];

  if (lower.includes("payroll")) return [
    { title: "Reliable pay cycles", body: "Build a repeatable payroll schedule that keeps employees paid and owners informed." },
    { title: "Filing support", body: "Stay on top of recurring payroll reports, deposits, and year-end forms with fewer last-minute surprises." },
    { title: "Responsive problem solving", body: "Get a clear answer when compensation, withholding, or worker-classification questions arise." }
  ];

  if (lower.includes("advis") || lower.includes("cfo") || lower.includes("consult")) return [
    { title: "Forward-looking forecasts", body: "Use practical budgets and cash-flow projections to see pressure points before they become urgent." },
    { title: "Decision-ready reporting", body: "Focus reporting on the numbers that matter to hiring, pricing, investment, and growth." },
    { title: "An experienced sounding board", body: "Bring financial context into consequential owner decisions without adding a full-time finance hire." }
  ];

  if (lower.includes("formation") || lower.includes("startup") || lower.includes("new business")) return [
    { title: "Entity and tax setup", body: "Consider the tax and administrative implications of the structure you choose before filing." },
    { title: "Organized accounting systems", body: "Start with a chart of accounts, recordkeeping process, and banking setup built for clean books." },
    { title: "A practical compliance calendar", body: "Know the registrations, filings, payments, and recurring deadlines that apply from day one." }
  ];

  if (lower.includes("stock option") || lower.includes("equity")) return [
    { title: "Understand the tax treatment", body: "Clarify the differences among ISOs, NQSOs, ESPPs, regular tax, and alternative minimum tax before taking action." },
    { title: "Plan the exercise and sale", body: "Compare exercise-to-sale timing and the tax consequences of aggressive, moderate, and conservative approaches." },
    { title: "Prepare for the cash impact", body: "Estimate tax exposure and payment timing so an equity decision does not create an avoidable surprise." }
  ];

  if (lower.includes("real estate") || lower.includes("landlord")) return [
    { title: "Track deductions correctly", body: "Organize operating expenses, improvements, depreciation, and property activity for a cleaner tax return." },
    { title: "Plan around a sale", body: "Understand basis, capital gains, depreciation recapture, and timing before a transaction closes." },
    { title: "Connect tax to ownership", body: "Consider how financing, co-ownership, property use, and entity structure affect the wider tax picture." }
  ];

  if (lower.includes("retirement") || lower.includes("life-change")) return [
    { title: "Coordinate income sources", body: "Consider pensions, retirement accounts, investments, Social Security, and withholding together." },
    { title: "Plan around transitions", body: "Look ahead to retirement, a home sale, trust activity, or another change before the tax year closes." },
    { title: "Reduce filing surprises", body: "Review estimates and withholding as income sources and deductions change." }
  ];

  if (lower.includes("small business")) return [
    { title: "Choose and maintain the right entity", body: "Consider the tax and administrative tradeoffs of S corporations, LLCs, and other structures." },
    { title: "Plan owner taxes", body: "Coordinate compensation, estimates, deductions, and business results with the owner’s personal return." },
    { title: "Prepare for what comes next", body: "Use projections and planning to anticipate the tax impact of growth, purchases, and major decisions." }
  ];

  if (lower.includes("individual") || lower.includes("personal")) return [
    { title: "Careful return preparation", body: "Organize income, deductions, credits, and supporting records for an accurate filing." },
    { title: "Planning around life changes", body: "Consider how a move, new job, retirement, investment, or family change may affect your taxes." },
    { title: "A clearer year ahead", body: "Leave the filing process with practical guidance for withholding, estimates, and next year’s records." }
  ];

  if (lower.includes("tax")) return [
    { title: "Accurate preparation", body: "Organize business and personal tax information into a complete, carefully reviewed filing." },
    { title: "Year-round tax planning", body: "Identify timing, deduction, credit, and estimated-payment opportunities before deadlines arrive." },
    { title: "Entity-aware guidance", body: "Connect the return to the way the business operates, pays owners, and plans for future growth." }
  ];

  return [
    { title: "A scope built around the need", body: `Define the ${name.toLowerCase()} work, responsibilities, timing, and desired outcome before work begins.` },
    { title: "Clear communication", body: "Know what information is needed, where the work stands, and what decision comes next." },
    { title: "Practical recommendations", body: "Receive plain-language guidance that connects the technical work to your real priorities." }
  ];
}

export function getServiceFaqs(name: string) {
  const lower = name.toLowerCase();
  const specific = lower.includes("bookkeep")
    ? { q: "How often should bookkeeping be updated?", a: "Most active businesses benefit from a monthly close. The right cadence depends on transaction volume, reporting needs, and how quickly owners need reliable numbers." }
    : lower.includes("payroll")
      ? { q: "Can payroll support include tax filings and year-end forms?", a: "Payroll engagements can include recurring payroll tax support and year-end reporting. The exact scope is confirmed before work begins." }
      : lower.includes("stock option") || lower.includes("equity")
        ? { q: "Can you help compare exercise and sale strategies?", a: "Yes. Jim can help explain the tax consequences of different exercise-to-sale approaches, including regular tax and alternative minimum tax considerations." }
      : lower.includes("real estate") || lower.includes("landlord")
        ? { q: "Can you help plan for a property sale?", a: "Yes. Planning can address adjusted basis, capital gains, depreciation recapture, and other tax considerations before the transaction is complete." }
      : lower.includes("retirement") || lower.includes("life-change")
        ? { q: "When should retirement tax planning begin?", a: "Planning is most useful before income, withholding, distributions, or a major transaction changes. An early conversation creates more room to evaluate the options." }
      : lower.includes("tax")
        ? { q: "Is tax planning different from tax preparation?", a: "Yes. Preparation reports what already happened. Planning looks ahead at decisions, timing, estimates, and opportunities before the tax year closes." }
        : { q: `What is included in ${name.toLowerCase()}?`, a: "The exact scope depends on your goals, current records, and timing. The first conversation defines the work and the information needed." };

  return [
    specific,
    { q: "What should I bring to the first conversation?", a: "Start with your main question, important deadline, and any recent financial or tax documents you already have. The firm will organize the remaining request." },
    { q: "Can this service be handled remotely?", a: `${site.businessName} serves ${site.serviceArea}. Contact the firm to confirm the best meeting and document-sharing options for your location.` },
    { q: "How do I get started?", a: `Call ${site.phone} or email ${site.email}. A short conversation is enough to confirm fit and next steps.` }
  ];
}

export function getServiceDetail(name: string) {
  const lower = name.toLowerCase();

  if (lower.includes("bookkeep")) {
    return {
      summary: "Reliable books, useful reporting, and fewer month-end surprises.",
      headline: "Books you can trust. Numbers you can use.",
      intro: "Keep your financial records current and turn routine bookkeeping into a clearer view of how the business is performing.",
      outcomes: ["Consistent transaction categorization", "Timely account reconciliation", "Clear financial statements", "A cleaner year-end handoff"],
      fit: "Business owners who want dependable monthly records without carrying the work themselves."
    };
  }

  if (lower.includes("payroll")) {
    return {
      summary: "Dependable payroll support that keeps people paid and filings on track.",
      headline: "Payroll handled with care and consistency.",
      intro: "Simplify recurring payroll work, reporting, and tax obligations with a process designed to reduce avoidable errors.",
      outcomes: ["On-time payroll processing", "Payroll tax filing support", "Employee and contractor reporting", "Clear answers when questions come up"],
      fit: "Employers who need a reliable payroll rhythm as their team changes or grows."
    };
  }

  if (lower.includes("advis") || lower.includes("cfo") || lower.includes("consult")) {
    return {
      summary: "Forward-looking guidance for owners making consequential business decisions.",
      headline: "Put the numbers to work before the next decision.",
      intro: "Move beyond historical reports with practical financial guidance shaped around cash flow, growth, and the choices in front of you.",
      outcomes: ["Cash-flow visibility", "Budgeting and forecasting", "Performance review", "Decision support for owners"],
      fit: "Owners who need a financial thought partner, not just a set of reports."
    };
  }

  if (lower.includes("formation") || lower.includes("startup") || lower.includes("new business")) {
    return {
      summary: "A cleaner financial foundation for a business that is just getting started.",
      headline: "Start the business on sound financial footing.",
      intro: "Get practical help organizing the accounting and tax decisions that shape a new business from day one.",
      outcomes: ["Entity and tax election guidance", "Registration and filing support", "Accounting-system setup", "A clear compliance calendar"],
      fit: "Founders who want to begin with an organized structure and fewer expensive corrections later."
    };
  }

  if (lower.includes("audit") || lower.includes("assurance") || lower.includes("review")) {
    return {
      summary: "Independent financial reporting support delivered with discipline and clarity.",
      headline: "Financial statements others can rely on.",
      intro: "Meet lender, investor, board, or regulatory requirements with an engagement matched to the level of assurance you need.",
      outcomes: ["An engagement scoped to your requirement", "Organized information requests", "Clear communication throughout", "Useful observations at completion"],
      fit: "Organizations with third-party reporting, financing, governance, or compliance needs."
    };
  }

  if (lower.includes("stock option") || lower.includes("equity")) {
    return {
      summary: "Tax planning for ISOs, NQSOs, ESPPs, AMT exposure, and exercise-to-sale decisions.",
      headline: "Make an equity decision with the tax consequences in view.",
      intro: "Understand how the type of award, exercise timing, sale timing, and alternative minimum tax can change the result before you act.",
      outcomes: ["Clear treatment of each award type", "AMT and estimated-tax planning", "Exercise-to-sale scenario guidance", "A coordinated filing plan"],
      fit: "Technology professionals, managers, and other employees with incentive stock options, nonqualified stock options, or employee stock purchase plans."
    };
  }

  if (lower.includes("real estate") || lower.includes("landlord")) {
    return {
      summary: "Practical tax planning for property owners, investors, landlords, and home sellers.",
      headline: "Tax guidance grounded in real estate experience.",
      intro: "Connect rental activity, deductions, depreciation, financing, and a potential sale to the wider tax picture.",
      outcomes: ["Organized rental reporting", "Deduction and depreciation guidance", "Capital-gain planning", "Support for ownership changes"],
      fit: "Rental-property owners, landlords, real estate investors, and homeowners planning a consequential sale."
    };
  }

  if (lower.includes("retirement") || lower.includes("life-change")) {
    return {
      summary: "Tax perspective for retirement income, pensions, trusts, home sales, and changing financial lives.",
      headline: "Plan for the tax side of life’s next chapter.",
      intro: "Coordinate changing income sources, withholding, estimates, and important transactions with a thoughtful filing plan.",
      outcomes: ["Retirement-income planning", "Withholding and estimate guidance", "Trust and estate tax perspective", "Planning around major transitions"],
      fit: "Retired taxpayers and people preparing for retirement, a home sale, trust activity, or another significant financial change."
    };
  }

  if (lower.includes("small business")) {
    return {
      summary: "Tax preparation and planning shaped around the realities of owning a small business.",
      headline: "Business tax guidance that connects to the owner.",
      intro: "Coordinate entity structure, compensation, estimates, deductions, and the business return with your personal tax picture.",
      outcomes: ["Entity-aware tax preparation", "Estimated-tax planning", "Owner compensation guidance", "Planning for growth and change"],
      fit: "Small-business owners who want direct tax guidance from a CPA with firsthand ownership experience."
    };
  }

  if (lower.includes("individual") || lower.includes("personal")) {
    return {
      summary: "Thoughtful tax support for individuals, families, and changing financial lives.",
      headline: "Personal taxes without the last-minute scramble.",
      intro: "Prepare accurately, understand what changed, and approach the next tax year with a clearer plan.",
      outcomes: ["Organized return preparation", "Attention to eligible deductions and credits", "Support for life and income changes", "Practical planning for next year"],
      fit: "Individuals and families who value accuracy, responsiveness, and a plain-language explanation."
    };
  }

  if (lower.includes("tax")) {
    return {
      summary: "Accurate filing paired with year-round planning to reduce unwelcome surprises.",
      headline: "Plan ahead. File with confidence.",
      intro: "Combine careful preparation with proactive planning so tax season becomes part of a year-round financial strategy.",
      outcomes: ["Accurate federal and state filing", "Year-round planning opportunities", "Estimated-payment guidance", "A clear post-filing roadmap"],
      fit: "Businesses and individuals who want to understand their tax position before the year is over."
    };
  }

  return {
    summary: `Practical ${name.toLowerCase()} support with a clear process and responsive communication.`,
    headline: `${name}, made clearer from the start.`,
    intro: `Get thoughtful ${name.toLowerCase()} support shaped around your priorities, deadlines, and next decisions.`,
    outcomes: ["A clearly defined scope", "An organized information request", "Responsive progress updates", "Practical next steps"],
    fit: `Clients looking for a dependable, plain-language approach to ${name.toLowerCase()}.`
  };
}

export function getFaqs() {
  return [
    {
      q: "What services does Jim focus on?",
      a: "Jim’s primary focus is individual income tax preparation and year-round tax planning. He also advises on stock options, small-business taxes, real estate, retirement, IRS matters, and back-year returns."
    },
    {
      q: "Who does Jim typically work with?",
      a: "Jim commonly works with small-business owners, real estate owners and landlords, high-income and technology professionals, and retired taxpayers. The practice does not focus on nonprofit work."
    },
    {
      q: "Do I need to have all my documents ready before contacting you?",
      a: "No. Start with the question or outcome you need help with. The firm can explain which records matter and give you an organized next step."
    },
    {
      q: "What areas does the practice serve?",
      a: "The practice primarily serves San Francisco, Marin, and San Mateo Counties, with additional clients in Santa Clara, Alameda, and Contra Costa Counties."
    },
    {
      q: "How do I get started?",
      a: `Call ${site.phone} or email ${site.email}. A short initial conversation can establish the service you need, timing, and the right next step.`
    }
  ];
}

const sanFranciscoServiceDetails: Record<string, {
  title: string;
  description: string;
  intro: string;
  localContext: string;
  scenarios: string[];
  faqs: { q: string; a: string }[];
}> = {
  "individual-tax-preparation": {
    title: "Individual Tax Preparation in San Francisco, CA",
    description: "Individual tax preparation in San Francisco from CPA James J. Russo. Direct guidance for changing income, property, investments, and life events.",
    intro: "Work directly with a San Francisco CPA who has prepared and advised on individual tax matters since 1984. Jim serves clients across the city from his Middle Sunset practice and can confirm remote or by-appointment options.",
    localContext: "San Francisco returns often combine salary income with investments, property, multi-state work, retirement distributions, or a major life change. Jim organizes the facts, prepares the filing carefully, and explains what deserves attention before next year.",
    scenarios: ["A new job, marriage, move, or family change", "Investment sales or income from multiple sources", "A home sale or rental-property activity", "Withholding or estimated-payment questions"],
    faqs: [
      { q: "What should I bring for individual tax preparation?", a: "Begin with income forms, prior-year returns, deduction records, and details of any major change. Jim will provide a more specific request after learning about your situation." },
      { q: "Can you prepare a return with stock compensation?", a: "Yes. Jim works with technology professionals and can coordinate stock-option or equity-compensation information with the individual return." },
      { q: "Do you help San Francisco landlords with their personal returns?", a: "Yes. Rental activity, depreciation, property expenses, and a potential sale can be coordinated with the rest of the individual return." },
      { q: "Can meetings be handled remotely?", a: "Remote document sharing and meeting options may be available. Contact Jim to confirm the best arrangement for your records and timing." },
      { q: "Where is the practice located?", a: "The practice is in Middle Sunset, San Francisco. The street address is not published; meetings are by appointment." },
      { q: "How do I start?", a: `Call ${site.phone} or email ${site.email} with the deadline and the broad outline of what changed.` }
    ]
  },
  "year-round-tax-planning": {
    title: "Tax Planning in San Francisco, CA",
    description: "Year-round tax planning in San Francisco with CPA James J. Russo. Plan estimates, withholding, investments, business income, and major transactions.",
    intro: "Tax planning is most useful while decisions can still change. Jim helps San Francisco clients evaluate withholding, estimates, transactions, and income changes before the filing result is locked in.",
    localContext: "A planning conversation can connect city-based compensation, self-employment or business income, property, investments, and retirement decisions into one practical tax picture.",
    scenarios: ["A large change in compensation or bonus income", "Quarterly estimates and withholding adjustments", "A property purchase, sale, or conversion to rental use", "Retirement, trust, or investment-income changes"],
    faqs: [
      { q: "When should I schedule tax planning?", a: "Earlier is better, especially before an option exercise, property sale, retirement distribution, or year-end business decision." },
      { q: "Can you estimate what I may owe before filing season?", a: "Planning can project federal and California tax exposure using the information available and identify whether withholding or estimates should change." },
      { q: "Is planning useful if I already have withholding?", a: "Yes. Bonuses, equity compensation, investment income, and multiple income sources can make standard withholding less reliable." },
      { q: "Do you work with business owners and individuals?", a: "Yes. Jim can coordinate business results and owner-level tax planning so the two are not considered in isolation." },
      { q: "Can San Francisco meetings be remote?", a: "Remote options may be available, with by-appointment meetings through the Middle Sunset practice when appropriate." },
      { q: "How do I begin a planning engagement?", a: `Contact Jim at ${site.phone} with the decision, deadline, and the most recent tax information you have.` }
    ]
  },
  "stock-option-tax-planning": {
    title: "Stock Option Tax Planning in San Francisco, CA",
    description: "Stock option tax planning in San Francisco for ISOs, NQSOs, ESPPs, AMT exposure, exercises, and sales with CPA James J. Russo.",
    intro: "San Francisco technology professionals often need to understand the tax result before exercising or selling equity. Jim helps compare the treatment of ISOs, NQSOs, ESPPs, AMT, and related estimated payments.",
    localContext: "Equity decisions can change both regular tax and alternative minimum tax exposure. The useful work happens before the trade, when exercise size, timing, holding period, and available cash can still be compared.",
    scenarios: ["Exercising incentive stock options", "Selling shares after an exercise", "Planning around an ESPP disposition", "Estimating AMT and payment timing"],
    faqs: [
      { q: "Can you compare ISO exercise amounts?", a: "Yes. Jim can help estimate the tax impact of different exercise sizes and explain where alternative minimum tax may enter the picture." },
      { q: "What is the difference between ISO and NQSO taxation?", a: "The timing and character of income differ. The exact result depends on award type, exercise, sale, holding period, and payroll reporting." },
      { q: "Should I exercise before the end of the year?", a: "That depends on AMT exposure, cash needs, company risk, holding-period goals, and the rest of your income. Planning should happen before the transaction." },
      { q: "Can you help with an ESPP sale?", a: "Yes. The purchase and sale dates, discount, holding period, and employer reporting all matter to the tax treatment." },
      { q: "Do you serve technology professionals throughout San Francisco?", a: "Yes. Jim works with high-income and technology professionals across the city, with remote or by-appointment options confirmed directly." },
      { q: "What should I send first?", a: "Start with the award type, grant and vesting documents, proposed transaction, current-year income estimate, and prior return if available." }
    ]
  },
  "small-business-tax-services": {
    title: "Small Business Tax Services in San Francisco, CA",
    description: "Small business tax preparation and planning in San Francisco from CPA James J. Russo, a CPA and business owner with decades of practical experience.",
    intro: "Jim works with San Francisco small-business owners on returns, estimates, entity decisions, owner compensation, and the connection between business results and the personal tax return.",
    localContext: "As a longtime small-business owner himself, Jim approaches the work from both sides of the desk. The goal is an accurate filing and a clearer view of the decisions that affect the owner next.",
    scenarios: ["Entity and tax-election questions", "Owner compensation and estimated payments", "Business deductions and record organization", "Planning for growth, purchases, or a transition"],
    faqs: [
      { q: "Which business entities do you work with?", a: "Jim can advise small-business owners on the tax considerations affecting sole proprietorships, LLCs, S corporations, and other closely held structures." },
      { q: "Can you coordinate my business and personal returns?", a: "Yes. Business income, compensation, estimates, and deductions should be considered alongside the owner's individual return." },
      { q: "Do you provide bookkeeping?", a: "The current site focuses on tax preparation and planning. Contact Jim to discuss the records you have and whether the needed accounting support fits the engagement." },
      { q: "When should a new business contact a CPA?", a: "Before an entity election, first major purchase, payroll setup, or tax deadline is ideal because more options are still available." },
      { q: "Do you meet with San Francisco owners in person?", a: "The practice is in Middle Sunset and meetings are by appointment. Remote options may also be available." },
      { q: "What should I prepare for the first conversation?", a: "Share the business type, ownership, current records, last filed returns, key deadlines, and the decision you are trying to make." }
    ]
  },
  "real-estate-and-landlord-tax": {
    title: "Real Estate & Landlord Tax Planning in San Francisco, CA",
    description: "Real estate and landlord tax planning in San Francisco for rentals, depreciation, sales, and capital gains with CPA James J. Russo.",
    intro: "Jim brings firsthand experience as a landlord and property manager to tax planning for San Francisco property owners, investors, and homeowners preparing for a consequential sale.",
    localContext: "San Francisco real estate decisions can involve rental income, improvements, depreciation, mixed personal and rental use, adjusted basis, and a sale with significant capital-gain consequences.",
    scenarios: ["Reporting rental income and expenses", "Separating repairs from capital improvements", "Planning depreciation and a future sale", "Understanding basis, gain, and recapture"],
    faqs: [
      { q: "Can you help organize rental-property deductions?", a: "Yes. Jim can help distinguish operating expenses, improvements, depreciation, and other records that affect the tax return." },
      { q: "Should I speak with a CPA before selling a property?", a: "Yes. Basis, depreciation recapture, timing, ownership, and expected proceeds are easier to evaluate before the transaction closes." },
      { q: "Do you work with owner-occupied homes that later became rentals?", a: "Yes. Conversion date, value, basis, depreciation, and periods of personal use can all affect the result." },
      { q: "Can you coordinate real estate activity with my individual return?", a: "Yes. Rental results, capital gains, other investments, and income should be considered together." },
      { q: "Is the practice convenient for west-side property owners?", a: "The practice is based in Middle Sunset. Meetings are by appointment, and remote options may be available for clients elsewhere in the city." },
      { q: "What documents help with a property consultation?", a: "Bring prior returns, purchase and closing records, improvement history, depreciation schedules, current income and expense records, and any proposed sale details." }
    ]
  },
  "retirement-and-life-change-planning": {
    title: "Retirement Tax Planning in San Francisco, CA",
    description: "Retirement and life-change tax planning in San Francisco for pensions, distributions, trusts, home sales, and changing income with CPA James J. Russo.",
    intro: "Jim helps San Francisco retirees and people approaching retirement coordinate pensions, account distributions, investments, withholding, trusts, property, and other financial transitions.",
    localContext: "Retirement tax planning is rarely about one account. A useful plan looks at income sources together, anticipates major transactions, and adjusts withholding or estimates before a surprise develops.",
    scenarios: ["Beginning pension or retirement-account distributions", "Changing withholding after leaving work", "Selling a longtime home or investment property", "Trust activity or another major family transition"],
    faqs: [
      { q: "How early should retirement tax planning begin?", a: "Planning before the first major distribution or before employment income ends provides more time to coordinate withholding and expected taxable income." },
      { q: "Can you review pension and retirement-account withholding?", a: "Yes. Jim can compare expected income and withholding and discuss whether estimates or adjustments may be appropriate." },
      { q: "Do you help with tax questions around a home sale?", a: "Yes. Ownership history, use of the home, basis, improvements, and other property activity can affect the tax result." },
      { q: "Can trust activity be included in the planning conversation?", a: "Yes. Jim has firsthand experience as a trustee and can discuss how trust-related information fits the broader tax picture." },
      { q: "Are meetings available in San Francisco?", a: "The practice is located in Middle Sunset and works by appointment. Contact Jim to confirm in-person or remote options." },
      { q: "What should I bring first?", a: "Start with the prior return, expected income sources, current withholding, planned distributions, property or trust details, and the decision you need to make." }
    ]
  }
};

export function getSanFranciscoServicePages() {
  return getServices().map((service) => ({
    ...service,
    areaName: "San Francisco",
    areaSlug: "san-francisco-ca",
    localPath: service.homeTurfPath,
    ...sanFranciscoServiceDetails[service.slug]
  }));
}
