# Clean Slate Refactor — Decision Record

**Date:** 2026-04-20  
**Branch:** `refactor/start-over`  
**Status:** Implemented

---

## Summary

Full content and design teardown of the portfolio. CV/trajectory data is preserved. A new content architecture replaces the old Tools section with a unified Projects section. The design system is a separate workstream (Stitch or Tailwind TBD); this refactor installs neutral placeholder styling.

---

## 1. Navigation & Routes

**New nav:** Home · Blog · Projects · About

| Route | Page | Notes |
|---|---|---|
| `/` | Home | Hero + featured content |
| `/blog` | Blog index | Articles only |
| `/blog/[slug]` | Blog post | With series block |
| `/projects` | Projects index | Tools + repos + experiments |
| `/projects/[slug]` | Project detail | Optional interactive island |
| `/about` | About | Static, driven by `cv.ts` |

**Removed routes:** `/tools`, `/tools/[slug]`  
**No redirects** from old `/tools/*` URLs.

---

## 2. Content Collections

### 2.1 Blog collection (`src/content/blog/`)

**Schema:**

```ts
title: z.string()
date: z.date()
tags: z.array(z.string())
excerpt: z.string()
readTime: z.number()
draft: z.boolean().default(false)
featured: z.boolean().default(false)
coverImage: z.string().optional()
projectSlug: z.string().optional()        // cross-reference to a project
series: z.object({                        // optional — only if part of a series
  name: z.string(),
  part: z.number()
}).optional()
seriesSummary: z.string().optional()      // only on part 1 of a series
seriesLinks: z.array(z.object({           // all parts, ordered — present on every post in series
  part: z.number(),
  title: z.string(),
  slug: z.string()
})).optional()
```

**Content at launch:** Empty (3 placeholder posts deleted).

**Series behavior:**

- Every post in a series carries the full `seriesLinks` array (all parts, ordered).
- `seriesSummary` only appears on `part: 1`. The layout pulls it from the part-1 post and renders it at the top of every sibling post.
- No separate series collection.

**Featured behavior:**

- `featured: true` entries appear on the home page "Latest writing" section.
- Sorted by `date` descending. Maximum 3 shown on home.

### 2.2 Projects collection (`src/content/projects/`)

Replaces the old `src/content/tools/` directory entirely.

**Schema:**

```ts
title: z.string()
description: z.string()
tags: z.array(z.string())
type: z.enum(['tool', 'repo', 'experiment'])
publishedAt: z.date()
draft: z.boolean().default(false)
featured: z.boolean().default(false)
status: z.enum(['active', 'archived', 'wip']).optional()
externalUrl: z.string().url().optional()   // GitHub, live demo, etc.
hasInteractivePage: z.boolean().default(false)  // true = /projects/[slug] renders island slot
framework: z.string().optional()           // for tools/experiments
coverImage: z.string().optional()
```

**Content at launch:** One migrated entry — UUID/ULID generator (see §4).

**Card rendering by type:**

- `tool` — shows framework badge
- `repo` — shows external link icon (links to `externalUrl`)
- `experiment` — open/flexible treatment

**Featured behavior:**

- `featured: true` entries appear on the home page "Latest projects" section.
- Sorted by `publishedAt` descending. Maximum 3 shown on home.

---

## 3. Home Page Structure

Three sections, in order:

1. **Hero** — Name, title, tagline ("Never stop learning."), 2–3 sentence expanded motto.
2. **Latest writing** — Up to 3 `featured: true` blog posts, sorted by `date` descending.
3. **Latest projects** — Up to 3 `featured: true` projects, sorted by `publishedAt` descending.

No quick-nav cards (nav handles discovery).

---

## 4. Migrated Content

### UUID/ULID Generator

**Old path:** `src/content/tools/uuid-ulid-generator.md`  
**New path:** `src/content/projects/uuid-ulid-generator.md`

**New frontmatter:**

```yaml
title: "UUID / ULID Generator"
description: "Generate UUID v4 or ULID values in the browser with copy-friendly output and a lightweight interface."
tags: ["UUID", "ULID", "Utility"]
type: "tool"
publishedAt: 2026-03-17
draft: false
featured: true
status: "active"
hasInteractivePage: true
framework: "React island"
```

The React island implementation file (`src/pages/tools/[slug].astro` → `src/pages/projects/[slug].astro`) keeps its interactive slot.

---

## 5. About Page

- **Route:** `/about` (unchanged)
- **Data source:** `src/utils/cv.ts` — `canonicalCv` export (unchanged)
- **`aboutViewModel` deleted** from `cv.ts` — all signal IDs, node metaphors, arc labels, and terminal-flavored data fields removed
- Page reads directly from `canonicalCv`: basics, work history, skills, education, publications, external profiles
- Static Astro page, no content collection

---

## 6. Design System

**Approach:** Neutral placeholder tokens installed now. Real design system (Google Stitch export or Tailwind design system skill) applied as a separate workstream.

**Placeholder spec:**

- Background: white / near-black
- Text: system font stack (`system-ui, sans-serif`)
- No decorative elements (no grain, no orbits, no wires, no nodes)
- Simple borders and neutral grays for structure
- Light/dark mode: CSS custom properties on `data-theme`, same mechanism as current (preserved from `Layout.astro`)
- All current tokens in `src/styles/themes.css` replaced with neutral values
- All decorative classes removed from `src/styles/global.css`
- Fonts: Exo 2 and Azeret Mono removed; system font stack used

**Preserved from current implementation:**

- Theme toggle localStorage logic (`Layout.astro` inline script)
- `data-theme` / `data-theme-mode` / `data-theme-ready` attribute mechanism
- `window.__portfolioTheme` public API
- `prefers-color-scheme` fallback
- `prefers-reduced-motion` respect

---

## 7. Files to Delete

| File/Directory | Reason |
|---|---|
| `src/content/blog/*.md` (all 3 posts) | Placeholder content, not real articles |
| `src/content/tools/` (entire directory) | Replaced by `src/content/projects/` |
| `src/pages/tools.astro` | Replaced by `src/pages/projects/index.astro` |
| `src/pages/tools/[slug].astro` | Replaced by `src/pages/projects/[slug].astro` |
| `src/layouts/ToolLayout.astro` | Replaced by `src/layouts/ProjectLayout.astro` |

---

## 8. Files to Update

| File | Change |
|---|---|
| `src/content.config.ts` | New blog schema (series/featured/projectSlug fields), new projects collection replacing tools |
| `src/utils/cv.ts` | Delete `aboutViewModel`; keep `canonicalCv` intact |
| `src/utils/content.ts` | Update helpers for new collections (projects instead of tools) |
| `src/styles/themes.css` | Replace all tokens with neutral placeholder values |
| `src/styles/global.css` | Remove decorative classes (grain, orbit, wire, node, signal-stage); keep structural resets and layout utilities |
| `src/layouts/Layout.astro` | Remove signal-stage backdrop and decorative markup; keep theme lifecycle script |
| `src/layouts/BlogPostLayout.astro` | Add series block (renders `seriesLinks` + `seriesSummary` at top of post) |
| `src/components/layout/Header.astro` | Replace "Tools" nav link with "Projects" |
| `src/components/layout/Footer.astro` | Replace "Tools" route link with "Projects" |
| `src/pages/index.astro` | New home: Hero + "Latest writing" + "Latest projects" sections |
| `src/pages/about.astro` | Rebuild from `canonicalCv` directly, remove `aboutViewModel` references |
| `src/pages/blog/index.astro` | Remove signal-graph design language; keep filter/listing logic |
| `src/pages/blog/[slug].astro` | Add series block rendering |
| `tests/e2e/fixtures/routes.ts` | Replace tools entries with projects entries; update blog entries |
| `tests/e2e/smoke.spec.ts` | Update nav assertions (Tools → Projects); update content assertions |
| `tests/e2e/seo.spec.ts` | Update expected titles/descriptions for renamed routes |
| `docs/PRD.md` | Update to reflect new structure |

---

## 9. Files to Create

| File | Purpose |
|---|---|
| `src/content/projects/uuid-ulid-generator.md` | Migrated UUID/ULID tool with new frontmatter |
| `src/pages/projects/index.astro` | Projects index page |
| `src/pages/projects/[slug].astro` | Project detail page with optional island slot |
| `src/layouts/ProjectLayout.astro` | Project detail layout (replaces ToolLayout) |

---

## 10. What Does NOT Change

- `src/utils/cv.ts` — `canonicalCv` data (all work history, skills, education, publications)
- `src/utils/seo.ts` — SEO utility functions
- `src/components/SEO.astro` — SEO component
- `src/components/blog/AuthorBlock.astro` — structure kept, visual treatment updated by design system
- `src/components/ui/Card.astro` — structure kept, visual treatment updated by design system
- `src/layouts/Layout.astro` theme lifecycle script (inline JS block)
- Test infrastructure (`playwright.config.ts`, test runner config)
- `astro.config.mjs` — no changes needed
- `tsconfig.json` — no changes needed
- Netlify deployment config

---

## 11. Open Items (deferred)

| # | Item | Notes |
|---|---|---|
| 1 | Design system choice | Google Stitch export vs. Tailwind design system skill — separate workstream |
| 2 | About page CV download | PDF export — still open from original PRD |
| 3 | Blog tag filtering | Keep existing mechanism, update for new design when design system lands |
| 4 | RSS feed | Post-launch backlog |
| 5 | Blog search | Post-launch backlog (Pagefind) |
| 6 | OG image generation | Post-launch backlog (Satori) |
