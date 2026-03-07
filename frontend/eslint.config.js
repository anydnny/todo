// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
// import storybook from 'eslint-plugin-storybook';

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig, globalIgnores } from 'eslint/config';
import css from '@eslint/css';

const legacyStructurePatterns = [
  {
    group: [
      '**/components/Task/**',
      '**/components/Projects/**',
      '**/components/Layout/**',
      '**/components/shared/ui/**',
      '**/components/shared/buttons/DeleteButton',
      '**/store/slices/**',
      '**/utils/taskTypes',
      '**/utils/projectTypes',
      '**/utils/uiTypes',
    ],
    message: 'Use FSD-lite modules under src/features, src/widgets, or src/shared.',
  },
];

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'prefer-const': 'warn',
      'no-var': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: legacyStructurePatterns,
        },
      ],
    },
    ignores: ['node_modules', 'dist'],
  },
  {
    files: ['src/shared/**/*.{js,ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            ...legacyStructurePatterns,
            {
              group: ['**/features/**', '**/widgets/**'],
              message: '`shared` layer must not depend on `features` or `widgets`.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/features/**/*.{js,ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            ...legacyStructurePatterns,
            {
              group: ['**/widgets/**'],
              message: '`features` layer must not depend on `widgets`.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.css'],
    plugins: {
      css,
    },
    language: 'css/css',
    rules: {
      'css/no-duplicate-imports': 'error',
    },
  },
]);
