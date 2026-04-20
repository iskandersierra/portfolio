# Neo — History

## Core Context

- **Project:** A personal portfolio website that presents your professional and personal positioning using the PRD as the implementation blueprint.
- **Role:** Lead Engineer
- **Joined:** 2026-03-20T09:12:55.526Z

## Learnings

<!-- Append learnings below -->
- Epic 1 implementation is ahead of planning status: stories 1.3, 1.4, and 1.5 are already implemented in source and covered by Playwright smoke tests; the remaining work is tracker/documentation alignment, not product code.
- Astro layout scripts that can re-run on client navigation should keep browser-side public APIs stable and isolate listener cleanup behind an internal singleton plus `AbortController`.
- Blog tag filtering and chip active-state logic need to normalize the same trimmed lowercase value, otherwise whitespace-padded query params produce inconsistent results between filtering and UI state.
- Shared focus-visible rules in the prose shell should avoid resetting `text-decoration` when a later `.post-body a:focus-visible` rule intentionally thickens the underline as the focus cue.
- Proposal 7 shell fixes at 320px are safest when they compress secondary control affordances first, then selectively hide non-essential brand metadata below 360px; that preserves the theme menu behavior and visual direction without reopening the shared shell structure.
- Proposal 7 shell follow-up work can add explicit footer focus-visible cues at the shared shell layer without reopening the theme chooser model or broader layout architecture.
- The current Proposal 7 migration already covers the shared shell, home, about, blog archive, tools archive, and both detail layouts visually; the highest-value remaining migration gap is content completeness on the About route, not more shared-shell redesign.
- `src/pages/about.astro` is effectively route-local in the current graph index: GitNexus reports no upstream dependents, no affected processes, and LOW risk for an isolated About-page implementation slice.
- The next About slice should add the PRD-mandated profile depth that is still missing from the live surface: experience timeline, education, external links, and optional CV access, with styles kept local to the route and smoke coverage expanded only for the new visible modules.
- The active home/tools continuation pass can stay entirely route-local: GitNexus reports LOW risk and no upstream dependents for both `src/pages/index.astro` and `src/pages/tools.astro`, so the shared `src/components/ui/Card.astro` layer does not need to reopen.
- For Proposal 7 cleanup slices, Playwright expectations should key off the live route surface such as `.signal-module` and `.home-hero`, not legacy implementation classes that can survive longer than the UX contract.
- When route copy changes a public metadata contract, keep `tests/e2e/fixtures/routes.ts` in sync immediately or the SEO suite becomes the first failing signal even when the page implementation is correct.
- The home/tools continuation slice closed cleanly once the route-local module work stayed out of `Card.astro` and validation keyed off the visible `.signal-module` and `.home-hero` contracts instead of legacy shared-component selectors.
- When a newer design direction becomes the shipped product surface, update both the canonical decision record and downstream story summaries together; otherwise planning docs keep pointing at a retired baseline.
- For the clean-slate content refactor, it is safe to land the content layer first by making `projects` the canonical collection and keeping narrow tool-era aliases in `src/utils/content.ts`; route and layout work can then migrate to project-first imports without blocking schema validation.
- For the zero-blog launch state, deleting the placeholder markdown files is cleaner than keeping published-looking entries on disk; both `src/pages/blog/index.astro` and `src/pages/index.astro` already degrade cleanly to their empty states when `getPublishedBlogPosts()` returns an empty collection.
- Clean-slate refactor review (2026-04-21): Core structural work is solid — schemas, routes, layouts, and content migration all match the spec. Three residual issues stand out: (1) `src/content/tools/` was not deleted (old `uuid-ulid-generator.md` still on disk); (2) `src/utils/content.ts` retains seven `Tool*` backward-compat aliases that are now dead code; (3) `src/styles/themes.css` still carries `--node-core` / `--node-ring` tokens; (4) `Footer.astro` still renders the "signal graph" kicker and `~/iskander` title string — signal-graph design-language that the refactor was supposed to clear. The `src/pages/tools/` empty directory is a minor filesystem leftover.
