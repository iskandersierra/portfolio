# Neo — History

## Core Context

- **Project:** A personal portfolio website that presents your professional and personal positioning using the PRD as the implementation blueprint.
- **Role:** Lead Engineer
- **Joined:** 2026-03-20T09:12:55.526Z

## Learnings

<!-- Append learnings below -->
- Epic 1 implementation is ahead of planning status: stories 1.3, 1.4, and 1.5 are already implemented in source and covered by Playwright smoke tests; the remaining work is tracker/documentation alignment, not product code.
- Astro layout scripts that can re-run on client navigation should keep browser-side public APIs stable and isolate listener cleanup behind an internal singleton plus `AbortController`.
- Blog tag filtering and chip active-state logic need to normalize the same trimmed lowercase value, otherwise whitespace-padded query params produce inconsistent results between filtering and UI state.
- Shared focus-visible rules in the prose shell should avoid resetting `text-decoration` when a later `.post-body a:focus-visible` rule intentionally thickens the underline as the focus cue.
