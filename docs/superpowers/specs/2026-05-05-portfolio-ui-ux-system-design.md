# Portfolio UI/UX System Design

## 1. Purpose

This document defines the UI/UX system for Iskander Sierra's portfolio based on the current product requirements in [docs/PRD.md](e:/repos/portfolio/docs/PRD.md). It translates the PRD into a coherent visual and interaction system that can guide implementation decisions across the launch routes without drifting into generic portfolio patterns.

The design goal is not novelty for its own sake. The goal is to create a portfolio that feels authored, senior, and alive: a place where writing, projects, and professional profile all support the same idea, "Never stop learning."

## 2. Design North Star

The portfolio should feel like a curated technical field journal.

- Curated: deliberate selection, not content dumping.
- Technical: grounded in engineering practice, not lifestyle branding.
- Field journal: active, current, and evolving rather than static or commemorative.

Visitors should come away with three impressions within the first screen or two:

1. This is a senior engineer with real depth.
2. The work is current, not archival.
3. The person behind the work is thoughtful, disciplined, and still learning.

## 3. Register And Visual Lane

This is a brand surface, not a product interface.

The site exists to communicate professional identity and point of view rather than to support a repeated transactional workflow. That distinction changes the design system:

- Typography carries more of the brand weight.
- Layout rhythm matters more than dense utility packing.
- Content hierarchy is emotional as well as informational.
- Motion, color, and spacing should support narrative pacing rather than dashboard efficiency.

### Visual lane

Use a warm technical editorial lane:

- Warm: lightly tinted neutrals instead of stark white and black.
- Technical: crisp structure, clean metadata, disciplined spacing, no decorative chaos.
- Editorial: strong headlines, reading-first page widths, and section pacing that gives copy room to matter.

### Explicitly avoid

- Glossy SaaS homepage conventions.
- Neon hacker or terminal nostalgia as a costume.
- Generic developer portfolio grids.
- Decorative magazine tropes used without narrative purpose.
- Overdesigned effects that reduce credibility.

## 4. Audience Modes

The interface must support multiple reading modes without forcing the same experience on every visitor.

### Recruiter and hiring manager mode

Needs rapid signal extraction:

- name, title, and seniority visible immediately
- clear route to About
- quick evidence of writing and projects
- strong scannability on mobile and desktop

### CTO and engineering leader mode

Needs judgment and architecture signal:

- concrete technical breadth
- evidence of systems thinking
- projects that imply depth rather than just tooling lists
- writing that suggests clarity and leadership

### Peer developer mode

Needs substance and authenticity:

- useful projects
- real opinions, not generic content marketing
- clear tags and metadata
- a sense that the site is maintained, not abandoned

## 5. Theme Decision

### Default scene

Assume a visitor opens the site during a workday on a laptop, often after comparing several other portfolios in parallel. The interface has to feel readable and composed immediately.

That scene favors a light-first visual baseline.

### Theme strategy

- Default to system preference in implementation.
- Design the primary visual language around light mode first because it best supports high-volume reading and fast evaluation.
- Provide a dark theme that preserves contrast and tone, but do not let dark mode dictate the brand identity.

### Theme intent

- Light mode should feel like warm paper and ink, not blank office white.
- Dark mode should feel restrained and readable, not luminous or theatrical.

## 6. Color System

### Color strategy

Use a restrained palette with warm neutrals and one load-bearing accent.

This project should not use a drenched or multi-accent strategy at launch. The authority comes from composure and typography, not chromatic intensity.

### Palette roles

- Background: warm near-paper neutral.
- Surface: slightly lifted neutral panels for bounded areas.
- Text primary: deep ink-like neutral.
- Text secondary: softened neutral for metadata and support copy.
- Border: quiet structural divider.
- Accent: blue-green or blue-cyan accent used on links, active navigation, selected states, and small emphasis points.
- Accent-muted: low-chroma tint for tag backgrounds, soft highlights, and quiet interactive states.

### Color behavior

- Accent usage should remain sparse and intentional.
- Most layout structure should be achieved with typography, spacing, borders, and surface shifts.
- Empty states, filters, and supporting UI should not compete with titles and content.

## 7. Typography System

Typography is the main expression layer for this portfolio.

### Voice requirements

- Headings must feel confident and authored.
- Body text must remain comfortable for long reading.
- Metadata should feel precise without becoming terminal cosplay.

### Recommended structure

- One primary sans family with enough range for display, headings, and body.
- Optional secondary family for selective display use if it clearly adds voice rather than generic elegance.
- Monospace reserved for metadata, labels, dates, tags, or code-related content only.

### Typographic rules

- Body line length: 65 to 75 characters.
- Heading scale: clear contrast between levels, minimum 1.25 ratio.
- Metadata should be compact but not cramped.
- Avoid all-caps body copy.
- Use spacing and weight contrast before adding decorative styling.

## 8. Layout System

The layout should feel structured but not templated.

### Core rules

- Avoid using identical cards as the dominant page language.
- Keep page widths disciplined for reading, but do not center every section by reflex.
- Use asymmetric starts, varied section spacing, and occasional full-width moments to build rhythm.
- Let headings, rules, lists, and section intros create hierarchy before introducing containers.

### Container behavior

- Global shell should provide consistent horizontal breathing room.
- Content-heavy routes should use narrower readable columns.
- Home and About may break into wider compositions where that improves pacing and evidence density.

### Bounded surfaces

Cards are acceptable for repeatable content like project and article previews, but they should remain utility wrappers, not the whole brand language. Hero, section intros, and major narrative areas should not all be rendered as panels.

## 9. Motion System

Motion should reinforce sequencing and responsiveness, not spectacle.

### Allowed motion

- staged entrance of key sections on first view
- subtle translate and opacity reveal for content blocks
- restrained hover lift or underline changes on interactive elements
- smooth but quiet theme transitions

### Disallowed motion

- bounce, springy theatrics, or novelty easing
- layout-jumping interactions
- decorative animation that does not clarify state or pacing

### Reduced motion

All reveal choreography must collapse cleanly when reduced-motion is enabled. No hidden content should depend on animation to become understandable.

## 10. Navigation System

Navigation has to support both quick evaluation and slower exploration.

### Header

- persistent top navigation
- left side carries name or mark linked to home
- primary links: About, Blog, Projects
- right side carries theme toggle
- mobile uses a drawer or sheet that preserves the same information order

### Navigation behavior

- active page state should be visible without relying on color only
- focus states must be obvious
- the header should stay visually quiet enough that the page content remains primary

### Footer

- secondary navigation and external profile links
- copyright or ownership line
- no bloated footer taxonomy at launch

## 11. Page Patterns

## 11.1 Home

The home page is the thesis statement.

Required sections:

- hero with name, motto, and short philosophy copy
- featured writing
- featured projects

Design rules:

- the hero should carry the strongest typographic moment on the site
- proof should follow quickly after the philosophy
- if blog content is empty, the empty state should feel intentional and calm, not apologetic

## 11.2 About

The About page is evidence architecture.

Required sections:

- summary
- current focus
- expertise grouping
- experience arc or timeline
- education and philosophy
- profile links and optional CV

Design rules:

- density can increase here, but scanning must remain easy
- major facts should be chunked into clearly separated sections
- avoid turning the page into a résumé document dump

## 11.3 Blog Index

The blog index is a reading surface.

Required behaviors:

- clear post hierarchy by title and date
- visible tags and read time
- filtering by tag
- empty launch state handled gracefully

Design rules:

- filters should be present but secondary
- titles and excerpts should dominate the visual hierarchy
- the page should feel lighter and more text-led than the projects index

## 11.4 Blog Post

The post page is the longest reading environment and should be the most typographically disciplined route.

Required behaviors:

- strong markdown rendering
- readable code blocks
- tags, author block, read time, previous and next navigation

Design rules:

- maintain a calm reading width
- separate article content from supporting metadata without heavy paneling
- syntax highlighting should fit the site palette rather than importing a disconnected theme

## 11.5 Projects Index

The projects index is an object catalog rather than a reading queue.

Required behaviors:

- clear differentiation between tool, repo, and experiment
- concise descriptions and tags
- obvious handling of internal versus external destinations

Design rules:

- use stronger meta labeling than on blog cards
- introduce slightly more object-like structure than the blog index without becoming a dashboard
- framework or status details should support evaluation, not dominate it

## 11.6 Project Detail

Project detail pages should combine explanation and utility.

Required behaviors:

- project context, status, tags, related links, and optional interactive surface
- path back to the projects index

Design rules:

- support both scanning and use
- where an interactive tool exists, surrounding copy should explain why it exists and what it demonstrates
- interactive surfaces should feel integrated into the page language rather than embedded as foreign widgets

## 12. Content Hierarchy Rules

Across the entire site, hierarchy should follow this order:

1. identity and philosophy
2. current evidence
3. deeper context
4. secondary metadata

Applied consequences:

- headings should not be weaker than badges or UI chrome
- metadata should not outshout titles
- supporting labels should stay short and factual
- decorative copy should be avoided

## 13. Empty, Sparse, And Growth States

The launch intentionally allows sparse content. The system has to make sparsity feel deliberate.

### Empty writing state

Use calm language that implies an active publishing practice rather than a missing feature.

### Small project catalog

If only one project is published, treat it with weight instead of exposing the site as thin through empty structural shells.

### Growth rule

The system must scale from a nearly empty launch to a richer body of writing and projects without needing a visual redesign. This means relying on repeatable spacing, metadata patterns, and list structures rather than one-off decorative compositions.

## 14. Accessibility Requirements

- target WCAG 2.2 AA
- preserve strong contrast in both themes
- full keyboard access for navigation, filters, toggles, and interactive projects
- visible focus indicators on all controls and links
- semantic heading structure per page
- reduced-motion support for all animated surfaces
- no information encoded by color alone
- interactive elements sized and spaced for touch on small screens

## 15. Responsive Strategy

The site should remain composed at 320px and still feel designed, not merely compressed.

### Mobile priorities

- keep key value proposition above the fold
- reduce decorative spacing before reducing clarity
- stack content in the order of reading importance
- preserve tap comfort and clear navigation

### Desktop priorities

- use width for rhythm, not just for larger cards
- allow asymmetric compositions where they strengthen scanning
- keep reading measures disciplined even on wide screens

## 16. Implementation Implications

This system design implies the following implementation choices:

- tokens should live centrally in shared theme and global style files
- page-specific compositions should remain local to each Astro page or component
- SEO and metadata should preserve route-specific voice while staying structurally consistent
- motion utilities should be reusable and respect reduced-motion preferences
- content lists should be flexible enough to support true empty states and sparse launch content

## 17. Non-Goals

This launch design should not attempt to:

- become a personal operating system or dashboard
- imitate high-gloss startup marketing sites
- rely on visual complexity to compensate for content volume
- introduce multiple competing visual motifs
- overfit the design to a single hero effect

## 18. Acceptance Criteria

The design system is successful when:

1. the home page communicates identity, seniority, and point of view within the first screen
2. About reads as structured evidence, not biography sprawl
3. blog and projects feel like distinct content modes with one shared voice
4. sparse launch content still feels intentional
5. both light and dark themes feel coherent and accessible
6. the interface avoids generic portfolio and SaaS-template signals

## 19. Open Follow-Up Decisions

The design direction above is stable enough for implementation, but these follow-up decisions should be made before visual polish work begins:

1. exact font pair or single-family typographic system
2. final OKLCH token values for both themes
3. whether Home uses one standout visual artifact beyond typography, such as a rule system, diagrammatic motif, or editorial image treatment
4. whether the post-launch design-system workstream keeps this restrained lane or pushes toward a more committed brand color strategy
