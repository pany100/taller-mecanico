export class NombreVacioError extends Error {
  constructor() {
    super('Nombre is empty');
    this.name = 'NombreVacioError';
  }
}

export class NombreMuyLargoError extends Error {
  readonly maximo: number;
  readonly largoRecibido: number;

  constructor(payload: { maximo: number; largoRecibido: number }) {
    super('Nombre exceeds max length');
    this.name = 'NombreMuyLargoError';
    this.maximo = payload.maximo;
    this.largoRecibido = payload.largoRecibido;
  }
}
