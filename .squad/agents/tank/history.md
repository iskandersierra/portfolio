# Tank — History

## Core Context

- **Project:** A personal portfolio website that presents your professional and personal positioning using the PRD as the implementation blueprint.
- **Role:** QA Engineer
- **Joined:** 2026-03-20T09:12:55.531Z

## Learnings

<!-- Append learnings below -->
- Epic 1 closure reviews need explicit reduced-motion checks for theme transitions, hover transforms, and persistent cues like the cursor blink; the current smoke coverage only verifies page-entry motion.
- Theme persistence regression coverage should navigate through client-routed header links and assert `data-theme`, toggle `aria-*` state, and `localStorage` after each hop.
- Header layout regressions should be guarded with explicit viewport-specific geometry assertions: mobile should keep brand and actions on one top row at 320px, while desktop should verify centered nav and right-flush actions independently.
- The header fix is stable when desktop owns the three-column wrapper and mobile overrides only that wrapper at `max-width: 640px`; remaining QA risk is narrow mid-width squeeze above the mobile breakpoint rather than the original row-drop regression.
