import { describe, expect, it } from 'vitest';

import { tokenGenerator } from '@infra/auth/token-generator/token-generator';

// 32 bytes en base64url sin padding = 43 caracteres.
const LARGO_ESPERADO = 43;
const FORMATO_BASE64URL = /^[A-Za-z0-9_-]+$/;

describe('tokenGenerator', () => {
  it('produce un string base64url de la longitud esperada (32 bytes)', () => {
    const token = tokenGenerator.generate();
    expect(token).toHaveLength(LARGO_ESPERADO);
    expect(token).toMatch(FORMATO_BASE64URL);
  });

  it('produce tokens distintos en llamadas sucesivas (alta entropía)', () => {
    const tokens = new Set(
      Array.from({ length: 1000 }, () => tokenGenerator.generate()),
    );
    expect(tokens.size).toBe(1000);
  });
});
