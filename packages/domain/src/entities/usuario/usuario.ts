import { Persona } from '@domain/entities/persona/persona';
import { Email } from '@domain/shared/value-objects/email/email';
import { PasswordHash } from '@domain/shared/value-objects/password-hash/password-hash';
import { Rol } from '@domain/entities/usuario/rol';
import { type UsuarioError } from '@domain/entities/usuario/usuario.errors';
import { err, ok, type Result } from '@domain/shared/result/result';

export class Usuario {
  readonly id: string;
  readonly persona: Persona;
  readonly email: Email;
  readonly passwordHash: PasswordHash;
  readonly rol: Rol;
  readonly creadoEn: Date;
  readonly actualizadoEn: Date;

  private constructor(
    id: string,
    persona: Persona,
    email: Email,
    passwordHash: PasswordHash,
    rol: Rol,
    creadoEn: Date,
    actualizadoEn: Date,
  ) {
    this.id = id;
    this.persona = persona;
    this.email = email;
    this.passwordHash = passwordHash;
    this.rol = rol;
    this.creadoEn = creadoEn;
    this.actualizadoEn = actualizadoEn;
  }

  static crear(input: {
    id: string;
    persona: Persona;
    email: Email;
    passwordHash: PasswordHash;
    rol: Rol;
    creadoEn: Date;
  }): Result<Usuario, UsuarioError> {
    if (input.persona === null || input.persona === undefined) {
      return err({ kind: 'UsuarioSinPersona' });
    }

    return ok(
      new Usuario(
        input.id,
        input.persona,
        input.email,
        input.passwordHash,
        input.rol,
        input.creadoEn,
        input.creadoEn,
      ),
    );
  }
}
