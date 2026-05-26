import { compare, hash } from 'bcryptjs';

import { type Hasher } from '@taller/application';

// Parámetro de seguridad activo del sistema: cost factor de bcrypt.
// Subirlo en el futuro a medida que el hardware mejora; cualquier cambio queda
// registrado en DECISIONES.md (es decisión de seguridad, no de implementación).
export const BCRYPT_COST_ROUNDS = 12;

export const hasher: Hasher = {
  hash: (password) => hash(password, BCRYPT_COST_ROUNDS),
  verify: (password, hashGuardado) => compare(password, hashGuardado),
};
