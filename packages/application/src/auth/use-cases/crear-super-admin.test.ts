import { describe, expect, it } from 'vitest';

import {
  Email,
  PasswordHash,
  Persona,
  Usuario,
  type Result,
} from '@taller/domain';

import { type Hasher } from '@app/auth/ports/hasher';
import { type UsuarioRepository } from '@app/auth/ports/usuario-repository';
import { type Clock } from '@app/shared/ports/clock';
import { type IdGenerator } from '@app/shared/ports/id-generator';
import { crearSuperAdmin } from '@app/auth/use-cases/crear-super-admin';

const desempaquetar = <T, E>(resultado: Result<T, E>): T => {
  if (!resultado.ok) {
    throw new Error(
      `Fixture inválida: ${JSON.stringify(resultado.error)}`,
    );
  }
  return resultado.value;
};

const FECHA_FIJA = new Date('2026-05-26T12:00:00.000Z');
const ID_GENERADO_1 = 'aaaaaaaa-aaaa-7aaa-8aaa-aaaaaaaaaaaa';
const ID_GENERADO_2 = 'bbbbbbbb-bbbb-7bbb-8bbb-bbbbbbbbbbbb';
const HASH_FAKE = '$2b$12$hash-generado-por-fake';

const clock: Clock = { now: () => FECHA_FIJA };

const idGeneratorSecuencial = (...ids: string[]): IdGenerator => {
  let i = 0;
  return {
    generate: () => {
      const valor = ids[i] ?? `id-extra-${i}`;
      i += 1;
      return valor;
    },
  };
};

const hasherFake: Hasher = {
  hash: async () => HASH_FAKE,
  verify: async () => true,
};

type RepoEspia = UsuarioRepository & {
  guardado: () => Usuario | null;
};

const repoVacio = (): RepoEspia => {
  let guardado: Usuario | null = null;
  return {
    findByEmail: async () => null,
    save: async (u) => {
      guardado = u;
    },
    guardado: () => guardado,
  };
};

const repoConUsuario = (usuario: Usuario): RepoEspia => {
  let guardado: Usuario | null = null;
  return {
    findByEmail: async () => usuario,
    save: async (u) => {
      guardado = u;
    },
    guardado: () => guardado,
  };
};

const usuarioPreexistente = (): Usuario => {
  const persona = desempaquetar(
    Persona.crear({
      id: '99999999-9999-9999-9999-999999999999',
      nombre: 'Ya existente',
      creadoEn: FECHA_FIJA,
    }),
  );
  const email = desempaquetar(Email.crear('admin@taller.test'));
  const passwordHash = desempaquetar(PasswordHash.crear('$2b$12$lo-que-sea'));
  return desempaquetar(
    Usuario.crear({
      id: '88888888-8888-8888-8888-888888888888',
      persona,
      email,
      passwordHash,
      rol: 'administrador',
      creadoEn: FECHA_FIJA,
    }),
  );
};

describe('crearSuperAdmin', () => {
  it('crea y persiste un usuario con rol administrador y password hasheado', async () => {
    const repo = repoVacio();

    const resultado = await crearSuperAdmin(
      {
        usuarioRepository: repo,
        hasher: hasherFake,
        idGenerator: idGeneratorSecuencial(ID_GENERADO_1, ID_GENERADO_2),
        clock,
      },
      {
        email: 'admin@taller.test',
        nombre: 'Admin Principal',
        password: 'password-en-claro',
      },
    );

    expect(resultado.ok).toBe(true);
    if (resultado.ok) {
      expect(resultado.value.email).toBe('admin@taller.test');
      expect(resultado.value.usuarioId).toBe(ID_GENERADO_2);
    }

    const guardado = repo.guardado();
    expect(guardado).not.toBeNull();
    if (guardado !== null) {
      expect(guardado.rol).toBe('administrador');
      expect(guardado.email.valor).toBe('admin@taller.test');
      expect(guardado.persona.nombre).toBe('Admin Principal');
      expect(guardado.persona.id).toBe(ID_GENERADO_1);
      expect(guardado.id).toBe(ID_GENERADO_2);
      expect(guardado.passwordHash.valor).toBe(HASH_FAKE);
      expect(guardado.passwordHash.valor).not.toBe('password-en-claro');
      expect(guardado.creadoEn).toEqual(FECHA_FIJA);
    }
  });

  it('devuelve EmailInvalido y no persiste cuando el email es malformado', async () => {
    const repo = repoVacio();

    const resultado = await crearSuperAdmin(
      {
        usuarioRepository: repo,
        hasher: hasherFake,
        idGenerator: idGeneratorSecuencial(ID_GENERADO_1, ID_GENERADO_2),
        clock,
      },
      {
        email: 'no-es-email',
        nombre: 'Admin',
        password: 'password-en-claro',
      },
    );

    expect(resultado.ok).toBe(false);
    if (!resultado.ok) {
      expect(resultado.error.kind).toBe('EmailInvalido');
    }
    expect(repo.guardado()).toBeNull();
  });

  it('devuelve NombreVacio y no persiste cuando el nombre es vacío', async () => {
    const repo = repoVacio();

    const resultado = await crearSuperAdmin(
      {
        usuarioRepository: repo,
        hasher: hasherFake,
        idGenerator: idGeneratorSecuencial(ID_GENERADO_1, ID_GENERADO_2),
        clock,
      },
      {
        email: 'admin@taller.test',
        nombre: '   ',
        password: 'password-en-claro',
      },
    );

    expect(resultado.ok).toBe(false);
    if (!resultado.ok) {
      expect(resultado.error.kind).toBe('NombreVacio');
    }
    expect(repo.guardado()).toBeNull();
  });

  it('devuelve EmailYaRegistrado y no persiste cuando ya existe un usuario con ese email', async () => {
    const repo = repoConUsuario(usuarioPreexistente());

    const resultado = await crearSuperAdmin(
      {
        usuarioRepository: repo,
        hasher: hasherFake,
        idGenerator: idGeneratorSecuencial(ID_GENERADO_1, ID_GENERADO_2),
        clock,
      },
      {
        email: 'admin@taller.test',
        nombre: 'Admin Nuevo',
        password: 'password-en-claro',
      },
    );

    expect(resultado.ok).toBe(false);
    if (!resultado.ok) {
      expect(resultado.error.kind).toBe('EmailYaRegistrado');
    }
    expect(repo.guardado()).toBeNull();
  });
});
