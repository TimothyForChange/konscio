import js from '@eslint/js';
import globals from 'globals';
import astro from 'eslint-plugin-astro';
import { defineConfig } from 'eslint/config';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export default defineConfig([
  {
    ignores: ['dist', '.astro'],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, unicorn: eslintPluginUnicorn },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  ...astro.configs.recommended,
]);
