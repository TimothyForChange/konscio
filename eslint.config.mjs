import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import stylelintConfig from 'eslint-config-stylelint';
import eslintPluginAstro from 'eslint-plugin-astro';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  {
    ignores: ['.astro/**', 'dist/**'],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginUnicorn.configs.recommended,
  ...stylelintConfig,
  eslintPluginAstro.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      'unicorn/filename-case': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'n/no-unpublished-import': 'off',
      'n/no-missing-import': 'off',
      'sort-imports': 'off',
    },
  }
);
