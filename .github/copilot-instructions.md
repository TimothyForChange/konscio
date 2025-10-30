# AI Coding Agent Instructions for "Timothy for Change"

## Project Overview

- **Framework:** Astro (with MDX integration)
- **Language:** TypeScript, CSS
- **Purpose:** Eco-socialist analysis and decolonial thought from Africa and the Global South — for people and planet. The site is for people and planet: eco-socialist analysis from Africa and the Global South, with a focus on decolonisation, climate, and liberation

## Architecture & Key Patterns

- **Content:** Blog posts are Markdown/MDX files in `src/content/blog/`. MDX supports embedded JSX.
- **Components:** All UI elements (Header, Footer, Sidebar, Layout, SEO, ThemeToggle, TableOfContents) are in `src/components/` as `.astro` files.
- **Pages:** Route files in `src/pages/` (e.g., `index.astro`, `blog.astro`, dynamic `[...slug].astro`).
- **Config:** Site-wide settings in `src/config.ts` (title, author, social, siteUrl).
- **Styling:** Global styles and CSS variables in `src/styles/global.css`. Dark mode and typography are controlled here.
- **Utils:** Utility functions (reading time, TOC, slugify) in `src/utils/`.
- **Public Assets:** Images, SVGs, and JS in `public/`.

## Developer Workflows

- **Install:** `npm install`
- **Dev Server:** `npm run dev` (runs `tsc --noEmit && astro dev` - type checks first)
- **Build:** `npm run build` (output to `./dist/`)
- **Preview:** `npm run preview`
- **Type Check:** `npm run check`
- **Lint:** `npm run lint` (ESLint with auto-fix, multiple plugins including sonarjs, unicorn)
- **Format:** `npm run format` (Prettier with sort-imports plugin)
- **Test:** `npm run test` (Vitest with jsdom environment)

## Project-Specific Conventions

- **Frontmatter:** Blog posts require `title`, `datePublished`, `excerpt`, `categories`, and `tags` in frontmatter. Optional: `description`, `dateModified`, `author` (defaults to 'Anonymous'), `image`, `draft`.
- **Content Schema:** Zod schema in `src/schemas/blog.ts` validates blog posts with `z.coerce.date()` for date parsing.
- **Dark Mode:** Theme preference persisted in localStorage and initialized via inline script in `Layout.astro` to prevent FOUC. CSS variables update via `[data-theme='dark']` selector.
- **Table of Contents:** Auto-generated for posts with headings (H2-H4) using `src/utils/table-of-contents.ts` and rendered by `TableOfContents.astro`.
- **Reading Time:** Calculated via remark plugin (`plugins/remark-reading-time.ts`) and displayed on posts.
- **SEO:** Meta tags and structured data handled by `SEO.astro`.
- **Type Safety:** All config and utility code is type-checked.
- **Self-Hosted Fonts:** No external font dependencies; see `src/styles/variables.css` for font setup.
- **Colour Palette:** Monotone palette with accent red, semantic colour variables for light/dark themes.
- **Language:** All new content and edits to content must use British English spelling.
- **Code Style:** Never add comments to code or content.
- **Development Environment:** Development for this project is done on Windows.

## Integration Points

- **MDX:** Supports embedded JSX in blog posts for rich content.
- **Content Collections:** Astro's type-safe content system with Zod validation.
- **Fontaine:** Optimizes self-hosted fonts from @fontsource packages.
- **Shiki:** Syntax highlighting with cached highlighter in `src/utils/highlighter.ts`.
- **Remark Plugins:** Custom reading time calculation plugin.
- **Build Optimizations:** Astro compressor (gzip/brotli/zstd), PurgeCSS, Playform Inline for minimal JS.
- **RSS & Search:** Auto-generated RSS feed and JSON search index.

## Examples

- **Add a Blog Post:** Place `.md` or `.mdx` in `src/content/blog/` with required frontmatter.
- **Add a Component:** Create `.astro` in `src/components/` and import in page/layout files.
- **Customize Theme:** Edit CSS variables and font families in `src/styles/global.css`.
- **Update Site Config:** Edit `src/config.ts` for title, author, social links, etc.

## References

- See `README.md` for full feature list, structure, and usage details.
- Key files: `src/config.ts`, `src/components/`, `src/pages/`, `src/styles/global.css`, `src/utils/`, `public/`, `tests/`

Follow the above conventions and workflows. When in doubt, reference the README and config files for project-specific details. Prioritise type safety, accessibility, and performance in all code changes.
