# Analytics Integration Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate Umami Cloud analytics into the portfolio site so tracking loads only in production builds.

**Architecture:** Two files are touched. A `.env.example` documents the required env var names without values. `Layout.astro` gets a single `<script>` tag inside `<head>`, conditionally rendered with `import.meta.env.PROD` so it never fires in local dev or test builds.

**Tech Stack:** Astro 6, Netlify (env vars set in Netlify dashboard), Umami Cloud

> **Out of scope:** Netlify preview deploys also run `astro build` and will include the script tag unless suppressed separately (via `CONTEXT=deploy-preview` check). This is a future improvement; `import.meta.env.PROD` is sufficient for MVP.

---

## Chunk 1: Env var documentation + script injection

### Task 1: Create `.env.example`

**Files:**

- Create: `.env.example`

- [ ] **Step 1: Create the file**

  ```dotenv
  # Analytics (Umami Cloud — set real values in Netlify dashboard, never commit them)
  PUBLIC_UMAMI_SCRIPT_URL=
  PUBLIC_UMAMI_WEBSITE_ID=
  ```

  Save to `.env.example` at the repo root.

- [ ] **Step 2: Verify the file was created correctly**

  Run: `cat .env.example`

  Expected output: the two lines above with empty values.

- [ ] **Step 3: Commit**

  ```bash
  git add .env.example
  git commit -m "chore: add .env.example for Umami analytics variables"
  ```

---

### Task 2: Add Umami script to `Layout.astro`

**Files:**

- Modify: `src/layouts/Layout.astro:13-18` (inside `<head>`, after existing `<meta>` tags)

- [ ] **Step 1: Add the script tag**

  In `src/layouts/Layout.astro`, add the following inside `<head>`, after the `<title>` tag and before the theme-init `<script is:inline>` block:

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

  The full `<head>` section should look like:

  ```astro
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>

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

    <script is:inline>
      (function () {
        // ... existing theme-init code
      })();
    </script>
  </head>
  ```

- [ ] **Step 2: Run `astro check` to confirm no TypeScript errors**

  Run: `pnpm astro check`

  Expected: no errors.

- [ ] **Step 3: Verify the script is absent in dev mode**

  Run: `pnpm dev` and open `http://localhost:4321` in a browser. View page source.

  Expected: no `umami` or `PUBLIC_UMAMI_SCRIPT_URL` script tag in the HTML.

- [ ] **Step 4: Verify the script is present in a production build**

  First, set dummy env var values so the build has something to render:

  ```bash
  PUBLIC_UMAMI_SCRIPT_URL=https://cloud.umami.is/script.js \
  PUBLIC_UMAMI_WEBSITE_ID=test-id-placeholder \
  pnpm build
  ```

  Then grep the built HTML:

  ```bash
  grep -r "umami\|PUBLIC_UMAMI" dist/
  ```

  Expected: at least one match showing the script tag with `src` and `data-website-id` attributes in the built HTML files.

- [ ] **Step 5: Commit**

  ```bash
  git add src/layouts/Layout.astro
  git commit -m "feat: add Umami analytics script, production-only (Story 6.2)"
  ```

---

## Netlify Setup (one-time, manual — not scripted)

After deploying, set these in the Netlify dashboard under **Site configuration → Environment variables**, scoped to the **Production** environment only:

| Variable | Value |
| --- | --- |
| `PUBLIC_UMAMI_SCRIPT_URL` | `https://cloud.umami.is/script.js` |
| `PUBLIC_UMAMI_WEBSITE_ID` | UUID from your Umami dashboard → Sites |

Redeploy after setting the variables. Confirm with: open the live production URL, view source, look for the `<script ... data-website-id="..."` tag in `<head>`.
