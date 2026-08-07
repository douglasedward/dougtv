import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import boundaries from 'eslint-plugin-boundaries';
import globals from 'globals';

export default defineConfig([
  globalIgnores([
    '**/dist/**',
    '**/.next/**',
    '**/node_modules/**',
    'packages/proto/gen/**',
    '**/*.config.mjs',
  ]),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  // Module boundary enforcement for the consolidated control app.
  {
    files: ['services/control/src/**/*.ts'],
    plugins: { boundaries },
    settings: {
      'boundaries/elements': [
        { type: 'module-api', pattern: 'services/control/src/modules/*/index.ts', mode: 'full' },
        { type: 'module-internal', pattern: 'services/control/src/modules/*/**', mode: 'full' },
        { type: 'shared', pattern: 'services/control/src/shared/**', mode: 'full' },
        { type: 'root', pattern: 'services/control/src/*.ts', mode: 'full' },
      ],
    },
    rules: {
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'root', allow: ['module-api', 'shared'] },
            { from: 'module-api', allow: ['module-internal', 'shared'] },
            {
              from: 'module-internal',
              allow: ['module-internal', 'module-api', 'shared'],
              importKind: 'value',
            },
            { from: 'shared', allow: ['shared'] },
          ],
        },
      ],
    },
  },
  {
    files: ['services/control/src/modules/*/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../*/[!i]*', '../*/*/**', '../../modules/*/[!i]*'],
              message:
                'Import another module only through its public index.ts (e.g. `../channel`). Deep imports across modules defeat the boundary that keeps this app extractable.',
            },
          ],
        },
      ],
    },
  },
]);
