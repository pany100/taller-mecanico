import { fileURLToPath } from 'node:url';

import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

export default async function setup(): Promise<void> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      'DATABASE_URL no está definida. Corré los tests de integración con --env-file=../../.env.test.',
    );
  }

  const migrationsFolder = fileURLToPath(
    new URL('../persistence/drizzle/migrations', import.meta.url),
  );

  const pool = new Pool({ connectionString: url });
  const db = drizzle(pool);
  await migrate(db, { migrationsFolder });
  await pool.end();
}
