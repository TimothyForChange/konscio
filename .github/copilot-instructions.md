# Copilot Instructions for 'Timothy for Change'

## Project Overview

- This is a humanitarian advocacy site built with Astro, focusing on critical analysis of global crises and their historical/economic roots.
- The codebase is organized for static site generation, with content and components separated for clarity and scalability.

## Behaviour

- Use context7 to retrieve the latest documentation for packages, libraries, and frameworks before making recommendations or code changes.
- Always use British English spelling when writing or editing content, documentation, or comments.

## Architecture & Key Patterns

- **Astro Components:** All UI logic is in `src/components/`, grouped by feature (e.g., `country/`, `blocks/`, `shared/`). Use `.astro` files for page and component markup.
- **Content Structure:** Country and crisis data is stored in JSON under `src/data/` and markdown/MDX in `blog/` and `docs/`. Each country has its own JSON file for structured data.
- **Pages & Routing:** Dynamic routes (e.g., `[country].astro`) are used for country-specific pages. Static pages are in `src/pages/`.
- **Layouts:** Shared layouts are in `src/layouts/` (e.g., `Layout.astro`, `CountryLayout.astro`).
- **Constants & Types:** Shared types are in `src/types/` (e.g., `Country.ts`, `Mission.ts`). Constants for categories are in `src/constants/category.ts`.
- **Utilities:** Common helpers are in `src/utils/` (e.g., `country.ts`, `html.ts`, `text.ts`).

## Developer Workflows

- **Install & Run:**
  - Never run the project or install packages without instruction from the user.
  - If recommending new packages, always check `package.json` for existing dependencies before suggesting installation.
  - Install dependencies: `npm install` (only if instructed)
  - Start dev server: `npm run dev` (only if instructed)
  - Build static site: `npm run build` (only if instructed)
  - Preview build: `npm run preview` (only if instructed)
- **Styling:** Global styles are in `src/styles/global.css` and `reset.css`. Component styles may be scoped or imported.
- **Data Updates:** To add or update country/crisis data, edit the relevant JSON in `src/data/countries/` or markdown in `docs/`/`blog/`.

## Conventions & Patterns

- **Component Grouping:** Components are grouped by domain (country, blocks, shared, ui) for maintainability.
- **Data-Driven Pages:** Use JSON and markdown for content, minimizing hardcoded text in components.
- **Type Safety:** Use TypeScript for all logic and data definitions. Reference types from `src/types/`.
- **Routing:** Dynamic routes use bracket notation (e.g., `[country].astro`).
- **No Backend:** All data is static; no server-side code or API integration.

## Integration Points

- **Remixicon:** Used for icons in UI components.
- **Astro:** All page/component logic follows Astro conventions.

## Examples

- To add a new country: create a JSON file in `src/data/countries/`, update mapping in `src/data/mapping/countries.json`, and add a page in `docs/humanitarianCrises/`.
- To create a new UI block: add a `.astro` file in `src/components/blocks/` and import it in the relevant page/component.

For questions about unclear patterns or missing documentation, ask for clarification or review the README and source files for examples.
