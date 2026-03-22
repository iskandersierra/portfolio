# Squad Decisions

## Active Decisions

### 2026-03-20: Shared blog detail pages use one prose contract with compatibility hooks

**By:** Trinity, Switch

**What:**
- Use `BlogPostLayout.astro` to own blog detail metadata framing, tag presentation, and author placement.
- Treat `.post-shell`, `.post-body`, and companion `.post-*` hooks in `src/styles/global.css` as the shared prose contract for long-form content.
- Keep dual-hook class wiring where needed so the shared prose contract becomes the source of truth without breaking existing smoke-test selectors during the transition.

**Why:**
- The slug route stays thin and predictable while shared typography, code-block styling, and reading affordances live in one reusable contract.
- Compatibility hooks avoid unnecessary selector churn while Story 2.3 settles into the shared detail-page structure.

### 2026-03-20: Tool detail routes reuse the shared post shell with a slot for interactive surfaces

**By:** Trinity

**What:**
- Reuse the existing `.post-shell` detail-page structure for tool routes.
- Reserve the interactive tool surface as a generic named slot in the shared tool layout.

**Why:**
- This keeps tool pages visually aligned with blog detail pages and the launch terminal direction.
- The shared layout stays decoupled from unfinished tool-specific interactivity.

### 2026-03-20: Content-helper and route wiring changes use a three-step validation baseline

**By:** Tank

**What:**
- Gate shared content and page changes with `pnpm check` first.
- Follow with a focused `pnpm test:e2e` pass against generated detail routes and top-level navigation.
- Finish with `pnpm test:seo` to verify fixture-backed metadata contracts.

**Why:**
- Type and content drift, rendered-route regressions, and SEO fixture mismatches fail in different layers.
- The three-step sequence is the smallest reliable validation set for this content and routing slice.

### 2026-03-20: Playwright CI uses the official container instead of browser caching

**By:** Iskander (via Copilot)

**What:**
- Replace the Ubuntu `e2e` job's Playwright browser-cache optimization with the official Playwright container image.
- Preserve the existing Node and pnpm setup inside the containerized job.

**Why:**
- Measured CI runs showed browser caching did not materially help because dependency installation dominated setup time.
- The official container removes that bottleneck directly while keeping the workflow aligned with Playwright's supported environment.

### 2026-03-20: Local-only workflow and desktop-only header scope

**By:** Iskander (via Copilot)

**What:**
- Do not run `npx netlify init` or `git push` as part of the current work.
- Keep the mobile header layout unchanged and limit the header fix to the desktop layout so the theme chooser stays pinned to the far right.

**Why:**
- The user explicitly constrained both deployment-related actions and the scope of the header revision.

### 2026-03-20: Epic 1 shell remains within the minimalist terminal launch direction

**By:** Trinity

**What:**
- Implement Epic 1 with a dedicated mobile drawer, a system-first theme bootstrap, and restrained shared motion utilities.
- Keep the launch shell within the established minimalist terminal direction without redesigning tokens or typography.
- Preserve Story 1.1 and Story 1.2 behavior while limiting scope to shell, theme, and motion work.

**Why:**
- The launch shell needed accessibility and interaction improvements without creating a parallel visual system or expanding scope beyond Epic 1.

### 2026-03-20: Reduced-motion fixes require targeted overrides and explicit regression coverage

**By:** Tank, Switch, Neo

**What:**
- Reduced-motion handling must override the exact motion sources, including theme transitions on `html[data-theme-ready='true']` and `body`, hover-lift transforms in the `:hover` state, and persistent cues such as the cursor blink.
- Playwright smoke coverage should assert reduced-motion behavior for theme transitions, hover-lift transforms, and cursor animation so closure decisions rely on executable checks.
- Epic 1 stories 1.3, 1.4, and 1.5 can be treated as implementation-complete once the verified behavior is reflected in planner and issue status updates.

**Why:**
- QA found that broad reduced-motion selectors left theme and hover motion leaking through; the targeted selector fix and follow-up audit clarified the actual closure bar.

### 2026-03-20: Header layout ownership is split cleanly between mobile and desktop

**By:** Trinity, Tank

**What:**
- Keep small-screen header layout ownership in `Header.astro` with an explicit top-row wrapper for the brand and action controls, and remove the conflicting global mobile stack override.
- Keep the desktop header brand, primary nav, and actions inside one explicit `.terminal-header-top` wrapper.
- Use a desktop-only three-column grid so the brand stays left, the nav stays centered, and the theme chooser stays flush right while mobile retains its existing compact layout.
- Keep geometry-based Playwright coverage for both the desktop single-row behavior and the 320px mobile layout.

**Why:**
- The previous combination of global stacking rules, `display: contents`, and flex spacing let the mobile header split across rows and allowed the desktop actions to drift or stack.

### 2026-03-20: Story 2.1 content collections land before any page wiring

**By:** Trinity, Tank

**What:**
- Add `blog` and `tools` Astro content collections in `src/content.config.ts`.
- Seed launch-approved Markdown entries under `src/content/blog/` and `src/content/tools/`.
- Keep the `/blog` and `/tools` pages unchanged until later stories wire collection data into shared UI deliberately.

**Why:**
- Later stories need a stable schema and approved launch content without introducing premature page-level scope or coupling UI decisions to collection setup.

### 2026-03-20: Theme persistence lifecycle handling for Astro navigation (consolidated)

**By:** Trinity, Tank

**What:**
- Preserve `window.__portfolioTheme` as the public theme controller API.
- Move lifecycle bookkeeping into an internal `window.__portfolioThemeLifecycle` singleton so repeated layout script execution reuses one media query instance and one abortable listener set.
- Abort and replace prior global theme listeners before re-registering them, including `storage`, media-query, and `astro:page-load` hooks.
- Re-apply the stored preference on each `astro:page-load` so client-router navigation preserves the expected theme state.
- Keep regression coverage in Playwright by asserting theme state, toggle accessibility state, and `localStorage` persistence across header-link navigation.

**Why:**
- Astro client navigation can re-run layout scripts, which otherwise stacks global listeners and creates inconsistent theme behavior after navigation.
- Keeping the public controller stable fixes the lifecycle bug at the root without forcing follow-on API changes elsewhere in the UI.
- Architecture review explicitly favored idempotent Astro lifecycle handling, and QA approved the current fix and coverage; remaining risk is limited to follow-up hardening around repeated post-navigation toggles and unrelated lifecycle-heavy listeners.

### 2026-03-20: Explicit Light, Dark, and System theme chooser in the header

**By:** Trinity

**What:**
- Replace the binary theme toggle with a compact Light, Dark, and System chooser in the header.
- Keep `window.__portfolioTheme` as the single public theme API.
- Continue treating `null` as the system preference so explicit System selection clears the stored override instead of writing a third theme string.
- Preserve the existing Astro shell lifecycle behavior, visual language, and localized header-only implementation scope.
- Keep smoke coverage focused on explicit chooser interactions, accessibility semantics, and system-mode persistence.

**Why:**
- The header should expose the full theme model directly instead of hiding system mode behind implicit storage behavior.
- An explicit chooser is more accessible than a cycling toggle because it supports clear menu semantics, keyboard navigation, Escape dismissal, and visible active state.
- Reusing the established theme bootstrap avoids unnecessary API churn while preserving navigation and persistence behavior already verified elsewhere.

### 2026-03-21: PR #20 review closure follows current branch state, not stale thread state

**By:** Neo, Tank

**What:**
- Normalize blog tag handling end to end by trimming and lowercasing both the query-string tag and entry tags, and drive the selected filter chip from that same normalized value.
- Preserve the dedicated prose-link focus cue by leaving `.post-body a:focus-visible` free to control underline rendering without a shared `text-decoration` reset overriding it.
- Treat remaining PR #20 CodeRabbit threads as non-blocking once the current branch reflects the requested behavior and `pnpm check` still passes.

**Why:**
- The outstanding review comments were caused by real mismatches between filtering, chip state, and focus styling, so the fix needed to align all three behaviors rather than partially patch one layer.
- GitHub review-thread status can lag behind branch changes; closure should follow the live code plus current validation evidence instead of stale thread metadata.

### 2026-03-22: Featured content stays date-driven and QA validates it from the home-page surface

**By:** Morpheus, Tank

**What:**
- Treat `How to stay technically current after 25 years` as the intentional featured launch post by making it the newest published blog entry.
- Keep the MVP featured-content rule date-driven instead of adding a manual featured flag before launch.
- Cover the home-page featured-content strip through smoke tests that assert the rendered card titles and the generated detail-route destinations.

**Why:**
- The existing shared content helpers already select featured items by descending publish date, so adjusting content dates closes Story 2.5 without adding new product surface area.
- The learning-philosophy post best matches the site's launch positioning and should lead the narrative on `/`.
- User-visible smoke coverage catches regressions in helper selection, home-page wiring, and featured-card navigation without coupling QA to helper internals.

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
