# better-baseball-training — Claude Instructions

## Live site: stack & backend (read this first)

The **public production site** at `https://www.betterbaseballtraining.com` is the
**Astro** app in `bbt-site/` — NOT the `house36-bbt` WordPress theme (that's a separate
track documented further below).

- **Hosting**: **Vercel** project `better-baseball-training` (team `nico-mannuccis-projects`),
  **git-connected** to `github.com/nmannucci/gemini-sites`, production branch `master`,
  **Root Directory `better-baseball-training/bbt-site`**, framework Astro (static).
  → Any change under `bbt-site/` deploys automatically on **push to `master`** (no CLI step).
- **Domain**: registered/DNS-hosted at **Wix** (`ns*.wixdns.net`). Connected to Vercel via
  DNS records only — apex `A 76.76.21.21`, `www CNAME cname.vercel-dns.com` — **no
  nameserver change** (that's why Vercel, not Cloudflare, hosts). Apex 308-redirects to `www`.
- **Lead form** (`/api/lead`): the Astro form POSTs JSON to `/api/lead`, which
  `bbt-site/vercel.json` **rewrites (server-side proxy) to Cloudflare**
  `https://better-baseball-training.pages.dev/api/lead`. Same-origin to the browser → no CORS.
- **Lead backend** = **Cloudflare Pages Function** (`bbt-site/functions/api/lead.ts`) →
  writes the lead to **Cloudflare D1** database `bbt-leads`
  (id `e4b35f56-eaba-44c6-9238-446b77023c6c`) **+** forwards it to a **GoHighLevel
  inbound webhook** (`GHL_WEBHOOK_URL`); **GHL sends the notification email** and creates
  the contact. (Resend was dropped — Wix DNS can't host the SPF/DKIM records a verified
  Resend sending domain needs; that's also why email isn't sent from this domain directly.)
- **Config source of truth = `wrangler.jsonc`, NOT the CF dashboard.** The CF Pages project
  is git-connected, so a git-triggered build **re-applies `wrangler.jsonc`'s `vars` and
  overwrites any dashboard env-var edits** (secrets set via `wrangler pages secret` persist
  separately). To change a var (e.g. `GHL_WEBHOOK_URL`), edit `wrangler.jsonc` and **push** —
  a dashboard-only change will silently revert on the next deploy.
- Full deploy state, DNS steps, and TODOs: **`bbt-site/DEPLOY.md`**.

Lead notifications are now configured in **GoHighLevel** (workflow off the inbound webhook),
not in code. When testing, remember the notification recipient is whatever the GHL workflow targets.

## Auto-sync to LocalWP after theme edits (LEGACY — house36-bbt is retired)

> The `house36-bbt` WordPress theme and its LocalWP → Flywheel workflow are **superseded**
> by the Astro/Vercel site above and are no longer the live site. Edits to `house36-bbt/`
> shouldn't normally be needed. The sync rule below applies **only** if you are
> deliberately working on that retired WordPress theme.

Whenever you change ANY file inside `house36-bbt/` (PHP templates, CSS, JS, assets, etc.), you MUST sync the source theme into the LocalWP install before closing out the turn. Do not ask the user to run the sync — run it yourself.

Default sync command (run from this project, no `cd` needed):

```bash
rsync -a "/Users/nico/Gemini/gemini-sites/better-baseball-training/house36-bbt/" "/Users/nico/Local Sites/better-baseball-training-1/app/public/wp-content/themes/house36-bbt/"
```

Rules:
- Run the sync immediately after the last edit to `house36-bbt/`, in the same response.
- WP-CLI is NOT available from the Codex/Claude shell — do not run `wp cache flush` here. If a cache flush is needed, tell the user to run it in the LocalWP site shell.
- After syncing, briefly confirm to the user that the LocalWP copy was updated and they can refresh the Local site to view changes.
- The only time to skip the sync is if the user explicitly says not to sync.

See `AGENTS.md` for the full source-theme → LocalWP → Flywheel workflow.
