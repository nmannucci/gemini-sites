# Marevento — Design Spec

**Date:** 2026-07-24
**Location:** `demo-sites/marevento/`
**Status:** Approved concept, pending spec review

---

## 1. What this is

A single-page demo site for **Marevento**, an invented town on the Ligurian coast. It reads as a
travel guide to a place that does not exist. There is no booking engine, no client, no real
business — the town itself is the subject.

The purpose is a portfolio-grade demo piece showing what a distinctive, illustration-led site
looks like. Visual direction is derived entirely from the reference wallpaper at
`demo-sites/IMG_4321.JPG` (837×1500 JPEG): an aerial illustrated Mediterranean coastline —
turquoise-to-deep-blue water, a curving sand promenade, a pastel harbour town with terracotta
roofs, dozens of small sailboats, flowering foreground shrubs, soft flat clouds.

**Fiction disclosure.** Every place, price, and detail on the page is invented. The page carries a
visible line in the footer stating Marevento is a fictional town created as a design demo. No
`LocalBusiness` or `TouristDestination` structured data is emitted — publishing schema markup for a
nonexistent place would put fabricated business data into search indexes.

## 2. Non-goals

- No booking, payment, or form submission of any kind.
- No multi-page routing. One document.
- No build step, no framework, no npm dependencies.
- No JS libraries. Motion is CSS-first; the only JS permitted is a small scroll/parallax
  progress helper and an `IntersectionObserver` for reveal-on-scroll, both feature-detected and
  both no-ops under `prefers-reduced-motion`.
- Not a pixel-match of the reference image. It is a *style* source, not a target.

## 3. Deliverables

```
demo-sites/marevento/
  index.html          — the entire site: markup, inline <style>, inline <svg>, inline <script>
  BUSINESS_INFO.md    — the content bible (town facts, copy, invented details), matching
                        the demo-sites folder convention
```

The reference JPEG stays where it is at `demo-sites/IMG_4321.JPG` and is referenced by relative
path (`../IMG_4321.JPG`) from the hero. It is not copied or modified.

Single-file is deliberate and matches the existing `demo-sites/irontrack-garage/` pattern. Inline
SVG (rather than external files) is required anyway so CSS variables and hover/scroll animation can
reach into the artwork.

## 4. Visual system

### 4.1 Palette

Sampled from the reference image. Sea blues dominate the page; terracotta and coral are the sharp,
sparing accents. Timid, evenly distributed colour is the failure mode to avoid.

| Token | Hex | Role |
|---|---|---|
| `--sea-deep` | `#1E6FA8` | Deep water, primary dark surface |
| `--sea-mid` | `#2E86C1` | Mid water band |
| `--sea-shallow` | `#4FC3D9` | Turquoise shallows |
| `--sea-foam` | `#7BDCE4` | Foam edge, lightest water |
| `--sky` | `#DCE9F2` | Sky band |
| `--sky-pale` | `#EAF2F7` | Page background, upper |
| `--sand` | `#F0E0C0` | Beach, warm surface |
| `--sand-deep` | `#E8D5AC` | Sand shadow, promenade |
| `--stucco` | `#FBF3E4` | Building walls, cards, page background |
| `--terracotta` | `#D9553F` | Roofs — accent |
| `--coral` | `#E8453C` | Flowers, CTA — sharpest accent |
| `--cypress` | `#3E8C5A` | Trees, deep foliage |
| `--olive` | `#7BB661` | Light foliage |
| `--sun` | `#F2B233` | Boat hulls, highlights |
| `--ink` | `#173B52` | Text — dark desaturated navy, never pure black |

Derived shading tokens: `--shade` (`rgba(23,59,82,.12)`) for flat offset shadows, `--lift`
(`rgba(251,243,228,.6)`) for highlights. Shadows in SVG are **flat offset shapes, not blurs** — this
is the defining trait of the reference illustration style.

### 4.2 Typography — "Riviera poster"

- **Display:** Bodoni Moda (variable, 400/700/900) — high-contrast Italian serif, vintage
  travel-poster character. Used for the town name, section headings, and pull quotes. Tight
  tracking at large sizes.
- **Body:** Karla (400/500/700) — humanist grotesque, warm enough to sit under Bodoni without
  fighting it.
- **Labels:** Karla at 500, `text-transform: uppercase`, `letter-spacing: .22em`, small — used for
  eyebrow labels, coordinates, and card kickers.

Loaded from Google Fonts with `preconnect` + `display=swap`. Fallback stacks: `Georgia, serif` for
display, `system-ui, sans-serif` for body.

Hero town name is fluid: `clamp(3.5rem, 14vw, 11rem)`.

### 4.3 SVG illustration rules

Every illustrated element on the page is hand-authored inline SVG in the reference style. The rules
that make separate drawings read as one world:

1. **Flat fills only.** The single exception is water, which may use a 2–3 stop linear gradient.
2. **No strokes on forms.** Shape edges are defined by fill boundaries, not outlines.
3. **Three values per object** — base fill, one flat shadow (a duplicated shape offset down-right,
   filled with the base colour mixed toward `--ink`), one cream highlight where the sun catches.
4. **Shadows are hard-edged offset shapes.** No `feGaussianBlur` on illustration elements.
5. **Foam is white dashes** — short rounded horizontal capsules at ~70% opacity, scattered, denser
   near shorelines and boat wakes.
6. **Consistent scale logic.** Boats, figures, and buildings shrink toward the horizon; a figure is
   roughly 1/9 the height of a two-storey building.
7. **Detail density stays high.** The reference is busy — sparse vector scenes will read as cheap
   next to it. Each scene carries scattered small objects (shells, umbrellas, dinghies, flowers).
8. Viewports use `viewBox` + `preserveAspectRatio` so scenes crop gracefully rather than distort.

### 4.4 SVG scene inventory

| ID | Scene | Where |
|---|---|---|
| `sky-clouds` | Flat cumulus bank with offset shadow bellies | Hero backdrop, section tops |
| `boat-sm/md/lg` | Sailboat `<symbol>`s — hull, mast, main + jib, reflection | Reused throughout |
| `water-bands` | Layered wave bands, gradient + foam dashes | Hero, "On the water", footer |
| `coast-divider` | Sand curve + tiled promenade, full-bleed | Between major sections |
| `q-porto` | Quay, moored fishing boats, domed harbour building, crates | Quarter card 1 |
| `q-spiaggia` | Beach curve, umbrellas, shells, two swimmers | Quarter card 2 |
| `q-alta` | Stacked pastel houses, terracotta roofs, campanile, cypresses | Quarter card 3 |
| `q-scogliere` | Rocks, flowering shrubs, agave, tide pool | Quarter card 4 |
| `panorama-water` | Wide multi-scale boat panorama | "On the water" band |
| `table-scene` | Terrace table, plates, carafe, awning | "The table" |
| `stay-scene` | Three building silhouettes at different scales | "The bed" |
| `seasons-band` | Twelve-stop hue strip, cold blue → bleached gold → rust | "The year in colour" |
| `footer-waves` | Repeating wave band + one lone sailboat | Footer |

### 4.5 Motion

One orchestrated page load beats scattered micro-interactions. All of the below sit inside
`@media (prefers-reduced-motion: no-preference)`.

- **Load:** staggered fade + 16px rise on hero elements via `animation-delay` — label, town name,
  standfirst, locator, then the framed artwork last at 640ms.
- **Clouds:** `translateX` loop, 90s and 140s on two layers for parallax depth.
- **Sailboats:** slow drift across the water bands plus a ±1.5° rotation bob, desynchronised by
  per-boat `animation-delay`.
- **Water shimmer:** foam-dash group opacity pulse, 7s ease-in-out alternate.
- **Scroll:** hero frame and cloud layers parallax at differing rates. Implemented with CSS
  scroll-driven animation (`animation-timeline: view()`) where supported; a `requestAnimationFrame`
  scroll handler is the fallback, throttled and passive.
- **Reveal:** sections fade + rise once on entry via `IntersectionObserver`, one-shot.
- **Hover:** quarter cards lift 6px with the flat shadow offsetting to match — shadow moves, it does
  not blur.

## 5. Page structure

1. **Hero.** Eyebrow label `LIGURIAN COAST · EST. 1476`. Town name *Marevento* in Bodoni. One-line
   standfirst. Locator strip: `43°49′N 9°06′E · pop. 2,140 · 4 hrs from Genoa`. The reference JPEG
   in a tall postcard frame — cream mat, flat offset shadow, slight rotation — flanked by SVG sky,
   clouds, and water so the photo sits *inside* the illustrated world rather than beside it. Scroll
   cue at the base.

   *Rationale for the frame:* the source is 837×1500 portrait. A full-bleed desktop hero would crop
   away roughly two thirds of the picture. Framing it preserves the whole composition and reads as
   deliberate.

2. **The lay of it.** Two paragraphs of place-writing. Four stats in Bodoni numerals: souls, hulls
   in the harbour, steps to the upper town, gelaterie.

3. **Four quarters.** `Il Porto` · `Spiaggia Lunga` · `Città Alta` · `Le Scogliere`. Each a card
   with its own SVG vignette, its own accent colour from the palette, a kicker label, and 40–60
   words. Grid: 4-up desktop, 2-up tablet, 1-up mobile.

4. **On the water.** Full-bleed `panorama-water` band on `--sea-deep`. Three items: day sails, the
   6am fish run, the swim to the rocks. Light text on deep blue — the page's one dark section, for
   rhythm.

5. **The table & the bed.** Two columns. Left: four places to eat, listed like a menu with dotted
   leaders. Right: three places to sleep, ascending — pensione → harbour rooms → cliff villa.

6. **The year in colour.** Twelve-month band, hue shifting across the strip. Each month carries a
   two-to-four-word note. Horizontally scrollable on mobile with a visible scroll affordance.

7. **Footer.** Closing note — "Come in September". `footer-waves`. Fiction disclosure line. No
   contact form, no fake address.

## 6. Responsive behaviour

Mobile-first. Breakpoints at 640px, 900px, 1200px.

- Hero: stacked on mobile (type above frame), side-by-side from 900px.
- The framed JPEG is `max-width: 100%` and never exceeds 380px wide on desktop.
- Quarter cards: 1 → 2 → 4 across the breakpoints.
- Seasons band: horizontal scroll under 900px, full width above, inside its own
  `overflow-x: auto` container. The page body never scrolls horizontally at any width.
- Full-bleed SVG scenes crop from the centre via `preserveAspectRatio="xMidYMid slice"`.
- Touch targets ≥ 44px.

## 7. Accessibility

- Semantic landmarks: `header`, `main`, `section` with `aria-labelledby`, `footer`.
- Heading order is strictly sequential; one `h1`.
- Decorative SVG carries `aria-hidden="true"` and `focusable="false"`. The hero JPEG has a
  descriptive `alt`.
- Body text meets WCAG AA against its background at every section, including light-on-`--sea-deep`.
- Visible focus rings — 2px `--coral` outline with 2px offset — never removed.
- `prefers-reduced-motion: reduce` disables all drift, shimmer, parallax, and reveal animations;
  content renders in its final state.

## 8. SEO

`<title>`, meta description, canonical, `og:title` / `og:description` / `og:image` /
`og:type=website`, `twitter:card=summary_large_image`, `theme-color` set to `--sea-deep`. `og:image`
points at the reference JPEG. Language set on `<html lang="en">`.

No JSON-LD, per §1.

## 9. Verification

Before the work is called done:

1. Renders in the browser with no console errors and no failed network requests.
2. Screenshotted at 375px, 768px, and 1440px; no horizontal body scroll at any of the three.
3. Reduced-motion emulation on — page is legible and static.
4. All thirteen SVG scenes from the §4.4 inventory are present and obey §4.3 (no blurred shadows,
   no stroked forms, no sparse scenes).
5. Heading order and landmark structure checked.

## 10. Open risks

- **SVG authoring volume is the bulk of the work.** Thirteen scenes at the reference's detail
  density is the single largest cost and the most likely place for quality to slip. Scenes are built
  in dependency order — shared `<symbol>`s (boats, clouds, foam) first, then compositions that reuse
  them.
- **Style drift across scenes.** Mitigated by §4.3 being explicit and by building all scenes off the
  same symbol library and palette tokens.
- **Single-file size.** Thirteen inline SVG scenes will make `index.html` large. Acceptable for a
  demo, and it keeps the zero-dependency, zero-build constraint. If it exceeds roughly 400KB the
  scenes get split into an external sprite sheet — noted, not planned for.
