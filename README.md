# Ligilarbo

Personal portfolio + humanitarian advocacy site built with Astro.

## Overview

Showcases professional profile plus country advocacy pages for Ukraine, Palestine, Sudan, DRC, and Myanmar with context, impact stats, and actionable donation links.

## Stack

Astro · CSS (custom properties) · Remixicon

## Key Features

- Fast static build & compressed assets
- Profile & curated external tools/projects
- Country advocacy pages (historical context, humanitarian impact, how to help)
- Donation link integrity checking at build time

## Development

Install deps & start dev server:

```bash
npm install
npm run dev
```

Build / preview:

```bash
npm run build
npm run preview
```

## Link Checker (Integration)

A custom integration scans `src/data/*.json` for external URLs, applies realistic headers & retries, and fails the build on broken links (configurable). 403 responses (bot protection) can be treated as OK.

Minimal config example (see `astro.config.mjs` for current values):

```js
brokenLinksIntegration({
  warnOnly: false,
  concurrency: 6,
  timeout: 9000,
  treat403AsOk: true,
  cacheMaxAgeMs: 60_000,
});
```

Skip checking:

```bash
SKIP_LINK_CHECK=1 npm run build
```

## Configuration via .env

You can configure the broken-links integration using environment variables. The project loads a local `.env` file (if present) using `dotenv`. Copy `.env.example` to `.env` and edit the values locally. Precedence is:

- DEFAULTS (built into the plugin)
- values from `.env` / `process.env` (overrides defaults)
- options passed directly to `brokenLinksIntegration()` in `astro.config.mjs` (highest precedence)

Common environment variables:

- `BROKEN_LINKS_WARN_ONLY` — true/false. When true the plugin only warns and does not fail the build.
- `BROKEN_LINKS_STRICT` — set to `1` to force the plugin to fail the build on broken links (overrides warn-only).
- `BROKEN_LINKS_TIMEOUT` — request timeout in milliseconds.
- `BROKEN_LINKS_CONCURRENCY` — number of parallel requests.
- `BROKEN_LINKS_RETRIES` — number of retries for transient errors.
- `BROKEN_LINKS_CACHE` — true/false to enable caching of successful URL checks.
- `BROKEN_LINKS_CACHE_FILE` — cache filename (default `.link-check-cache.json`).
- `BROKEN_LINKS_ALLOW_PATTERNS` — comma-separated list of URL patterns (tried as JavaScript RegExp; invalid regexes are treated as literal strings).
- `BROKEN_LINKS_FAIL_ON` — comma-separated list of numeric HTTP status codes that should be treated as failures.

Example: copy the included `.env.example` into `.env`, set `BROKEN_LINKS_STRICT=1` and run a build to make the CI fail on broken external links.

## License

GPL-3.0 — see [LICENSE](./LICENSE).
