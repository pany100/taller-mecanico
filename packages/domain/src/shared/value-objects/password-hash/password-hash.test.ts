import { describe, expect, it } from 'vitest';

import { PasswordHash } from './password-hash';

describe('PasswordHash · crear', () => {
  it('crea un PasswordHash válido y .valor lo devuelve exacto', () => {
    const resultado = PasswordHash.crear('abc123');

    expect(resultado.ok).toBe(true);
    if (resultado.ok) {
      expect(resultado.value.valor).toBe('abc123');
    }
  });

  it('guarda un hash estilo bcrypt sin tocarlo', () => {
    const bcrypt =
      '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';

    const resultado = PasswordHash.crear(bcrypt);

    expect(resultado.ok).toBe(true);
    if (resultado.ok) {
      expect(resultado.value.valor).toBe(bcrypt);
    }
  });

  it('devuelve PasswordHashVacio cuando el input es vacío', () => {
    const resultado = PasswordHash.crear('');

    expect(resultado.ok).toBe(false);
    if (!resultado.ok) {
      expect(resultado.error.kind).toBe('PasswordHashVacio');
    }
  });

  it('devuelve PasswordHashVacio cuando el input es solo espacios', () => {
    const resultado = PasswordHash.crear('   ');

    expect(resultado.ok).toBe(false);
    if (!resultado.ok) {
      expect(resultado.error.kind).toBe('PasswordHashVacio');
    }
  });

  it('NO trimmea el valor guardado: conserva espacios al borde', () => {
    const conEspacios = '   $2b$10$abc   ';

    const resultado = PasswordHash.crear(conEspacios);

    expect(resultado.ok).toBe(true);
    if (resultado.ok) {
      expect(resultado.value.valor).toBe(conEspacios);
    }
  });

  it('toString() devuelve lo mismo que .valor', () => {
    const resultado = PasswordHash.crear('abc123');

    expect(resultado.ok).toBe(true);
    if (resultado.ok) {
      expect(resultado.value.toString()).toBe(resultado.value.valor);
    }
  });
});
