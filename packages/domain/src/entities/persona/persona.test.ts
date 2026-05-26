import { describe, expect, it } from 'vitest';

import { Persona } from '@domain/entities/persona/persona';
import { EntidadCorrupta } from '@domain/shared/exceptions/entidad-corrupta';

describe('Persona · crear', () => {
  const ID_FIJO = '11111111-1111-1111-1111-111111111111';
  const FECHA_FIJA = new Date('2026-05-21T12:00:00.000Z');

  it('crea una Persona válida con los datos provistos', () => {
    const resultado = Persona.crear({
      id: ID_FIJO,
      nombre: 'Juana Pérez',
      creadoEn: FECHA_FIJA,
    });

    expect(resultado.ok).toBe(true);
    if (resultado.ok) {
      expect(resultado.value.id).toBe(ID_FIJO);
      expect(resultado.value.nombre).toBe('Juana Pérez');
      expect(resultado.value.creadoEn).toBe(FECHA_FIJA);
      expect(resultado.value.actualizadoEn).toBe(FECHA_FIJA);
    }
  });

  it('actualizadoEn arranca igual a creadoEn al crear', () => {
    const resultado = Persona.crear({
      id: ID_FIJO,
      nombre: 'Juana Pérez',
      creadoEn: FECHA_FIJA,
    });

    expect(resultado.ok).toBe(true);
    if (resultado.ok) {
      expect(resultado.value.actualizadoEn).toEqual(resultado.value.creadoEn);
    }
  });

  it('guarda el nombre trimmeado cuando viene con espacios alrededor', () => {
    const resultado = Persona.crear({
      id: ID_FIJO,
      nombre: '   Juana Pérez   ',
      creadoEn: FECHA_FIJA,
    });

    expect(resultado.ok).toBe(true);
    if (resultado.ok) {
      expect(resultado.value.nombre).toBe('Juana Pérez');
    }
  });

  it('devuelve NombreVacio cuando el nombre es vacío', () => {
    const resultado = Persona.crear({
      id: ID_FIJO,
      nombre: '',
      creadoEn: FECHA_FIJA,
    });

    expect(resultado.ok).toBe(false);
    if (!resultado.ok) {
      expect(resultado.error.kind).toBe('NombreVacio');
    }
  });

  it('devuelve NombreVacio cuando el nombre es solo espacios', () => {
    const resultado = Persona.crear({
      id: ID_FIJO,
      nombre: '   ',
      creadoEn: FECHA_FIJA,
    });

    expect(resultado.ok).toBe(false);
    if (!resultado.ok) {
      expect(resultado.error.kind).toBe('NombreVacio');
    }
  });

  it('devuelve NombreMuyLargo cuando el nombre supera 150 caracteres', () => {
    const nombreLargo = 'a'.repeat(151);

    const resultado = Persona.crear({
      id: ID_FIJO,
      nombre: nombreLargo,
      creadoEn: FECHA_FIJA,
    });

    expect(resultado.ok).toBe(false);
    if (!resultado.ok) {
      expect(resultado.error.kind).toBe('NombreMuyLargo');
    }
  });

  it('acepta un nombre de exactamente 150 caracteres', () => {
    const nombre = 'a'.repeat(150);

    const resultado = Persona.crear({
      id: ID_FIJO,
      nombre,
      creadoEn: FECHA_FIJA,
    });

    expect(resultado.ok).toBe(true);
    if (resultado.ok) {
      expect(resultado.value.nombre).toBe(nombre);
    }
  });

  it('acepta un nombre con espacios alrededor cuyo trim deja 150 caracteres', () => {
    const nombre = `   ${'a'.repeat(150)}   `;

    const resultado = Persona.crear({
      id: ID_FIJO,
      nombre,
      creadoEn: FECHA_FIJA,
    });

    expect(resultado.ok).toBe(true);
    if (resultado.ok) {
      expect(resultado.value.nombre).toBe('a'.repeat(150));
    }
  });

  it('NombreMuyLargo lleva el payload correcto (maximo y largoRecibido)', () => {
    const nombreLargo = 'a'.repeat(151);

    const resultado = Persona.crear({
      id: ID_FIJO,
      nombre: nombreLargo,
      creadoEn: FECHA_FIJA,
    });

    expect(resultado.ok).toBe(false);
    if (!resultado.ok && resultado.error.kind === 'NombreMuyLargo') {
      expect(resultado.error.maximo).toBe(150);
      expect(resultado.error.largoRecibido).toBe(151);
    }
  });
});

describe('Persona · reconstituir', () => {
  const ID_FIJO = '11111111-1111-1111-1111-111111111111';
  const CREADO_EN = new Date('2026-05-21T12:00:00.000Z');
  const ACTUALIZADO_EN = new Date('2026-05-23T09:30:00.000Z');

  it('reconstruye una Persona respetando actualizadoEn distinto de creadoEn', () => {
    const persona = Persona.reconstituir({
      id: ID_FIJO,
      nombre: 'Juana Pérez',
      creadoEn: CREADO_EN,
      actualizadoEn: ACTUALIZADO_EN,
    });

    expect(persona.id).toBe(ID_FIJO);
    expect(persona.nombre).toBe('Juana Pérez');
    expect(persona.creadoEn).toBe(CREADO_EN);
    expect(persona.actualizadoEn).toBe(ACTUALIZADO_EN);
  });

  it('lanza EntidadCorrupta cuando el nombre persistido es vacío', () => {
    expect(() =>
      Persona.reconstituir({
        id: ID_FIJO,
        nombre: '',
        creadoEn: CREADO_EN,
        actualizadoEn: ACTUALIZADO_EN,
      }),
    ).toThrow(EntidadCorrupta);
  });

  it('lanza EntidadCorrupta cuando el nombre persistido excede el máximo', () => {
    expect(() =>
      Persona.reconstituir({
        id: ID_FIJO,
        nombre: 'a'.repeat(151),
        creadoEn: CREADO_EN,
        actualizadoEn: ACTUALIZADO_EN,
      }),
    ).toThrow(EntidadCorrupta);
  });
});
