# seo-audit-bbt-site-plan

## Summary
- This plan is scoped to repo/theme changes Codex can implement in `/Users/nico/Gemini/gemini-sites/better-baseball-training/house36-bbt`.
- The audit reflects live-site behavior, but the source theme is the implementation source of truth.
- If a fix is already partly present in the theme, preserve and extend it instead of re-implementing it from scratch.

## Implementation Changes

### Indexation and routing
- Fix the virtual lesson and booking routes in `functions.php` so they behave like first-class pages in headers and query state:
  - no `?p=1` / `posts/1` associations
  - correct canonical
  - correct title/meta output
  - no `hello-world` fallback in form hidden fields or response metadata
- Force low-value WP-native surfaces out of SEO circulation until a real blog exists:
  - author archive
  - category archive
  - default post index
  - single post template
- Exclude those low-value surfaces from sitemap output where the theme can control it.
- Keep sitemap output limited to intended ranking URLs:
  - homepage
  - coaches
  - schedule
  - booking
  - lesson pages

### Metadata, copy density, and internal linking
- Shorten title generation in `functions.php` for home, schedule, booking, and lesson pages while preserving local intent.
- Expand `page-schedule.php` with crawlable HTML copy around the iframe:
  - what the schedule covers
  - ages served
  - locations
  - lesson types
  - next-step CTA
- Expand `page-book-now.php` and `page-lesson.php` with additional explanatory copy so the form is not the main content and each page has stronger supporting text.
- Replace any hardcoded `http://betterbaseballtraining.com/#facilities` links with canonical helper-based `https` URLs.
- Centralize repeated contact/location data in theme helpers so phone, email, addresses, and future trust updates are managed in one place.

### Schema, trust, and page structure
- Reuse the existing schema pipeline rather than adding parallel JSON-LD blocks.
- Ensure each focus page outputs one correct `WebPage`, appropriate `BreadcrumbList`, shared `Organization` / location schema, and lesson-level `Service` schema without duplicates or contradictory entities.
- Add `FAQPage` schema to lesson pages only if the visible Q&A remains real FAQ content with matching text.
- Add a privacy-policy footer slot/link only if a real page exists or is created in the same pass; otherwise leave it out.
- Do not fabricate testimonials, review counts, or legal claims.

### Performance and mobile fixes
- Keep the current image optimization helpers, but ensure only the primary above-the-fold hero asset is high priority and non-critical imagery remains lazy.
- Make the schedule embed mobile-safe:
  - remove forced horizontal overflow where possible
  - add responsive container behavior
  - ensure the page is understandable without interacting with the iframe
- Preserve empty alt text only for truly decorative assets; keep meaningful alt text on coaches, facilities, and service imagery.

## Test Plan
- Verify `<title>`, canonical, and meta description on:
  - home
  - coaches
  - schedule
  - booking
  - every lesson URL
- Verify lesson and booking URLs no longer emit `?p=1` / `posts/1` associations in response headers or form hidden fields.
- Verify author/category/post placeholder surfaces are excluded from sitemap output and emit `noindex` if still reachable.
- Verify the schedule page contains meaningful crawlable HTML beyond the iframe and does not force horizontal scrolling on mobile width.
- Verify no internal nav/footer/template links point to `http://betterbaseballtraining.com/...`.
- Verify schema output has one valid set per page type and no duplicate/conflicting breadcrumb or webpage nodes.
- Verify no fabricated testimonial or privacy-policy copy was introduced.

## Out-of-Band Follow-Ups
- Delete or redirect the actual WordPress database entries for `sample-page` and `hello-world` if they still exist in admin.
- Audit and resubmit live redirects for old Wix URLs, then request reindexing in Search Console.
- Update Google Business Profile, review acquisition, and other off-site entity work.
- Replace Gmail with a branded domain email once the business has one available.

## Assumptions
- Edit the source theme at `/Users/nico/Gemini/gemini-sites/better-baseball-training/house36-bbt`, not the static export files.
- The audit reflects the live site, but the source theme already contains some partial SEO fixes; diff current theme behavior before changing helpers.
- Scope is code/theme changes only. WordPress-admin cleanup, Search Console actions, and business-profile work are not code tasks.
