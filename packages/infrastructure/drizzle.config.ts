import { defineConfig } from 'drizzle-kit';

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error(
    'DATABASE_URL is not defined. Run the script via pnpm db:generate / db:migrate so Node loads ../../.env.',
  );
}

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/persistence/drizzle/schema',
  out: './src/persistence/drizzle/migrations',
  dbCredentials: { url },
});
