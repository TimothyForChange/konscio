import sitemap from '@astrojs/sitemap';
import playformCompress from '@playform/compress';
import playformInline from '@playform/inline';
import { defineConfig } from 'astro/config';
import { FontaineTransform } from 'fontaine';

const fontaineOptions = {
  fallbacks: [
    'Inter Variable',
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
  integrations: [sitemap(), playformCompress(), playformInline()],
  site: 'https://timothyforchange.co.za',
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
