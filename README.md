# 🌍 Timothy for Change

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/large.svg)](https://astro.build)

For people and planet: eco-socialist analysis from Africa and the Global South.

An Astro-powered blog exploring capitalism, colonialism, and climate collapse through a decolonial, eco-socialist lens. Written from South Africa, this site examines how liberation is impossible without dismantling the systems that exploit both people and the planet — and why a decolonised, eco-socialist future is not optional, but necessary.

## 🌟 Features

✓ **Eco-Socialist Analysis** - Critical examination of capitalism, colonialism, and climate systems

✓ **Decolonial Perspective** - Analysis from Africa and the Global South

✓ **MDX Support** - Full support for both Markdown and MDX content files with embedded JSX

✓ **Reading Time Display** - Automatic calculation and display of estimated reading time

✓ **Table of Contents** - Auto-generated TOC with scroll spy navigation for long-form content

✓ **Responsive Layout** - Mobile-first design with elegant desktop sidebar

✓ **Minimal JavaScript** - Essential JS only for enhanced features, ensuring fast performance

✓ **SEO Optimized** - Built-in meta tags and structured data

✓ **Accessibility First** - Semantic HTML and ARIA attributes

✓ **Self-Hosted Fonts** - No external dependencies for privacy

✓ **Type-Safe** - Full TypeScript support

✓ **RSS Feed** - Automatic RSS feed generation for content syndication

✓ **Search Functionality** - Built-in search with JSON index

✓ **Categories System** - Organized content by categories with dedicated pages

## 💻 Tech Stack

- **Framework:** [Astro](https://astro.build) with MDX integration
- **Language:** TypeScript
- **Styling:** Scoped CSS with CSS Variables and Dark Mode support
- **Fonts:** Self-hosted via @fontsource (Oswald, Work Sans, JetBrains Mono)
- **Icons:** Remixicon icons
- **Build Tools:** Astro Compressor, PurgeCSS, Playform Inline, Fontaine for optimisation

## ⚡ Quick Start

### Prerequisites

- Node.js 22.16.0 or higher
- Git

### Installation

1. Clone this repository:

```bash
git clone https://github.com/timothyforchange/konscio.git
cd konscio
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser at `http://localhost:4321`

## ⚙️ Configuration

All site configuration is centralised in `src/config.ts`.

## 📝 Writing Content

### Blog Posts

Create blog posts as Markdown or MDX files in `src/content/blog/`. MDX files support embedded JSX for rich content:

````markdown
title: 'The Necessity of Decolonised Eco-Socialism'
datePublished: '2024-01-15'
dateModified: '2024-01-20'
description: 'An in-depth analysis of why decolonised eco-socialism is essential for liberation'
author: 'Timothy Brits'
excerpt: 'Why liberation requires dismantling systems that exploit both people and planet'
categories: ['Eco-Socialism', 'Decolonisation']
tags: ['capitalism', 'colonialism', 'climate', 'liberation']
image: '/decolonisation.jpg'

### Contributing a New Article

We welcome new blog posts and articles from all authors, including those written in languages other than English. We do not accept translations of existing posts, but original content in any language is encouraged.

To contribute a new article:

1. **Create your post** as a Markdown (`.md`) or MDX (`.mdx`) file in `src/content/blog/`. MDX files support embedded JSX for rich content.
2. **Add an open-graph image** for your post in `public/images/` (recommended size: 1200x630px, format: `.jpg` or `.png`).
3. **Add any images used inside your article** as `.webp` files in `src/assets/`.
4. **Use the required frontmatter**. See the example below and refer to `the-new-monroe-doctrine-usa.md` for a full example:

Once your article is ready, you can either:

- Open a Pull Request (PR) with your new post and images
- Or email your content to contact@timothyforchange.co.za and we will adapt it for the blog, maintaining your voice, tone, and perspective

Posts by other authors will be clearly attributed, with the author's name displayed prominently, and remain your content.

We reserve the right to make editorial edits to contributed content for clarity, consistency, and alignment with the platform’s mission. Editorial changes are subject to review, but your voice, tone, and intent will be respected.

For editorial and style guidelines, please view [`EDITORIAL_STYLE_FRAMEWORK.md`](EDITORIAL_STYLE_FRAMEWORK.md).

```markdown
---
title: 'Your Article Title'
datePublished: 'YYYY-MM-DD'
description: 'Brief SEO description'
author: 'Your Name'
excerpt: 'Short summary for listings'
categories: ['Category1', 'Category2']
tags: ['tag1', 'tag2']
image: '/images/your-open-graph-image.jpg'
---

Your content here...

## Section Heading

More content...
```
````

**Note:** All images used inside articles must be `.webp` and placed in `src/assets/`. The open-graph image for the post must be placed in `public/images/`.

More content...

````

### Frontmatter Reference

| Field           | Type    | Required | Description                      |
| --------------- | ------- | -------- | -------------------------------- |
| `title`         | string  | Yes      | Post title                       |
| `description`   | string  | No       | Post description for SEO         |
| `datePublished` | string  | Yes      | Publication date (YYYY-MM-DD)    |
| `dateModified`  | string  | No       | Last modified date (YYYY-MM-DD)  |
| `excerpt`       | string  | Yes      | Brief description for listings   |
| `categories`    | array   | Yes      | Post categories                  |
| `tags`          | array   | Yes      | Post tags                        |
| `author`        | string  | No       | Author name (defaults to config) |
| `image`         | string  | No       | Featured image path              |
| `draft`         | boolean | No       | Draft status (defaults to false) |

## 🛠️ Commands

All commands are run from the root of the project:

| Command           | Action                                     |
| ----------------- | ------------------------------------------ |
| `npm install`     | Install dependencies                       |
| `npm run dev`     | Start local dev server at `localhost:4321` |
| `npm run build`   | Build production site to `./dist/`         |
| `npm run preview` | Preview your build locally                 |
| `npm run check`   | Check TypeScript types                     |
| `npm run lint`    | Run ESLint with auto-fix                   |
| `npm run format`  | Format code with Prettier                  |
| `npm run test`    | Run tests with Vitest                      |

## 🚀 Deployment

This site is designed for static hosting. Build the site and deploy the `dist/` folder to any static hosting service.

### Build Commands

```bash
# Build for production
npm run build

# Preview the build locally
npm run preview
````

## 🤝 Contributing

Contributions are welcome! This project focuses on eco-socialist analysis and decolonial thought. If you'd like to contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Content Contributions

If you'd like to contribute content, please ensure it aligns with the site's focus on eco-socialist analysis from Africa and the Global South.

For detailed contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

### Code of Conduct

This project has adopted a code of conduct to ensure a welcoming environment for all contributors. See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for details.

### Security

If you discover a security vulnerability, please see our [Security Policy](SECURITY.md).

## 📄 License

This project is **dual licensed**:

- **Code** (software in `src/`, scripts, etc.): [MIT License](LICENSES/MIT.txt)
- **Content** (text, images, documentation, data, media): [CC0 1.0 Universal](LICENSES/CC0-1.0.txt)

See [`LICENCE`](LICENCE) for a full explanation and SPDX identifiers.

Unless otherwise noted, code is MIT and content is CC0 1.0 Universal by default. Contributions are accepted under these terms.

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build)
- Icons by [Remixicon](https://remixicon.com/)
- Fonts by [Fontsource](https://fontsource.org/)
- Theme based on [Volks-Typo](https://github.com/jdrhyne/volks-typo), created by [jdrhyne](https://github.com/jdrhyne)
- Inspired by the urgent need for decolonial, eco-socialist transformation
