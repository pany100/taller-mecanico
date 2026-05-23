import { type EmailInvalido } from '@taller/domain';

export type CredencialesInvalidas = { kind: 'CredencialesInvalidas' };

export type IniciarSesionError = EmailInvalido | CredencialesInvalidas;
