import { Email, err, ok, type Result } from '@taller/domain';

import { Sesion } from '@app/auth/entities/sesion';
import { type Hasher } from '@app/auth/ports/hasher';
import { type SesionRepository } from '@app/auth/ports/sesion-repository';
import { type TokenGenerator } from '@app/auth/ports/token-generator';
import { type TokenHasher } from '@app/auth/ports/token-hasher';
import { type UsuarioRepository } from '@app/auth/ports/usuario-repository';
import { type Clock } from '@app/shared/ports/clock';
import { type IdGenerator } from '@app/shared/ports/id-generator';
import { type IniciarSesionError } from '@app/auth/errors/iniciar-sesion.errors';

type Deps = {
  usuarioRepository: UsuarioRepository;
  hasher: Hasher;
  tokenGenerator: TokenGenerator;
  tokenHasher: TokenHasher;
  idGenerator: IdGenerator;
  clock: Clock;
  sesionRepository: SesionRepository;
};

type Input = { email: string; password: string };

type IniciarSesionOk = { token: string; expiraEn: Date };

export const iniciarSesion = async (
  deps: Deps,
  input: Input,
): Promise<Result<IniciarSesionOk, IniciarSesionError>> => {
  const emailResultado = Email.crear(input.email);
  if (!emailResultado.ok) {
    return emailResultado;
  }

  const usuario = await deps.usuarioRepository.findByEmail(emailResultado.value);
  if (usuario === null) {
    return err({ kind: 'CredencialesInvalidas' });
  }

  const passwordCoincide = await deps.hasher.verify(
    input.password,
    usuario.passwordHash.valor,
  );
  if (!passwordCoincide) {
    return err({ kind: 'CredencialesInvalidas' });
  }

  const token = deps.tokenGenerator.generate();
  const tokenHash = deps.tokenHasher.hash(token);
  const id = deps.idGenerator.generate();
  const creadoEn = deps.clock.now();

  const sesion = Sesion.crear({
    id,
    tokenHash,
    usuarioId: usuario.id,
    creadoEn,
  });

  await deps.sesionRepository.save(sesion);

  return ok({ token, expiraEn: sesion.expiraEn });
};
