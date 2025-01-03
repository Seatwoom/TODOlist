import globals from 'globals';
import js from '@eslint/js';

export default [
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    plugins: [],
    extends: [],
    rules: {
      semi: 'error',
      'no-unused-vars': 'warn',
    },
  },
];
