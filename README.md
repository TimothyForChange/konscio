# Timothy for Change

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/small.svg)](https://astro.build)
[![License: CC0-1.0](https://img.shields.io/badge/License-CC0--1.0-lightgrey.svg)](https://creativecommons.org/publicdomain/zero/1.0/)

For people and planet: eco-socialist analysis from Africa and the Global South.

An Astro-powered blog exploring capitalism, colonialism, and climate collapse through a decolonial, eco-socialist lens. Written from South Africa, this site examines how liberation is impossible without dismantling the systems that exploit both people and the planet — and why a decolonised, eco-socialist future is not optional, but necessary.

## 🌟 Features

✓ **Eco-Socialist Analysis** - Critical examination of capitalism, colonialism, and climate systems
✓ **Decolonial Perspective** - Analysis from Africa and the Global South
✓ **Dark Mode Toggle** - Seamless theme switching with localStorage persistence
✓ **MDX Support** - Full support for both Markdown and MDX content files with embedded JSX
✓ **Reading Time Display** - Automatic calculation and display of estimated reading time
✓ **Table of Contents** - Auto-generated TOC with scroll spy navigation for long-form content
✓ **Responsive Layout** - Mobile-first design with elegant desktop sidebar
✓ **Minimal JavaScript** - Essential JS only for enhanced features, ensuring fast performance
✓ **SEO Optimized** - Built-in meta tags and structured data
✓ **Accessibility First** - Semantic HTML and ARIA attributes
✓ **Self-Hosted Fonts** - No external dependencies for privacy
✓ **Type-Safe** - Full TypeScript support
✓ **Easy Configuration** - Single config file for all settings

## 💻 Tech Stack

- **Framework:** [Astro](https://astro.build) with MDX integration
- **Language:** TypeScript
- **Styling:** Scoped CSS with CSS Variables and Dark Mode support
- **Fonts:** Self-hosted via @fontsource (Oswald, Roboto Condensed, Work Sans, JetBrains Mono)
- **Icons:** Lucide icons via @lucide/astro
- **Build Tools:** Astro Compressor, PurgeCSS for optimisation

## 🛠️ Quick Start

### Prerequisites

- Node.js 18.14.1 or higher
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

## 📁 Project Structure

```
konscio/
├── public/
│   ├── robots.txt
│   ├── search.json
│   ├── site.webmanifest
│   └── theme-init.js        # Dark mode initialization script
├── src/
│   ├── components/
│   │   ├── Footer.astro     # Site footer with social links
│   │   ├── Header.astro     # Site header with navigation
│   │   ├── Icon.astro       # Icon component using Lucide
│   │   ├── Layout.astro     # Main layout wrapper
│   │   ├── SEO.astro        # SEO meta tags and structured data
│   │   ├── Sidebar.astro    # Desktop sidebar component
│   │   ├── TableOfContents.astro # Auto-generated TOC component
│   │   └── ThemeToggle.astro # Dark mode toggle button
│   ├── content/
│   │   ├── config.ts        # Content collections configuration
│   │   └── blog/            # Blog content directory
│   │       ├── manifesto.mdx # MDX blog posts with JSX support
│   │       └── *.md         # Markdown blog posts
│   ├── pages/
│   │   ├── index.astro      # Homepage
│   │   ├── about.astro      # About page
│   │   ├── blog.astro       # Blog listing page
│   │   ├── blog/
│   │   │   └── [...slug].astro  # Dynamic blog post pages
│   │   ├── categories.astro # Categories listing
│   │   ├── categories/
│   │   │   └── [category].astro # Category-specific pages
│   │   ├── rss.xml.js       # RSS feed generation
│   │   ├── search.json.js   # Search index generation
│   │   └── search.json.js   # Search index generation
│   ├── styles/
│   │   └── global.css       # Global styles with dark mode support
│   ├── utils/
│   │   ├── highlighter.ts   # Syntax highlighting utilities
│   │   ├── reading-time.ts  # Reading time calculation utilities
│   │   ├── slugify.ts       # URL slug generation utilities
│   │   └── table-of-contents.ts # TOC generation utilities
│   └── config.ts            # Site configuration
├── astro.config.mjs         # Astro configuration with MDX
├── eslint.config.mjs        # ESLint configuration
├── package.json
├── tsconfig.json            # TypeScript configuration
└── README.md
```

## ⚙️ Configuration

All site configuration is centralised in `src/config.ts`:

```typescript
export const config: SiteConfig = {
  title: 'Timothy for Change',
  tagline:
    'For people and planet: eco-socialist analysis from Africa and the Global South',
  description:
    'Eco-socialist analysis and decolonial thought from Africa and the Global South — for people and planet.',
  author: {
    name: 'Timothy Brits',
    bio: 'Timothy writes from South Africa on capitalism, colonialism, and climate collapse. He believes liberation is impossible without dismantling the systems that exploit both people and the planet — and that a decolonised, eco-socialist future is not optional, but necessary.',
    avatar: '/avatar.webp',
  },
  social: {
    github: 'https://github.com/timothyforchange/konscio',
    threads: 'https://threads.com/@timothyforchange',
    instagram: 'https://instagram.com/timothyforchange',
    email: 'contact@timothyforchange.co.za',
  },
  siteUrl: 'https://timothyforchange.co.za',
  baseUrl: '/',
};
```

## 📝 Writing Content

### Blog Posts

Create blog posts as Markdown or MDX files in `src/content/blog/`. MDX files support embedded JSX for rich content:

```markdown
---
title: 'The Necessity of Decolonised Eco-Socialism'
date: '2024-01-15'
author: 'Timothy Brits'
excerpt: 'Why liberation requires dismantling systems that exploit both people and planet'
categories: ['Eco-Socialism', 'Decolonisation']
tags: ['capitalism', 'colonialism', 'climate', 'liberation']
image: '/images/decolonisation.jpg'
draft: false
---

Your content here...

## Section Heading

More content...
```

### Frontmatter Reference

| Field        | Type    | Required | Description                      |
| ------------ | ------- | -------- | -------------------------------- |
| `title`      | string  | Yes      | Post title                       |
| `date`       | string  | Yes      | Publication date (YYYY-MM-DD)    |
| `author`     | string  | No       | Author name (defaults to config) |
| `excerpt`    | string  | No       | Brief description for listings   |
| `categories` | array   | No       | Post categories                  |
| `tags`       | array   | No       | Post tags                        |
| `image`      | string  | No       | Featured image path              |
| `draft`      | boolean | No       | Hide from listings if true       |

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

## 🚀 Deployment

This site is designed for static hosting. Build the site and deploy the `dist/` folder to any static hosting service.

### Build Commands

```bash
# Build for production
npm run build

# Preview the build locally
npm run preview
```

### Recommended Hosting

- **Netlify** - Automatic deployments from Git
- **Vercel** - Global CDN with instant deployments
- **GitHub Pages** - Free hosting for open source projects
- **Railway** - Modern hosting platform

## 🤝 Contributing

Contributions are welcome! This project focuses on eco-socialist analysis and decolonial thought. If you'd like to contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Content Contributions

If you'd like to contribute content, please ensure it aligns with the site's focus on eco-socialist analysis from Africa and the Global South.

## 📄 License

This project is licensed under the CC0 1.0 Universal (CC0 1.0) Public Domain Dedication - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build)
- Icons by [Lucide](https://lucide.dev/)
- Fonts by [Fontsource](https://fontsource.org/)
- Inspired by the urgent need for decolonial, eco-socialist transformation

## 📋 Project Information

- **Author:** Timothy Brits
- **Location:** South Africa
- **Focus:** Eco-socialist analysis and decolonial thought
- **Repository:** [GitHub](https://github.com/timothyforchange/konscio)
- **Live Site:** [timothyforchange.co.za](https://timothyforchange.co.za)

---

**Timothy for Change** • CC0 1.0 License

## 📝 Writing Content

### Blog Posts

Create blog posts as Markdown or MDX files in `src/content/blog/`:

```markdown
---
title: 'The Intersection of Function and Form'
date: '2024-01-15'
author: 'Your Name'
excerpt: 'Exploring how Bauhaus principles shaped modern design thinking'
categories: ['Design', 'History']
tags: ['bauhaus', 'modernism', 'typography']
image: '/images/bauhaus-poster.jpg'
draft: false
---

Your content here...
```

### Frontmatter Reference

| Field        | Type    | Required | Description                      |
| ------------ | ------- | -------- | -------------------------------- |
| `title`      | string  | Yes      | Post title                       |
| `date`       | string  | Yes      | Publication date (YYYY-MM-DD)    |
| `author`     | string  | No       | Author name (defaults to config) |
| `excerpt`    | string  | No       | Brief description for listings   |
| `categories` | array   | No       | Post categories                  |
| `tags`       | array   | No       | Post tags                        |
| `image`      | string  | No       | Featured image path              |
| `draft`      | boolean | No       | Hide from listings if true       |

## 🛠️ Commands

All commands are run from the root of the project:

| Command                 | Action                                     |
| ----------------------- | ------------------------------------------ |
| `npm install`           | Install dependencies                       |
| `npm run dev`           | Start local dev server at `localhost:4321` |
| `npm run build`         | Build production site to `./dist/`         |
| `npm run preview`       | Preview your build locally                 |
| `npm run astro ...`     | Run CLI commands like `astro add`          |
| `npm run check`         | Check TypeScript types                     |
| `npm run lint`          | Run ESLint                                 |
| `npm run test:features` | Run Playwright feature tests               |

## 🚀 Deployment

Volks-Typo can be deployed to any static hosting service. The theme now supports environment-based configuration for different deployment scenarios.

### Configuration

The theme uses environment variables to configure the deployment:

1. Copy `.env.example` to `.env`
2. Set the appropriate values based on your deployment target

### Netlify / Vercel (Root Domain)

```bash
# No configuration needed - works out of the box!
npm run build
```

Or set environment variables in your deployment platform:

```bash
SITE=https://your-site.netlify.app
```

### GitHub Pages (Subdirectory)

```bash
# Set in .env or as environment variables
SITE=https://yourusername.github.io
npm run build
```

### Local Development with Base Path

```bash
# Set in .env
SITE=http://localhost:4321
BASE_PATH=/volks-typo/

npm run dev
```

### Build Commands

```bash
# Standard build
npm run build

# Build with custom environment
SITE=https://example.com BASE_PATH=/blog/ npm run build
```

## 📊 Performance

Volks-Typo is optimized for speed and efficiency:

- **Zero JavaScript** - Pure HTML and CSS
- **Minimal CSS** - ~20KB gzipped total
- **Self-hosted fonts** - No external requests
- **Optimized images** - Using Astro's Image component
- **Static generation** - Fast page loads

## 🎯 Customization Guide

### Colors

Edit CSS variables in `src/styles/global.css`:

```css
:root {
  /* Monotone Palette */
  --color-white: #ffffff;
  --color-light-gray: #f5f5f5;
  --color-medium-gray: #888888;
  --color-dark-gray: #333333;
  --color-black: #000000;

  /* Accent Color */
  --color-accent-red: #dc2626;
}
```

### Typography

Modify font families in `src/styles/global.css`:

```css
:root {
  --font-heading-primary: 'Oswald', sans-serif;
  --font-heading-secondary: 'Roboto Condensed', sans-serif;
  --font-body: 'Work Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

### Layout

The theme uses CSS Grid for layouts. Key files:

- `src/components/Layout.astro` - Main grid container
- `src/components/Sidebar.astro` - Desktop sidebar
- `src/styles/global.css` - Responsive breakpoints

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the CC0 1.0 Universal (CC0 1.0) Public Domain Dedication - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build)
- Icons by [Lucide](https://lucide.dev/)
- Fonts by [Fontsource](https://fontsource.org/)
- Inspired by the urgent need for decolonial, eco-socialist transformation

## 📋 Project Information

- **Author:** Timothy Brits
- **Location:** South Africa
- **Focus:** Eco-socialist analysis and decolonial thought
- **Repository:** [GitHub](https://github.com/timothyforchange/konscio)
- **Live Site:** [timothyforchange.co.za](https://timothyforchange.co.za)

---

**Timothy for Change** • CC0 1.0 License
