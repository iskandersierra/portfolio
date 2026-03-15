# Launch Design Direction

Status: Accepted  
Date: 2026-03-15  
Issue: #3

## Decision

Proposal 1, Minimalist Terminal, is the launch design baseline for the MVP.

## Rationale

Proposal 1 is the strongest MVP choice because it already aligns with the current implementation and supports the launch priority of technical credibility.

- It matches the current visual language already present in the site shell, hero, and card treatments.
- It preserves the existing slate, indigo, and teal token strategy already implemented in the theme layer.
- It avoids turning a product-decision story into a redesign story.
- It keeps launch effort focused on content, routing, SEO, and feature completeness instead of reworking the visual system.

Proposal 2 and Proposal 3 are not rejected as design directions in general. They are deferred because each would require a more substantial typography and component-system redesign than is justified for the MVP.

## Alignment With Current Token And Styling Strategy

The selected direction aligns with the current implementation in the following areas.

### Theme tokens

- [src/styles/themes.css](../../src/styles/themes.css) already uses a slate-based light and dark theme with indigo and teal accents.
- The current token names, `--bg`, `--surface`, `--text-main`, `--text-muted`, `--border`, and `--accent`, are sufficient for the launch baseline.
- The PRD's broader color intent is preserved even though the implementation uses a simplified token naming scheme.

### Typography roles

- [src/styles/global.css](../../src/styles/global.css) already separates display and body roles.
- Monospaced typography is used for headings, navigation, and terminal-style UI moments.
- The body type remains readable and visually distinct from the monospace shell language.

### Shell and navigation

- [src/components/layout/Header.astro](../../src/components/layout/Header.astro) already matches the proposal's simple top-bar navigation with a terminal-like active state.
- [src/layouts/Layout.astro](../../src/layouts/Layout.astro) provides the persistent shell and theme bootstrapping needed for the selected direction.

### Hero and content cards

- [src/pages/index.astro](../../src/pages/index.astro) already implements a text-led hero with a cursor treatment that fits Proposal 1.
- [src/components/ui/Card.astro](../../src/components/ui/Card.astro) already uses bordered, command-like cards instead of soft editorial or floating playful cards.

## Documented Deviations

The launch baseline is Proposal 1 with the following explicit deviations.

1. The live typography stack uses IBM Plex Mono and Syne instead of the Proposal 1 suggestion of JetBrains Mono and Inter.
2. The implementation uses the existing CSS custom property naming system from [src/styles/themes.css](../../src/styles/themes.css) rather than the more abstract token naming described in the PRD.
3. The current dark-mode accent is teal-driven, while the PRD describes indigo as the primary accent and teal as secondary. This is acceptable for launch because the overall slate, indigo, and teal strategy is still preserved across themes.

These deviations are acceptable for the MVP because they do not change the chosen visual direction. They are implementation details that can be revisited later without reopening the design-direction decision.

## Scope Boundary

This decision closes Story 0.1 only.

- Included: selecting the launch direction, documenting rationale, documenting deviations, and confirming styling alignment.
- Excluded: refactoring typography, redesigning components, changing tokens, or rebuilding the home page.

## Follow-On Work

If the team wants tighter PRD alignment after launch planning is complete, create separate follow-up stories for:

- typography refinement
- token naming normalization
- deeper exploration of the editorial or interactive alternatives
