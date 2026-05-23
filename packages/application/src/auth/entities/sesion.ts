const DIAS_DE_VIDA = 7;
const MILISEGUNDOS_POR_DIA = 24 * 60 * 60 * 1000;

export class Sesion {
  readonly id: string;
  readonly tokenHash: string;
  readonly usuarioId: string;
  readonly usuarioRealId: string;
  readonly creadoEn: Date;
  readonly actualizadoEn: Date;
  readonly expiraEn: Date;

  private constructor(
    id: string,
    tokenHash: string,
    usuarioId: string,
    usuarioRealId: string,
    creadoEn: Date,
    actualizadoEn: Date,
    expiraEn: Date,
  ) {
    this.id = id;
    this.tokenHash = tokenHash;
    this.usuarioId = usuarioId;
    this.usuarioRealId = usuarioRealId;
    this.creadoEn = creadoEn;
    this.actualizadoEn = actualizadoEn;
    this.expiraEn = expiraEn;
  }

  static crear(input: {
    id: string;
    tokenHash: string;
    usuarioId: string;
    creadoEn: Date;
  }): Sesion {
    const expiraEn = new Date(
      input.creadoEn.getTime() + DIAS_DE_VIDA * MILISEGUNDOS_POR_DIA,
    );

    return new Sesion(
      input.id,
      input.tokenHash,
      input.usuarioId,
      input.usuarioId,
      input.creadoEn,
      input.creadoEn,
      expiraEn,
    );
  }
}
