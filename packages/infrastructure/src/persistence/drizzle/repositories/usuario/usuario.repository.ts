import { eq } from 'drizzle-orm';

import {
  Email,
  EntidadCorrupta,
  PasswordHash,
  Persona,
  Usuario,
} from '@taller/domain';

import { type UsuarioRepository } from '@taller/application';

import { type DrizzleDb } from '@infra/persistence/drizzle/client';
import { persona as personaTable } from '@infra/persistence/drizzle/schema/persona';
import { usuario as usuarioTable } from '@infra/persistence/drizzle/schema/usuario';

type FilaUsuario = typeof usuarioTable.$inferSelect;
type FilaPersona = typeof personaTable.$inferSelect;

const reconstruirUsuario = (
  filaUsuario: FilaUsuario,
  filaPersona: FilaPersona,
): Usuario => {
  const persona = Persona.reconstituir({
    id: filaPersona.id,
    nombre: filaPersona.nombre,
    creadoEn: filaPersona.creadoEn,
    actualizadoEn: filaPersona.actualizadoEn,
  });

  const emailResultado = Email.crear(filaUsuario.email);
  if (!emailResultado.ok) {
    throw new EntidadCorrupta(
      'Usuario',
      `email persistido inválido (kind=${emailResultado.error.kind})`,
    );
  }

  const passwordHashResultado = PasswordHash.crear(filaUsuario.passwordHash);
  if (!passwordHashResultado.ok) {
    throw new EntidadCorrupta(
      'Usuario',
      `passwordHash persistido inválido (kind=${passwordHashResultado.error.kind})`,
    );
  }

  return Usuario.reconstituir({
    id: filaUsuario.id,
    persona,
    email: emailResultado.value,
    passwordHash: passwordHashResultado.value,
    rol: filaUsuario.rol,
    creadoEn: filaUsuario.creadoEn,
    actualizadoEn: filaUsuario.actualizadoEn,
  });
};

export const crearUsuarioRepository = (db: DrizzleDb): UsuarioRepository => ({
  async findByEmail(email: Email): Promise<Usuario | null> {
    const filas = await db
      .select({ usuario: usuarioTable, persona: personaTable })
      .from(usuarioTable)
      .innerJoin(personaTable, eq(usuarioTable.personaId, personaTable.id))
      .where(eq(usuarioTable.email, email.valor))
      .limit(1);

    const fila = filas[0];
    if (fila === undefined) {
      return null;
    }

    return reconstruirUsuario(fila.usuario, fila.persona);
  },

  async save(usuario: Usuario): Promise<void> {
    await db.transaction(async (tx) => {
      await tx.insert(personaTable).values({
        id: usuario.persona.id,
        nombre: usuario.persona.nombre,
        creadoEn: usuario.persona.creadoEn,
        actualizadoEn: usuario.persona.actualizadoEn,
      });

      await tx.insert(usuarioTable).values({
        id: usuario.id,
        personaId: usuario.persona.id,
        email: usuario.email.valor,
        passwordHash: usuario.passwordHash.valor,
        rol: usuario.rol,
        creadoEn: usuario.creadoEn,
        actualizadoEn: usuario.actualizadoEn,
      });
    });
  },
});
