# Marevento Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, zero-dependency demo site for Marevento — an invented Ligurian coastal town — whose entire visual world is hand-authored inline SVG in the flat storybook style of `demo-sites/IMG_4321.JPG`.

**Architecture:** One self-contained `index.html` holding markup, an inline `<style>` block, an inline SVG `<defs>` symbol library, thirteen inline SVG scenes, and a small inline `<script>` for scroll parallax and reveal. Every scene composes from the same symbol library and the same CSS custom-property palette, which is what keeps thirteen separate drawings reading as one world. Sections are built in dependency order: tokens → symbols → hero → content sections → motion → responsive/a11y hardening.

**Tech Stack:** HTML5, CSS3 (custom properties, `clamp()`, grid, scroll-driven animations with a `requestAnimationFrame` fallback), inline SVG 1.1, vanilla JS (`IntersectionObserver` only). Google Fonts: Bodoni Moda + Karla. No build step, no npm, no framework, no libraries.

**Source spec:** `docs/superpowers/specs/2026-07-24-marevento-design.md` — read it before Task 1. Section references below (§4.1, §4.3, etc.) point into it.

---

## Deviations From The Default Skill Workflow

Two, both deliberate. An executing agent should not treat these as omissions:

1. **No red-green TDD.** There is no test runner in this repo and the artifact is a static document. Each task's gate is the Verification Cycle below instead. Where a task has an objectively checkable property (no horizontal scroll, no console errors, correct heading order), the check is written as an exact command with expected output.
2. **SVG scene code is specified, not transcribed.** Tasks give exact `viewBox` values, exact palette tokens per element, exact symbol calls, and a precise element inventory for each scene. They do not paste 200 lines of finished path data — that would make the plan a duplicate of the artifact and violate DRY. The symbol library in Task 2, which every later scene depends on, *is* given as complete code, because consistency there is load-bearing.

---

## Global Constraints

Every task's requirements implicitly include this section.

- **Output location:** `demo-sites/marevento/index.html`. Single file. No other runtime files.
- **Zero dependencies.** No npm, no build step, no CSS or JS libraries. Google Fonts via `<link>` is the only external request besides the hero image.
- **Reference image:** `../IMG_4321.JPG` (837×1500). Referenced by relative path only — never copied, moved, or modified.
- **Palette:** exactly the fifteen tokens in spec §4.1. No colour literal appears outside the `:root` block; everything else uses `var(--token)`.
- **Type:** Bodoni Moda (display), Karla (body), Karla uppercase `letter-spacing:.22em` (labels). Fallbacks `Georgia, serif` and `system-ui, sans-serif`.
- **SVG style rules (spec §4.3), non-negotiable:** flat fills only (water gradients excepted); no strokes on forms; three values per object (base / flat offset shadow / cream highlight); shadows are hard-edged offset shapes — **no `feGaussianBlur` anywhere**; foam is white rounded dashes at ~70% opacity; consistent scale logic; high detail density.
- **Decorative SVG** carries `aria-hidden="true" focusable="false"`.
- **All motion** sits inside `@media (prefers-reduced-motion: no-preference)`.
- **The page body never scrolls horizontally** at any viewport width.
- **Fiction disclosure** line in the footer. **No JSON-LD** — the town is invented (spec §1).
- **Commit after every task** with a `feat:` / `style:` / `chore:` prefixed message. Work directly on `master`, matching this repo's history.

## Verification Cycle

Run at the end of every task. `PAGE` = `file:///Users/nico/Gemini/gemini-sites/demo-sites/marevento/index.html`

1. `mcp__plugin_playwright_playwright__browser_navigate` → `PAGE`
2. `mcp__plugin_playwright_playwright__browser_console_messages` → expect zero errors
3. `mcp__plugin_playwright_playwright__browser_resize` 1440×900, then `browser_take_screenshot` — inspect the screenshot against the task's stated expected result
4. `browser_evaluate` → `document.documentElement.scrollWidth <= document.documentElement.clientWidth` → expect `true`

A task is not complete until all four pass. If step 3 shows the section is visually wrong — sparse, off-palette, blurred shadows, drifting style — fix it before committing rather than deferring to Task 11.

## File Structure

| File | Responsibility |
|---|---|
| `demo-sites/marevento/index.html` | The entire site. Ordered: `<head>` meta + fonts → `<style>` (tokens, base, then one block per section in DOM order) → `<body>` → SVG `<defs>` symbol library → sections → `<script>` |
| `demo-sites/marevento/BUSINESS_INFO.md` | Content bible — every invented fact, name, price and line of copy. Written first so later tasks copy from it instead of improvising, which is how naming drift happens. Matches the `demo-sites/` folder convention. |

---

### Task 1: Content bible, scaffold, and design tokens

**Files:**
- Create: `demo-sites/marevento/BUSINESS_INFO.md`
- Create: `demo-sites/marevento/index.html`

**Interfaces:**
- Consumes: nothing.
- Produces: the CSS custom properties every later task uses (`--sea-deep`, `--sea-mid`, `--sea-shallow`, `--sea-foam`, `--sky`, `--sky-pale`, `--sand`, `--sand-deep`, `--stucco`, `--terracotta`, `--coral`, `--cypress`, `--olive`, `--sun`, `--ink`, `--shade`, `--lift`); the utility classes `.label`, `.wrap`, `.reveal`; and the canonical copy in `BUSINESS_INFO.md`.

- [ ] **Step 1: Write `BUSINESS_INFO.md`**

It must contain, as final copy ready to paste — not summaries:

- Town identity: name *Marevento*, `43°49′N 9°06′E`, pop. 2,140, est. 1476, 4 hrs from Genoa.
- Hero standfirst — one sentence, under 20 words.
- "The lay of it" — two paragraphs of place-writing, 60–90 words each.
- Four stats with labels: souls (2,140), hulls in the harbour (188), steps to the upper town (412), gelaterie (6).
- Four quarters, each with name, one-word kicker, assigned accent token, and 40–60 words of body:
  `Il Porto` (--terracotta) · `Spiaggia Lunga` (--sun) · `Città Alta` (--coral) · `Le Scogliere` (--cypress).
- "On the water" — three items with title + 25–35 words: day sails, the 6am fish run, the swim to the rocks.
- Four places to eat: name + one-line description + a price in euro.
- Three places to sleep, ascending: pensione, harbour rooms, cliff villa — name, one line, nightly price.
- Twelve months, each with a two-to-four-word note and a hex hue for the seasons band, running cold blue (Jan) → bleached gold (Aug) → rust (Nov) → cold blue (Dec).
- Footer closing note built around "Come in September".
- The fiction disclosure sentence, verbatim as it will appear.

- [ ] **Step 2: Create `index.html` with head, fonts, and token layer**

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Marevento — a town on the Ligurian coast</title>
<meta name="description" content="A guide to Marevento: 2,140 souls, 188 hulls in the harbour, and 412 steps to the upper town. An invented town on the Ligurian coast.">
<link rel="canonical" href="https://example.com/marevento/">
<meta property="og:type" content="website">
<meta property="og:title" content="Marevento — a town on the Ligurian coast">
<meta property="og:description" content="2,140 souls, 188 hulls in the harbour, 412 steps to the upper town.">
<meta property="og:image" content="../IMG_4321.JPG">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#1E6FA8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,700;6..96,900&family=Karla:wght@400;500;700&display=swap" rel="stylesheet">
<style>
:root{
  --sea-deep:#1E6FA8; --sea-mid:#2E86C1; --sea-shallow:#4FC3D9; --sea-foam:#7BDCE4;
  --sky:#DCE9F2; --sky-pale:#EAF2F7;
  --sand:#F0E0C0; --sand-deep:#E8D5AC; --stucco:#FBF3E4;
  --terracotta:#D9553F; --coral:#E8453C;
  --cypress:#3E8C5A; --olive:#7BB661; --sun:#F2B233;
  --ink:#173B52;
  --shade:rgba(23,59,82,.12); --lift:rgba(251,243,228,.6);
  --display:"Bodoni Moda",Georgia,serif;
  --body:"Karla",system-ui,sans-serif;
}
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--stucco);color:var(--ink);font-family:var(--body);
  font-size:clamp(1rem,.95rem + .25vw,1.125rem);line-height:1.65;
  -webkit-font-smoothing:antialiased;overflow-x:hidden}
h1,h2,h3{font-family:var(--display);font-weight:700;line-height:1.05;margin:0}
img,svg{max-width:100%;display:block}
a{color:inherit}
:focus-visible{outline:2px solid var(--coral);outline-offset:2px}
.wrap{width:min(1200px,92vw);margin-inline:auto}
.label{font-family:var(--body);font-weight:500;text-transform:uppercase;
  letter-spacing:.22em;font-size:.7rem}
.reveal{opacity:0;transform:translateY(16px)}
.reveal.in{opacity:1;transform:none;transition:opacity .7s ease,transform .7s cubic-bezier(.2,.7,.3,1)}
@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  .reveal{opacity:1;transform:none;transition:none}
}
</style>
</head>
<body>
<main></main>
</body>
</html>
```

Note `.reveal` defaults to hidden but is force-shown under reduced motion, so content is never trapped invisible if JS fails to run — verified in Task 10 Step 4.

- [ ] **Step 3: Run the Verification Cycle**

Expected at this stage: a blank cream page, no console errors, `scrollWidth <= clientWidth` is `true`. Confirm in the screenshot that the background is `#FBF3E4` cream, not white — that proves the token block is applied.

- [ ] **Step 4: Confirm the fonts actually loaded**

```
browser_evaluate: document.fonts.check('700 48px "Bodoni Moda"') && document.fonts.check('400 16px "Karla"')
```
Expected: `true`. If `false`, the Google Fonts URL is wrong — fix before continuing, because every later task's screenshot review depends on real type.

- [ ] **Step 5: Commit**

```bash
git add demo-sites/marevento/
git commit -m "feat: scaffold Marevento demo site with content bible and design tokens"
```

---

### Task 2: SVG symbol library

**Files:**
- Modify: `demo-sites/marevento/index.html` — add `<svg class="defs">` as the first child of `<body>`, before `<main>`

**Interfaces:**
- Consumes: palette tokens from Task 1.
- Produces: `<symbol>` ids referenced by every later scene via `<use href="#id">` — `#boat-sm`, `#boat-md`, `#boat-lg`, `#cloud-a`, `#cloud-b`, `#foam-cluster`, `#cypress-tree`, `#house-a`, `#house-b`, `#figure`. Also produces the CSS classes `.sail`, `.hull`, `.hull-alt`, `.shadow`, `.foam`.

- [ ] **Step 1: Add the defs container and its CSS**

```css
.defs{position:absolute;width:0;height:0;overflow:hidden}
.sail{fill:var(--stucco)}
.sail-shade{fill:var(--sand-deep)}
.hull{fill:var(--terracotta)}
.hull-alt{fill:var(--sun)}
.mast{fill:var(--ink);opacity:.55}
.shadow{fill:var(--ink);opacity:.12}
.foam{fill:#fff;opacity:.7}
.roof{fill:var(--terracotta)}
.wall{fill:var(--stucco)}
.wall-shade{fill:var(--sand-deep)}
.leaf{fill:var(--cypress)}
.leaf-lt{fill:var(--olive)}
```

- [ ] **Step 2: Author the symbol library**

```html
<svg class="defs" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
<defs>

  <!-- Sailboat, medium. viewBox 0 0 40 46. Waterline sits at y=38.
       Shadow is a flat offset copy, never a blur. -->
  <symbol id="boat-md" viewBox="0 0 40 46">
    <path class="sail" d="M20 2 L20 34 L6 34 Z"/>
    <path class="sail-shade" d="M20 2 L20 34 L14 34 Z"/>
    <path class="sail" d="M22 10 L22 34 L33 34 Z"/>
    <rect class="mast" x="19.4" y="2" width="1.2" height="33"/>
    <path class="hull" d="M4 35 H36 L31 42 H9 Z"/>
    <path class="shadow" d="M9 42 H31 L29 44 H11 Z"/>
    <ellipse class="foam" cx="20" cy="43.5" rx="15" ry="1.6"/>
  </symbol>

  <!-- Small and large are separate symbols, not scaled copies:
       detail is dropped at small size and added at large, which is what
       keeps density consistent across scales (spec §4.3 rule 6). -->
  <symbol id="boat-sm" viewBox="0 0 24 28">
    <path class="sail" d="M12 1 L12 20 L4 20 Z"/>
    <path class="sail" d="M13 7 L13 20 L20 20 Z"/>
    <path class="hull" d="M3 21 H21 L18 25 H6 Z"/>
    <ellipse class="foam" cx="12" cy="26" rx="9" ry="1.1"/>
  </symbol>

  <symbol id="boat-lg" viewBox="0 0 72 84">
    <path class="sail" d="M36 3 L36 62 L10 62 Z"/>
    <path class="sail-shade" d="M36 3 L36 62 L25 62 Z"/>
    <path class="sail" d="M39 18 L39 62 L61 62 Z"/>
    <path class="sail-shade" d="M39 18 L39 62 L47 62 Z"/>
    <rect class="mast" x="35" y="3" width="2" height="60"/>
    <path class="hull" d="M7 63 H65 L56 76 H16 Z"/>
    <rect class="wall" x="28" y="57" width="16" height="6" rx="1"/>
    <path class="shadow" d="M16 76 H56 L52 80 H20 Z"/>
    <ellipse class="foam" cx="36" cy="79" rx="27" ry="2.6"/>
  </symbol>

  <!-- Clouds: flat top mass + offset shadow belly, no gradient, no blur -->
  <symbol id="cloud-a" viewBox="0 0 160 60">
    <path fill="#fff" d="M18 44 a18 18 0 0 1 6-30 a24 24 0 0 1 44-6 a20 20 0 0 1 34 10 a16 16 0 0 1 40 12 a14 14 0 0 1-14 14 H18 Z"/>
    <path fill="var(--sky)" d="M18 44 H128 a14 14 0 0 0 12-7 H30 a18 18 0 0 1-12 7 Z"/>
  </symbol>

  <symbol id="cloud-b" viewBox="0 0 120 44">
    <path fill="#fff" d="M14 33 a14 14 0 0 1 5-23 a18 18 0 0 1 33-4 a15 15 0 0 1 26 8 a11 11 0 0 1 4 19 Z"/>
    <path fill="var(--sky)" d="M14 33 H82 a11 11 0 0 0 6-5 H22 a14 14 0 0 1-8 5 Z"/>
  </symbol>

  <!-- Foam cluster: the repeating white dash motif, spec §4.3 rule 5 -->
  <symbol id="foam-cluster" viewBox="0 0 100 20">
    <rect class="foam" x="2"  y="4"  width="18" height="2.4" rx="1.2"/>
    <rect class="foam" x="26" y="10" width="26" height="2.4" rx="1.2"/>
    <rect class="foam" x="58" y="3"  width="14" height="2.4" rx="1.2"/>
    <rect class="foam" x="44" y="16" width="20" height="2.4" rx="1.2"/>
    <rect class="foam" x="76" y="12" width="20" height="2.4" rx="1.2"/>
  </symbol>

  <symbol id="cypress-tree" viewBox="0 0 20 56">
    <path class="leaf" d="M10 0 C16 16 17 34 15 50 H5 C3 34 4 16 10 0 Z"/>
    <path class="leaf-lt" d="M10 0 C13 16 13.5 34 12.5 50 H10 Z"/>
    <rect fill="var(--ink)" opacity=".5" x="9" y="48" width="2" height="8"/>
  </symbol>

  <symbol id="house-a" viewBox="0 0 60 70">
    <rect class="wall" x="6" y="20" width="48" height="50"/>
    <rect class="wall-shade" x="42" y="20" width="12" height="50"/>
    <path class="roof" d="M0 21 L30 4 L60 21 Z"/>
    <rect fill="var(--sea-deep)" opacity=".7" x="14" y="30" width="8" height="11" rx="1"/>
    <rect fill="var(--sea-deep)" opacity=".7" x="30" y="30" width="8" height="11" rx="1"/>
    <rect fill="var(--sea-deep)" opacity=".7" x="14" y="49" width="8" height="11" rx="1"/>
    <rect fill="var(--coral)" x="30" y="49" width="9" height="21" rx="1"/>
  </symbol>

  <symbol id="house-b" viewBox="0 0 48 84">
    <rect class="wall" x="5" y="16" width="38" height="68"/>
    <rect class="wall-shade" x="33" y="16" width="10" height="68"/>
    <path class="roof" d="M0 17 L24 3 L48 17 Z"/>
    <rect fill="var(--sea-deep)" opacity=".7" x="12" y="26" width="7" height="10" rx="1"/>
    <rect fill="var(--sea-deep)" opacity=".7" x="25" y="26" width="7" height="10" rx="1"/>
    <rect fill="var(--sea-deep)" opacity=".7" x="12" y="44" width="7" height="10" rx="1"/>
    <rect fill="var(--sea-deep)" opacity=".7" x="25" y="44" width="7" height="10" rx="1"/>
    <rect fill="var(--sun)" x="12" y="62" width="20" height="8" rx="1"/>
  </symbol>

  <!-- Figure: 1/9 the height of house-a, per spec §4.3 rule 6 -->
  <symbol id="figure" viewBox="0 0 6 14">
    <circle fill="var(--ink)" opacity=".8" cx="3" cy="2.4" r="2.1"/>
    <path fill="var(--sea-deep)" d="M1 5.6 h4 l.7 6.4 h-5.4 Z"/>
    <rect class="shadow" x=".5" y="12.4" width="5" height="1.4" rx=".7"/>
  </symbol>

</defs>
</svg>
```

- [ ] **Step 3: Add a temporary proof harness**

Temporarily append inside `<main>`, to confirm every symbol renders:

```html
<svg id="proof" viewBox="0 0 400 120" width="800" aria-hidden="true" focusable="false">
  <rect width="400" height="120" fill="var(--sky-pale)"/>
  <use href="#boat-sm" x="10"  y="60" width="24" height="28"/>
  <use href="#boat-md" x="45"  y="45" width="40" height="46"/>
  <use href="#boat-lg" x="95"  y="15" width="72" height="84"/>
  <use href="#cloud-a" x="180" y="10" width="80" height="30"/>
  <use href="#cloud-b" x="270" y="16" width="60" height="22"/>
  <use href="#foam-cluster" x="180" y="60" width="100" height="20"/>
  <use href="#cypress-tree" x="300" y="45" width="20" height="56"/>
  <use href="#house-a" x="330" y="40" width="34" height="40"/>
  <use href="#house-b" x="370" y="30" width="24" height="42"/>
  <use href="#figure"  x="290" y="88" width="6"  height="14"/>
</svg>
```

- [ ] **Step 4: Run the Verification Cycle, checking the harness**

Expected in the screenshot: ten distinct shapes, all rendered, none blank or black. Boats read as boats. Colours match the palette — terracotta hulls, cream sails, cypress-green trees. Every shape is flat with hard-edged shadow. If any `<use>` renders empty, its `viewBox` and symbol `id` disagree — fix before continuing, since every later scene depends on these.

- [ ] **Step 5: Delete the proof harness, re-run the cycle, commit**

Remove the `#proof` svg entirely. Re-run the Verification Cycle — expect a blank cream page again.

```bash
git add demo-sites/marevento/index.html
git commit -m "feat: add Marevento SVG symbol library"
```

---

### Task 3: Hero

**Files:**
- Modify: `demo-sites/marevento/index.html` — add `<header class="hero">` as the first child of `<main>`, plus its style block

**Interfaces:**
- Consumes: all symbols from Task 2; `.label`, `.wrap` from Task 1.
- Produces: `.hero`, `.hero__copy`, `.hero__frame`, `.sky-layer`, `.water-layer`, `.cloud-drift-a`, `.cloud-drift-b`, `.boat-drift` (the last three are hooked by Task 10's motion), and `.rise` with its `--d` delay variable, defined in Step 2 below.

- [ ] **Step 1: Build the hero structure**

Composition, back to front:
1. `.sky-layer` — full-bleed SVG, `viewBox="0 0 1440 520"`, `preserveAspectRatio="xMidYMid slice"`. Flat `--sky` ground, six `#cloud-a`/`#cloud-b` instances at varying scale and opacity, split across two groups `.cloud-drift-a` (four, larger, front) and `.cloud-drift-b` (two, smaller, higher, `opacity:.75`).
2. `.water-layer` — full-bleed SVG, `viewBox="0 0 1440 420"`, `slice`. Four horizontal wave bands top-to-bottom: `--sea-foam`, `--sea-shallow`, `--sea-mid`, `--sea-deep`, each with a gently curved top edge (quadratic, ~18px amplitude), not a straight line. Eight `#foam-cluster` instances scattered across the bands. Five boats — two `#boat-sm` far, two `#boat-md` mid, one `#boat-lg` near — each wrapped in its own `<g class="boat-drift">` with an inline `style="--i:N"` for desynchronisation.
3. `.hero__copy` — `.label` reading `LIGURIAN COAST · EST. 1476`; `<h1>Marevento</h1>` at `font-size:clamp(3.5rem,14vw,11rem)`, `letter-spacing:-.02em`, `font-weight:900`; standfirst from `BUSINESS_INFO.md`; locator strip `43°49′N 9°06′E · pop. 2,140 · 4 hrs from Genoa` in `.label`.
4. `.hero__frame` — the JPEG in a cream mat: `padding:14px 14px 52px`, `background:var(--stucco)`, `transform:rotate(-1.6deg)`, `box-shadow:14px 14px 0 var(--shade)` (a hard offset shadow — this is the one place a CSS `box-shadow` is used, with zero blur radius, matching the SVG rule).

```html
<img src="../IMG_4321.JPG" width="837" height="1500"
     alt="Illustrated aerial view of Marevento: sailboats on turquoise water, a curving sand promenade, and a pastel harbour town rising into the hills."
     fetchpriority="high">
```

Layout: `.hero` is `position:relative`, `min-height:100svh`, `display:grid`. Copy and frame sit in a `.wrap` grid — single column on mobile (copy above frame), `grid-template-columns:1fr auto` from 900px with the frame at `max-width:380px`.

5. Scroll cue at the base — a `.label` reading `SCROLL` above a 1px `--ink` rule, `opacity:.5`.

- [ ] **Step 2: Add the load stagger**

Hero children carry `.rise` with `--d` set per element. Delays: label 0ms, `h1` 120ms, standfirst 280ms, locator 400ms, scroll cue 520ms, frame 640ms.

```css
.rise{opacity:0;transform:translateY(18px)}
@media (prefers-reduced-motion:no-preference){
  .rise{animation:rise .9s cubic-bezier(.2,.7,.3,1) forwards;animation-delay:var(--d,0ms)}
}
@media (prefers-reduced-motion:reduce){ .rise{opacity:1;transform:none} }
@keyframes rise{to{opacity:1;transform:none}}
```

- [ ] **Step 3: Run the Verification Cycle**

Expected: a full-viewport hero. Sky with clouds on top, four-band water below, the framed photograph tilted slightly with a hard cream-and-shadow mat, "Marevento" in large Bodoni. The photo sits *inside* the illustrated scene — sky above it, water behind it — rather than floating on a plain background. Elements fade in staggered on load.

- [ ] **Step 4: Confirm the hero image resolved**

```
browser_evaluate: (() => { const i = document.querySelector('.hero__frame img'); return i.complete && i.naturalWidth === 837; })()
```
Expected: `true`. `false` means the relative path is wrong.

- [ ] **Step 5: Commit**

```bash
git add demo-sites/marevento/index.html
git commit -m "feat: add Marevento hero with framed artwork and illustrated sky and water"
```

---

### Task 4: "The lay of it" and the coast divider

**Files:**
- Modify: `demo-sites/marevento/index.html` — add `<section id="lay">` after the hero, plus the `#coast-divider` scene

**Interfaces:**
- Consumes: symbols from Task 2; copy from `BUSINESS_INFO.md`.
- Produces: `.divider` (reused verbatim between later sections), `.stats`, `.stat`.

- [ ] **Step 1: Build the coast divider**

Full-bleed SVG, `viewBox="0 0 1440 160"`, `preserveAspectRatio="none"`, `height:clamp(80px,10vw,160px)`, `display:block`, no margin. Layers top to bottom: `--sea-shallow` band → a curved `--sand` shore edge with three `#foam-cluster` along it → `--sand-deep` promenade with a faint tile grid (1px `--sand` lines at 34px intervals, `opacity:.5`) → two `#figure` instances walking it. It sits directly between sections and is reused, unchanged, before Tasks 6, 7 and 8's sections.

- [ ] **Step 2: Build the section**

`<section id="lay" aria-labelledby="lay-h">` on `--stucco`, `padding-block:clamp(4rem,10vw,9rem)`. Inside `.wrap`:
- `.label` eyebrow: `THE LAY OF IT`
- `<h2 id="lay-h">` at `clamp(2rem,5vw,3.75rem)`
- Two paragraphs from `BUSINESS_INFO.md` in a two-column grid from 900px, `gap:3rem`, `max-width:34ch` each
- `.stats` — a four-up grid (2-up under 640px), each `.stat` a Bodoni number at `clamp(2.5rem,6vw,4.5rem)` in `--sea-deep` above a `.label` caption in `--ink` at `opacity:.7`. A 1px `--sand-deep` rule separates the stats row from the paragraphs.

Wrap the section content in `.reveal` so Task 10 animates it in.

- [ ] **Step 3: Run the Verification Cycle**

Expected: below the hero, a shore-and-promenade band spanning the full width with no side gaps, then cream section with two columns of text and four large blue numerals.

- [ ] **Step 4: Commit**

```bash
git add demo-sites/marevento/index.html
git commit -m "feat: add Marevento lay-of-the-land section and coast divider"
```

---

### Task 5: The four quarters

**Files:**
- Modify: `demo-sites/marevento/index.html` — add `<section id="quarters">` after `#lay`

**Interfaces:**
- Consumes: symbols from Task 2; copy and accent assignments from `BUSINESS_INFO.md`.
- Produces: `.quarters`, `.quarter`, `.quarter__art`. Each card sets `--accent` inline.

This is the densest task. Four scenes, each `viewBox="0 0 320 220"`, `preserveAspectRatio="xMidYMid slice"`, sitting as the top of its card at `aspect-ratio:16/11`.

- [ ] **Step 1: `q-porto` — Il Porto, accent `--terracotta`**

Water `--sea-mid` lower two thirds; a `--sand-deep` stone quay across the upper third with a `--shade` offset edge; a domed harbour building in `--stucco` with a `--terracotta` roof and a `--sea-deep` rose window; three moored boats (`#boat-md`, two `#boat-sm`) with mooring lines as 1px `--ink` `opacity:.4` paths; four stacked crates in `--sun` and `--olive`; two `#figure` on the quay; three `#foam-cluster` at the waterline.

- [ ] **Step 2: `q-spiaggia` — Spiaggia Lunga, accent `--sun`**

Diagonal composition: `--sea-shallow` upper left, curved `--sand` beach lower right with a `--sand-deep` shadow edge. Five umbrellas — flat half-discs alternating `--coral` and `--stucco` with 1px `--ink` poles. Two `#figure` swimming (torso only, `#foam-cluster` ring around each). Seven scattered shells: small flat discs and spirals in `--coral`, `--stucco`, `--sun`. Four `#foam-cluster` along the shore.

- [ ] **Step 3: `q-alta` — Città Alta, accent `--coral`**

Stacked hillside, no water. `--sky-pale` ground. Nine buildings from `#house-a`/`#house-b`, overlapping, ascending right, each with a `--shade` offset copy behind it so the stack reads as depth. One campanile — a narrow `--stucco` tower, `--terracotta` pyramid cap, `--sea-deep` bell arch — at the peak. Five `#cypress-tree` threaded between. Two `--olive` shrub clusters at the base.

- [ ] **Step 4: `q-scogliere` — Le Scogliere, accent `--cypress`**

`--sea-deep` water upper half. Angular rock forms in `--sand-deep` with `--shade` facets — flat polygons, three values, no gradient. A tide pool: a `--sea-shallow` ellipse inset in the rock. Flowering shrubs — `--cypress` and `--olive` masses studded with `--coral` and `--sun` dots. Two agave: radiating `--olive` blades. Two `#foam-cluster` breaking against the rock.

- [ ] **Step 5: Build the card grid**

```css
.quarters{display:grid;gap:clamp(1.25rem,2.5vw,2rem);
  grid-template-columns:1fr}
@media (min-width:640px){.quarters{grid-template-columns:repeat(2,1fr)}}
@media (min-width:1200px){.quarters{grid-template-columns:repeat(4,1fr)}}
.quarter{background:var(--stucco);border-top:5px solid var(--accent);
  box-shadow:8px 8px 0 var(--shade);overflow:hidden;
  transition:transform .35s cubic-bezier(.2,.7,.3,1),box-shadow .35s}
@media (prefers-reduced-motion:no-preference){
  .quarter:hover{transform:translateY(-6px);box-shadow:14px 14px 0 var(--shade)}
}
.quarter__art{aspect-ratio:16/11;background:var(--sky-pale)}
.quarter__body{padding:1.25rem 1.35rem 1.75rem}
.quarter h3{font-size:1.6rem;margin-block:.35rem .5rem}
.quarter .label{color:var(--accent)}
```

Section sits on `--sky-pale` to separate it from the cream `#lay` above. Each card: `<article class="quarter reveal" style="--accent:var(--terracotta)">` with art, kicker `.label`, `h3`, and body copy.

- [ ] **Step 6: Run the Verification Cycle**

Expected: four cards, four across at 1440px. Each art panel is a distinct, *busy* scene — if any reads as three shapes on a flat field, it fails spec §4.3 rule 7 and needs more scattered detail before committing. Accent colours differ per card, on both the top border and the kicker. Hovering lifts a card and offsets its shadow without blurring it.

- [ ] **Step 7: Commit**

```bash
git add demo-sites/marevento/index.html
git commit -m "feat: add Marevento four quarters with illustrated vignettes"
```

---

### Task 6: On the water

**Files:**
- Modify: `demo-sites/marevento/index.html` — add a `.divider` instance, then `<section id="water">` after `#quarters`

**Interfaces:**
- Consumes: symbols from Task 2; `.divider` from Task 4; copy from `BUSINESS_INFO.md`.
- Produces: `.band-dark`, `.water-items`.

This is the page's only dark section — it exists for rhythm, breaking a long run of light sections.

- [ ] **Step 1: Build `panorama-water`**

Full-bleed SVG, `viewBox="0 0 1440 340"`, `slice`, absolutely positioned as the section background. `--sea-deep` ground. Three wave bands in `--sea-mid` at descending opacity with curved top edges. Eleven boats at genuinely varied scale — four `#boat-sm` near the horizon, five `#boat-md` mid, two `#boat-lg` foreground — each in a `.boat-drift` group with its own `--i`. Twelve `#foam-cluster` scattered, denser toward the foreground.

- [ ] **Step 2: Build the section**

`<section id="water" class="band-dark" aria-labelledby="water-h">`, `position:relative`, `isolation:isolate`, `color:var(--stucco)`, `padding-block:clamp(5rem,11vw,10rem)`. Content sits above the panorama at `position:relative;z-index:1`.

A translucent scrim behind the text only — `background:linear-gradient(180deg,transparent,rgba(23,59,82,.45) 22%,rgba(23,59,82,.45) 78%,transparent)` — so body text clears WCAG AA against the busy illustration. Verified in Step 4.

Three `.water-item` in a three-column grid (single column under 900px): `.label` kicker in `--sea-foam`, `h3` in `--stucco`, body at `opacity:.92`.

- [ ] **Step 3: Run the Verification Cycle**

Expected: a deep-blue full-bleed band, visually the heaviest moment on the page, boats scattered across it at varied scale, three columns of light text sitting legibly on top.

- [ ] **Step 4: Check contrast on the dark band**

```
browser_evaluate: (() => { const e = document.querySelector('#water .water-item p'); const s = getComputedStyle(e); return {color: s.color, bg: getComputedStyle(document.querySelector('#water')).backgroundColor}; })()
```
Expected: near-cream text (`--stucco`, `rgb(251,243,228)`). Confirm against the screenshot that text is comfortably readable everywhere across the band, including where it crosses a light sail. If any line is hard to read, deepen the scrim before committing.

- [ ] **Step 5: Commit**

```bash
git add demo-sites/marevento/index.html
git commit -m "feat: add Marevento on-the-water band with boat panorama"
```

---

### Task 7: The table and the bed

**Files:**
- Modify: `demo-sites/marevento/index.html` — add `<section id="table-bed">` after `#water`

**Interfaces:**
- Consumes: symbols from Task 2; copy and prices from `BUSINESS_INFO.md`.
- Produces: `.menu`, `.menu__row`, `.stays`, `.stay`.

- [ ] **Step 1: Build `table-scene`**

`viewBox="0 0 360 200"`. A terrace: `--sand-deep` tiled floor, a round `--stucco` table with a `--shade` offset ellipse beneath, two plates, a `--sea-shallow` carafe, two glasses, a small `--coral` flower in a pot, and a striped awning above in `--coral` and `--stucco`. Two chairs in `--ink` at `opacity:.5`.

- [ ] **Step 2: Build `stay-scene`**

`viewBox="0 0 360 200"`. Three buildings at ascending scale left to right — a small `#house-a`, a taller `#house-b`, and a wide villa (custom: long `--stucco` body, `--terracotta` roof, arched loggia of five `--sea-deep` arches). Three `#cypress-tree` between them, a `--sand-deep` ground band, and each building given a `--shade` offset copy.

- [ ] **Step 3: Build the layout**

Two columns from 900px, single column below, on `--stucco`.

Left — **The table**: four `.menu__row`s, each a `display:grid;grid-template-columns:1fr auto` with the name and one-liner left, price right, joined by a dotted leader:

```css
.menu__row{display:grid;grid-template-columns:1fr auto;gap:.75rem;
  align-items:baseline;padding-block:1rem;border-bottom:1px dotted var(--sand-deep)}
.menu__row .price{font-family:var(--display);font-size:1.15rem;color:var(--terracotta)}
```

Right — **The bed**: three `.stay` entries ascending in price, each with `.label` kicker, `h3`, one line, and a price. The third (cliff villa) is marked with a `--coral` left border to give the column a visual climax.

Both columns get their scene above them at `aspect-ratio:9/5`.

- [ ] **Step 4: Run the Verification Cycle**

Expected: two columns, each headed by its own illustrated scene. Dotted leaders connect dish names to prices. Prices in terracotta Bodoni.

- [ ] **Step 5: Commit**

```bash
git add demo-sites/marevento/index.html
git commit -m "feat: add Marevento table and bed section"
```

---

### Task 8: The year in colour

**Files:**
- Modify: `demo-sites/marevento/index.html` — add a `.divider` instance, then `<section id="year">` after `#table-bed`

**Interfaces:**
- Consumes: the twelve month notes and hex hues from `BUSINESS_INFO.md`; `.divider` from Task 4.
- Produces: `.year-band`, `.month`.

- [ ] **Step 1: Build the band**

Twelve `.month` cells in a row. Each carries its hue inline as `style="--hue:#RRGGBB"` from `BUSINESS_INFO.md` and renders as a tall block of that colour with the month name in `.label` beneath and its two-to-four-word note under that. The hue sequence must run cold blue in January, warm through spring, bleach to gold in August, rust through autumn, and return to cold blue in December — a visible arc across the strip, not twelve arbitrary colours.

```css
.year-band{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(96px,1fr);
  gap:2px;overflow-x:auto;overscroll-behavior-x:contain;
  scroll-snap-type:x proximity;padding-bottom:.5rem}
.month{scroll-snap-align:start;min-width:96px}
.month__swatch{height:clamp(120px,18vw,220px);background:var(--hue)}
.month__name{margin-top:.75rem}
.month__note{font-size:.85rem;opacity:.75;line-height:1.4}
@media (min-width:900px){.year-band{overflow-x:visible}}
```

The band lives inside its own `overflow-x:auto` container so it scrolls independently — the page body must not scroll horizontally, which the Verification Cycle's step 4 checks.

- [ ] **Step 2: Add a scroll affordance under 900px**

A `.label` reading `SWIPE →` above the band, `display:none` from 900px. Without it the horizontal scroll is invisible on a phone.

- [ ] **Step 3: Run the Verification Cycle, then re-run resized to 375px**

Expected at 1440px: twelve colour blocks filling the width, hue arcing cold → gold → rust → cold. At 375px: the band scrolls horizontally on its own, `SWIPE →` is visible, and `document.documentElement.scrollWidth <= clientWidth` is still `true`.

- [ ] **Step 4: Commit**

```bash
git add demo-sites/marevento/index.html
git commit -m "feat: add Marevento year-in-colour band"
```

---

### Task 9: Footer

**Files:**
- Modify: `demo-sites/marevento/index.html` — add `<footer>` after `</main>`

**Interfaces:**
- Consumes: symbols from Task 2; closing note and disclosure sentence from `BUSINESS_INFO.md`.
- Produces: `.footer-waves`.

- [ ] **Step 1: Build `footer-waves`**

Full-bleed SVG, `viewBox="0 0 1440 220"`, `slice`. Three overlapping wave bands — `--sea-shallow`, `--sea-mid`, `--sea-deep` — with curved tops. One lone `#boat-md` in a `.boat-drift` group. Six `#foam-cluster`.

- [ ] **Step 2: Build the footer**

On `--sea-deep`, `color:var(--stucco)`. The closing note in Bodoni at `clamp(1.75rem,4vw,3rem)`, centred, `max-width:20ch`. Beneath it a `.label` repeat of the coordinates. Then, at `font-size:.8rem;opacity:.7`, the fiction disclosure sentence from `BUSINESS_INFO.md` — it must be plainly legible, not hidden. The waves sit at the very bottom.

- [ ] **Step 3: Run the Verification Cycle**

Expected: a deep-blue footer closing the page, large centred Bodoni note, visible disclosure line, waves at the base with one boat.

- [ ] **Step 4: Commit**

```bash
git add demo-sites/marevento/index.html
git commit -m "feat: add Marevento footer with waves and fiction disclosure"
```

---

### Task 10: Motion

**Files:**
- Modify: `demo-sites/marevento/index.html` — extend `<style>`, add `<script>` before `</body>`

**Interfaces:**
- Consumes: `.cloud-drift-a`, `.cloud-drift-b` (Task 3); `.boat-drift` and its `--i` (Tasks 3, 6, 9); `.foam` (Task 2); `.reveal` (Task 1).
- Produces: nothing downstream.

- [ ] **Step 1: Add the ambient keyframes**

```css
@media (prefers-reduced-motion:no-preference){
  .cloud-drift-a{animation:drift 90s linear infinite}
  .cloud-drift-b{animation:drift 140s linear infinite}
  @keyframes drift{from{transform:translateX(-8%)}to{transform:translateX(8%)}}

  .boat-drift{animation:bob 9s ease-in-out infinite alternate;
    animation-delay:calc(var(--i,0) * -1.3s);transform-origin:center bottom}
  @keyframes bob{from{transform:translate(-6px,0) rotate(-1.5deg)}
                 to{transform:translate(6px,-2px) rotate(1.5deg)}}

  .foam{animation:shimmer 7s ease-in-out infinite alternate}
  @keyframes shimmer{from{opacity:.45}to{opacity:.8}}
}
```

`drift` uses `translateX` in percent so it scales with viewport rather than drifting a fixed distance.

- [ ] **Step 2: Add scroll parallax with a graceful fallback**

Preferred path — CSS scroll-driven animation, no JS:

```css
@media (prefers-reduced-motion:no-preference){
  @supports (animation-timeline:view()){
    .hero__frame{animation:para linear;animation-timeline:view();animation-range:entry 0% exit 100%}
    @keyframes para{from{transform:rotate(-1.6deg) translateY(-28px)}
                    to{transform:rotate(-1.6deg) translateY(28px)}}
  }
}
```

The `rotate(-1.6deg)` is repeated in both keyframes because a `transform` keyframe replaces the element's base transform wholesale — dropping it would snap the frame straight mid-scroll.

Fallback for browsers without `animation-timeline`, in the `<script>`:

```html
<script>
(function(){
  var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mq.matches) return;

  // Reveal on scroll
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {rootMargin:'0px 0px -12% 0px', threshold:0.08});
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
  }

  // Parallax fallback only where scroll-driven animation is unsupported
  if (CSS.supports('animation-timeline:view()')) return;
  var frame = document.querySelector('.hero__frame');
  if (!frame) return;
  var ticking = false;
  function update(){
    var y = window.scrollY;
    if (y < window.innerHeight * 1.5) {
      frame.style.transform = 'rotate(-1.6deg) translateY(' + (y * 0.08 - 28) + 'px)';
    }
    ticking = false;
  }
  window.addEventListener('scroll', function(){
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, {passive:true});
  update();
})();
</script>
```

The reveal observer runs regardless of parallax support; only the parallax half is gated behind `CSS.supports`. The `else` branch matters — without it, a browser lacking `IntersectionObserver` leaves every `.reveal` section permanently invisible.

- [ ] **Step 3: Run the Verification Cycle, then check motion**

Expected: clouds drift slowly, boats bob out of sync, foam pulses, sections fade up as they enter, the hero frame shifts against the scroll.

```
browser_evaluate: document.querySelectorAll('.reveal:not(.in)').length
```
Run after scrolling to the bottom. Expected: `0` — every reveal section has fired.

- [ ] **Step 4: Verify reduced motion**

```
browser_resize 1440x900, then emulate prefers-reduced-motion: reduce, then browser_navigate PAGE (fresh load), then browser_take_screenshot
```
Expected: all content visible and correctly positioned on first paint, nothing hidden, nothing moving. This is the check that `.reveal`'s reduced-motion override works — the failure mode is a blank page, and it is silent without this step.

- [ ] **Step 5: Commit**

```bash
git add demo-sites/marevento/index.html
git commit -m "feat: add Marevento ambient motion, scroll parallax and reveals"
```

---

### Task 11: Responsive, accessibility and final verification

**Files:**
- Modify: `demo-sites/marevento/index.html` — refinements across the style block

**Interfaces:**
- Consumes: everything.
- Produces: the finished artifact.

- [ ] **Step 1: Screenshot at all three widths**

Resize and screenshot at 375×812, 768×1024, and 1440×900. At each, confirm: no horizontal body scroll; no text overlapping illustration; the hero frame never exceeds 380px wide; quarter cards are 1-up / 2-up / 4-up respectively; the seasons band scrolls independently at 375px.

```
browser_evaluate: document.documentElement.scrollWidth <= document.documentElement.clientWidth
```
Expected `true` at each of the three widths. Fix any overflow at its source — a too-wide SVG or an unclamped `min-width` — rather than by adding `overflow:hidden` to a parent, which hides the symptom.

- [ ] **Step 2: Check heading order and landmarks**

```
browser_evaluate: JSON.stringify([...document.querySelectorAll('h1,h2,h3')].map(h => h.tagName + ':' + h.textContent.trim().slice(0,28)))
```
Expected: exactly one `H1` ("Marevento"), first in the list; no `H3` appearing before the first `H2`; no skipped levels.

```
browser_evaluate: JSON.stringify({main: document.querySelectorAll('main').length, header: document.querySelectorAll('header').length, footer: document.querySelectorAll('footer').length, unlabelled: [...document.querySelectorAll('section')].filter(s => !s.getAttribute('aria-labelledby')).length})
```
Expected: `{"main":1,"header":1,"footer":1,"unlabelled":0}`.

- [ ] **Step 3: Check decorative SVG is hidden from assistive tech**

```
browser_evaluate: [...document.querySelectorAll('main svg, footer svg, body > svg')].filter(s => s.getAttribute('aria-hidden') !== 'true').length
```
Expected: `0`.

- [ ] **Step 4: Check keyboard focus is visible**

Press `Tab` several times from the top of the page. Every focusable element must show the 2px `--coral` outline. Confirm nothing anywhere sets `outline:none` without a replacement:

```bash
grep -n "outline:\s*none\|outline:\s*0" demo-sites/marevento/index.html
```
Expected: no output.

- [ ] **Step 5: Confirm no blurred shadows survived**

```bash
grep -n "feGaussianBlur\|filter:\s*blur\|drop-shadow" demo-sites/marevento/index.html
```
Expected: no output. This is spec §4.3 rule 4, and it is the single easiest rule to violate by habit.

- [ ] **Step 6: Confirm no stray colour literals**

```bash
grep -c "#[0-9A-Fa-f]\{6\}" demo-sites/marevento/index.html
```
Expected: **28** — 15 palette tokens + 12 month `--hue` values + 1 `theme-color` meta tag. Those are
the only legitimate homes for raw hex; everything else must use `var(--token)`. A count is used
rather than a filtered grep because the `:root` block legitimately contains fifteen hex values and
no simple filter separates them from a leak. A higher number means raw hex reached a rule or an SVG
fill — locate it with `grep -n "#[0-9A-Fa-f]\{6\}" demo-sites/marevento/index.html` and convert it.

Three-digit `#fff` does not match this pattern and is exempt: pure white is the correct literal for
foam and cloud bodies, which are not palette colours.

- [ ] **Step 7: Final console check and commit**

```
browser_navigate PAGE, then browser_console_messages
```
Expected: zero errors, zero failed requests.

```bash
git add demo-sites/marevento/index.html
git commit -m "style: harden Marevento responsive behaviour and accessibility"
```

---

## Spec Coverage Check

| Spec section | Covered by |
|---|---|
| §1 fiction disclosure, no JSON-LD | Task 1 Step 1, Task 9 Step 2, Global Constraints |
| §2 non-goals (no build, no libs, one page) | Global Constraints; enforced by Task 1's file structure |
| §3 deliverables | Task 1 Steps 1–2 |
| §4.1 palette | Task 1 Step 2; audited in Task 11 Step 6 |
| §4.2 typography | Task 1 Steps 2, 4 |
| §4.3 SVG style rules | Task 2; audited in Task 5 Step 6 and Task 11 Step 5 |
| §4.4 all 13 scenes | sky-clouds + water-bands (T3), coast-divider (T4), 4 quarters (T5), panorama-water (T6), table-scene + stay-scene (T7), seasons-band (T8), footer-waves (T9); boats as symbols (T2) |
| §4.5 motion | Task 10 |
| §5 page structure, all 7 sections | Tasks 3, 4, 5, 6, 7, 8, 9 |
| §6 responsive | Task 8 Step 3, Task 11 Step 1 |
| §7 accessibility | Task 1 Step 2 (focus ring), Task 10 Step 4 (reduced motion), Task 11 Steps 2–4 |
| §8 SEO | Task 1 Step 2 |
| §9 verification | Verification Cycle + Task 11 |
| §10 risks | Symbol library built first (T2); style audited per-task, not deferred |
