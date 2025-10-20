import css from '@eslint/css';
import eslint from '@eslint/js';
import json from '@eslint/json';
import ts from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-config-prettier/flat';
import astro from 'eslint-plugin-astro';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import { defineConfig } from 'eslint/config';

const jsFiles = ['*.js', '*.mjs'];
const tsFiles = ['*.ts'];
const astroFiles = ['*.astro'];
const cssFiles = ['*.css', '*.astro'];
const jsonFiles = ['*.json'];
const unicornFiles = ['*.js', '*.ts', '*.mjs', '*.astro'];

const jsPlugins = { sonarjs };
const tsPlugins = { '@typescript-eslint': ts, sonarjs };
const astroPlugins = { astro };
const cssPlugins = { css };
const jsonPlugins = { json };
const unicornPlugins = { unicorn };

export default defineConfig(
  {
    files: jsFiles,
    languageOptions: {
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    },
    plugins: jsPlugins,
    rules: {
      ...eslint.configs.recommended.rules,
      ...sonarjs.configs.recommended.rules,
    },
  },
  {
    files: tsFiles,
    plugins: tsPlugins,
    rules: {
      ...ts.configs.recommended.rules,
      ...sonarjs.configs.recommended.rules,
    },
  },
  {
    files: astroFiles,
    plugins: { ...astroPlugins, ...tsPlugins },
    rules: {
      ...astro.configs.recommended.rules,
      ...ts.configs.recommended.rules,
      ...sonarjs.configs.recommended.rules,
    },
  },
  {
    files: cssFiles,
    language: 'css/css',
    plugins: cssPlugins,
    rules: css.configs.recommended.rules,
  },
  {
    files: jsonFiles,
    ignores: ['package-lock.json'],
    language: 'json/json',
    plugins: jsonPlugins,
    rules: json.configs.recommended.rules,
  },
  {
    files: unicornFiles,
    plugins: unicornPlugins,
    rules: {
      ...unicorn.configs.recommended.rules,
      'unicorn/filename-case': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
  prettier
);
