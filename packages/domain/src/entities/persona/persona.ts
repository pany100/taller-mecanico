import { type PersonaError } from '@domain/entities/persona/persona.errors';
import { EntidadCorrupta } from '@domain/shared/exceptions/entidad-corrupta';
import { err, ok, type Result } from '@domain/shared/result/result';

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

  static crear(input: {
    id: string;
    nombre: string;
    creadoEn: Date;
  }): Result<Persona, PersonaError> {
    const nombreTrimmeado = input.nombre.trim();

    if (nombreTrimmeado.length === 0) {
      return err({ kind: 'NombreVacio' });
    }

    if (nombreTrimmeado.length > NOMBRE_LARGO_MAXIMO) {
      return err({
        kind: 'NombreMuyLargo',
        maximo: NOMBRE_LARGO_MAXIMO,
        largoRecibido: nombreTrimmeado.length,
      });
    }

    return ok(
      new Persona(input.id, nombreTrimmeado, input.creadoEn, input.creadoEn),
    );
  }

  static reconstituir(input: {
    id: string;
    nombre: string;
    creadoEn: Date;
    actualizadoEn: Date;
  }): Persona {
    if (input.nombre.length === 0) {
      throw new EntidadCorrupta('Persona', 'nombre vacío');
    }

    if (input.nombre.length > NOMBRE_LARGO_MAXIMO) {
      throw new EntidadCorrupta(
        'Persona',
        `nombre excede el máximo (${input.nombre.length} > ${NOMBRE_LARGO_MAXIMO})`,
      );
    }

    return new Persona(
      input.id,
      input.nombre,
      input.creadoEn,
      input.actualizadoEn,
    );
  }
}
