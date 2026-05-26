import {
  Email,
  EntidadCorrupta,
  PasswordHash,
  Persona,
  Usuario,
  err,
  ok,
  type Result,
} from '@taller/domain';

import { type Hasher } from '@app/auth/ports/hasher';
import { type UsuarioRepository } from '@app/auth/ports/usuario-repository';
import { type Clock } from '@app/shared/ports/clock';
import { type IdGenerator } from '@app/shared/ports/id-generator';
import { type CrearSuperAdminError } from '@app/auth/errors/crear-super-admin.errors';

type Deps = {
  usuarioRepository: UsuarioRepository;
  hasher: Hasher;
  idGenerator: IdGenerator;
  clock: Clock;
};

type Input = {
  email: string;
  nombre: string;
  password: string;
};

type CrearSuperAdminOk = {
  usuarioId: string;
  email: string;
};

export const crearSuperAdmin = async (
  deps: Deps,
  input: Input,
): Promise<Result<CrearSuperAdminOk, CrearSuperAdminError>> => {
  const emailResultado = Email.crear(input.email);
  if (!emailResultado.ok) {
    return emailResultado;
  }
  const email = emailResultado.value;

  const creadoEn = deps.clock.now();

  const personaResultado = Persona.crear({
    id: deps.idGenerator.generate(),
    nombre: input.nombre,
    creadoEn,
  });
  if (!personaResultado.ok) {
    return personaResultado;
  }
  const persona = personaResultado.value;

  const existente = await deps.usuarioRepository.findByEmail(email);
  if (existente !== null) {
    return err({ kind: 'EmailYaRegistrado' });
  }

  const hashGenerado = await deps.hasher.hash(input.password);
  const passwordHashResultado = PasswordHash.crear(hashGenerado);
  if (!passwordHashResultado.ok) {
    throw new EntidadCorrupta(
      'Usuario',
      `Hasher devolvió un hash vacío (kind=${passwordHashResultado.error.kind})`,
    );
  }

  const usuarioResultado = Usuario.crear({
    id: deps.idGenerator.generate(),
    persona,
    email,
    passwordHash: passwordHashResultado.value,
    rol: 'administrador',
    creadoEn,
  });
  if (!usuarioResultado.ok) {
    throw new EntidadCorrupta(
      'Usuario',
      `factory rechazó datos válidos (kind=${usuarioResultado.error.kind})`,
    );
  }
  const usuario = usuarioResultado.value;

  await deps.usuarioRepository.save(usuario);

  return ok({ usuarioId: usuario.id, email: usuario.email.valor });
};
