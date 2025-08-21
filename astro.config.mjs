import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import playformCompress from '@playform/compress';
import playformInline from '@playform/inline';
import { FontaineTransform } from 'fontaine';

const fontaineOptions = {
  fallbacks: [
    'Poppins',
    'Montserrat',
    'Nunito',
    'Quicksand',
    'Rubik',
    'Raleway',
    'Lato',
    'Open Sans',
    'Inter',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Helvetica Neue',
    'Arial',
    'Noto Sans',
    'Verdana',
    'Tahoma',
    'Geneva',
    'sans-serif',
  ],
  // You may need to resolve assets like `/fonts/font.woff2` to a particular directory
  // resolvePath: id => `file:///path/to/public/dir${id}`,
};

export default defineConfig({
  integrations: [sitemap(), playformCompress(), playformInline()],
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
