export class EmailInvalidoError extends Error {
  readonly valorRecibido: string;

  constructor(payload: { valorRecibido: string }) {
    super('Invalid email format');
    this.name = 'EmailInvalidoError';
    this.valorRecibido = payload.valorRecibido;
  }
}
