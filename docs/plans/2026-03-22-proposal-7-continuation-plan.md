# Proposal 7 Continuation Plan

> For later pickup. Keep this practical and sequence-driven.

## Current State

- The Proposal 7 redesign is in place for the shared shell plus the home, about, blog archive, projects archive, blog detail, and project detail routes.
- Blog and project detail routes now include adjacent navigation, user-facing copy, and an honest project-detail contract that does not promise unfinished live interactivity.
- Current closure evidence is live-browser verification, Astro checks, and the passing focused Playwright baseline used during the clean-slate follow-up.

## Next Steps

1. Restore canonical validation first.
   Re-run the preferred validation path first so the current slices stay backed by the normal automated evidence before any new route work starts.

2. Re-run the baseline in order.
   Run `pnpm check`, then the focused Playwright smoke path, then any additional focused route checks needed for the detail-layout slice.

3. Refresh the current working note.
   If the canonical smoke run still passes, update the current working note and treat the Proposal 7 foundation as closed until a new scoped story reopens it.

4. Pick the next product slice deliberately.
   Do not reopen the shell or already-closed Proposal 7 routes unless the validation rerun exposes a real regression. The next slice should be scoped before coding and should stay route-local unless a shared-layer change is unavoidable.

## Resume Checklist

- Re-run the canonical smoke coverage and confirm the current baseline still passes.
- Record whether any new validation caveats appeared while replaying the baseline.
- Identify the next product story to claim and write down the exact files and routes it will touch before implementation.
