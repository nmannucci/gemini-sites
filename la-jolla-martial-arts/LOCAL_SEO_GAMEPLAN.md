# La Jolla Martial Arts Local SEO Gameplan

Research date: August 6, 2026  
Implementation domain: `https://lajollatkd.com`

## Outcome

Build a local SEO architecture that makes the site authoritative for martial arts and Taekwondo services, establishes one accurate physical-location entity in La Jolla, and expands only into nearby neighborhoods whose residents can realistically travel to the dojo.

The build will use three connected page types:

1. Location-neutral core service pages.
2. Core location pages for the physical dojo and approved drive-time markets.
3. Service-area pages for valuable service-by-location searches, linked to both parents.

## Baseline Findings

- `lajollatkd.com` is live and its main public pages return `200` responses.
- `robots.txt` allows normal search crawling, but `/sitemap.xml` returns `404`.
- The sampled search results did not surface the new domain for the main local terms or a `site:lajollatkd.com` query. The old `lajollamartialarts.com` pages remain visible in search.
- The current navigation exposes programs but has no Locations hub or location pages.
- Current program pages target both a service and La Jolla on the same URL. There are no location-neutral service hubs and no service-area child pages.
- Canonicals and homepage `MartialArtsSchool` schema exist. Service, breadcrumb, page-level FAQ, and location-page schema are not implemented consistently.
- Reviews and the general FAQ are primarily embedded in iframes, limiting their value as crawlable, first-party page content.
- La Jolla Martial Arts at 7680 Girard Ave, Basement is the active business and location. `lajollatkd.com` is the authoritative website.
- Eagle Martial Arts at 7438 Girard Ave is closed. Its old site and citations remain visible and must be closed, corrected, redirected, or suppressed as appropriate rather than treated as a second active entity.
- Fitness Kickboxing is inactive and is excluded from navigation, page development, schema, GBP services, and keyword targeting.
- The current source still contains legacy `Eagle Martial Arts` references in the About, Adult, Teen, Kids, Schedule, Contact, Birthday Parties, and homepage markup, plus inactive kickboxing copy on the Adult page. These must be removed during foundation work.
- Saturday hours vary within the current implementation and still need to be standardized.
- The site has strong proof to develop: Master Sam, 40+ years teaching, 300+ black belts trained, long-running local reviews, age-specific programs, a free-week offer, and a physical dojo in the Village.

Exact Search Console impressions, indexed-page counts, leads by landing page, map-grid rankings, and Core Web Vitals were not available during this planning pass. Those measurements must be recorded before deployment so performance can be attributed.

## Proposed Site Architecture

```text
Homepage
├── Services
│   ├── Taekwondo
│   ├── Little Ninjas / Preschool Martial Arts
│   ├── Kids Martial Arts
│   ├── Teen Martial Arts
│   └── Adult Martial Arts
├── Locations
│   ├── La Jolla — physical dojo
│   │   ├── Taekwondo in La Jolla
│   │   ├── Little Ninjas in La Jolla
│   │   ├── Kids Martial Arts in La Jolla
│   │   ├── Teen Martial Arts in La Jolla
│   │   └── Adult Martial Arts in La Jolla
│   ├── Pacific Beach — served area
│   ├── University City / UTC — served area
│   └── Clairemont — served area
└── Instructors
    └── Master Sam
```

Every core service will link to its approved location variants. Every location page will link to its available service-area pages and the other location hubs. Every service-area page will link back to both parents.

## Phase 0: Measurement and Entity Cleanup

Complete before publishing the new architecture:

1. Lock the confirmed La Jolla Martial Arts name, 7680 Girard Ave address, `lajollatkd.com` domain, public email, phone, Saturday hours, active age-based programs, and current instructors into one reusable business-data source.
2. Remove residual Eagle Martial Arts branding and inactive Fitness Kickboxing messaging from all active page copy, metadata, alt text, accessibility labels, structured data, and forms.
3. Record Google Business Profile categories, services, review count, URL, appointment link, NAP, and hours.
4. Export Search Console page/query data for both domains and record indexed-page counts.
5. Create a 7x7 or 9x9 map-grid benchmark around the dojo for:
   - `martial arts La Jolla`
   - `taekwondo La Jolla`
   - `kids martial arts La Jolla`
   - `kids karate La Jolla`
   - `preschool martial arts La Jolla`
6. Record monthly calls, lead forms, trial bookings, and direction clicks by landing page.
7. Map every valuable old-domain URL to its new equivalent and implement permanent redirects if the old domain is controlled.

## Phase 1: Foundation and Core Hubs

### Core service pages

| URL | Primary intent | Notes |
|---|---|---|
| `/services/taekwondo/` | Taekwondo classes and training | Explain style, belt progression, techniques, safety, tournaments, beginner path, and audiences without targeting a city. |
| `/services/little-ninjas/` | Preschool martial arts / martial arts ages 3–6 | Focus on listening, coordination, focus, confidence, and age-appropriate class structure. |
| `/services/kids-martial-arts/` | Kids martial arts classes | Focus on confidence, discipline, respect, focus, anti-bullying judgment, and physical development. |
| `/services/teen-martial-arts/` | Teen martial arts classes | Focus on mentorship, fitness, self-defense, judgment, resilience, and a positive peer environment. |
| `/services/adult-martial-arts/` | Adult martial arts classes | Focus on beginner-friendly Taekwondo, fitness, stress relief, practical self-defense, and community. |

Existing routes such as `/kids-martial-arts` will receive one-to-one permanent redirects to the new core-service URLs only after Search Console data is checked.

### Core physical-location page

| URL | Primary intent | Required unique content |
|---|---|---|
| `/locations/la-jolla/` | Martial arts school in La Jolla | Verified address and hours, parking, Girard Avenue/Village directions, map, exterior/interior photos, instructors, local reviews, all La Jolla program links, and nearby areas served. |

### Instructor page

| URL | Primary intent | Required unique content |
|---|---|---|
| `/instructors/master-sam/` | Master Sam / La Jolla martial arts instructor | Biography, verified credentials and rank, teaching history, philosophy, programs taught, photos, and reviews that mention him. |

### Existing commercial and utility pages to retain and improve

- `/birthday-parties/`
- `/game-zone/`
- `/schedule/`
- `/about/`
- `/contact/`
- `/privacy/`

Birthday parties and Game Zone remain distinct commercial intents. They should not be forced into the martial-arts service/location matrix.

## Phase 2: La Jolla Home-Market Pages

| URL | Primary intent | Differentiation requirement |
|---|---|---|
| `/locations/la-jolla/taekwondo/` | Taekwondo in La Jolla | Style, progression, La Jolla schedule, dojo logistics, instructor proof, and beginner FAQs. |
| `/locations/la-jolla/little-ninjas/` | Preschool martial arts in La Jolla | Ages, class length, parent expectations, drop-off/parking, local family proof, and first-class preparation. |
| `/locations/la-jolla/kids-martial-arts/` | Kids martial arts in La Jolla | Parent pain points, age band, school-day logistics, confidence/focus outcomes, safety, and local reviews. |
| `/locations/la-jolla/teen-martial-arts/` | Teen martial arts in La Jolla | Teen/adult shared-class format, mentoring, fitness, self-defense judgment, schedule, and transit/drop-off logistics. |
| `/locations/la-jolla/adult-martial-arts/` | Adult martial arts in La Jolla | Beginner path, fitness, self-defense, evening schedule, parking, class atmosphere, and adult proof. |

These pages get service-plus-place titles and H1s. The core service pages remain location-neutral.

## Phase 3: Ring 1 Served Areas

The proposed first ring reflects areas already named on the current site and realistic travel to the La Jolla dojo. The client must confirm that these are genuine converting markets before build.

### Pacific Beach

- `/locations/pacific-beach/`
- `/locations/pacific-beach/taekwondo/`
- `/locations/pacific-beach/kids-martial-arts/`

### University City / UTC

- `/locations/university-city/` — cover UTC as an alternate name on this canonical page rather than creating a duplicate UTC page.
- `/locations/university-city/taekwondo/`
- `/locations/university-city/little-ninjas/`
- `/locations/university-city/kids-martial-arts/`

### Clairemont

- `/locations/clairemont/`
- `/locations/clairemont/taekwondo/`
- `/locations/clairemont/kids-martial-arts/`

These served-area pages must say that students travel to the La Jolla dojo. They will use honest drive times, routes, landmarks, and parking information and will not imply a branch exists in Pacific Beach, University City, UTC, or Clairemont.

Adult and teen variants for Ring 1 will not be published initially unless Search Console, paid-search conversion data, or customer records show enough demand and the content can be genuinely distinct.

## Phase 4: Supporting Search-Intent Pages

Publish only after the foundation and La Jolla pages index and begin earning impressions:

| URL | Primary intent |
|---|---|
| `/guides/what-age-should-kids-start-martial-arts/` | Best age to start martial arts |
| `/guides/martial-arts-for-focus-and-adhd/` | Martial arts for focus / children with ADHD |
| `/guides/taekwondo-vs-karate-for-kids/` | Taekwondo vs. karate for children |
| `/guides/what-to-expect-first-taekwondo-class/` | First Taekwondo class preparation |
| `/guides/martial-arts-for-bullying-and-confidence/` | Martial arts, bullying, and confidence |

Do not create a "Karate classes" service page unless the business genuinely teaches a distinct karate program. Capture adjacent karate searches with an accurate comparison and clear explanation of the Taekwondo program.

## Shared Page Requirements

Every core, location, and service-area page will include:

- One primary query intent, unique title, meta description, H1, and self-referencing canonical.
- A call or trial-booking CTA above the fold on mobile.
- Visible phone and, for the physical location, verified address and hours.
- Specific class process, age/audience, schedule, techniques, progression, limitations, pricing or offer details when approved, instructor proof, and real FAQs.
- Original HTML testimonials and FAQs rather than iframe-only proof.
- Breadcrumbs and contextual links to the correct service and location parents.
- Optimized real photos with descriptive alt text and dimensions.
- `Service`, `LocalBusiness`/`WebPage`, `BreadcrumbList`, `Person`, and visible-content `FAQPage` schema as appropriate.

## Technical Implementation

1. Add an XML sitemap containing only canonical, indexable URLs and reference it from `robots.txt`.
2. Preserve or redirect valuable old and current URLs one-to-one; avoid redirect chains.
3. Add Services and Locations menus to desktop/mobile navigation and repeat core hubs in the footer.
4. Put all key copy, FAQs, reviews, address data, and links in server-rendered HTML.
5. Validate schema, canonicals, status codes, internal links, metadata, image dimensions, and mobile CTA placement before launch.
6. Submit the sitemap in Search Console and inspect a representative URL from every page type.
7. Verify mobile Core Web Vitals and reduce third-party iframe/script cost where it affects performance.

## GBP, Citations, Reviews, and Local Authority

1. Update the Google Business Profile to the single verified name, address, phone, hours, categories, services, photos, website URL, and appointment link.
2. Mark obsolete Eagle Martial Arts / 7438 Girard Ave profiles as closed and suppress outdated citations. Build or correct the distinct La Jolla Martial Arts / 7680 Girard Ave entity beginning with Google, Apple, Bing, Facebook, Yelp, and major martial-arts/fitness directories. Do not leave both entities appearing active.
3. Resolve duplicates rather than creating another listing.
4. Add authentic exterior, interior, instructor, and class photos regularly.
5. Implement an optional, non-gated review request using a direct Google review link and in-dojo QR code; respond to every review.
6. Pursue genuine local links through La Jolla community organizations, school/youth partnerships, sponsorships, local press, and martial-arts associations.

## Release Gates and Re-Measurement

- Recheck at 30, 45, 60, and 90 days.
- Track indexation, impressions, clicks, map-grid coverage, calls, forms, free-week bookings, and directions by landing page.
- Do not publish Ring 1 pages until the foundation is crawlable and the La Jolla batch is indexed.
- Stop expansion if pages remain unindexed or impressionless. Improve uniqueness, internal links, proof, and demand targeting before adding URLs.

## Required Client Confirmations Before Build

1. Public email and primary phone shown on `lajollatkd.com`.
2. Current weekday and Saturday hours, including whether Friday private lessons are active.
3. Exact age bands for each program.
4. Master Sam's verified rank, credentials, teaching history, and current instructor roster.
5. Whether Pacific Beach, University City/UTC, and Clairemont are approved target markets based on actual students and realistic travel.
6. Administrative access to the old domain, Google Business Profile, Search Console, GA4, and lead records.
