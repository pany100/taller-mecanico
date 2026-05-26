import { randomBytes } from 'node:crypto';

import { type TokenGenerator } from '@taller/application';

// 32 bytes = 256 bits de entropía: estándar para tokens de sesión / API.
// base64url: URL-safe y cookie-safe sin necesidad de escape (sin +, /, =).
const TOKEN_BYTES = 32;

export const tokenGenerator: TokenGenerator = {
  generate: () => randomBytes(TOKEN_BYTES).toString('base64url'),
};
