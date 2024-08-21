import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { ignores: ['node_modules', 'dist', 'public', ''] },
  js.configs.recommended,
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 12,
        sourceType: 'module',
        ...globals.node,
      },
    },
  },
  {
    rules: {
      'prettier/prettier': ['error', { usePrettierrc: true }],
      'arrow-body-style': ['error', 'always'],
      'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'no-param-reassign': 'off',
      'no-shadow': 'off',
      'class-methods-use-this': 'off',
      'no-unused-vars': 'off',
      'import/prefer-default-export': 'off',
      'import/no-import-module-exports': 'off',
      'default-param-last': 'off',
      radix: 'off',
      'consistent-return': 'off',
      'no-restricted-syntax': 'off',
      'dot-notation': 'off',
      'no-unused-expressions': 'off',
      'no-useless-constructor': 'off',
      'no-empty-function': 'off',
      'no-await-in-loop': 'off',
      'no-undef': 'off',
      'no-nested-ternary': 'off',
      'no-use-before-define': 'off',

      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
    },
  },
];
