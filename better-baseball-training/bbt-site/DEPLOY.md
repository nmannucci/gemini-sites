# BBT — Vercel migration (2026-07-01)

**Hosting moved to Vercel** because Wix DNS blocked connecting the custom domain to
Cloudflare. The Cloudflare backend (D1) is kept and reused; lead notifications now go
through a **GoHighLevel inbound webhook** (Resend was retired — Wix DNS can't host the
SPF/DKIM records a verified Resend sending domain needs).

## Current architecture
- **Static site**: Astro `bbt-site/` → **Vercel** project `better-baseball-training`
  (team `nico-mannuccis-projects`), **git-connected** to `nmannucci/gemini-sites`,
  production branch `master`, **Root Directory `better-baseball-training/bbt-site`**,
  framework `astro`. Prod URL: `https://better-baseball-training.vercel.app`. Deploys
  on every push to `master`.
- **Lead API**: still the Cloudflare **Pages** project at
  `https://better-baseball-training.pages.dev/api/lead` — writes to D1 `bbt-leads` and
  forwards the lead to the GoHighLevel webhook (`GHL_WEBHOOK_URL` in `wrangler.jsonc`).
  GHL sends the notification email. **The Resend sections lower in this file are superseded.**
- **Glue**: `bbt-site/vercel.json` rewrites `/api/lead` → the pages.dev function
  (server-side proxy, so the browser sees same-origin — no CORS, no form-code change).
- The Cloudflare Pages project stays deployed **only as the API backend**; it needs
  no Cloudflare custom domain, which is what sidesteps the Wix nameserver limitation.

## Remaining step — connect the domain (needs Wix login)
DNS is hosted at Wix (`ns*.wixdns.net`). No nameserver change needed — just edit records
in Wix → Domains → **Manage DNS Records**:

| Host | Type  | Value                    | Notes                         |
|------|-------|--------------------------|-------------------------------|
| `@`  | A     | `76.76.21.21`            | replace the current Fastly A  |
| `www`| CNAME | `cname.vercel-dns.com`   | replace the current alias     |

Both `betterbaseballtraining.com` and `www.betterbaseballtraining.com` are already
attached to the `better-baseball-training` project, with the apex set to 308-redirect
to `www` (matches the Astro `site` URL). SSL auto-issues once DNS propagates. Verify
with `vercel domains inspect www.betterbaseballtraining.com`.

## Not yet done
- Live end-to-end lead test (real submission) intentionally skipped — it would email
  `house36@agentmail.to`. Trigger via the real form after DNS is live.

---

# BBT — Pages deploy state & remaining work

**As of 2026-06-09** the site is migrating from a Cloudflare Worker custom-domain plan to **Cloudflare Pages**. The domain stays registered/DNS-hosted at **Wix** because Wix does not allow changing nameservers for this domain.

Architecture:
- Astro app source: `bbt-site/`
- Pages project: `better-baseball-training`
- Pages preview host: `https://better-baseball-training.pages.dev`
- Canonical production host: `https://www.betterbaseballtraining.com`
- Apex handling: Wix 301 redirect from `betterbaseballtraining.com` to `https://www.betterbaseballtraining.com`
- DNS source of truth: Wix DNS, not Cloudflare DNS
- Lead pipeline: form -> Pages Function `/api/lead` -> D1 `bbt-leads` -> Resend email

Cloudflare Pages build settings for the `nmannucci/gemini-sites` repository:
```text
Production branch: master
Framework preset: Astro
Root directory: better-baseball-training/bbt-site
Build command: npm run build
Build output directory: dist
Node version: 22.16.0
```

The root directory is relative to the GitHub repo root. Do not use only `bbt-site`, because Cloudflare clones `nmannucci/gemini-sites` and the app lives one folder deeper.

---

## Done

- [x] Astro site rebuilt under `bbt-site/`
- [x] Pages Function added at `functions/api/lead.ts`
- [x] `wrangler.jsonc` converted for Pages with `pages_build_output_dir: "./dist"`
- [x] D1 database `bbt-leads` created — `database_id: e4b35f56-eaba-44c6-9238-446b77023c6c`
- [x] Schema applied (`migrations/0001_leads.sql`)
- [x] Pages project deployment started
- [x] Stale May 27 tryouts promo removed from the nav/homepage
- [x] Astro canonical/site URL set to `https://www.betterbaseballtraining.com`
- [x] Node version pinned for Pages builds with `.node-version`

Current `wrangler.jsonc` vars:
- `LEAD_NOTIFY_TO`: `nmannucci1@gmail.com` during build/test
- `LEAD_NOTIFY_FROM`: `Better Baseball Training <onboarding@resend.dev>` until Resend domain verification is complete

---

## Immediate

### #21 — Re-add `RESEND_API_KEY` to Pages

Add the rotated Resend key to the **Cloudflare Pages project**, not the old Worker.

Dashboard path:
Cloudflare -> Workers & Pages -> `better-baseball-training` -> Settings -> Environment variables -> Production -> add secret `RESEND_API_KEY`.

CLI option from `bbt-site/`:
```sh
./node_modules/.bin/wrangler pages secret put RESEND_API_KEY --project-name better-baseball-training
```

### #22 — Smoke test Pages deploy

After `RESEND_API_KEY` is present and a new Pages deployment is live:
1. Submit the site lead form on the Pages URL or `www` custom domain.
2. Confirm the row lands in D1.
3. Confirm the Resend email arrives at `LEAD_NOTIFY_TO`.

Useful checks from `bbt-site/`:
```sh
./node_modules/.bin/wrangler d1 execute bbt-leads --remote --command="SELECT COUNT(*) FROM leads;"
```

### #23 — Delete the old Worker

Only delete the Worker after Pages is green:
- Pages site loads
- `/api/lead` writes to D1
- Resend email delivery works
- Custom domain is serving Pages

---

## Domain Cutover

### Replaces stale #12 — Do not add `betterbaseballtraining.com` as a Cloudflare zone

Kill the old "Add domain as Cloudflare Zone" task. Nameservers are staying on Wix.

All DNS records go in Wix:
- Cloudflare Pages custom-domain CNAME
- Resend verification records
- DMARC

### Replaces stale #13 — Bind `www` to Pages, not the Worker

Cloudflare Pages:
1. Go to Workers & Pages -> `better-baseball-training` -> Custom domains.
2. Add `www.betterbaseballtraining.com`.
3. Let Cloudflare show the required CNAME target.

Wix DNS:
```text
Type: CNAME
Host: www
Value: better-baseball-training.pages.dev
```

Wix domain forwarding:
```text
betterbaseballtraining.com -> https://www.betterbaseballtraining.com
Type: 301 permanent redirect
```

---

## Email DNS Follow-Ups

### #14 — Verify domain in Resend and switch `LEAD_NOTIFY_FROM`

Resend dashboard -> Domains -> Add Domain -> `betterbaseballtraining.com`.

Add the records Resend provides in **Wix DNS**. Expect records like:
- DKIM TXT/CNAME under `resend._domainkey` or similar
- SPF TXT for the send subdomain
- MX for bounce/feedback handling

After Resend verifies the domain, change:
```jsonc
"LEAD_NOTIFY_FROM": "Better Baseball Training <leads@betterbaseballtraining.com>"
```

Then redeploy Pages.

### #15 — Add DMARC in Wix DNS

Add TXT:
```text
Host: _dmarc
Value: v=DMARC1; p=none; rua=mailto:nmannucci1@gmail.com; adkim=r; aspf=r;
```

Start at `p=none` for monitoring before tightening.

### #16 — Handoff

Do this last:
1. Swap `LEAD_NOTIFY_TO` to the client address, optionally keeping Nico copied during transition.
2. Redeploy Pages.
3. Submit a fresh test lead.
4. Clear test rows from D1 when approved.

Example D1 cleanup:
```sh
./node_modules/.bin/wrangler d1 execute bbt-leads --remote \
  --command="DELETE FROM leads; DELETE FROM sqlite_sequence WHERE name='leads';"
```

---

## Content Items To Confirm

- Schedule page calendar: verify the current Acuity/provider embed.
- Form fields: confirm `firstName, lastName, email, phone, program, message` matches the client handoff needs.
- New tryouts content: the expired May 27 promo is removed; add a fresh promo only after the client provides a new date/details.

---

## Quick Start

```sh
cd /Users/nico/Gemini/gemini-sites/better-baseball-training/bbt-site
npm run build
./node_modules/.bin/wrangler whoami
./node_modules/.bin/wrangler d1 execute bbt-leads --remote --command="SELECT COUNT(*) FROM leads;"
```
