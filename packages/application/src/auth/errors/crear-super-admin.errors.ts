import { type EmailInvalido, type PersonaError } from '@taller/domain';

export type EmailYaRegistrado = { kind: 'EmailYaRegistrado' };

export type CrearSuperAdminError =
  | EmailInvalido
  | PersonaError
  | EmailYaRegistrado;
