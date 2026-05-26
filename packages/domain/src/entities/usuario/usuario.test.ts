import { describe, expect, it } from 'vitest';

import { Persona } from '@domain/entities/persona/persona';
import { Email } from '@domain/shared/value-objects/email/email';
import { PasswordHash } from '@domain/shared/value-objects/password-hash/password-hash';
import { Rol } from '@domain/entities/usuario/rol';
import { Usuario } from '@domain/entities/usuario/usuario';
import { EntidadCorrupta } from '@domain/shared/exceptions/entidad-corrupta';
import { type Result } from '@domain/shared/result/result';

const desempaquetar = <T, E>(resultado: Result<T, E>): T => {
  if (!resultado.ok) {
    throw new Error(
      `Fixture inválida: se esperaba ok pero llegó ${JSON.stringify(resultado.error)}`,
    );
  }
  return resultado.value;
};

describe('Usuario · crear', () => {
  const ID_USUARIO = '22222222-2222-2222-2222-222222222222';
  const ID_PERSONA = '11111111-1111-1111-1111-111111111111';
  const FECHA_FIJA = new Date('2026-05-22T12:00:00.000Z');

  const personaValida = () =>
    desempaquetar(
      Persona.crear({
        id: ID_PERSONA,
        nombre: 'Juana Pérez',
        creadoEn: FECHA_FIJA,
      }),
    );

  const emailValido = () => desempaquetar(Email.crear('juana@taller.test'));
  const passwordHashValido = () =>
    desempaquetar(PasswordHash.crear('$2b$10$abcdefghijklmnopqrstuv'));

  it('crea un Usuario válido con los datos provistos', () => {
    const persona = personaValida();
    const email = emailValido();
    const passwordHash = passwordHashValido();
    const rol: Rol = 'administrador';

    const resultado = Usuario.crear({
      id: ID_USUARIO,
      persona,
      email,
      passwordHash,
      rol,
      creadoEn: FECHA_FIJA,
    });

    expect(resultado.ok).toBe(true);
    if (resultado.ok) {
      const usuario = resultado.value;
      expect(usuario.id).toBe(ID_USUARIO);
      expect(usuario.persona).toBe(persona);
      expect(usuario.email).toBe(email);
      expect(usuario.passwordHash).toBe(passwordHash);
      expect(usuario.rol).toBe(rol);
      expect(usuario.creadoEn).toBe(FECHA_FIJA);
      expect(usuario.actualizadoEn).toBe(FECHA_FIJA);
    }
  });

  it('actualizadoEn arranca igual a creadoEn al crear', () => {
    const resultado = Usuario.crear({
      id: ID_USUARIO,
      persona: personaValida(),
      email: emailValido(),
      passwordHash: passwordHashValido(),
      rol: 'miembro',
      creadoEn: FECHA_FIJA,
    });

    expect(resultado.ok).toBe(true);
    if (resultado.ok) {
      expect(resultado.value.actualizadoEn).toEqual(resultado.value.creadoEn);
    }
  });

  it('guarda la Persona entera (no solo el id)', () => {
    const persona = personaValida();

    const resultado = Usuario.crear({
      id: ID_USUARIO,
      persona,
      email: emailValido(),
      passwordHash: passwordHashValido(),
      rol: 'miembro',
      creadoEn: FECHA_FIJA,
    });

    expect(resultado.ok).toBe(true);
    if (resultado.ok) {
      expect(resultado.value.persona).toBe(persona);
      expect(resultado.value.persona.id).toBe(ID_PERSONA);
      expect(resultado.value.persona.nombre).toBe('Juana Pérez');
    }
  });

  it('guarda los value objects pasados (email, passwordHash, rol)', () => {
    const email = emailValido();
    const passwordHash = passwordHashValido();

    const resultado = Usuario.crear({
      id: ID_USUARIO,
      persona: personaValida(),
      email,
      passwordHash,
      rol: 'administrador',
      creadoEn: FECHA_FIJA,
    });

    expect(resultado.ok).toBe(true);
    if (resultado.ok) {
      expect(resultado.value.email).toBe(email);
      expect(resultado.value.passwordHash).toBe(passwordHash);
      expect(resultado.value.rol).toBe('administrador');
    }
  });

  it('devuelve UsuarioSinPersona cuando persona es null', () => {
    const resultado = Usuario.crear({
      id: ID_USUARIO,
      persona: null as unknown as Persona,
      email: emailValido(),
      passwordHash: passwordHashValido(),
      rol: 'miembro',
      creadoEn: FECHA_FIJA,
    });

    expect(resultado.ok).toBe(false);
    if (!resultado.ok) {
      expect(resultado.error.kind).toBe('UsuarioSinPersona');
    }
  });

  it('devuelve UsuarioSinPersona cuando persona es undefined', () => {
    const resultado = Usuario.crear({
      id: ID_USUARIO,
      persona: undefined as unknown as Persona,
      email: emailValido(),
      passwordHash: passwordHashValido(),
      rol: 'miembro',
      creadoEn: FECHA_FIJA,
    });

    expect(resultado.ok).toBe(false);
    if (!resultado.ok) {
      expect(resultado.error.kind).toBe('UsuarioSinPersona');
    }
  });

  it('funciona con rol "administrador"', () => {
    const resultado = Usuario.crear({
      id: ID_USUARIO,
      persona: personaValida(),
      email: emailValido(),
      passwordHash: passwordHashValido(),
      rol: 'administrador',
      creadoEn: FECHA_FIJA,
    });

    expect(resultado.ok).toBe(true);
    if (resultado.ok) {
      expect(resultado.value.rol).toBe('administrador');
    }
  });

  it('funciona con rol "miembro"', () => {
    const resultado = Usuario.crear({
      id: ID_USUARIO,
      persona: personaValida(),
      email: emailValido(),
      passwordHash: passwordHashValido(),
      rol: 'miembro',
      creadoEn: FECHA_FIJA,
    });

    expect(resultado.ok).toBe(true);
    if (resultado.ok) {
      expect(resultado.value.rol).toBe('miembro');
    }
  });
});

describe('Usuario · reconstituir', () => {
  const ID_USUARIO = '22222222-2222-2222-2222-222222222222';
  const ID_PERSONA = '11111111-1111-1111-1111-111111111111';
  const CREADO_EN = new Date('2026-05-22T12:00:00.000Z');
  const ACTUALIZADO_EN = new Date('2026-05-24T08:15:00.000Z');

  const personaValida = () =>
    desempaquetar(
      Persona.crear({
        id: ID_PERSONA,
        nombre: 'Juana Pérez',
        creadoEn: CREADO_EN,
      }),
    );

  const emailValido = () => desempaquetar(Email.crear('juana@taller.test'));
  const passwordHashValido = () =>
    desempaquetar(PasswordHash.crear('$2b$10$abcdefghijklmnopqrstuv'));

  it('reconstruye un Usuario respetando actualizadoEn distinto de creadoEn', () => {
    const persona = personaValida();
    const email = emailValido();
    const passwordHash = passwordHashValido();
    const rol: Rol = 'administrador';

    const usuario = Usuario.reconstituir({
      id: ID_USUARIO,
      persona,
      email,
      passwordHash,
      rol,
      creadoEn: CREADO_EN,
      actualizadoEn: ACTUALIZADO_EN,
    });

    expect(usuario.id).toBe(ID_USUARIO);
    expect(usuario.persona).toBe(persona);
    expect(usuario.email).toBe(email);
    expect(usuario.passwordHash).toBe(passwordHash);
    expect(usuario.rol).toBe(rol);
    expect(usuario.creadoEn).toBe(CREADO_EN);
    expect(usuario.actualizadoEn).toBe(ACTUALIZADO_EN);
  });

  it('lanza EntidadCorrupta cuando la persona es null', () => {
    expect(() =>
      Usuario.reconstituir({
        id: ID_USUARIO,
        persona: null as unknown as Persona,
        email: emailValido(),
        passwordHash: passwordHashValido(),
        rol: 'miembro',
        creadoEn: CREADO_EN,
        actualizadoEn: ACTUALIZADO_EN,
      }),
    ).toThrow(EntidadCorrupta);
  });

  it('lanza EntidadCorrupta cuando la persona es undefined', () => {
    expect(() =>
      Usuario.reconstituir({
        id: ID_USUARIO,
        persona: undefined as unknown as Persona,
        email: emailValido(),
        passwordHash: passwordHashValido(),
        rol: 'miembro',
        creadoEn: CREADO_EN,
        actualizadoEn: ACTUALIZADO_EN,
      }),
    ).toThrow(EntidadCorrupta);
  });
});
