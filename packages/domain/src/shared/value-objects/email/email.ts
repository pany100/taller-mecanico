import { EmailInvalidoError } from '@/shared/value-objects/email/email.errors';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class Email {
  readonly valor: string;

  private constructor(valor: string) {
    this.valor = valor;
  }

  static crear(input: string): Email {
    const normalizado = input.trim().toLowerCase();

    if (!EMAIL_REGEX.test(normalizado)) {
      throw new EmailInvalidoError({ valorRecibido: input });
    }

    return new Email(normalizado);
  }

  toString(): string {
    return this.valor;
  }
}
