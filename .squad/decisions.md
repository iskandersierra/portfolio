# Squad Decisions

## Active Decisions

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

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
