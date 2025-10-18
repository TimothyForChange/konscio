import css from '@eslint/css';
import eslint from '@eslint/js';
import json from '@eslint/json';
import ts from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-config-prettier/flat';
import astro from 'eslint-plugin-astro';
import unicorn from 'eslint-plugin-unicorn';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  {
    ignores: [
      'dist/**',
      '**/node_modules/**',
      '.astro/**',
      '.qwen/**',
      '.vscode/**',
    ],
  },
  {
    files: ['*.js', '*.cjs', '*.mjs'],
    languageOptions: {
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    },
    ...eslint.configs.recommended,
  },
  {
    files: ['*.ts', '*.tsx'],
    plugins: { '@typescript-eslint': ts },
    rules: ts.configs.recommended.rules,
  },
  {
    files: ['*.astro'],
    plugins: { astro },
    rules: astro.configs.recommended.rules,
  },
  {
    files: ['*.css', '*.astro'],
    language: 'css/css',
    plugins: { css },
    rules: css.configs.recommended.rules,
  },
  {
    files: ['*.json'],
    ignores: ['package-lock.json'],
    language: 'json/json',
    plugins: { json },
    rules: json.configs.recommended.rules,
  },
  {
    files: ['*.js', '*.ts', '*.tsx', '*.astro'],
    plugins: { unicorn },
    rules: {
      ...unicorn.configs.recommended.rules,
      'unicorn/filename-case': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'sort-imports': 'off',
    },
  },
  prettier
);
