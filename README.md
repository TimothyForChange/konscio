# Ligilarbo

Personal portfolio and humanitarian advocacy site built with Astro.

## Overview

Profiles professional work and curated advocacy pages for multiple country crises, with historical context, impact data, and vetted resources.

## Stack

Astro · CSS (custom properties) · Remixicon

## Quick Start

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Build and preview the static site:

```bash
npm run build
npm run preview
```

## Link-check integration

The project includes a build-time link checker that validates external URLs referenced in `src/data/*.json`. Its behavior is configurable in `astro.config.mjs` and via environment variables. To skip link checks for a run, set `SKIP_LINK_CHECK=1`.

## Configuration (.env)

Copy `.env.example` to `.env` to override defaults. Common variables control timeout, concurrency, retries, and whether failures should only warn.

## License

This repository is released under CC0 1.0 Universal. See the `LICENSE` file for details.
