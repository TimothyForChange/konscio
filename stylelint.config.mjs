/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-html'],
  ignoreFiles: ['dist/**', '.astro/**'],
  overrides: [
    {
      files: ['**/*.css'],
    },
    {
      files: ['**/*.astro'],
      customSyntax: 'postcss-html',
    },
  ],
};
