# Decision: Production Domain

**Date:** 2026-03-17
**Story:** 0.4 — Lock production domain
**Status:** Decided

## Summary

Selected production domain: `https://isksz.com`

## Decision Rationale

- The short domain is easier to remember and share than a longer portfolio-specific alternative.
- `isksz.com` works as the canonical root for both the portfolio and future personal-brand extensions without changing the public identity later.
- The domain is neutral across content types, so it supports the MVP scope cleanly: home page, about page, blog, and tools.

## SEO And Metadata Implications

- Use `https://isksz.com` as the canonical site URL in shared metadata defaults.
- Generate canonical URLs for all routed pages from this origin.
- Use the same origin in Open Graph metadata, sitemap generation, robots configuration, and structured data.

## Deployment Implications

- Netlify production should be configured to serve `isksz.com` as the primary domain.
- If `www.isksz.com` is enabled, it should redirect permanently to `https://isksz.com` to avoid duplicate indexing.
- Environment-specific preview URLs remain non-canonical and must not replace the production origin in metadata.

## Follow-On Work

- Add the canonical URL default to the shared layout metadata inputs in Story 1.1.
- Use the production domain in sitemap, robots, and page-specific metadata work in Epic 6.