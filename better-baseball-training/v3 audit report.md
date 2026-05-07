# SEO Audit: Better Baseball Training

**URL:** https://betterbaseballtraining.com/  
**Date:** March 22, 2026  
**Platform:** WordPress on Flywheel  
**Business Type:** Local youth baseball training facility serving Rocklin and El Dorado Hills, CA  
**Audit Scope:** Public crawl only. No Google Search Console, GA4, or direct AI-platform dashboards were available for this review.

---

## Scores Overview

| Category | Score | Status |
|----------|-------|--------|
| Crawlability & Indexation | 45/100 | 🔴 |
| Site Speed & Core Web Vitals | 56/100 | 🟡 |
| Mobile-Friendliness | 72/100 | 🟡 |
| Security & HTTPS | 91/100 | 🟢 |
| On-Page Optimization | 74/100 | 🟡 |
| Content Quality & E-E-A-T | 68/100 | 🟡 |
| AI Search & LLM Visibility | 60/100 | 🟡 |
| **Overall SEO Health** | **64/100** | 🟡 |

**Weighted calculation:** (45×0.20) + (56×0.15) + (72×0.10) + (91×0.05) + (74×0.20) + (68×0.20) + (60×0.10) = **63.55**

---

## Executive Summary

This site still has a strong local SEO foundation: the homepage is indexable, the core titles and meta descriptions are cleaner than before, coach bios are detailed, FAQ content exists, `llms.txt` is live, and the coaches page includes strong person-level schema.

The biggest issue in this version is a settings mismatch. The main lesson pages are now marked `noindex, follow` even though they are still listed in `training-sitemap.xml`. If those lesson pages are meant to rank for terms like hitting lessons, pitching lessons, and baseball IQ training, they currently cannot do that. At the same time, old WordPress defaults still exist, and Google still shows a legacy Wix URL in public search results.

### Top 5 Priority Issues

1. **Remove `noindex` from lesson pages that are supposed to rank**
   All reviewed lesson URLs are `noindex, follow` today.
2. **Remove non-indexable URLs from `training-sitemap.xml`**
   `book-now/` and the lesson pages are in the sitemap despite being `noindex`.
3. **Redirect the legacy Wix URL that still appears in Google**
   `/copy-of-camp-registration` currently resolves to a 404 on the new site.
4. **Delete or disable leftover WordPress default URLs**
   `sample-page`, `hello-world`, the author archive, and the uncategorized archive are still live.
5. **Add crawlable content and improve load behavior on key templates**
   The schedule page is still mostly an iframe, and mobile Lighthouse recorded a weak LCP.

### Quick Wins

- If lesson pages should rank, switch them from `noindex, follow` to indexable immediately
- If `book-now/` should stay `noindex`, remove it from `training-sitemap.xml`
- 301 redirect `/copy-of-camp-registration` to the best current equivalent
- Add a privacy policy and footer link
- Replace Gmail with a branded domain email

---

## What Changed Since The Last Audit

### Improvements

- Lesson page titles are shorter and cleaner
- Lesson pages now include `FAQPage` schema
- The homepage still has strong FAQ formatting and local service-area targeting
- `book-now/` is now explicitly `noindex`, which is usually the right call for a form-first conversion page

### Regressions / New Risks

- The lesson pages now carry `noindex, follow`, which is a major ranking blocker if they are meant to be SEO landing pages
- `training-sitemap.xml` still lists those non-indexable lesson URLs, plus `book-now/`
- The legacy Wix URL is still discoverable in public search while the new site returns a 404 for that path instead of redirecting it

---

## Technical SEO Findings

### Crawlability & Indexation

**Issue:** Core lesson landing pages are `noindex, follow`  
- **Impact:** High  
- **Evidence:** `/lessons/hitting/`, `/lessons/pitching/`, `/lessons/infield-outfield/`, `/lessons/catching/`, and `/lessons/baseball-iq/` all return `<meta name='robots' content='max-image-preview:large, noindex, follow' />`.  
- **Fix:** If these are meant to rank, remove `noindex` and let them self-canonicalize as normal indexable service pages. If they are intentionally non-indexable, create separate indexable service pages for SEO.  
- **Priority:** High  

**Issue:** `training-sitemap.xml` includes URLs that are explicitly non-indexable  
- **Impact:** High  
- **Evidence:** `training-sitemap.xml` lists `/book-now/` and all reviewed lesson URLs, while those pages currently use `noindex, follow`.  
- **Fix:** Only include canonical, indexable URLs in sitemaps. Remove `book-now/` and any intentionally non-indexable lesson pages from the sitemap.  
- **Priority:** High  

**Issue:** A legacy Wix URL still appears publicly, but the current site serves a 404 instead of a redirect  
- **Impact:** High  
- **Evidence:** Public search still surfaced `https://www.betterbaseballtraining.com/copy-of-camp-registration`; the current host redirects `www` to non-`www`, then `/copy-of-camp-registration` on the live site returns `404`.  
- **Fix:** Map legacy Wix URLs to the closest current pages with 301 redirects, then request reindexing in Search Console.  
- **Priority:** High  

**Issue:** Default WordPress pages and archives are still live  
- **Impact:** Medium  
- **Evidence:** `/sample-page/`, `/hello-world/`, `/category/uncategorized/`, and `/author/nmannucci/` all return `200 OK`. They are noindexed, but they still exist publicly.  
- **Fix:** Delete the sample page and hello-world post. Disable or noindex author/category archives at the CMS level and remove them completely if they add no user value.  
- **Priority:** Medium  

**Issue:** Sitemap setup is split across WordPress core and a custom training sitemap  
- **Impact:** Medium  
- **Evidence:** `robots.txt` references both `wp-sitemap.xml` and `training-sitemap.xml`. The core sitemap only lists `/`, `/schedule/`, and `/coaches/`.  
- **Fix:** Keep the split only if it is being maintained carefully. Otherwise consolidate into one clean sitemap setup so indexation rules and sitemap inclusion stay aligned.  
- **Priority:** Medium  

### Site Speed & Core Web Vitals

**Issue:** Mobile LCP is still slow on the homepage  
- **Impact:** High  
- **Evidence:** Lighthouse mobile run on March 22, 2026 scored Performance `66/100` with `FCP 3.5s`, `LCP 6.5s`, `Speed Index 5.4s`, `48` requests, and `1,125 KiB` total transfer.  
- **Fix:** Reduce above-the-fold image weight, simplify the hero slideshow, defer non-critical JS, and trim unused JS/CSS.  
- **Priority:** High  

**Issue:** The homepage is visually strong but still media-heavy  
- **Impact:** Medium  
- **Evidence:** The hero uses multiple slideshow images and the Lighthouse run flagged estimated savings from unused JS (`89 KiB`) and unused CSS (`14 KiB`).  
- **Fix:** Trim slideshow complexity, audit theme/plugin scripts, and lazy-load or defer anything not essential to the first screen.  
- **Priority:** Medium  

**Issue:** The schedule page still depends on a third-party iframe for the core content  
- **Impact:** High  
- **Evidence:** `/schedule/` contains a short intro followed by a `syncapp.wodhopper.com` iframe. The key schedule information is not fully present in crawlable HTML.  
- **Fix:** Add indexable HTML content above or below the embed: lesson types, age bands, location options, schedule patterns, and how families should choose a program.  
- **Priority:** High  

### Mobile-Friendliness

**Issue:** The schedule embed can force horizontal scrolling on smaller screens  
- **Impact:** Medium  
- **Evidence:** The page uses `overflow:scroll` with an iframe `min-width: 600px`.  
- **Fix:** Replace the hard minimum width if possible, or add a mobile-friendly HTML summary so users do not depend on the iframe for core information.  
- **Priority:** Medium  

### Security & HTTPS

**Issue:** HTTPS and canonical host redirects are correct, but security headers are still light  
- **Impact:** Low  
- **Evidence:** `http://` redirects to `https://`, and `www` redirects to the non-`www` host. No `Strict-Transport-Security` header was observed.  
- **Fix:** Add HSTS after validating the full site and embedded tools. Consider a CSP if the site stack allows it cleanly.  
- **Priority:** Low  

---

## On-Page SEO Findings

### Titles, Meta Descriptions, and Heading Structure

**Issue:** The main title tags are cleaner than before, but the homepage title is still slightly long  
- **Impact:** Low  
- **Evidence:** Homepage title is `Youth Baseball Training | Rocklin & El Dorado Hills | Better Baseball Training`. Schedule and coaches page titles are also still on the longer side.  
- **Fix:** Keep the local keyword focus, but tighten templates further where possible so the most important phrase remains fully visible in SERPs.  
- **Priority:** Low  

**Issue:** Page targeting is being undercut by robots directives, not by copy structure  
- **Impact:** High  
- **Evidence:** Lesson pages now have cleaner titles, clear H1s, and FAQ blocks, but they are marked `noindex, follow`.  
- **Fix:** Align indexing settings with page intent. Right now the content is pointing one way while the robots tag points the other way.  
- **Priority:** High  

### Internal Linking

**Issue:** Internal linking is generally cleaner now, with no obvious `http://` carryovers on reviewed pages  
- **Impact:** Positive  
- **Evidence:** Reviewed templates used `https://betterbaseballtraining.com/#facilities` rather than the older `http://` version noted previously.  
- **Fix:** Keep internal links on canonical HTTPS URLs and periodically scan for regressions after theme updates.  
- **Priority:** Maintain  

### Image Optimization

**Issue:** Image delivery is improved, but the homepage still pays a cost for visual ambition  
- **Impact:** Medium  
- **Evidence:** The site uses optimized WebP assets and preload hints, but the mobile Lighthouse run still showed weak early rendering and LCP.  
- **Fix:** Keep the optimized formats, but reduce hero complexity and review whether every above-the-fold visual asset is necessary.  
- **Priority:** Medium  

---

## Content Quality & E-E-A-T Findings

**Issue:** Coach expertise signals are strong, but trust proof is still thin  
- **Impact:** High  
- **Evidence:** The coaches page now includes detailed bios and `Person` schema, but there was still no meaningful testimonial, review, or proof section on the reviewed core pages.  
- **Fix:** Add parent testimonials, player outcomes, team placements, reviews, or development stories to the homepage and key lesson pages.  
- **Priority:** High  

**Issue:** The site still appears to be missing a privacy policy  
- **Impact:** Medium  
- **Evidence:** `/privacy-policy/` returns `404`, and no privacy link was visible in the reviewed footer output.  
- **Fix:** Publish a privacy policy and link it from the footer. Add terms if memberships or payments require them.  
- **Priority:** Medium  

**Issue:** Contact still relies on a Gmail address  
- **Impact:** Medium  
- **Evidence:** `trainwithbbt@gmail.com` appears in page content, schema, footer, and `llms.txt`.  
- **Fix:** Move to a branded address such as `info@betterbaseballtraining.com` or `train@betterbaseballtraining.com`.  
- **Priority:** Medium  

**Issue:** There is still no real content engine beyond service pages and FAQs  
- **Impact:** Medium  
- **Evidence:** The reviewed public experience is centered on the homepage, coaches, schedule, booking, and lesson pages. There is still little evidence of an educational content library that can expand topical authority.  
- **Fix:** Add foundational content around youth hitting, pitching development, training by age, Rocklin baseball training, El Dorado Hills baseball instruction, and parent decision-stage questions.  
- **Priority:** Medium  

---

## AI Search Visibility Findings

**Note:** Direct citation testing inside Google AI Overviews, Perplexity, and ChatGPT/Search was not fully available from this environment. This section uses public search visibility, on-site AI readiness signals, robots access, schema, and entity evidence.

| Platform | Query Tested | Site Cited? | Competitor Cited? | Notes |
|----------|-------------|-------------|-------------------|-------|
| Google AI Overview | `Better Baseball Training Rocklin` | Not directly verifiable | Not directly verifiable | Public search still surfaced a stale legacy Wix URL rather than a clean current-page footprint. |
| Google AI Overview | `site:betterbaseballtraining.com` | Partially | No | Public indexing still exposes older URL history, which weakens brand/entity clarity. |
| Perplexity | `baseball lessons Rocklin CA` | Not directly verifiable | Not directly verifiable | The site has useful structured content, but external authority and review signals remain limited. |
| ChatGPT / Search | `youth baseball training Rocklin CA` | Not directly verifiable | Not directly verifiable | `llms.txt`, FAQ schema, and coach entities help, but noindexed lesson pages reduce the chance of service-page citation. |

## AI Search & LLM Visibility Sub-Scores

| Sub-Category | Score | Status |
|--------------|-------|--------|
| Content structure for AI extraction | 76/100 | 🟡 |
| Authority signals (stats, experts, sources) | 58/100 | 🟡 |
| Entity & brand presence | 42/100 | 🔴 |
| Schema markup completeness | 78/100 | 🟡 |
| Content freshness & accuracy | 64/100 | 🟡 |
| AI crawler access & llms.txt | 84/100 | 🟢 |
| **AI Search & LLM Visibility** | **60/100** | 🟡 |

**Issue:** `llms.txt` is still a real asset  
- **Impact:** Positive  
- **Evidence:** `/llms.txt` exists and includes core facts, lesson URLs, coaches, locations, pricing, and contact details.  
- **Fix:** Keep it updated whenever services, locations, or staff change.  
- **Priority:** Maintain  
- **Score impact:** AI crawler access & llms.txt  

**Issue:** Lesson pages now have FAQ schema, which is an improvement  
- **Impact:** Positive  
- **Evidence:** Reviewed lesson templates included `FAQPage` schema in addition to canonical and page-level structured data.  
- **Fix:** Keep the FAQ content specific, accurate, and aligned with the visible page copy.  
- **Priority:** Maintain  
- **Score impact:** Schema markup completeness; content structure for AI extraction  

**Issue:** Noindexed lesson pages weaken both search and AI citation potential  
- **Impact:** High  
- **Evidence:** The lesson URLs are currently marked `noindex, follow`, even though they contain the most specific service-language and FAQ content.  
- **Fix:** Make intended landing pages indexable so both search engines and AI systems can treat them as active canonical resources.  
- **Priority:** High  
- **Score impact:** Content structure for AI extraction; entity & brand presence  

**Issue:** Off-site entity signals still look thin  
- **Impact:** High  
- **Evidence:** Public search still reflects stale legacy URLs, and there was limited evidence of strong review/testimonial footprint in the reviewed site output.  
- **Fix:** Build review velocity, local citations, partner mentions, and direct branded references that reinforce the current domain and business identity.  
- **Priority:** High  
- **Score impact:** Entity & brand presence; authority signals  

---

## Prioritized Action Plan

### 1. Critical Fixes

| # | Task | Effort | Impact |
|---|------|--------|--------|
| 1 | Remove `noindex` from lesson pages if they are meant to rank | 30-60 min | Very High |
| 2 | Remove all non-indexable URLs from `training-sitemap.xml` | 30 min | High |
| 3 | 301 redirect `/copy-of-camp-registration` and any other legacy Wix URLs to the closest current pages | 1-2 hours | Very High |
| 4 | Delete `/sample-page/` and `/hello-world/`, and disable empty author/category archives | 1 hour | High |

### 2. High-Impact Improvements

| # | Task | Effort | Impact |
|---|------|--------|--------|
| 5 | Add crawlable HTML schedule content around the iframe | 1-2 hours | High |
| 6 | Simplify the hero experience and trim unused JS/CSS to improve LCP | 2-4 hours | High |
| 7 | Add testimonials, proof blocks, or player outcome stories to core pages | 2-4 hours | High |
| 8 | Publish a privacy policy and footer link | 1 hour | Medium |
| 9 | Replace Gmail with a branded email address | 1 hour | Medium |

### 3. Quick Wins

| # | Task | Effort | Impact |
|---|------|--------|--------|
| 10 | Tighten the homepage and schedule title templates slightly further | 30 min | Low |
| 11 | Confirm whether `book-now/` should remain `noindex`, then keep it out of sitemaps if yes | 15 min | Medium |
| 12 | Re-submit the cleaned sitemap set in Search Console after fixes | 15 min | Medium |

### 4. Long-Term Recommendations

| # | Task | Effort | Impact |
|---|------|--------|--------|
| 13 | Build local educational content for Rocklin and El Dorado Hills search demand | Ongoing | High |
| 14 | Add training pages by age, need, and parent decision stage | Ongoing | High |
| 15 | Strengthen off-site authority through reviews, citations, and local partnerships | Ongoing | High |

---

## Bottom Line

Better Baseball Training still has a much better on-site foundation than the older Wix setup, and there are real improvements in titles, FAQs, schema, and coach credibility.

The current blocker is not content creation. It is alignment. Right now the site is telling search engines to ignore the very lesson pages that look most capable of ranking, while the sitemap is still advertising them as if they are indexable. Fix that mismatch first, clean up the remaining legacy/default URLs, and the site will be in a much stronger position to perform in both classic search and AI-assisted discovery.
