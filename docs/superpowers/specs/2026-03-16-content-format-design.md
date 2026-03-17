# Content Format Decision: Markdown vs MDX

**Date:** 2026-03-16
**Story:** 0.3 — Decide Markdown or MDX for blog MVP
**Status:** Decided

---

## Decision

Plain Markdown (`.md`) is the content format for all MVP blog posts.

MDX is explicitly deferred as post-launch work.

---

## PRD references closed by this decision

- **Open Question #3** (`docs/PRD.md §11`): "Should the blog support MDX or plain Markdown only?" — **Decided: plain Markdown for MVP.**
- **Technical Architecture table** (`docs/PRD.md §6.1`): The Content row listed "Astro Content Collections (Markdown + MDX)". That was a pre-decision placeholder. This record supersedes it for MVP scope. The project structure comment `*.md / *.mdx posts` is similarly deferred.

---

## Rationale

- Launch posts cover architecture, leadership, and learning philosophy — pure text, headings, lists, and code blocks. No embedded components are needed.
- The PRD blog page spec specifies "Posts are written in Markdown using Astro Content Collections."
- Presentation concerns (author block, tags, read time, prev/next navigation) belong in the Astro post layout, not in post bodies. MDX adds no value when the layout handles all of this.
- Astro's built-in Shiki integration handles syntax highlighting without MDX.
- MDX is a clean additive step post-launch: add `@astrojs/mdx`, and existing `.md` files continue working unchanged. No migration required.
- No `@astrojs/mdx` integration is present in `astro.config.mjs` and none should be added until the post-launch evaluation is triggered.

---

## Implementation

### File location

```text
src/content/blog/<slug>.md
```

### Frontmatter schema (per PRD)

```yaml
title: string
date: YYYY-MM-DD
tags: string[]
excerpt: string
readTime: number   # minutes
draft: boolean
coverImage: string # optional
```

### Syntax highlighting

Use Astro's built-in Shiki integration. No additional packages required.

### Layout responsibilities

The Astro post layout template renders all post chrome — author block, tags, read time, previous/next navigation. Post bodies contain content only.

---

## Post-launch work

- Evaluate MDX when a post needs an embedded interactive component (live demo, custom callout, interactive diagram).
- To enable: install `@astrojs/mdx`, add it to `astro.config.mjs`. Existing `.md` posts are unaffected.

---

## Acceptance criteria

- [x] The launch content format is explicitly chosen: **plain Markdown**.
- [x] MDX is deferred and recorded as post-launch work.
