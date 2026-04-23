# Product Requirements Document — Iskander Sierra's Portfolio

**Version:** 1.0  
**Date:** 2026-03-14  
**Owner:** Iskander Sierra  
**Status:** Draft

---

## Table of Contents

1. [Overview](#1-overview)
2. [Goals & Success Criteria](#2-goals--success-criteria)
3. [Target Audience](#3-target-audience)
4. [Site Structure & Pages](#4-site-structure--pages)
5. [Design System](#5-design-system)
6. [Technical Architecture](#6-technical-architecture)
7. [SEO & Analytics](#7-seo--analytics)
8. [Content Strategy](#8-content-strategy)
9. [MVP — v1 Scope](#9-mvp--v1-scope)
10. [Post-Launch Backlog](#10-post-launch-backlog)
11. [Open Questions](#11-open-questions)

---

## 1. Overview

This portfolio is a **living, personal site** — a professional home on the web for Iskander Sierra, Full-Stack Developer, Software-Architect, and Team-Technical Lead with 25 years of experience. It is not a static CV, but a continuously evolving space that reflects both professional depth and personal character.

### Tagline / Motto

> **"Never stop learning."**

This phrase is the philosophical anchor of the site. It explains why a 25-year veteran still builds games for fun, experiments with new frameworks, writes about ideas, and shares useful projects with the community. It bridges the professional and the personal, and it should be felt throughout the site's tone, copy, and content.

---

## 2. Goals & Success Criteria

| Goal                      | Description                                                     | Success Signal                                                    |
| ------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Living portfolio**      | The site grows continuously with new posts and projects         | Regular content updates post-launch                               |
| **Professional showcase** | Communicates seniority, breadth, and depth at a glance          | A recruiter or CTO understands Iskander's profile in < 30 seconds |
| **Personal expression**   | Reflects the human behind the engineer                          | Passions and personality are present, not just a resume           |
| **Community value**       | Projects and blog posts are genuinely useful to other developers | Returning visitors, shares, and links to projects/posts           |
| **Research playground**   | Used to experiment with new frameworks, libraries, and patterns | Each project or game may use a different tech stack              |
| **Reference hub**         | A single URL to share with anyone interested in Iskander        | All relevant links, projects, and contact points in one place     |

---

## 3. Target Audience

| Audience                           | What They're Looking For                                                          |
| ---------------------------------- | --------------------------------------------------------------------------------- |
| **Recruiters**                     | Seniority signals, tech stack breadth, leadership experience                      |
| **CTOs / Engineering Managers**    | Architecture thinking, .NET depth, cloud/infra experience, team lead track record |
| **Freelance / Consulting Clients** | Reliability, full-stack capability, communication style                           |
| **Fellow Developers**              | Useful projects, honest blog posts, shared interests, open source links           |
| **Personal Network**               | A complete picture of Iskander — professional and personal                        |

---

## 4. Site Structure & Pages

The site uses **multi-page routing** with a persistent top navigation bar and footer.

### 4.1 Routes

| Route              | Page                 | MVP           |
| ------------------ | -------------------- | ------------- |
| `/`                | Home / Hero          | ✅             |
| `/about`           | Professional Profile | ✅             |
| `/blog`            | Blog index           | ✅             |
| `/blog/[slug]`     | Individual post      | ✅             |
| `/projects`        | Projects index       | ✅             |
| `/projects/[slug]` | Individual project   | ✅             |
| `/games`           | Games index          | ❌ Post-launch |
| `/games/[slug]`    | Individual game      | ❌ Post-launch |
| `/personal`        | Personal passions    | ❌ Post-launch |

---

### 4.2 Page Specifications

#### `/` — Home / Hero

The first impression. Should communicate identity immediately.

- **Hero block:** Full-viewport or large hero with name, title(s), and the motto *"Never stop learning."*
- **Expanded motto copy:** 2–3 sentences elaborating on the philosophy. Something along the lines of: *"After 25 years in software, the most valuable thing I've learned is that there's always more to learn. This site is my living proof — a place where I share what I know, experiment with new ideas, build things for the joy of building, and document the journey."*
- **Latest writing section:** Up to 3 featured blog posts, sorted by date descending.
- **Latest projects section:** Up to 3 featured projects, sorted by publish date descending.
- **Subtle animated background or entrance animations** (see Design System).

---

#### `/about` — Professional Profile

A deep but scannable professional profile. Not a wall of text.

**Sections:**

- **Summary:** Who Iskander is in a paragraph. Senior engineer, architect, leader, and lifelong learner.
- **Core expertise:** Visual tag cloud or card grid covering:
  - .NET ecosystem (25 years)
  - Software Architecture & Design Patterns
  - Team Technical Leadership
  - TypeScript / JavaScript (backend + frontend)
  - Docker & Kubernetes
  - Azure Cloud
  - CS fundamentals
- **Experience timeline:** Key career milestones (roles, companies, years) — no need to replicate a full CV, just the arc.
- **Education:** CS background.
- **Philosophy / Working style:** A short personal note. Tie back to the motto.
- **Links:** GitHub, LinkedIn, and any other relevant profiles.
- **CV download:** Optional PDF download link.

---

#### `/blog` — Blog Index

A clean, filterable list of posts.

- **Post card:** Title, date, estimated read time, tags, short excerpt.
- **Tag filter:** Filter posts by tag (e.g. `.NET`, `Architecture`, `Leadership`, `Cloud`, `Career`, `Philosophy`).
- **Pagination or infinite scroll** (pagination preferred for static sites).
- Posts are written in **Markdown** using **Astro Content Collections**.
- No CMS — all content lives in the repository under `src/content/blog/`.

**Frontmatter schema per post:**

```yaml
title: string
date: YYYY-MM-DD
tags: string[]
excerpt: string
readTime: number  # minutes
draft: boolean
featured: boolean
coverImage: string  # optional
projectSlug: string  # optional
series:
  name: string
  part: number
seriesSummary: string  # optional, on part 1
seriesLinks:           # optional, on every series post
  - part: number
    title: string
    slug: string
```

**V1 requirement:** The clean-slate launch may ship with **0 published posts**. The three placeholder launch posts were explicitly removed, and the blog should handle an empty launch state cleanly.

---

#### `/blog/[slug]` — Individual Post

- Full markdown rendering with syntax highlighting (code blocks are essential for a dev blog).
- Author block (consistent, auto-rendered).
- Tags displayed and clickable (link back to filtered blog index).
- Estimated read time.
- Previous / Next post navigation.
- Open Graph meta image per post (auto-generated or per-post custom image).
- No comments system for now.

---

#### `/projects` — Projects Index

A unified catalog of projects built by Iskander. The collection can include tools, repos, and experiments.

- **Project card:** Name, short description, tags, type, and relevant badges or links.
- **Type behavior:** Tool entries can show a framework badge, repo entries can link out, and experiments stay flexible.
- **Interactive detail pages:** Projects with `hasInteractivePage: true` render a dedicated detail page at `/projects/[slug]`.

**V1 requirement:** At least **1 published project** at launch. The first migrated launch entry is the UUID / ULID generator.

**Project ideas (backlog):**

- JSON formatter / validator
- Cron expression builder & explainer
- Regex tester
- Base64 encoder/decoder
- JWT decoder
- Color palette generator
- Markdown previewer
- UUID / ULID generator

---

#### `/projects/[slug]` — Individual Project

- Detail page for a project entry when the item warrants more than an outbound link.
- Optional interactive island for tool-type projects.
- Description, tags, status, and supporting metadata.
- Link back to projects index.

---

#### `/games` *(Post-launch)*

An open-ended section for fun interactive games built by Iskander. Each game is its own experiment — no fixed framework per game.

- Game card: name, short description, tech used, screenshot/preview.
- Individual game pages at `/games/[slug]`.

---

#### `/personal` *(Post-launch)*

A window into Iskander's life outside engineering.

**Sections:**

- **Climbing:** Photos, routes, thoughts on the sport.
- **Health & Fitness:** Philosophy, routines, what works.
- **Philosophy:** Books, ideas, thinkers that have shaped Iskander's worldview.
- Tone: personal, reflective, not performative.

---

### 4.3 Navigation

**Top navigation bar** (persistent, responsive):

- Logo / Name (left) → links to `/`
- Nav links: About · Blog · Projects
- Dark/Light mode toggle (right)
- Mobile: hamburger menu with slide-in drawer

**Footer:**

- Copyright
- Social links (GitHub, LinkedIn)
- Quick links to main sections

---

## 5. Design System

Clean-slate refactor note: the detailed visual system proposals below are retained as historical design exploration, but they are no longer the launch requirement. The current launch baseline is neutral placeholder styling, system fonts, and no decorative signal-graph treatment until the separate design-system workstream is chosen.

### 5.1 Philosophy

Modern, clean, and human. Professional enough for a senior engineer, personal enough to show the human behind the title. Nothing over-engineered visually — the content leads.

### 5.2 Color Palette

Suggested palette — warm neutrals as the base with a confident blue-violet accent and a teal secondary:

| Token                      | Light Mode             | Dark Mode              | Usage                   |
| -------------------------- | ---------------------- | ---------------------- | ----------------------- |
| `--color-bg`               | `#F8FAFC` (slate-50)   | `#0F172A` (slate-900)  | Page background         |
| `--color-surface`          | `#FFFFFF`              | `#1E293B` (slate-800)  | Cards, panels           |
| `--color-border`           | `#E2E8F0` (slate-200)  | `#334155` (slate-700)  | Borders, dividers       |
| `--color-text-primary`     | `#0F172A` (slate-900)  | `#F1F5F9` (slate-100)  | Headings, body          |
| `--color-text-secondary`   | `#64748B` (slate-500)  | `#94A3B8` (slate-400)  | Subtitles, meta         |
| `--color-accent`           | `#4F46E5` (indigo-600) | `#818CF8` (indigo-400) | CTAs, links, highlights |
| `--color-accent-secondary` | `#0D9488` (teal-600)   | `#2DD4BF` (teal-400)   | Tags, badges, accents   |

Rationale: Indigo carries authority and depth (fitting for a senior architect). Teal adds energy and curiosity (fitting for "never stop learning"). Slate neutrals keep everything clean and readable.

### 5.3 Typography

| Role     | Font                            | Weight  |
| -------- | ------------------------------- | ------- |
| Headings | `Inter` or `Cal Sans`           | 600–700 |
| Body     | `Inter`                         | 400–500 |
| Code     | `JetBrains Mono` or `Fira Code` | 400     |

Use system font stack as fallback. Load fonts via Astro's built-in font optimization (Astro 5+ `astro:assets` font loading) or via `@fontsource`.

### 5.4 Dark / Light Mode

- **Default:** System preference (`prefers-color-scheme`).
- **Toggle:** Persistent toggle in the nav bar, preference saved to `localStorage`.
- Implementation: CSS custom properties with a `data-theme` attribute on `<html>`.

### 5.5 Responsive Breakpoints

| Breakpoint | Width    | Target       |
| ---------- | -------- | ------------ |
| `sm`       | ≥ 640px  | Large mobile |
| `md`       | ≥ 768px  | Tablet       |
| `lg`       | ≥ 1024px | Desktop      |
| `xl`       | ≥ 1280px | Wide desktop |

Mobile-first approach. All layouts must work at 320px minimum width.

### 5.6 Animations & Motion

Subtle, purposeful, non-distracting:

- **Page transitions:** Fade-in on route change using Astro View Transitions API.
- **Entrance animations:** Elements fade and slide up slightly on scroll into view (use `IntersectionObserver` or a lightweight library like `motion/react`).
- **Hover states:** Smooth color/shadow transitions on cards and links (`transition: 200ms ease`).
- **Dark/Light toggle:** Smooth theme transition (CSS `transition` on color properties).
- **Respect `prefers-reduced-motion`:** All animations must be disabled/minimized when the user has reduced motion enabled.

---

## 6. Technical Architecture

### 6.1 Stack

| Layer                    | Technology                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------- |
| Framework                | Astro 6                                                                            |
| UI / Interactive Islands | React (primary), open to Svelte/Vue per experiment                                 |
| Language                 | TypeScript throughout                                                              |
| Styling                  | CSS custom properties + scoped Astro styles (no Tailwind required, but acceptable) |
| Content                  | Astro Content Collections (Markdown only for MVP; MDX deferred post-launch)        |
| Deployment               | Netlify                                                                            |
| Package Manager          | pnpm                                                                               |

### 6.2 Project Structure

```text
/
├── public/
│   ├── favicon.svg
│   ├── favicon.ico
│   └── og/                        # Open Graph images
├── src/
│   ├── assets/                    # Images, SVGs
│   ├── components/
│   │   ├── layout/                # Header, Footer, Nav
│   │   ├── ui/                    # Buttons, Cards, Badges, ThemeToggle
│   │   ├── blog/                  # PostCard, PostList, TagFilter
│   │   └── projects/              # ProjectCard, ProjectList
│   ├── content/
│   │   ├── blog/                  # *.md / *.mdx posts
│   │   └── projects/              # *.md project metadata
│   ├── layouts/
│   │   ├── Layout.astro           # Base layout
│   │   ├── BlogPostLayout.astro   # Blog post wrapper
│   │   └── ProjectLayout.astro    # Project page wrapper
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── projects/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── games/                 # Post-launch
│   │   └── personal/              # Post-launch
│   ├── styles/
│   │   ├── global.css             # CSS custom properties, resets
│   │   └── themes.css             # Light/dark token definitions
│   └── utils/
│       ├── content.ts             # Content collection helpers
│       └── seo.ts                 # Meta tag builders
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

### 6.3 Content Collections

Define schemas in `src/content.config.ts` (Astro v5+):

**Blog collection:**

```ts
title: z.string()
date: z.date()
tags: z.array(z.string())
excerpt: z.string()
readTime: z.number()
draft: z.boolean().default(false)
featured: z.boolean().default(false)
coverImage: z.string().optional()
projectSlug: z.string().optional()
series: z.object({
  name: z.string(),
  part: z.number()
}).optional()
seriesSummary: z.string().optional()
seriesLinks: z.array(z.object({
  part: z.number(),
  title: z.string(),
  slug: z.string()
})).optional()
```

**Projects collection (metadata):**

```ts
title: z.string()
description: z.string()
tags: z.array(z.string())
type: z.enum(['tool', 'repo', 'experiment'])
publishedAt: z.date()
draft: z.boolean().default(false)
featured: z.boolean().default(false)
status: z.enum(['active', 'archived', 'wip']).optional()
externalUrl: z.string().url().optional()
hasInteractivePage: z.boolean().default(false)
framework: z.string().optional()
coverImage: z.string().optional()
```

### 6.4 Interactive Islands

- React is the default island framework.
- Project detail pages with interactive surfaces may use Astro islands (`client:load` or `client:visible`).
- This is intentional — the portfolio doubles as a framework experimentation playground.
- Island framework used should be displayed where it helps explain a project's implementation.

### 6.5 Deployment

- Hosted on **Netlify** via the `@astrojs/netlify` adapter (already configured).
- Automatic deploys on push to `main`.
- Preview deployments on pull requests.
- No backend / serverless functions at launch. Static-first.

---

## 7. SEO & Analytics

### 7.1 SEO

Every page must include:

- `<title>` — unique per page.
- `<meta name="description">` — unique per page/post.
- **Open Graph tags:** `og:title`, `og:description`, `og:image`, `og:url`, `og:type`.
- **Twitter/X card tags:** `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`.
- **Canonical URL.**
- **Sitemap:** Auto-generated via `@astrojs/sitemap`.
- **Robots.txt:** Allow all crawlers.
- **Structured data (JSON-LD):** `Person` schema on About page, `BlogPosting` on post pages.

A reusable `<SEO>` component should wrap all meta logic and be used in the base `Layout.astro`.

### 7.2 Analytics

- Use a **free, privacy-friendly analytics platform**.
- Recommended options to evaluate: **Umami** (self-hostable, free), **Plausible** (free tier), **Netlify Analytics** (included in Netlify).
- No Google Analytics (privacy-first preference, GDPR-friendly).
- Analytics script injected at the layout level, skipped in dev mode.

---

## 8. Content Strategy

### 8.1 Blog Topics (initial backlog)

| Category            | Topic Ideas                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------ |
| .NET & Architecture | Clean Architecture in .NET, Vertical Slice Architecture, CQRS patterns, Performance tuning |
| Leadership          | Being a Tech Lead without losing your engineering skills, Code reviews as mentorship       |
| Cloud & Infra       | Azure patterns, containers in production, Kubernetes for .NET devs                         |
| Learning & Career   | How to stay current after 25 years, The value of CS fundamentals                           |
| Philosophy & Health | What climbing taught me about engineering, Stoicism and software                           |

### 8.2 Voice & Tone

- **Direct and experienced** — no fluff, no beginner hand-holding unless intentional.
- **Curious and open** — "never stop learning" means acknowledging what you don't know.
- **Personal but not self-promotional** — share knowledge, not just credentials.
- **Occasional humor** — this is a personal site, not a corporate blog.

---

## 9. MVP — v1 Scope

The v1 launch must include the following and nothing more:

### Must-Have

| #   | Feature                                     | Details                                            |
| --- | ------------------------------------------- | -------------------------------------------------- |
| 1   | **Professional profile page** (`/about`)             | Full about page per spec in §4.2                      |
| 2   | **Blog** (`/blog` + `/blog/[slug]`)                  | Launch-ready blog structure; may ship with zero posts |
| 3   | **Projects page** (`/projects` + `/projects/[slug]`) | At minimum 1 published project                        |
| 4   | **Home / Hero** (`/`)                                | Motto, summary, latest writing, latest projects      |
| 5   | **Dark/Light mode**                         | System default + toggle, persisted in localStorage |
| 6   | **Responsive layout**                       | Mobile, tablet, desktop                            |
| 7   | **SEO basics**                              | Meta tags, OG tags, sitemap, robots.txt            |
| 8   | **Subtle animations**                       | Page transitions + entrance animations             |
| 9   | **Analytics**                               | At least one free analytics platform integrated    |

### Out of Scope for v1

- Games section
- Personal passions section
- Contact form
- Comments on blog posts
- Newsletter / email list
- Search functionality
- i18n / multilingual content

---

## 10. Post-Launch Backlog

Ordered by rough priority:

1. **`/games`** — Games index + first game (open framework choice).
2. **`/personal`** — Climbing, health, philosophy sections.
3. **`/projects`** — Expand the catalog with more repos, experiments, and outward links.
4. **Blog search** — Client-side search (e.g. Pagefind).
5. **RSS feed** — For blog subscribers.
6. **More projects** — Grow the projects catalog across tools, repos, and experiments.
7. **OG image generation** — Dynamic OG images per post (e.g. via Satori).
8. **CV download** — PDF export of professional profile.
9. **Contact** — Simple contact form via Netlify Forms or Formspree, when needed.
10. **Framework experiments** — Intentionally try Svelte, Vue, Solid, etc. in projects/games.
11. **MDX support** — Enable `@astrojs/mdx` for blog posts that need embedded interactive components. Existing `.md` posts require no migration.

---

## 11. Open Questions

| #   | Question                                                                                      | Owner    | Status |
| --- | --------------------------------------------------------------------------------------------- | -------- | ------ |
| 1   | What is the final domain/URL for the site?                                                    | Iskander | ✅ Decided — `https://isksz.com` — Decision: [Production domain decision doc](decisions/production-domain.md). |
| 2   | Which analytics platform to use first — Umami, Plausible, or Netlify Analytics?               | Iskander | ✅ Decided — Umami Cloud (free tier). See `docs/decisions/analytics-platform.md`. |
| 3   | Should the blog support MDX (for interactive components inside posts) or plain Markdown only? | Iskander | ✅ Decided — plain Markdown for MVP. See `docs/superpowers/specs/2026-03-16-content-format-design.md`. |
| 4   | Should the About page include a downloadable CV PDF?                                          | Iskander | ❓ Open |
| 5   | Which design-system path follows the placeholder launch pass: Google Stitch export or Tailwind? | Iskander | ❓ Open |
| 6   | What is the first project to migrate for v1 launch?                                             | Iskander | ✅ Decided — UUID / ULID generator as a tool-type project. Small scope, zero external dependencies, clear inputs/outputs. React island. See `docs/decisions/launch-tool.md`. |
| 7   | Should launch include seeded blog posts, or can the blog start empty?                           | Iskander | ✅ Decided — launch starts empty in the clean-slate refactor; the three placeholder posts are deleted. See `docs/decisions/refactor-clean-slate-2026-04-20.md`. |

---

*This document will evolve as the project grows. Update version and date on each significant revision.*
