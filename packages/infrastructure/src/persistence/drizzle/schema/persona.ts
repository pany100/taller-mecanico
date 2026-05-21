import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const persona = pgTable('persona', {
  id: uuid('id').primaryKey(),
  nombre: text('nombre'),
  creadoEn: timestamp('creado_en', { withTimezone: true }),
  actualizadoEn: timestamp('actualizado_en', { withTimezone: true }),
});
