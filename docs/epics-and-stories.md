# Portfolio MVP Epics And Stories

## Scope

This document translates the PRD into implementation epics and stories for the MVP only.

Included in scope:

- Home page
- About page
- Blog index and post pages
- Projects index and project page
- Dark and light theme support
- Responsive layout
- SEO basics
- Subtle motion
- Privacy-friendly analytics

Excluded from scope:

- Games
- Personal page
- Contact form
- Comments
- Newsletter
- Search
- i18n

## Planning Assumptions

- The PRD is the source of truth for scope and acceptance.
- Open questions in the PRD are treated as explicit decision stories, not hidden assumptions.
- Existing implementation work is not used to expand scope beyond the MVP.
- The output of this document is intended to be tracker-ready, but still readable as a planning artifact.

## Epic Status

- [x] Epic 0: Product Decisions And Launch Planning
- [x] Epic 1: Shared Shell And UX Foundations
- [x] Epic 2: Content Platform And Shared Content UI
- [ ] Epic 3: Home And About Experience
- [ ] Epic 4: Blog Publishing MVP
- [ ] Epic 5: Projects Publishing MVP
- [ ] Epic 6: SEO, Analytics, And Launch Hardening

## Epic 0: Product Decisions And Launch Planning

Purpose: remove ambiguity before feature work starts.

Story checklist:

- [x] Story 0.1: Select launch design direction
- [x] Story 0.2: Choose analytics platform
- [x] Story 0.3: Decide Markdown or MDX for blog MVP
- [x] Story 0.4: Lock production domain
- [x] Story 0.5: Select first launch project
- [x] Story 0.6: Decide launch blog seeding approach

### Story 0.1: Select launch design direction

Choose the visual direction to ship for the MVP from the existing design proposals.

Issue: #3

Acceptance criteria:

- One design proposal is selected as the launch baseline.
- Any deviations from that proposal are documented.
- The selected direction aligns with the existing token and styling strategy.

Decision:

- The clean-slate portfolio baseline is the current MVP launch direction.
- The shipped baseline is the neutral, current-state portfolio surface defined by the clean-slate refactor, not the earlier Proposal 7 Signal Graph Studio treatment.
- Decision record: [docs/decisions/refactor-clean-slate-2026-04-20.md](./decisions/refactor-clean-slate-2026-04-20.md)

Delivery notes:

- The current baseline is the clean-slate portfolio shell and content model captured in the April 2026 refactor decision record.
- Earlier design proposals, including Proposal 7, remain reference explorations rather than the shipped launch baseline.
- Story 0.1 is closed by documentation and baseline alignment only. Any future visual system changes belong in later implementation stories.

### Story 0.2: Choose analytics platform

Decide which privacy-friendly analytics option will be used for v1.

Issue: #8

Acceptance criteria:

- Umami, Plausible, and Netlify Analytics are compared.
- One option is selected for MVP.
- Production-only loading requirements are documented.

Decision: **Umami Cloud free tier** (2026-03-16). See `docs/decisions/analytics-platform.md`.

### Story 0.3: Decide Markdown or MDX for blog MVP

Decide whether the launch blog supports plain Markdown only or MDX.

Issue: #6

Acceptance criteria:

- The launch content format is explicitly chosen.
- If MDX is deferred, it is recorded as post-launch work.

Decision: **Plain Markdown for MVP** (2026-03-16). See `docs/superpowers/specs/2026-03-16-content-format-design.md`.

### Story 0.4: Lock production domain

Choose the public domain or canonical URL for launch.

Issue: #5

Acceptance criteria:

- The canonical site URL is decided.
- SEO and metadata work can use the final URL.
- Deployment implications are understood.

Decision: **isksz.com** (`https://isksz.com`) (2026-03-17). See `docs/decisions/production-domain.md`.

### Story 0.5: Select first launch project

Choose the first project entry to publish at launch.

Issue: #7

Acceptance criteria:

- One launch project is selected from the PRD candidate list.
- Inputs, outputs, and target implementation approach are defined.
- The project fits MVP scope.

Decision: **UUID / ULID generator** as the first migrated tool-type project (2026-03-17). See `docs/decisions/launch-tool.md`.

### Story 0.6: Decide launch blog seeding approach

Decide whether the clean-slate launch seeds blog content or starts empty.

Issue: #9

Acceptance criteria:

- The launch blog content policy is explicit.
- Placeholder posts are either retained intentionally or removed.
- Home and blog launch behavior is defined if no posts ship.

Decision: The clean-slate refactor supersedes the earlier three-post launch plan. Launch blog content is intentionally empty, the three placeholder posts are deleted, and the product docs should no longer treat seeded launch posts as required. See `docs/decisions/refactor-clean-slate-2026-04-20.md`.

Delivery notes:

- Historical note: `docs/decisions/launch-blog-posts.md` remains as a record of the earlier launch-content plan.
- Current baseline: the clean-slate launch does not require seeded blog posts.
- Follow-on work: future real posts can be planned independently of launch readiness.

## Epic 1: Shared Shell And UX Foundations

Purpose: establish the site-wide layout, navigation, theme behavior, and reusable page chrome.

Story checklist:

- [x] Story 1.1: Extend base layout for reusable metadata
- [x] Story 1.2: Complete persistent site shell
- [x] Story 1.3: Implement mobile navigation
- [x] Story 1.4: Harden theme behavior
- [x] Story 1.5: Add reusable motion patterns

### Story 1.1: Extend base layout for reusable metadata

Update the base layout so all pages can pass SEO and social metadata consistently.

Issue: #11

Acceptance criteria:

- Title, description, canonical URL, page type, and social image inputs are supported.
- Defaults are centralized in one place.

### Story 1.2: Complete persistent site shell

Finish the shared header and footer for all MVP pages.

Issue: #12

Acceptance criteria:

- Header navigation covers Home, About, Blog, and Projects.
- Footer includes social and quick links.
- Active state behavior works correctly.

Delivery notes:

- Shared `Header` and `Footer` components are wired through the base layout for all MVP pages.
- The persistent shell includes top-level navigation, footer quick links, footer social links, and active-state behavior covered by Playwright smoke tests.

### Story 1.3: Implement mobile navigation

Provide a usable mobile navigation experience for small screens.

Issue: #13

Acceptance criteria:

- Navigation is accessible on mobile.
- The layout works at 320px width.
- Desktop navigation behavior is preserved.

Delivery notes:

- The shared header now exposes a dedicated mobile menu button and drawer with proper `aria-expanded`, `aria-controls`, active-link state, outside-click dismissal, and Escape-key dismissal.
- The shell was adjusted to keep the shared launch frame usable at 320px width without compromising the existing desktop navigation.
- Cross-browser Playwright smoke coverage now verifies the mobile path specifically at 320px.

### Story 1.4: Harden theme behavior

Ensure light and dark theme behavior is stable and user-friendly.

Issue: #14

Acceptance criteria:

- Theme defaults to system preference.
- Theme selection persists.
- Theme changes do not cause visible flash on load.
- Reduced motion is respected where relevant.

Delivery notes:

- Theme bootstrapping now resolves from system preference first, applies before paint, and records an explicit `data-theme-mode` so system-following and user override states stay distinct.
- The theme toggle still gives a simple light-or-dark override, and the chosen override persists through `localStorage`.
- Reduced-motion users now bypass theme transition effects along with other shell motion cues.

### Story 1.5: Add reusable motion patterns

Create a consistent approach for subtle page and section transitions.

Issue: #15

Acceptance criteria:

- Entrance and transition behavior is available for MVP pages.
- Motion remains subtle and non-distracting.
- Reduced-motion users get a simplified experience.

Delivery notes:

- MVP pages now share reusable `motion-enter`, `motion-delay-*`, and `motion-hover-lift` patterns instead of one-off boot-sequence classes.
- Astro client routing is enabled with a restrained page transition for the shared page shell, keeping the approved launch direction intact.
- Reduced-motion handling simplifies entrance, hover, and page-transition motion to avoid distraction.

## Epic 2: Content Platform And Shared Content UI

Purpose: build the content model and shared presentation layers that power Blog and Projects.

Story checklist:

- [x] Story 2.1: Add Astro content collections
- [x] Story 2.2: Build shared content helpers
- [x] Story 2.3: Create blog post layout
- [x] Story 2.4: Create project page layout
- [x] Story 2.5: Define featured content rules

### Story 2.1: Add Astro content collections

Define content collections for blog posts and projects.

Acceptance criteria:

- Blog schema matches the PRD.
- Projects schema matches the PRD.
- Draft handling exists.

### Story 2.2: Build shared content helpers

Create utilities for sorting, filtering, and navigating content.

Acceptance criteria:

- Published content can be listed and sorted.
- Blog posts can be filtered by tag.
- Previous and next navigation data can be computed.

Delivery notes:

- Added `src/utils/content.ts` as the shared content-helper layer for blog and project collections, including published-only filtering, deterministic date sorting, tag extraction and filtering, adjacent blog navigation lookup, and shared date formatting.
- The `/blog` page now renders published collection entries instead of placeholders and exposes tag filtering through query-string links.
- The `/projects` page is the clean-slate target for published project metadata from the content collection instead of hardcoded cards.

### Story 2.3: Create blog post layout

Build the shared layout and presentation pieces for blog post pages.

Acceptance criteria:

- Blog posts render metadata, tags, and body content.
- Read time appears on post pages.
- Code blocks render cleanly.
- An author block is available.

### Story 2.4: Create project page layout

Build the shared layout and presentation pieces for project detail pages.

Acceptance criteria:

- Project pages render metadata and description.
- Framework badges are supported.
- Usage notes can be displayed.
- The interactive project area fits within the layout.

### Story 2.5: Define featured content rules

Allow the home page to surface real featured content.

Acceptance criteria:

- Latest published post can be selected programmatically.
- Featured projects can be selected programmatically.
- The home page no longer depends on hardcoded placeholders.

Delivery notes:

- Clean-slate baseline: the home page should surface up to 3 `featured: true` blog posts by `date` and up to 3 `featured: true` projects by `publishedAt`.
- The home page must not depend on hardcoded placeholder content for either section.
- Launch must tolerate an empty writing section because the seeded three-post assumption has been removed.

## Epic 3: Home And About Experience

Purpose: deliver the core identity and profile pages for the portfolio.

Story checklist:

- [ ] Story 3.1: Refactor home page to use published content
- [ ] Story 3.2: Build About page
- [ ] Story 3.3: Add About page structured data
- [ ] Story 3.4: Decide CV download behavior

### Story 3.1: Refactor home page to use published content

Replace placeholder content on the home page with real routed and featured content.

Acceptance criteria:

- Hero remains aligned with the PRD.
- Quick navigation cards are removed from the clean-slate launch baseline.
- Featured content uses published items.

### Story 3.2: Build About page

Create the professional profile page defined in the PRD.

Acceptance criteria:

- Summary section is present.
- Core expertise is shown in a scannable format.
- Experience timeline is included.
- Education and working philosophy are included.
- External profile links are present.

### Story 3.3: Add About page structured data

Expose professional profile information through structured data.

Acceptance criteria:

- About page emits `Person` JSON-LD.
- Structured data uses the final domain and profile links.

### Story 3.4: Decide CV download behavior

Determine whether a downloadable CV is included in the MVP.

Acceptance criteria:

- A working static download exists, or the feature is explicitly deferred.
- No placeholder download link ships.

## Epic 4: Blog Publishing MVP

Purpose: launch the blog as a first-class content section.

Story checklist:

- [ ] Story 4.1: Build blog index page
- [ ] Story 4.2: Build blog post route
- [ ] Story 4.3: Add post navigation and author metadata
- [x] Story 4.4: Remove the seeded launch-post requirement
- [ ] Story 4.5: Add blog SEO and structured data

### Story 4.1: Build blog index page

Create the blog listing page.

Acceptance criteria:

- Published posts display title, date, read time, tags, and excerpt.
- Tag filtering works.
- Pagination is added if needed.

### Story 4.2: Build blog post route

Create the dynamic route for individual blog posts.

Acceptance criteria:

- Each published post resolves by slug.
- Tags link back to the blog index.
- Post metadata is page-specific.

### Story 4.3: Add post navigation and author metadata

Support better reading continuity and author context.

Acceptance criteria:

- Previous and next links appear where applicable.
- Author block is shown consistently.

### Story 4.4: Remove the seeded launch-post requirement

Align blog launch assumptions with the clean-slate refactor.

Acceptance criteria:

- The MVP no longer requires three seeded launch posts.
- Placeholder launch posts are not treated as required launch assets.
- Empty-state behavior remains acceptable for launch.

### Story 4.5: Add blog SEO and structured data

Complete blog-specific metadata and discoverability work.

Acceptance criteria:

- Blog post pages emit `BlogPosting` JSON-LD.
- Open Graph and Twitter metadata are page-specific.
- Canonical URLs are set.

## Epic 5: Projects Publishing MVP

Purpose: launch the first project entry and the projects catalog.

Story checklist:

- [ ] Story 5.1: Build projects index page
- [ ] Story 5.2: Build project detail route
- [ ] Story 5.3: Implement first interactive project entry
- [ ] Story 5.4: Publish project metadata and copy

### Story 5.1: Build projects index page

Create the projects listing page.

Acceptance criteria:

- Published projects display name, description, type, and relevant badges or links.
- Draft projects are not shown.

### Story 5.2: Build project detail route

Create the route for individual project pages.

Acceptance criteria:

- Each published project resolves by slug when it has a detail page.
- Metadata and usage notes render on the page.
- Navigation back to the projects index exists.

### Story 5.3: Implement first interactive project entry

Build the selected launch project entry.

Acceptance criteria:

- The interactive project surface is functional in-browser.
- It uses the selected island framework.
- It fits within the shared project page layout.

### Story 5.4: Publish project metadata and copy

Complete the launch project as a content and discovery asset.

Acceptance criteria:

- The project entry validates against the collection schema.
- Descriptive copy is complete.
- The project appears on the projects index and can be featured on the home page.

## Epic 6: SEO, Analytics, And Launch Hardening

Purpose: finish the operational and quality gates required for release.

Story checklist:

- [ ] Story 6.1: Add sitemap and robots coverage
- [ ] Story 6.2: Integrate analytics in production only
- [ ] Story 6.3: Add site-wide social preview defaults
- [ ] Story 6.4: Validate responsive, accessibility, and build quality
- [ ] Story 6.5: Run PRD-based launch QA

### Story 6.1: Add sitemap and robots coverage

Enable search-engine discovery basics.

Acceptance criteria:

- Sitemap generation is enabled.
- Robots behavior matches the PRD.

### Story 6.2: Integrate analytics in production only

Add the selected analytics platform to the site.

Acceptance criteria:

- Analytics loads only in production.
- MVP routes are tracked.
- Development behavior remains clean.

### Story 6.3: Add site-wide social preview defaults

Ensure every page has usable baseline social metadata.

Acceptance criteria:

- Page title and description defaults exist.
- Open Graph defaults exist.
- Twitter card defaults exist.

### Story 6.4: Validate responsive, accessibility, and build quality

Perform final quality validation for the MVP.

Acceptance criteria:

- MVP pages work on mobile, tablet, and desktop.
- Navigation and theme controls are keyboard-usable.
- Build and project checks pass.

### Story 6.5: Run PRD-based launch QA

Verify the site against the MVP requirements in the PRD.

Acceptance criteria:

- Every PRD must-have item is mapped to an implemented feature.
- Deferred items remain out of scope.
- No dead links or placeholder routes ship.

## Recommended Delivery Order

1. Epic 0
2. Epic 1 and Story 2.1
3. Epic 2 remainder
4. Epic 3, Epic 4, and Epic 5 in parallel where possible
5. Epic 6

## Suggested Sprint Split

### Sprint 1

- Epic 0
- Stories 1.1, 1.2, 1.4
- Story 2.1

### Sprint 2

- Stories 1.3, 1.5
- Stories 2.2, 2.3, 2.4, 2.5
- Stories 3.2, 4.1, 4.2, 5.1, 5.2

### Sprint 3

- Stories 3.1, 3.3, 3.4
- Stories 4.3, 4.4, 4.5
- Stories 5.3, 5.4
- Epic 6
