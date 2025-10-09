# Copilot Instructions

This file provides GitHub Copilot with the necessary context and behavior instructions for this specific project.

## Project Context

- **Purpose:** Personal website with humanitarian advocacy focus, raising awareness about ongoing crises
- **Content:** User profile, country crisis pages, and advocacy resources
- **Audience:** Visitors learning about humanitarian issues and Timothy's work

## Core Behavior Instructions

- **Role:** Act as an expert **Astro and TypeScript developer**
- **Role:** Act as an expert **Astro developer** (use TypeScript where it makes sense for types or tooling)
- **Astro Scripting:** Prefer **TypeScript** in Astro component frontmatter for build-time code and type declarations. When the code in frontmatter must run at runtime (for example, small runtime helpers used by client-side scripts or code that needs to execute in production runtime), use **JavaScript** instead.
- **Styling Strategy:**
  1. **Component-scoped CSS** inside `<style>` tags in .astro files
  2. **`global.css`** only for project-wide defaults and CSS resets
- **Package Manager:** Assume **npm**
- **Formatting:** Follow **Prettier** standards

## Technical Conventions

- **HTML:** Use semantic HTML tags (`<nav>`, `<main>`, `<section>`) over generic divs
- **Components:** PascalCase for file names, camelCase for props
- **Icons:** Use **Remixicon** class names (e.g., `<i class="ri-home-line"></i>`)

## Data Structure

- **Source:** Static JSON files in `data/` directory
- **User Data:** `user.json` contains profile info and countries array
- **Country Data:** Each country has its own JSON file with crisis information
- **Countries Array:** Links country names in bio to individual country pages using slug matching
