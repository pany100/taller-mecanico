import { type Sesion } from '@/auth/entities/sesion';

export interface SesionRepository {
  save(sesion: Sesion): Promise<void>;
}
