import { beforeEach, describe, expect, it } from 'vitest';

import { Email, EntidadCorrupta } from '@taller/domain';

import { crearUsuarioRepository } from '@infra/persistence/drizzle/repositories/usuario.repository';
import { persona as personaTable } from '@infra/persistence/drizzle/schema/persona';
import { usuario as usuarioTable } from '@infra/persistence/drizzle/schema/usuario';
import { db, truncateAll } from '@infra/testing/db';

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
});
