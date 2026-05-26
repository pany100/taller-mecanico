import { compare } from 'bcryptjs';

import { type Hasher } from '@taller/application';

// Parámetro de seguridad activo del sistema: cost factor de bcrypt.
// Subirlo en el futuro a medida que el hardware mejora; cualquier cambio queda
// registrado en DECISIONES.md (es decisión de seguridad, no de implementación).
// Hoy aplica solo a la verificación porque el hash ya tiene el cost embebido;
// se reutilizará cuando aparezca el método `hash` (al cubrir creación/cambio
// de password, demand-driven).
export const BCRYPT_COST_ROUNDS = 12;

export const hasher: Hasher = {
  verify: (password, hash) => compare(password, hash),
};
