export class EntidadCorrupta extends Error {
  readonly entidad: string;
  readonly motivo: string;

  constructor(entidad: string, motivo: string) {
    super(`Entidad '${entidad}' corrupta: ${motivo}`);
    this.name = 'EntidadCorrupta';
    this.entidad = entidad;
    this.motivo = motivo;
  }
}
