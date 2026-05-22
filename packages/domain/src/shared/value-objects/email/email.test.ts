import { describe, expect, it } from 'vitest';

import { Email } from './email';
import { EmailInvalidoError } from './email.errors';

describe('Email · crear', () => {
  it('crea un Email válido y .valor devuelve el string normalizado', () => {
    const email = Email.crear('juan@gmail.com');

    expect(email.valor).toBe('juan@gmail.com');
  });

  it('normaliza mayúsculas a minúsculas', () => {
    const email = Email.crear('Juan@Gmail.com');

    expect(email.valor).toBe('juan@gmail.com');
  });

  it('trimmea espacios alrededor', () => {
    const email = Email.crear('   juan@gmail.com   ');

    expect(email.valor).toBe('juan@gmail.com');
  });

  it('aplica trim + lowercase juntos', () => {
    const email = Email.crear('   Juan@Gmail.com   ');

    expect(email.valor).toBe('juan@gmail.com');
  });

  it.each([
    ['', 'string vacío'],
    ['juan', 'sin arroba'],
    ['juan@', 'sin dominio'],
    ['juan@gmail', 'sin punto en el dominio'],
    ['@gmail.com', 'sin parte local'],
    ['juan @gmail.com', 'con espacio interno'],
  ])('tira EmailInvalidoError para %j (%s)', (invalido) => {
    expect(() => Email.crear(invalido)).toThrow(EmailInvalidoError);
  });

  it('acepta emails con subdominios', () => {
    const email = Email.crear('juan@mail.co.uk');

    expect(email.valor).toBe('juan@mail.co.uk');
  });

  it('EmailInvalidoError lleva el valorRecibido correcto en el payload', () => {
    try {
      Email.crear('juan@');
      expect.fail('Se esperaba que tirara EmailInvalidoError');
    } catch (error) {
      expect(error).toBeInstanceOf(EmailInvalidoError);
      const e = error as EmailInvalidoError;
      expect(e.valorRecibido).toBe('juan@');
    }
  });

  it('toString() devuelve lo mismo que .valor', () => {
    const email = Email.crear('juan@gmail.com');

    expect(email.toString()).toBe(email.valor);
  });
});
