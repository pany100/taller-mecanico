import { resolve } from 'node:path';
import { defineConfig } from 'drizzle-kit';

const envPath = resolve(import.meta.dirname, '../../.env');
process.loadEnvFile(envPath);

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error(
    `DATABASE_URL no está definida. Se esperaba en ${envPath}.`,
  );
}

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/persistence/drizzle/schema',
  out: './src/persistence/drizzle/migrations',
  dbCredentials: { url },
});
