# Switch — History

## Core Context

- **Project:** A personal portfolio website that presents your professional and personal positioning using the PRD as the implementation blueprint.
- **Role:** UX Designer
- **Joined:** 2026-03-20T09:12:55.530Z

## Learnings

<!-- Append learnings below -->
- Route-local reduced-motion fixes for decorative pulses should target the exact animated pseudo-element and explicitly zero both `animation` and `transition`, so selector specificity does not leave the motion cue active.
- The home hero heading can look stable in isolation and still break the desktop two-column composition; forcing `white-space: nowrap` on that line lets the title and cursor intrude into the sidebar, so the safer pattern is a constrained multi-line measure.
- Review outcome for the home-and-tools continuation pass is still a rejection: the home featured strip inherits the legacy `Card.astro` treatment, so the key entry modules on `/` still read as terminal-era cards instead of Proposal 7 connected modules.
- `src/pages/tools.astro` still contains stale archive-only and terminal-era copy even though tool detail pages already shipped in the Proposal 7 language, so archive messaging now contradicts the product surface.
- `tests/e2e/smoke.spec.ts` mixes valid route-level assertions with one stale UX selector pattern; the featured-card and hover-lift checks still key off `.brutalist-card`, which validates an implementation class instead of the intended home-module surface.
- Proposal 7 is now consistent across the shared shell, archive routes, and detail layouts; the most visible holdover is the home page's shared Card component, which still reads like a generic terminal-era card instead of a connected module.
- The shared Card component currently has a low practical blast radius: editor usage shows it is only referenced from `src/pages/index.astro`, so it is a safe next-step candidate for Proposal 7 refinement without reopening the wider shell.
- `src/pages/tools.astro` still contains sidebar copy saying detail and interactive surfaces are unchanged until a later pass, which now contradicts the shipped tool detail layout and should be corrected as part of the next UX cleanup slice.
- Decorative node maps need a real breakpoint-specific layout plan at 320px; swapping absolute node placement for a grid before labels start collapsing is safer than trying to keep shrinking positioned cards.
- Shared shell overlays inside the header need a higher stacking level than the page-shell content, or visually open menus can still fail pointer interaction because sibling content layers intercept the hit target.
- A 320px layout can pass without horizontal overflow and still fail the mobile-navigation story if the desktop nav is only stacked and target sizes stay under comfortable touch dimensions.
- Reduced-motion support needs to cover persistent motion cues such as blinking cursors, hover lifts, and theme transitions, not just page-entry animations.
- Header and footer link styling currently prioritizes hover and active states; Epic 1 reviews should explicitly verify visible keyboard focus rather than assuming browser defaults are sufficient.
- Reduced-motion overrides need to match the selectors that introduce motion, including root theme-transition selectors and hover-state selectors, or the browser will keep animating the more specific rule.
- Story 2.3 prose styling should stay tightly scoped to a dedicated shell and markdown wrapper so Trinity can wire blog detail routes without inheriting index-page rules.
- Blog detail content needs underlined inline links, constrained measure, and explicit code-block overflow handling because the global shell defaults optimize cards and navigation more than long-form reading.
- Index-page review fixes can stay low risk by swapping structural wrappers instead of restyling chips; a semantic `nav` is enough when the current filter interactions are already clear.
- Proposal 7 review should stay blocked until the shared shell shows unmistakable signal-graph cues, footer links have explicit `:focus-visible` treatment, and the 320px header proves it can avoid horizontal overflow.
- Canonical Playwright startup is restored; the retained validation blocker is stale smoke coverage, so route-local UX cleanup can proceed with `pnpm check`, focused smoke, and `pnpm test:seo` until the shared smoke file is repaired.
- Continuation planning also flagged `/about` as a low-risk route-local candidate, so the home/tools cleanup should be treated as one candidate slice rather than the already-locked next decision.
- The home/tools continuation rejection closed once the home route owned its Proposal 7 modules directly, the tools archive note matched shipped detail behavior, and smoke coverage asserted route-level surfaces instead of legacy `.brutalist-card` classes.
- Final approval can coexist with one known shared smoke-suite gap when the visible home/tools UX is correct and the remaining failing locator is clearly stale test debt rather than a live route regression.
- The home/tools continuation pass is now visually aligned with Proposal 7: the home featured surface uses page-local `signal-module` modules instead of the shared card treatment, and the `/tools` archive note now truthfully describes the shipped detail-module experience.
- The strongest UX closure signal for this slice is route-level validation rather than implementation-class coupling: focused smoke now follows `.signal-module` on home and the generated tool detail route, while GitNexus still reports the touched routes as LOW-risk and route-local.
- `pnpm check` and the focused Playwright subset passed for the approved continuation slice; `pnpm test:seo` is currently flaky at startup on local port `4331`, but the updated tools SEO fixture already matches the new archive description.
