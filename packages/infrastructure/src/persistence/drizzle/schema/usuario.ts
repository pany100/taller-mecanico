import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

import { persona } from '@infra/persistence/drizzle/schema/persona';

export const rolUsuario = pgEnum('rol_usuario', ['administrador', 'miembro']);

export const usuario = pgTable(
  'usuario',
  {
    id: uuid('id').primaryKey(),
    personaId: uuid('persona_id')
      .notNull()
      .unique()
      .references(() => persona.id, { onDelete: 'restrict' }),
    email: text('email').notNull(),
    passwordHash: text('password_hash').notNull(),
    rol: rolUsuario('rol').notNull(),
    creadoEn: timestamp('creado_en', { withTimezone: true }).notNull(),
    actualizadoEn: timestamp('actualizado_en', { withTimezone: true }).notNull(),
  },
  (t) => [uniqueIndex('usuario_email_unique').on(t.email)],
);
