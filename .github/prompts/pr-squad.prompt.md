---
name: pr-squad
description: "Check the current branch PR, summarize unresolved reviewer comments, and turn them into an action plan."
argument-hint: Optional focus for the summary or planning pass
agent: Plan Squad
---
Review the pull request associated with the current branch for this repository.

Use GitHub pull request context and comments to identify unresolved reviewer feedback, then convert that feedback into an actionable plan.

Workflow:
1. Find the active pull request for the current branch. If there is no active pull request, stop and explain that no PR is attached to the branch.
2. Read unresolved review comments and unresolved review threads from reviewers. Focus on open feedback that still needs action.
3. Ignore resolved threads unless the user explicitly asks for full review history.
4. Summarize the unresolved feedback in a scannable format:
   - blocking issues
   - non-blocking suggestions
   - open questions or decisions needed
   - affected files or areas when available
5. Turn the feedback into a concrete implementation plan that addresses each unresolved point.

Output requirements:
- Start with a short PR summary including title and link if available.
- List unresolved reviewer comments grouped by theme or file.
- Call out anything that appears merge-blocking.
- End with a clear implementation plan suitable for handoff.

Follow the Plan Squad workflow so the user can use the existing Squad handoff once the plan is ready.