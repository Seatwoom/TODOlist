import globals from 'globals';
import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';

export default [
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      globals: { ...globals.browser },
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      semi: 'error',
      'no-unused-vars': 'off',
    },
  },
];
