# Trinity — History

## Core Context

- **Project:** A personal portfolio website that presents your professional and personal positioning using the PRD as the implementation blueprint.
- **Role:** Frontend Developer
- **Joined:** 2026-03-20T09:12:55.527Z

## Learnings

<!-- Append learnings below -->
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
