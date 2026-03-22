# Squad Decisions

## Active Decisions

### 2026-03-22: Proposal 7 detail layouts share connected modules, adjacent navigation, and conditional tool interactivity

**By:** Trinity, Morpheus, Switch, Tank

**What:**
- Keep blog and tool detail routes on the shared `.post-shell` and `.post-body` prose contract while restyling their supporting surfaces into the approved Proposal 7 connected-module framing.
- Let `BlogPostLayout.astro` and `ToolLayout.astro` own the detail-page metadata framing, supporting modules, and adjacent-navigation surfaces so the slug routes stay thin and predictable.
- Wire blog detail pages to adjacent-post helper data for explicit newer and older navigation, and give tool detail pages the same adjacent-tool data while always preserving a stable registry link when the published tool set is sparse.
- Render the tool layout's interactive section only when a real `interactive` slot is present, and keep detail labels and supporting copy user-facing instead of advertising unfinished live-tool behavior or internal workflow language.
- Retune the author block and focused smoke coverage to match the shared detail-module behavior without changing content, SEO, or helper contracts outside the slice.

**Why:**
- The detail pages needed to align with the approved Proposal 7 direction without reopening shared shell, SEO, or content-helper decisions that were already settled.
- Adjacent navigation and consistent supporting modules make the blog and tool detail routes easier to scan and more useful while keeping the underlying route architecture stable.
- Tool pages should not promise interactivity that is not implemented, and user-facing labels build more trust than internal or placeholder language.

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

### 2026-03-22: Proposal 7 shell slice stays in the shared frame, with reviewer-driven narrow-view, layering, and validation fixes

**By:** Trinity, Switch, Neo, Tank

**What:**
- Move the shared shell from the prior terminal-window metaphor to an adapted Signal Graph Studio frame by changing shared tokens, global shell chrome, and header, footer, and theme-control styling.
- Preserve the existing Astro layout structure, ClientRouter usage, theme lifecycle API, mobile navigation behavior, and content and SEO contracts while making the shell-level visual change.
- Treat approval of the first slice as contingent on unmistakable shared-shell signal-graph cues, explicit footer `:focus-visible` styling, and no horizontal overflow at 320px.
- Resolve the narrow-view revision by compacting header action controls, hiding only non-essential brand metadata at the tightest breakpoint, and keeping the existing theme chooser behavior and menu model intact.
- Keep the shared header above the page-shell content layer so the desktop theme chooser menu remains pointer-clickable without changing its keyboard or menu semantics.
- Align shell smoke assertions with the visible signal-index treatment by checking the indexed labels compatibly instead of relying on stale exact-text matches.
- Treat the repaired shell batch as approved once focused smoke coverage confirms desktop pointer theme selection, keyboard theme access, primary navigation, and footer links across Chromium, Firefox, and WebKit.

**Why:**
- Proposal 7 needed a visible systems-oriented identity in the live shell, but the first slice had to stay concentrated in shared presentation layers rather than route-specific logic.
- Review needed explicit shell-level acceptance criteria so the redesign would read as a coherent direction change instead of isolated decoration.
- The overflow issue came from combined brand and action width at 320px, so compaction was the lowest-risk fix and preserved the shell architecture already working elsewhere.
- The revised shell introduced a layering fault where the main page content intercepted theme-menu clicks even though the menu rendered correctly.
- Visible signal indices are now an intentional part of the shell treatment, so smoke coverage needed to follow the user-visible labeling model without treating the index markers as regressions.

### 2026-03-22: Proposal 7 archive pages keep shared archive behavior while blog filtering syncs from the query string

**By:** Trinity, Switch, Tank

**What:**
- Keep the blog and tools archive routes inside the approved Proposal 7 framing by using archive-specific graph summaries, sidebars, and field visuals without changing route structure, content helpers, theme tokens, or archive semantics.
- Drive blog archive filtering from one client-side normalized tag source so query-string visits, visible post lists, active chips, tag-map state, and summary copy stay synchronized in the static Astro build.
- Keep archive cards to a single keyboard destination by leaving the title as the actionable link and treating the matching CTA copy as visual affordance only.
- Collapse decorative archive hero fields sooner on narrow screens and keep focused smoke coverage on query-string tag filtering plus reset-to-full-archive behavior.

**Why:**
- The archive slice needed an unmistakable Proposal 7 presentation change without dragging detail pages or shared helper logic into the same batch.
- Query-string filtering has to reconcile on the client in production because the site ships as a static Astro build.
- Review and QA found mobile density, duplicate focus stops, and filter-regression risk, so the fix had to close those issues at the behavior layer and leave executable coverage behind.

### 2026-03-22: Proposal 7 home and about pages stay route-local, with connected-system copy and narrow-width accessibility fixes

**By:** Trinity, Morpheus, Switch, Tank

**What:**
- Keep `/` and `/about` inside the approved Proposal 7 direction as route-local signal hubs without reopening shared shell, SEO, or content-helper contracts.
- Preserve the existing home and about headings plus the current featured-content data flow, then express the new direction through page-local graph panels, metrics, and module framing around the current content.
- Ground the revised home and about copy in practical system outcomes across architecture, leadership, tools, and learning, using concrete language about systems, decisions, tools, and patterns instead of abstract graph phrasing.
- Keep the about-page profile map decorative at wider breakpoints, but switch it to a real narrow-screen grid and expose the same role labels in an explicit list so meaningful content does not depend on positioned graphics.

**Why:**
- The home and about routes needed a visible Proposal 7 identity without churning the shared shell and data contracts already approved elsewhere.
- The copy needed to make the connected-system metaphor feel earned by the actual work on the site rather than reading like decoration.
- Review found the about-page field broke down at 320px and needed an accessible equivalent for the role labels, so the fix had to address both layout stability and content access.

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
