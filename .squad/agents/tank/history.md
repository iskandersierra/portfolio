# Tank — History

## Core Context

- **Project:** A personal portfolio website that presents your professional and personal positioning using the PRD as the implementation blueprint.
- **Role:** QA Engineer
- **Joined:** 2026-03-20T09:12:55.531Z

## Learnings

<!-- Append learnings below -->
- The stale reduced-motion hover-lift assertion in `tests/e2e/smoke.spec.ts` is now aligned to the live Proposal 7 home surface by targeting `.recent-posts .signal-module` instead of the removed `.brutalist-card` selector.
- After that one-line smoke-spec fix, `pnpm test:e2e -- tests/e2e/smoke.spec.ts` still exits 1, but the repaired reduced-motion hover-lift check passes; the remaining failures are six Chromium-only navigation and server-stability regressions outside this locator change.
- Proposal 7 smoke coverage on the canonical file is stale in two narrow places only: the desktop header geometry ceiling needs to allow the current shared shell height (`<132px` instead of `<120px`), and reduced-motion entrance assertions should target the route-local `.home-hero` surface instead of the removed generic `.hero` selector.
- The old Proposal 7 validation caveat is stale: port `4331` is currently free, a focused Chromium smoke subset starts cleanly, and the package-script smoke path launches the canonical Playwright server successfully.
- The current blocker is now test-level, not environmental: `pnpm test:e2e -- tests/e2e/smoke.spec.ts` fails 6 assertions across all browsers because the desktop header-height ceiling is too strict for the current shell (`~123-125px` vs `<120`) and the reduced-motion entrance test still waits for a removed `.hero` selector instead of the current route-local hero surfaces.
- Until those two smoke expectations are repaired, the minimal reliable slice-validation order remains `pnpm check`, a focused route-local smoke subset for the touched behavior, then `pnpm test:seo`, with the full smoke file reserved for after the shared smoke debt is fixed.
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
- Featured-content smoke coverage is most valuable when it asserts the home-page cards by rendered titles and follows each card through to its generated detail route, because that single test guards selection, page wiring, and link behavior together.
- Continuation planning after the detail-layout closure surfaced two route-local follow-up candidates: finish `/about` to meet the PRD, or clean up the home featured-module treatment plus stale `/tools` archive copy.
- Track the current smoke debt as a shared test-maintenance slice, not as a reason to reopen the shared shell or the already-closed Proposal 7 archive and detail routes.
- Switch rejected the first home/tools continuation review until the home featured modules stop reading as legacy shared cards, the `/tools` archive note reflects the migrated detail experience, and smoke coverage validates the route-level modules instead of the legacy `.brutalist-card` class.
- When matching route-local fixes are already dirty in the worktree, closure still depends on a fresh review and QA pass rather than the presence of the edits alone.
- Once the stale home/tools smoke assertions were repaired, the route-local closeout evidence was `pnpm check`, a focused Chromium subset over the repaired route-level assertions, and `pnpm test:seo`; the full smoke file can return as broader regression coverage instead of a blocker for that slice.
- After the home/tools slice was approved, the only remaining canonical smoke debt was the reduced-motion hover-lift test still looking for `.brutalist-card`; that should be tracked as shared test maintenance rather than as a product-slice blocker.
- Final continuation validation on 2026-03-23: `pnpm check` passed cleanly, `pnpm test:seo` passed cleanly, and the canonical smoke file now starts on port `4331` without the old environment blocker.
- The remaining closure blocker is one stale canonical smoke assertion in `tests/e2e/smoke.spec.ts` that still looks for `.brutalist-card` in the reduced-motion hover-lift test; the live home route now renders `.signal-module`, so that single locator fails in Chromium, Firefox, and WebKit while the other 42 smoke checks pass.
