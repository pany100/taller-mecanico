import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@infra': fileURLToPath(new URL('./src', import.meta.url)),
      '@domain': fileURLToPath(new URL('../domain/src', import.meta.url)),
      '@app': fileURLToPath(new URL('../application/src', import.meta.url)),
    },
  },
});
