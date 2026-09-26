# La Jolla Martial Arts: audit of the screenshot’s claims

Audited September 25, 2026. Site: https://lajollatkd.com/. Screenshot supplied by the user: IMG_9003.jpg (Semrush view dated September 24, 2026).

## Verdict

The email mixes useful optimization findings with unsupported conclusions and misinterpreted metrics. The live site has several worthwhile technical improvements, but the screenshot does not establish that the website is “very bad,” that nobody can find it organically, or that it receives only 38 actual visitors.

This is an evidence-based review of the screenshot’s claims, not a complete SEO campaign assessment. No website code or live configuration was changed.

## Scope and limitations

Fetched the live robots.txt, sitemap index, all 12 sitemap-listed pages, and all 21 distinct img-source URLs on those pages. Inspected HTML metadata, headings, image attributes, JSON-LD, host variants, a nonexistent URL, and a sample noindex advertising landing page. Checked the homepage’s rendered content and image/link attributes in a browser. Reviewed local source for context; live findings below come from production responses.

No authenticated Search Console, GA4, Google Business Profile, Semrush account, backlink export, or Screaming Frog crawl export was used. No location-controlled ranking/map-grid study, representative multi-platform AI prompt study, mobile viewport test, Lighthouse run, or real-user Core Web Vitals assessment was performed. Search-tool queries did not return this domain during this session; that is not a reliable Google indexation test. Crawlability is not proof of indexing or rankings. Numeric health and AI-visibility grades would imply precision these checks cannot support, so those categories remain unscored.

## Claim-by-claim findings

| Screenshot claim | Finding | Interpretation |
|---|---|---|
| “38 people” visit the site | Not established | Semrush Organic Traffic estimates monthly organic search visits from its keyword/ranking database; it is not an observed visitor count, total traffic, or number of leads. The screenshot is set to Desktop. |
| “38 traffic share” | Incorrect label | The screenshot shows Organic Traffic = 38 and Traffic Share = 9%. These are distinct metrics. |
| People cannot find the website organically | Unsupported conclusion | An estimated low traffic figure signals a question to investigate. It cannot establish zero discoverability or the cause of low visibility. |
| 6 organic keywords | Database-specific observation | This means keywords detected in the selected Semrush database/settings, not all queries for which the school appears or gets clicks. |
| 0 AI visibility | Unverified beyond screenshot | A zero reflects the provider’s measured prompt/topic coverage, not every possible AI answer or local query. No independent platform-wide visibility claim is justified. |
| Authority Score 2 means low credibility | Misleading framing | Authority Score is Semrush’s proprietary comparative SEO metric, incorporating links, estimated traffic, and spam factors. It is not a Google score or a measure of instructor/business credibility. The value was not independently reproduced. |
| Titles/descriptions violate Google guidelines | Overstated | All 12 pages have unique, nonempty titles and descriptions. Some are lengthy, but Google has no fixed character limit for either; display truncation is an optimization concern, not automatically a violation. |
| Images are missing alt attributes | Contradicted in this crawl | All 95 img instances have nonempty alt text. These represent 21 unique image URLs, with logos/photos repeated across pages. Presence does not establish perfect descriptive quality. |
| Images are missing image titles | Not a required fix by itself | HTML image title attributes are optional and do not replace alt text. Adding them everywhere is not a prerequisite for search visibility. |
| “13+ SEO issues” establishes poor site health | Not established | The screenshot appears to show 0 Issues, 4 Warnings and 9 Opportunities. These are categories of checks, not 13 severe defects. Exact affected URLs/settings require the original export. |

Semrush references: [Organic Positions](https://www.semrush.com/kb/494-organic-rankings-positions-report), [Authority Score](https://www.semrush.com/kb/747-authority-score-backlink-scores), [AI visibility data methodology](https://www.semrush.com/kb/1607-semrush-ai-visibility-data).

Google references: [Title links](https://developers.google.com/search/docs/appearance/title-link), [Meta descriptions](https://developers.google.com/search/docs/appearance/snippet), [Image SEO](https://developers.google.com/search/docs/appearance/google-images). See also [MDN image attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img) and [Screaming Frog’s definitions of issues, warnings and opportunities](https://www.screamingfrog.co.uk/seo-spider/issues/).

## Verified strengths

- All 12 sitemap-listed pages returned HTTP 200 and declare index,follow.
- Robots.txt allows crawling and references a working sitemap index.
- All 12 pages have a canonical pointing to the preferred non-www domain, unique metadata, one H1, and a responsive viewport meta tag.
- All 21 distinct image source URLs returned HTTP 200. No missing or empty alt attributes among 95 image instances.
- HTTP homepage variants redirect to HTTPS. The tested trailing-slash program URL redirects to its slashless counterpart.
- A nonexistent test URL returned a genuine 404, with noindex.
- The sampled /lp/karate advertising page is intentionally noindex and not in the public sitemap.
- The rendered homepage exposes programs, age groups, address, phone, hours, FAQs, and trial CTAs as readable content. Core information is also present in server-delivered HTML.

## Prioritized fixes

### 1. Compress and resize the heaviest images — medium priority

13 of 21 unique image files exceed 100,000 bytes. The largest is `/assets/Lead Form BG Image.jpg` at 2,886,557 bytes, used as a homepage gallery image. The Zumba banner is 605,231 bytes and the repeated logo is 467,602 bytes. These are concrete optimization opportunities; 100 KB is a crawler threshold rather than a universal failure limit.

Generate appropriately sized WebP/AVIF variants, use responsive srcset/sizes where useful, and keep below-the-fold images lazy-loaded. Preserve visual quality and do not lazy-load the primary hero. Measure mobile performance after optimization. File size alone does not establish a failing LCP score.

### 2. Correct the business schema type — medium priority

Every crawled page declares `@type: MartialArtsSchool`. The corresponding Schema.org type URL returned 404; this is not a recognized type. Use a supported type such as `SportsActivityLocation` or `LocalBusiness`, retain truthful school/program details, and validate the complete markup. This concerns machine-readable business classification; it does not mean ordinary page content cannot rank.

Reference: [SportsActivityLocation](https://schema.org/SportsActivityLocation).

### 3. Redirect www to the preferred non-www hostname — medium priority

Both `https://www.lajollatkd.com/` and its `/kids-martial-arts` page return 200 without redirecting, while their canonicals point to the equivalent non-www URLs. That likely explains the screenshot’s “Canonicalised” finding: its crawl begins on www. Confirm all host routes, then add a permanent redirect preserving paths and queries. Keep the current canonical tags.

Canonicalized duplicates are not inherently errors, and the canonical already provides a consolidation signal. A redirect makes the preferred version consistent for visitors and crawlers. Reference: [Google canonicalization guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

### 4. Add intrinsic image dimensions — medium/low priority

All 95 img instances omit explicit width and height attributes. Add accurate dimensions and retain responsive CSS. Existing CSS constrains several image containers, so missing attributes do not prove visible layout shift; test actual CLS rather than asserting it fails. The screenshot’s “Missing Size Attributes” is a different check from missing alt attributes.

### 5. Tighten selected metadata — low priority

About and Birthday Parties have titles over 60 characters (68 and 65). Six descriptions exceed 155 characters; five exceed 160. Birthday Parties is the longest at 214, followed by Game Zone at 190 and About at 174. Prioritize concise, relevant copy and put the useful information first. Do not pad the short, clear Contact or Schedule titles just to meet a crawler’s minimum.

### 6. Clean up minor semantic/social details — low priority

The homepage skips some heading levels (for example H1 to H3 for numerical statistics, and H2 to H4 for steps). Repeated H2s across pages and multiple H2s on a page are not inherently defects; use a logical hierarchy for readers and assistive technology. The footer Facebook link currently points to facebook.com rather than the school’s profile; replace it with a verified profile URL or omit it.

The homepage response lacks Content-Security-Policy, matching a visible screenshot warning. Treat this as security hardening, not evidence of poor rankings. Any CSP should be tested against forms, analytics and embeds before enforcement.

## What should determine the SEO strategy

1. Use Search Console to compare the latest complete 28 days with the previous 28 days and review a 90-day trend: clicks, impressions, queries, pages, countries and devices. Separate branded school-name queries from service queries such as kids martial arts La Jolla and Taekwondo La Jolla.
2. Inspect homepage and priority program URLs in Search Console for indexation and Google-selected canonicals. Confirm sitemap processing and any manual actions before diagnosing traffic causes.
3. Use GA4 to measure Organic Search sessions and completed trial inquiries. Validate conversion events; the presence of analytics code does not prove tracking is correct.
4. Review Google Business Profile separately for discovery and calls/directions/website clicks. Measure actual local map visibility instead of assuming a desktop domain estimate captures it.
5. If AI discovery is a business priority, track a defined set of local prompts across named platforms, recording dates, location/context, mentions and citations. Zero in a vendor overview is a baseline to investigate, not proof of universal absence. Google says its AI search features need no special additional optimization or special schema: [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features).

## Page inventory

Character counts below are HTML-decoded text counts, not rendered pixel widths. Thresholds are advisory.

| Page | Title characters | Description characters | Image instances | Missing alt | Missing width/height |
|---|---:|---:|---:|---:|---:|
| / | 49 | 151 | 17 | 0 | 17 |
| /about | 68 | 174 | 4 | 0 | 4 |
| /adult-martial-arts | 58 | 144 | 9 | 0 | 9 |
| /birthday-parties | 65 | 214 | 9 | 0 | 9 |
| /contact | 34 | 130 | 3 | 0 | 3 |
| /game-zone | 57 | 190 | 11 | 0 | 11 |
| /kids-martial-arts | 52 | 171 | 9 | 0 | 9 |
| /little-ninjas | 57 | 158 | 9 | 0 | 9 |
| /programs | 32 | 129 | 9 | 0 | 9 |
| /schedule | 38 | 116 | 3 | 0 | 3 |
| /teen-martial-arts | 51 | 166 | 9 | 0 | 9 |
| /zumba | 45 | 125 | 3 | 0 | 3 |

## Evidence files

- `live-crawl.json`: per-page titles, descriptions, headings, image attributes, canonicals, links and JSON-LD; robots and sitemap responses.
- `image-sizes.json`: HTTP status and downloaded byte counts for 21 unique img-source URLs. This is not a full browser page-weight measurement and excludes CSS background images, srcset alternatives and third-party resources.
- `variants.json`: selected protocol, hostname, trailing-slash, 404 and landing-page checks.

The screenshot’s September 24 crawl and this September 25 production check can differ due to timing, hostname, crawl configuration, and scope. Conclusions here apply to the measured pages at audit time.
