import { eq } from 'drizzle-orm';
import { beforeEach, describe, expect, it } from 'vitest';

import {
  Email,
  EntidadCorrupta,
  PasswordHash,
  Persona,
  Usuario,
  type Result,
} from '@taller/domain';

import { crearUsuarioRepository } from '@infra/persistence/drizzle/repositories/usuario/usuario.repository';
import { persona as personaTable } from '@infra/persistence/drizzle/schema/persona';
import { usuario as usuarioTable } from '@infra/persistence/drizzle/schema/usuario';
import { db, truncateAll } from '@infra/testing/db';

const desempaquetar = <T, E>(resultado: Result<T, E>): T => {
  if (!resultado.ok) {
    throw new Error(
      `Fixture inválida: ${JSON.stringify(resultado.error)}`,
    );
  }
  return resultado.value;
};

const emailDe = (valor: string): Email => {
  const resultado = Email.crear(valor);
  if (!resultado.ok) {
    throw new Error(`email de fixture inválido: ${valor}`);
  }
  return resultado.value;
};

describe('UsuarioRepository · integración', () => {
  beforeEach(async () => {
    await truncateAll();
  });

  describe('findByEmail', () => {
    it('devuelve el Usuario reconstruido con su Persona cuando existe', async () => {
      const personaId = crypto.randomUUID();
      const usuarioId = crypto.randomUUID();
      const creadoEn = new Date('2026-01-10T12:00:00Z');
      const actualizadoEn = new Date('2026-02-15T09:30:00Z');

      await db.insert(personaTable).values({
        id: personaId,
        nombre: 'Ana Mecánica',
        creadoEn,
        actualizadoEn,
      });

      await db.insert(usuarioTable).values({
        id: usuarioId,
        personaId,
        email: 'ana@taller.test',
        passwordHash: 'hash-de-prueba',
        rol: 'administrador',
        creadoEn,
        actualizadoEn,
      });

      const repo = crearUsuarioRepository(db);
      const encontrado = await repo.findByEmail(emailDe('ana@taller.test'));

      expect(encontrado).not.toBeNull();
      expect(encontrado?.id).toBe(usuarioId);
      expect(encontrado?.email.valor).toBe('ana@taller.test');
      expect(encontrado?.passwordHash.valor).toBe('hash-de-prueba');
      expect(encontrado?.rol).toBe('administrador');
      expect(encontrado?.creadoEn).toEqual(creadoEn);
      expect(encontrado?.actualizadoEn).toEqual(actualizadoEn);

      expect(encontrado?.persona.id).toBe(personaId);
      expect(encontrado?.persona.nombre).toBe('Ana Mecánica');
      expect(encontrado?.persona.creadoEn).toEqual(creadoEn);
      expect(encontrado?.persona.actualizadoEn).toEqual(actualizadoEn);
    });

    it('normaliza el email recibido (busca case-insensitive vía Email)', async () => {
      const personaId = crypto.randomUUID();
      const ahora = new Date('2026-03-01T00:00:00Z');

      await db.insert(personaTable).values({
        id: personaId,
        nombre: 'Beto',
        creadoEn: ahora,
        actualizadoEn: ahora,
      });

      await db.insert(usuarioTable).values({
        id: crypto.randomUUID(),
        personaId,
        email: 'beto@taller.test',
        passwordHash: 'hash',
        rol: 'miembro',
        creadoEn: ahora,
        actualizadoEn: ahora,
      });

      const repo = crearUsuarioRepository(db);
      const encontrado = await repo.findByEmail(emailDe('  BETO@Taller.Test  '));

      expect(encontrado).not.toBeNull();
      expect(encontrado?.persona.nombre).toBe('Beto');
    });

    it('devuelve null cuando no existe un usuario con ese email', async () => {
      const repo = crearUsuarioRepository(db);
      const encontrado = await repo.findByEmail(emailDe('nadie@taller.test'));

      expect(encontrado).toBeNull();
    });

    it('lanza EntidadCorrupta si los datos persistidos no pasan las validaciones de dominio', async () => {
      const personaId = crypto.randomUUID();
      const ahora = new Date();

      await db.insert(personaTable).values({
        id: personaId,
        nombre: 'Fila corrupta',
        creadoEn: ahora,
        actualizadoEn: ahora,
      });

      await db.insert(usuarioTable).values({
        id: crypto.randomUUID(),
        personaId,
        email: 'corrupto@taller.test',
        passwordHash: '',
        rol: 'miembro',
        creadoEn: ahora,
        actualizadoEn: ahora,
      });

      const repo = crearUsuarioRepository(db);

      await expect(
        repo.findByEmail(emailDe('corrupto@taller.test')),
      ).rejects.toBeInstanceOf(EntidadCorrupta);
    });
  });

  describe('save', () => {
    const construirUsuario = (input: {
      personaId: string;
      usuarioId: string;
      nombre: string;
      email: string;
      passwordHash: string;
      rol: 'administrador' | 'miembro';
      creadoEn: Date;
    }): Usuario => {
      const persona = desempaquetar(
        Persona.crear({
          id: input.personaId,
          nombre: input.nombre,
          creadoEn: input.creadoEn,
        }),
      );
      const email = desempaquetar(Email.crear(input.email));
      const passwordHash = desempaquetar(PasswordHash.crear(input.passwordHash));
      return desempaquetar(
        Usuario.crear({
          id: input.usuarioId,
          persona,
          email,
          passwordHash,
          rol: input.rol,
          creadoEn: input.creadoEn,
        }),
      );
    };

    it('inserta persona y usuario; el usuario queda recuperable por email', async () => {
      const personaId = crypto.randomUUID();
      const usuarioId = crypto.randomUUID();
      const creadoEn = new Date('2026-04-01T10:00:00Z');

      const usuario = construirUsuario({
        personaId,
        usuarioId,
        nombre: 'Carla Admin',
        email: 'carla@taller.test',
        passwordHash: '$2b$12$abcdefghijklmnopqrstuv',
        rol: 'administrador',
        creadoEn,
      });

      const repo = crearUsuarioRepository(db);
      await repo.save(usuario);

      const filasPersona = await db
        .select()
        .from(personaTable)
        .where(eq(personaTable.id, personaId));
      expect(filasPersona).toHaveLength(1);
      expect(filasPersona[0]?.nombre).toBe('Carla Admin');
      expect(filasPersona[0]?.creadoEn).toEqual(creadoEn);
      expect(filasPersona[0]?.actualizadoEn).toEqual(creadoEn);

      const filasUsuario = await db
        .select()
        .from(usuarioTable)
        .where(eq(usuarioTable.id, usuarioId));
      expect(filasUsuario).toHaveLength(1);
      expect(filasUsuario[0]?.personaId).toBe(personaId);
      expect(filasUsuario[0]?.email).toBe('carla@taller.test');
      expect(filasUsuario[0]?.passwordHash).toBe(
        '$2b$12$abcdefghijklmnopqrstuv',
      );
      expect(filasUsuario[0]?.rol).toBe('administrador');

      const recuperado = await repo.findByEmail(emailDe('carla@taller.test'));
      expect(recuperado?.id).toBe(usuarioId);
      expect(recuperado?.persona.id).toBe(personaId);
    });

    it('hace rollback de la persona si la inserción del usuario falla (email duplicado)', async () => {
      const creadoEn = new Date('2026-04-02T10:00:00Z');
      const emailRepetido = 'duplicado@taller.test';

      const primero = construirUsuario({
        personaId: crypto.randomUUID(),
        usuarioId: crypto.randomUUID(),
        nombre: 'Primero',
        email: emailRepetido,
        passwordHash: 'hash-uno',
        rol: 'miembro',
        creadoEn,
      });

      const repo = crearUsuarioRepository(db);
      await repo.save(primero);

      const personaIdDuplicado = crypto.randomUUID();
      const segundo = construirUsuario({
        personaId: personaIdDuplicado,
        usuarioId: crypto.randomUUID(),
        nombre: 'Segundo',
        email: emailRepetido,
        passwordHash: 'hash-dos',
        rol: 'miembro',
        creadoEn,
      });

      await expect(repo.save(segundo)).rejects.toThrow();

      const filasPersona = await db
        .select()
        .from(personaTable)
        .where(eq(personaTable.id, personaIdDuplicado));
      expect(filasPersona).toHaveLength(0);
    });
  });
});
