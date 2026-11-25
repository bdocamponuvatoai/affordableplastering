# Affordable Plastering

Website for **Affordable Plastering**, a plastering and drywall contractor at
2 Shingle Mill Rd, Hudson, NH 03051. It's a one-page Next.js site exported as
plain static files: services, approach, inspiration gallery, process, FAQ,
contact, and a local-only project planner.

> **Status:** preview. Search engines are blocked (`noindex`, `robots.txt`
> disallows everything) until the owner approves launch. See
> [Before launch](#before-launch).

## Getting started

Requires Node.js 20.9 or later (CI uses the version in `.nvmrc`).

```bash
npm ci
npm run dev        # http://localhost:3000
```

To check the production output locally:

```bash
npm run build      # writes the static site to out/
npm run preview    # serves out/ at http://localhost:3000
```

## Scripts

| Script                 | What it does                                                               |
| ---------------------- | -------------------------------------------------------------------------- |
| `npm run dev`          | Development server with hot reload                                         |
| `npm run build`        | Static export to `out/`, then `postbuild` (below)                          |
| `postbuild`            | `scripts/fix-export-segments.mjs`: fixes a Windows-only Next.js export bug |
| `npm run preview`      | Serves `out/` with `npx serve@14` (not a project dependency)               |
| `npm run lint`         | ESLint (Next.js core-web-vitals + TypeScript rules)                        |
| `npm run typecheck`    | Generates route types, then `tsc --noEmit`                                 |
| `npm run format`       | Prettier, write                                                            |
| `npm run format:check` | Prettier, check only                                                       |
| `npm run check`        | `typecheck` + `lint` + `format:check` (what CI runs before building)       |

## Project structure

```
src/
  app/                 Routes and metadata files
    layout.tsx         <html>, fonts, page chrome, dialogs, site-wide metadata
    page.tsx           Home page (/)
    not-found.tsx      Styled 404 page
    fonts.ts           Open Sans via next/font/local
    icon.svg           Favicon
    robots.ts          robots.txt (blocks everything until indexing is enabled)
    sitemap.ts         sitemap.xml, built from src/content/pages.ts
  components/
    layout/            Topline, header + mobile menu, footer, mobile action bar,
                       SiteUiProvider (menu + dialog state shared by the page)
    home/              Home page sections (hero, services tabs, gallery, FAQ...)
    sections/          Pieces shared between sections (SectionHeading)
    dialogs/           Native <dialog>s: project planner, gallery, privacy
    ui/                Icon + SVG sprite, SmartLink, Brand
    seo/               JSON-LD structured data
  config/
    site.ts            Business facts and navigation (safe in client code)
    deployment.ts      SITE_URL / SITE_INDEXABLE (server only)
  content/             Page copy: services, FAQ, gallery, lists, image alt text
  lib/                 Framework-free helpers (metadata, planner notes)
  styles/              globals.css imports ordered partials (base, layout,
                       components, sections, pages, overrides)
  assets/              Images and fonts (imported, so they get hashed URLs)
scripts/               Build helpers
docs/verification.md   How the migration was verified
```

## Conventions

- **Server Components by default.** Client components only for real
  interactivity: the mobile menu, service tabs, dialogs and their buttons, and
  the footer year.
- **Business facts live in `src/config/site.ts`.** Phone number, address and
  map link are read from there everywhere they appear. Never add hours, prices,
  reviews, licences, years in business or warranties unless the owner supplies
  them.
- **Copy lives in `src/content/`** where it is list-like (services, FAQ,
  gallery); one-off headings stay in their section component.
- **Links:** use `SmartLink`. Route paths (`/about/`) use `next/link`; hash links
  (`#id`, `/#id`) stay plain anchors so the browser does native in-page
  scrolling and focus handling; `tel:`, `mailto:` and external links are plain
  anchors.
- **CSS order matters.** `src/styles/globals.css` imports the partials in the
  order their rules appeared in the original stylesheet; keep `overrides.css`
  last. Class names match the original design. Use the tokens in
  `base/tokens.css`, and `var(--sans)` / `var(--serif)` for fonts.
- **Text in JSX:** where literal text sits next to a value, render one string
  (``{`Call ${phone}`}``) instead of `Call {phone}`. React would otherwise
  create separate text nodes, which can shift text rendering slightly.
- **Images:** `next/image` with static imports. Only the hero image loads
  eagerly (`loading="eager" fetchPriority="high"`).

## Routes

| Path           | What                                                            |
| -------------- | --------------------------------------------------------------- |
| `/`            | Home page                                                       |
| any other path | 404 page (`404.html`), `noindex`                                |
| `/robots.txt`  | Disallow all, or allow all + sitemap when `SITE_INDEXABLE=true` |
| `/sitemap.xml` | Every path in `src/content/pages.ts`                            |
| `/icon.svg`    | Favicon                                                         |

URLs end in a slash (`trailingSlash: true`), so pages export as
`path/index.html` and work on any static host.

## Configuration

Set these in `.env.local` locally (see `.env.example`), or in Vercel → Project
Settings → Environment Variables. They are read at **build time**.

| Variable         | Default                                                                          | Purpose                                                                                          |
| ---------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `SITE_URL`       | `https://$VERCEL_PROJECT_PRODUCTION_URL` on Vercel, else `http://localhost:3000` | Origin for canonical URLs, Open Graph image, sitemap and robots. No trailing slash.              |
| `SITE_INDEXABLE` | `false`                                                                          | `true` lets search engines index the site. The build fails if `true` while the URL is localhost. |

## Images and fonts

- The three photographs in `src/assets/images/` are **AI-generated
  illustrations** (created 25 November 2026). They are not photos of the owner,
  staff or completed Affordable Plastering projects, which is why the site
  labels them as illustrative and their alt text says so. Replace them with real
  project photos when available.
- The "A" brand mark and favicon are original vector artwork made for this site.
- Open Sans is self-hosted under the Apache 2.0 licence
  (`src/assets/fonts/FONT-LICENSE.txt`).

## Before launch

1. The owner confirms every business fact on the page: business name, owner
   name, phone, address and service area wording.
2. The owner reviews the service descriptions and FAQ answers (written as
   proposed marketing copy).
3. Decide on photography: replace the AI-generated images with real project
   photos, or keep them with their "illustrative" labels.
4. Add the real domain in Vercel and set `SITE_URL` to it (Production).
5. Only after the owner approves: set `SITE_INDEXABLE=true` (Production) and
   redeploy.
6. On the live domain, check `/robots.txt`, `/sitemap.xml`, the canonical tag
   and the security headers.
7. Run Lighthouse (mobile) on the live home page.
8. Submit `https://<domain>/sitemap.xml` in Google Search Console.

Keep in mind: the project planner only prepares notes in the visitor's browser
and does not send anything. The privacy text says no analytics or marketing
trackers are used, so update it if you add any.

## CI

`.github/workflows/ci.yml` runs on every push to `main` and on pull requests:
`npm ci` → `npm run check` → `npm run build`, then uploads `out/` as the `site`
artifact. Dependabot (`.github/dependabot.yml`) proposes npm updates weekly
(Next.js/React and type packages grouped) and GitHub Actions updates monthly.

## Hosting

**Vercel (recommended):** import the GitHub repo in the Vercel dashboard.
Framework preset **Next.js**. Leave the build command (`npm run build`) and
output settings at their defaults; Vercel detects `output: "export"` and serves
the static files. `vercel.json` adds security headers (nosniff,
strict-origin-when-cross-origin referrer policy, `X-Frame-Options: DENY`,
Permissions-Policy disabling camera/microphone/geolocation, and HSTS).

**Any static host:** run `npm run build` and upload `out/`. Configure the host to
serve `404.html` for unknown paths; the security headers in `vercel.json` would
need to be set in that host's own config.

**Deployment:** not deployed yet. Preview URL: _to be added after the first
Vercel deploy._

## History

This site was first generated as a single static HTML/CSS/JS page with
ChatGPT, then migrated to Next.js with the same design. The migration was
checked pixel for pixel and behaviour for behaviour against the original; see
[docs/verification.md](docs/verification.md).
