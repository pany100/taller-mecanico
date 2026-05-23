import { describe, expect, it } from 'vitest';

import { Sesion } from '@/auth/entities/sesion';

describe('Sesion · crear', () => {
  const ID_FIJO = '11111111-1111-1111-1111-111111111111';
  const TOKEN_HASH_FIJO = 'abc123hash';
  const USUARIO_ID_FIJO = '22222222-2222-2222-2222-222222222222';
  const CREADO_EN_FIJO = new Date('2026-05-22T12:00:00.000Z');

  it('asigna tal cual id, tokenHash y usuarioId', () => {
    const sesion = Sesion.crear({
      id: ID_FIJO,
      tokenHash: TOKEN_HASH_FIJO,
      usuarioId: USUARIO_ID_FIJO,
      creadoEn: CREADO_EN_FIJO,
    });

    expect(sesion.id).toBe(ID_FIJO);
    expect(sesion.tokenHash).toBe(TOKEN_HASH_FIJO);
    expect(sesion.usuarioId).toBe(USUARIO_ID_FIJO);
  });

  it('usuarioRealId es igual a usuarioId al nacer (sin masquerade)', () => {
    const sesion = Sesion.crear({
      id: ID_FIJO,
      tokenHash: TOKEN_HASH_FIJO,
      usuarioId: USUARIO_ID_FIJO,
      creadoEn: CREADO_EN_FIJO,
    });

    expect(sesion.usuarioRealId).toBe(USUARIO_ID_FIJO);
  });

  it('actualizadoEn arranca igual a creadoEn al nacer', () => {
    const sesion = Sesion.crear({
      id: ID_FIJO,
      tokenHash: TOKEN_HASH_FIJO,
      usuarioId: USUARIO_ID_FIJO,
      creadoEn: CREADO_EN_FIJO,
    });

    expect(sesion.actualizadoEn).toEqual(sesion.creadoEn);
  });

  it('expiraEn es exactamente 7 días después de creadoEn', () => {
    const sesion = Sesion.crear({
      id: ID_FIJO,
      tokenHash: TOKEN_HASH_FIJO,
      usuarioId: USUARIO_ID_FIJO,
      creadoEn: CREADO_EN_FIJO,
    });

    const sieteDiasEnMs = 7 * 24 * 60 * 60 * 1000;
    expect(sesion.expiraEn.getTime() - sesion.creadoEn.getTime()).toBe(
      sieteDiasEnMs,
    );
  });
});
