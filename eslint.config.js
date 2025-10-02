import js from '@eslint/js';
import astroPlugin from 'eslint-plugin-astro';
import unicorn from 'eslint-plugin-unicorn';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

const astroRecommended = astroPlugin.configs.recommended;

export default defineConfig([
  { ignores: ['dist', '.astro'] },

  ...(Array.isArray(astroRecommended) ? astroRecommended : [astroRecommended]),

  {
    files: ['**/*.{js,mjs,cjs}'],
    ...js.configs.recommended,
    languageOptions: {
      globals: { ...globals.browser },
    },
    plugins: { unicorn },
    rules: {
      ...unicorn.configs?.recommended?.rules,
    },
  },
]);
