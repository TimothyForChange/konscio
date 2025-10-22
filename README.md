# 🌍 Timothy for Change

Advocacy site analysing structural violence built with Astro.

## Requirements

This project requires Node.js version 24.x or 25.x and npm version 11.6.2 or higher. See the `engines` field in `package.json` for details.

## Overview

A platform analysing structural violence, exploring the historical and economic roots of crises across the Global South.

## Fact Checking & Localisation 🔍

If you spot any factual errors or would like to help with localisation, please open an issue. See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## Security

For security-related concerns or reporting vulnerabilities, please refer to [SECURITY.md](SECURITY.md).

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

## Linting & Formatting

To lint and auto-fix code, run:

```bash
npm run lint
```

To format code with Prettier:

```bash
npm run format
```

## Schema Generation

To regenerate JSON schemas from Zod definitions, run:

```bash
npm run generate:schemas
```

This script will update files in `src/schemas/json/` automatically. Do not edit these files manually.

## Project Structure

The project is organised with a standard Astro project layout:

- `src/assets/`: Contains static assets like scripts and other resources.
- `src/components/`: Holds reusable UI components (e.g., cards, buttons).
- `src/constants/`: Defines shared constants and configuration values.
- `src/data/`: Stores all content, primarily in JSON files.
  - `src/data/countries/`: Contains the detailed JSON data for each country.
  - `src/data/mapping/`: Includes files for listing and mapping country metadata.
- `src/layouts/`: Defines the basic page structure and templates.
- `src/pages/`: Contains all pages and routes for the website.
- `src/schemas/`: Defines Zod schemas for validating all data structures.
- `src/styles/`: Contains global CSS, including variables and resets.
- `src/types/`: Defines TypeScript type definitions.
- `src/utils/`: Contains utility functions and helpers.
- `src/validators/`: Contains validation functions for data structures.
- `public/`: Stores static assets like images and fonts.

## Adding a New Country

To add a new country to the site, follow these steps:

1.  **Create a Country Data File**: Add a new JSON file for the country in the `src/data/countries/` directory (e.g., `my-country.json`). Ensure its structure conforms to the schema defined in `src/schemas/json/country-data.schema.json`.

2.  **Update Country List**: Open `src/data/mapping/countries.ts` and add a new country object to the `countries` array. This object contains metadata like the country's name, slug, flag, and a brief description.

3.  **Add a Country Image (Optional)**: Place a WebP image for the country flag or a representative photo in the `public/countries/` directory.

## Stack

Astro · CSS (custom properties) · Remixicon

## License 📜

This repository is released under CC0 1.0 Universal. See the [LICENSE](LICENSE) file for details.
