import { describe, expect, it } from 'vitest';

import { NombreMuyLargoError, NombreVacioError } from './persona.errors';
import { Persona } from './persona';

describe('Persona · crear', () => {
  const ID_FIJO = '11111111-1111-1111-1111-111111111111';
  const FECHA_FIJA = new Date('2026-05-21T12:00:00.000Z');

  it('crea una Persona válida con los datos provistos', () => {
    const persona = Persona.crear({
      id: ID_FIJO,
      nombre: 'Juana Pérez',
      creadoEn: FECHA_FIJA,
    });

    expect(persona.id).toBe(ID_FIJO);
    expect(persona.nombre).toBe('Juana Pérez');
    expect(persona.creadoEn).toBe(FECHA_FIJA);
    expect(persona.actualizadoEn).toBe(FECHA_FIJA);
  });

  it('actualizadoEn arranca igual a creadoEn al crear', () => {
    const persona = Persona.crear({
      id: ID_FIJO,
      nombre: 'Juana Pérez',
      creadoEn: FECHA_FIJA,
    });

    expect(persona.actualizadoEn).toEqual(persona.creadoEn);
  });

  it('guarda el nombre trimmeado cuando viene con espacios alrededor', () => {
    const persona = Persona.crear({
      id: ID_FIJO,
      nombre: '   Juana Pérez   ',
      creadoEn: FECHA_FIJA,
    });

    expect(persona.nombre).toBe('Juana Pérez');
  });

  it('tira NombreVacioError cuando el nombre es vacío', () => {
    expect(() =>
      Persona.crear({ id: ID_FIJO, nombre: '', creadoEn: FECHA_FIJA }),
    ).toThrow(NombreVacioError);
  });

  it('tira NombreVacioError cuando el nombre es solo espacios', () => {
    expect(() =>
      Persona.crear({ id: ID_FIJO, nombre: '   ', creadoEn: FECHA_FIJA }),
    ).toThrow(NombreVacioError);
  });

  it('tira NombreMuyLargoError cuando el nombre supera 150 caracteres', () => {
    const nombreLargo = 'a'.repeat(151);

    expect(() =>
      Persona.crear({ id: ID_FIJO, nombre: nombreLargo, creadoEn: FECHA_FIJA }),
    ).toThrow(NombreMuyLargoError);
  });

  it('acepta un nombre de exactamente 150 caracteres', () => {
    const nombre = 'a'.repeat(150);

    const persona = Persona.crear({
      id: ID_FIJO,
      nombre,
      creadoEn: FECHA_FIJA,
    });

    expect(persona.nombre).toBe(nombre);
  });

  it('acepta un nombre con espacios alrededor cuyo trim deja 150 caracteres', () => {
    const nombre = `   ${'a'.repeat(150)}   `;

    const persona = Persona.crear({
      id: ID_FIJO,
      nombre,
      creadoEn: FECHA_FIJA,
    });

    expect(persona.nombre).toBe('a'.repeat(150));
  });

  it('NombreMuyLargoError lleva el payload correcto (maximo y largoRecibido)', () => {
    const nombreLargo = 'a'.repeat(151);

    try {
      Persona.crear({ id: ID_FIJO, nombre: nombreLargo, creadoEn: FECHA_FIJA });
      expect.fail('Se esperaba que tirara NombreMuyLargoError');
    } catch (error) {
      expect(error).toBeInstanceOf(NombreMuyLargoError);
      const e = error as NombreMuyLargoError;
      expect(e.maximo).toBe(150);
      expect(e.largoRecibido).toBe(151);
    }
  });
});
