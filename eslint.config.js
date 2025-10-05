// ESLint flat config for Astro + TypeScript + Unicorn
// See: https://eslint.org/docs/latest/use/configure/configuration-files-new
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import astro from 'eslint-plugin-astro';
import unicorn from 'eslint-plugin-unicorn';

export default [
  // Ignore build output & generated artifacts
  { ignores: ['dist', '.astro'] },

  // Astro flat recommended (explicit reference for flat configs)
  ...astro.configs['flat/recommended'],

  // Astro file-specific tweaks (the recommended config already wires the processor)
  {
    files: ['**/*.astro'],
    rules: {
      'unicorn/filename-case': 'off',
    },
  },

  // TypeScript + shared rules
  {
    files: ['**/*.{ts,tsx,js,mjs,astro}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // Allow parsing in Astro scripts
        extraFileExtensions: ['.astro'],
        project: false,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      unicorn,
    },
    rules: {
      // Merge TS recommended if available
      ...tsPlugin.configs.recommended?.rules,
      // Add unicorn recommended
      ...unicorn.configs.recommended.rules,
      // Custom sensible adjustments (tweak as preferred)
      'unicorn/prefer-node-protocol': 'off', // Not critical in browser/astro context
      'unicorn/prevent-abbreviations': 'off', // Too noisy for many codebases
      // Example TS rule tweaks (none enabled yet)
      // '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
];
