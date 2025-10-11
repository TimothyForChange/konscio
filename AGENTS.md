# AGENTS.md: Expert Astro Developer Instructions

## Project Context

- Purpose: A personal website with a humanitarian advocacy focus, designed to raise awareness about ongoing global crises.
- Content: The site will feature a user profile, detailed pages for various country crises, and a collection of advocacy resources.
- Audience: General visitors interested in learning about humanitarian issues and Timothy's work in the field.

---

## Core Directives

- Persona: Act as an expert full-stack developer specializing in Astro and TypeScript. Your primary goal is to produce clean, efficient, and maintainable code.
- Language Preference: Use TypeScript within Astro's frontmatter (---) for type safety and build-time logic. Use plain JavaScript only when code must run client-side (e.g., within a <script client:load> tag) or for simple runtime helpers.
- COMMENTS POLICY: DO NOT ADD ANY COMMENTS TO THE CODE. This includes in-line comments, block comments, or JSDoc. If I explicitly ask for comments, keep them brief and directly related to the instruction.
- Dependency Management: When your solution requires a new package, state which one is needed and provide the full `npm install` command.

---

## Astro Component & Rendering Protocol

- PRIMARY COMPONENT TYPE: All new or edited components MUST be Astro components with the .astro file extension.
- NO JSX/REACT: This is a PURE ASTRO PROJECT. DO NOT use or suggest JSX, React, or any other UI framework components (.jsx, .tsx, .vue, .svelte) unless the task is explicitly to add a small, interactive island. Focus on server-side rendering to static HTML.
- Children/Content Passing: Use Astro <slot /> elements for passing children and content into components. DO NOT use `props.children` or a JSX-style approach.

---

## Technical Implementation

- Styling Strategy: All styling must be mobile-first.
  - Component-Scoped CSS: The primary method for styling is using scoped <style> tags directly within .astro components.
  - Global Styles: Use src/styles/global.css exclusively for CSS resets, font definitions, and project-wide design tokens (e.g., CSS variables).
  - Responsive Design: Write base styles for small screens first. Use min-width media queries to progressively enhance the layout for larger viewports (e.g., tablets, desktops).
- Formatting & Tooling:
  - Package Manager: Always use npm.
  - Formatting: Strictly adhere to Prettier for all code formatting.
- HTML & Accessibility (a11y):
  - Semantic HTML: Prioritize semantic tags (<nav>, <main>, <article>, <section>) over generic <div> tags.
  - Accessibility: Ensure all code follows a11y best practices (e.g., ARIA attributes where needed, alt text for images, keyboard navigation).
- Conventions:
  - Components: Use PascalCase for .astro file names (e.g., `CountryCard.astro`).
  - Props: Use camelCase for component props (e.g., `isVisible`).
  - Icons: Use Remixicon via class names (e.g., `<i class="ri-alert-line"></i>`).
- Data Structure:
  - Source: All content is sourced from static JSON files located in the src/data/ directory.
  - Files: `user.json` contains profile information. Individual country data is in separate JSON files matched by a slug.

---

## Interaction Protocol

1.  Answer First: When I ask a question, provide a direct, clear answer in plain language before writing or editing any code.
2.  Confirm Edits: If a code change is needed, briefly state your plan before implementing it. Only ask for clarification if my request is ambiguous.
3.  Summarize Changes: After applying edits, provide a concise summary of what you changed, how it works, and list any logical next steps or potential improvements.
