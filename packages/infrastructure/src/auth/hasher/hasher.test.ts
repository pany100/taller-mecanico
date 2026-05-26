import { hashSync } from 'bcryptjs';
import { describe, expect, it } from 'vitest';

import { BCRYPT_COST_ROUNDS, hasher } from '@infra/auth/hasher/hasher';

describe('hasher', () => {
  const password = 'una-password-cualquiera-123';
  const hashCorrecto = hashSync(password, BCRYPT_COST_ROUNDS);

  it('verify devuelve true con la password correcta', async () => {
    await expect(hasher.verify(password, hashCorrecto)).resolves.toBe(true);
  });

  it('verify devuelve false con una password incorrecta', async () => {
    await expect(hasher.verify('otra-password', hashCorrecto)).resolves.toBe(
      false,
    );
  });
});
