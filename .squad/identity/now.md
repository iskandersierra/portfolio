---
updated_at: 2026-03-23T13:26:35Z
focus_area: Proposal 7 home/tools continuation slice is closed; remaining migration work can return to the route-local About gap
active_issues:
	- The home/tools continuation pass is now closed in squad records: the home featured surface moved to page-local signal modules, the tools archive note matches the shipped connected-module detail experience, and the shared `Card.astro` layer stayed untouched.
	- Recorded closure evidence is `pnpm check`, focused smoke coverage over the intended route-level UX, and a passing `pnpm test:seo` run; the only remaining shared follow-up is one stale canonical reduced-motion hover-lift locator that still targets `.brutalist-card` instead of `.signal-module`.
	- If Proposal 7 migration continues, `/about` is the remaining route-local candidate; any future full-smoke regression sweep should only reopen this closed slice if it exposes a new product failure beyond that known stale locator.
---

# What We're Focused On

The Proposal 7 detail-layout batch remains closed. Blog and tool detail routes now share the approved connected-module framing, preserve the established prose contract, and expose adjacent navigation without reopening the shared shell, SEO, or helper-layer decisions already in force.

The completed slice also removed internal and placeholder detail-page language, stopped tool detail pages from implying unfinished live interactivity, and kept the tool sidebar useful by retaining a stable registry link even when adjacent tool data is limited.

Tank's continuation checks confirmed the old environmental caveat is cleared because canonical Playwright automation now starts on port 4331 again. The retained blocker moved to stale smoke assertions rather than startup failure, and the revision cycle repaired those targeted assertions on the live Proposal 7 surface.

The home/tools continuation slice is now closed. Switch's earlier rejection is satisfied in the current record: the home featured-content surface no longer relies on the legacy shared-card treatment, the `/tools` archive note matches the already-shipped detail experience, and the route stays inside the route-local scope guard that leaves `src/components/ui/Card.astro` untouched.

Tank's follow-up QA note narrowed the smoke repair to two explicit updates: allow the current shared-shell header height range and target `.home-hero` for reduced-motion entrance checks. Those fixes are now reflected in the focused smoke path, and the recorded closeout validation is `pnpm check`, focused route-level smoke coverage, and `pnpm test:seo`.

Trinity's implementation handoff proved to be the correct path: the home featured strip is now route-local signal-module work in `src/pages/index.astro`, `src/pages/tools.astro` carries the corrected registry language, and Morpheus's copy revision keeps the archive note aligned with the shipped conditional-interactivity contract on detail pages.

Switch's final re-review approved the slice after those route-local fixes landed. The remaining smoke-suite debt is narrowed to one stale reduced-motion hover-lift locator that still points at `.brutalist-card`; treat that as shared test maintenance, not as a reason to reopen the closed home/tools product slice.

With the revision cycle closed, Proposal 7 focus can return to the remaining `/about` migration gap if another product slice is opened. The home/tools cleanup pass should stay closed unless new regression evidence appears.
