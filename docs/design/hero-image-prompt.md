# Hero Image Prompt — Home Page

Target slot: `home-hero__image` (right column of the hero panel)
Final paths:

- Dark theme: `/public/img/hero.webp`
- Light theme: `/public/img/hero-light.webp`

Aspect ratio: **4 : 5** (portrait, ~413 × 516 px rendered, generate at 2× for retina)

---

## Shared constraints

- Keep the image secondary to the text column.
- Stay calm, technical, and low-noise.
- Use 2–3 dominant nodes, one quieter cluster, and generous negative space.
- No text, UI chrome, people, labels, or decorative clutter.
- Keep the composition related across themes, but not identical.

## Dark asset prompt

Path: `/public/img/hero.webp`

```text
abstract signal-network visualization, a few softly luminous data nodes connected by fine wire paths, deep navy background #06101b, restrained cyan accent glow #57d0ff, teal secondary nodes #63f5c8, faint grid structure at 3rem pitch, gentle atmospheric depth blur, matte light bloom around the central nodes, 25 years of software architecture condensed into a calm signal map, quiet and technical, clean composition, low visual noise, no text, no UI chrome, no faces, editorial digital art, subtle lighting --ar 4:5 --style raw --q 2
```

Dark guidance:

- Preserve clear negative space near the outer edges so the framed presentation reads cleanly.
- Use restrained glow, not sci-fi energy.

## Light asset prompt

Path: `/public/img/hero-light.webp`

```text
abstract signal-network visualization, a few refined data nodes connected by thin wire paths, pale stone background #eef3f1, cool slate lines #4e6472, restrained cyan accents #57d0ff, soft teal secondary nodes #63f5c8, subtle paper-like atmosphere, gentle depth blur, very light localized bloom, clean editorial composition, calm and technical, low visual noise, no text, no UI chrome, no faces, related to the dark-theme composition but with its own cleaner daylight arrangement, generous negative space, understated lighting --ar 4:5 --style raw --q 2
```

Light guidance:

- Make it feel like the same signal language seen in daylight rather than a recolor.
- Reduce contrast and glow so it sits naturally inside the light theme.
- Keep the composition clean and open with readable edges; no added ornaments.

## Shared negative prompt

```text
text, watermark, signature, logo, UI, screenshot, cartoon, anime, 3d render, clay, plastic, oversaturated, rainbow, lens flare, starburst glow, busy background, dense node clutter, people, faces, hands
```

## After generating

1. Export both assets as `WebP`, quality 85, strip metadata.
2. Place them at `public/img/hero.webp` and `public/img/hero-light.webp`.
3. Until the final light asset exists, use `hero.webp` as the temporary stand-in for `hero-light.webp`.
