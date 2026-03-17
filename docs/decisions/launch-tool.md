# Decision: Launch Tool

**Date:** 2026-03-17
**Story:** 0.5 — Select first launch tool
**Status:** Decided

## Summary

Selected launch tool: UUID / ULID generator

## Why This Tool

- Small enough to ship within MVP scope without dragging in unnecessary complexity.
- Provides immediate value to the target audience without needing supporting backend infrastructure.
- Better fits the portfolio's developer-focused positioning than a generic novelty tool.
- Offers a straightforward interaction model, making it a good first tool for validating the shared tools platform.

## Scope Definition

Inputs:

- Format selection: UUID v4 or ULID
- Quantity (integer; default: 1; min: 1; max: 1000)
  - Client-side validation only — no server involvement; the tool is fully static.
  - Non-integer input (decimal, text) is rejected: show an inline error, do not generate.
  - Values below 1 or above 1000 are clamped or rejected with an inline error message; do not silently truncate without feedback.
  - All results are rendered synchronously in-browser for any quantity ≤ 1000; no pagination or streaming is required.

Outputs:

- Generated identifiers rendered in-browser
- Copy-to-clipboard support for the generated results

Framework:

- React island

## Fit Against MVP Constraints

- Zero external services required
- No persistence required
- Works fully client-side
- Easy to document and test as a single focused tool page

## Out Of Scope

- Additional encodings or ID formats beyond UUID v4 and ULID
- Batch export features
- Saved generation history
- Server-side generation APIs

## Follow-On Work

- Implement the interactive generator in Story 5.3.
- Publish the associated content entry and metadata in Story 5.4.
