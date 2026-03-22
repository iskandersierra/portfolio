# Proposal 7 Continuation Plan

> For later pickup. Keep this practical and sequence-driven.

## Current State

- The Proposal 7 redesign is in place for the shared shell plus the home, about, blog archive, tools archive, blog detail, and tool detail routes.
- Blog and tool detail routes now include adjacent navigation, user-facing copy, and an honest tool-detail contract that does not promise unfinished live interactivity.
- Current closure evidence is live-browser verification plus Astro checks. The preferred Playwright validation path is still blocked by local port `4331` state.

## Next Steps

1. Restore canonical validation first.
   Free port `4331`, then rerun the preferred validation path so the current slices are backed by the normal automated evidence instead of fallback-only browser checks.

2. Re-run the baseline in order.
   Run `pnpm check`, then the focused Playwright smoke path, then any additional focused route checks needed for the detail-layout slice.

3. Clear the validation caveat.
   If the canonical smoke run passes, update the current working note and treat the Proposal 7 foundation as fully closed.

4. Pick the next product slice deliberately.
   Do not reopen the shell or already-closed Proposal 7 routes unless the validation rerun exposes a real regression. The next slice should be scoped before coding and should stay route-local unless a shared-layer change is unavoidable.

## Resume Checklist

- Confirm whether port `4331` is free and the canonical Playwright server can start.
- Re-run the canonical smoke coverage and record whether the fallback-only validation caveat can be removed.
- Identify the next product story to claim and write down the exact files and routes it will touch before implementation.
