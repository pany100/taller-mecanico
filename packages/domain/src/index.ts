export { ok, err } from '@domain/shared/result/result';
export type { Result } from '@domain/shared/result/result';

export { Email } from '@domain/shared/value-objects/email/email';
export { PasswordHash } from '@domain/shared/value-objects/password-hash/password-hash';
export { Persona } from '@domain/entities/persona/persona';
export { Usuario } from '@domain/entities/usuario/usuario';
export { EntidadCorrupta } from '@domain/shared/exceptions/entidad-corrupta';

export type { EmailInvalido } from '@domain/shared/value-objects/email/email.errors';
