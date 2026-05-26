import { type Sesion } from '@app/auth/entities/sesion';

export interface SesionRepository {
  save(sesion: Sesion): Promise<void>;
}
