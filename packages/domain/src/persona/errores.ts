export class NombreVacioError extends Error {
  constructor() {
    super('Nombre no puede estar vacío');
    this.name = 'NombreVacioError';
  }
}

export class NombreMuyLargoError extends Error {
  readonly maximo: number;
  readonly largoRecibido: number;

  constructor(payload: { maximo: number; largoRecibido: number }) {
    super(
      `Nombre supera máximo de ${payload.maximo}, recibido ${payload.largoRecibido}`,
    );
    this.name = 'NombreMuyLargoError';
    this.maximo = payload.maximo;
    this.largoRecibido = payload.largoRecibido;
  }
}
