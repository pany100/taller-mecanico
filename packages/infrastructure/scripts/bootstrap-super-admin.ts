import { randomBytes } from 'node:crypto';

import { crearSuperAdmin } from '@taller/application';

import { hasher } from '@infra/auth/hasher/hasher';
import { db } from '@infra/persistence/drizzle/client';
import { crearUsuarioRepository } from '@infra/persistence/drizzle/repositories/usuario/usuario.repository';
import { clock } from '@infra/shared/clock/clock';
import { idGenerator } from '@infra/shared/id-generator/id-generator';

const LARGO_PASSWORD_BYTES = 18;

const uso = (): string =>
  'Uso: pnpm bootstrap:super-admin -- --email=<email> --nombre="<nombre>"';

const leerArg = (nombre: string): string | undefined => {
  const prefijo = `--${nombre}=`;
  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith(prefijo)) {
      return arg.slice(prefijo.length);
    }
  }
  return undefined;
};

const generarPassword = (): string =>
  randomBytes(LARGO_PASSWORD_BYTES).toString('base64url');

const main = async (): Promise<void> => {
  const email = leerArg('email');
  const nombre = leerArg('nombre');

  if (email === undefined || nombre === undefined) {
    console.error(uso());
    process.exit(2);
  }

  const password = generarPassword();

  const resultado = await crearSuperAdmin(
    {
      usuarioRepository: crearUsuarioRepository(db),
      hasher,
      idGenerator,
      clock,
    },
    { email, nombre, password },
  );

  if (!resultado.ok) {
    const error = resultado.error;
    switch (error.kind) {
      case 'EmailInvalido':
        console.error(`Error: el email "${error.valorRecibido}" no es válido.`);
        break;
      case 'NombreVacio':
        console.error('Error: el nombre no puede estar vacío.');
        break;
      case 'NombreMuyLargo':
        console.error(
          `Error: el nombre excede el máximo de ${error.maximo} caracteres (recibido: ${error.largoRecibido}).`,
        );
        break;
      case 'EmailYaRegistrado':
        console.error(`Error: ya existe un usuario con el email "${email}".`);
        break;
    }
    process.exit(1);
  }

  console.log('Super-admin creado.');
  console.log(`  id:    ${resultado.value.usuarioId}`);
  console.log(`  email: ${resultado.value.email}`);
  console.log('');
  console.log('Password generada (se muestra UNA sola vez, guardala ahora):');
  console.log('');
  console.log(`  ${password}`);
  console.log('');
  console.log('No se vuelve a mostrar. No queda en disco ni en el historial.');
};

await main();
process.exit(0);
