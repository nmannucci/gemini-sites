# BBT Local SEO — Audit & Build Order

Output of the `local-seo` skill run on `betterbaseballtraining.com`, 2026-08-03. Strategy context in [LOCAL_SEO_ACTION_PLAN.md](./LOCAL_SEO_ACTION_PLAN.md).

**Verdict: do not build new pages yet.** Two measurement blockers have to clear first. The architecture work in Phase 0 is ready to go and ships zero new pages.

**Total new indexable pages once unblocked: 2–5.**

---

## Stage 1 — Benchmark · ⛔ BLOCKED

### Blocker 1 — Search Console is watching the wrong hostname

```
GSC property tracked:  https://betterbaseballtraining.com/   ← apex, URL-prefix
Apex actually returns: HTTP 308 → https://www.betterbaseballtraining.com/
www returns:           HTTP 200  ← the real site
```

The site serves on **www**; the connected property is the **apex**. A URL-prefix property only collects data for its exact hostname, so nearly everything the site earns is landing in a www property nobody is watching.

**Fix:** add `sc-domain:betterbaseballtraining.com` in Search Console — a domain property covers apex, www, http and https together. `lajollatkd.com` is already set up this way, so the pattern is familiar.

### Blocker 2 — visibility collapsed ~98% in July

Search Score from the tracker:

| Window | Score |
|---|---|
| Apr–Jun 2026 | 2.5 – 5.8 (normal band) |
| Jul 9 | 1.12 |
| Jul 15 | 0.31 |
| Jul 17 | 0.02 |
| Jul 25 (latest) | **0.05** |

Supporting numbers: previous month 39 impressions / 4 clicks / avg position 15.1 → latest 3 impressions / 0 clicks. Of **154 tracked keywords, only 3 register any impressions.**

The timing lines up with the Wix → Vercel migration and the move to www, so the leading hypothesis is that this is largely a *measurement* artifact of Blocker 1 rather than a real collapse in traffic. That is a hypothesis, not a finding — it can't be confirmed until the domain property has been collecting for two or three weeks.

Two details that hint at a genuine indexation problem underneath, not just mismeasurement:

| Keyword | Volume | Ranking page |
|---|---|---|
| better baseball locations | 27,100 | **`/privacy-policy/`** |
| bbt baseball | 170 | **`/privacy-policy/`** |
| better baseball | 60,500 | `/lessons/infield-outfield/` |

The privacy policy ranking for a locations query means Google's picture of this site is badly out of date or badly confused. The tracker also has **5 content-decay reports and 2 cannibalization reports** queued for this domain.

### What Stage 1 should have produced, and can't yet

Head-term rank (organic + map pack), grid map-pack visibility, indexed page count, and current monthly leads. None of it is trustworthy until the property is fixed. Building service-area pages now would mean shipping into a blind spot and having no way to attribute the result — which is the exact failure Stage 1 exists to prevent.

**Do this first, then wait 2–3 weeks:**

1. Add the `sc-domain:` property and point the rank tracker at it.
2. Submit the sitemap under the new property.
3. Run a `site:` query to get a real indexed-page count.
4. Confirm whether the July drop persists once www data is flowing.
5. Pull the 5 content-decay and 2 cannibalization reports.

---

## Stage 2 — Audit · findings

Independent of the ranking data, so these hold regardless of how Stage 1 resolves.

### 🔴 1. The five lesson pages are not location-neutral

Every page in `src/data/lessons.ts` carries both locations in its headline *and* meta description:

```
headline: 'Hitting Lessons in Rocklin & El Dorado Hills'
meta:     'Hitting lessons in Rocklin and El Dorado Hills for youth baseball…'
```

Same pattern on pitching, infield-outfield, catching, baseball-iq.

These are Layer-2 service pages that should stay location-neutral. As written they compete directly with `/baseball-lessons-rocklin` and `/baseball-lessons-el-dorado-hills` for the same local queries — two of your own pages splitting one signal. This is the single clearest cause of the cannibalization report on the account, and it's the exact issue the source calls out: *"service pages will accidentally rank for pages you're not intending to — you typically want to keep it as location-neutral as possible."*

Corroborating evidence: `better baseball` currently ranks via `/lessons/infield-outfield/` — a service page pulling a query that belongs elsewhere.

**Fix:** `Hitting Lessons for Youth Baseball Players` / `…Near You`. Move the location language down into the location pages.

### 🔴 2. Both location pages link to the *same* generic lesson pages

`/baseball-lessons-rocklin` and `/baseball-lessons-el-dorado-hills` both link out to the identical `/lessons/hitting`, `/lessons/pitching`, etc.

For a two-location business the source is specific about this [16:38]: *"on each of the location pages, you're linking out to their respective version of that service page… that gives you one-to-one targeting within those areas."* Right now both locations funnel into one shared set, so neither builds independent authority in its own area.

This is the strongest argument for the Phase 2 pages below — but only for the one or two lessons that actually have local demand, not all five in both cities.

### 🟠 3. Neither location page is in the navigation

`src/data/nav.ts` → `primaryMenu`: Home, Lessons (+5 children), Academy, Travel Baseball, Schedule, Coaches, **Facilities**, Book Now.

"Facilities" points at a homepage anchor (`homeSectionUrl('facilities')`), not at the two location pages. The skill's rule is that every core service *and every core location* belongs in the nav — it's the strongest internal linking surface on the site, and the two location pages are currently reachable only from body content.

**Fix:** turn Facilities into a dropdown with Rocklin and El Dorado Hills pointing at the real location pages.

### 🟠 4. LocalBusiness nodes exist but are missing their local properties

> **Corrected 2026-08-02.** This finding originally read "No LocalBusiness entity anywhere,"
> based on a schema inventory that missed `Footer.astro`. That was wrong — see below.
> The original prescribed fix would have created duplicate conflicting entities.

`src/components/Footer.astro` already emits two complete LocalBusiness nodes, site-wide on
every page:

```
"@type":["LocalBusiness","SportsActivityLocation"]   @id #rocklin-location
"@type":["LocalBusiness","SportsActivityLocation"]   @id #edh-location
```

Each has `name`, `image`, `url` → its own location page, `telephone`, `email`, a full
`PostalAddress`, and `parentOrganization` → the Organization node. Verified rendering in
`dist/` and live on `/baseball-lessons-rocklin`.

The real gap is narrower: those nodes carry none of the properties that actually feed
local/map understanding.

**Missing:** `geo` (GeoCoordinates), `hasMap`, `openingHoursSpecification`, `sameAs` → the
two Google Business Profiles, `priceRange`.

**Fix:** additive edits to the *existing* nodes — do not create new ones. `sameAs` and
`areaServed` can ship immediately. `geo`, `hasMap`, and `openingHoursSpecification`
are **blocked on client data**: the repo has no hours, no coordinates, and no GBP map URLs
anywhere, and inventing them would put false business information into structured data.

**Also flagged:** both location nodes share one phone (`916-465-5551`). If Rocklin gets its
own GBP, a shared number undercuts NAP consistency across two distinct listings.

### ✅ What's already right

Genuinely better than most sites this playbook gets pointed at:

- **Schema coverage is good** — `Service`, `FAQPage`, and `BreadcrumbList` on both lesson and location pages, plus two site-wide `LocalBusiness` / `SportsActivityLocation` nodes. Only the local *properties* on those nodes are missing (issue #4).
- **Data-driven Astro routing** — `[seoPage].astro` + `seoPages.ts`, `lessons/[slug].astro` + `lessons.ts`. New pages are data entries, not hand-built files. This is the ideal platform for this playbook, and it's why the build stays cheap once unblocked.
- **`batting-cages-rocklin` already exists** — a real Layer-3 service × place page.
- **Two genuine locations** with real addresses, so location pages are honest, not manufactured.

---

## Stage 3 — Silo design

**Delivery model: they travel to you** (players come to Rocklin or EDH) → **tight radius.**

`BUSINESS_INFO.md` claims a service area of Rocklin, El Dorado Hills, Sacramento, Granite Bay, Folsom, Roseville. Sacramento is a ~25-minute drive with a materially different SERP — it belongs in copy as a region reference, not as a page. The honest ring is Roseville (adjacent to Rocklin), Folsom and Granite Bay (adjacent to EDH).

```
Homepage — "youth baseball training Rocklin / Sacramento area"
│
├── SERVICE PILLARS (location-neutral)
│   ├── /baseball-academy
│   ├── /travel-baseball
│   └── /lessons/{hitting, pitching, infield-outfield, catching, baseball-iq}
│         ↑ strip "in Rocklin & El Dorado Hills" — issue #1
│
├── /baseball-lessons-rocklin              ← LOCATION HUB
│   ├── /batting-cages-rocklin             ← exists
│   └── → its own lesson variants          ← issue #2, Phase 2
│
└── /baseball-lessons-el-dorado-hills      ← LOCATION HUB
    └── → its own lesson variants
```

No new pillar tier is needed — `baseball-academy` and `travel-baseball` already serve that role, and the homepage owns the head term.

---

## Stage 4 — Build order

Every phase gates on the previous one being indexed and holding **two crawl cycles** (~2–3 weeks). Red signal — "Crawled – currently not indexed", or indexed-then-dropped — means stop expanding and deepen instead.

### Phase −1 — Unblock measurement · **0 new pages**
The five Stage 1 steps. Nothing else starts until the `sc-domain:` property has 2–3 weeks of data.

### Phase 0 — Fix what exists · **0 new pages**

**Technical indexation cluster** — found in a separate audit pass, missing from this
document's original Stage 2. These matter more than anything below them, because they
govern which URLs Google consolidates on at all:

1. **Canonicals** — `/`, `/privacy-policy`, `/schedule`, `/book-now`, and `/404` all
   declared `.html` canonicals pointing at URLs that 308-redirect. Root cause: `build.format:
   'file'` makes `Astro.url.pathname` yield `/index.html`, and only pages passing an explicit
   `canonical` prop escaped it. Fixed at the `Layout.astro` level so future pages inherit it.
2. **`robots.txt` and sitemap** — both 404'd. No `@astrojs/sitemap`, no `public/robots.txt`.
3. **`/404` returned 200 with `index,follow`** — an indexable soft-404. (Genuinely
   nonexistent URLs *do* return a real HTTP 404 — that part was already correct.)
4. **`/privacy-policy` set to `noindex,follow`** — it is the recorded landing page for
   "bbt baseball" and "better baseball locations".

**Local architecture:**

5. Decontaminate the five lesson pages (issue #1) — resolves the location-neutrality violation.
6. Location pages into the nav (issue #3).
7. `sameAs` + `areaServed` onto the existing LocalBusiness nodes (issue #4). `geo`, `hasMap`,
   and `openingHoursSpecification` stay blocked until the client supplies hours, coordinates,
   and GBP URLs.
8. GA4 `generate_lead` + `tel:` click events — without these, location pages can only be
   judged on traffic, not leads.
9. Apply the page template to both location pages — process section with pricing (you have it:
   $250 Rocklin / $299 EDH), 6–10 FAQs with ~⅓ locally specific, map embed.
10. GBP per-location URLs → the matching location page, not the homepage.

**Known and deliberately not fixed:** legacy indexed URLs take two redirect hops
(`apex/coaches/` → `www/coaches/` → `www/coaches`). The apex→www hop is Vercel domain-level
config, not repo config, and Google follows short chains without meaningful signal loss.
Low value, dashboard-only change — left alone.

**Gate:** cannibalization report clears; both location pages indexed under the new property.

### Phase 1 — One nearby-area page · **1 new page**
`/baseball-lessons-roseville` — nearest genuine gap, adjacent to the Rocklin facility. Real drive time and route from Roseville, which teams/leagues it serves, honest framing that the facility is in Rocklin. No fake address, no second GBP.

**Gate:** indexed and holding 4 weeks, showing impressions for Roseville queries.

### Phase 2 — Second area *or* first one-to-one lesson page · **1 new page**
Whichever the Phase 1 data argues for: `/baseball-lessons-folsom` (EDH side), or the first location-specific lesson page for the highest-demand lesson (issue #2). Let Search Console decide rather than guessing.

### Phase 3 — Conditional · **0–2 new pages**
One at a time, fresh gate each. **Hard ceiling: 5 new pages.** If a page stalls, improve it — don't add three more like it.

---

## Why this isn't a 150-page build

The playbook's `pillars × sub-services × places` math would suggest 5 lessons × 5 areas = 25+ pages here. It doesn't apply, for three reasons:

1. **Players travel to the facility.** Beyond ~15 minutes the pages have nothing true to say, and Sacramento is a different SERP.
2. **Two real locations, not six.** Pages for areas without a facility have to be honest guides to a drive, and only a few areas justify one.
3. **Measurement is broken.** Adding 25 pages to a site whose visibility just fell 98% would make the underlying problem permanently unattributable.

**2–5 new pages, gated** — with most of the near-term gain coming from Phase 0, which ships nothing new at all.
