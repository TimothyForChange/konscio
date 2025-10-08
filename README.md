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

## License

GPL-3.0 — see [LICENSE](./LICENSE).
