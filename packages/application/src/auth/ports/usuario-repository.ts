import { type Email, type Usuario } from '@taller/domain';

export interface UsuarioRepository {
  findByEmail(email: Email): Promise<Usuario | null>;
}
