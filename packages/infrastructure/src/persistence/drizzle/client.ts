import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '@infra/persistence/drizzle/schema';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    'DATABASE_URL is not defined. The process must provide it via the environment.',
  );
}

const pool = new Pool({ connectionString });

export const db = drizzle(pool, { schema });
