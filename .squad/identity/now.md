---
updated_at: 2026-03-24T13:40:03Z
focus_area: Home/about graph-field cleanup is closed; remaining Proposal 7 follow-up can return to the deeper About-route content gap
active_issues:
	- The home/about graph-field cleanup is now closed in squad records: the decorative field blocks are removed from both route-local panels, the lower legends and lists remain intact, and the home hero title is back to a constrained multi-line measure that does not intrude into the sidebar.
	- This closure was review-driven: Tank rejected the first pass because the home hero title overflowed after a single-line constraint, and Switch approved the revision once the contained multi-line heading behavior was restored.
	- Coordinator context still matters for future work: GitNexus `detect_changes` reported LOW risk with no affected processes for the touched slice, but the repo already had unrelated dirty-worktree changes outside this request.
---

# What We're Focused On

The home/about graph-field cleanup is now closed. Trinity removed the decorative field blocks from the home sidebar graph and the about profile map while leaving the lower legend and list surfaces intact, so the duplicate labels are gone without reopening shared shell or component work.

Tank rejected the first pass after the home hero title was forced onto one line and began intruding into the sidebar. Switch approved the revision once `src/pages/index.astro` returned the heading to a constrained multi-line measure, and the targeted desktop rendering checks passed on both routes.

Coordinator context for future work is unchanged in the areas that matter: the GitHub squad issue check found no open squad-labeled issues, and GitNexus `detect_changes` reported LOW risk with no affected processes for this slice. The worktree still contains unrelated changes outside this request, so later logging or commit work should keep scope explicit.

With this cleanup closed, the remaining product follow-up can return to the deeper `/about` content gap rather than the decorative field treatment. Reopen the current slice only if a new route-level regression appears beyond the accepted hero containment repair.
