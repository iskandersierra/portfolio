# Portfolio MVP Epics And Stories

## Scope

This document translates the PRD into implementation epics and stories for the MVP only.

Included in scope:

- Home page
- About page
- Blog index and post pages
- Tools index and tool page
- Dark and light theme support
- Responsive layout
- SEO basics
- Subtle motion
- Privacy-friendly analytics

Excluded from scope:

- Games
- Personal page
- Projects page
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

- [ ] Epic 0: Product Decisions And Launch Planning
- [ ] Epic 1: Shared Shell And UX Foundations
- [ ] Epic 2: Content Platform And Shared Content UI
- [ ] Epic 3: Home And About Experience
- [ ] Epic 4: Blog Publishing MVP
- [ ] Epic 5: Tools Publishing MVP
- [ ] Epic 6: SEO, Analytics, And Launch Hardening

## Epic 0: Product Decisions And Launch Planning

Purpose: remove ambiguity before feature work starts.

Story checklist:

- [ ] Story 0.1: Select launch design direction
- [ ] Story 0.2: Choose analytics platform
- [ ] Story 0.3: Decide Markdown or MDX for blog MVP
- [ ] Story 0.4: Lock production domain
- [ ] Story 0.5: Select first launch tool
- [ ] Story 0.6: Finalize the three launch blog posts

### Story 0.1: Select launch design direction

Choose the visual direction to ship for the MVP from the existing design proposals.

Issue: #3

Acceptance criteria:

- One design proposal is selected as the launch baseline.
- Any deviations from that proposal are documented.
- The selected direction aligns with the existing token and styling strategy.

### Story 0.2: Choose analytics platform

Decide which privacy-friendly analytics option will be used for v1.

Acceptance criteria:

- Umami, Plausible, and Netlify Analytics are compared.
- One option is selected for MVP.
- Production-only loading requirements are documented.

### Story 0.3: Decide Markdown or MDX for blog MVP

Decide whether the launch blog supports plain Markdown only or MDX.

Acceptance criteria:

- The launch content format is explicitly chosen.
- If MDX is deferred, it is recorded as post-launch work.

### Story 0.4: Lock production domain

Choose the public domain or canonical URL for launch.

Acceptance criteria:

- The canonical site URL is decided.
- SEO and metadata work can use the final URL.
- Deployment implications are understood.

### Story 0.5: Select first launch tool

Choose the first developer tool to publish at launch.

Acceptance criteria:

- One tool is selected from the PRD candidate list.
- Inputs, outputs, and target framework are defined.
- The tool fits MVP scope.

### Story 0.6: Finalize the three launch blog posts

Define the initial launch content set for the blog.

Acceptance criteria:

- Three post titles are approved.
- Each post has a rough outline and tag direction.
- The set covers architecture, leadership, and learning philosophy.

## Epic 1: Shared Shell And UX Foundations

Purpose: establish the site-wide layout, navigation, theme behavior, and reusable page chrome.

Story checklist:

- [ ] Story 1.1: Extend base layout for reusable metadata
- [ ] Story 1.2: Complete persistent site shell
- [ ] Story 1.3: Implement mobile navigation
- [ ] Story 1.4: Harden theme behavior
- [ ] Story 1.5: Add reusable motion patterns

### Story 1.1: Extend base layout for reusable metadata

Update the base layout so all pages can pass SEO and social metadata consistently.

Acceptance criteria:

- Title, description, canonical URL, page type, and social image inputs are supported.
- Defaults are centralized in one place.

### Story 1.2: Complete persistent site shell

Finish the shared header and footer for all MVP pages.

Acceptance criteria:

- Header navigation covers Home, About, Blog, and Tools.
- Footer includes social and quick links.
- Active state behavior works correctly.

### Story 1.3: Implement mobile navigation

Provide a usable mobile navigation experience for small screens.

Acceptance criteria:

- Navigation is accessible on mobile.
- The layout works at 320px width.
- Desktop navigation behavior is preserved.

### Story 1.4: Harden theme behavior

Ensure light and dark theme behavior is stable and user-friendly.

Acceptance criteria:

- Theme defaults to system preference.
- Theme selection persists.
- Theme changes do not cause visible flash on load.
- Reduced motion is respected where relevant.

### Story 1.5: Add reusable motion patterns

Create a consistent approach for subtle page and section transitions.

Acceptance criteria:

- Entrance and transition behavior is available for MVP pages.
- Motion remains subtle and non-distracting.
- Reduced-motion users get a simplified experience.

## Epic 2: Content Platform And Shared Content UI

Purpose: build the content model and shared presentation layers that power Blog and Tools.

Story checklist:

- [ ] Story 2.1: Add Astro content collections
- [ ] Story 2.2: Build shared content helpers
- [ ] Story 2.3: Create blog post layout
- [ ] Story 2.4: Create tool page layout
- [ ] Story 2.5: Define featured content rules

### Story 2.1: Add Astro content collections

Define content collections for blog posts and tools.

Acceptance criteria:

- Blog schema matches the PRD.
- Tool schema matches the PRD.
- Draft handling exists.

### Story 2.2: Build shared content helpers

Create utilities for sorting, filtering, and navigating content.

Acceptance criteria:

- Published content can be listed and sorted.
- Blog posts can be filtered by tag.
- Previous and next navigation data can be computed.
- Featured content can be selected without hardcoding.

### Story 2.3: Create blog post layout

Build the shared layout and presentation pieces for blog post pages.

Acceptance criteria:

- Blog posts render metadata, tags, and body content.
- Read time appears on post pages.
- Code blocks render cleanly.
- An author block is available.

### Story 2.4: Create tool page layout

Build the shared layout and presentation pieces for tool pages.

Acceptance criteria:

- Tool pages render metadata and description.
- Framework badges are supported.
- Usage notes can be displayed.
- The interactive tool area fits within the layout.

### Story 2.5: Define featured content rules

Allow the home page to surface real featured content.

Acceptance criteria:

- Latest published post can be selected programmatically.
- Featured tool can be selected programmatically.
- The home page no longer depends on hardcoded placeholders.

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
- Quick navigation cards exist for About, Blog, and Tools.
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
- [ ] Story 4.4: Publish three launch posts
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

### Story 4.4: Publish three launch posts

Create the initial published blog content for the MVP.

Acceptance criteria:

- Three published posts exist.
- Frontmatter validates.
- The posts align with the tone defined in the PRD.

### Story 4.5: Add blog SEO and structured data

Complete blog-specific metadata and discoverability work.

Acceptance criteria:

- Blog post pages emit `BlogPosting` JSON-LD.
- Open Graph and Twitter metadata are page-specific.
- Canonical URLs are set.

## Epic 5: Tools Publishing MVP

Purpose: launch the first developer tool and the tools catalog.

Story checklist:

- [ ] Story 5.1: Build tools index page
- [ ] Story 5.2: Build tool detail route
- [ ] Story 5.3: Implement first interactive tool
- [ ] Story 5.4: Publish tool metadata and copy

### Story 5.1: Build tools index page

Create the tools listing page.

Acceptance criteria:

- Published tools display name, description, framework badge, and link.
- Draft tools are not shown.

### Story 5.2: Build tool detail route

Create the route for individual tool pages.

Acceptance criteria:

- Each published tool resolves by slug.
- Metadata and usage notes render on the page.
- Navigation back to the tools index exists.

### Story 5.3: Implement first interactive tool

Build the selected launch tool.

Acceptance criteria:

- The tool is functional in-browser.
- It uses the selected island framework.
- It fits within the shared tool page layout.

### Story 5.4: Publish tool metadata and copy

Complete the launch tool as a content and discovery asset.

Acceptance criteria:

- The tool entry validates against the collection schema.
- Descriptive copy is complete.
- The tool appears on the tools index and can be featured on the home page.

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
