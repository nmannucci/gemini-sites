# BBT Homepage — To-Do List

## Completed Sections
- [x] Nav (fixed, blur backdrop)
- [x] Hero (split panel left/right, diagonal stripe, stats ticker)
- [x] Services Overview (5-column card grid, diagonal-clipped images, numbered cards, membership banner)
- [x] Academy Membership Details (2-column layout with pricing table + Product schema JSON-LD)
- [x] Coaches Preview (4 featured coaches in grid with E-E-A-T bios, "Meet All Coaches" CTA, Jon Peters quote banner)

## Remaining Sections (in order per SEO plan)

### 5. Why BBT / Differentiators (E-E-A-T section)
- [ ] Stats/proof points grid: "11+ Travel Teams Across 9U-14U", "2 Indoor Facilities, 3,000+ sq ft of turf", "Coaches from Cubs, Dodgers, UC Davis, Cal Poly & more"
- [ ] Self-contained answer blocks for AI extraction
- [ ] H2: "Why Train With BBT?"

### 6. Facilities
- [ ] H2: "Two Indoor Training Facilities"
- [ ] Photo gallery using facility images (Rocklin + EDH)
- [ ] Address for each location (NAP consistency for local SEO)
- [ ] Mention: turf, cages, netting, weight room
- [ ] Available images: `facility-img-1-4.jpg` (Rocklin), `facility-edh-1-7.jpg` (EDH)

### 7. FAQ Section
- [ ] H2: "Frequently Asked Questions"
- [ ] Q&A pairs (ages, locations, pricing, private lessons, travel teams)
- [ ] FAQPage structured data (JSON-LD)

### 8. CTA / Contact
- [ ] H2: "Start Training Today"
- [ ] Phone (916-465-5551), email (trainwithbbt@gmail.com), booking links
- [ ] Player Interest Form link, Waiver link

### 9. Footer
- [ ] Full NAP for both locations (Rocklin: 4283 Duluth Ave, EDH: 4990 Hillsdale Dr Suite 400)
- [ ] Social links (Facebook, Instagram, Twitter/X)
- [ ] Service area keywords: Rocklin, El Dorado Hills, Sacramento, Granite Bay, Folsom, Roseville

## Structured Data (JSON-LD)
- [x] Product schema (academy membership pricing)
- [ ] LocalBusiness x2 (one per location — NAP, hours, geo coords)
- [ ] SportsActivityLocation (facility details)
- [ ] Organization (brand info, logo, social profiles, founder)
- [ ] FAQPage (FAQ section)
- [ ] BreadcrumbList (navigation path)

## Technical SEO
- [ ] Open Graph + Twitter Card meta tags
- [ ] Canonical URL
- [ ] robots.txt (allow all crawlers including AI bots)
- [ ] XML sitemap
- [ ] llms.txt at root (site summary + key page links for AI crawlers)
- [ ] Verify: single H1, logical heading hierarchy, primary keyword in first 100 words
- [ ] All images: alt text, lazy loading
- [ ] Mobile responsive (all sections)

## Notes
- **File:** `index-claude.html` is a single HTML file with all CSS and JS inline
- **SEO plan:** Full spec in `site-plan/homepage-seo-plan.md`
- **Business info:** All data in `businessinfo.md`
- **Coach images available:** `coach-jon-peters.jpg`, `coach-cesar-tamayo.jpg`, `coach-logan-coe.png`
- **User prefers:** Clean, minimal design. Dark theme with angular/diagonal motifs. Yellow, cyan, pink accents. Iterate based on feedback — don't over-build.
