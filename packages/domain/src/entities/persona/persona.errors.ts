export type NombreVacio = { kind: 'NombreVacio' };

export type NombreMuyLargo = {
  kind: 'NombreMuyLargo';
  maximo: number;
  largoRecibido: number;
};

export type PersonaError = NombreVacio | NombreMuyLargo;
