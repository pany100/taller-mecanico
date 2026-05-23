import { describe, expect, it } from 'vitest';

import { Email } from '@/shared/value-objects/email/email';

describe('Email · crear', () => {
  it('crea un Email válido y .valor devuelve el string normalizado', () => {
    const resultado = Email.crear('juan@gmail.com');

    expect(resultado.ok).toBe(true);
    if (resultado.ok) {
      expect(resultado.value.valor).toBe('juan@gmail.com');
    }
  });

  it('normaliza mayúsculas a minúsculas', () => {
    const resultado = Email.crear('Juan@Gmail.com');

    expect(resultado.ok).toBe(true);
    if (resultado.ok) {
      expect(resultado.value.valor).toBe('juan@gmail.com');
    }
  });

  it('trimmea espacios alrededor', () => {
    const resultado = Email.crear('   juan@gmail.com   ');

    expect(resultado.ok).toBe(true);
    if (resultado.ok) {
      expect(resultado.value.valor).toBe('juan@gmail.com');
    }
  });

  it('aplica trim + lowercase juntos', () => {
    const resultado = Email.crear('   Juan@Gmail.com   ');

    expect(resultado.ok).toBe(true);
    if (resultado.ok) {
      expect(resultado.value.valor).toBe('juan@gmail.com');
    }
  });

  it.each([
    ['', 'string vacío'],
    ['juan', 'sin arroba'],
    ['juan@', 'sin dominio'],
    ['juan@gmail', 'sin punto en el dominio'],
    ['@gmail.com', 'sin parte local'],
    ['juan @gmail.com', 'con espacio interno'],
  ])('devuelve EmailInvalido para %j (%s)', (invalido) => {
    const resultado = Email.crear(invalido);

    expect(resultado.ok).toBe(false);
    if (!resultado.ok) {
      expect(resultado.error.kind).toBe('EmailInvalido');
    }
  });

  it('acepta emails con subdominios', () => {
    const resultado = Email.crear('juan@mail.co.uk');

    expect(resultado.ok).toBe(true);
    if (resultado.ok) {
      expect(resultado.value.valor).toBe('juan@mail.co.uk');
    }
  });

  it('EmailInvalido lleva el valorRecibido correcto en el payload', () => {
    const resultado = Email.crear('juan@');

    expect(resultado.ok).toBe(false);
    if (!resultado.ok) {
      expect(resultado.error.kind).toBe('EmailInvalido');
      expect(resultado.error.valorRecibido).toBe('juan@');
    }
  });

  it('toString() devuelve lo mismo que .valor', () => {
    const resultado = Email.crear('juan@gmail.com');

    expect(resultado.ok).toBe(true);
    if (resultado.ok) {
      expect(resultado.value.toString()).toBe(resultado.value.valor);
    }
  });
});
