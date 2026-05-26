import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from '@infra/persistence/drizzle/schema';

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error(
    'DATABASE_URL no está definida en el entorno de test. Corré los tests con --env-file=../../.env.test (ver scripts del paquete).',
  );
}

const pool = new Pool({ connectionString: url });

export const db = drizzle(pool, { schema });
export type DbTest = typeof db;

export const truncateAll = async (): Promise<void> => {
  await db.execute(
    sql`TRUNCATE TABLE persona, usuario, sesion RESTART IDENTITY CASCADE`,
  );
};
