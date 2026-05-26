import { Client } from 'pg';

const url = process.env.DATABASE_URL;
if (!url) {
  console.error(
    'DATABASE_URL no está definida. Corré el script vía pnpm db:test:create (carga .env.test con --env-file).',
  );
  process.exit(1);
}

const parsed = new URL(url);
const dbName = parsed.pathname.replace(/^\//, '');
if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(dbName)) {
  console.error(`Nombre de base inválido: ${dbName}`);
  process.exit(1);
}

const adminUrl = new URL(url);
adminUrl.pathname = '/postgres';

const client = new Client({ connectionString: adminUrl.toString() });
await client.connect();

const { rows } = await client.query(
  'SELECT 1 FROM pg_database WHERE datname = $1',
  [dbName],
);

if (rows.length === 0) {
  await client.query(`CREATE DATABASE "${dbName}"`);
  console.log(`Base "${dbName}" creada.`);
} else {
  console.log(`Base "${dbName}" ya existe.`);
}

await client.end();
