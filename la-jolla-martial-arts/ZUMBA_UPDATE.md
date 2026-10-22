# LAVEL regular classes and signed waivers

Source: [owner's October 2026 brief](https://docs.google.com/document/d/13MCVg02jx9_py55UeHswwazO006LJB1RV4yjJjghkWo/view).

The regular class page replaces the expired event with the November 2 start, Monday/Thursday 9 AM schedule, ages 16+, Saturday interest, mutually exclusive intro offers, package expiry terms, military discount exception, and Lavel's contact details. Existing approved class photos remain; the owner has not yet supplied the new gallery photos. Related homepage, program, contact and schedule references are consistent with this schedule. General studio door hours were not supplied in the brief and have not been inferred.

## Review

- `/zumba`: class page and existing GoHighLevel signup flow. Saturday preference is included in both the saved message and `saturday_interest` webhook field.
- `/zumba/waiver`: phone/mouse signature form. Ages 16–17 require a guardian name and signature. The owner's exact waiver text is shared by the page and server and versioned `2026-10-20`.
- `/zumba/waiver/print`: print view, with a downloadable US Letter PDF at `/assets/lavel-waiver-door-sign.pdf`. QR destination: `https://lajollatkd.com/zumba/waiver`.
- Per Nico's latest direction, the waiver link appears after signup in the on-page success confirmation and the GHL confirmation SMS. The public Questions/footer section has no door QR print link. Lavel can share the standalone QR image or print the door sign. A separate GHL workflow handles signed copies.

Signed records remain in D1 with consent, original waiver text/version, authoritative timestamp/date, signatures and proportions, guardian details and photo preference. A dedicated published GoHighLevel workflow, **LAVEL | Signed Waiver Email**, emails Lavel the participant name, signing date and private links to a signed PDF and UTF-8 JSON record. The PDF includes the complete waiver and handwritten signatures. These are download links, not email attachments.

Copy links use a 256-bit HMAC token derived from a Worker secret. The public signing response never includes this token. Copy responses require the token and use `private, no-store`, no-referrer, noindex and forced download headers. Keep `WAIVER_LINK_KEY` stable: rotating it invalidates previously emailed links. Anyone with a complete link can download that copy, so recipients should keep it confidential. The waiver page includes no analytics or chat widgets.

The original signup webhook remains separate. Signing a waiver does not create a contact, opportunity, or another signup confirmation. Failed webhook handoffs remain pending and retry every ten minutes with exponential backoff. Database status `sent` means accepted by the published GHL workflow, not confirmed inbox delivery; GHL execution logs track its email action. Browser retries reuse the same submission ID. Rare ambiguous network failures can cause duplicate GHL notifications; the record ID identifies the same immutable waiver.

## Local checks

```sh
npm ci
npm run build
npm run check:seo
npm run test:zumba
npm run generate:zumba-qr
```

Tests use ephemeral D1 and intercept ALL GoHighLevel requests. No test email goes to the owner. To launch the same local QA environment after building:

```sh
npx tsx tests/zumba-preview.ts
```

Open `http://127.0.0.1:8790/zumba`. Submissions in this preview are temporary and email delivery is simulated. For normal local Worker development, copy `.dev.vars.example` to `.dev.vars`, fill values locally and apply the migrations to local D1. Never put secret values in tracked files.

## Production configuration

- Worker: `la-jolla-martial-arts`; D1: `lj-ma-leads`. Migrations 0003 and 0004 have been applied to production; existing leads remain intact. Migration 0004 adds structured signup offer, first-class date and Saturday preference columns, and recovers prior Saturday preferences from saved signup messages.
- Existing signup secret: `GHL_WEBHOOK_URL`, preserved.
- Waiver secrets: `GHL_WAIVER_WEBHOOK_URL` and `WAIVER_LINK_KEY`. Never commit their values.
- GHL location: La Jolla Martial Arts (`bmB2HGbfaWFdd07zoGeg`).
- GHL waiver workflow: `a9a15f94-9e9b-455f-b1e4-d2134970828a`, inside **1. New Site Automations**. Inbound webhook → event is `waiver_signed` → internal email to `lavelcreates@gmail.com`. Other events end without a notification. No contact creation action.
- Emails use the existing GHL/LeadConnector email service. The authorized test used its default sender `Eagle Martial Arts <sam@intromartialarts.com>` with SPF and DKIM passing for `mail.intromartialarts.com`. Resend is no longer used; its previously configured secret was left untouched.
- The public PostHog build configuration was recovered from the existing live client bundle into gitignored `.env` to preserve analytics.

### Verification on October 21, 2026

The user authorized one test email to `nmannucci1@gmail.com`. The real preview Worker saved synthetic record `6131d509-3278-4043-aab6-110d17942a3d`, labeled **TEST ONLY - Nico waiver email check**, handed it to GHL, and GHL's email action executed successfully. Gmail received the fully rendered message at 9:45 PM Pacific, in INBOX. Its name, date and copy URLs matched the saved record. The private PDF returned HTTP 200; missing and wrong tokens returned 404. This single synthetic record is retained so the test email's download links remain usable; it is not a participant waiver. The workflow recipient was restored to Lavel and saved before production deployment. No test email went to Lavel.

Local checks cover the actual Worker and ephemeral D1, immutable records, duplicate prevention/conflicts, guardian requirements, signature validation, PDF generation, private-copy access, webhook outage and cron retry, plus the original signup's Saturday field. All four test groups pass. Site build, SEO checks and Worker TypeScript check pass. Prior browser checks covered adult/minor signup, resized signatures and mobile widths 320/390/430. The door QR was independently decoded to its intended destination.

Production deployment: Cloudflare Worker version `713064c8-bda5-4ded-9cf7-47140d797293`, 100% traffic, deployed October 21 at approximately 9:47 PM Pacific. Cron `*/10 * * * *` is enabled. Live `/zumba`, waiver, print view, QR SVG, door-sign PDF and the related pages all return 200. Both exact copy links extracted from the received Gmail message return 200 on `lajollatkd.com`; the PDF is byte-identical to the verified preview copy. The signup customer SMS originally included a waiver link; the later separation update below removes it. No live signup/SMS test was sent to customers.

## Separate waiver and door QR

Nico requested the standalone waiver and QR without linking them from the Zumba signup. All waiver/print links were removed from `/zumba`, including the hero, form hint, success confirmation, footer and hidden registration message. The signup webhook no longer includes `waiver_url`. The added waiver sentence was removed from the GHL Zumba signup SMS, restoring its prior wording. Signed-copy emails and the standalone waiver remain available. Added `/assets/lavel-waiver-qr.png` (1200px) for easy forwarding to Lavel; the SVG and printable Letter PDF remain available.

Separation update published as Worker `c6f9004a-af5c-4700-a702-137ca8e37b73`. The live Zumba page contains no `/zumba/waiver` references. The standalone waiver, PNG QR and door-sign PDF all return HTTP 200. The 1200px PNG was independently decoded to `https://lajollatkd.com/zumba/waiver`. Build, SEO checks, all four existing test groups and diff whitespace checks pass. The GHL signup SMS was saved/published with its original 191-character message and no waiver link.

## Latest confirmation placement

Nico clarified that the waiver signing link should return to the success confirmation shown after a Zumba signup and to the GHL Zumba confirmation SMS. Restored the success button and the SMS waiver sentence. The public Questions/footer section remains limited to Lavel's phone and email; the door QR print link is absent. The hero/form-hint links remain absent. No new test email or SMS was sent.

Confirmation placement update published as Worker `78eab547-7ed7-4da9-9fda-160188a3dbd7`. Live HTML verification confirms the waiver signing button exists only inside the signup success template, with no QR print link in the Questions/footer section or elsewhere on the class page. GHL confirmation SMS was saved/published with the waiver sentence restored. Build, SEO and whitespace checks pass.

## Registration notifications and waiver confirmation

The published **1. New Lead Webhook** workflow now includes Saturday interest in Lavel's existing SMS notification. A new internal email action, **Lavel | Zumba Signup Email**, sends `lavelcreates@gmail.com` the participant's name, signup offer, first-class date, Saturday interest, email and phone. Its webhook mapping uses the existing October 21 sample that contains `saturday_interest`; changing the mapping did not replay a signup. The customer confirmation SMS and separate signed-waiver email remain in place. No additional live test notification was sent.

After a successful durable waiver save, the browser navigates to `/zumba/waiver/confirmation` with a private receipt token. This page verifies the saved D1 record and displays its signing date and confirmation number. Invalid or missing receipts do not display success. Receipt tokens cannot download signed PDFs; previously emailed copy links remain valid. Email delivery runs after the response using `waitUntil`, with the existing durable retry queue, so a slow email provider cannot block confirmation.

Entering a birth date under age 16 displays an explicit “Your waiver has not been submitted” warning beside the date and above the disabled submit button. Server validation also rejects under-16 submissions without saving a record. Ages 16–17 still require a guardian name and signature. Signup choices now persist as structured D1 columns in addition to the registration message; signed waiver details, consent and signatures remain in D1 independently of email.

All five automated test groups pass, covering the actual Worker and temporary D1, confirmation while email is delayed, private receipt/copy access, immutable saves, minors, rejected under-16 submissions, database signup fields, PDF generation and delivery retries. Build, SEO and both Worker/client TypeScript checks pass. Local browser testing verified adult submission through the new confirmation page, under-16 feedback, guardian fields and a 390-pixel mobile confirmation with no horizontal overflow. Local tests intercepted all outbound notifications. The two previously saved production waiver records were present before this update, including the earlier synthetic email test.

Published as Worker version `bb6d202b-5f2e-49a5-afc2-8be85d03fed9`. Live checks confirm the updated age warnings and client script, an authenticated receipt returning 200 with the saved record's reference, and an unauthenticated receipt returning 404 without claiming success. Retrying the already-delivered synthetic fixture returned its existing record and confirmation URL without scheduling another notification; no new adult waiver was created. A synthetic under-16 API request returned 400 with the explicit not-submitted message. Both previously emailed PDF and JSON links still return 200. The signup confirmation retains its signing link, and the public class page has no door QR print link. Production has 27 Zumba signup records and two saved waivers; the Saturday preference recorded by the current signup form was recovered into the new structured column.

## Simplified confirmation and mobile date alignment

Nico requested a shorter confirmation: **Your waiver has been submitted.** followed by **Thank you!** The email-delivery sentence, signing date, confirmation number and duplicate success eyebrow have been removed from the displayed page. The return button remains. Receipt verification and full database records are unchanged.

Date inputs now explicitly use border-box sizing, constrained inline width, a reset native appearance and left-aligned WebKit date text. Labels and the single-column mobile grid allow shrinking within the available width, preventing the iPhone date control from expanding past neighboring fields. Local browser checks at 320, 390 and 430 pixels confirmed matching date/email field edges and no horizontal overflow. Build, SEO and all five existing test groups pass. Local QA used mocked notifications only.

Published as Worker `1869e10c-7ed5-4d19-95b4-d458187b5b11`. Live form HTML includes the date sizing and WebKit text alignment fixes. An existing saved synthetic waiver's confirmation returns 200 with the simplified submission heading and thank-you text, without the email notice, signing date or reference number. No new notifications were sent.

## Date-of-birth age error

The under-16 warning now appears immediately beneath the date-of-birth input: **Participants must be 16 or older to join the Zumba classes.** The invalid input has a red border, red focus outline and pale red background. Correcting the birth date clears the invalid styling and warning and restores submission eligibility. Any under-age submit attempt focuses the date field rather than sending visitors to a generic message at the end of the form. Server rejection uses the same Zumba-specific wording. The existing disabled submit button and not-submitted notice remain.

Mobile browser verification confirmed the warning's location, red input styling, disabled submission and clearing when corrected. Build, SEO, whitespace and all five existing test groups pass. No live test notifications were sent.

Published as Worker `1f6cc7ae-3577-4468-8c84-2e42dee00b90`.

## Owner document recheck

Reread the current Google Doc through the connected Google Drive account and compared it with the live class page, waiver and QR resources. The expired Master Class promotion is gone. The headline, November 2 start, Monday/Thursday 9 AM schedule, Saturday coming-soon note, 60-minute duration, ages 16+, basement venue, both mutually exclusive intro offers, all package prices/expiry periods, military exclusion, signup CTA, Saturday checkbox and contact details match the brief.

The live waiver contains every requested field, automatic date, finger signature, guardian name/signature and both consent/photo choices. Its title and all seven paragraphs match the current owner's text exactly. The signup-success waiver link remains present, while the public door-print link remains absent per Nico's later direction. The standalone waiver, print page, QR PNG and door-sign PDF return 200; the live PNG/PDF match the previously verified local assets. Signed-copy notification and signup SMS/email behavior were verified earlier in this same implementation; no new notifications were sent for this read-only review.

The remaining dependency is the new Master Class gallery photos that the owner says he will send. The page still shows the two approved September photos. A focused Gmail attachment search covering October 17–22 found no new LAVEL/Zumba photo attachments. Nico's later confirmation simplification, mobile date alignment, red age warning, database storage and notification requests remain in effect.

## Waiver heading and instructions

Updated the signing-page heading to **LAVEL Zumba Class Waiver**, matching the existing brand spelling. Its introduction now asks visitors to complete the form before their first class, read the waiver and sign with a finger or mouse. It states ages 16 and up and explicitly requires a parent or guardian signature for ages 16 and 17. Build, SEO and whitespace checks pass.

Published as Worker `68b38336-c11e-49a1-9e16-44a1ff654455`. Live browser readback confirms the new heading and introduction; the 390-pixel mobile page has no horizontal overflow.

## Branded printable door sign

Restyled the existing US Letter door-sign PDF using the actual metallic gold LAVEL wordmark, black header/footer, cream background, gold rules and a large serif headline. The high-contrast QR retains its white quiet zone and still opens `https://lajollatkd.com/zumba/waiver`. The footer preserves Lavel's contact number, venue and age/guardian requirements. All content sits inside a one-third-inch printer margin.

The `/zumba/waiver/print` page now displays a PNG rendered from the exact downloadable PDF, keeping browser printing and the PDF visually consistent. Existing download and print controls remain; the page is responsive. `npm run generate:zumba-qr` generates both PDF and PNG via Poppler, with a temporary writable font configuration for bundled macOS Poppler. A PNG conversion of the approved wordmark is included as the PDF source asset.

Verified one 612-by-792-point page, complete extracted text, the rendered layout, successful QR decoding from the full poster image, and desktop/mobile browser previews. Build, SEO and whitespace checks pass. The public Zumba page still has no door-print link.

Published as Worker `418839ca-726c-4a98-881a-7e006eb7811e`.

## Exact Zumba-page typography for the door sign

Corrected the initial substitute serif/sans fonts to the actual Zumba page families: **Bebas Neue Regular** for the uppercase headline and **Archivo Regular/Bold** for all supporting text. The fonts are embedded and subset in the PDF, so printing does not rely on installed fonts or substitutions. Source fonts from Google Fonts and their OFL licenses are retained in `scripts/assets/fonts`; `@pdf-lib/fontkit` is a development dependency used only by the generation script. The print-page controls also use Archivo.

Rendered and visually checked the regenerated one-page PDF, confirmed embedded Bebas Neue and Archivo resources, and decoded the rendered poster's QR to the correct waiver URL. The web preview is generated from the same PDF.

Published as Worker `dce92b64-e2a9-4d1c-8882-e7ca408cd696`. The live print page loads the new poster and uses Archivo controls, with no mobile overflow. Build, SEO and whitespace checks pass.
