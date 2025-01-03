import globals from 'globals';
import js from '@eslint/js';

export default [
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      globals: { ...globals.browser },
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      semi: 'error',
      'no-unused-vars': 'warn',
    },
  },
];
