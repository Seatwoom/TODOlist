export default {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error',
  },
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  ignorePatterns: ['node_modules/', 'build/', 'dist/'],
};
