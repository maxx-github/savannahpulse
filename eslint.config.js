// ESLint flat configuration using FlatCompat with TypeScript parser applied globally

try {
  const { FlatCompat } = require('@eslint/eslintrc');
  const compat = new FlatCompat({ baseDirectory: __dirname });

  module.exports = [
    // include Next.js shared config(s)
    ...compat.extends('next/core-web-vitals'),

    // Force TypeScript parser for all JS/TS files so JSX and TS syntax parse correctly
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      ignores: ['.next/**', 'node_modules/**'],
      languageOptions: {
        parser: require('@typescript-eslint/parser'),
        parserOptions: {
          ecmaVersion: 2020,
          sourceType: 'module',
          ecmaFeatures: { jsx: true },
        },
      },
      plugins: { '@typescript-eslint': require('@typescript-eslint/eslint-plugin') },
      rules: {
        // project-specific overrides go here
      },
    },
  ];
} catch (e) {
  module.exports = [
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      ignores: ['.next/**', 'node_modules/**'],
      languageOptions: { parserOptions: { ecmaVersion: 2020, sourceType: 'module', ecmaFeatures: { jsx: true } } },
      rules: {},
    },
  ];
}
