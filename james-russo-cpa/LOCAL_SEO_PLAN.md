# James J. Russo, CPA — Local SEO Silo Plan

Benchmark date: August 3, 2026

## Baseline

- A `site:jamesjrussocpa.com` search surfaced the legacy homepage; the search result did not expose a reliable total beyond that page.
- Jim's legacy site and BBB profile surfaced for the exact-name search.
- Jim was not observed on the first page of the generic web results checked for `tax preparation San Francisco CPA` or `tax planning San Francisco CPA`.
- Map-pack positions were not benchmarked because no geo-grid rank tracker or Google Business Profile connection is available in this workspace.
- Search Console impressions, clicks, and current indexed-page coverage are unavailable.
- Monthly calls, qualified form leads, and closed-client attribution are unavailable.

This means the architecture can be improved now, but attribution will remain rough until Search Console, a geo-grid rank tracker, and call/form tracking are connected.

## Audit findings before the silo rebuild

- Six useful service pages existed, but they were flat and had no parent service pillars.
- Six county pages existed, but every service page linked to the same generic county page rather than a service-specific local page.
- No service × place pages existed.
- The main navigation linked services but not individual location pages.
- The footer linked the core pages, but it did not reinforce a parent/child service relationship.
- Service pages included `Service` and FAQ schema, but the provider relationship used a repeated inline business object instead of a stable business `@id`.
- County pages had no page-specific local schema or visible breadcrumbs.
- No XML sitemap, `robots.txt`, or `llms.txt` route existed.
- The site was responsive and already had a sticky contact CTA, tap-to-call links, unique titles, canonical tags, modern WebP imagery, and a homepage contact form.

## Implemented silo

```text
/  San Francisco CPA & tax preparation
│
├── /services/tax-preparation/  Tax Preparation pillar
│   ├── /services/tax-preparation/individual-tax-preparation/
│   │   └── /individual-tax-preparation-san-francisco-ca/
│   ├── /services/tax-preparation/small-business-tax-services/
│   │   └── /small-business-tax-services-san-francisco-ca/
│   └── /services/tax-preparation/retirement-and-life-change-planning/
│       └── /retirement-and-life-change-planning-san-francisco-ca/
│
├── /services/tax-planning/  Tax Planning pillar
│   ├── /services/tax-planning/year-round-tax-planning/
│   │   └── /year-round-tax-planning-san-francisco-ca/
│   ├── /services/tax-planning/stock-option-tax-planning/
│   │   └── /stock-option-tax-planning-san-francisco-ca/
│   └── /services/tax-planning/real-estate-and-landlord-tax/
│       └── /real-estate-and-landlord-tax-san-francisco-ca/
│
└── County hubs
    ├── /areas/san-francisco-county/
    ├── /areas/marin-county/
    ├── /areas/san-mateo-county/
    ├── /areas/santa-clara-county/
    ├── /areas/alameda-county/
    └── /areas/contra-costa-county/
```

The six counties were confirmed by Jim in the July 29 email. His stated priority order is San Francisco, Marin, and San Mateo first, with a smaller client base in Santa Clara, Alameda, and Contra Costa.

## Internal-link rules now used

- Homepage links down to both service pillars and the six sub-services.
- Each pillar links down to its three sub-services and corresponding San Francisco pages.
- Each sub-service links up to its parent pillar and down to its San Francisco service-area page.
- Each San Francisco service-area page links up to the parent pillar and sub-service, across to the other San Francisco services, and out to the county hubs.
- Navigation and footer carry the two pillars, all six services, and all six county hubs.
- Visible breadcrumbs and `BreadcrumbList` schema reinforce the same hierarchy.
- Old flat service URLs receive 301 redirects to their nested equivalents.

## Phased publishing plan

### Phase 1 — Foundation and home turf (implemented)

- Two location-neutral service pillars.
- Six location-neutral nested service pages.
- Six unique San Francisco service-area pages.
- County hubs, navigation, footer, schema, sitemap, robots, and redirects.

### Phase 2 — Ring 1 after indexation holds

- Marin County service-area pages for the services that have real demand and client examples.
- San Mateo County service-area pages for the services that have real demand and client examples.
- Interview Jim first for county-specific FAQs, common client situations, and how meetings/documents are handled.

### Phase 3 — Ring 2 only while indexation remains healthy

- Santa Clara, Alameda, and Contra Costa service-area pages.
- Build one service and county at a time rather than publishing the full 18-page matrix at once.
- Stop expansion if submitted pages remain unindexed or previously indexed pages drop out.

## Measurement schedule

- August 3, 2026: baseline recorded with the limitations above.
- September 2, 2026 (30 days): check sitemap discovery, indexation, impressions, and initial long-tail queries.
- September 17, 2026 (45 days): compare San Francisco service-area page impressions and identify which pages need deeper content.
- October 2, 2026 (60 days): evaluate whether Ring 1 should begin.

## Tracking to configure before judging results

- Verify `https://www.jamesjrussocpa.com` in Google Search Console and submit `/sitemap.xml`.
- Configure a geo-grid tracker for the three head terms: `CPA San Francisco`, `tax preparation San Francisco`, and `tax planning San Francisco`.
- Track clicks on phone, email, and form-submit actions separately.
- Record qualified leads and new clients by landing page.

## Off-site priorities

1. Confirm or claim the Google Business Profile and make the NAP format authoritative. The public site intentionally shows `Middle Sunset, San Francisco, CA` rather than the street address, so GBP strategy must respect Jim's privacy preference and Google's eligibility rules.
2. Use `Accountant` or `Certified Public Accountant` only if those categories are available and accurately describe the practice; confirm against the top local map-pack competitors before choosing the primary category.
3. Add the six real services and confirmed service areas to GBP.
4. Point GBP's main website link to the homepage. Use per-service links to the matching San Francisco service-area pages when GBP supports them.
5. Audit NAP consistency on Google, Apple Business Connect, Bing Places, BBB, Facebook, and Yelp before creating more citations.
6. Build a steady, policy-compliant review request habit. Do not gate, buy, or incentivize reviews.
7. Pursue legitimate local citations and links through San Francisco business groups, neighborhood associations, Golden Gate University alumni connections, and professional accounting organizations where membership is real.

## Content needed from Jim before Ring 1

- The five questions clients ask most often for each service.
- Whether remote work is available everywhere or differs by county.
- Real examples of Marin and San Mateo situations he commonly handles, without identifying clients.
- Whether any local organizations, associations, or community relationships can be named publicly.
- The exact public-facing NAP and Google Business Profile URL.
