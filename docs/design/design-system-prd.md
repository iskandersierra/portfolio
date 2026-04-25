# Design System PRD — Portfolio Neutral Editorial System

**Owner:** Iskander Sierra
**Status:** Proposed
**Date:** 2026-04-25
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

- Primary text: a modern sans serif with clean geometry and strong readability.
- Secondary and code-like text: a refined monospace used for metadata, labels, code, and small technical accents.

### Typography rules

- Headings should be strong but not heavy.
- Body copy should stay highly readable at normal and small sizes.
- Monospace should be reserved for utility, labels, code blocks, and technical metadata.
- Letter spacing should be subtle and only used where it improves clarity.
- Font choices should not feel trendy or experimental.

### Desired tone

- Modern
- Clear
- Professional
- Slightly warm
- Not corporate

---

## 6. Color System

### Base palette

The palette should remain neutral and restrained, with a small amount of accent color for links, actions, and emphasis.

### Recommended semantic tokens

- `--bg`
- `--bg-elevated`
- `--surface`
- `--surface-strong`
- `--surface-soft`
- `--text-main`
- `--text-muted`
- `--border`
- `--border-strong`
- `--accent`
- `--accent-2`
- `--shadow-color`
- `--selection-bg`
- `--selection-fg`

### Color behavior

- Light mode should feel airy and restrained.
- Dark mode should feel deep but still soft, not high-contrast neon.
- Accent color should be strong enough for links and focus states, but not dominate the page.
- Selection colors should remain accessible in both themes.

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

- Borders should be thin and understated.
- Shadows should create subtle separation rather than a dramatic floating effect.
- Shadows should remain consistent across component types.

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

## 15. Open Implementation Questions

These are the remaining delivery details that can be refined during implementation.

- Exact font family selection.
- Exact accent color values.
- Whether surfaces should lean more flat or more tactile.
- How much background texture, if any, should survive in dark mode.
- Whether component variants should be codified in shared primitives or handled per section.

---

## 16. Next Step

Translate this PRD into implementation tasks for the shared layout, theme tokens, typography, cards, and page-level surfaces.
