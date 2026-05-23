import { Persona } from '@/entities/persona/persona';
import { Email } from '@/shared/value-objects/email/email';
import { PasswordHash } from '@/shared/value-objects/password-hash/password-hash';
import { Rol } from '@/entities/usuario/rol';
import { UsuarioSinPersonaError } from '@/entities/usuario/usuario.errors';

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
  }): Usuario {
    if (input.persona === null || input.persona === undefined) {
      throw new UsuarioSinPersonaError();
    }

    return new Usuario(
      input.id,
      input.persona,
      input.email,
      input.passwordHash,
      input.rol,
      input.creadoEn,
      input.creadoEn,
    );
  }
}
