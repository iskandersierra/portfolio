# Switch — History

## Core Context

- **Project:** A personal portfolio website that presents your professional and personal positioning using the PRD as the implementation blueprint.
- **Role:** UX Designer
- **Joined:** 2026-03-20T09:12:55.530Z

## Learnings

<!-- Append learnings below -->
- A 320px layout can pass without horizontal overflow and still fail the mobile-navigation story if the desktop nav is only stacked and target sizes stay under comfortable touch dimensions.
- Reduced-motion support needs to cover persistent motion cues such as blinking cursors, hover lifts, and theme transitions, not just page-entry animations.
- Header and footer link styling currently prioritizes hover and active states; Epic 1 reviews should explicitly verify visible keyboard focus rather than assuming browser defaults are sufficient.
- Reduced-motion overrides need to match the selectors that introduce motion, including root theme-transition selectors and hover-state selectors, or the browser will keep animating the more specific rule.
