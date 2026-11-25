# Affordable Plastering: Apple-level redesign

Status: approved · 25 November 2026

## Intent

The site has just been migrated to Next.js with the original ChatGPT design
reproduced pixel for pixel (see `docs/verification.md`). Our sales team will
pitch it to the business owner, Dominic, most likely on a phone in his hand.
The design has to feel premium on first sight: calm, confident, crafted, local.
The bar is an Apple product page: big confident type, generous space, precise
alignment, few colours, soft depth, subtle motion, nothing out of place.

Visitors are homeowners near Hudson, NH. What they should do: **call Dominic**
(primary) or **prepare notes in the planner, then call** (secondary).

## Goals

- A re-imagined layout (chosen over "refine in place") that keeps every fact,
  every piece of copy, and every feature.
- Mobile-first: designed at 360–430 px first, then 768, 1024, 1280, 1440+.
- Cross-browser: current Safari (macOS + iOS), Chrome, Edge, Firefox; older
  engines get a working, plainer page (progressive enhancement).
- Accessibility: WCAG 2.2 AA, Lighthouse accessibility 100, every target
  ≥ 44 × 44 px, full keyboard use, reduced motion respected.
- Speed: Lighthouse mobile performance ≥ 95 and LCP ≤ 2.5 s on the local
  HTTP/2 build (the original measured 93–100 / 1.4–2.1 s there; we must not be
  worse), smaller page weight than today.

## Non-goals

- New copy, new sections, or new claims. Copy may move, be split or be
  re-ordered, but not be rewritten (exceptions listed under Content).
- Real form submission, booking, analytics, CMS. The planner stays local-only.
- Dark mode (possible later; tokens make it cheap).
- New photography. We keep the three AI-generated images.

## Anti-goals (a failure even if it "works")

- Anything that makes the AI photos read as real Affordable Plastering jobs:
  the "illustrative" labels must stay visible and legible.
- Invented facts (hours, prices, reviews, years, licences, warranties).
- Content that is invisible without JavaScript or in an unsupported browser.
- Motion that is decorative noise, ignores reduced motion, or delays reading.
- Slower than the current site, or layout shift on load.

## Constraints

- Next.js 16 static export (`output: "export"`), App Router, React 19; plain
  CSS (no Tailwind); no new runtime dependencies.
- Keep: business facts in `src/config/site.ts`, copy in `src/content/`,
  `SmartLink`, the `SiteUiProvider` dialog/menu model, the planner logic in
  `src/lib/planner-notes.ts`, SEO/metadata, robots/sitemap, CI, `vercel.json`.
- Keep native `<dialog>`, `<details>`, WAI-ARIA tabs, the planner's local-only
  behaviour and its exact downloaded-notes text.

## Approaches considered

**Styling.** (1) Hand-written CSS with design tokens, rebuilt mobile-first
(**chosen**: no new dependencies, matches the codebase, predictable across
browsers). (2) Tailwind v4: faster iteration, but rewrites all markup and adds a
toolchain the repo doesn't use. (3) CSS Modules: scoping we don't need on a
one-page design system.

**Fonts.** (1) Inter (variable, `wght` + `opsz`) + Instrument Serif italic via
`next/font/google`, self-hosted at build (**chosen**: closest open match to SF
Pro; consistent on every platform; WOFF2 subsets replace ~430 KB of TTF).
(2) System font stack: real SF Pro on Apple devices and zero download, but
Android/Windows would look different. (3) Keep Open Sans + Georgia: no visual
upgrade.

**Images.** (1) Pre-generated responsive WebP sizes + a custom `next/image`
loader (**chosen**: phones download a ~480–768 px image, not 1536 px).
(2) Single original images: simplest, keeps the slow mobile load.

**Layout direction.** "Re-imagine" (**chosen by the team**) over "refine in
place".

## Design system

### Colour tokens (light only; `color-scheme: light`)

| Token             | Value     | Use                                               |
| ----------------- | --------- | ------------------------------------------------- |
| `--ink`           | `#1d211e` | Primary text (16.3:1 on white)                    |
| `--ink-2`         | `#5a5f57` | Secondary text (6.5:1 white, 6.0:1 `--surface-2`) |
| `--surface`       | `#ffffff` | Page                                              |
| `--surface-2`     | `#f5f5f2` | Alternate sections, cards                         |
| `--line`          | `#e3e4de` | Hairlines                                         |
| `--copper`        | `#a84c2d` | Brand accent, primary buttons, links (5.6:1)      |
| `--copper-strong` | `#8f3f24` | Button hover/pressed; contact card background     |
| `--copper-soft`   | `#f2c4ac` | Accent text on `--copper-strong` (4.6:1)          |
| `--night`         | `#171b18` | Dark band (approach), lightbox                    |
| `--night-ink-2`   | `#b8bdb3` | Secondary text on night (9.1:1)                   |
| `--night-accent`  | `#e8a07f` | Accent on night (8.1:1)                           |

Every text/background pair used must reach 4.5:1 (3:1 for ≥ 24 px or ≥ 19 px
bold). `--copper-bright` (`#bb613e`, 4.3:1) is only allowed at display sizes.

### Typography

- Sans: Inter variable (`--font-sans`), weights 400–700, `opsz` axis on.
  Serif accent: Instrument Serif italic (`--font-serif`), used only for the
  `<em>` accent words in headings and the footer tagline (as today).
- Fluid scale (rem at 16 px root):
  - Display (h1): `clamp(2.75rem, 1.6rem + 5.6vw, 6rem)`, weight 650,
    tracking −0.045em, line-height 1.02.
  - Section title (h2): `clamp(2.125rem, 1.4rem + 3.4vw, 4rem)`, weight 650,
    tracking −0.035em, line-height 1.06.
  - Title (h3): `clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem)`, weight 600.
  - Lead: `clamp(1.125rem, 1rem + 0.5vw, 1.375rem)`, line-height 1.5.
  - Body: 1.0625rem (17 px), line-height 1.55. Small: 0.875rem. Eyebrow:
    0.8125rem, weight 600, tracking 0.08em, uppercase.
- Headings use `text-wrap: balance`; paragraphs `text-wrap: pretty`
  (progressive).
- Form controls are 16 px or larger (no iOS zoom on focus).

### Space, shape, depth, motion

- Spacing tokens on a 4 px base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Section padding: `clamp(4.5rem, 3rem + 7vw, 9rem)` block.
- Page gutter: `clamp(1.25rem, 0.6rem + 3vw, 3.5rem)`; content max 1200 px;
  wide (images) max 1440 px.
- Radii: 12 px (inputs, chips), 20 px (cards), 28 px (large photos, sheets),
  999 px (pills).
- Shadows: one soft card shadow, one raised (sheets/dialogs); no hard edges.
- Motion: 200–400 ms, `cubic-bezier(0.2, 0.8, 0.2, 1)`. Scroll-reveal uses
  CSS scroll-driven animations inside `@supports (animation-timeline: view())`
  and `prefers-reduced-motion: no-preference`. No JavaScript reveal, so content
  is never hidden. Dialog/sheet open animations use `@starting-style` where
  supported; elsewhere they just appear.

### Breakpoints (mobile-first, `min-width`)

`40em` (640) · `48em` (768) · `64em` (1024) · `80em` (1280) · `90em` (1440).

## Page design (top to bottom)

Text sketches show the phone layout; desktop notes follow each.

### Header (all pages)

```
┌──────────────────────────────┐
│ ▲ AFFORDABLE           ☎   ≡ │  56 px, sticky, frosted
└──────────────────────────────┘
```

- Sticky, translucent white with `backdrop-filter: saturate(180%) blur(20px)`
  (with `-webkit-` prefix); solid white fallback via `@supports`. A hairline
  border appears once the page is scrolled (CSS scroll-driven, progressive;
  otherwise always on).
- Phone: brand, call icon button (44 px), menu button. The menu opens a
  full-width panel under the header with large (28 px) links and the call
  link; same behaviour as today (Escape, link click and resize close it).
- ≥ 1024: brand left, centred nav, pill "Call (603) 718-4173" right; no menu.
- The old topline bar is removed; its copy moves: "GOOD WORK. DOWN TO THE
  FINISH." becomes the approach band's eyebrow line, and "Hudson, New
  Hampshire" sits in the hero eyebrow.

### Hero

```
 PLASTERING & DRYWALL · HUDSON, NH
 Good walls.
 Great spaces.          ← "spaces." serif italic, copper
 A fresh start for your walls…
 ( Let’s talk about your project )   Explore our services →
 (D.) A local business. A direct conversation.
      Talk with Dominic, owner.
 ╭────────────────────────────╮
 │ THE BEAUTY IS IN THE FINISH│  photo, 4:5 on phone
 │                            │
 │ From the surface up.       │
 │ Made to feel like home.    │
 │          Illustrative finish concept ▢
 ╰────────────────────────────╯
```

- Centred text block on every size (max 880 px), photo below, rounded 28 px,
  4:5 on phone, 16:10 at 768+, 21:9 at 1280+ (wide container).
- Eyebrow merges "PLASTERING & DRYWALL SPECIALISTS" and the location:
  "Plastering & drywall specialists · Hudson, New Hampshire".
- The photo label stays as a legible frosted chip.

### Highlights

The four highlights become a 2 × 2 grid of soft chips on phone and a single
row of four at 1024+. Icons sit in 40 px tinted circles.

### Services (tabs)

```
 WHAT WE CAN HELP WITH
 Every great room starts
 with a good surface.
 From a wall that needs…
 ‹(Plastering & skim coats)(Drywall installation)(Wall…›  scrolls sideways
 ╭────────────────────────────╮
 │ photo 16:10                │
 │ CRAFT IN THE DETAILS       │
 ├────────────────────────────┤
 │ A smooth, fresh canvas…    │  teaser (small)
 │ A finish you can feel…     │  title
 │ Explore plastering and…    │
 │ Discuss your plastering →  │
 ╰────────────────────────────╯
 Not sure what your walls need? Start a conversation.
```

- A horizontal segmented control (pill tabs), scroll-snapping on phone and
  centred on wider screens; the active tab is filled ink with white text.
- WAI-ARIA tabs with `aria-orientation="horizontal"`: Left/Right arrows (Up/Down
  also accepted), Home/End, automatic activation; the active tab scrolls into
  view.
- The "Not sure…" line moves out of the tablist (fixes the current
  accessibility error).
- ≥ 1024: one card, photo left (55%), details right.

### Approach (dark band)

`--night` background, full bleed. Phone: eyebrow "GOOD WORK. DOWN TO THE
FINISH.", then "A PERSONAL APPROACH" label, title, both paragraphs, the three
values as a check list, light pill "Talk with Dominic" (tel link), photo with
28 px radius and the caption "CARE. CRAFT. A CLEAN FINISH." under it. ≥ 1024:
two columns, photo left.

### Inspiration (gallery)

- Phone: horizontal scroll-snap carousel, cards 85% wide, with a visible next
  card edge. 768+: two-column asymmetric grid as today.
- Each card is a button opening the lightbox. Its accessible name contains
  its visible text ("View larger image: The everyday, elevated. Smooth walls &
  clean lines"), which fixes the label/name mismatch; the card image uses an
  empty alt because the dialog image keeps the descriptive alt.
- The illustrative note stays under the gallery.

### Process

Three cards (20 px radius, `--surface-2`) numbered 01–03 with the existing
icons and copy; stacked on phone, three columns at 1024+. "Plan your project"
pill below the heading.

### FAQ

Centred column (max 760 px). `<details>` rows with a +/− icon that rotates,
44 px+ rows, smooth open where `::details-content` + `interpolate-size` are
supported, instant elsewhere. The "Before we begin." heading and "Give Dominic
a call." link sit above the list on phone, left of it at 1024+.

### Contact

A rounded `--copper-strong` card on a white page (instead of a full copper
band): eyebrow, title, both lines of copy, very large tap-to-call number
(white), light pill "Get your project details ready". Beside it (≥ 1024) or
below (phone): a white details card with Business / Your contact / Based at
and "View location on Google Maps".

### Footer

Brand + serif tagline, nav links, call link; bottom row: ©year, "Hudson, NH ·
Illustrative imagery", Privacy. Phone: stacked, with bottom padding that
clears the action bar.

### Mobile action bar (< 1024)

A floating frosted bar with two pills: "Call Dominic" (outline) and "Plan your
project" (copper), 12 px from the edges, respecting
`env(safe-area-inset-bottom)` (needs `viewport-fit=cover`).

### Dialogs

- Planner and privacy: bottom sheet on phone (full width, 28 px top radius,
  max 92dvh with a `vh` fallback, internal scroll) and centred modal (max
  640 px) at 768+. Frosted dark backdrop. Inputs are 52 px tall with a 12 px
  radius, a clear copper focus ring, and a custom select chevron. Behaviour
  is unchanged: focus, validation, summary, Edit, Download, Escape, backdrop.
- Gallery: full-screen dark lightbox on phone, centred large on desktop;
  image `object-fit: contain`; title and the "Illustrative finish concept…"
  line beneath.
- Body scroll is locked while a dialog is open (as today, via
  `body.modal-open`).

### 404 page

Uses the same header, display type and pill buttons.

## Content changes (exhaustive)

1. Topline copy moves (header section above); the topline bar is removed.
2. The hero eyebrow becomes "Plastering & drywall specialists · Hudson, New
   Hampshire" (two supplied phrases joined).
3. Gallery card accessible names change as described; card image alt becomes
   empty (the dialog image keeps its alt).
4. No other copy changes. All photo labels and the footer's "Illustrative
   imagery" stay.

## Technical design

- **Fonts:** `src/app/fonts.ts` exports `inter` (`Inter`, latin, `axes:
['opsz']`, `variable: '--font-inter'`) and `instrumentSerif`
  (`Instrument_Serif`, weight 400, style italic, latin, `variable:
'--font-instrument'`). Tokens: `--font-sans: var(--font-inter),
system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`;
  `--font-serif: var(--font-instrument), Georgia, "Times New Roman", serif`.
  Remove the Open Sans files and licence from the repo.
- **Images:** originals move to `assets-src/images/` (committed).
  `scripts/generate-images.mjs` uses `sharp` (new devDependency) to write
  `public/images/<name>-<w>.webp` for w ∈ {480, 768, 1080, 1536} (quality 72;
  1536 is the original size). The generated files are committed, and the
  script is run manually when photos change. `src/lib/image-loader.ts`
  (custom loader) maps `{ src: "/images/<name>.webp", width }` to the smallest
  generated width ≥ `width` (largest if none). `next.config.ts`:
  `images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts",
deviceSizes: [480, 768, 1080, 1536], imageSizes: [] }`. Every `<Image>` gets
  an accurate `sizes`. `src/content/images.ts` exports `{ src, width, height,
alt }` records instead of static imports. The OG image uses the 1536 file.
- **Viewport:** `viewport` export adds `viewportFit: "cover"`.
- **CSS architecture:** `src/styles/globals.css` declares
  `@layer reset, tokens, base, layout, components, sections, utilities;` and
  imports partials into their layers. The old order-sensitive partials and
  `overrides.css` are replaced. All rules are mobile-first (`min-width`).
- **Components:** keep the existing component tree and client/server split;
  restructure markup where the design needs it. New small client pieces are
  allowed only for behaviour: tab scroll-into-view, and possibly the header's
  "scrolled" hairline if the CSS-only version proves unreliable.
- **Browser support floor:** Safari 15.4+ (cascade layers, `<dialog>`), Chrome
  and Edge 111+, Firefox 111+. Newer features (scroll-driven animations,
  `@starting-style`, `::details-content`, `text-wrap`) are enhancements behind
  `@supports` or naturally ignored.

## Verification plan

- `npm run check`, `npm run build`, `npm audit`, CI green.
- **Behaviour:** adapt the Phase 4 Playwright scripts to the new markup and
  run them in Chromium (Chrome), Firefox and WebKit (Safari engine; Playwright
  builds downloaded to the scratchpad), at 390 and 1280 px.
- **Visual review:** full-page screenshots at 320, 390, 768, 1024, 1280 and
  1600 px in all three engines; check for overflow (no horizontal scroll),
  clipped text and tap targets under 44 px with an automated check.
- **Lighthouse 13** (mobile, 3 runs) on the local HTTP/2 build: performance
  ≥ 95, accessibility 100, best practices 100; compare with the migration
  numbers.
- **Reduced motion and no-JS:** all content visible and usable; the planner,
  tabs, menu and dialogs need JavaScript, as today.
- `docs/verification.md` gains a "Redesign" section; the migration section
  stays as history.

## Primary action (decided by the team)

**Call first.** On every size the call action leads:

- Hero: a filled copper pill "Call (603) 718-4173" (tel link) first, then
  "Let’s talk about your project" (opens the planner) as a secondary pill,
  then the "Explore our services" text link.
- Mobile action bar: "Call Dominic" is the filled copper pill; "Plan your
  project" is the outline pill.
- Elsewhere the existing buttons keep their actions; their visual weight
  follows this order (call > planner).

## Decisions after builder review (our calls)

- **Test scripts:** the Phase 4 Playwright scripts live in the session
  scratchpad, not the repo. They are adapted there for the new markup and
  stay throwaway; results go into `docs/verification.md`. A committed
  end-to-end suite (and CI browser installs) is a recommended follow-up, not
  part of this work. "CI green" keeps its current meaning.
- **Real devices:** Playwright WebKit on Windows cannot reproduce iOS toolbar
  resizing, safe-area insets, or scroll lock behind dialogs. We don't claim
  "tested on iPhone". The README and the sales doc get a five-minute
  real-iPhone checklist (action bar clear of the home indicator, sheet height
  with the toolbar shown/hidden, frosted header, no background scroll behind
  dialogs, tap-to-call) to run before any pitch.
- **Lighthouse method:** a local HTTP/2 + TLS + Brotli Node server (the
  scratchpad `h2serve.mjs`), Lighthouse 13.6, default mobile settings
  (simulated throttling), 3 runs; targets apply to the **median**; every run is
  reported. Page weight = Lighthouse "total byte weight". Baselines recorded
  in `docs/verification.md`: original site 93–100 performance, LCP 1.4–2.1 s,
  443 KiB; migrated build 94–96, LCP 1.9–2.9 s, 572 KiB. Levers if the median
  misses: drop Inter's `opsz` axis, lower phone hero quality, no font preload.
  The live site is re-measured once deployed.
- **Delivery:** one pass (phone layout first, then larger sizes, then
  verification). Deployment stays with the team; note that Vercel preview
  URLs require a Vercel login by default, while the production
  `*.vercel.app` URL is public, so share the production URL with the owner.

## Left to the builder

Exact component markup, file split of CSS partials, icon tweaks (stroke width
may become 1.75), micro-interaction details (hover lift, press scale),
precise breakpoint tuning, and whether the header hairline is CSS-only.

## Amendment (26 November 2026): 3D hero

Requested by the team during implementation ("add a 3D container in the hero
… don't make it empty"). It replaces the centred hero with a fuller first
screen:

- Desktop (64em+): two columns. Copy on the left (left-aligned), a CSS 3D
  stage on the right that fills the first screen.
- The stage: the hero photo as a card tilted in perspective, with two solid
  "glass" cards floating in front of it at different depths: the existing
  kicker "THE BEAUTY IS IN THE FINISH", and a decorative stack of wall layers
  (Smooth finish, Skim coat, Joint finishing, Drywall; terms already used in
  the service copy, `aria-hidden`).
- Motion: the cards fade in on load; on devices with a fine pointer the scene
  tilts towards the pointer. With reduced motion the scene is static.
- Phones: the same stage under the copy (4:5 photo).
- No backdrop blur anywhere except the dialog backdrop: Lighthouse showed blur
  to be the largest main-thread cost, and blur flattens 3D in Safari.
