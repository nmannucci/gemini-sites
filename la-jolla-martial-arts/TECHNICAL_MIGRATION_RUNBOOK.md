# Technical Migration Runbook

Updated: August 6, 2026

## Implemented in this repository

- XML sitemap generation with only canonical, indexable pages.
- `robots.txt` sitemap discovery and a compatibility redirect from `/sitemap.xml` to `/sitemap-index.xml`.
- Permanent redirects for retired current-site routes that have valid equivalents.
- A `410 Gone` response for inactive Fitness Kickboxing URLs.
- A custom, non-indexable `404` page.
- One canonical hostname in page metadata: `https://lajollatkd.com`.
- No-index rules for landing pages, the thank-you page, and the privacy page.
- Security headers and immutable caching for built assets.
- Cloudflare Worker request validation, method handling, typed bindings, structured errors, and observability.
- GA4 `generate_lead`, Google Ads lead conversion, and phone-click tracking without duplicate thank-you events.
- Automated SEO artifact checks in `npm run check:seo`.

## Production release sequence

1. Run `npm run build`, `npm run check:seo`, `npm run types:worker`, and `wrangler deploy --dry-run`.
2. Confirm the production `GHL_WEBHOOK_URL` secret and D1 migrations are present.
3. Deploy the Worker and static assets.
4. Test the homepage, every active program page, `/robots.txt`, `/sitemap-index.xml`, a redirect, `/fitness-kickboxing`, a missing URL, and a real lead submission.
5. Confirm GA4 and Google Ads receive one lead event per completed form.

## Cloudflare account actions

These are hostname-level rules and cannot be implemented by the static `_redirects` file alone:

1. Create a `301` redirect from `https://www.lajollatkd.com/*` to `https://lajollatkd.com/$1`, preserving the query string.
2. Attach `lajollamartialarts.com` to a redirect-capable Cloudflare zone or its current host.
3. Apply every mapping in `MIGRATION_REDIRECT_MAP.csv` at the old host. Preserve one-to-one paths and return `410` for retired pages with no equivalent.
4. Keep both old and new domains verified while Google processes the migration.

## Search Console actions

1. Verify both domain properties.
2. Submit `https://lajollatkd.com/sitemap-index.xml`.
3. Inspect the homepage, one service page, the contact page, and the custom `404` response.
4. Confirm the old URLs resolve directly to their final destinations without chains.
5. Use Search Console's Change of Address workflow if the old site is a full-domain move and access is available.
6. Monitor indexing, crawl errors, canonical selection, clicks, and impressions weekly for at least 90 days.

## Release hold

Do not publish new service/location architecture or redirect existing program pages into it until those destination pages are built, reviewed, and included in the sitemap. This prevents redirects to missing or thin pages.
