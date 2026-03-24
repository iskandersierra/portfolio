# Launch Design Direction

Status: Accepted  
Date: 2026-03-15  
Updated: 2026-03-24  
Issue: #3

## Decision

Proposal 7, Signal Graph Studio, is the launch design baseline for the MVP.

This supersedes the earlier Proposal 1 launch-baseline call. Proposal 1 remains a useful record of the earlier MVP planning posture, but it is no longer the launch direction the product ships.

## Rationale

Proposal 7 is the strongest launch choice because it now matches the shipped product surface and better expresses the portfolio's systems-thinking positioning.

- It matches the current shared shell, route framing, and connected-module treatments already implemented across the launch routes.
- It supports the PRD themes of architecture, learning, tools, and connected technical depth more directly than the older terminal baseline.
- It keeps the launch decision record aligned with the live implementation instead of preserving a retired baseline in planning docs.
- Proposal 1 helped de-risk the first MVP planning pass, but keeping it as the active baseline would now misstate the shipped experience.

Proposal 1, Proposal 2, and Proposal 3 are not rejected as design directions in general. They remain reference explorations rather than the launch baseline.

## Alignment With Current Token And Styling Strategy

The selected direction aligns with the current implementation in the following areas.

### Theme tokens

- [src/styles/themes.css](../../src/styles/themes.css) and [src/styles/global.css](../../src/styles/global.css) now support the signal-graph atmosphere, layered shell framing, and accent treatment used across the live experience.
- The current token names, `--bg`, `--surface`, `--text-main`, `--text-muted`, `--border`, and `--accent`, remain sufficient for the launch baseline even though the naming stays implementation-oriented.
- The PRD's broader color intent is preserved through the current blue-black, cyan, mint, and indigo-leaning signal treatment.

### Typography roles

- [src/styles/global.css](../../src/styles/global.css) already separates display, body, and system-label roles.
- Exo 2, Azeret Mono, and supporting monospace usage now give the interface the intended Proposal 7 control-layer and signal-label language.
- The body type remains readable while the mono surfaces carry the graph, rail, and metadata cues.

### Shell and navigation

- [src/components/layout/Header.astro](../../src/components/layout/Header.astro) already exposes the indexed control-layer navigation and signal-graph framing used by the launch shell.
- [src/layouts/Layout.astro](../../src/layouts/Layout.astro) provides the persistent signal stage, route rails, and theme bootstrapping needed for the selected direction.

### Hero and content cards

- [src/pages/index.astro](../../src/pages/index.astro) already implements the Proposal 7 home hero as a signal hub with a graph preview and connected modules.
- The launch routes use graph-oriented module framing instead of relying on Proposal 1's terminal-card baseline.

## Documented Deviations

The launch baseline is Proposal 7 with the following explicit deviations.

1. The implementation keeps the existing CSS custom property naming system from [src/styles/themes.css](../../src/styles/themes.css) rather than introducing proposal-specific token names.
2. Legacy structural class names such as `terminal-window`, `terminal-header`, and `terminal-footer` remain in the code even though the rendered UI now follows the Proposal 7 signal-graph direction.
3. Proposal 7 is adapted into the current Astro layout and route structure instead of being rebuilt as an entirely new component system, which keeps the launch scope contained while preserving the intended visual direction.

These deviations are acceptable for the MVP because they do not change the chosen visual direction. They are implementation details that can be revisited later without reopening the design-direction decision.

## Scope Boundary

This decision closes Story 0.1 only.

- Included: selecting the launch direction, documenting rationale, documenting deviations, and confirming styling alignment.
- Excluded: reopening already-shipped Proposal 7 implementation work beyond keeping the launch-direction record accurate.

## Follow-On Work

If the team wants tighter PRD alignment after launch planning is complete, create separate follow-up stories for:

- typography refinement
- token naming normalization
- deeper exploration of alternative directions beyond the Proposal 7 launch baseline
