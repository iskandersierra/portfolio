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
- Quantity

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
