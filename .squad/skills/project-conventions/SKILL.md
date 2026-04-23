---
name: "project-conventions"
description: "Core conventions and patterns for this codebase"
domain: "project-conventions"
confidence: "medium"
source: "template"
---

## Context

Astro 6 static portfolio site deployed on Netlify. Node 22 / pnpm. Terminal-inspired design with dark/light theme duality.

## Patterns

### Build & check commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start local dev server |
| `pnpm check` | Full validation: markdownlint + astro check + eslint + prettier |
| `pnpm fix` | Auto-fix lint/format issues |
| `pnpm test:e2e` | End-to-end Playwright suite |
| `pnpm test:seo` | Focused SEO Playwright suite |

Always run `pnpm check` after edits. A clean exit is the definition of "done".

### Theme system

- Theme attribute lives on `<html data-theme="light|dark">`.
- Set by the inline script in `src/layouts/Layout.astro` — do not duplicate theme logic elsewhere.
- CSS selectors swap variants: `html[data-theme='light'] .foo { … }`.
- Hero images use two `<img>` elements (`.home-hero__img--dark` / `.home-hero__img--light`) toggled purely by CSS — no JS swap.

### Image assets

- All public images live in `public/img/`.
- Preferred format: **WebP** at quality 85 for photos/illustrations; PNG for diagrams with hard edges.
- Dark hero: `public/img/hero.webp` | Light hero: `public/img/hero-light.webp`.
- Aspect ratio for hero images: **4:5**.
- Source PNGs (`.png`) may be kept alongside their WebP counterparts as originals; delete when no longer needed.

### Scripts (`scripts/`)

One-off or reusable Node utility scripts live in `scripts/`. They are `.mjs` ESM files that import directly from installed dev-dependencies.

#### `remove-watermark.mjs` — strip a corner logo and convert to WebP

Samples the background colour just outside the patch boundary, paints over the watermark region, and converts the image. Useful whenever an AI-generated image carries a provider badge.

Only use it for images the team owns or is explicitly authorized to modify. Do not use it to remove attribution, branding, or provenance from assets you are not permitted to alter.

```sh
# Basic: remove 320×160 px badge from bottom-right, output WebP, delete source
node scripts/remove-watermark.mjs <src.png> <dst.webp>

# Custom patch size (bigger badge)
node scripts/remove-watermark.mjs src.png out.webp --patch-w 400 --patch-h 200

# Different quality or output format
node scripts/remove-watermark.mjs src.png out.avif --quality 80

# Keep the source file after conversion
node scripts/remove-watermark.mjs src.png out.webp --keep

# Full help
node scripts/remove-watermark.mjs --help
```

The script rejects identical source and destination paths before writing or deleting anything.

**Available options:**

| Option | Default | Description |
|--------|---------|-------------|
| `--patch-w N` | 320 | Width of fill patch in pixels |
| `--patch-h N` | 160 | Height of fill patch in pixels |
| `--quality N` | 85 | Lossy output quality (1–100) |
| `--keep` | false | Keep source file after conversion |

Output format is inferred automatically from the destination file extension (`.webp`, `.avif`, `.png`, `.jpg`, …).

`sharp` must be installed (`pnpm add -D sharp` — already present in this repo).

### Error Handling

Scripts use top-level `await` and let Sharp / Node throw naturally. No silent swallowing — let the process exit non-zero on failure.

### Code Style

- ESLint + Prettier enforced via `pnpm check` / `pnpm fix`.
- `.mjs` for scripts; `.astro` for pages/components; `.ts` for utilities.
- No barrel files — import directly from the source module.

### File Structure

```
src/pages/       Astro file-based routes
src/layouts/     Shared layout shells (Layout.astro, BlogPostLayout.astro, ToolLayout.astro)
src/components/  Reusable Astro components
src/styles/      global.css (resets, base) + themes.css (CSS custom properties per theme)
src/utils/       TypeScript utility modules (seo.ts, content.ts)
public/img/      Static image assets
scripts/         One-off Node utility scripts (.mjs)
docs/            Product docs, design proposals, decisions
tests/e2e/       Playwright specs + fixtures
```

## Anti-Patterns

- **Don't inline theme logic outside Layout.astro** — the theme lifecycle script is sensitive; duplicate logic will cause flash-of-wrong-theme.
- **Don't add page-level `<meta>` tags** — extend `src/components/SEO.astro` and `src/utils/seo.ts` instead.
- **Don't add global CSS to individual `.astro` component `<style>` blocks** — shared tokens/resets belong in `src/styles/`.
- **Don't hard-code values in scripts** — parameterize via `parseArgs` so scripts are reusable.
