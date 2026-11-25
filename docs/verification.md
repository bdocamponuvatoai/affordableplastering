# Migration verification

How the Next.js site was checked against the original static site (a single
`index.html` + `styles.css` + `app.js`, generated with ChatGPT) before the
original files were removed.

- **Date:** 25 November 2026
- **Baseline:** a byte-for-byte copy of the original folder, served from its
  `dist/` directory.
- **Candidate:** `npm run build` output (`out/`), Next.js 16.4.6, React 19.3.1.
- **Browser:** Google Chrome 158.0.8127.37 (system install), headless, driven by
  `playwright-core` 1.65.1; reduced motion; device scale factor 1.
- **Server:** the same tiny Node static server (directory `index.html`, `404.html`
  fallback) for both sites.

## Results at a glance

| Check                                                  | Result                                                                   |
| ------------------------------------------------------ | ------------------------------------------------------------------------ |
| `npm run build`, `npm run check` (types, lint, format) | Pass                                                                     |
| Full-page pixel diff, 6 widths × 3 runs                | **0 differing pixels** in all 18 comparisons (threshold 0)               |
| Same with a query string (`/?service=drywall`)         | 0 differing pixels at all 6 widths                                       |
| Computed styles, 367 elements + `::before`/`::after`   | 0 unexplained differences at all 6 widths                                |
| DOM text nodes                                         | Identical (no split or merged text runs)                                 |
| Behaviour scripts (10 scenarios)                       | 9 identical; 1 intentional difference (below)                            |
| Interactive-state screenshots (14)                     | 0 differing pixels each                                                  |
| HTTP 4xx while testing                                 | None, except the deliberately requested missing URLs (404 page)          |
| Console errors / hydration warnings                    | None, except Chrome's "Failed to load resource: 404" for those same URLs |

Widths: 1600, 1280, 1024, 768, 390 and 320 px.

## Pixel parity

Each page was loaded, lazy images were switched to eager, every image was
`decode()`d, `document.fonts.ready` awaited, then a full-page screenshot was
taken. A capture is accepted only when two consecutive screenshots of the same
page are byte-identical.

Two early runs showed small differences (6 pixels at 768 px; then ~60,000
pixels inside one photo at 1280/320 px, every delta ≤ 7/255). Repeating the
same site against itself showed these were capture artefacts: Chrome
re-rasterising a downscaled photo at a different filter quality. They were
fixed in the capture (stable-screenshot rule, `--disable-gpu`,
`--disable-checker-imaging`, `--force-color-profile=srgb`), not waived. After
the fix, three consecutive full runs were 0 pixels everywhere.

## Computed-style parity

For every element in `<body>` (in document order) and its `::before`/`::after`,
all computed properties were compared, including hidden content (closed
dialogs, inactive tab text, closed menu). Differences that remain, all
explained and invisible:

- **Font family name:** `"Open Sans"` → `openSans, "openSans Fallback"` (same
  font files via `next/font/local`; the fallback is a metric-adjusted Arial used
  only while the font loads). Custom-property text (`--serif`, `--sans`) is
  re-serialised by the minifier.
- **`<img>` `color: transparent`:** added by `next/image` (hides alt text while
  loading); images do not paint text colour.
- **`background-position: 0% 0%` → `0px 0px`:** the CSS minifier writes
  `background: none` as `background: 0 0`; no background image is set.
- **Gallery dialog image `aspect-ratio: auto 1536/1024`:** `next/image` adds
  `width`/`height`; `height: auto` keeps the natural 3:2 ratio. The open-dialog
  screenshots match pixel for pixel.

## Behaviour parity

The same Playwright script ran on both sites and the JSON outcomes were
compared field by field:

- **Service tabs:** click each tab; arrow keys (with wrap-around), Home, End;
  `aria-selected`, `tabindex`, `aria-labelledby`, panel copy, image and alt,
  focus. Identical.
- **FAQ:** open/close every item. Identical.
- **Project planner:** open (focus on close button, `body.modal-open`), empty
  submit (native validation focuses _Project location_), fill and submit
  (summary rows, focus moves to "Your project notes"), download (identical
  filename and file contents), _Edit details_ keeps every value, close returns
  focus to the opener, Escape and backdrop close, a plain _Plan_ button keeps the
  summary, the service-panel button presets the service and shows the form.
  Identical.
- **Gallery:** both cards at 1280 and 390 px: title, image, alt, image box,
  focus return after Escape. Identical.
- **Privacy dialog:** text, backdrop close, focus return; footer year. Identical.
- **Hash links:** nav, hero, footer brand: URL hash, final scroll position,
  history length, the next Tab target (the browser's focus starting point),
  Back. Identical.
- **Skip link:** identical.
- **Mobile menu (390 px):** open/close state, labels, link click closes and
  scrolls, resize to desktop closes, the mobile _Plan_ bar closes the menu and
  opens the planner. Identical except the intentional difference below.

**Intentional difference:** pressing Escape while keyboard focus is inside the
open mobile menu. The original hid the menu and left focus on a now-hidden link;
the new site returns focus to the menu button (WAI-ARIA disclosure pattern).
Escape from anywhere else behaves as before.

## Navigation (Next.js only)

- `/missing-page/` returns HTTP 404 with the styled not-found page
  (`noindex`, title "Page not found | Affordable Plastering").
- Its _Back to the home page_ link navigates client-side: a `window` marker and
  text typed into the planner survive the navigation; title and robots tags
  update.
- Header hash links work from the 404 page (`/#inspiration` loads the home page
  at that section).
- Back/forward restore the right URL, title and content.
- All prefetch requests (`__next.*.txt`) returned 200. On Windows this needs
  `scripts/fix-export-segments.mjs`, which ran after every build.

## `<head>` comparison (home page)

| Tag                         | Original                       | Next.js                                             |
| --------------------------- | ------------------------------ | --------------------------------------------------- |
| charset, viewport           | ✓                              | ✓ (same values)                                     |
| `theme-color`               | `#222722`                      | `#222722`                                           |
| `<title>`                   | ✓                              | identical                                           |
| `description`               | ✓                              | identical                                           |
| `og:title/description/type` | ✓                              | identical                                           |
| `og:image`                  | ChatGPT preview-host URL       | absolute URL on `SITE_URL`, plus width, height, alt |
| `og:url`, `og:site_name`    | –                              | added                                               |
| `twitter:*`                 | –                              | added by Next.js from the Open Graph data           |
| `robots`                    | – (robots.txt blocked all)     | `noindex, nofollow` unless `SITE_INDEXABLE=true`    |
| `canonical`                 | –                              | absolute URL on `SITE_URL`                          |
| icon                        | `/assets/favicon.svg`          | `/icon.svg` (same file)                             |
| hero image preload          | `<link rel=preload as=image>`  | same, with `fetchpriority=high`                     |
| font preload                | – (fonts found via CSS)        | both Open Sans files preloaded by `next/font`       |
| stylesheet / script         | `/styles.css`, `/app.js` defer | hashed CSS file; Next.js runtime chunks (async)     |
| JSON-LD                     | in `<head>`                    | at the end of `<main>`; same data plus `url`        |

## Other intentional differences

- Header, mobile-menu and footer-logo links are `/#section` instead of
  `#section`, so they also work from the 404 page. On the home page they are
  still native in-page jumps (verified above).
- IDs and `data-*` attributes that only the old script used were dropped (no CSS
  depends on them). IDs used by ARIA, anchors and the icon sprite are kept.
- The footer year is pre-rendered at build time and refreshed in the browser,
  as before.

## After cleanup (wording change and file removal)

Our team chose to remove the "concept" wording and keep every photo label
(the photos are AI-generated):

- Footer: "Hudson, NH · Website concept · Illustrative imagery" →
  "Hudson, NH · Illustrative imagery".
- Privacy dialog: "This website concept does not submit…" → "This website does
  not submit…".

No element was removed, so no CSS or spacing changed. The original files
(`dist/`, `.openai/`, `ASSETS.md`) were deleted after verification.

Re-run on the cleaned build:

| Check                                                   | Result                                                                                           |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `npm run build`, `npm run check`, `npm audit`           | Pass; 0 vulnerabilities (production and dev dependencies)                                        |
| Pixel diff vs the original with the same two text edits | 0 differing pixels at all 6 widths                                                               |
| Computed styles + DOM text nodes vs that baseline       | 0 unexplained differences; identical text nodes                                                  |
| Behaviour scripts + 14 state screenshots                | Same as before (9 identical, 1 intentional; 0 pixels each)                                       |
| Pixel diff vs the untouched original                    | Every differing pixel is inside the footer's bottom line, at every width; page heights unchanged |
