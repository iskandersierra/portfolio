# Scribe — History

## Core Context

- **Project:** A personal portfolio website that presents your professional and personal positioning using the PRD as the implementation blueprint.
- **Role:** Session Logger
- **Joined:** 2026-03-20T09:12:55.532Z

## Learnings

<!-- Append learnings below -->
- When a route-local UI cleanup is rejected for a temporary layout regression and then approved after a narrow follow-up, merge the implementation, rejection, and revision into one canonical decision and let the session log carry the review sequence.
- When implementation and QA inbox entries describe the same fix, merge them into one consolidated decision block and keep the approval trail in session and orchestration logs.
- When the inbox includes user directives alongside implementation and review notes, fold the directives into the main ledger as scope constraints and keep the execution evidence in the log files.
- When PR review threads stay open after follow-up fixes, record closure from current branch behavior plus the latest successful validation run instead of mirroring stale GitHub thread state in the decision ledger.
- After merging PR-specific inbox notes into the ledger, clear the processed inbox files and keep the detailed sequence in session and orchestration logs rather than duplicating it in multiple decision entries.
- When a content-story decision is closed by existing publish-date ordering and QA validates the rendered home-page surface, keep the ledger entry consolidated and record the validation caveat separately in the session snapshot.
- For shell redesign batches, keep the shared-direction decision consolidated in `decisions.md` and record open re-review or QA follow-up separately in session and orchestration logs until the validation notes arrive.
- When a shell redesign follow-up only repairs blockers and refreshes test expectations, fold the repair and QA closure back into the existing shell decision instead of creating a second near-duplicate ledger entry.
- For archive-page redesign slices, keep visual-framing changes and any runtime query-sync repairs in one consolidated decision entry, then record the review and QA sequence in orchestration and session logs rather than splitting the ledger into multiple archive decisions.
- When a route-local design slice combines implementation, copy guidance, accessibility review, and follow-up QA, keep one consolidated route decision in the ledger and use orchestration plus session logs to preserve the sequence of review and revision work.
- When a shared detail-layout slice spans blog and tool routes, merge earlier route-specific layout decisions into one newer ledger entry and keep any environment-specific validation caveats in the session snapshot instead of the canonical decision.
- When continuation planning surfaces multiple route-local follow-up candidates without consensus, record the shared validation constraints and scope guardrails in `decisions.md`, then keep the competing slice recommendations in `now.md` and the session log instead of canonizing one winner.
- When late review or QA inbox notes arrive after an initial logging pass, write a second delta session entry and refresh `now.md` to the active slice instead of rewriting the earlier log as if the interim state never existed.
- When a rejected route-local slice closes on the next revision cycle, replace the rejection-focused `now.md` narrative with the accepted validation evidence and shift the focus note to the next remaining candidate instead of preserving stale in-progress language.
- When final approval arrives with a narrow shared-test caveat, log the product slice as closed and carry the leftover automation debt separately so the focus note does not misstate a live regression.
