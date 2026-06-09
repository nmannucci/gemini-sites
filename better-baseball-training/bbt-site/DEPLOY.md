# BBT — deploy state & remaining work

**As of 2026-05-27** the site is **live on Cloudflare Workers** at
`https://better-baseball-training.nmannucci1.workers.dev`. End-to-end pipeline
(Astro static → Workers Assets → `/api/lead` → D1 `bbt-leads` → Resend → gmail)
verified working. Everything that's still pending is **DNS-dependent** and waits
for registrar access on `betterbaseballtraining.com`.

---

## ✅ Done

- [x] Wrangler installed locally + workerd platform binary fix (see `reference_wrangler_workerd_optional_dep_fix` memory)
- [x] `wrangler login` (account: `nmannucci1@gmail.com`, account ID `7ab38c4525d46a3ea8322e1ce35da1ce`)
- [x] D1 database `bbt-leads` created — `database_id: e4b35f56-eaba-44c6-9238-446b77023c6c`
- [x] Schema applied (`migrations/0001_leads.sql`)
- [x] Worker `better-baseball-training` deployed (assets + `/api/lead`)
- [x] `RESEND_API_KEY` secret uploaded (key was rotated after a transcript leak — current key is the rotated one)
- [x] Smoke test: D1 insert + Resend email both confirmed
- [x] Form CSS fix for Astro `.form-row` / `.bk-form__row` wrappers (labels 13px white DM Mono caps inside `.forminator-shell`)

Current `wrangler.jsonc` vars:
- `LEAD_NOTIFY_TO`: `nmannucci1@gmail.com` (deliberate — never the client during build/test)
- `LEAD_NOTIFY_FROM`: `Better Baseball Training <onboarding@resend.dev>` (Resend shared sender; switches after domain verification)

---

## 🔜 TODO (all gated on DNS access at the registrar)

### TODO 1 — Move `betterbaseballtraining.com` into the Cloudflare account
Cloudflare dashboard → **Add a site** → `betterbaseballtraining.com` (Free plan). It returns 2 nameservers. Change NS at the current registrar.

**Before flipping NS**, in Cloudflare DNS tab copy the *current* live records so nothing breaks at cutover:
- A/AAAA for `@`, `www` (current WP host)
- MX (whatever email provider they use today)
- Any existing TXT/CNAME (SPF, verifications, etc.)
- All set to **DNS only** (grey cloud) for now

NS propagation: usually <1 hour, up to 24.

### TODO 2 — Bind the Worker to the custom domain (THIS IS THE CUTOVER)
Once NS has propagated, Cloudflare dashboard → **Workers & Pages → better-baseball-training → Settings → Domains & Routes → Add Custom Domain**:
- `betterbaseballtraining.com`
- `www.betterbaseballtraining.com`

**The moment those save, traffic flips from WP to the Worker.** Either do off-hours, or test on `staging.betterbaseballtraining.com` first.

Rollback if anything looks wrong: **Remove** the custom domains in that same panel; DNS reverts to the records copied in TODO 1 and WP serves again within seconds.

### TODO 3 — Verify domain in Resend, switch `LEAD_NOTIFY_FROM`
Resend dashboard → **Domains → Add Domain** → `betterbaseballtraining.com`. Resend gives 3 DNS records — add in Cloudflare DNS:
- `resend._domainkey` TXT — **DNS only / grey cloud** (not proxied)
- `send.betterbaseballtraining.com` TXT (SPF: `v=spf1 include:amazonses.com ~all`)
- `send.betterbaseballtraining.com` MX → `feedback-smtp.us-east-1.amazonses.com`

Click Verify. Then edit `wrangler.jsonc`:
```jsonc
"LEAD_NOTIFY_FROM": "Better Baseball Training <leads@betterbaseballtraining.com>"
```
and `./node_modules/.bin/wrangler deploy`.

### TODO 4 — DMARC
Cloudflare DNS → add TXT at `_dmarc.betterbaseballtraining.com`:
```
v=DMARC1; p=none; rua=mailto:nmannucci1@gmail.com; adkim=r; aspf=r;
```
Start at `p=none` (monitor mode) for ~2 weeks before tightening.

### TODO 5 — Handoff: swap `LEAD_NOTIFY_TO` to client + clean D1
Do this **last**, in its own session, and **never chain** `wrangler deploy && curl …` (edge propagation isn't atomic — see `feedback_recipient_change_propagation` memory).

1. Edit `wrangler.jsonc` → `"LEAD_NOTIFY_TO": "trainwithbbt@gmail.com,nmannucci1@gmail.com"` (or whatever the client wants; can be comma-separated for multi-recipient)
2. `./node_modules/.bin/wrangler deploy`
3. Wait ~30s
4. **Separate** test curl
5. Clear test rows:
   ```sh
   ./node_modules/.bin/wrangler d1 execute bbt-leads --remote \
     --command="DELETE FROM leads; DELETE FROM sqlite_sequence WHERE name='leads';"
   ```

---

## Open content items to confirm with client
- **Schedule page calendar**: used Acuity embed `owner=19350065` (from `businessinfo.md`). The live WP site rendered this via the page body (`the_content()`) — confirm the actual current embed/provider. Marked with TODO comment in `src/pages/schedule.astro`.
- **Form fields**: replaced Forminator (form ID 42) with `firstName, lastName, email, phone, program, message`. Confirm this matches what the client wants captured.
- **Tryouts banner** (`Wed May 27 · Folsom Lake College`) is hardcoded in `src/components/Nav.astro` — that date has passed. Either remove the banner or update the date before cutover.

## Quick-start for the next session
```sh
cd /Users/nico/Gemini/gemini-sites/better-baseball-training/bbt-site
./node_modules/.bin/wrangler whoami        # confirm logged in as nmannucci1@gmail.com
./node_modules/.bin/wrangler d1 execute bbt-leads --remote --command="SELECT COUNT(*) FROM leads;"
./node_modules/.bin/wrangler secret list   # should show RESEND_API_KEY
```
Live preview: <https://better-baseball-training.nmannucci1.workers.dev>
