# Timothy for Change

Humanitarian advocacy site built with Astro.

## Overview

A platform for critical humanitarian analysis, exploring the historical and economic roots of crises across the Global South.

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

## Project Structure

The project is organised with a standard Astro project layout:

- `src/pages/`: Contains all pages and routes for the website.
- `src/layouts/`: Defines the basic page structure and templates.
- `src/components/`: Holds reusable UI components (e.g., cards, buttons).
- `src/data/`: Stores all content, primarily in JSON files.
  - `src/data/countries/`: Contains the detailed JSON data for each country.
  - `src/data/mapping/`: Includes files for listing and mapping country metadata.
- `src/schemas/`: Defines Zod schemas for validating all data structures.
- `src/styles/`: Contains global CSS, including variables and resets.
- `public/`: Stores static assets like images and fonts.

## Adding a New Country

To add a new country to the site, follow these steps:

1.  **Create a Country Data File**: Add a new JSON file for the country in the `src/data/countries/` directory (e.g., `my-country.json`). Ensure its structure conforms to the schema defined in `src/schemas/json/country-data.schema.json`.

2.  **Update Country List**: Open `src/data/mapping/countries.ts` and add a new country object to the `countries` array. This object contains metadata like the country's name, slug, flag, and a brief description.

3.  **Update Key-Title Mapping**: If your new country's data file includes unique keys in the `historicalContext` section, you must map them to a human-readable title in `src/data/mapping/key-title-mapping.ts`.

4.  **Add a Country Image (Optional)**: Place a WebP image for the country flag or a representative photo in the `public/countries/` directory.

## Stack

Astro · CSS (custom properties) · Remixicon

## License

This repository is released under CC0 1.0 Universal. See the `LICENSE` file for details.
