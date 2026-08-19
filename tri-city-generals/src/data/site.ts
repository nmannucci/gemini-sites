import { readFileSync } from "node:fs";
import defaultProspect from "./prospect.json";

const externalProspectPath = process.env.HOUSE36_PROSPECT_PATH;
const prospect = externalProspectPath
  ? JSON.parse(readFileSync(externalProspectPath, "utf8"))
  : defaultProspect;

function initialsFrom(name: string) {
  return name
    .split(/\s+/)
    .filter((word) => /^[a-z0-9]/i.test(word))
    .slice(0, 3)
    .map((word) => word[0].toUpperCase())
    .join("");
}

export const site = {
  businessName: prospect.business_name,
  brandDisplayName: "Tri-City Generals",
  phone: prospect.business_phone,
  email: prospect.business_email,
  hours: prospect.hours_of_operation,
  address: prospect.address,
  serviceArea: prospect.service_area,
  serviceAreas: prospect.service_areas,
  primaryColor: prospect.primary_brand_color,
  logoImage: prospect.logo || "",
  logoText: prospect.logo_text || initialsFrom(prospect.business_name),
  services: prospect.services_offered,
  formEndpoint: prospect.form_endpoint || "",
  demoMode: prospect.demo_mode ?? true,
  siteUrl: (prospect.site_url || "").replace(/\/$/, ""),
  testimonials: ((prospect as { testimonials?: { quote: string; name: string; source?: string }[] }).testimonials || []).filter(
    (t) => t && t.quote?.trim() && t.name?.trim()
  ),
  registrationUrl: "https://www.tcgenerals.com/event-list",
  privateBookingUrl: "https://www.tcgenerals.com/service-page/private-training-session",
  instagramUrl: "https://www.instagram.com/tricitygenerals/"
};

export const contact = site.phone
  ? { href: `tel:${site.phone.replace(/[^\d+]/g, "")}`, label: `Call ${site.phone}`, shortLabel: "Call now" }
  : { href: `mailto:${site.email}`, label: "Email the academy", shortLabel: "Email us" };

export function getFaqs() {
  const topServices = site.services.slice(0, 3).join(", ");
  return [
    {
      q: "How do I book a first session?",
      a: `Private training sessions can be booked through the academy's online booking page. You can also call ${site.phone}, email ${site.email}, or send the form here to ask which program fits.`
    },
    {
      q: "Where are sessions held?",
      a: `Training is based at ${site.address}, serving families across ${site.serviceArea}. The map and directions are just above.`
    },
    {
      q: "When does training run?",
      a: `${site.hours}. The 2026 Summer Training Academy lists Monday–Thursday morning, afternoon, and evening schedules, while other programs use their own event times.`
    },
    {
      q: "What programs do you offer?",
      a: `Current programs include ${topServices}${site.services.length > 3 ? ", and more" : ""}. Every program page on this site has the details, or just ask which one fits your player.`
    },
    {
      q: "Does the academy only train baseball players?",
      a: "No. The academy's mission identifies baseball, softball, football, and track as primary areas and says its trainers have developed regimens for all major sports. This site focuses on its baseball programs."
    },
    {
      q: "Do Legacy programs have prerequisites?",
      a: "Some do. For example, the 2026 Catcher's Legacy Program requires prior completion of a TCG summer academy, fall training academy, or Legacy Program. Check the current event details before registering."
    }
  ];
}

export const defaultImages = {
  hero: "/assets/tcg-hero.jpg",
  privateLesson: "/assets/tcg-hitting.jpg",
  fielding: "/assets/tcg-coaching.jpg",
  pitching: "/assets/tcg-pitching.jpg",
  teamTraining: "/assets/tcg-champions.jpg",
  camp: "/assets/tcg-hero.jpg",
  strength: "/assets/tcg-strength.jpg"
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getServices() {
  return site.services.map((name, index) => ({
    name,
    slug: slugify(name),
    image: serviceImage(name, index),
    summary: serviceSummary(name)
  }));
}

export function getAreas() {
  return site.serviceAreas.map((name) => ({
    name,
    slug: slugify(name)
  }));
}

export function serviceSummary(name: string) {
  const lower = name.toLowerCase();

  if (lower.includes("academy")) {
    return "A high-performance, academy-style program covering hitting, fielding, throwing, mobility, and conditioning.";
  }

  if (lower.includes("catch")) {
    return "Position-specific work on receiving, blocking, throwing, mobility, and the details that make catchers dependable.";
  }

  if (lower.includes("strength") || lower.includes("condition")) {
    return "Build physical skill, resilience, and work capacity through structured strength and conditioning.";
  }

  if (lower.includes("hit")) {
    return "Build a repeatable swing, rotational power, an efficient bat path, and greater ownership of the strike zone.";
  }

  if (lower.includes("pitch")) {
    return "Develop repeatable mechanics, command, release-point precision, and resilience under pressure.";
  }

  if (lower.includes("private")) {
    return "Detailed private instruction for mechanical and physical skill development, performance, and character growth.";
  }

  return "Focused coaching that gives your player clear feedback, steady reps, and a plan they can understand.";
}

function serviceImage(name: string, index: number) {
  const lower = name.toLowerCase();

  if (lower.includes("academy")) {
    return defaultImages.hero;
  }

  if (lower.includes("catch")) {
    return defaultImages.fielding;
  }

  if (lower.includes("strength") || lower.includes("condition")) {
    return defaultImages.strength;
  }

  if (lower.includes("hit") || lower.includes("private")) {
    return defaultImages.privateLesson;
  }

  if (lower.includes("pitch")) {
    return defaultImages.pitching;
  }

  return [defaultImages.hero, defaultImages.fielding, defaultImages.pitching][index % 3];
}
