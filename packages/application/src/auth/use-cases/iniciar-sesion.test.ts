import { describe, expect, it } from 'vitest';

import {
  Email,
  Persona,
  PasswordHash,
  Usuario,
  type Result,
} from '@taller/domain';

import { Sesion } from '@app/auth/entities/sesion';
import { type Hasher } from '@app/auth/ports/hasher';
import { type SesionRepository } from '@app/auth/ports/sesion-repository';
import { type TokenGenerator } from '@app/auth/ports/token-generator';
import { type TokenHasher } from '@app/auth/ports/token-hasher';
import { type UsuarioRepository } from '@app/auth/ports/usuario-repository';
import { type Clock } from '@app/shared/ports/clock';
import { type IdGenerator } from '@app/shared/ports/id-generator';
import { iniciarSesion } from '@app/auth/use-cases/iniciar-sesion';

const desempaquetar = <T, E>(resultado: Result<T, E>): T => {
  if (!resultado.ok) {
    throw new Error(
      `Fixture inválida: se esperaba ok pero llegó ${JSON.stringify(resultado.error)}`,
    );
  }
  return resultado.value;
};

const FECHA_FIJA = new Date('2026-05-22T12:00:00.000Z');
const ID_PERSONA = '11111111-1111-1111-1111-111111111111';
const ID_USUARIO = '22222222-2222-2222-2222-222222222222';
const ID_SESION = '33333333-3333-3333-3333-333333333333';
const EMAIL_USUARIO = 'juana@taller.test';
const PASSWORD_HASH_USUARIO = '$2b$10$abcdefghijklmnopqrstuv';
const TOKEN_PLANO = 'token-plano-aleatorio';
const TOKEN_HASH = 'token-hasheado-sha256';
const SIETE_DIAS_EN_MS = 7 * 24 * 60 * 60 * 1000;

const usuarioValido = (): Usuario => {
  const persona = desempaquetar(
    Persona.crear({
      id: ID_PERSONA,
      nombre: 'Juana Pérez',
      creadoEn: FECHA_FIJA,
    }),
  );
  const email = desempaquetar(Email.crear(EMAIL_USUARIO));
  const passwordHash = desempaquetar(PasswordHash.crear(PASSWORD_HASH_USUARIO));
  return desempaquetar(
    Usuario.crear({
      id: ID_USUARIO,
      persona,
      email,
      passwordHash,
      rol: 'miembro',
      creadoEn: FECHA_FIJA,
    }),
  );
};

const repoCon = (usuario: Usuario | null): UsuarioRepository => ({
  findByEmail: async () => usuario,
  save: async () => {},
});

const hasherQue = (coincide: boolean): Hasher => ({
  hash: async (password) => `hash-de-${password}`,
  verify: async () => coincide,
});

const tokenGenerator: TokenGenerator = { generate: () => TOKEN_PLANO };
const tokenHasher: TokenHasher = { hash: () => TOKEN_HASH };
const idGenerator: IdGenerator = { generate: () => ID_SESION };
const clock: Clock = { now: () => FECHA_FIJA };

describe('iniciarSesion · resultados', () => {
  it('devuelve EmailInvalido cuando el email es malformado', async () => {
    let sesionGuardada: Sesion | null = null;
    const sesionRepository: SesionRepository = {
      save: async (s) => {
        sesionGuardada = s;
      },
    };

    const resultado = await iniciarSesion(
      {
        usuarioRepository: repoCon(null),
        hasher: hasherQue(false),
        tokenGenerator,
        tokenHasher,
        idGenerator,
        clock,
        sesionRepository,
      },
      { email: 'basura', password: 'cualquiera' },
    );

    expect(resultado.ok).toBe(false);
    if (!resultado.ok) {
      expect(resultado.error.kind).toBe('EmailInvalido');
    }
    expect(sesionGuardada).toBeNull();
  });

  it('devuelve CredencialesInvalidas cuando el usuario no existe', async () => {
    let sesionGuardada: Sesion | null = null;
    const sesionRepository: SesionRepository = {
      save: async (s) => {
        sesionGuardada = s;
      },
    };

    const resultado = await iniciarSesion(
      {
        usuarioRepository: repoCon(null),
        hasher: hasherQue(false),
        tokenGenerator,
        tokenHasher,
        idGenerator,
        clock,
        sesionRepository,
      },
      { email: EMAIL_USUARIO, password: 'cualquiera' },
    );

    expect(resultado.ok).toBe(false);
    if (!resultado.ok) {
      expect(resultado.error.kind).toBe('CredencialesInvalidas');
    }
    expect(sesionGuardada).toBeNull();
  });

  it('devuelve CredencialesInvalidas cuando el password no coincide', async () => {
    let sesionGuardada: Sesion | null = null;
    const sesionRepository: SesionRepository = {
      save: async (s) => {
        sesionGuardada = s;
      },
    };

    const resultado = await iniciarSesion(
      {
        usuarioRepository: repoCon(usuarioValido()),
        hasher: hasherQue(false),
        tokenGenerator,
        tokenHasher,
        idGenerator,
        clock,
        sesionRepository,
      },
      { email: EMAIL_USUARIO, password: 'no-es-la-correcta' },
    );

    expect(resultado.ok).toBe(false);
    if (!resultado.ok) {
      expect(resultado.error.kind).toBe('CredencialesInvalidas');
    }
    expect(sesionGuardada).toBeNull();
  });

  it('en login exitoso devuelve el token plano y expiraEn = creadoEn + 7 días', async () => {
    let sesionGuardada: Sesion | null = null;
    const sesionRepository: SesionRepository = {
      save: async (s) => {
        sesionGuardada = s;
      },
    };

    const resultado = await iniciarSesion(
      {
        usuarioRepository: repoCon(usuarioValido()),
        hasher: hasherQue(true),
        tokenGenerator,
        tokenHasher,
        idGenerator,
        clock,
        sesionRepository,
      },
      { email: EMAIL_USUARIO, password: 'la-correcta' },
    );

    expect(resultado.ok).toBe(true);
    if (resultado.ok) {
      expect(resultado.value.token).toBe(TOKEN_PLANO);
      expect(resultado.value.expiraEn.getTime() - FECHA_FIJA.getTime()).toBe(
        SIETE_DIAS_EN_MS,
      );
    }

    const sesion = sesionGuardada as Sesion | null;
    expect(sesion).not.toBeNull();
    if (sesion !== null) {
      expect(sesion.usuarioId).toBe(ID_USUARIO);
      expect(sesion.tokenHash).toBe(TOKEN_HASH);
      expect(sesion.tokenHash).not.toBe(TOKEN_PLANO);
    }
  });
});
