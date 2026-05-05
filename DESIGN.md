---
name: Iskander Sierra Portfolio
description: Warm technical editorial portfolio for writing, projects, and profile.
colors:
  bg: "#FDF6E3"
  bg-elevated: "#FFFDF7"
  bg-depth: "#F5EDD8"
  surface: "#FFFDF7"
  surface-soft: "#F5EDD8"
  surface-subtle: "#FAF4E5"
  surface-contrast: "#EDE5D0"
  text-main: "#1a1a1a"
  text-muted: "#5c5c5c"
  text-soft: "#8a8a8a"
  border: "#1A1A1A1A"
  border-strong: "#1A1A1A2E"
  accent: "#3A5F4A"
  accent-2: "#A8654D"
  accent-3: "#708090"
  selection-bg: "#3A5F4A"
  dark-bg: "#1C1E1A"
  dark-surface: "#2E3228"
  dark-surface-soft: "#363A30"
  dark-text-main: "#E8E4D8"
  dark-text-muted: "#A8A498"
  dark-border: "#E8E4D81A"
  dark-border-strong: "#E8E4D82E"
  dark-accent: "#6FAF7A"
  dark-accent-2: "#D4926E"
typography:
  display:
    fontFamily: "IBM Plex Serif, Georgia, serif"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, Segoe UI, sans-serif"
    fontWeight: 400
    lineHeight: 1.7
  mono:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, monospace"
    fontWeight: 500
    letterSpacing: "0.06em"
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.75rem"
  xl: "1rem"
  xxl: "1.25rem"
components:
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-main}"
    rounded: "{rounded.lg}"
    padding: "1.35rem"
  nav-link-active:
    textColor: "{colors.accent}"
    typography: "{typography.body}"
    padding: "0.35rem 0.1rem"
  theme-toggle:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.md}"
    padding: "0.45rem 0.75rem"
  card-link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.accent}"
    typography: "{typography.mono}"
---

# Design System: Iskander Sierra Portfolio

## Overview

Creative North Star: "Quiet Authority and Authored Signal"

This starter captures the current launch-direction visual system for the portfolio: warm neutrals, soft editorial structure, and restrained interaction cues around writing, projects, and profile pages. The system is meant to feel authored and senior rather than flashy. Most of the visual weight comes from typography, spacing, borders, and tonal layering instead of loud color or heavy effects.

The interface should read like a current notebook kept by an experienced engineer: precise, calm, and active. Surfaces are lightly framed, metadata is clean and compact, and the accent color appears as a signal rather than a wash. Light mode is the primary voice. Dark mode preserves the same tone without turning the site into a neon devtool surface.

This system explicitly rejects glossy SaaS landing-page patterns, neon-on-black developer-tool theatrics, decorative editorial-magazine tropes used as a shortcut for taste, oversized metric blocks, gradient text, and retro terminal costume. The portfolio should feel deliberate, readable, and quietly distinctive.

**Key Characteristics:**

- Warm paper-like backgrounds with ink-dark text.
- Display type for emphasis, not ornament.
- Soft panel depth instead of loud cards or glass.
- Accent color used as signal, not decoration.
- Motion that supports pacing and state, not spectacle.

## Colors

The palette is built around warm sandstone neutrals with a deep moss green primary accent and an aged rust secondary, emphasizing stability, depth, and warmth without abandoning technical clarity.

### Primary

- **Deep Moss Green** (`#3A5F4A`): The main interactive accent. Used for links, active navigation, selection, and key interactive elements. Conveys stability and depth, grounding the site in a calm, authoritative presence.

### Secondary

- **Aged Rust** (`#A8654D`): A warm secondary accent used for highlights, metadata emphasis, and supporting interactive states. Provides contrast against the green without competing for primary attention.

### Tertiary

- **Muted Slate Gray** (`#708090`): A cool neutral accent for supporting UI elements, subtle labels, and quiet structural moments.

### Neutral

- **Warm Sandstone** (`#FDF6E3`): The main page background in light mode. Provides a human, inviting feel.
- **Lifted Sandstone** (`#FFFDF7`): Elevated surfaces and bright panels.
- **Soft Sandstone** (`#F5EDD8`): Quiet controls, soft panels, and tonal separation.
- **Divider Ink** (`#1A1A1A1A`): Light borders and structural dividers in light mode.
- **Main Ink** (`#1a1a1a`): Core text color and strongest contrast anchor.
- **Quiet Ink** (`#5c5c5c`): Supporting copy, metadata, and lower-priority text.
- **Night Field** (`#1C1E1A`): Main page background in dark mode. Green-tinted deep dark.
- **Night Surface** (`#2E3228`): Main panel and container color in dark mode.
- **Night Ink** (`#E8E4D8`): Primary text in dark mode.
- **Night Quiet Ink** (`#A8A498`): Supporting copy in dark mode.
- **Night Moss** (`#6FAF7A`): Dark-theme accent, lighter green for dark surfaces.

**The Accent Scarcity Rule.** The primary accent is a signal color. Use it for links, active states, and a few focus points. Do not flood sections, large cards, or whole backgrounds with it.

## Typography

**Display Font:** IBM Plex Serif (with Georgia fallback)
**Body Font:** IBM Plex Sans (with system sans fallbacks)
**Label/Mono Font:** IBM Plex Mono

**Character:** IBM Plex Serif provides intellectual rigor, warmth, and an authored feel for headings. IBM Plex Sans is chosen for body copy for its precision, clarity, and reading comfort. IBM Plex Mono serves as the precision layer for labels, dates, and metadata. The unified Plex family creates a cohesive typographic identity across all three roles.

### Hierarchy

- **Display** (600, `clamp(2.75rem, 1.5rem + 4vw, 5.5rem)`, 1.15 line-height): Used for hero statements, page titles, and branded wordmarks such as the site logo.
- **Headline** (600, `clamp(1.75rem, 1.25rem + 1.5vw, 2.5rem)`, 1.2 line-height): Used for section titles and major content blocks.
- **Title** (600, `clamp(1.25rem, 1.1rem + 0.5vw, 1.55rem)`, 1.25 line-height): Used for card titles, content preview headings, and secondary page headings.
- **Body** (400, `1rem` / `16px`, 1.7 line-height): Used for descriptive copy, articles, list content, and narrative sections. Keep long-form content near a 65 to 75 character line length where possible.
- **Label** (500, `0.78rem` with `0.06em` letter-spacing): Used for metadata, theme labels, tags, and short UI descriptors.

**The Scale Lock Rule.** Do not invent new sizes between these steps. If a heading does not fit the hierarchy, use spacing or weight changes instead of a custom font-size.

**The Mono Restraint Rule.** Monospace belongs to metadata and utility labels only. Do not promote it into primary headings or large narrative blocks.

## Elevation

This system uses tonal layering first and shadow second. Depth comes mainly from warm background shifts, quiet borders, and subtle panel contrast. Shadows are present, but they are soft and ambient rather than theatrical.

### Shadow Vocabulary

- **Panel Soft** (`0 1px 3px rgba(26, 26, 26, 0.05), 0 4px 12px rgba(26, 26, 26, 0.06)`): Default soft panel lift for cards, toggles, and bounded content.
- **Panel Standard** (`0 18px 42px rgba(26, 26, 26, 0.08)`): Stronger menu or elevated-layer shadow, used sparingly for dropdowns and more isolated floating surfaces.
- **Hover Lift** (`0 18px 36px color-mix(in srgb, var(--shadow-color) 56%, transparent)`): Interaction shadow for hover-lift surfaces. It should appear as a response to state, not as a permanent resting style.

**The Flat-at-Rest Rule.** Most surfaces should feel structurally calm at rest. Stronger lift belongs to overlays, menus, or interactive hover states, not every container on the page.

## Components

### Navigation

- **Style:** Header navigation is quiet and text-led. Links use body typography, muted text color at rest, and a 1px underline reveal on hover or active state.
- **Brand Mark:** The site logo uses the display font and acts as a stronger typographic anchor than the rest of the nav.
- **Active State:** Active links shift to the primary accent and reveal the underline. State should read clearly without relying on color alone.
- **Mobile Treatment:** The mobile nav uses a framed toggle and bordered sheet treatment, keeping the same warm-surface language as the desktop shell.

### Theme Toggle

- **Shape:** Compact rounded control (`0.5rem` radius) with a soft-surface background.
- **Color Assignment:** Quiet by default, accent-aware on hover or open state.
- **States:** Hover and open states increase border strength, shift text toward the accent, and add the soft panel shadow. Focus uses a visible 2px accent outline with offset.
- **Character:** Feels like a small utility instrument rather than a playful switch.

### Cards / Containers

- **Corner Style:** Standard content panels use `0.75rem` rounding.
- **Background:** Cards sit on `var(--surface)` with a 1px border and the soft panel shadow.
- **Shadow Strategy:** Resting state is soft and quiet. Hover states tighten the border and increase lift slightly.
- **Internal Padding:** Editorial cards currently use `1.35rem`, enough to breathe without turning into oversized blocks.

### Links And Metadata

- **Link Style:** Standard links use the primary accent with underline offset and a restrained hover mix toward the secondary accent.
- **Card Links:** Card footers use monospace styling at small sizes with slightly increased tracking.
- **Metadata:** Dates, tags, and utility labels use the mono system as a structural signal. Keep them short and factual.

### Motion Surfaces

- **Entrance:** Elements use subtle upward fade-in with staggered delays.
- **Hover:** Interactive panels use a small translateY lift with matching shadow change.
- **Transitions:** Color, border, background, box-shadow, and transform transitions stay near the 200ms range and use calm easing curves.

## Do's and Don'ts

### Do

- **Do** keep primary page backgrounds close to `#FDF6E3` in light mode and `#1C1E1A` in dark mode so the warm sandstone field remains consistent.
- **Do** use `#3A5F4A` for links, active navigation, focus-adjacent emphasis, and other high-signal moments.
- **Do** keep most panels on `var(--surface)` with `var(--border)` and `var(--panel-shadow-soft)` rather than inventing new surface treatments per route.
- **Do** reserve IBM Plex Serif for headings, titles, and branded anchors while keeping paragraph text in the body stack.
- **Do** use IBM Plex Mono for tags, dates, and compact metadata where precision helps scanning.
- **Do** preserve visible focus outlines at `2px` with accent color and a clear offset.
- **Do** let spacing, typography, and tone carry the design before reaching for extra color or decorative effects.

### Don't

- **Don't** use glossy SaaS landing-page patterns such as oversized hero metrics, generic feature-card grids, or high-gloss CTA sections.
- **Don't** introduce neon-on-black developer-tool theatrics, electric accent overload, or dark-mode-first styling that changes the brand voice.
- **Don't** add decorative editorial-magazine tropes used as a shortcut for taste, especially ornamental serif flourishes, drop-cap behavior, or over-styled section intros.
- **Don't** use oversized metric blocks as a primary design device.
- **Don't** use gradient text.
- **Don't** turn the portfolio into a retro terminal costume with heavy monospace headings, fake CLI framing, or nostalgic green-on-black UI.
- **Don't** replace the soft panel system with glassmorphism, blur-heavy overlays, or thick colored side accents.
