import { describe, expect, it } from 'vitest';

import { PasswordHash } from './password-hash';
import { PasswordHashVacioError } from './password-hash.errors';

describe('PasswordHash · crear', () => {
  it('crea un PasswordHash válido y .valor lo devuelve exacto', () => {
    const hash = PasswordHash.crear('abc123');

    expect(hash.valor).toBe('abc123');
  });

  it('guarda un hash estilo bcrypt sin tocarlo', () => {
    const bcrypt =
      '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';

    const hash = PasswordHash.crear(bcrypt);

    expect(hash.valor).toBe(bcrypt);
  });

  it('tira PasswordHashVacioError cuando el input es vacío', () => {
    expect(() => PasswordHash.crear('')).toThrow(PasswordHashVacioError);
  });

  it('tira PasswordHashVacioError cuando el input es solo espacios', () => {
    expect(() => PasswordHash.crear('   ')).toThrow(PasswordHashVacioError);
  });

  it('NO trimmea el valor guardado: conserva espacios al borde', () => {
    const conEspacios = '   $2b$10$abc   ';

    const hash = PasswordHash.crear(conEspacios);

    expect(hash.valor).toBe(conEspacios);
  });

  it('toString() devuelve lo mismo que .valor', () => {
    const hash = PasswordHash.crear('abc123');

    expect(hash.toString()).toBe(hash.valor);
  });
});
