import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import boundaries from 'eslint-plugin-boundaries';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const nextScoped = [...nextCoreWebVitals, ...nextTypescript].map((cfg) => ({
  ...cfg,
  files: ['apps/web/**/*.{ts,tsx,js,jsx}'],
}));

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/*.config.{js,mjs,cjs,ts}',
      'apps/web/next-env.d.ts',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...nextScoped,
  {
    files: ['apps/web/**/*.{ts,tsx}'],
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { boundaries },
    settings: {
      'boundaries/elements': [
        { type: 'domain', pattern: 'packages/domain/src', mode: 'folder' },
        {
          type: 'application',
          pattern: 'packages/application/src',
          mode: 'folder',
        },
        {
          type: 'infrastructure',
          pattern: 'packages/infrastructure/src',
          mode: 'folder',
        },
        { type: 'web', pattern: 'apps/web/src', mode: 'folder' },
      ],
      'import/resolver': {
        typescript: {
          project: [
            './packages/domain/tsconfig.json',
            './packages/application/tsconfig.json',
            './packages/infrastructure/tsconfig.json',
            './apps/web/tsconfig.json',
          ],
          noWarnOnMultipleProjects: true,
        },
        node: true,
      },
    },
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: { type: 'application' },
              allow: { to: { type: 'domain' } },
            },
            {
              from: { type: 'infrastructure' },
              allow: { to: { type: ['domain', 'application'] } },
            },
            {
              from: { type: 'web' },
              allow: { to: { type: 'application' } },
            },
          ],
        },
      ],
      'boundaries/no-unknown': 'off',
      'boundaries/no-unknown-files': 'off',
    },
  },
];
