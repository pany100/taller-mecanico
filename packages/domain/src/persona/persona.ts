import { NombreMuyLargoError, NombreVacioError } from './persona.errors';

const NOMBRE_LARGO_MAXIMO = 150;

export class Persona {
  readonly id: string;
  readonly nombre: string;
  readonly creadoEn: Date;
  readonly actualizadoEn: Date;

  private constructor(
    id: string,
    nombre: string,
    creadoEn: Date,
    actualizadoEn: Date,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.creadoEn = creadoEn;
    this.actualizadoEn = actualizadoEn;
  }

  static crear(input: { id: string; nombre: string; creadoEn: Date }): Persona {
    const nombreTrimmeado = input.nombre.trim();

    if (nombreTrimmeado.length === 0) {
      throw new NombreVacioError();
    }

    if (nombreTrimmeado.length > NOMBRE_LARGO_MAXIMO) {
      throw new NombreMuyLargoError({
        maximo: NOMBRE_LARGO_MAXIMO,
        largoRecibido: nombreTrimmeado.length,
      });
    }

    return new Persona(
      input.id,
      nombreTrimmeado,
      input.creadoEn,
      input.creadoEn,
    );
  }
}
