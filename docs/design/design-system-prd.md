# Design System PRD — Portfolio Neutral Editorial System

**Owner:** Iskander Sierra
**Status:** Accepted — Warm Editorial
**Date:** 2026-04-25
**Accepted:** 2026-04-25
**Scope:** Portfolio redesign workstream after the clean-slate refactor

---

## 1. Purpose

This document defines the design system for the current portfolio website after the neutral clean-slate reset.

The goal is to remove all traces of the previous terminal/brutalist identity and replace it with a calm, editorial, content-first system that feels deliberate, modern, and personal.

The design system is not a visual flourish layer on top of the old site. It is the shared language for every page, component, token, and interaction in the portfolio.

---

## 2. Design Goals

### Primary goals

- Make the portfolio feel like a finished personal site, not a repainted shell.
- Keep the interface quiet enough that the content leads.
- Create enough visual identity to feel intentional and distinct.
- Keep the system flexible for blog posts, project pages, and future sections.
- Preserve accessibility, responsiveness, and theme persistence.

### Non-goals

- No terminal styling.
- No signal-graph, orbit, node, or wire motifs.
- No decorative CRT or hacker aesthetics.
- No heavy motion system.
- No design system that depends on a framework-specific component library.

---

## 3. Direction

### Selected direction

**Editorial minimal with soft tactile depth.**

This is the chosen path because it gives the site a neutral, polished feel while still leaving room for personality through typography, spacing, and subtle surface treatment.

### What this means

- Layouts should feel spacious and balanced.
- Surfaces should be soft, layered, and easy to scan.
- Borders and shadows should create separation without visual weight.
- The system should look thoughtful rather than decorative.
- Motion should support reading and navigation, not compete with it.

---

## 4. Visual Principles

### 4.1 Content first

The site exists to present writing, projects, and professional context. Visual treatment should support that content and never dominate it.

### 4.2 Calm confidence

The interface should communicate maturity and clarity. It should feel like a portfolio owned by an experienced engineer who does not need the UI to shout.

### 4.3 Warm neutrality

The palette should stay restrained, but not sterile. A small amount of warmth in surfaces and depth is acceptable if it improves readability and emotional tone.

### 4.4 Consistency over novelty

The system should reward repeated use. Pages, cards, navigation, and metadata blocks should all feel like they belong to the same family.

---

## 5. Typography

### Direction

Use a custom font pairing rather than pure system fonts.

### Chosen approach

- Display / headings: **Fraunces** (variable, optical size 9–144, weight 300–700). A soft serif with character and warmth. Fallback: Georgia, serif.
- Body text: **Inter** (weights 400, 500, 600). Clean geometric sans with excellent screen readability. Fallback: system-ui, sans-serif.
- Code / metadata / labels: **JetBrains Mono** (weights 400, 500). Technical but refined. Fallback: ui-monospace, monospace.

### Typography rules

- Headings use Fraunces at weight 600 with `-0.02em` letter spacing and 1.2 line height.
- Body copy uses Inter at weight 400 with 1.7 line height.
- Monospace is reserved for tags, metadata labels, code blocks, and small technical accents.
- Labels use JetBrains Mono at small size with `0.06em` letter spacing and uppercase.
- Card link text uses JetBrains Mono at small size, weight 500.

### Desired tone

- Modern
- Clear
- Professional
- Slightly warm
- Not corporate

---

## 6. Color System

### Base palette

The palette is neutral and restrained with warm undertones. A terracotta accent provides identity for links and actions. A teal secondary provides contrast for supporting elements.

### Light mode values

| Token | Value | Purpose |
|---|---|---|
| `--bg` | `#f9f9f7` | Page background — near-white with a hint of warmth |
| `--bg-elevated` | `#ffffff` | Elevated containers |
| `--surface` | `#ffffff` | Card and panel backgrounds |
| `--surface-soft` | `#f2f1ef` | Subtle surface tint for tags, toggles |
| `--surface-strong` | `#ffffff` | High-emphasis surfaces |
| `--text-main` | `#1a1a1a` | Primary text |
| `--text-muted` | `#5c5c5c` | Body copy, descriptions |
| `--text-soft` | `#8a8a8a` | Labels, tertiary text |
| `--border` | `rgba(26, 26, 26, 0.10)` | Default borders |
| `--border-strong` | `rgba(26, 26, 26, 0.18)` | Emphasized borders |
| `--accent` | `#b85c38` | Primary accent — terracotta |
| `--accent-2` | `#2a6b5a` | Secondary accent — teal |
| `--shadow-color` | `rgba(26, 26, 26, 0.06)` | Shadow base |
| `--selection-bg` | `#b85c38` | Text selection background |
| `--selection-fg` | `#ffffff` | Text selection foreground |

### Dark mode values

| Token | Value | Purpose |
|---|---|---|
| `--bg` | `#1a1816` | Deep warm brown, not pure black |
| `--bg-elevated` | `#22201d` | Elevated background |
| `--surface` | `#2a2724` | Card backgrounds |
| `--surface-soft` | `#33302c` | Subtle surface tint |
| `--surface-strong` | `#2a2724` | High-emphasis surfaces |
| `--text-main` | `#ede8e0` | Primary text |
| `--text-muted` | `#a8a098` | Body copy |
| `--text-soft` | `#7a736b` | Tertiary text |
| `--border` | `rgba(237, 232, 224, 0.10)` | Default borders |
| `--border-strong` | `rgba(237, 232, 224, 0.18)` | Emphasized borders |
| `--accent` | `#d4845a` | Lighter terracotta for dark surfaces |
| `--accent-2` | `#5ec4a8` | Brighter teal for dark surfaces |
| `--shadow-color` | `rgba(0, 0, 0, 0.20)` | Shadow base |
| `--selection-bg` | `#d4845a` | Text selection background |
| `--selection-fg` | `#1a1816` | Text selection foreground |

### Color behavior

- Light mode feels airy and restrained — the background is near-white, not cream.
- Dark mode uses warm brown tones, not cold void black.
- The terracotta accent is strong enough for links and focus rings without dominating the page.
- Both accents shift lighter/brighter in dark mode to maintain contrast.
- Selection colors remain accessible in both themes.

### Color constraints

- Avoid saturated decorative gradients.
- Avoid purple-heavy defaults.
- Avoid bright glows and heavy chromatic effects.
- Keep background treatment subtle and atmospheric.

---

## 7. Surface And Layout System

### Containers

- Use consistent max widths for content.
- Keep horizontal padding fluid with viewport size.
- Maintain readable line lengths for article-like pages.

### Surfaces

- Cards and panels should use soft borders and low-contrast shadows.
- Surface elevation should be used sparingly and consistently.
- The system should support both dense and airy layouts without changing identity.

### Spacing

- Use a scale that feels generous but not loose.
- Separate major sections clearly.
- Keep internal card spacing comfortable for scanning.
- Prefer rhythm and alignment over ornament.

### Borders and shadows

- Borders are 1px, using `--border` by default and `--border-strong` on hover.
- Card shadows: `0 1px 3px var(--shadow-color), 0 4px 12px var(--shadow-color)` at rest.
- Card hover shadows: `0 4px 8px var(--shadow-color), 0 12px 28px var(--shadow-color)` with a `translateY(-2px)` lift.
- Shadows remain consistent across all card-like components.

### Radius tokens

- `--radius`: `0.5rem` — default for tags, toggles, small elements.
- `--radius-lg`: `0.75rem` — cards, panels, content containers.

---

## 8. Motion System

### Direction

Motion should be subtle and restrained.

### Allowed motion

- Page transitions with gentle fades.
- Small hover lifts or surface shifts on interactive cards.
- Light entrance animations for major content blocks.
- Controlled theme transitions on color and surface changes.

### Motion constraints

- No exaggerated parallax.
- No kinetic backgrounds.
- No busy looping animations.
- No motion that interferes with reading.
- All motion must respect `prefers-reduced-motion`.

### Motion tone

- Calm
- Minimal
- Useful
- Quietly polished

---

## 9. Component Language

### Core components to design

- Header
- Footer
- Theme toggle
- Navigation links
- Cards
- Tags and badges
- Buttons
- Post previews
- Project previews
- Author block
- Content callouts
- Metadata rows

### Component behavior rules

- Components should be reusable across pages without special casing.
- Interactive states should be obvious but not loud.
- Text hierarchy should be consistent across the site.
- Cards should work for both content-heavy and utility-oriented sections.
- Tags and badges should look like system elements, not decorative stickers.

---

## 10. Theme Behavior

### Requirements

- Default to system preference.
- Persist manual preference in local storage.
- Apply theme through `data-theme` on `<html>`.
- Keep the existing theme lifecycle behavior intact.

### Theme constraints

- Theme switching should not cause layout shifts.
- Theme changes should be smooth but fast.
- Color transitions should be limited to relevant properties.
- The system should avoid flash-of-unstyled-theme behavior.

---

## 11. Accessibility Requirements

- Maintain strong contrast for body text and interactive elements.
- Preserve visible focus states.
- Keep semantic HTML structure intact.
- Respect reduced motion settings.
- Make the mobile navigation fully usable at 320px width.
- Ensure typography remains readable on small screens.

---

## 12. Responsive Behavior

### Minimum target widths

- 320px mobile
- 640px large mobile
- 768px tablet
- 1024px desktop
- 1280px wide desktop

### Responsive rules

- Mobile layouts should stack cleanly and avoid cramping.
- Desktop layouts should gain rhythm, not clutter.
- Navigation should collapse cleanly on smaller screens.
- Cards should reflow without losing hierarchy.
- Content pages should keep readable measure across breakpoints.

---

## 13. System Tokens And Implementation Notes

### Tokens to centralize

- Color tokens
- Typography tokens
- Radius tokens
- Shadow tokens
- Spacing scale
- Motion timing tokens

### Files to treat as primary sources

- `src/styles/themes.css`
- `src/styles/global.css`
- `src/layouts/Layout.astro`
- `src/components/layout/Header.astro`
- `src/components/layout/Footer.astro`
- `src/components/ui/Card.astro`

### Implementation rules

- Keep shared styling in global token files.
- Keep page-specific styles local to page components when practical.
- Avoid reintroducing old visual motifs through utility classes or one-off overrides.
- Make the system easy to extend for future blog, project, and personal sections.

---

## 14. Success Criteria

The design system is successful if:

- The site no longer reads as a terminal-themed portfolio.
- The home page feels editorial and deliberate.
- Blog and project pages share a coherent visual language.
- The typography feels polished and personal.
- Motion feels present but restrained.
- The site looks like a unified product rather than a collection of pages.

---

## 15. Resolved Design Decisions

These questions from the proposal phase are now resolved.

| Question | Decision |
|---|---|
| Font family selection | Fraunces (display serif) + Inter (body sans) + JetBrains Mono (code/meta) |
| Accent color values | Terracotta `#b85c38` / `#d4845a` dark + Teal `#2a6b5a` / `#5ec4a8` dark |
| Surface treatment | Soft tactile — gentle shadows, hover lifts, not flat |
| Background texture in dark mode | None — rely on tonal surface layering only |
| Component variants | Handle per component; no shared primitive abstraction layer |
| Background warmth | Near-white `#f9f9f7`, not cream — just enough warmth to avoid clinical feel |

---

## 16. Selected Proposal

**Warm Editorial** (Proposal A) — selected 2026-04-25.

Visual preview: `.ecc-design/slide-previews/proposal-a-warm-editorial.html`

Key identity traits:

- Serif display headings (Fraunces) create editorial personality without heaviness.
- Terracotta + teal accent pair gives warmth and distinction without trendiness.
- Dark mode uses warm browns, not cold blacks — surfaces retain character.
- Cards lift gently on hover with deepening shadows.
- Tags use monospace in pill-shaped containers.
- Card links use monospace at small size with understated underline on hover.

---

## 17. Next Step

Implement the design system into the codebase:

1. Update `src/styles/themes.css` with the resolved color, typography, radius, and shadow tokens.
2. Update `src/styles/global.css` with typography rules, link styles, and remove terminal-era patterns.
3. Update `src/components/ui/Card.astro` to use the new card styling.
4. Update `src/components/layout/Header.astro` and `Footer.astro` for the new header/nav treatment.
5. Update `src/layouts/Layout.astro` to remove the terminal window wrapper.
6. Add Google Fonts link for Fraunces, Inter, and JetBrains Mono.
7. Verify all pages render correctly in both themes.
