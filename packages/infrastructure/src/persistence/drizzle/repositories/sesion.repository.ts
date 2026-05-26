import { type Sesion, type SesionRepository } from '@taller/application';

import { type DrizzleDb } from '@infra/persistence/drizzle/client';
import { sesion as sesionTable } from '@infra/persistence/drizzle/schema/sesion';

export const crearSesionRepository = (db: DrizzleDb): SesionRepository => ({
  async save(sesion: Sesion): Promise<void> {
    await db.insert(sesionTable).values({
      id: sesion.id,
      tokenHash: sesion.tokenHash,
      usuarioId: sesion.usuarioId,
      usuarioRealId: sesion.usuarioRealId,
      creadoEn: sesion.creadoEn,
      actualizadoEn: sesion.actualizadoEn,
      expiraEn: sesion.expiraEn,
    });
  },
});
