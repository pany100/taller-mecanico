import { createHash } from 'node:crypto';

import { type TokenHasher } from '@taller/application';

export const tokenHasher: TokenHasher = {
  hash: (token) => createHash('sha256').update(token).digest('hex'),
};
