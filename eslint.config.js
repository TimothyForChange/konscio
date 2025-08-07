import js from '@eslint/js';
import globals from 'globals';
import astro from 'eslint-plugin-astro';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: ['dist', '.astro'],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  ...astro.configs.recommended,
]);
