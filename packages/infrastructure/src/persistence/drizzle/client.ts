import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    'DATABASE_URL is not defined. The process must provide it via the environment.',
  );
}

const pool = new Pool({ connectionString });

// When the schema is added, pass it as the second argument:
// drizzle(pool, { schema }) to enable typed relational queries.
export const db = drizzle(pool);
