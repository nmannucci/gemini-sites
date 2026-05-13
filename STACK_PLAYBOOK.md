# Client site stack playbook

How to wire an Astro client site to **Cloudflare Workers + D1 + Resend** for contact-form lead capture. Use `eagle-martial-arts/` as the canonical template.

## Migration source-of-truth (per client)

When migrating an existing site, confirm where the **current** site lives before scraping. Don't assume the obvious folder is the right one.

| Client | Current site source | Notes |
|---|---|---|
| Better Baseball Training | `better-baseball-training/house36-bbt/` | WordPress theme (PHP templates). The `.html` files in `better-baseball-training/` root are older/static — **do not** use as the source. The theme is synced to a LocalWP install (see `better-baseball-training/CLAUDE.md`). |
| La Jolla Martial Arts | `eagle-martial-arts/` | Already on this stack — use as the template. |

---

## The stack

| Layer | Tool | Notes |
|---|---|---|
| Frontend | Astro (static build) | No SSR adapter — pure `dist/` output |
| Hosting + API | Cloudflare Workers (Workers Assets pattern) | One Worker serves static files **and** `POST /api/lead` |
| Database | Cloudflare D1 (SQLite) | Free tier is plenty for a contact form |
| Email | Resend | 100/day, 3000/month free; clean DX |
| DNS | Cloudflare DNS | Easy for SPF/DKIM/MX records |

Why this combo: single vendor for hosting + DB, no Pages, no Astro Cloudflare adapter, no extra moving parts. Resend was picked over Plunk and SendGrid — Plunk is comparable but smaller, SendGrid has dated DX.

---

## Build order

### 1. Create the Astro project
Standard Astro static project. Build outputs to `./dist/`. **Don't** install `@astrojs/cloudflare`.

### 2. `wrangler.jsonc`
```jsonc
{
  "name": "<site-slug>",
  "compatibility_date": "2026-05-12",
  "main": "src/worker.ts",
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS",
    "not_found_handling": "404-page"
  },
  "vars": {
    "LEAD_NOTIFY_TO": "nmannucci1@gmail.com",
    "LEAD_NOTIFY_FROM": "<Brand Name> <onboarding@resend.dev>"
  },
  "d1_databases": [
    { "binding": "DB", "database_name": "<slug>-leads", "database_id": "PASTE_AFTER_CREATE" }
  ]
}
```

`LEAD_NOTIFY_TO` is comma-separated for multi-recipient. The Worker splits it.

### 3. D1 database
```sh
# If you hit auth error 10000 even though d1 is in scope:
npx wrangler logout && npx wrangler login

npx wrangler d1 create <slug>-leads
# → paste database_id into wrangler.jsonc
# → answer "n" when Wrangler offers to add the binding for you
```

### 4. Schema (`migrations/0001_leads.sql`)
```sql
CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT,
  program    TEXT,
  message    TEXT NOT NULL DEFAULT '',
  source     TEXT,
  user_agent TEXT,
  ip         TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_email      ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_source     ON leads(source);
```

`message` is `NOT NULL DEFAULT ''` because trial forms don't have a message. If you forget the default, D1 INSERTs return 500.

Apply it:
```sh
npx wrangler d1 execute <slug>-leads --remote --file=./migrations/0001_leads.sql
```

### 5. Worker entry (`src/worker.ts`)
Copy from `eagle-martial-arts/src/worker.ts` and adjust:
- `PROGRAM_LABELS` for the new site's programs.
- Email subject and table rows in `sendNotificationEmail()` if you want different fields.

What it does:
- Validates required fields (`firstName`, `lastName`, `email`). Message is optional.
- Validates email format with a simple regex.
- Caps field lengths to limit abuse.
- Inserts into D1.
- `ctx.waitUntil()` fires the Resend send so the HTTP response returns fast.
- `to:` is `LEAD_NOTIFY_TO.split(',').map(s => s.trim())` so a comma-separated env var becomes an array.
- `reply_to:` is the lead's email — clicking "Reply" in Gmail goes straight to the prospect.
- Anything that's not `POST /api/lead` falls through to `env.ASSETS.fetch(request)` for static serving.

### 6. Resend account
1. Sign up at resend.com.
2. **API Keys → Create API Key** → copy.
3. **Deploy the Worker first** (otherwise `wrangler secret put` errors). Then:
   ```sh
   npx wrangler deploy
   npx wrangler secret put RESEND_API_KEY
   ```
   Use the **interactive prompt**, not `printf 'KEY' | wrangler secret put` — piping risks trailing whitespace and an invalid key that silently 401s.
4. **Domains → Add Domain** → enter the client domain. Resend gives 3 DNS records:
   - DKIM TXT at `resend._domainkey.<domain>`
   - SPF TXT at `send.<domain>` (`v=spf1 include:amazonses.com ~all`)
   - MX at `send.<domain>` → `feedback-smtp.us-east-1.amazonses.com`
5. Add them in Cloudflare DNS, **DKIM as DNS-only** (no orange-cloud proxy).
6. Hit "Verify" / "Restart" if it stalls. Verification usually takes <5 minutes.
7. Once verified, update `wrangler.jsonc`:
   ```jsonc
   "LEAD_NOTIFY_FROM": "<Brand> <leads@<domain>>"
   ```
   and redeploy.

### 7. DMARC
If the domain has a registrar-default DMARC pointing to a stranger, replace it:
```
v=DMARC1; p=none; rua=mailto:nmannucci1@gmail.com; adkim=r; aspf=r;
```
Start at `p=none` (monitor mode) for 2 weeks before tightening.

### 8. Form wiring
On every form in the site:
```html
<form action="/api/lead" method="POST" novalidate
      data-lead-form data-lead-source="<page-slug>">
  <input type="hidden" name="source" value="<page-slug>">
  <input name="firstName" required>
  <input name="lastName"  required>
  <input name="email"     type="email" required>
  <input name="phone"     type="tel">
  <select name="program">…</select>
  <textarea name="message"></textarea>  <!-- optional -->
  <button type="submit">Submit</button>
</form>
```

Copy the global form handler from `eagle-martial-arts/src/layouts/Layout.astro`. It:
- Listens for submit on every `form[data-lead-form]`.
- Submits as JSON.
- Replaces form HTML with an inline "You're All Set" success state.
- Shows an inline error box for failures.
- Sets `data-lead-bound="1"` so it doesn't double-bind.

### 9. Deploy
```sh
npm run build && npx wrangler deploy
```

### 10. Test
- `LEAD_NOTIFY_TO` stays at `nmannucci1@gmail.com` while you build. **Never** the client's address during testing.
- Use `curl` to fire a few test submissions, confirm rows land in D1, confirm emails arrive.
- When you're ready to hand off, change `LEAD_NOTIFY_TO` to the client and **deploy on its own** — don't chain a test send in the same shell command. Cloudflare edge propagation isn't atomic; an immediate test can still hit the previous version and email the wrong recipient.

---

## Common gotchas

| Symptom | Fix |
|---|---|
| `Authentication error [code: 10000]` from `wrangler d1 create` even though `d1 (write)` is in the OAuth scope | `npx wrangler logout && npx wrangler login`. OAuth tokens minted before D1 scope expansions stay stale. |
| `wrangler secret put` → "Secret edit failed. You attempted to modify a secret, but the latest version of your Worker isn't currently deployed." | Run `wrangler deploy` first. Once `main` is added to wrangler.jsonc, the previously deployed static-assets-only Worker has to be replaced before secrets can attach. |
| `wrangler versions secret put` → "No content-type header was provided for non-module Worker content" | Same fix: `wrangler deploy` first. |
| 401 "API key is invalid" from Resend | The secret value got mangled — trailing newline from a paste, or a literal placeholder. Re-run `wrangler secret put` interactively. |
| D1 INSERT returns 500, all fields look fine | Some column is `NOT NULL` with no default and got `null` from `.bind()`. Either add a default, drop the constraint, or pass `''`. |
| Test emails land in Spam | First sends from a fresh domain. Warms up after a few real deliveries. Confirm DKIM is `DNS only` in Cloudflare DNS (not proxied). |
| `.DS_Store` files end up in the deployed assets | `.gitignore` only stops git tracking. Astro copies `public/ → dist/` regardless. `find . -name .DS_Store -delete` from the site root, rebuild, redeploy. |
| Lead email goes to the *wrong* recipient after a `LEAD_NOTIFY_TO` change | Edge propagation lag. Don't chain `wrangler deploy && curl …`. Deploy in its own command, wait, then test. |

---

## Useful one-liners

```sh
# Tail Worker logs while triggering a request
(npx wrangler tail --format=json > /tmp/tail.log 2>&1 &) ; sleep 4 ; curl ... ; sleep 6 ; pkill -f 'wrangler tail'

# Check live D1 schema
npx wrangler d1 execute <db> --remote --command="PRAGMA table_info(leads);"

# Lead count by source (which forms convert)
npx wrangler d1 execute <db> --remote --command="SELECT source, COUNT(*) FROM leads GROUP BY source ORDER BY 2 DESC;"

# Recent leads
npx wrangler d1 execute <db> --remote --command="SELECT id, first_name, last_name, email, program, source, created_at FROM leads ORDER BY id DESC LIMIT 20;"

# Wipe test data
npx wrangler d1 execute <db> --remote --command="DELETE FROM leads; DELETE FROM sqlite_sequence WHERE name='leads';"

# Inspect DNS for Resend
dig +short TXT resend._domainkey.<domain>
dig +short TXT send.<domain>
dig +short MX  send.<domain>
```

---

## Deliverability checklist before handoff

- [ ] Domain verified in Resend.
- [ ] DKIM + SPF + MX records live in DNS.
- [ ] DMARC points to user's address, starts at `p=none`.
- [ ] `LEAD_NOTIFY_FROM` uses a real address on the verified domain (not `onboarding@resend.dev`).
- [ ] First real submission lands in Inbox, not Spam.
- [ ] `LEAD_NOTIFY_TO` switched from `nmannucci1@gmail.com` to the client's address.
- [ ] Test rows cleared from D1.
- [ ] `.DS_Store` files removed from the deploy.
