# Copilot Instructions for 'Timothy for Change'

## Project Overview

- This is a humanitarian advocacy site built with Astro, focusing on critical analysis of global crises and their historical/economic roots.
- The codebase is organized for static site generation, with content and components separated for clarity and scalability.

## Behaviour

- Use context7 to retrieve the latest documentation for packages, libraries, and frameworks before making recommendations or code changes.
- Always use British English spelling when writing or editing content, documentation, or comments.
- Follow DRY (Don't Repeat Yourself) and YAGNI (You Aren't Gonna Need It) principles when making code changes.

## Architecture & Conventions

- **Astro Components:** All UI logic is in `src/components/`, grouped by feature (e.g., `country/`, `blocks/`, `shared/`) for maintainability. Use `.astro` files for page and component markup.
- **Content Structure:** Country and crisis data is stored in JSON under `src/data/` and markdown/MDX in `blog/` and `docs/`. Each country has its own JSON file for structured data. Use JSON and markdown for content, minimizing hardcoded text in components.
- **Pages & Routing:** Dynamic routes (e.g., `[country].astro`) use bracket notation for country-specific pages. Static pages are in `src/pages/`.
- **Layouts:** Shared layouts are in `src/layouts/` (e.g., `Layout.astro`, `CountryLayout.astro`).
- **Constants & Types:** Shared types are in `src/types/` (e.g., `Country.ts`, `Mission.ts`). Constants for categories are in `src/constants/category.ts`. Use TypeScript for all logic and data definitions.
- **Schemas:** JSON schemas and TypeScript definitions are in `src/schemas/` (e.g., `countries.schema.json`, `country-data.ts`).
- **Scripts:** Build and generation scripts are in `scripts/` (e.g., `generate-json-schemas.ts`).
- **Utilities:** Common helpers are in `src/utils/` (e.g., `country.ts`, `html.ts`, `text.ts`).
- **No Backend:** All data is static; no server-side code or API integration.

## Developer Workflows

- **Install & Run:** Never run the project or install packages without instruction from the user. If recommending new packages, check `package.json` for existing dependencies. Install dependencies: `npm install` (only if instructed). Start dev server: `npm run dev` (only if instructed). Build static site: `npm run build` (only if instructed). Preview build: `npm run preview` (only if instructed).
- **Styling:** Global styles are in `src/styles/global.css` and `reset.css`. Component styles may be scoped or imported.
- **Data Updates:** To add or update country/crisis data, edit the relevant JSON in `src/data/countries/` or markdown in `docs/`/`blog/`.

## Integration Points

- **Remixicon:** Used for icons in UI components.
- **Astro:** All page/component logic follows Astro conventions.

For questions about unclear patterns or missing documentation, ask for clarification or review the README and source files for examples.
