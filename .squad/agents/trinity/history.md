# Trinity — History

## Core Context

- **Project:** A personal portfolio website that presents your professional and personal positioning using the PRD as the implementation blueprint.
- **Role:** Frontend Developer
- **Joined:** 2026-03-20T09:12:55.527Z

## Learnings

<!-- Append learnings below -->
- Theme chooser trigger width can be reduced safely by removing trigger-only badge copy in `ThemeToggle.astro` while keeping the richer `theme-option-meta` labels inside the dropdown menu and leaving the chooser semantics untouched.
- Shared-shell copy cleanups in Proposal 7 land best when the edit removes internal-status language from the live UI, keeps the graph framing through neutral rail labels, and trims stale shell wording instead of reopening structure or tokens.
- Home and about redesigns can move decisively into Proposal 7 without touching shared helpers when the pages keep their existing headings, data sources, and route contracts, then shift the metaphor through page-local graph panels, metrics, and module framing.
- Archive pages can adopt Proposal 7 most effectively when the route keeps semantic list and filter behavior intact, and the graph/module metaphor lives in surrounding panels, trace lines, and metrics rather than replacing headings or links with ornamental chrome.
- Proposal 7 lands cleanly in this codebase when the graph metaphor stays in the shared shell and token layer: structural rails, node-and-wire field cues, and control-surface chrome can shift the site identity without touching route content or the theme lifecycle API.
- Tag helper output should preserve the first trimmed display form of each blog tag, dedupe by a lowercase normalized key, and sort with an explicit case-insensitive comparison so filter chips stay stable even when content authors vary casing or whitespace.
- Featured homepage cards should resolve directly to the selected blog and tool detail routes via shared href helpers, while tag aggregation needs case-insensitive dedupe so the blog filter chips mirror the tag-matching behavior without splitting display variants.
- A stacked desktop nav is not sufficient for the mobile-navigation story; the small-screen shell needs a dedicated toggle, drawer state, and touch-sized targets that still behave cleanly at 320px.
- System-first theme handling is most reliable when the resolved theme is applied in the head before paint and the UI reads from a shared theme controller rather than duplicating localStorage logic.
- Reusable motion work is easier to keep subtle when entrance, hover, and page transitions share the same timing scale and all collapse to static presentation under reduced motion.
- Theme persistence fixes in Astro should treat `astro:page-load` as a re-entry point; syncing stored state there avoids header-navigation regressions without changing the public theme controller contract.
- An explicit Light, Dark, and System chooser should keep `window.__portfolioTheme` as the only public theme API and continue using `null` as the stored representation of system mode.
- Mobile header fixes are more stable when the component owns its breakpoint layout and uses an explicit top-row wrapper for brand plus controls, leaving only container chrome in global styles.
- Desktop header alignment is more stable as a three-column layout with left brand, centered nav, and right-aligned actions instead of relying on flex spacing around a growing middle nav.
- Desktop header stability in Astro improves when the brand, primary nav, and actions stay in one explicit wrapper grid instead of depending on `display: contents`, which can render as stacked rows in practice.
- Story 2.1 is safest when content collections land before any page wiring; seeding minimal Markdown entries early gives later UI stories stable schema targets without forcing premature template changes.
- Story 2.3 lands cleanly when the post page owns metadata framing and author chrome in a shared layout while leaving prose and code treatment to stable hooks like `.blog-post-layout` and `.blog-post-body` for shared CSS follow-up.
- When shared prose hooks land after a first-pass detail layout, dual-hooking the existing blog selectors with `.post-shell`, `.post-header`, `.post-meta`, `.post-tag-list`, and `.post-body` preserves smoke coverage while handing typography and code-block behavior back to global CSS.
- Tool detail pages stay easier to evolve when they reuse the same `.post-shell` contract as blog posts and reserve the interactive surface as an explicit slot instead of coupling the shared layout to a specific island implementation.
- Proposal 7 shell adoption lands cleanly when the signal-graph shift stays in shared tokens, chrome, and control surfaces, leaving Astro routing, content contracts, and the public theme lifecycle API untouched.
- Query-string archive filters on a static Astro route need client-side state sync from `window.location`; rendering the full archive with data attributes and then reconciling chips, summaries, and hidden cards is more reliable than depending on prerender-time `Astro.url.searchParams`.
- Proposal 7 continuation no longer blocks on port `4331`; the shared risk has moved to stale smoke expectations, so route-local follow-up work should validate with `pnpm check`, focused smoke for the touched slice, and `pnpm test:seo` until the shared smoke file is repaired.
- Continuation planning now points at remaining route-local gaps instead of more shared-shell work; the two surfaced candidates are `/about` completeness and home/tools UX cleanup, so the next implementation pass should claim one explicitly before coding.
- The home/tools cleanup slice is now the active route-local continuation pass in the worktree, but it still needs reviewer and QA closure before the team should pivot to `/about`.
- The home featured-content strip can finish its Proposal 7 migration without touching `src/components/ui/Card.astro`; replacing it with page-local signal modules in `src/pages/index.astro` keeps the data flow intact and avoids reopening the shared component layer.
- The tools archive sidebar copy must stay honest about shipped detail-page work; once tool detail pages share the migrated connected-module language, `src/pages/tools.astro` should describe the archive as the registry view rather than an archive-only interim slice.
- For the current Proposal 7 cleanup passes, the practical validation set is `pnpm check` plus a focused `pnpm test:e2e` grep on the touched route behavior, because the broader smoke file still contains separate shared-shell debt outside the slice.
- The smallest clean way to remove the header's extra brand copy is to delete the `brand-kicker` and `brand-meta` nodes in `src/components/layout/Header.astro`; the existing `.brand` grid collapses cleanly to the logo without requiring spacing or token changes.
- When a route-local graph panel duplicates the same labels already listed below it, the clean fix is to remove the decorative field markup and its page-scoped selectors entirely while keeping the header and legend structure intact.
