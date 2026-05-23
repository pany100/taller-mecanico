export class UsuarioSinPersonaError extends Error {
  constructor() {
    super('Usuario requires a Persona');
    this.name = 'UsuarioSinPersonaError';
  }
}
