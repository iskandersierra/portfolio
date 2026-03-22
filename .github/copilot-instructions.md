# Project Guidelines

## Stack And Runtime
- This repository is an Astro 6 static site deployed via Netlify.
- Use Node 22.12.0 or newer to match the engine requirement and local tooling.
- Run commands from the repository root with `pnpm`.

## Architecture
- File-based routes live in `src/pages/` and share the site shell from `src/layouts/Layout.astro`.
- Shared layout concerns stay in `src/components/layout/`.
- SEO metadata flows through `src/components/SEO.astro` and `src/utils/seo.ts`; prefer extending that path instead of inlining page-level meta tags.
- Theme state is managed by the inline lifecycle script in `src/layouts/Layout.astro`; preserve its event and storage behavior when changing theme handling.

## Build And Test
- Install dependencies with `pnpm install`.
- Start local development with `pnpm dev`.
- Validate all checks with `pnpm check`.
- Apply autofixes with `pnpm fix`.
- Run end-to-end coverage with `pnpm test:e2e`.
- Run focused SEO coverage with `pnpm test:seo`.
- When browser interaction, screenshots, page inspection, or snapshots are needed, prefer the native VS Code browser tools when they are available in the current session; fall back to the `playwright-cli` skill when those tools are unavailable or when Playwright-specific automation is needed.
- Store any Playwright CLI-generated snapshots or captured artifacts in `.playwright-cli/`, which is gitignored in this repo.
- Prefer the package scripts above over ad hoc commands so Astro, Playwright, lint, and formatting run with the repo's expected settings.

## Conventions
- Follow the existing Astro pattern: page files compose layout/components, while component-local styles stay in each `.astro` file unless the styling is truly global.
- Use `src/styles/global.css` and `src/styles/themes.css` for shared tokens, resets, and theme variables rather than redefining shared values in components.
- Keep navigation and route changes synchronized with `tests/e2e/fixtures/routes.ts`; new or renamed primary routes should update the fixture data and any affected Playwright expectations.
- Preserve the terminal-inspired visual language and existing typography/theme tokens unless a task explicitly changes the design direction.
- Keep changes targeted. Reuse representative patterns from `src/layouts/Layout.astro`, `src/components/layout/Header.astro`, and `src/components/ui/Card.astro` before introducing new structures.
- Agents must never push git changes automatically; only run `git push` when the user explicitly requests it.

## Documentation
- Link to existing docs instead of duplicating them in code comments or new guidance.
- Product and launch context: `docs/PRD.md`, `docs/epics-and-stories.md`.
- Design direction: `docs/design/launch-design-direction.md` and the design proposals under `docs/design/`.
- Product decisions: `docs/decisions/`.
- Current feature planning/specs: `docs/superpowers/plans/` and `docs/superpowers/specs/`.
