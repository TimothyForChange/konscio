import sitemap from '@astrojs/sitemap';
import playformCompress from '@playform/compress';
import playformInline from '@playform/inline';
import { defineConfig } from 'astro/config';
import { FontaineTransform } from 'fontaine';
import brokenLinksIntegration from './plugins/brokenLinksIntegration.mjs';

const fontaineOptions = {
  fallbacks: [
    'Geist Variable',
    'Geist',
    'Inter',
    '-apple-system',
    'system-ui',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Noto Color Emoji',
  ],
};

export default defineConfig({
  integrations: [
    sitemap(),
    playformCompress(),
    playformInline(),
    brokenLinksIntegration({
      warnOnly: true,
      concurrency: 6,
      timeout: 9000,
      cache: true,
      cacheMaxAgeMs: 60 * 1000,
    }),
  ],
  site: 'https://mooship.co.za',
  trailingSlash: 'never',
  output: 'static',
  build: {
    assetsInlineLimit: 4096,
    cacheDir: './.astro-cache',
  },
  vite: {
    plugins: [FontaineTransform.vite(fontaineOptions)],
  },
});
