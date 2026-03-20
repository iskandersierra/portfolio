# Tank — History

## Core Context

- **Project:** A personal portfolio website that presents your professional and personal positioning using the PRD as the implementation blueprint.
- **Role:** QA Engineer
- **Joined:** 2026-03-20T09:12:55.531Z

## Learnings

<!-- Append learnings below -->
- PR #20 review validation on `feature/epic-2` passed `pnpm check`, but three live CodeRabbit threads still reflect real branch gaps: blog chip active-state normalization, focus-visible underline suppression in the shared prose CSS, and helper-level tag trimming parity between filtering and chip generation.
- Trinity's `getAllBlogTags` update fixes the older case-insensitive dedupe thread and preserves trimmed display casing, but it does not fully close the newer helper thread because `filterBlogPostsByTag` still compares untrimmed entry tags.
- Story 2.2 and follow-on detail-route work should validate in three layers: `pnpm check` first for Astro/content/schema drift, a focused `pnpm test:e2e` pass for generated-route and navigation behavior, and `pnpm test:seo` last because route/SEO fixtures are a separate public contract that can drift even when rendering still works.
- Epic 1 closure reviews need explicit reduced-motion checks for theme transitions, hover transforms, and persistent cues like the cursor blink; the current smoke coverage only verifies page-entry motion.
- Theme persistence regression coverage should navigate through client-routed header links and assert `data-theme`, toggle `aria-*` state, and `localStorage` after each hop.
- Header layout regressions should be guarded with explicit viewport-specific geometry assertions: mobile should keep brand and actions on one top row at 320px, while desktop should verify centered nav and right-flush actions independently.
- The header fix is stable when desktop owns the three-column wrapper and mobile overrides only that wrapper at `max-width: 640px`; remaining QA risk is narrow mid-width squeeze above the mobile breakpoint rather than the original row-drop regression.
- Story 2.1 content-platform reviews are cleaner when approval confirms both the explicit PRD schema section and the changed-files list, because that catches scope creep separately from schema correctness.
- Story 2.1 should remain collection-only work; approval is stronger when QA explicitly confirms that `/blog` and `/tools` stay unwired until the later UI stories begin.
- Story 2.3 validation must hit the generated `/blog/[slug]` route directly; a healthy `/blog` index can still hide a broken article route registration.
- Story 2.3's code-block acceptance needs either a published markdown fixture with fenced code or a dedicated rendering test, because the current launch posts are prose-only and leave that criterion unproven.
- Story 2.4 review is strongest when it checks the tool detail page against the shared `.post-shell` and `.post-body` contract instead of treating it as a one-off template; route and SEO coverage are sufficient for launch, but rich markdown cases on tool pages remain a follow-up risk until a tool fixture or test exercises them.
- After Neo's follow-up revision, the previously open PR #20 CodeRabbit threads no longer reproduce on branch: `selectedTag` active-state checks now share the normalized value, the shared prose focus-visible rule no longer suppresses underline styling, and tag filtering/deduping both trim before normalization.
- For PR review re-validation, local branch inspection plus the last successful `pnpm check` run is enough closure evidence when the unresolved GitHub threads point to code that has already changed and no new failing diagnostics are present.
