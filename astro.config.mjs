import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import playformInline from '@playform/inline';
import compressor from 'astro-compressor';
import purgecss from 'astro-purgecss';
import { defineConfig } from 'astro/config';
import { FontaineTransform } from 'fontaine';
import { remarkReadingTime } from './plugins/remark-reading-time.ts';
import { config } from './src/config';
import { getCachedHighlighter } from './src/utils/highlighter.js';

const fontaineOptions = {
  fallbacks: [
    'Oswald Variable',
    'Oswald',
    'Work Sans Variable',
    'Work Sans',
    'JetBrains Mono Variable',
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
  output: 'server',

  prefetch: {
    defaultStrategy: 'viewport',
  },
  image: {},
  build: {
    assetsInlineLimit: 4096,
    cacheDir: './.astro-cache',
  },
  integrations: [
    mdx(),
    sitemap(),
    playformInline({
      Logger: 0,
    }),
    purgecss(),
    compressor({
      gzip: true,
      brotli: true,
      zstd: true,
    }),
  ],
  vite: {
    plugins: [FontaineTransform.vite(fontaineOptions)],
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
      highlighter: getCachedHighlighter,
    },
    remarkPlugins: [remarkReadingTime],
  },
  adapter: cloudflare(),
});
