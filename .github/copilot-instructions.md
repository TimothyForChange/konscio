# Copilot Instructions for 'Timothy for Change'

## Project Overview

- Advocacy site analyzing structural violence, built with Astro for static site generation. Focuses on global crises' historical/economic roots. No backend; all data static.

## Behaviour

- Use context7 for latest package docs before recommendations.
- Use British English in content, docs, comments.
- Follow DRY, YAGNI, KISS principles.

## Architecture & Conventions

- **Components**: UI in `src/components/`, grouped by feature (e.g., `country/`, `ui/`). Use `.astro` for markup.
- **Content**: JSON data in `src/data/countries/` (e.g., `palestine.json`). Minimize hardcoded text.
- **Routing**: Dynamic routes like `[country].astro` in `src/pages/`.
- **Data Flow**: JSON → Zod validation (e.g., `CountryDataSchema.safeParse()`) → dynamic imports (e.g., `import(\`../data/countries/${countrySlug}.json\`)`) → components → static HTML.
- **Validation**: Runtime Zod validation; JSON schemas auto-generated from Zod via `scripts/generate-json-schemas.ts`.
- **Styling**: CSS variables in `src/styles/global.css` (e.g., `--text-primary`, `--section-gap`).
- **Types**: TypeScript interfaces in `src/types/`, constants in `src/constants/`.

## Developer Workflows

- **Install/Run**: `npm install`, `npm run dev` (includes `tsc --noEmit`), `npm run build`, `npm run preview`.
- **Schema Gen**: `npm run generate:schemas` (auto-runs in build; don't edit `src/schemas/json/` manually).
- **Lint/Format**: `npm run lint` (ESLint auto-fix), `npm run format` (Prettier).
- **Data Updates**: Edit JSON in `src/data/countries/`, validate against `src/schemas/country-data.ts`.

## Code Patterns & Examples

- **Props**: `export interface Properties { countryName: string; countrySlug?: string; }`
- **Data Loading**: `const countryModule = await import(\`../data/countries/${countrySlug}.json\`); return validateCountryData(countryModule.default);`
- **Categories**: Use `COUNTRY_CATEGORIES` from `src/constants/category.ts` (e.g., 'Occupation & Imperialism').
- **Validation**: `const result = Schema.safeParse(data); if (!result.success) throw new Error(\`Validation failed: ${result.error.message}\`);`
- **Error Handling**: Descriptive throws in validators.

## Integration Points

- **Astro**: Integrations: sitemap, compression, inline. Fontaine for fonts.
- **Zod**: Schemas in `src/schemas/`, validators in `src/validators/`.
- **Remixicon**: Icons like `ri-arrow-left-line`.
- **TypeScript**: Strict mode, no unused vars.

For unclear patterns, ask for clarification.
