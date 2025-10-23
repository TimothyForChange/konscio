# Gemini Instructions for 'Timothy for Change'

## Project Overview

- This is an advocacy site analysing structural violence built with Astro, focusing on critical analysis of global crises and their historical/economic roots.
- The codebase is organized for static site generation, with content and components separated for clarity and scalability.

## Behaviour

- Use context7 to retrieve the latest documentation for packages, libraries, and frameworks before making recommendations or code changes.
- Always use British English spelling when writing or editing content, documentation, or comments.
- Follow DRY (Don't Repeat Yourself), YAGNI (You Aren't Gonna Need It), and KISS (Keep It Simple, Stupid) principles when making code changes.

## Architecture & Conventions

- Astro Components: All UI logic is in `src/components/`, grouped by feature (e.g., `country/`, `blocks/`, `shared/`) for maintainability. Use `.astro` files for page and component markup.
- Content Structure: Country and crisis data is stored in JSON under `src/data/`. Each country has its own JSON file for structured data. Use JSON for content, minimizing hardcoded text in components.
- Pages & Routing: Dynamic routes (e.g., `[country].astro`) use bracket notation for country-specific pages. Static pages are in `src/pages/`.
- Layouts: Shared layouts are in `src/layouts/` (e.g., `Layout.astro`, `CountryLayout.astro`).
- Constants & Types: Shared types are in `src/types/` (e.g., `Country.ts`, `Mission.ts`). Constants for categories are in `src/constants/category.ts`. Use TypeScript for all logic and data definitions.
- Schemas: JSON schemas and TypeScript definitions are in `src/schemas/` (e.g., `countries.schema.json`, `country-data.ts`).
- Scripts: Build and generation scripts are in `scripts/` (e.g., `generate-json-schemas.ts`).
- Utilities: Common helpers are in `src/utils/` (e.g., `country.ts`, `html.ts`, `text.ts`).
- No Backend: All data is static; no server-side code or API integration.
- Data Flow: JSON files → Zod validation → dynamic imports in data-loaders → components → static HTML.
- Validation: All data validated at runtime using Zod schemas defined in `src/schemas/`. JSON schemas auto-generated from Zod using `scripts/generate-json-schemas.ts`.
- Styling: CSS custom properties in `src/styles/global.css` for consistent theming. Component styles scoped or imported.

## Developer Workflows

- Install & Run: Never run the project or install packages without instruction from the user. If recommending new packages, check `package.json` for existing dependencies. Install dependencies: `npm install` (only if instructed). Start dev server: `npm run dev` (only if instructed). Build static site: `npm run build` (only if instructed). Preview build: `npm run preview` (only if instructed).
- Schema Generation: Run `npm run generate:schemas` to convert Zod schemas to JSON schemas (happens automatically in dev/build).
- JSON Schemas: Files in `src/schemas/json/` are auto-generated and should never be manually edited.
- Type Checking: `npm run dev` includes `tsc --noEmit` for TypeScript validation.
- Linting & Formatting: `npm run lint` (ESLint with auto-fix) and `npm run format` (Prettier).
- Data Updates: To add or update country/crisis data, edit the relevant JSON in `src/data/countries/`. Ensure data matches Zod schemas in `src/schemas/country-data.ts`.

## Integration Points

- Remixicon: Used for icons in UI components (e.g., `ri-arrow-left-line`).
- Astro: All page/component logic follows Astro conventions. Integrations: sitemap, compression, inline optimization.
- Fontaine: Automatic font optimization with fallbacks in `astro.config.mjs`.
- Zod: Schema validation for all data structures. Schemas in `src/schemas/`, validators in `src/validators/`.
- TypeScript: Strict mode enabled, no unused locals/parameters, JSX preserve.

## Code Patterns & Examples

- Component Props: Use TypeScript interfaces for props (e.g., `export interface Properties { countryName: string; }`).
- Data Loading: Use dynamic imports in `src/utils/async-data-loaders.ts` for country data (e.g., `import(\`../data/countries/${countrySlug}.json\`)`).
- Country Categories: Use predefined categories from `src/constants/category.ts` (e.g., 'Invasion & Occupation', 'Occupation & Dispossession').
- CSS Variables: Use semantic color variables like `--text-primary`, `--bg-surface`, spacing like `--section-gap`.
- Error Handling: Throw descriptive errors in validators (e.g., `throw new Error(\`Country data validation failed: ${result.error.message}\`)`).

For questions about unclear patterns or missing documentation, ask for clarification.
