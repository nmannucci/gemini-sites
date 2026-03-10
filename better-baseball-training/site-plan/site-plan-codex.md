# Implement the SEO-First BBT Homepage in `index-claude.html`

## Summary
- Treat `/Users/nico/Gemini/gemini-sites/better-baseball-training/index-claude.html` as the single deliverable.
- Preserve the current bold sports-art direction, but restructure the page so search engines and answer engines can understand the business, offers, locations, and credibility without relying on visual flair.
- Build the page around one primary intent: `youth baseball training` / `baseball lessons` in `Rocklin` and `El Dorado Hills, CA`, with academy and travel teams as secondary intents.

## Implementation Changes
- Update the `<head>`:
  - Replace the current title with `Youth Baseball Training in Rocklin & El Dorado Hills, CA | Better Baseball Training`.
  - Replace the meta description with a local-intent version focused on lessons, academy, and ages `8–14U`.
  - Add a canonical pointing to the homepage URL.
  - Add Open Graph and Twitter tags using the hero/team image and the same search-aligned messaging.
  - Add one JSON-LD block for `Organization` plus location data; include name, URL, logo, phone, email, sameAs social links, and the two verified addresses.
- Rework the hero content, not the overall art direction:
  - Keep the split-panel composition, brand mark, and animated style.
  - Change the H1 to `Youth Baseball Training in Rocklin & El Dorado Hills, CA`.
  - Move `It’s Just Better.` into a supporting line or badge.
  - Rewrite the hero paragraph so the first 100 words explicitly mention youth baseball lessons, academy membership, travel baseball, ages `8–14U`, and both cities.
  - Keep `Book a Lesson` as the primary CTA and make `Join the Academy` the secondary CTA.
- Expand the page from 3 sections into a full homepage information architecture:
  - `Hero`
  - `Training Programs`
  - `Locations`
  - `Academy Membership`
  - `Meet the Coaches`
  - `Why Parents Choose BBT`
  - `Travel Teams`
  - `FAQ`
  - `Final CTA / Contact`
- Implement each section with clear SEO/AEO intent:
  - `Training Programs`: keep the five current service cards, but rewrite each card to mention what the training covers and who it is for; if no real subpages exist, use anchored homepage links and booking links instead of fake internal URLs.
  - `Locations`: add two location cards with full address, short facility description, and a sentence about who each location serves; this is where the local relevance should live most explicitly.
  - `Academy Membership`: keep pricing visible; add a concise paragraph that explains what the membership is, who it is for, and why parents choose it over one-off lessons.
  - `Meet the Coaches`: add Jon Peters plus 3-5 selected coaches pulled from `/Users/nico/Gemini/gemini-sites/better-baseball-training/businessinfo.md`; prioritize coaches with college/pro affiliations for E-E-A-T.
  - `Why Parents Choose BBT`: add 4-6 differentiators grounded in available facts only, such as two indoor facilities, college/pro backgrounds, structured player development, and age-specific programming.
  - `Travel Teams`: keep it short and supportive; position it as the next step for players who want competitive development, with one CTA to the player-interest path.
  - `FAQ`: add 5-7 search-style questions with direct 50-100 word answers. Include questions on age range, locations, private lessons, academy membership, travel teams, and what first-time families should do.
  - `Final CTA / Contact`: include phone, email, booking link, waiver link, and strong local closing copy.
- Tighten heading structure:
  - One H1 only.
  - Each major section gets one descriptive H2.
  - Cards and coach names use H3s only where semantically appropriate.
  - Do not use decorative headings that obscure topic intent.
- Add on-page copy rules:
  - Use exact-match or near-match primary keyword variants naturally in H1, intro, locations, FAQ, and final CTA.
  - Keep brand slogan and motivational language secondary to service clarity.
  - Avoid unsupported claims, invented metrics, or testimonials unless provided.
- Improve technical SEO and performance inside the same file:
  - Reduce font payload by removing unused families and weights.
  - Preload only the primary hero image if it remains above the fold.
  - Add `loading="lazy"` to below-the-fold images.
  - Ensure all images have descriptive alt text tied to actual content.
  - Keep key business info in HTML text, not only in graphics or animated elements.
- Keep navigation honest:
  - Replace dead `#` links with section anchors for this homepage-only version.
  - Use labels like `Programs`, `Locations`, `Coaches`, `Academy`, `FAQ`.
  - Keep the booking CTA persistent in the nav.

## Content Specification
- Hero copy must answer this in one pass: who BBT serves, what it offers, where it operates.
- Primary keyword cluster:
  - `youth baseball training rocklin ca`
  - `baseball lessons rocklin ca`
  - `baseball training el dorado hills ca`
- Secondary keyword cluster:
  - `hitting lessons`
  - `pitching lessons`
  - `baseball academy`
  - `travel baseball`
  - `indoor baseball training`
- FAQ questions should be phrased like:
  - `Do you offer baseball lessons in Rocklin?`
  - `What ages does Better Baseball Training work with?`
  - `What is included in the BBT academy membership?`
  - `Do you have baseball training in El Dorado Hills?`
  - `How do I book a baseball lesson at BBT?`
- Schema content should match visible page content exactly, especially addresses, contact info, and FAQ answers.

## Test Plan
- Validate HTML metadata:
  - Title present and not excessively long.
  - Meta description present and aligned to homepage intent.
  - Canonical present and correct.
- Validate structure:
  - Exactly one H1.
  - Logical H2/H3 order.
  - All nav links resolve to real anchors or real URLs.
- Validate local SEO signals:
  - Both locations visible in crawlable text.
  - Phone, email, and business name appear on-page.
  - Location details in schema match visible content.
- Validate AEO readiness:
  - FAQ answers are direct and self-contained.
  - Major sections begin with short extractable paragraphs, not vague brand copy.
- Validate performance/accessibility:
  - Above-the-fold image is optimized.
  - Below-the-fold images lazy-load.
  - Alt text exists for content images.
  - Mobile layout preserves section hierarchy and CTA visibility.
- Validate business accuracy:
  - Pricing, ages, coach affiliations, addresses, and links match `businessinfo.md`.
  - No fabricated testimonials, awards, or statistics.

## Assumptions
- This pass only modifies the homepage and does not create new crawlable subpages.
- Current CTA destinations remain the booking app, email, player-interest path, and waiver.
- Existing images are sufficient for coaches, hero, facilities, and training sections.
- The homepage should rank as a strong local commercial-intent page first, not as a broad editorial or blog-style asset.
