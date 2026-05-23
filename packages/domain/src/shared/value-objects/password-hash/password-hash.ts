import { type PasswordHashVacio } from '@/shared/value-objects/password-hash/password-hash.errors';
import { err, ok, type Result } from '@/shared/result/result';

export class PasswordHash {
  readonly valor: string;

  private constructor(valor: string) {
    this.valor = valor;
  }

  static crear(input: string): Result<PasswordHash, PasswordHashVacio> {
    if (input.trim().length === 0) {
      return err({ kind: 'PasswordHashVacio' });
    }

    return ok(new PasswordHash(input));
  }

  toString(): string {
    return this.valor;
  }
}
