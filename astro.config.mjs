import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import playformInline from '@playform/inline';
import compressor from 'astro-compressor';
import purgecss from 'astro-purgecss';
import { defineConfig } from 'astro/config';
import { FontaineTransform } from 'fontaine';
import { config } from './src/config';
import { getCachedHighlighter } from './src/utils/highlighter.js';

const fontaineOptions = {
  fallbacks: [
    'Oswald',
    'Roboto Condensed',
    'Work Sans',
    'JetBrains Mono',
    'system-ui',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
    'SFMono-Regular',
    'Monaco',
    'Consolas',
    'Liberation Mono',
    'Courier New',
    'monospace',
  ],
};

export default defineConfig({
  site: config.siteUrl,
  base: config.baseUrl,
  trailingSlash: 'never',
  output: 'static',
  build: {
    assetsInlineLimit: 4096,
    cacheDir: './.astro-cache',
  },
  integrations: [mdx(), sitemap(), playformInline(), purgecss(), compressor()],
  vite: {
    plugins: [FontaineTransform.vite(fontaineOptions)],
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
      highlighter: getCachedHighlighter,
    },
  },
});
