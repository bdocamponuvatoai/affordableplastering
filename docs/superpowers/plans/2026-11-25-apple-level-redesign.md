# Apple-level Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-imagine the Affordable Plastering one-page site as a mobile-first, Apple-calibre design that keeps every fact, copy line and feature, and verify it in Chromium, Firefox and WebKit.

**Architecture:** Same Next.js 16 static export, component tree and `SiteUiProvider` state model. All CSS is rewritten mobile-first in cascade layers with design tokens. Fonts switch to Inter + Instrument Serif via `next/font/google`, and images switch to pre-generated responsive WebP sizes served through a custom `next/image` loader.

**Tech Stack:** Next.js 16.4.6, React 19.3.1, TypeScript 5, plain CSS (`@layer`, `clamp()`, `@supports`), `sharp` (dev only), Node's built-in test runner, Playwright (scratchpad only) driving Chrome, Firefox and WebKit.

**Spec:** `docs/superpowers/specs/2026-11-25-apple-level-redesign-design.md`

## Global Constraints

- Static export stays: `output: "export"`, `trailingSlash: true`; no new runtime dependencies (`sharp` is a devDependency only).
- Facts stay in `src/config/site.ts`, copy in `src/content/` or the section component; copy changes are limited to the spec's "Content changes" list plus the "Primary action" hero/bar changes.
- These stay visible and legible: "Illustrative finish concept" (hero chip), the inspiration note, the gallery-dialog line, and "Hudson, NH · Illustrative imagery" (footer).
- Colour tokens are exactly: `--ink #1d211e`, `--ink-2 #5a5f57`, `--surface #ffffff`, `--surface-2 #f5f5f2`, `--line #e3e4de`, `--copper #a84c2d`, `--copper-strong #8f3f24`, `--copper-soft #f2c4ac`, `--night #171b18`, `--night-ink-2 #b8bdb3`, `--night-accent #e8a07f`. `#bb613e` is allowed only at display sizes.
- Type: h1 `clamp(2.75rem, 1.6rem + 5.6vw, 6rem)` / 650 / −0.045em / 1.02. h2 `clamp(2.125rem, 1.4rem + 3.4vw, 4rem)` / 650 / −0.035em / 1.06. h3 `clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem)` / 600. Lead `clamp(1.125rem, 1rem + 0.5vw, 1.375rem)` / 1.5. Body 1.0625rem / 1.55. Eyebrow 0.8125rem / 600 / 0.08em / uppercase.
- Spacing 4 px base (4, 8, 12, 16, 24, 32, 48, 64, 96, 128). Section block padding `clamp(4.5rem, 3rem + 7vw, 9rem)`. Gutter `clamp(1.25rem, 0.6rem + 3vw, 3.5rem)`. Content max 1200 px, wide 1440 px. Radii 12, 20, 28 and 999 px.
- Breakpoints are `min-width` only: 40em, 48em, 64em, 80em, 90em.
- Every interactive target is at least 44 × 44 px (links inside running text exempt). Form controls use a font size of at least 16 px.
- Motion: 200–400 ms, `cubic-bezier(0.2, 0.8, 0.2, 1)`. Scroll reveal goes only inside `@supports (animation-timeline: view())` and `prefers-reduced-motion: no-preference`; nothing is ever hidden without it.
- Browser floor: Safari 15.4+, Chrome/Edge 111+, Firefox 111+. Newer features sit behind `@supports` or are ignored harmlessly. `backdrop-filter` always ships with the `-webkit-` prefix plus a solid fallback.
- Call first: the call action is visually primary everywhere; planner second.
- Planner stays local-only; `buildCallNotes` output is byte-for-byte unchanged.

## Review Focus

1. **Very long unbroken planner input on a 320 px phone:** the summary wraps and the sheet never scrolls sideways (Task 8, `planner-long-input`).
2. **Landscape phone (844 × 390) with the planner open:** the sheet scrolls internally and "Prepare my call notes" can be reached and clicked (Task 8, `planner-landscape`).
3. **Keyboard user stepping through the tab scroller at 320 px:** the focused tab is scrolled fully into view (Task 5, `tabs-scroll-into-view`).
4. **JavaScript off, or a browser without scroll-driven animations (Firefox):** every section heading and paragraph renders at opacity 1 (Task 2, `reveal-fallback`; Task 9, `no-js`).
5. **Text enlarged to 200 % on a phone:** no horizontal page scroll, and the call and planner pills stay usable (Task 9, `text-zoom`).

## Verification harness (scratchpad, throwaway)

`$SCRATCH` = this session's scratchpad. Tests are Playwright scripts in `$SCRATCH/verify/redesign.mjs`, run against `out/` through the existing `lib.mjs` static server (port 47102). Usage:

```
node redesign.mjs <check> [<check>…] [--engines=chromium,firefox,webkit] [--widths=320,390,768,1024,1280,1600]
```

Each named check asserts and prints `PASS <check> <engine>@<width>` or `FAIL … <reason>`. The process exits non-zero on any failure. Engines run with `PLAYWRIGHT_BROWSERS_PATH=$SCRATCH/pw-browsers`. Chromium is the system Chrome; Firefox and WebKit are Playwright builds installed in Task 2. The `global` check (no horizontal overflow, no console errors or page errors, 44 px targets) runs as part of every task's verification from Task 2 on.

Every task ends with `npm run check && npm test && npm run build` passing, plus its checks in all three engines.

Work on branch `redesign`. Each task ends with one commit.

---

### Task 1: Responsive image pipeline

**Files:**

- Create: `scripts/generate-images.mjs`, `src/lib/image-loader.ts`, `src/lib/image-loader.test.ts`, `src/lib/planner-notes.test.ts`, `public/images/{drywall-interior,finished-interior,plastering-detail}-{480,768,1080,1536}.webp`
- Move: `src/assets/images/*.webp` → `assets-src/images/`
- Modify: `next.config.ts`, `package.json`, `.github/workflows/ci.yml`, `src/content/images.ts`, `src/content/services.ts`, `src/content/gallery.ts`, `src/lib/metadata.ts`, every `<Image>` usage (hero, service-explorer, approach-section, inspiration-section, gallery-dialog)

**Interfaces:**

- Produces: `export type SiteImage = { src: string; width: number; height: number; alt: string }`, plus `heroImage`, `approachImage` and `photo` (`{ finishedInterior, plasteringDetail, drywallInterior }`, each `{ src: "/images/<name>.webp", width: 1536, height: 1024 }`) from `src/content/images.ts`. `export const IMAGE_WIDTHS = [480, 768, 1080, 1536] as const` and `export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }): string` from `src/lib/image-loader.ts`. `Service.image` and `GalleryItem.image` become `{ src, width, height }` records.

- [ ] **Step 1: Write failing loader tests** (`src/lib/image-loader.test.ts`, `node:test` + `node:assert/strict`, relative import `./image-loader.ts`):
  - `imageLoader({ src: "/images/finished-interior.webp", width: 480 })` → `"/images/finished-interior-480.webp"`
  - width 500 → `-768`; 1080 → `-1080`; 1200 → `-1536`; 3840 → `-1536`
  - `src: "/icon.svg"`, width 640 → `"/icon.svg"` (non-`/images/*.webp` passes through)
- [ ] **Step 2: Write a test pinning the call-notes text** (`src/lib/planner-notes.test.ts`): `buildCallNotes(buildSummaryFields({ serviceLabel: "Drywall installation", location: "  Hudson  ", size: "", timing: "Within the next month", notes: "Cracked ceiling\nnear the window <b>&</b>" }), { businessName: "Affordable Plastering", ownerName: "Dominic", ownerRole: "Owner", phone: "(603) 718-4173" })` equals `"AFFORDABLE PLASTERING — PROJECT CALL NOTES\nContact: Dominic, Owner\nPhone: (603) 718-4173\n\nService: Drywall installation\n\nLocation: Hudson\n\nSize: To discuss\n\nTiming: Within the next month\n\nDetails: Cracked ceiling\nnear the window <b>&</b>\n\nPrepared locally. No service request has been submitted.\n"`. This must pass against today's code.
- [ ] **Step 3: Add `"test": "node --test \"src/lib/*.test.ts\""` to `package.json` (Node ≥ 22.18 strips TypeScript types natively; CI uses Node 26), then run `npm test`.** Expected: loader tests FAIL (module missing) and the notes test PASSES.
- [ ] **Step 4: Implement `src/lib/image-loader.ts`.** Start the file with `"use client";`. No `@/` imports (Node runs it directly). Pick the smallest `IMAGE_WIDTHS` entry ≥ `width`, else the largest. Rewrite only paths matching `^/images/[\w-]+\.webp$`.
- [ ] **Step 5: Run `npm test`.** Expected: all PASS.
- [ ] **Step 6: Add the `sharp` devDependency and write `scripts/generate-images.mjs`.** It reads `assets-src/images/*.webp` and writes `public/images/<name>-<w>.webp` for each `IMAGE_WIDTHS` entry (`resize({ width: w })`, `webp({ quality: 72 })`). For 1536, copy the original bytes unchanged. Add the script `"images": "node scripts/generate-images.mjs"`. Move the originals, then run `npm run images`. Expected: 12 files; each `-480` file is under 40 KB.
- [ ] **Step 7: Wire it up.**
  - `next.config.ts`: `images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts", deviceSizes: [480, 768, 1080, 1536], imageSizes: [] }`, removing `unoptimized`.
  - Convert the content records.
  - Every `<Image>` gets `src`/`width`/`height` from its record, plus these `sizes`:
    - hero: `"(min-width: 90em) 1440px, 100vw"`
    - service photo: `"(min-width: 64em) 660px, 100vw"`
    - approach: `"(min-width: 64em) 560px, 100vw"`
    - gallery card: `"(min-width: 48em) 50vw, 85vw"`
    - lightbox: `"100vw"`
  - `pageMetadata` OG image: `/images/finished-interior-1536.webp`, 1536 × 1024.
  - CI: add a `npm test` step after `npm run check`.
- [ ] **Step 8: Verify.** Run `npm run check && npm test && npm run build`. Then confirm `out/index.html` contains `srcSet` entries with `-480.webp 480w` and `-1536.webp 1536w`, and that every referenced `/images/` URL exists in `out/images/`. Run `node pixel.mjs`. Expected: 0 pixels at 1024 and up; any narrower-width difference only inside image boxes (resampling), recorded.
- [ ] **Step 9: Commit:** `git commit -m "Serve responsive WebP sizes through a custom image loader"`.

### Task 2: Foundation: fonts, tokens, layers, primitives, harness

**Files:**

- Create: `src/styles/{reset,tokens,base,layout}.css`, `src/styles/ui/{button,eyebrow,section-heading,chip,card,reveal,utilities}.css`
- Rewrite: `src/styles/globals.css` (layer order + imports), `src/app/fonts.ts`, `src/app/layout.tsx` (font variables, `viewport.viewportFit: "cover"`)
- Delete: `src/styles/base/`, `src/styles/components/`, `src/styles/layout/`, `src/styles/sections/`, `src/styles/pages/`, `src/styles/overrides.css`, `src/assets/fonts/`
- Test: `$SCRATCH/verify/redesign.mjs` (create)

**Interfaces:**

- Produces:
  - CSS custom properties: the colour tokens; `--font-sans`, `--font-serif`; `--space-1`…`--space-10` (4…128); `--radius-sm` 12px, `--radius-md` 20px, `--radius-lg` 28px, `--radius-pill` 999px; `--gutter`; `--content` 1200px; `--wide` 1440px; `--ease`; `--shadow-card`; `--shadow-raised`; `--header-h` (56px, 64px at 64em).
  - Layer order: `@layer reset, tokens, base, layout, components, sections, utilities;`.
  - Classes:
    - `.container` (content width) and `.container--wide`;
    - `.section`, `.section--alt` (surface-2) and `.section--night`;
    - `.btn` (pill, min-height 48px, 16px/600) with modifiers `--primary` (copper), `--secondary` (outline ink), `--light` (white on dark/copper) and `--dark` (ink);
    - `.link-arrow` (text link with trailing `→`, min 44px tall);
    - `.eyebrow`;
    - `.section-heading` (centred; `__title`, `__lead`);
    - `.chip` (12px radius label; `--frosted` variant);
    - `.card`;
    - `.reveal`;
    - `.visually-hidden`.
  - Fonts: `inter.variable` → `--font-inter`; `instrumentSerif.variable` → `--font-instrument`.
  - `SectionHeading` props become `{ eyebrow: string; title: ReactNode; lead?: ReactNode; action?: ReactNode }`.

- [ ] **Step 1: Install Playwright engines.** Run `PLAYWRIGHT_BROWSERS_PATH=$SCRATCH/pw-browsers npx playwright-core@1.65.1 install firefox webkit` from `$SCRATCH/verify`. Expected: both installed.
- [ ] **Step 2: Write the harness and the first checks.**
  - `global`: `documentElement.scrollWidth <= innerWidth`; no `console.error` or `pageerror`; every visible `a, button, summary, [role=tab], input, select, textarea` not inside `p`, `dd` or `li` text measures at least 44 × 44.
  - `foundation`:
    - body computed `font-family` contains `Inter`;
    - `h1 em` `font-family` contains `Instrument Serif`;
    - body `font-size` is `17px`;
    - `document.fonts.check('600 17px Inter')` is true after `fonts.ready`;
    - `getComputedStyle(documentElement).colorScheme === "light"`.
  - `reveal-fallback`: in Firefox and with `reducedMotion: "reduce"`, every `.reveal` element has computed `opacity` `1`.
- [ ] **Step 3: Run `node redesign.mjs foundation reveal-fallback global`.** Expected: FAIL (old fonts, no `.reveal`).
- [ ] **Step 4: Implement.**
  - Fonts: `Inter({ subsets: ["latin"], axes: ["opsz"], variable: "--font-inter", display: "swap" })` and `Instrument_Serif({ weight: "400", style: "italic", subsets: ["latin"], variable: "--font-instrument", display: "swap" })`.
  - `--font-sans: var(--font-inter), system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`; `--font-serif: var(--font-instrument), Georgia, "Times New Roman", serif`.
  - Reset, then base type from the Global Constraints (headings `text-wrap: balance`, paragraphs `text-wrap: pretty`). `:focus-visible` gets a 3px `--copper` outline with a 3px offset. `scroll-padding-top: calc(var(--header-h) + 16px)`. Smooth scrolling only under `prefers-reduced-motion: no-preference`.
  - Primitives as in the Interfaces block.
  - `.reveal` keyframes: from `opacity: 0; translate: 0 24px` to none, `animation-timeline: view()`, `animation-range: entry 0% cover 25%`, all inside the `@supports` and motion query.
  - Add `.reveal` to each section's top-level `.container` in the existing components (no other markup changes yet).
- [ ] **Step 5: Verify.** Run `node redesign.mjs foundation reveal-fallback global` (3 engines × 6 widths), then `npm run check && npm test && npm run build`. Expected: all PASS. Sections look unstyled beyond primitives (expected until Tasks 3–8).
- [ ] **Step 6: Commit:** `git commit -m "Add design tokens, cascade layers and Inter/Instrument Serif"`.

### Task 3: Chrome: header, mobile menu, footer, action bar

**Files:**

- Modify: `src/components/layout/{site-header,header-menu,site-footer,mobile-actions,footer-controls}.tsx`, `src/app/layout.tsx` (drop `<Topline />`), `src/components/home/approach-section.tsx` (add the topline line, markup only)
- Delete: `src/components/layout/topline.tsx`
- Create: `src/styles/chrome/{header,mobile-menu,footer,action-bar}.css`

**Interfaces:**

- Consumes: Task 2 primitives; `useSiteUi()` (unchanged).
- Produces: `.site-header` (sticky, `--header-h`), `.mobile-menu` (still `id="mobile-nav"`), `.action-bar`. The approach section gains `<p class="approach__kicker">GOOD WORK. DOWN TO THE FINISH.</p>` before its eyebrow.

- [ ] **Step 1: Add checks.**
  - `chrome-phone` (390):
    - header height is 56;
    - the header contains no element with text "GOOD WORK. DOWN TO THE FINISH.";
    - the page contains that text exactly once, inside `#approach`;
    - the menu toggle and header call button are each ≥ 44 × 44;
    - clicking the toggle sets `aria-expanded="true"`, shows `#mobile-nav`, and its links have computed `font-size` ≥ 24px;
    - Tab into the first link, then Escape: menu hidden and focus on the toggle;
    - reopen, resize to 1100 wide: menu closed;
    - `.action-bar` first child is `a[href="tel:+16037184173"]` with class `btn--primary` and text "Call Dominic", second is a button "Plan your project" with class `btn--secondary`;
    - the action bar's bottom ≤ `innerHeight`.
  - `chrome-desktop` (1280): `.desktop-nav` visible with 4 links, toggle hidden, header call pill text "Call (603) 718-4173", `.action-bar` `display: none`.
  - `footer`: text "Hudson, NH · Illustrative imagery" present; Privacy button opens `.privacy-dialog`; year equals the current year.
- [ ] **Step 2: Run them.** Expected: FAIL.
- [ ] **Step 3: Implement the spec's Header, Footer and Mobile action bar sections.**
  - Frosted header (`backdrop-filter`/`-webkit-backdrop-filter: saturate(180%) blur(20px)`, background `rgb(255 255 255 / 0.72)`; `@supports not` → `#fff`).
  - Hairline via `@supports (animation-timeline: scroll())`, otherwise always shown.
  - Action bar: `position: fixed`, inset 12px, `bottom: calc(12px + env(safe-area-inset-bottom))`, frosted, hidden at 64em and up.
  - Footer bottom padding clears the bar below 64em.
- [ ] **Step 4: Verify:** checks + `global` in 3 engines; `npm run check && npm test && npm run build`.
- [ ] **Step 5: Commit:** `git commit -m "Redesign header, mobile menu, footer and call-first action bar"`.

### Task 4: Hero and highlights

**Files:** Modify `src/components/home/{hero,service-strip}.tsx`, `src/content/home.ts`; create `src/styles/sections/{hero,highlights}.css`.

**Interfaces:** Consumes `PlanButton`, `site.phone`, `heroImage`, `highlights`.

- [ ] **Step 1: Add checks.**
  - `hero`:
    - eyebrow text equals "Plastering & drywall specialists · Hudson, New Hampshire" (CSS uppercases it);
    - `h1` text "Good walls.Great spaces." with `em` "spaces.";
    - `.hero__actions` children in order: `a.btn.btn--primary[href="tel:+16037184173"]` "Call (603) 718-4173", `button.btn.btn--secondary` "Let’s talk about your project" (click opens `.planner-dialog`), `a.link-arrow[href="#services"]` "Explore our services";
    - owner note text "A local business. A direct conversation." and "Talk with Dominic, owner.";
    - hero `img` has `srcset` and `sizes`;
    - chip "Illustrative finish concept" visible;
    - image aspect ratio ≈ 4:5 at 390, ≈ 16:10 at 768, ≈ 21:9 at 1280 (±0.02).
  - `highlights`: 4 items with the 4 existing labels; 2 columns at 390 (two distinct `top` values); one row at 1024 (one `top` value).
- [ ] **Step 2: Run them.** Expected: FAIL.
- [ ] **Step 3: Implement the spec's Hero and Highlights sections.** The kicker and caption move onto the image as frosted overlays; the photo chip uses `.chip--frosted`.
- [ ] **Step 4: Verify:** checks + `global` (3 engines); build/check/test.
- [ ] **Step 5: Commit:** `git commit -m "Redesign hero (call first) and highlights"`.

### Task 5: Services segmented tabs

**Files:** Modify `src/components/home/{services-section,service-explorer}.tsx`; create `src/styles/sections/services.css`.

**Interfaces:** Consumes `services`, `PlanButton` (`service` preset). Tab ids stay `tab-<key>`, and the panel id stays `service-panel`.

- [ ] **Step 1: Add checks.**
  - `tabs`:
    - `[role=tablist]` has `aria-orientation="horizontal"` and exactly 4 children, all `[role=tab]`;
    - `.services-footnote` is not inside `[role=tablist]`;
    - from the first tab, ArrowRight selects and focuses `tab-drywall`; ArrowLeft from the first selects `tab-renovation`; Home selects plaster; End selects renovation; ArrowDown and ArrowUp behave like Right and Left;
    - for each tab, the panel `h3` equals that service's `title` and the panel button text equals its `cta`;
    - clicking the panel button with `repairs` selected opens the planner with `select[name=service]` value `repairs`.
  - `tabs-scroll-into-view` (320, Review Focus 3): focus the first tab, press End; the selected tab's bounding rect lies within the tablist's bounding rect (±1 px).
- [ ] **Step 2: Run them.** Expected: FAIL.
- [ ] **Step 3: Implement the spec's Services section.**
  - Tablist is a horizontal scroll-snap row (`overflow-x: auto`, hidden scrollbar, `scroll-padding-inline: var(--gutter)`).
  - After keyboard selection, call `scrollIntoView({ block: "nearest", inline: "nearest" })` on the newly focused tab.
  - The card is a single column below 64em; at 64em and up the photo takes 55% on the left.
- [ ] **Step 4: Verify:** checks + `global` (3 engines); build/check/test.
- [ ] **Step 5: Commit:** `git commit -m "Redesign services as segmented tabs"`.

### Task 6: Approach band, gallery carousel, process cards

**Files:** Modify `src/components/home/{approach-section,inspiration-section,gallery-card,process-section}.tsx`, `src/content/gallery.ts` (drop `cardLabel` and `cardAlt`); create `src/styles/sections/{approach,gallery,process}.css`.

**Interfaces:** Consumes `galleryItems`, `processSteps`, `approachValues`, `openGallery(trigger, index)`.

- [ ] **Step 1: Add checks.**
  - `approach`:
    - `#approach` background is `rgb(23, 27, 24)`;
    - contains "GOOD WORK. DOWN TO THE FINISH.", "A PERSONAL APPROACH", the 3 values, and the caption "CARE. CRAFT. A CLEAN FINISH.";
    - `a[href="tel:+16037184173"]` text "Talk with Dominic".
  - `gallery`:
    - buttons found by accessible name `/^View larger image: The everyday, elevated\./` and `/^View larger image: A fresh foundation\./`;
    - card `img` `alt` is `""`;
    - at 390 the track's `scrollWidth > clientWidth` and the first card width is 85% (±2%) of the track;
    - at 768 the two cards sit side by side (different `left`);
    - clicking card 2 opens `.gallery-dialog` with title "A fresh foundation." and image alt "Illustrative room renovation showing newly installed drywall and taped seams";
    - the illustration note text is unchanged.
  - `process`: 3 cards; numbers "01", "02", "03"; stacked at 390 and in 3 columns at 1024; "Plan your project" opens the planner.
- [ ] **Step 2: Run them.** Expected: FAIL.
- [ ] **Step 3: Implement the three spec sections.** The gallery button's name comes from a `.visually-hidden` "View larger image: " prefix plus the visible title and kicker; no `aria-label`.
- [ ] **Step 4: Verify:** checks + `global` (3 engines); build/check/test.
- [ ] **Step 5: Commit:** `git commit -m "Redesign approach band, gallery carousel and process cards"`.

### Task 7: FAQ, contact, 404

**Files:** Modify `src/components/home/{faq-section,contact-section}.tsx`, `src/app/not-found.tsx`; create `src/styles/sections/{faq,contact,not-found}.css`.

- [ ] **Step 1: Add checks.**
  - `faq`:
    - 5 `details`, each `summary` ≥ 44 px tall;
    - clicking the first opens it, clicking again closes it;
    - the heading reads "Before we begin.";
    - the "Give Dominic a call." link is a tel link;
    - the last answer contains a tel link "(603) 718-4173".
  - `contact`:
    - contact card background `rgb(143, 63, 36)`;
    - the number link "(603) 718-4173" has font-size ≥ 32px at 390;
    - dl rows read Business / Affordable Plastering, Your contact / Dominic · Owner, and Based at / 2 Shingle Mill Rd + Hudson, NH 03051;
    - the maps link has `target="_blank"` and `rel="noopener noreferrer"`;
    - "Get your project details ready" opens the planner.
  - `not-found`: `/missing/` returns 404, `h1` "Let’s get you back home.", the button navigates client-side to `/` with title "Affordable Plastering | Plastering & Drywall in Hudson, NH".
- [ ] **Step 2: Run them.** Expected: FAIL.
- [ ] **Step 3: Implement the spec's FAQ, Contact and 404 sections.** Smooth `details` open goes under `@supports selector(::details-content)` with `interpolate-size: allow-keywords`.
- [ ] **Step 4: Verify:** checks + `global` (3 engines); build/check/test.
- [ ] **Step 5: Commit:** `git commit -m "Redesign FAQ, contact card and 404 page"`.

### Task 8: Dialogs: planner sheet, privacy sheet, lightbox

**Files:** Modify `src/components/dialogs/{modal-dialog,planner-dialog,gallery-dialog,privacy-dialog}.tsx`; create `src/styles/dialogs/{dialog,planner,lightbox}.css`.

**Interfaces:** Behaviour and props unchanged; class names `.planner-dialog`, `.gallery-dialog` and `.privacy-dialog` are kept.

- [ ] **Step 1: Add checks.**
  - `planner`:
    - at 390 the open dialog's rect has `bottom == innerHeight` (±1), `width == innerWidth`, and top-left radius 28px;
    - at 1280 width ≤ 640 and centred (±2 px);
    - every input and select is ≥ 52 px tall with font-size ≥ 16px;
    - empty submit focuses `input[name=location]`;
    - filling the Task 1 test values and submitting shows rows `[["Service","Drywall installation"],["Location","Hudson"],["Size","To discuss"],["Timing","Within the next month"],["Details","Cracked ceiling\nnear the window <b>&</b>"]]` and focuses the `h3` "Your project notes";
    - the download's filename is `affordable-plastering-project-notes.txt` and its text equals the Task 1 string;
    - Edit keeps all values;
    - while open, `body.modal-open` has computed `overflow: hidden`; after the `close` event (wait one task) the class is gone and focus is back on the opener;
    - Escape and backdrop click close it.
  - `planner-long-input` (320, Review Focus 1): notes = 300 × `"a"` and location = 100 × `"b"`; after submit `.summary-sheet.scrollWidth <= .summary-sheet.clientWidth` and the dialog's `scrollWidth <= clientWidth`.
  - `planner-landscape` (844 × 390, Review Focus 2): open, fill location, scroll the submit button into view inside the dialog, click it; the summary is shown.
  - `lightbox`: at 390 `.gallery-dialog` covers the viewport (±1); the image is `object-fit: contain`; the line "Illustrative finish concept. Not a completed Affordable Plastering project." is visible.
  - `privacy`: the three paragraphs' text is unchanged (the post-cleanup wording).
- [ ] **Step 2: Run them.** Expected: FAIL (layout assertions).
- [ ] **Step 3: Implement the spec's Dialogs section.**
  - Sheet on phone (`max-height: 92vh; max-height: 92dvh`, internal scroll) and a centred modal at 48em and up.
  - Backdrop `rgb(10 12 11 / 0.5)` with `backdrop-filter` blur (prefixed).
  - Entrance via `@starting-style` (translate-y on phone, scale 0.98 on desktop) inside the motion query.
  - Custom select chevron; summary `dd` with `overflow-wrap: anywhere`.
- [ ] **Step 4: Verify:** checks + `global` (3 engines); build/check/test.
- [ ] **Step 5: Commit:** `git commit -m "Redesign dialogs as sheets and lightbox"`.

### Task 9: Whole-site verification, docs, ship

**Files:** Modify `docs/verification.md` (new "Redesign" section; the migration sections stay as history) and `README.md` (fonts, images script, `npm test`, real-iPhone checklist, structure tree).

- [ ] **Step 1: Add and run the final checks** (3 engines × 6 widths unless noted).
  - `no-js` (Chromium, `javaScriptEnabled: false`, 390 and 1280; Review Focus 4): every `h1`, `h2` and `p` inside `main` has computed opacity 1 and a non-zero box.
  - `text-zoom` (390; Review Focus 5): set `html { font-size: 200% }`; `scrollWidth <= innerWidth`; the hero call pill and the action-bar call pill are visible and clickable.
  - `reduced-motion`: no running animations (`document.getAnimations().length === 0` after load).
  - Rerun all task checks plus `global`. Expected: all PASS.
- [ ] **Step 2: Lighthouse 13.6** via `h2serve.mjs`, mobile defaults, 3 runs. Expected medians: performance ≥ 95, accessibility 100, best practices 100, LCP ≤ 2.5 s, total byte weight < 572 KiB. If a median misses, apply the spec's levers in order, then re-run.
- [ ] **Step 3: Visual review.** Capture full-page screenshots for 6 widths × 3 engines into `$SCRATCH/redesign-shots/`. Look at every 390 and 1280 shot, and at any width where a check flagged something. Fix and re-run until nothing looks clipped, overlapping or misaligned.
- [ ] **Step 4: Write the docs.**
  - `docs/verification.md` "Redesign" section: date, engines and versions, check list with PASS counts, the Lighthouse table (all runs plus medians, against both baselines), what was not tested (real iOS/Android devices), and the intentional changes (spec "Content changes" + "Primary action").
  - README: Getting started adds `npm test` and `npm run images`; Images and fonts updated; "Before launch" gets the real-iPhone checklist from the spec.
- [ ] **Step 5: Final gate:** `npm run check && npm test && npm run build && npm audit --omit=dev`. Expected: pass, 0 vulnerabilities.
- [ ] **Step 6: Commit and ship.**
  - `git commit -m "Document redesign verification"`.
  - `git checkout main && git merge --ff-only redesign && git push origin main`.
  - Poll the Actions run until it completes. Expected: success.
