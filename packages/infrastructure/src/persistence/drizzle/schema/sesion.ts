import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

import { usuario } from '@infra/persistence/drizzle/schema/usuario';

export const sesion = pgTable(
  'sesion',
  {
    id: uuid('id').primaryKey(),
    tokenHash: text('token_hash').notNull(),
    usuarioId: uuid('usuario_id')
      .notNull()
      .references(() => usuario.id, { onDelete: 'cascade' }),
    usuarioRealId: uuid('usuario_real_id')
      .notNull()
      .references(() => usuario.id, { onDelete: 'cascade' }),
    creadoEn: timestamp('creado_en', { withTimezone: true }).notNull(),
    actualizadoEn: timestamp('actualizado_en', { withTimezone: true }).notNull(),
    expiraEn: timestamp('expira_en', { withTimezone: true }).notNull(),
  },
  (t) => [uniqueIndex('sesion_token_hash_unique').on(t.tokenHash)],
);
