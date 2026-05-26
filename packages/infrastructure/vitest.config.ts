import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

const envTestPath = fileURLToPath(new URL('../../.env.test', import.meta.url));
try {
  const contenido = readFileSync(envTestPath, 'utf-8');
  for (const linea of contenido.split('\n')) {
    const match = linea.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (match && process.env[match[1]] === undefined) {
      process.env[match[1]] = match[2];
    }
  }
} catch {
  // .env.test no existe: el globalSetup falla con mensaje claro si DATABASE_URL no se proveyó por otra vía.
}

const alias = {
  '@infra': fileURLToPath(new URL('./src', import.meta.url)),
  '@domain': fileURLToPath(new URL('../domain/src', import.meta.url)),
  '@app': fileURLToPath(new URL('../application/src', import.meta.url)),
};

export default defineConfig({
  test: {
    projects: [
      {
        resolve: { alias },
        test: {
          name: 'unit',
          include: ['src/**/*.test.ts'],
          exclude: ['src/**/*.integration.test.ts'],
        },
      },
      {
        resolve: { alias },
        test: {
          name: 'integration',
          include: ['src/**/*.integration.test.ts'],
          globalSetup: ['src/testing/global-setup.ts'],
          setupFiles: ['src/testing/db.ts'],
        },
      },
    ],
  },
});
