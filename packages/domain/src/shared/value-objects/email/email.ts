import { type EmailError } from './email.errors';
import { err, ok, type Result } from '../../result/result';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class Email {
  readonly valor: string;

  private constructor(valor: string) {
    this.valor = valor;
  }

  static crear(input: string): Result<Email, EmailError> {
    const normalizado = input.trim().toLowerCase();

    if (!EMAIL_REGEX.test(normalizado)) {
      return err({ kind: 'EmailInvalido', valorRecibido: input });
    }

    return ok(new Email(normalizado));
  }

  toString(): string {
    return this.valor;
  }
}
