# Decision: Analytics Platform

**Date:** 2026-03-16
**Story:** 0.2 — Choose analytics platform
**Status:** Decided

## Summary

Selected: Umami Cloud (free tier)

## Options Evaluated

| Option             | Cost                 | Infrastructure | Privacy        | Custom Events |
| ------------------ | -------------------- | -------------- | -------------- | ------------- |
| Umami Cloud        | Free (100k events/mo) | None           | No cookies     | Yes           |
| Umami self-hosted  | Free                 | Railway/Render | No cookies     | Yes           |
| Plausible          | $9/month             | None           | No cookies     | Yes           |
| Netlify Analytics  | $9/month add-on      | None           | Server-side    | No            |

## Decision Rationale

**Umami Cloud free tier** is the only option that satisfies all hard constraints:

- **Free:** 100k events/month on the free plan is far above what a personal portfolio needs.
  Plausible and Netlify Analytics both start at $9/month with no permanent free tier.
- **Privacy-first:** No cookies set, fully GDPR-compliant by design. No consent banner required.
- **Zero infrastructure:** No hosting service to manage, unlike self-hosted Umami.
- **Useful data:** Pageviews, unique visitors, referrers, countries, devices, browsers — everything
  needed for a portfolio site.
- **Extensible:** Custom events are supported if needed in the future (e.g., CV download tracking).

Umami self-hosted on Railway is a viable fallback if the cloud free tier ever changes. Migrating
is straightforward since it is the same open-source product.

## Production-Only Loading

The tracking script must not load in development or preview environments. The integration in
`src/layouts/Layout.astro` uses Astro's built-in `import.meta.env.PROD` boolean:

```astro
{
  import.meta.env.PROD && (
    <script
      is:inline
      defer
      src={import.meta.env.PUBLIC_UMAMI_SCRIPT_URL}
      data-website-id={import.meta.env.PUBLIC_UMAMI_WEBSITE_ID}
    />
  )
}
```

`import.meta.env.PROD` is `true` only for production builds (`astro build`). It is `false` during
`astro dev` and Netlify preview deploys (which set `CONTEXT=deploy-preview` — see note below).

> **Note on Netlify preview deploys:** Netlify sets `CONTEXT=deploy-preview` for PR previews.
> If analytics should also be suppressed on preview deploys, check `CONTEXT` at build time and
> set a custom env var (e.g., `PUBLIC_ANALYTICS_ENABLED=true`) only for production context.
> For MVP, `import.meta.env.PROD` is sufficient.

## Environment Variables

Set in the Netlify dashboard under **Site configuration → Environment variables**. Never commit
values to the repository.

| Variable                    | Example value                        | Where to get it         |
| --------------------------- | ------------------------------------ | ----------------------- |
| `PUBLIC_UMAMI_SCRIPT_URL`   | `https://cloud.umami.is/script.js`   | Umami dashboard         |
| `PUBLIC_UMAMI_WEBSITE_ID`   | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` | Umami dashboard → Sites |

Document variable names (without values) in `.env.example` at the repo root.

## One-Time Setup Steps

1. Create an account at <https://umami.is> (free plan).
2. Add a new website → copy the **Script URL** and **Website ID**.
3. Add `PUBLIC_UMAMI_SCRIPT_URL` and `PUBLIC_UMAMI_WEBSITE_ID` to Netlify environment variables
   (production environment only).
4. Add both variable names (no values) to `.env.example`.
5. Integrate the script tag in `src/layouts/Layout.astro` (Story 6.2).

## Out of Scope for This Story

The actual code integration into `Layout.astro` and `.env.example` creation are covered by
**Story 6.2: Integrate analytics in production only**.
