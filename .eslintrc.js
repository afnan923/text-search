/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  ignorePatterns: [
    'dist/**'
  ],
  rules: {
    quotes: 'off',
    '@typescript-eslint/quotes': ['error', 'single'],
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': 'error',
    'comma-spacing': 'off',
    '@typescript-eslint/comma-spacing': ['error', { 'before': false, 'after': true }],
    'no-extra-semi': 'off',
    '@typescript-eslint/no-extra-semi': 'error',
    'semi': 'off',
    '@typescript-eslint/semi': 'error',
    'brace-style': 'off',
    '@typescript-eslint/brace-style': 'error'
  }
};
