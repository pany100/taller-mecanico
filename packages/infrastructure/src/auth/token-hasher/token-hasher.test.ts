import { describe, expect, it } from 'vitest';

import { tokenHasher } from '@infra/auth/token-hasher/token-hasher';

// SHA-256 en hex: 32 bytes = 64 caracteres hexadecimales.
const LARGO_SHA256_HEX = 64;
const FORMATO_HEX = /^[0-9a-f]+$/;

describe('tokenHasher', () => {
  it('produce un hash hex SHA-256 del largo esperado', () => {
    const hash = tokenHasher.hash('token-cualquiera');
    expect(hash).toHaveLength(LARGO_SHA256_HEX);
    expect(hash).toMatch(FORMATO_HEX);
  });

  it('es determinista: mismo input produce mismo output', () => {
    const token = 'aLgUn-ToKeN-PaRa-PrObAr';
    expect(tokenHasher.hash(token)).toBe(tokenHasher.hash(token));
  });

  it('produce hashes distintos para tokens distintos', () => {
    expect(tokenHasher.hash('token-a')).not.toBe(tokenHasher.hash('token-b'));
  });

  it('coincide con el vector SHA-256 conocido para string vacío', () => {
    // SHA-256("") es un valor de referencia público.
    expect(tokenHasher.hash('')).toBe(
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    );
  });
});
