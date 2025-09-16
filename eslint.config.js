import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

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
