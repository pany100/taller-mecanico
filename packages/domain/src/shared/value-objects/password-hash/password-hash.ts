import { PasswordHashVacioError } from '@/shared/value-objects/password-hash/password-hash.errors';

export class PasswordHash {
  readonly valor: string;

  private constructor(valor: string) {
    this.valor = valor;
  }

  static crear(input: string): PasswordHash {
    if (input.trim().length === 0) {
      throw new PasswordHashVacioError();
    }

    return new PasswordHash(input);
  }

  toString(): string {
    return this.valor;
  }
}
