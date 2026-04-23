# Squad Decisions

## Active Decisions

### 2026-04-21: Clean-slate docs baseline stays project-first and archival mocks must be self-contained

**By:** Morpheus, Trinity, Tank

**What:**
- Rewrite the active planning and story docs to the clean-slate, project-first baseline instead of leaving Proposal 7 or `/tools` language framed as the shipped direction.
- Treat `docs/design/design-1.html` as an archival standalone mock with inline CSS and explicitly non-interactive controls, not as a production-bound artifact or a Tailwind CDN-backed reference.

**Why:**
- Team-facing docs should describe the current portfolio baseline directly so review comments 8-12 close against the real shipped direction.
- Comment 9 was only accepted after the archival mock became literally self-contained, so the canonical record should reflect the approved end state rather than the earlier interim note.

### 2026-04-21: Project interactive UI stays gated by real slot availability

**By:** Trinity

**What:**
- Use one shared `hasInteractiveSection` condition in `src/layouts/ProjectLayout.astro`, derived from `project.data.hasInteractivePage && Astro.slots.has('interactive')`, for both the metadata label and the optional interactive module.
- Keep `src/pages/projects/[slug].astro` unchanged in this pass instead of wiring a new named slot just to satisfy the metadata label.

**Why:**
- The project detail route should not advertise an interactive surface that does not actually render.
- This preserves the earlier project-first, slot-based detail-layout contract while keeping the comment-resolution scope narrow.

### 2026-04-21: About page keeps the canonical CV title as one rendered copy line

**By:** Trinity

**What:**
- Render `canonicalCv.basics.title` directly in the About summary card as one text node.
- Keep the existing `ul[aria-label="Profile role labels"]` list for scan-friendly role chips instead of replacing it.

**Why:**
- PR comment 2 and the focused About smoke assertion depend on the canonical CV title being present verbatim as one rendered line.
- Keeping the role list preserves the current clean-slate About layout and accessibility affordance without forcing the canonical phrasing to live only in split list items.

### 2026-04-21: PR comment 1 closes on current behavior and focused smoke validation, not a code change

**By:** Trinity, Tank

**What:**
- Treat PR comment 1 as closed without product edits because the cited `/blog` empty-state and `/about` canonical-CV behavior both pass current local validation.
- Use the focused Chromium smoke rerun for the two cited assertions plus repo-state confirmation that `.e2e-output.txt` is ignored, absent from the worktree, and not tracked by git as the closure evidence.
- Record the earlier local Astro dev-server port collision as harness noise rather than a live application regression.

**Why:**
- Current product behavior already matches the expected launch state, so reopening implementation work would be false churn.
- The review bookkeeping still needed one canonical record that distinguishes real UI regressions from transient local test-harness startup issues.

### 2026-04-21: Temporary tool compatibility shims are removed once search and impact checks are clean

**By:** Neo

**What:**
- Delete the leftover tool-era content and route artifacts under `src/content/tools/` and `src/pages/tools/` once workspace search confirms they are no longer referenced.
- Remove the dead `Tool*` helper and type aliases from `src/utils/content.ts` while keeping the active project and blog helper surface unchanged.

**Why:**
- The project-first cutover explicitly allowed temporary compatibility shims during migration, but leaving them in place after callers are gone creates dead surface area and weakens future cleanup signal.

### 2026-04-21: Footer brand remnants and stale theme node tokens are removed in place

**By:** Trinity

**What:**
- Replace the footer kicker copy in `src/components/layout/Footer.astro` from `signal graph` to `portfolio`.
- Remove the unused `--node-core` and `--node-ring` tokens from both theme roots in `src/styles/themes.css` after confirming they are no longer referenced.

**Why:**
- The clean-slate pass is meant to leave a neutral portfolio surface, and the remaining footer brand remnant plus dead theme tokens were stale implementation leftovers rather than intentional product language.

### 2026-04-21: Five-item cleanup is validated with focused checks while deletion guardrails remain open QA debt

**By:** Tank

**What:**
- Treat focused repo-state review plus `astro check`, `eslint`, `prettier`, and narrow Chromium smoke coverage as sufficient closure for the current five-item cleanup batch.
- Record the remaining QA debt separately: no automated guardrail yet asserts that `/tools` routes or links, tool compatibility exports, and other removed clean-slate surfaces stay absent.

**Why:**
- The current focused validation proves the shipped user flows and touched surfaces still behave, but it does not yet automate regression detection for the deletion semantics introduced by the clean-slate cleanup.

### 2026-04-20: Projects cutover is project-first with temporary compatibility shims

**By:** Neo, Iskander (via Copilot)

**What:**
- Make `projects` the canonical content and route surface, using `ProjectEntry`, `getPublishedProjects`, `getProjectHref`, and `getAdjacentProjects` from `src/utils/content.ts`.
- Keep temporary tool-era helper and type aliases in `src/utils/content.ts` during the cutover so unmigrated callers can move incrementally without blocking the schema shift.
- Keep the project detail layout's interactive area slot-based instead of coupling it to a specific island implementation.

**Why:**
- The clean-slate refactor replaces tools with projects, but the migration still needs a low-risk compatibility bridge while remaining pages and layouts move to project-first imports.
- Preserving the interactive slot keeps migrated entries like the UUID/ULID generator compatible without hard-wiring a single detail-page implementation.

### 2026-04-20: Clean-slate launch surface stays neutral while preserving accessibility and QA hooks

**By:** Switch, Tank

**What:**
- Treat the launch verification surface as Home, Blog, Projects, About, plus the UUID/ULID project detail route.
- Assume the blog launches with an empty collection and remove smoke and SEO expectations that published blog detail routes exist at launch.
- Rebuild About from `canonicalCv`, preserve `ul[aria-label="Profile role labels"]`, and keep the blog archive and article surfaces neutral while retaining the existing tag-filter data attributes and metric nodes used by current scripts and tests.

**Why:**
- The clean-slate launch removes the old tools and terminal-era assumptions, but the route semantics, accessibility hooks, and proven filter/test hooks still need to stay stable during the reset.
- Making the launch QA surface explicit prevents false failures while the shipped content state is intentionally sparse.

### 2026-04-07: About role-list regression coverage pins the accessible list at narrow widths

**By:** Tank

**What:**
- Extend the existing About-page smoke coverage in `tests/e2e/smoke.spec.ts` to assert the named role list and its four expected labels.
- Add a separate 320px-width About regression check that scrolls the role list into view and verifies each list item remains visible.

**Why:**
- The reported regression is specifically about the role list disappearing or becoming inaccessible below the tablet breakpoint.
- Keeping the assertions inside the current smoke file makes the coverage small, local, and aligned with the repo's existing Playwright style.

### 2026-04-07: About mobile role list stays visible while the expertise map hides

**By:** Trinity

**What:**
- Keep the existing `profileRoles` list markup in `src/pages/about.astro` as the single source of truth for the About hero roles.
- At `@media (max-width: 980px)`, hide only the decorative `.expertise-hub__visual` node map and keep `.expertise-hub__roles` visible inside a framed panel.
- Leave the desktop expertise hub and role-list presentation unchanged above the breakpoint.

**Why:**
- The previous breakpoint hid the entire `.expertise-hub`, which removed the semantic `ul[aria-label="Profile role labels"]` on tablet and mobile.
- A CSS-only route-local change restores the accessible role list without duplicating markup or reopening shared styles.

### 2026-04-07: Home hero should use one theme-driven image node

**By:** Trinity

**What:**
- Replace the dual-mounted home hero images in `src/pages/index.astro` with a single `<img>` element.
- Set the image source and theme-specific tuning from `window.__portfolioTheme.getResolvedTheme()` and keep it synchronized with the existing `portfolio:theme-change` event.
- Keep the implementation route-local to the home page instead of extending shared layout logic.

**Why:**
- Mounting both eager hero variants allows both files to be fetched even though only one should render.
- The shared layout already exposes the resolved theme and lifecycle event, so reusing that controller avoids parallel theme storage logic.
- Keeping the fix in the home route contains the change and preserves the current shared theme contract.

### 2026-04-07: Blog archive empty state stays permanently mounted

**By:** Trinity

**What:**
- Keep the blog archive empty-state node in `src/pages/blog/index.astro` rendered at all times.
- Let the existing inline `syncArchiveState()` logic remain the only source of truth for showing or hiding `[data-empty-state]` during query-string tag filtering.
- Cover the no-match tag path in `tests/e2e/smoke.spec.ts` by asserting the mounted empty-state node becomes visible.

**Why:**
- The archive now renders all posts at build time, so template-level omission of the empty-state node prevents the client-side filter sync from toggling it when a selected tag yields zero visible posts.
- Keeping the fix route-local avoids reopening shared archive patterns or changing the current visual language.

### 2026-04-07: Header toggle layout fix stays CSS-only and icon-owned

**By:** Trinity

**What:**
- Keep the mobile navigation toggle fix in `src/components/layout/Header.astro` CSS-only.
- Preserve the existing button markup, ARIA wiring, theme behavior, responsive breakpoints, and `data-mobile-nav-ready='true'` display gating.
- Make `.nav-toggle-icon` the explicit three-bar layout owner with a fixed width and row gap, and keep the responsive `.nav-toggle` sizing aligned with that icon width.

**Why:**
- The icon bars were relying on implicit layout sizing from the button grid, which is brittle and can render the three lines as a single horizontal row instead of a stacked hamburger.
- Moving the stacking responsibility into `.nav-toggle-icon` is the smallest stable fix because it does not require script, markup, or behavior changes.
- Keeping the adjustment scoped to the existing toggle selectors avoids reopening unrelated header work already in the dirty tree.

### 2026-03-25: About hero rebalance uses a route-local expertise hub panel

**By:** Trinity

**What:**
- Replace the About hero's right-column legend in `src/pages/about.astro` with a route-local expertise hub panel.
- Keep the existing two-column desktop hero and the current About copy hierarchy intact.
- Use a CSS-only signal-graph treatment: centered expertise count, surrounding expertise nodes, and role chips as secondary support data.

**Why:**
- The previous legend block was too light to balance the heading and stat cards on the left.
- Reusing the existing `expertise` and `profileRoles` data keeps the implementation localized, dynamic, and low risk.
- The stronger panel better matches the accepted Signal Graph Studio launch direction without adding a new asset or touching shared styles.

### 2026-03-25: Home hero image hides only on small screens and stays route-local

**By:** Trinity

**What:**
- Hide the home hero figure in `src/pages/index.astro` at the small-screen breakpoint instead of removing it from larger layouts.
- Keep the change route-local and tighten the mobile hero gap in the same file so the copy stack still reads cleanly after the figure disappears.
- Correct the malformed preceding home hero breakpoint in the same page so the responsive cascade applies as intended.

**Why:**
- The request was specifically about the mobile home layout, so desktop and tablet presentation should remain intact.
- A CSS-only route-local hide preserves the existing markup, theme-specific image swap, and desktop framing without reopening shared components.
- Fixing the adjacent breakpoint declaration is necessary for the mobile hide to work reliably and keeps the responsive behavior understandable for the rest of the team.

### 2026-03-25: Bottom rail copy should point at Iskander's portfolio, not a generic system

**By:** Trinity

**What:**
- Rephrase the two shared bottom-rail labels in `src/layouts/Layout.astro` to reference Iskander's theme state and portfolio field directly.
- Keep the existing concise terminal voice, rail structure, and styling unchanged.

**Why:**
- The previous labels read like generic interface telemetry instead of portfolio-specific UI copy.
- A copy-only change keeps Proposal 7 shell framing intact while making the shared chrome feel more authored and personal.

### 2026-03-25: Hero image border treatment prefers defined framing over blend integration

**By:** Iskander (via Copilot)

**What:**
- Prefer explicit border limits for the home hero images instead of blend-based integration.
- Treat the current blend-heavy image treatment as the problem to remove rather than a cue to add more atmospheric effects.

**Why:**
- The user explicitly redirected the team toward clear image boundaries because the existing blending treatment was not working well.

### 2026-03-25: Home hero blend cleanup stays route-local and CSS-only

**By:** Trinity

**What:**
- Keep the home hero image cleanup route-local to `src/pages/index.astro` with CSS-only tone, edge, and crop adjustments.
- Update the image-generation prompt to ask for a calmer, less busy signal-network visual instead of terminal or sci-fi drama.
- Do not add new decorative overlays, graph chrome, or hero markup for this pass.

**Why:**
- The current issue is blend quality, not missing structure.
- A quieter source image plus restrained tonal control solves the mismatch without reopening the approved Proposal 7 composition.
- Keeping the change CSS-only in the page avoids unnecessary shared-shell or component churn.

### 2026-03-25: Home hero images use restrained framing instead of blend-heavy integration

**By:** Trinity

**What:**
- Replace the home hero image's blend-heavy treatment in `src/pages/index.astro` with a restrained framed container and explicit inner image border.
- Keep the existing dark and light asset swap, current hero markup, and route-local CSS ownership.
- Keep the image visually secondary by constraining its desktop width instead of enlarging or decorating it.

**Why:**
- The updated preference is for clear image limits rather than atmospheric blending.
- A minimal frame solves that directly without reintroducing the busier Proposal 7 decoration language.
- The change stays isolated to the home route and preserves the existing responsive and theme behavior.

### 2026-03-25: Home sidebar card removal stays route-local

**By:** Trinity

**What:**
- Remove the two secondary sidebar modules from `src/pages/index.astro` on the home route.
- Collapse the remaining lower home section to the featured-signal panel instead of replacing the removed content elsewhere.
- Delete the page-local sidebar, compact-heading, and module-link styles that become unused after the markup removal.

**Why:**
- The request was to remove only the two visible home sidebar cards, and the cleanest implementation is a route-local deletion rather than a shared-shell or cross-route redesign.
- Removing the dead wrapper and page-scoped styles in the same file avoids leaving unused layout code behind.

### 2026-03-25: Light hero variant path uses theme-scoped asset swapping

**By:** Trinity

**What:**
- Keep the home hero image implementation in `src/pages/index.astro` route-local by reusing the existing figure and swapping between dark and light assets with `html[data-theme]` selectors.
- Add `public/img/hero-light.webp` immediately as a temporary copy of the current dark asset so the UI path is complete before final light-theme art is ready.
- Update the hero prompt doc to define both assets with shared constraints and light-theme-specific guidance.

**Why:**
- The request is for a related but distinct light-theme composition, not a hero redesign.
- Theme-scoped image swapping is the smallest technical change because the layout already exposes the resolved theme on `html[data-theme]`.
- Shipping the placeholder path now keeps implementation, docs, and replacement workflow aligned without adding JS or decorative UI.

### 2026-03-25: Home-page UI decluttering stays route-local and removes only redundant visible labels

**By:** Trinity

**What:**
- Remove the featured-module eyebrow label and the static metadata term from `src/pages/index.astro`.
- Keep the useful home-page values intact and limit the cleanup to route-local markup on the home page.
- Leave shared shell components, cross-route patterns, and unrelated home content structure unchanged.

**Why:**
- The removed labels were redundant visible chrome on the home route rather than useful information.
- Keeping the change route-local satisfies the cleanup request without reopening broader layout or shared-component scope.

### 2026-03-24: Home and about graph-field cleanup stays route-local, and the home hero title remains width-constrained

**By:** Trinity, Tank, Switch

**What:**
- Remove the decorative field block from the home sidebar graph and the about profile map.
- Keep each panel header and lower legend or list intact, and delete only the page-local data and CSS that existed to render the removed field blocks.
- Treat the first home pass as rejected until the hero title no longer overlaps the right sidebar.
- Keep the home hero heading in `src/pages/index.astro` on a constrained multi-line measure instead of forcing a single line with `white-space: nowrap` and `max-width: 100%`.

**Why:**
- The field blocks duplicated labels already present in the lower legend or list and were overlapping nearby heading content, so removing them is the cleanest route-local presentation fix.
- QA confirmed the single-line title constraint introduced a visible desktop regression by letting the headline and cursor intrude into the sidebar status area.
- Restoring only the heading measure closes the regression without reopening the hero grid, sidebar module, mobile breakpoints, shared shell, or component work.

### 2026-03-24: Decorative numeric and alphanumeric tokens are removed while rails and counts stay intentional

**By:** Trinity

**What:**
- Remove visible serial badges and faux telemetry tokens from shared navigation, footer links, home modules, about modules, archive cards, and list/detail count surfaces.
- Keep the Proposal 7 visual language through rails, spacing, and stronger label emphasis instead of numbered chrome.
- Replace zero-padded counts with direct readable values wherever the number still carries meaning.

**Why:**
- The tokens were decorative garnish rather than information, and they added clutter across the shared shell and route surfaces.
- Tightening the layouts alongside the removals keeps the UI intentional instead of leaving empty badge columns behind.

### 2026-03-24: Shared header brand text removal stays markup-only

**By:** Trinity

**What:**
- Remove the `brand-kicker` and `brand-meta` text nodes from `src/components/layout/Header.astro`.
- Leave the shared header layout, logo, navigation, theme controls, and styling rules unchanged.

**Why:**
- The request was to remove two visible brand text elements from the home page header without disturbing the rest of the shell.
- Deleting only those nodes is the smallest presentation-only change, and the existing `.brand` grid collapses to a single logo item without leaving broken spacing.

### 2026-03-24: Theme chooser trigger width reduction stays a presentation-only header tweak

**By:** Trinity

**What:**
- Remove the trigger-only `adaptive` badge from the header theme chooser button in `src/components/layout/ThemeToggle.astro`.
- Keep the richer theme descriptions inside the dropdown menu items, including the existing system-mode secondary label.
- Leave the chooser's menu semantics, accessible name, and current visual language unchanged.

**Why:**
- The extra trigger badge made the control wider than needed in the shared header.
- Removing only the trigger badge is the smallest targeted fix that narrows the button without weakening the more descriptive in-menu labeling.

### 2026-03-24: Proposal 7 is the explicit launch baseline in planning docs

**By:** Neo

**What:**
- Treat Proposal 7, Signal Graph Studio, as the explicit launch baseline in launch-planning documentation.
- Retire the older Proposal 1 wording from the canonical launch-direction record and Story 0.1 summary.
- Reconcile nearby planning language so shared-shell notes describe the approved launch direction instead of the older terminal baseline.

**Why:**
- The live product already ships the Proposal 7 shell and route framing, so the planning baseline should describe the product that is actually launching.
- Leaving Proposal 1 as the recorded baseline creates avoidable drift between the design decision, the epic tracker, and the shipped UI.
- This is a documentation-alignment decision, not a request to reopen the already-shipped Proposal 7 implementation scope.

### 2026-03-24: Shared shell UI copy cleanup stays presentation-only

**By:** Trinity

**What:**
- Remove the header's internal-status pill instead of replacing it with another live-state label.
- Replace the shared top-rail copy with a neutral Proposal 7-consistent label that keeps the signal-graph framing without surfacing "shared shell" or "Proposal 07" text.
- Trim the footer meta note to keep the connected-practice and adaptive-theme language while removing shared-shell wording.

**Why:**
- The request was to remove internal and stale live UI labels while preserving the current Proposal 7 visual language.
- Presentation-only copy edits keep the shell composition stable and avoid reopening component structure, tokens, or route behavior.

### 2026-03-24: Canonical reduced-motion hover-lift smoke locator now follows the live home module surface

**By:** Tank

**What:**
- Update the reduced-motion hover-lift assertion in `tests/e2e/smoke.spec.ts` to target `.recent-posts .signal-module` instead of the removed `.brutalist-card` selector.
- Treat the original hover-lift failure as closed; the canonical smoke command now fails only on six separate Chromium navigation and server-stability assertions.

**Why:**
- The home route no longer renders the legacy shared-card surface, so the stale selector was test debt rather than a product regression.
- Keeping the fix locator-only preserves the current request scope while making the smoke suite report the remaining real failures accurately.

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

### 2026-03-23: Proposal 7 continuation is now gated by smoke-suite debt, and remaining design work stays route-local

**By:** Tank, Neo, Switch

**What:**
- Retire the stale Proposal 7 note that local port `4331` blocks canonical Playwright validation; the package-script smoke path is runnable again.
- Treat the remaining blocker as shared smoke-suite debt in two stale expectations: the desktop header height ceiling and the reduced-motion page-entry selector that still targets `.hero`.
- Keep the canonical Playwright smoke spec aligned with the live Proposal 7 surface by allowing the observed shared-shell header height range and by targeting the route-local `.home-hero` element for reduced-motion entrance checks.
- Close the home/tools continuation slice route-locally by replacing the home featured-content strip inside `src/pages/index.astro` with page-owned signal modules, leaving `src/components/ui/Card.astro` untouched, and updating `src/pages/tools.astro` so the archive note reflects the shipped connected-module detail experience and conditional interactive behavior.
- Validate the repaired home/tools slice against the live route surface by asserting `.signal-module` and `.home-hero` behavior in the focused smoke path, while keeping metadata checks aligned with the shipped tools archive contract.
- Record the slice as approved once `pnpm check`, focused smoke coverage over the intended route-level UX, and `pnpm test:seo` are green, while tracking the lone remaining full-smoke debt separately as the stale reduced-motion hover-lift locator that still targets `.brutalist-card` instead of the live home-page `.signal-module` surface.
- Keep the next Proposal 7 implementation pass route-local and avoid reopening the shared shell, header, footer, global theme tokens, or already-closed archive and detail routes unless validation exposes a real regression.

**Why:**
- The validation caveat changed from an environment-startup issue to deterministic test debt, so the canonical ledger needed to point at the real blocker.
- The stale desktop-height threshold and removed `.hero` selector were test debt, not evidence of a live shell regression.
- Continuation planning from design, implementation, and QA all converged on remaining route-local work rather than another shared-shell redesign.
- Direct usage showed the older shared `Card.astro` treatment still surfaced visibly on the home route while the tools archive note had drifted behind the shipped product contract, so both repairs fit the same route-local cleanup slice.
- The revision cycle confirmed the slice could close without reopening shared components: the route-local module treatment answered the UX rejection, the focused smoke assertions now follow the visible Proposal 7 surface, and the SEO suite verified the archive metadata contract.
- Final review and QA both converged on the same outcome: the touched product slice is approved, and the only leftover test debt is one stale canonical smoke locator that no longer matches the live home-page module surface.

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

### 2026-04-07: About role-list regression coverage pins the accessible list at narrow widths

**By:** Tank

**What:**
- Extend the existing About-page smoke coverage in `tests/e2e/smoke.spec.ts` to assert the named role list and its four expected labels.
- Add a separate 320px-width About regression check that scrolls the role list into view and verifies each list item remains visible.

**Why:**
- The reported regression is specifically about the role list disappearing or becoming inaccessible below the tablet breakpoint.
- Keeping the assertions inside the current smoke file makes the coverage small, local, and aligned with the repo's existing Playwright style.

### 2026-03-25: About hero rebalance

**By:** Trinity

**What:**
- Replace the About hero's right-column legend in `src/pages/about.astro` with a route-local expertise hub panel.
- Keep the existing two-column desktop hero and the current About copy hierarchy intact.
- Use a CSS-only signal-graph treatment: centered expertise count, surrounding expertise nodes, and role chips as secondary support data.

**Why:**
- The previous legend block was too light to balance the heading and stat cards on the left.
- Reusing the existing `expertise` and `profileRoles` data keeps the implementation localized, dynamic, and low risk.
- The stronger panel better matches the accepted Signal Graph Studio launch direction without adding a new asset or touching shared styles.

### 2026-04-07: About mobile role list stays visible while the expertise map hides

**By:** Trinity

**What:**
- Keep the existing `profileRoles` list markup in `src/pages/about.astro` as the single source of truth for the About hero roles.
- At `@media (max-width: 980px)`, hide only the decorative `.expertise-hub__visual` node map and keep `.expertise-hub__roles` visible inside a framed panel.
- Leave the desktop expertise hub and role-list presentation unchanged above the breakpoint.

**Why:**
- The previous breakpoint hid the entire `.expertise-hub`, which removed the semantic `ul[aria-label="Profile role labels"]` on tablet and mobile.
- A CSS-only route-local change restores the accessible role list without duplicating markup or reopening shared styles.

### 2026-04-07: Blog archive empty state stays permanently mounted

**By:** Trinity

**What:**
- Keep the blog archive empty-state node in `src/pages/blog/index.astro` rendered at all times.
- Let the existing inline `syncArchiveState()` logic remain the only source of truth for showing or hiding `[data-empty-state]` during query-string tag filtering.
- Cover the no-match tag path in `tests/e2e/smoke.spec.ts` by asserting the mounted empty-state node becomes visible.

**Why:**
- The archive now renders all posts at build time, so template-level omission of the empty-state node prevents the client-side filter sync from toggling it when a selected tag yields zero visible posts.
- Keeping the fix route-local avoids reopening shared archive patterns or changing the current visual language.

### 2026-04-07: Home hero should use one theme-driven image node

**By:** Trinity

**What:**
- Replace the dual-mounted home hero images in `src/pages/index.astro` with a single `<img>` element.
- Set the image source and theme-specific tuning from `window.__portfolioTheme.getResolvedTheme()` and keep it synchronized with the existing `portfolio:theme-change` event.
- Keep the implementation route-local to the home page instead of extending shared layout logic.

**Why:**
- Mounting both eager hero variants allows both files to be fetched even though only one should render.
- The shared layout already exposes the resolved theme and lifecycle event, so reusing that controller avoids parallel theme storage logic.
- Keeping the fix in the home route contains the change and preserves the current shared theme contract.

### 2026-04-21: refactor/start-over has five cleanup gaps requiring follow-up

**By:** Neo

**What:**
- Delete `src/content/tools/uuid-ulid-generator.md` and the now-empty `src/content/tools/` directory.
- Delete the empty `src/pages/tools/` directory.
- Remove the seven dead `Tool*` aliases from `src/utils/content.ts`: `ToolEntry`, `sortToolEntries`, `getToolHref`, `getAdjacentTools`, `getFeaturedToolFromEntries`, `getPublishedTools`, `getFeaturedTool`.
- Replace the "signal graph" kicker and `~/iskander` title in `src/components/layout/Footer.astro` with neutral copy.
- Remove `--node-core` and `--node-ring` CSS custom properties from both `:root` and `[data-theme='dark']` blocks in `src/styles/themes.css`.

**Why:**
- The clean-slate decision record (§7) explicitly listed these files for deletion and called for removing all signal-graph design language and replacing all theme tokens with neutral values.
- The aliases are dead code with no callers; keeping them misleads future contributors into thinking a `tools` collection still exists.
- The footer kicker and unused tokens are semantic noise that contradicts the neutral-placeholder intent.

### 2026-04-21: Launch blog state enforcement

**By:** Neo

**What:**
- Enforce the clean-slate launch decision of zero blog posts by deleting the three placeholder markdown files from `src/content/blog/` instead of keeping non-launch content on disk.
- Rely on the existing empty-state handling in `src/pages/blog/index.astro` and `src/pages/index.astro` when `getPublishedBlogPosts()` returns no entries.

**Why:**
- Leaving published placeholder posts in source makes the launch archive non-empty and contradicts the approved launch content state.
- The route logic already supports an empty collection, so deleting the source entries is the smallest, clearest way to align content with the launch decision.

### 2026-04-21: refactor/start-over test suite has two pending fix confirmations and one missing coverage gap

**By:** Tank

**What:**
- Confirm the blog empty-state visibility test (`smoke.spec.ts:35`) passes on a fresh dev build after the placeholder blog posts are deleted; if it still fails, investigate whether Astro SSR is rendering `hidden={false}` as `hidden=""`.
- Confirm the About page assertion (`smoke.spec.ts:44`) passes after the old-title check was replaced with `canonicalCv.basics.description` text and role-list label assertions.
- Add smoke coverage for the home page "Latest writing" section asserting `section[aria-labelledby="latest-writing-title"]` and its `.empty-state` node are visible.

**Why:**
- Both failing tests were captured against a stale build state; they are expected to pass after content and markup changes land, but a fresh run is required to close them definitively.
- The home "Latest writing" section is a distinct render surface from the `/blog` archive and currently has no executable coverage, leaving a real gap in launch-surface QA.

### 2026-04-21: Clean-slate QA fixtures should track current route contracts

**By:** Tank

**What:**
- Align Playwright SEO fixtures with the current home and projects metadata copy.
- Treat the About hero intro sourced from `canonicalCv.basics.description` as the stable smoke-test contract.
- Keep reduced-motion hover-lift coverage on always-rendered launch surfaces like `.project-card.motion-hover-lift` instead of removed legacy home selectors.

**Why:**
- The clean-slate refactor changed public copy and removed older DOM hooks, so the QA contract needs to follow the shipped route surfaces rather than retired implementation details.

### 2026-04-21: Legacy `/tools` route source files removed; tool aliases retained as compatibility wrappers

**By:** Trinity

**What:** Remove the legacy `/tools` route source files entirely and keep the narrow `src/utils/content.ts` tool aliases in place as compatibility wrappers unless a later cleanup needs them.

**Why:** Astro was still generating `/tools` pages because the legacy route files and layout still existed even though the launch surface had already moved to `/projects`.

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
