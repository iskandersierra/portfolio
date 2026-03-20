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

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
