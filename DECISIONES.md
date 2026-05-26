# Decisiones del proyecto

Bitácora cronológica de decisiones de diseño, arquitectura y proceso. Cada
entrada explica qué decidimos, por qué, y qué descartamos. Las decisiones no
se borran: si algo cambia en el futuro, se agrega una nueva entrada al final
explicando el cambio.

---

## Índice

Listado cronológico de decisiones. Las de **[Fase de diseño]** se tomaron
antes de empezar a registrar fechas; de ahí en adelante cada entrada
lleva su fecha. Buscar por fecha: `Ctrl-F` sobre el año-mes (ej. `2026-05`).

- \*\*\*\* · [Índice](#índice)
- **[Fase de diseño]** · [Modo de trabajo](#fase-de-diseño--modo-de-trabajo)
- **[Fase de diseño]** · [Bitácora de decisiones (DECISIONES.md)](#fase-de-diseño--bitácora-de-decisiones-decisionesmd)
- **[Fase de diseño]** · [Stack base: Next.js fullstack con dominio aislado](#fase-de-diseño--stack-base-nextjs-fullstack-con-dominio-aislado)
- **[Fase de diseño]** · [Monorepo: pnpm workspaces sin Turborepo](#fase-de-diseño--monorepo-pnpm-workspaces-sin-turborepo)
- **[Fase de diseño]** · [Base de datos: PostgreSQL](#fase-de-diseño--base-de-datos-postgresql)
- **[Fase de diseño]** · [ORM: Drizzle](#fase-de-diseño--orm-drizzle)
- **[Fase de diseño]** · [Convenciones de código y schema](#fase-de-diseño--convenciones-de-código-y-schema)
- **[Fase de diseño]** · [Estrategia de testing](#fase-de-diseño--estrategia-de-testing)
- **[Fase de diseño]** · [Modelo Persona / Cliente / Colaborador / Usuario](#fase-de-diseño--modelo-persona--cliente--colaborador--usuario)
- **[Fase de diseño]** · [Nombre como un solo campo](#fase-de-diseño--nombre-como-un-solo-campo)
- **[Fase de diseño]** · [Timestamps y auditoría](#fase-de-diseño--timestamps-y-auditoría)
- **[Fase de diseño]** · [Etapa 0: solo password, sin Google login](#fase-de-diseño--etapa-0-solo-password-sin-google-login)
- **[Fase de diseño]** · [Casos de uso de la Etapa 0](#fase-de-diseño--casos-de-uso-de-la-etapa-0)
- **[Fase de diseño]** · [Invariantes principales de la Etapa 0](#fase-de-diseño--invariantes-principales-de-la-etapa-0)
- **[Fase de diseño]** · [Autenticación técnica: sesiones server-side rodantes](#fase-de-diseño--autenticación-técnica-sesiones-server-side-rodantes)
- **[Fase de diseño]** · [Hashing de passwords: bcrypt](#fase-de-diseño--hashing-de-passwords-bcrypt)
- **[Fase de diseño]** · [Implementación manual de auth](#fase-de-diseño--implementación-manual-de-auth)
- **[Fase de diseño]** · [Manual de marca: white-label nivel 1](#fase-de-diseño--manual-de-marca-white-label-nivel-1)
- **2026-05-20** · [Sistema de tokens de color](#2026-05-20--sistema-de-tokens-de-color)
- **2026-05-20** · [Estados de foco, sombras y elevación](#2026-05-20--estados-de-foco-sombras-y-elevación)
- **2026-05-20** · [Botones, toasts y densidad de controles](#2026-05-20--botones-toasts-y-densidad-de-controles)
- **2026-05-20** · [Tipografía e iconografía](#2026-05-20--tipografía-e-iconografía)
- **2026-05-20** · [Pattern de fondo y logo white-label](#2026-05-20--pattern-de-fondo-y-logo-white-label)
- **2026-05-20** · [Voz del producto (refina decisión previa)](#2026-05-20--voz-del-producto-refina-decisión-previa)
- **2026-05-20** · [i18n: archivo de strings plano en Etapa 0](#2026-05-20--i18n-archivo-de-strings-plano-en-etapa-0)
- **2026-05-20** · [Formato de la bitácora: índice + fechas](#2026-05-20--formato-de-la-bitácora-índice--fechas)
- **2026-05-20** · [Scope de paquetes: @taller](#2026-05-20--scope-de-paquetes-taller)
- **2026-05-20** · [TypeScript: config base estricta](#2026-05-20--typescript-config-base-estricta)
- **2026-05-20** · [Lint y formato: ESLint + Prettier](#2026-05-20--lint-y-formato-eslint--prettier)
- **2026-05-20** · [Runner de tests: Vitest](#2026-05-20--runner-de-tests-vitest)
- **2026-05-20** · [Límite application↔web: DTOs de salida](#2026-05-20--límite-applicationweb-dtos-de-salida)
- **2026-05-20** · [web no depende de domain (ni tipos); DTOs los define application](#2026-05-20--web-no-depende-de-domain-ni-tipos-dtos-los-define-application)
- **2026-05-20** · [Versiones del stack (bootstrap)](#2026-05-20--versiones-del-stack-bootstrap)
- **2026-05-20** · [ESLint pineado a v9 (no v10)](#2026-05-20--eslint-pineado-a-v9-no-v10)
- **2026-05-21** · [Postgres local con Docker Compose](#2026-05-21--postgres-local-con-docker-compose)
- **2026-05-21** · [Cableado de Drizzle](#2026-05-21--cableado-de-drizzle)
- **2026-05-21** · [Idioma de carpetas vs. idioma del negocio](#2026-05-21--idioma-de-carpetas-vs-idioma-del-negocio)
- **2026-05-21** · [Idioma del código: genérico vs. propio del dominio](#2026-05-21--idioma-del-código-genérico-vs-propio-del-dominio)
- **2026-05-21** · [Carga del .env en drizzle-kit vía --env-file](#2026-05-21--carga-del-env-en-drizzle-kit-vía---env-file-corrige-decisión-previa)
- **2026-05-21** · [Organización de errores de dominio](#2026-05-21--organización-de-errores-de-dominio-híbrido-por-entidad--global)
- **2026-05-21** · [Ubicación de value objects transversales](#2026-05-21--ubicación-de-value-objects-transversales)
- **2026-05-21** · [Nomenclatura de archivos: `<concepto>.<rol>.ts`](#2026-05-21--nomenclatura-de-archivos-conceptorolts)
- **2026-05-22** · [Estructura y forma de la capa de aplicación](#2026-05-22--estructura-y-forma-de-la-capa-de-aplicación)
- **2026-05-22** · [Set de roles cerrado en el patrón `<concepto>.<rol>.ts`](#2026-05-22--set-de-roles-cerrado-en-el-patrón-conceptorolts)
- **2026-05-22** · [Manejo de resultados y errores en casos de uso (Result vs throw)](#2026-05-22--manejo-de-resultados-y-errores-en-casos-de-uso-result-vs-throw)
- **2026-05-22** · [Organización por feature en application y entities/ en domain](#2026-05-22--organización-por-feature-en-application-y-entities-en-domain)
- **2026-05-22** · [Sesion como entidad de application](#2026-05-22--sesion-como-entidad-de-application)
- **2026-05-22** · [Path aliases `@/*` por paquete; imports relativos prohibidos](#2026-05-22--path-aliases--por-paquete-imports-relativos-prohibidos)
- **2026-05-22** · [Puertos de iniciarSesion: lista y ubicación](#2026-05-22--puertos-de-iniciarsesion-lista-y-ubicación)
- **2026-05-22** · [Firmas de los puertos de iniciarSesion](#2026-05-22--firmas-de-los-puertos-de-iniciarsesion)
- **2026-05-22** · [Firma de Sesion.crear](#2026-05-22--firma-de-sesioncrear)
- **2026-05-22** · [Excepción: imports relativos permitidos en barrels de paquete](#2026-05-22--excepción-imports-relativos-permitidos-en-barrels-de-paquete)
- **2026-05-22** · [Modelo de errores por capas: no throw para esperables](#2026-05-22--modelo-de-errores-por-capas-no-throw-para-esperables)
- **2026-05-22** · [Domain usa imports relativos en todo su código (provisorio)](#2026-05-22--domain-usa-imports-relativos-en-todo-su-código-provisorio)
- **2026-05-25** · [Alias único por paquete (X3): resolución cross-paquete en typecheck y Vitest](#2026-05-25--alias-único-por-paquete-x3-resolución-cross-paquete-en-typecheck-y-vitest)
- **2026-05-25** · [Modelado de tablas de Etapa 0 (persona, usuario, sesion)](#2026-05-25--modelado-de-tablas-de-etapa-0-persona-usuario-sesion)
- **2026-05-25** · [Testing de integración contra Postgres real](#2026-05-25--testing-de-integración-contra-postgres-real)

---

## [Fase de diseño] · Modo de trabajo

**Qué decidimos**: el desarrollador es arquitecto y decisor; el asistente
es mentor / sparring; Claude Code es implementador. Cada decisión técnica
debe poder justificarse con palabras propias. Nada de vibe coding.

**Por qué**: el proyecto anterior (vibe-coded) terminó abandonado porque no
se aprendió nada ni se construyó con criterio. El objetivo principal de este
rewrite es aprender; el código sale del aprendizaje, no al revés.

**Qué descartamos**: dejar que el asistente o Claude Code generen features
completos sin revisión profunda.

---

## [Fase de diseño] · Bitácora de decisiones (DECISIONES.md)

**Qué decidimos**: registrar todas las decisiones del proyecto en este único
archivo, en orden cronológico, sin formato ADR formal. Cada entrada con:
qué, por qué, qué descartamos. Sin estados, sin numeración, sin reemplazos
formales. Si una decisión cambia, se agrega una entrada nueva al final.

**Por qué**: para una persona sola, un único archivo lineal es más práctico
que un sistema de ADRs numerados. La meta es tener historial, no formalidad.

**Qué descartamos**: ADRs formales (Architecture Decision Records) con
estados (Propuesto / Aceptado / Reemplazado).

---

## [Fase de diseño] · Stack base: Next.js fullstack con dominio aislado

**Qué decidimos**: Next.js fullstack (App Router + Server Actions + Route
Handlers), con el dominio aislado en paquetes separados del monorepo:

```
apps/
  web/                    ← Next.js (UI + Server Actions, capa fina)
packages/
  domain/                 ← entidades, value objects, reglas de negocio
  application/            ← casos de uso, puertos (interfaces)
  infrastructure/         ← adapters: persistencia, mail, etc.
```

Regla central: `packages/domain` y `packages/application` no importan nada
de Next.js, del ORM, ni de I/O. Los Server Actions terminan siendo 5-10
líneas: validar input, llamar a caso de uso, devolver resultado.

**Por qué**: combina la simplicidad de un solo deploy con la disciplina de
arquitectura hexagonal. Si en el futuro hace falta exponer una API REST
pública, se agregan Route Handlers que llaman a los mismos casos de uso.

**Qué descartamos**: Next.js front + API separada (Fastify/Hono/NestJS).
Demasiado overhead para una persona sola sin otros consumidores del API.

---

## [Fase de diseño] · Monorepo: pnpm workspaces sin Turborepo

**Qué decidimos**: usar pnpm workspaces como herramienta de monorepo, sin
Turborepo al inicio.

**Por qué**: pnpm es más rápido y eficiente que npm/yarn, con mejor manejo
de dependencias en monorepos. Turborepo es valioso cuando los builds tardan
minutos; al inicio los builds son cuestión de segundos. Agregar Turborepo
después es indoloro cuando aparezca la necesidad.

**Qué descartamos**: npm/yarn workspaces (peores en rendimiento), Turborepo
desde el día uno (sobreingeniería prematura), Nx (más complejo y opinado).

---

## [Fase de diseño] · Base de datos: PostgreSQL

**Qué decidimos**: PostgreSQL como motor de base de datos.

**Por qué**:

- Migraciones transaccionales: una migración que falla no deja el schema
  a medio aplicar. MySQL no tiene esto.
- Tipos JSONB y UUID nativos (utilidad menor pero real).
- Alineación con el ecosistema moderno (Drizzle, Supabase, Neon, Vercel
  Postgres), mejor material de aprendizaje, mejor empleabilidad.

**Qué descartamos**:

- MySQL: válido técnicamente, hubiera facilitado la migración de datos
  desde la DB vieja, pero perdemos los beneficios de Postgres y el
  rewrite es justo la oportunidad de no arrastrar decisiones viejas.
- SQLite: limitaciones reales de concurrencia y fricciones de deploy.
- NoSQL (Mongo, Dynamo): incorrecto para un dominio con relaciones fuertes
  y consistencia transaccional crítica (pagos, stock).

---

## [Fase de diseño] · ORM: Drizzle

**Qué decidimos**: Drizzle como ORM.

**Por qué**:

- Empuja a pensar en SQL (objetivo de aprendizaje).
- Aislarlo detrás de un puerto (hexagonal) es más natural que Prisma.
- Más simple conceptualmente: menos magia, menos generación de código.
- Type-safety excelente, liviano y rápido.

**Qué descartamos**: Prisma. Tiene mejor ecosistema y más material online,
pero abstrae demasiado el SQL e impone convenciones que pelean con hexagonal.

---

## [Fase de diseño] · Convenciones de código y schema

**Qué decidimos**:

- **Idioma**: todo en español, incluyendo nombres de tablas, columnas y
  entidades. `creado_en`, `actualizado_en`, `expira_en`, `creada_por`, etc.
- **DB**: `snake_case` para nombres de columnas y tablas.
- **TypeScript**: `camelCase` para propiedades y variables.
- **Drizzle hace el mapeo**: columna `expira_en` en DB se expone como
  `expiraEn` en TS.

**Por qué**: el dominio es 100% argentino. Términos como `OrdenDeReparacion`,
`ManoDeObra`, `Repuesto`, `Proveedor` traducen mal a inglés. El lenguaje
ubicuo funciona si el código habla el mismo idioma que el negocio.
`snake_case` en DB es el estándar SQL (case-insensitive por defecto).
`camelCase` es el estándar de TypeScript.

**Qué descartamos**: todo en inglés (rompe el lenguaje ubicuo), híbrido por
capa (subjetivo, lleva a discusiones).

---

## [Fase de diseño] · Estrategia de testing

**Qué decidimos**: pirámide de tests con foco distinto por capa.

- **Dominio**: cobertura alta con tests unitarios. Sin DB, sin mocks pesados.
- **Aplicación**: tests unitarios de cada caso de uso con repositorios en
  memoria.
- **Infraestructura**: tests de integración de adapters contra Postgres
  real en Docker. Cobertura selectiva (queries críticas).
- **Web**: pocos tests E2E con Playwright, solo flujos críticos.
- **Tests se escriben junto con el código, nunca después.**

**Por qué**: la pirámide clásica funciona por buenas razones. Tests
unitarios son rápidos y mantenibles. E2E son frágiles y lentos: usarlos
solo donde aportan valor real (smoke tests de flujos completos).

**Qué descartamos**: estrategia "más tests = más solidez" (falso: tests
mal pensados son peores que pocos bien pensados). Escribir tests al final
(en la práctica nunca se hacen).

---

## [Fase de diseño] · Modelo Persona / Cliente / Colaborador / Usuario

**Qué decidimos**: cuatro entidades separadas, no una con flags ni varias
duplicadas.

- **Persona**: identidad base con datos personales (nombre, etc).
- **Cliente / Colaborador / Proveedor**: relaciones de negocio que
  referencian a Persona. Una Persona puede tener varias o ninguna.
- **Usuario**: credencial de acceso al sistema, asociada a una Persona.

**Por qué**: una persona no _es_ cliente ni colaborador, _tiene_ distintas
relaciones con el taller. Una persona que es cliente y colaborador (común
en el negocio real) vive en una sola fila de Persona y tiene dos relaciones
separadas. Si cambia el teléfono, un solo update. Si renuncia, se borra
solo el Colaborador, la Persona y el Cliente quedan.

**Qué descartamos**:

- **Tres entidades separadas (Cliente, Colaborador, Proveedor) cada una
  con sus datos personales**: causa duplicación e inconsistencia.
- **Una sola entidad Persona con flags `es_cliente`, `es_colaborador`**:
  causa columnas con muchos nulls y queries con verificación de tipos.

---

## [Fase de diseño] · Nombre como un solo campo

**Qué decidimos**: `Persona.nombre` es un solo campo (no `nombre` +
`apellido`).

**Por qué**: facilita la migración desde la DB vieja (que también tiene
nombre completo en un solo campo). Además, un solo campo funciona bien para
nombres compuestos, evita asumir estructura occidental y simplifica el
modelo.

**Qué descartamos**: dos campos (`nombre` + `apellido`). Ventaja sería
ordenar alfabéticamente por apellido, pero no es crítico para este sistema.

---

## [Fase de diseño] · Timestamps y auditoría

**Qué decidimos**: niveles de auditoría según tipo de entidad.

- **Nivel 1 (todas las entidades)**: `creadoEn`, `actualizadoEn`.
  No negociable.
- **Nivel 2 (entidades sensibles: Usuario, Orden, Venta, Pago, Stock)**:
  además `creadoPor`, `actualizadoPor` (FK a Usuario).
- **Nivel 3 (entidades financieras: Orden, Venta, Pago)**: soft delete
  con `eliminadoEn`.
- **Nivel 4 (audit log completo)**: no por ahora, es overkill para la
  escala actual.

Para Etapa 0: solo Nivel 1 en Persona y Usuario. `creadoPor`/`actualizadoPor`
se sumarán en etapas posteriores donde tenga sentido (hay problema de huevo
y gallina con el primer usuario).

**Por qué**: sin timestamps no se puede rastrear nada. Es lo que faltaba en
el proyecto viejo. El nivel 4 es para sistemas con requisitos de auditoría
serios; no es el caso hoy.

---

## [Fase de diseño] · Etapa 0: solo password, sin Google login

**Qué decidimos**: implementar autenticación solo con email + password en
Etapa 0. Google login deferido. Sin tabla `MetodoDeAutenticacion` separada:
`passwordHash` va directo en `Usuario`.

**Por qué**: YAGNI. Google login implica configurar OAuth, callback URLs,
allowlist (porque no cualquier mail puede registrarse), etc. Es una etapa
por sí mismo. Para validar la arquitectura hexagonal alcanza con password.
Si se necesita Google después, el refactor está localizado (mover
passwordHash a una tabla nueva y agregar el método de Google).

**Qué descartamos**: modelar `MetodoDeAutenticacion` separado desde el día
uno. Más complejo sin beneficio inmediato; refactor futuro es factible.

---

## [Fase de diseño] · Casos de uso de la Etapa 0

**Qué decidimos**: la Etapa 0 incluye 7 casos de uso, todos de auth.

1. `InvitarUsuario` (autenticado, super-admin) — crea Invitacion, envía mail.
2. `AceptarInvitacion` (público) — con token, completa Persona + Usuario.
3. `IniciarSesion` — email + password, mensajes de error genéricos.
4. `CerrarSesion`.
5. `SolicitarRecuperacionDePassword` — respuesta idéntica exista o no
   el email (evita enumeración).
6. `ResetearPassword` — con token recibido por mail.
7. `CambiarPassword` — usuario logueado, con password actual.

**Por qué**: registro solo por invitación es lo correcto para un sistema
interno B2B. Mensajes genéricos en login y recuperación evitan que un
atacante descubra qué emails están registrados (enumeración de usuarios).
Cambiar password con password actual es distinto de resetear con token.

**Qué descartamos**:

- Auto-registro abierto.
- `DesactivarUsuario` y gestión de usuarios en Etapa 0: se hará como
  módulo aparte cuando se modele Colaborador.
- Primer super-admin via UI: se crea por script de bootstrap.

---

## [Fase de diseño] · Invariantes principales de la Etapa 0

**Qué decidimos** (a hacer cumplir en el constructor de la entidad de
dominio, no solo en validaciones de formulario):

- `Persona.nombre` no vacío, máximo 150 caracteres.
- `Usuario.email` único en todo el sistema, formato válido.
- `Usuario.passwordHash` no vacío y nunca texto plano.
- `Usuario` tiene exactamente un rol.
- No puede existir `Usuario` sin Persona asociada (el constructor recibe
  una Persona, no un personaId suelto).

**Por qué**: las invariantes viven en el dominio para que sea imposible
construir una entidad inválida desde cualquier capa. Esto es lo que
hexagonal aporta de fondo.

---

## [Fase de diseño] · Autenticación técnica: sesiones server-side rodantes

**Qué decidimos**:

- **Sesiones server-side**, no JWT. Token random opaco en cookie, registro
  en DB con `usuarioId` y `expiraEn`.
- **Duración**: 7 días.
- **Estrategia**: rodante (la fecha de expiración se renueva con uso).
- **Tabla `Sesion`** incluye `usuarioId` Y `usuarioRealId` desde el día
  uno, para preparar masquerade futuro sin tener que migrar después.

**Por qué**:

- Sesiones server-side permiten revocación inmediata (un `DELETE` en DB)
  y cambios de rol/permisos con efecto inmediato. JWT son problemáticos
  para revocar.
- 7 días con renovación rodante mantiene a los usuarios activos logueados
  sin re-loguearse, y desloguea automáticamente cuentas inactivas.
- Para la escala (3-10 usuarios concurrentes), la query extra por request
  es invisible. JWT no aporta valor real.
- Modelar `usuarioRealId` desde el día uno cuesta una columna y evita
  migración futura: es YAGNI bien aplicado (no implementar la feature de
  masquerade ahora, pero diseñar la estructura de datos para admitirla).

**Qué descartamos**: JWT (complica revocación, cambios de rol diferidos,
ningún beneficio real en esta escala).

---

## [Fase de diseño] · Hashing de passwords: bcrypt

**Qué decidimos**: bcrypt para hashear passwords.

**Por qué**: simple de usar correctamente, librerías estables y mantenidas
en Node.js, battle-tested durante 25+ años. La diferencia de seguridad real
con Argon2 es marginal. Si en el futuro se quiere migrar a Argon2, es
factible mediante migración progresiva (re-hashear en cada login).

**Qué descartamos**:

- MD5, SHA-1, SHA-256, etc: funciones rápidas, inseguras para passwords.
- Argon2: más moderno, recomendado por OWASP, pero más complejo de
  configurar bien. No vale la pena hoy.
- scrypt: intermedio, menos popular.

---

## [Fase de diseño] · Implementación manual de auth

**Qué decidimos**: implementar autenticación a mano (generar token,
guardarlo, validar cookies, etc), sin librería como Auth.js. Usar Lucia
y guías de OWASP como referencia.

**Por qué**:

- Objetivo principal del proyecto es aprender. Auth.js oculta el 70% del
  trabajo, que es justo lo que se quiere entender.
- Encaja con arquitectura hexagonal (Auth.js impone su propio schema y
  convenciones que pelean con esto).
- Sistema tiene requisitos no estándar (masquerade futuro, registro solo
  por invitación) que complican las librerías genéricas.
- Implementar sesiones server-side a mano son 100-200 líneas, no es una
  odisea.

**Qué descartamos**:

- **Auth.js (NextAuth)**: muy popular pero oculta lo que queremos aprender.
- **Lucia (como librería)**: se está deprecando como librería; sus guías
  siguen siendo referencia válida.
- **Clerk**: SaaS externo, oculta todo, te ata al servicio.

Para Google login futuro: sí se usará una librería puntual para el flow
OAuth (los detalles de OAuth no vale la pena reimplementarlos).

---

## [Fase de diseño] · Manual de marca: white-label nivel 1

**Qué decidimos**:

- Solo **nombre** y **logo** son configurables por instalación. Paleta y
  resto del diseño son fijos.
- Dirección visual: **tech moderno con acento industrial sutil**. Base
  limpia tipo Linear, acento azul "Bosch profesional" como toque industrial.
- **Solo light theme** en Etapa 0. Dark mode posible más adelante si hay
  demanda real.
- **shadcn/ui + Tailwind** como librería de componentes.
- Idioma: español argentino.

**Por qué**:

- White-label nivel 1 es lo más simple suficiente para que el sistema sea
  reutilizable.
- shadcn da estética Linear-like por defecto, no impone Material Design,
  vive en el repo (control total).
- Light-only ahorra duplicar el trabajo de diseño sin saber si el dark
  mode se va a usar.
- El azul "Bosch" tiene contexto: el taller de referencia es servicio
  técnico oficial Bosch.

**Qué descartamos**:

- Material UI: estética Material (Android-like), difícil de personalizar
  fuera de su look. No coherente con la dirección visual elegida.
- White-label niveles 2 (colores configurables) y 3 (textos completos):
  pueden agregarse si surge la necesidad.
- Dark mode desde el día uno: duplica trabajo de diseño.

---

## 2026-05-20 · Sistema de tokens de color

**Qué decidimos**:

- **Paleta cruda** (`primary-50` a `primary-800`, `n-0` a `n-900`, pares
  `fg/bg` para semánticos): vive en `globals.css`, no la consume la
  aplicación directamente.
- **16 tokens semánticos** que la app sí consume vía Tailwind: surfaces
  (`background`, `foreground`, `card`, `muted`, `muted-foreground`),
  bordes y foco (`border`, `border-strong`, `ring`), brand (`primary`,
  `primary-foreground`, `primary-hover`, `primary-muted`,
  `primary-muted-foreground`), semánticos (`success`, `warning`,
  `destructive`, `info`, cada uno con su par `*-bg`).
- **`info` separado del brand**: brand es indigo (`#1E47B5`), info es sky
  (`#0369A1` / `#E0F2FE`). Misma familia mental "azul" pero distinguibles.
- Paleta cruda y tokens semánticos completos están listados en
  `MANUAL-DE-MARCA.md`.

**Por qué**:

- La propuesta original tenía `info` y `primary` con el mismo hex exacto.
  Es un bug semántico: un toast info y cualquier énfasis brand quedan
  indistinguibles, y los badges info dentro de bloques con énfasis primary
  desaparecen.
- Separar paleta cruda de tokens semánticos es como shadcn está pensado.
  Pelearle el modelo de tokens es trabajo extra sin valor.
- 16 tokens es la mínima superficie suficiente para construir el sistema.
  Menos sería forzar al dev a repetir decisiones; más sería abrir
  variantes redundantes.
- Tener la paleta cruda separada deja la puerta abierta a dark mode
  (cambian los mapeos en `globals.css`, no los componentes) y a
  white-label nivel 2 (paleta configurable) sin refactor.

**Qué descartamos**:

- Solo paleta cruda en la app (`bg-primary-600`). Cada dev decidiría qué
  escalón es "el correcto" para texto secundario; en seis meses tres
  grises distintos compitiendo en el mismo formulario.
- Solo semánticos sin paleta cruda accesible. Si necesitás un matiz un
  poco distinto para un caso puntual, no hay escape.
- Aceptar el solape `info ≡ primary` (descartado por bug semántico).
- Eliminar `info` como semántico y resolver con neutral (defendible pero
  perdía la convención "info = azul" que el usuario reconoce).

---

## 2026-05-20 · Estados de foco, sombras y elevación

**Qué decidimos**:

- **Focus visible** en las 4 variantes de botón: ring `2px primary-500`
  con offset `2px`. Implementado con `outline` (no `box-shadow`) para
  respetar border-radius en el offset. `focus-visible`, no `focus`: el
  ring aparece con Tab pero no con click del mouse.
- **Sombras = elevación real**. Cards en flujo (login, formularios,
  empty states, sidebar, topbar): solo borde, sin sombra. Elementos que
  flotan sobre el flujo (toasts, dropdowns, popovers): `shadow-md`.
  Modales: `shadow-lg`. La `shadow-sm` decorativa que tenía la propuesta
  original se elimina del sistema.

**Por qué**:

- Botones sin focus visible son un bug de accesibilidad concreto: un
  admin que navega con Tab no ve dónde está parado. WCAG 2.4.7 lo
  exige. Los inputs ya tenían focus ring; los botones no — inconsistente.
- Ring color único (`primary-500`) en las 4 variantes: una sola decisión,
  un solo token (`ring`), funciona sobre cualquier fondo, alineado con
  el default de shadcn.
- "Sombras = elevación real" es la regla más enseñable: cualquier dev
  nuevo entiende "flota o no" sin abrir el manual. La sombra `sm`
  decorativa para cards "porque sí" generaba inconsistencia (algunas
  cards con sombra, otras no, sin criterio claro).

**Qué descartamos**:

- Ring color por variante (rojo en destructive, etc.): "más armónico"
  pero obliga a un token de ring por variante. Cuatro decisiones donde
  alcanza una.
- Ring interior con box-shadow inset: se pierde sobre fondos del mismo
  color del botón.
- Solo focus regular (sin `focus-visible`): el ring aparece también con
  click, que es ruido visual.
- Cero sombras, todo borde: los toasts sin sombra se ven como otra card
  del flujo, pierden la señal "esto aparece por encima".
- Mantener `shadow-sm` para cards de login y similares: sin criterio
  claro de cuándo aplicar.

---

## 2026-05-20 · Botones, toasts y densidad de controles

**Qué decidimos**:

- **4 variantes de botón**: `primary`, `secondary` (outline), `destructive`,
  `ghost`. **Sin variante `link`**.
- **Regla mecánica para links vs botones**: si cambia la URL → `<a>` con
  estilos de link. Si dispara JS sin cambiar URL → `<Button variant="ghost">`.
- **Altura única 36px** para botones e inputs. Padding horizontal 14px
  (botones) / 10px (inputs).
- **Excepción `sm = 30px`** solo para acciones secundarias dentro de
  filas de tabla (botón "Ver", "Editar" en una fila). No en formularios
  ni headers.
- **Toasts abajo-derecha**, stackeando hacia arriba. Margin 16px desde
  los bordes.
- **Dismiss por consecuencia, no por color**: default auto-dismiss a 5s;
  `persistent: true` cuando la acción es irreversible o crítica (delete,
  anulación, ajuste de stock); errores y warnings siempre persistentes.

**Por qué**:

- La variante `link` mezclaba tres cosas distintas (link de navegación,
  link auxiliar, "acción que parece link"). Sin la variante, la decisión
  es mecánica: URL o no. Reduce ambigüedad sin perder casos de uso (los
  "links que disparan acción" se modelan como `ghost`).
- Altura única evita el zoo de tamaños del proyecto viejo. 36px es la
  altura `sm` de shadcn por defecto: declararlo explícito evita que cada
  componente nuevo venga a 40 por inercia.
- La excepción de tabla es real: 36px en cada fila come mucho vertical en
  listas largas (órdenes, stock, repuestos).
- Toasts arriba-derecha pisan el área del menú de usuario y notificaciones
  del topbar. Abajo-derecha queda limpia para un sistema desktop con
  sidebar.
- Dismiss por consecuencia (en vez de por color) cubre el caso "success
  de operación destructiva": el usuario necesita ver bien la
  confirmación. Si se va en 5s mientras pestañeó, perdió la
  confirmación.

**Qué descartamos**:

- 5 variantes de botón con `link` aparte. La variante existe en shadcn
  por inercia, pero abre la puerta a inconsistencias accesibles.
- Múltiples tamaños (`sm`, `md`, `lg`) como sistema: solo se mantiene
  `sm` con uso restringido y documentado.
- Auto-dismiss a 5s para todos los success: pierde confirmaciones
  importantes.
- Toasts arriba (centrados o a la derecha): chocan con elementos del
  topbar.

---

## 2026-05-20 · Tipografía e iconografía

**Qué decidimos**:

- **Familias**: IBM Plex Sans para texto general, IBM Plex Mono para
  datos numéricos (patentes, códigos de orden, precios, fechas). Pesos:
  400 y 500 de Sans, 400 de Mono. Subset latin extended.
- **Escala con 6 niveles**: `display`, `heading`, `subheading`, `body`,
  `small`, `mono`. Sin tokens para variantes (`body-strong` y `caption`
  se aplican como utilities, no como tokens).
- **Iconografía**: `lucide-react` (viene con shadcn), stroke `1.75` como
  default (override del `2`).
- **Color de íconos por contexto, no por decisión propia**: default
  `muted-foreground`; `primary` solo si representa el producto o estado
  activo; semántico cuando comunica el semántico; `primary-foreground`
  cuando va dentro de un botón primary/destructive.

**Por qué**:

- IBM Plex tiene terminaciones rectas con un toque técnico que Inter no
  tiene. Cuadra con "acento industrial sutil". Free, manejo de hinting
  bueno, latin extended completo.
- Mono para datos no es decorativo: alinea columnas en tablas y
  distingue visualmente "esto es dato, no palabra". Las tablas son
  inevitables en un sistema de gestión.
- 6 niveles es la mínima escala jerárquica real. La propuesta original
  traía 8 con dos que eran variaciones (peso, caja) de niveles ya
  presentes. Token global solo si es nivel jerárquico real; variaciones
  como utilities.
- Stroke `1.75` (vs `2`) le da al sistema un toque más fino, alineado
  con la sensación general. Es un override de un solo lugar.
- Color de íconos por contexto: el ícono "decide" por sí mismo solo
  cuando comunica semántico. El resto del tiempo es decoración: gris.

**Qué descartamos**:

- Inter como fuente principal: más genérica, sin la personalidad técnica
  que se busca.
- Tokens `body-strong` y `caption` separados: son variaciones, no niveles.
  Vivir como tokens generaría preguntas tipo "¿cuándo uso body y cuándo
  body-strong?" que se resuelven mejor con utilities en el lugar.
- Iconos custom o de otra librería: pelearle a shadcn sin razón.
- Color de ícono "por decisión del componente": termina en un zoo
  cromático sin sistema.

---

## 2026-05-20 · Pattern de fondo y logo white-label

**Qué decidimos**:

- **Sin pattern decorativo** de cuadrícula en el fondo de las pantallas.
  Fondo plano `background` (`n-50`) en todas.
- **Logo del cliente**: dos slots independientes por instalación.
  - Slot 1: imagen (PNG/SVG, hasta 64×64).
  - Slot 2: nombre del taller (string, render con Plex Sans 600).
- **Fallback de imagen**: si el taller todavía no subió logo, el cuadrado
  muestra iniciales (2 letras) sobre fondo `muted` con texto
  `muted-foreground`. **No** usar el cuadrado `primary` con ícono
  genérico (eso era solo placeholder de pre-instalación).
- **`primary` no aparece detrás del logo del cliente**. Sigue siendo
  el color de marca del producto (botones, links, ítem activo), pero
  no es la base visual del logo de la instalación.

**Por qué**:

- El pattern de cuadrícula era la única personalidad visual no-Linear
  del sistema, pero las ventajas (identidad, sensación de papel técnico,
  empty states menos rotos) son sutiles. Si el usuario que va a usar y
  mantener el sistema dice "nunca lo vi realmente", los usuarios reales
  (administrativos del taller, no diseñadores) tampoco lo van a percibir.
  En pantallas densas (tablas de órdenes, listas de stock) el pattern
  satura. En empty states reales conviene resolver con texto guía / ícono
  ilustrado / acción sugerida, que sí comunica algo.
- Dos slots separados (imagen + nombre) es lo que la decisión inicial
  de white-label nivel 1 ya declaraba ("nombre y logo configurables").
  Logo wordmark único contradice eso.
- El cuadrado `primary` detrás del logo del cliente le imponía al
  cliente "tu logo tiene que verse bien sobre azul". Eso es nivel 0.5
  de white-label, no nivel 1.

**Qué descartamos**:

- Pattern siempre en el fondo de la app, tapado por cards: cansa la
  vista en pantallas densas.
- Pattern solo en auth y empty states: tampoco aporta lo suficiente para
  justificar la inversión y la decisión de cuándo aplicarlo.
- Logo del cliente sobre cuadrado `primary` fijo: restricción no
  declarada.
- Logo wordmark único (cliente sube imagen que incluye su nombre):
  perdía control tipográfico, cada instalación se vería totalmente
  distinta.

---

## 2026-05-20 · Voz del producto (refina decisión previa)

**Qué decidimos**:

- **Voz** opera con regla mecánica de dos zonas:
  - **Acciones (lo que el sistema pide hacer)**: infinitivo. Ejemplos:
    `Iniciar sesión`, `Cerrar sesión`, `Recuperar contraseña`, `Editar`,
    `Email`, `Activar cuenta`.
  - **Mensajes (lo que el sistema cuenta)**: impersonal. Ejemplos:
    `El email no es válido.`, `No hay órdenes pendientes.`, `La orden
OS-2024-001847 fue guardada.`, `La sesión cierra en 5 minutos.`
- **Sin voseo argentino**. Cuando aparece segunda persona explícita,
  tuteo neutro pan-hispano. Pero la regla de infinitivo/impersonal evita
  la mayoría de los casos.
- **Sin género asumido**: nada de "Bienvenido, Juan". Headers neutros
  como `Inicio` o `Panel del taller`.
- **Errores describen qué pasó, no quién la pifió**: "El email no es
  válido" ✓; "Ingresaste un email incorrecto" ✗.
- **Sin corporativismo**: "Acceso al taller" ✓; "Acceso · Personal
  autorizado" ✗.

Esta decisión **refina** la decisión previa "Manual de marca:
white-label nivel 1" en su punto "Idioma: español argentino". La
intención original era localización argentina; ahora se especifica que
eso significa voz neutra pan-hispana con tuteo cuando aplica, no voseo.

**Por qué**:

- Voseo argentino fija la base de strings en una variante regional. Si
  algún día el producto se ofrece fuera de Argentina, la migración es
  más fea que si se arranca neutro.
- Dos zonas (infinitivo/impersonal) es regla mecánica: el dev escribiendo
  un string nuevo no tiene que decidir entre 5 patrones, decide entre 2.
- "Sin género asumido" baja el costo del archivo de strings: una sola
  versión por mensaje, sin variantes Bienvenido/Bienvenida.
- Errores que asumen buena fe del usuario son norma de UX moderna y
  ahorran fricción.

**Qué descartamos**:

- Voseo argentino puro (la decisión previa implícita).
- Tuteo neutro como regla general: cubre solo los casos con segunda
  persona explícita; la regla mecánica infinitivo/impersonal es más
  potente.
- Usted formal: incompatible con el resto del sistema (densidad,
  modernidad). Sugiere trámite oficial.
- Infinitivo total (acciones + mensajes): mensajes en infinitivo suenan
  a manual técnico ("Verificar los campos marcados").

---

## 2026-05-20 · i18n: archivo de strings plano en Etapa 0

**Qué decidimos**:

- **i18n se sube a Etapa 0** (era pendiente, ahora es trabajo de la etapa
  actual). Causa: la decisión de voz exige que ningún string del producto
  se escriba inline en JSX.
- Implementación: archivo `apps/web/src/i18n/strings.ts` con un objeto
  exportado, agrupado por feature. Type-safe nativo (el compilador valida
  la existencia de cada key, ctrl-click navega, rename actualiza usos).
- **Sin librería i18n** (next-intl, react-intl, etc.). El archivo plano
  alcanza.
- Errores del dominio se modelan como **tipos discriminados** (`{ kind:
'EmailInvalido' }`) en `packages/domain` y `packages/application`. La
  capa de presentación los traduce a strings. El dominio nunca sabe de
  strings de UI.

**Por qué**:

- Hoy y en todos las etapas mapeadas, el producto es 100% español
  rioplatense para usuarios argentinos. No hay locales que cambiar, ni
  pluralización ICU rara, ni fechas formateadas por país.
- `strings.ts` plano es lo más cómodo de programar y refactorizar: el
  IDE entiende todo sin config extra, no hay carpetas de mensajes ni
  middleware.
- Una librería i18n en etapa 0 mete fricción (setup, learning curve,
  dependency) para resolver problemas que no se tienen.
- Cuando llegue (si llega) un caso real — otro idioma, números por
  país — la migración es mecánica: todos los strings ya están
  centralizados.
- Errores como tipos discriminados respeta hexagonal: el dominio sabe
  _qué falló semánticamente_, no _cómo se le explica al usuario_.

**Qué descartamos**:

- `next-intl` (o equivalente) en etapa 0: sobreingeniería para un solo
  locale.
- Híbrido "arranco con archivo plano, migro cuando aparezca el caso":
  es la misma decisión que archivo plano puro, solo agrega ruido de
  prometer migración futura.
- Errores del dominio que devuelven strings castellanos directamente:
  rompe hexagonal (dominio acopla a presentación).

---

## 2026-05-20 · Formato de la bitácora: índice + fechas

**Qué decidimos**: mantener `DECISIONES.md` como **un solo archivo** (no
fragmentar en carpeta por tema ni por etapa), pero agregarle dos cosas:

- **Fecha al inicio de cada título** de decisión: `## AAAA-MM-DD · Título`.
  Las decisiones previas a este cambio quedan marcadas `[Fase de diseño]` porque
  no se registró su fecha real (no se inventan fechas).
- **Índice navegable** al tope del archivo: listado cronológico de todas
  las decisiones con enlace a cada una.

Esto **refina** la decisión previa "[Fase de diseño] · Bitácora de decisiones",
que ya elegía archivo único pero sin índice ni fechas.

**Por qué**:

- El miedo a "archivo de 1 GB" no resiste los números: todo el proyecto
  genera del orden de cientos de KB de markdown, nunca un problema de
  tamaño. Markdown es texto plano.
- Los dos requisitos reales eran _encontrar rápido por tema_ y _buscar
  por fecha_. El índice resuelve el primero (sin scrollear); las fechas
  en los títulos resuelven el segundo (`Ctrl-F` o `grep` sobre el año-mes).
- El orden cronológico es información: una decisión que refina otra se
  lee como evolución solo si ambas están en el mismo flujo temporal.
  Agrupar por tema lo rompería.
- Archivo único es lo más barato de mantener: una decisión nueva es un
  bloque al final más una línea en el índice.

**Qué descartamos**:

- **Carpeta temática** (`decisiones/auth.md`, `ui.md`...): rompe la
  cronología global y obliga a clasificar cada decisión (¿"voz" es UI o
  i18n?). La duda de clasificación es el peor costo diario.
- **Archivo por etapa** (`etapa-0.md`...): los nombres numerados no se
  asocian fácil a un tema; "etapa-3" obliga a traducir mentalmente a
  "repuestos y stock" cada vez.
- **Inventar fechas retroactivas** para las decisiones de fase de Diseño: se
  marcan `[Fase de diseño]` en su lugar.

---

## 2026-05-20 · Scope de paquetes: @taller

**Qué decidimos**: los paquetes internos del monorepo usan el scope
`@taller`: `@taller/domain`, `@taller/application`,
`@taller/infrastructure`. Es solo para imports internos; no se publica
a npm.

**Por qué**: el `@scope/` deja claro de un vistazo que el import es
interno y no de una dependencia externa. Un scope genérico (`@taller`)
no se ata al nombre comercial del producto, que puede cambiar. No hay
intención de publicar a npm, así que no importa si el nombre está
tomado.

**Qué descartamos**:

- Scope con el nombre del producto: ataría los imports a un nombre que
  puede cambiar.
- Sin scope (`domain`, `application` a secas): no distingue a simple
  vista un paquete interno de uno de npm, y puede chocar con nombres
  reales.

---

## 2026-05-20 · TypeScript: config base estricta

**Qué decidimos**: una `tsconfig.base.json` en la raíz con las reglas
comunes; cada paquete tiene un `tsconfig.json` que la extiende. La base
es estricta: `strict: true`, `noUncheckedIndexedAccess`,
`noImplicitOverride`, `noFallthroughCasesInSwitch`.

**Por qué**: definir el rigor una sola vez y que valga para todos los
paquetes; endurecer una regla se hace en un solo lugar. El nivel
estricto es coherente con el objetivo de aprender: el compilador enseña
a base de errores y atrapa bugs reales (sobre todo `undefined` en
accesos indexados) antes de tiempo de ejecución.

**Qué descartamos**:

- Config por paquete independiente: repite todo, se desincroniza.
- Solo `strict: true` sin los extra: deja pasar accesos indexados sin
  chequear, que son fuente común de bugs.

---

## 2026-05-20 · Lint y formato: ESLint + Prettier

**Qué decidimos**: ESLint para linting y Prettier para formateo (dos
herramientas). ESLint incluye un plugin de boundaries
(`eslint-plugin-boundaries` o equivalente) para hacer cumplir los
límites de la arquitectura hexagonal: `domain` y `application` no pueden
importar Next.js, el ORM, ni infraestructura.

**Por qué**: el valor concreto es que un import prohibido falle en el
linter automáticamente, no en una revisión manual. Eso convierte la
regla arquitectónica (ya decidida) en algo que la herramienta protege
sola. ESLint tiene el ecosistema de reglas más completo, incluido el de
boundaries.

**Qué descartamos**:

- Biome (lint + formato en una sola herramienta, más rápido y simple):
  todavía no tiene un equivalente maduro al plugin de boundaries, que es
  justo la regla que más importa para proteger la hexagonal. Revisable
  si Biome madura en eso.

---

## 2026-05-20 · Runner de tests: Vitest

**Qué decidimos**: Vitest como runner de tests en todos los paquetes.

**Por qué**: el grueso de la pirámide son unitarios de dominio y
aplicación, y se quiere que correr tests sea instantáneo y sin fricción.
Vitest arranca en milisegundos, es nativo con TypeScript y ESM (el
dominio es TS puro, los tests corren sin transpilación rara), y su API
es prácticamente igual a la de Jest, así que la curva es mínima.

**Qué descartamos**:

- Jest: más material online pero más fricción con TS/ESM y más lento.
- node:test (runner nativo): cero dependencias, pero le falta el
  ecosistema (mocking, coverage, watch mode) que se va a querer.

---

## 2026-05-20 · Límite application↔web: DTOs de salida

**Qué decidimos**: tres reglas encadenadas sobre cómo cruzan los datos
desde el dominio hacia la web:

- **La entidad de dominio nunca sale de `application`.** Lo que cruza a
  `web` es siempre un objeto plano (DTO de salida).
- **El mapeo entidad → DTO vive en `application`**, no en `web`. El caso
  de uso devuelve el DTO ya armado.
- **El DTO de salida es ancho y general**: expone todo lo que un
  consumidor razonable podría necesitar, menos lo sensible
  (passwordHash, tokens). El Server Action recorta/formatea para su
  pantalla particular.

**Por qué**:

- Si la entidad cruzara a `web`, aunque sea "de paso", se violaría el
  límite: la UI quedaría acoplada a la estructura interna del dominio y
  podría exponer datos sensibles. Las entidades además tienen
  comportamiento y no serializan bien a través de la red de un Server
  Action.
- El mapeo en `application` mantiene la entidad adentro y deja el DTO
  listo para cualquier adaptador de entrada (Server Action hoy, Route
  Handler de un webhook mañana) sin reimplementarlo.
- Un DTO ancho responde a la pregunta del negocio ("obtener usuario"),
  no a una pantalla, así que es reutilizable por consumidores que
  todavía no existen. La especialización por pantalla vive en el Server
  Action, que es barato de cambiar y no lo comparte nadie.
- Qué es "sensible" lo decide application/dominio, no la UI: la regla
  "el hash nunca sale" no puede depender de que cada Server Action se
  acuerde de excluirlo.

**Qué descartamos**:

- Devolver la entidad y mapear en `web`: la entidad cruzaría el límite.
- DTO estrecho y específico por pantalla: ata el caso de uso a una vista
  y mata la reutilización.
- Excepciones previstas (no son la regla, se aplican cuando la evidencia
  lo pide): partir en casos de uso específicos cuando el DTO ancho
  implica queries caras que casi nadie usa, o cuando dos consumidores
  necesitan formas genuinamente incompatibles del mismo concepto.

---

## 2026-05-20 · web no depende de domain (ni tipos); DTOs los define application

**Qué decidimos**: `apps/web` no importa de `packages/domain` en
absoluto — ni valores ni tipos. Web depende solo de `application`. Los
DTOs de salida (los contratos de datos que web consume) se definen y
exportan desde `application`. Los ViewModels reducidos para una pantalla
puntual viven en `web` y se mapean desde esos DTOs.

**Por qué**:

- Como los casos de uso devuelven DTOs (no entidades), web nunca recibe
  un `Usuario` de dominio: trabaja con `UsuarioDTO`. Por lo tanto no
  necesita importar el tipo de la entidad. La excepción "solo tipos" que
  se había considerado resulta innecesaria.
- Que `application` sea dueña de los DTOs mantiene la dirección de
  dependencias correcta (las capas de afuera dependen de las de adentro,
  nunca al revés). Si web definiera los DTOs, application tendría que
  conocer un tipo de una capa más externa.
- La frontera con `domain` queda hermética y fácil de hacer cumplir por
  el linter: cualquier import de `domain` en `web` es un error, sin
  matices.

**Qué descartamos**:

- Permitir a web importar tipos de `domain` (la "excepción solo tipos"):
  grieta innecesaria una vez que los DTOs viven en `application`.
- Definir los DTOs en `web`: invertiría la dependencia (application
  conocería a web).

Modifica la regla de boundaries propuesta en el bootstrap, que dejaba
este punto como "revisable".

---

## 2026-05-20 · Versiones del stack (bootstrap)

**Qué decidimos**: versiones pegadas en el bootstrap del esqueleto.
Runtime: Node 22.22.3, pnpm 11.1.3. Stack: Next 16.2.6, React 19.2.6,
TypeScript 6.0.3, ESLint 9.39.4 (ver entrada aparte sobre el pin),
Vitest 4.1.6, Prettier 3.8.3, eslint-plugin-boundaries 6.0.2. Criterio:
`@latest` de cada uno al momento del bootstrap.

**Por qué**: arrancar en lo estable más reciente evita migraciones
tempranas y arrastrar vulnerabilidades ya parcheadas. Next 16 (no 15)
es la rama estable actual.

**Qué descartamos**: Next 15 (versión anterior, ya superada).

---

## 2026-05-20 · ESLint pineado a v9 (no v10)

**Qué decidimos**: ESLint queda en v9 (9.39.4), no v10, pese a que v10
ya salió.

**Por qué**: `eslint-config-next@16.2.6` arrastra
`eslint-plugin-react@7.37.5`, que usa una API removida en ESLint 10
(`context.getFilename()`) y crashea. Es un bug del ecosistema de Next,
no del proyecto. No vale la pena pelearlo.

**Qué descartamos**: forzar ESLint 10 ahora. Se revisa y se sube cuando
Next publique un config compatible con v10.

---

## 2026-05-21 · Postgres local con Docker Compose

**Qué decidimos**: el Postgres de desarrollo corre en un contenedor
gestionado por `docker-compose.yml` en la raíz. Imagen pineada
(`postgres:18`), volumen nombrado (`taller_pgdata`) para la persistencia,
puerto `5432:5432`, credenciales vía variables tomadas de un `.env` no
commiteado. Se versiona un `.env.example` con placeholders.

**Por qué**: el compose es un contrato reproducible y versionado, a
diferencia de un `docker run` con flags que vive en la memoria o en un
README que se desactualiza. Pinear la major evita sorpresas al cambiar de
máquina (mismo criterio que el resto del stack). El volumen nombrado lo
gestiona Docker y no ensucia el árbol del repo ni se cuela en git. El 5432
está libre en la máquina de desarrollo, así que no hace falta aislar puerto.

**Qué descartamos**: `docker run` suelto (no reproducible), `latest` sin
pin (cambios silenciosos de versión), bind-mount a una carpeta del repo
(riesgo de commitear datos), Postgres nativo (más fricción de setup que un
contenedor descartable).

**Nota (mismo día)**: el volumen se monta en `/var/lib/postgresql`, no en
`/var/lib/postgresql/data`. Desde Postgres 18 la imagen oficial cambió la
convención: los datos viven en un subdirectorio por major version
(`/var/lib/postgresql/18/docker`) y el mount va al directorio padre. Montar
en la ruta vieja (`/data`) hace que el contenedor aborte en el arranque.

---

## 2026-05-21 · Cableado de Drizzle

**Qué decidimos**: cómo se integra Drizzle, en cuatro puntos.

- **Layout**: todo Drizzle vive en `packages/infrastructure`. El
  `drizzle.config.ts` (tooling de drizzle-kit) va en la raíz del paquete;
  el cliente de conexión runtime (`cliente.ts`), el schema partido por
  entidad y las migraciones van bajo `src/persistencia/drizzle/`.
- **Driver**: `node-postgres` (`pg`).
- **Migraciones**: workflow `generate` + `migrate` (SQL versionado y
  revisado), no `push`.
- **Mapeo de nombres**: explícito por campo (`timestamp('creado_en')`),
  no el helper `casing`.

**Por qué**:

- Drizzle es el adapter que implementa los puertos de persistencia, así
  que su lugar es infrastructure. Config (dev/tooling) y cliente (runtime)
  se separan para no acoplar las migraciones al código de ejecución.
- `pg` es el estándar con más material: cuando algo falle, la primera
  respuesta online aplica. La velocidad de `postgres.js` es invisible a
  esta escala, y el driver está detrás del puerto, así que cambiarlo es
  barato.
- `generate` + `migrate` deja cada cambio de schema como SQL revisable y
  commiteado, misma lógica de historial que esta bitácora. El SQL
  generado se revisa antes de aplicar (Drizzle puede generar migraciones
  destructivas, ej. rename interpretado como drop + add).
- El mapeo explícito hace que lo que se ve en el schema sea lo que existe
  en la DB, sin una regla de conversión mental de por medio.

**Qué descartamos**: `postgres.js` (menos material, beneficio de
velocidad nulo a esta escala), `push` (sin historial), `casing:
'snake_case'` (esconde el nombre real de la columna en la config).

---

## 2026-05-21 · Idioma de carpetas vs. idioma del negocio

**Qué decidimos**: precisar la frontera del idioma en el código.

- **Estructura técnica** (nombres de capas y carpetas internas) en
  **inglés**: `infrastructure`, `persistence`, `migrations`,
  `repositories`, `schema`, `client`, etc.
- **Negocio / lenguaje ubicuo** en **español**: nombres de entidades,
  tablas, columnas, casos de uso y los archivos que los contienen
  (`persona.ts`, `usuario.ts`).

**Por qué**: los nombres de capas y piezas técnicas son vocabulario de
arquitectura, no del negocio; mantenerlos en inglés alinea el proyecto
con la literatura estándar (hexagonal, Drizzle) y con el material de
aprendizaje. El español queda reservado para el lenguaje ubicuo, que es
donde aporta valor real: que el código hable el idioma del taller.

**Qué descartamos**: traducir todo a español (aleja del vocabulario
canónico que se lee en libros y artículos), y dejar la mezcla librada al
azar (lo que venía pasando: inconsistente e injustificable).

Refina la decisión de "Convenciones de código y schema", que solo cubría
el idioma del negocio sin hablar de la estructura técnica.

---

## 2026-05-21 · Idioma del código: genérico vs. propio del dominio

**Qué decidimos**: afinar la frontera del idioma. La línea no es
"estructura técnica vs. negocio", sino **genérico vs. propio del dominio**.

- **Inglés**: todo lo que existiría en cualquier sistema sin importar el
  rubro: carpetas (`infrastructure`, `persistence`, `repositories`),
  interfaces y clases técnicas (`IdGenerator`), y los métodos de plomería
  como los del repositorio (`save`, `findById`, `delete`).
- **Español**: todo lo propio del taller, sustantivos **y verbos**: las
  entidades y sus campos (`Persona`, `Usuario`), y las acciones de negocio
  del dominio (`registrarRepuesto`, `cambiarPassword`, `aceptarInvitacion`).

Test mental: **¿esto lo entendería alguien del taller?** Si sí, español
(sea sustantivo o verbo). Si es plomería que existe en cualquier app,
inglés.

**Por qué**: traducir un verbo de negocio rompe el lenguaje ubicuo tanto
como traducir el sustantivo: `registerReplacement` no es lo que dice un
mecánico, `registrarRepuesto` sí. La acción de negocio es parte del
dominio, no es plomería. A la vez, el código genérico no gana nada con el
español y sí pierde alineación con la literatura y las librerías.

**Qué descartamos**: la frontera anterior ("estructura técnica en inglés,
negocio en español"), que dejaba afuera las acciones de dominio y obligaba
a conjugar verbos de negocio en inglés. También se descartó traducir el
plumbing genérico a español (no aporta y desalinea).

Corrige la decisión "Idioma de carpetas vs. idioma del negocio" del mismo
día: la estructura técnica sigue en inglés, pero el criterio rector ahora
es genérico vs. dominio, lo que suma las acciones de negocio al español.

---

## 2026-05-21 · Carga del .env en drizzle-kit vía --env-file (corrige decisión previa)

**Qué decidimos**: el .env de la raíz lo cargan los scripts de migración con
el flag nativo de Node `--env-file=../../.env` (en db:generate y db:migrate).
El drizzle.config.ts queda pelado: solo lee process.env.DATABASE_URL, sin
cargar ningún archivo.

**Por qué**: la decisión previa (config carga el .env por path interno con
process.loadEnvFile + import.meta.dirname) no funcionó: bajo el loader de
drizzle-kit, import.meta.dirname venía undefined y el path no se resolvía.
Cargar el .env desde el script con --env-file es nativo de Node 22, no agrega
dependencias, y deja el config sin saber nada de paths ni de archivos: el
entorno se lo provee quien lo invoca. Es además la opción más limpia que ya
habíamos contemplado (el entorno lo provee el proceso, no el config).

**Qué descartamos**: insistir con loadEnvFile en el config (no resuelve el
import.meta.dirname undefined), y sumar dotenv como dependencia (innecesario
teniendo --env-file nativo).

Referencia: corrige la decisión "Cableado de Drizzle" (sub-punto de cómo el
config lee el .env) del mismo día.

---

## 2026-05-21 · Organización de errores de dominio (híbrido por entidad + global)

**Qué decidimos**: los errores de dominio son clases tipadas (no strings).
Se organizan así:

- Error específico de una entidad → vive en el archivo de errores de esa
  entidad (ej. los errores de Persona junto a Persona).
- Error transversal (lo usan varias entidades) → vive en un archivo
  compartido de errores de dominio.

Regla de promoción: arrancar siempre poniendo el error en su entidad. Un
error se mueve al archivo global SOLO cuando una segunda entidad lo necesita
de verdad, nunca por adelantado.

- Los errores de dominio llaman a `super()` con un mensaje técnico seco en
  inglés (para logs y debugging), NO es el texto que ve el usuario. El
  mensaje de cara al usuario lo arma la capa de presentación en español
  desde el payload del error. Sin comentarios en el código que expliquen
  esto: la convención vive acá.
- Los errores van SIEMPRE en un archivo de errores aparte, aunque la entidad
  o value object tenga un solo error. Se respeta el formato sin excepciones
  por cantidad: el código queda predecible y se trabaja siguiendo siempre la
  misma convención.

**Por qué**: mantiene cada error cerca de la entidad que protege (cohesión),
evita un archivo central que se vuelve cajón de sastre, y permite reutilizar
los pocos errores que sí son transversales. La regla de promoción evita
llenar el global con errores de un solo uso.

**Qué descartamos**: un archivo por error (demasiados archivos sueltos), y un
único archivo central para todo el dominio (crece hasta volverse inmanejable).

---

## 2026-05-21 · Ubicación de value objects transversales

**Qué decidimos**: los value objects que no pertenecen a una sola entidad (los
transversales: Email, y a futuro Dinero, Cuit, etc.) viven en
`packages/domain/src/shared/value-objects/<concepto>/`, cada uno en su carpeta
con su archivo, sus errores y sus tests. `shared/` agrupa por alcance (dominio
compartido), `value-objects/` por categoría, la carpeta del concepto por
significado.

**Por qué**: `shared/` deja claro que es dominio compartido y tiene lugar para
otras cosas compartidas (errores transversales, tipos), no solo VOs. Agrupar
por categoría adentro (`value-objects/`) evita el cajón de sastre. Un VO propio
de una sola entidad NO va acá: vive dentro de la carpeta de esa entidad.

**Qué descartamos**: `value-objects/` en la raíz del dominio (agrupa solo por
tipo técnico, sin lugar para otro compartido que no sea VO), y poner los VO
transversales a la altura de las entidades (no son de ninguna).

---

## 2026-05-21 · Nomenclatura de archivos: `<concepto>.<rol>.ts`

**Qué decidimos**: los archivos de dominio siguen el patrón
`<concepto>.<rol>.ts`, con el rol en inglés (plomería):

- Entidad o value object principal: sin sufijo de rol (`persona.ts`,
  `email.ts`).
- Errores: `<concepto>.errors.ts` (`persona.errors.ts`, `email.errors.ts`).
- Tests: `<concepto>.test.ts` (ya en uso).

El prefijo del concepto se repite aunque el archivo viva en una carpeta del
mismo nombre (`persona/persona.errors.ts`), asumiendo la redundancia a
propósito.

**Por qué**: el prefijo hace el archivo inequívoco en la pestaña del editor,
en el buscador rápido (Cmd+P) y en búsquedas: un `errors.ts` pelado no se
distingue de otros cinco abiertos, `persona.errors.ts` sí. La encontrabilidad
diaria pesa más que la redundancia estética. `errors`/`test` van en inglés
porque son roles técnicos (plomería), no negocio. El archivo principal queda
sin sufijo porque no necesita desambiguar su rol.

**Qué descartamos**: `errors.ts` sin prefijo (ambiguo entre archivos del mismo
nombre), `errores` en español (es rol técnico, no negocio), y sufijo de rol
en el archivo principal (`persona.entity.ts`: más verboso sin beneficio).

---

## 2026-05-22 · Estructura y forma de la capa de aplicación

**Qué decidimos**:

- **Método demand-driven**: en `application` los puertos nacen cuando un caso
  de uso los necesita; no se cataloga por adelantado. La firma de cada puerto
  la dicta el caso que lo consume.
- **Estructura**: `packages/application/src/` con `use-cases/` y `ports/`
  hermanos, planos (por concepto, sin agrupar por feature), espejando dominio.
- **Idioma**: carpetas de capa en inglés (`use-cases`, `ports`) por ser
  vocabulario de arquitectura; el concepto de cada caso en español
  (`iniciar-sesion`) por ser acción de negocio. Misma regla genérico-vs-dominio.
- **Caso de uso = función**, no clase.
- **Firma `(deps, input)`**: `deps` = objeto de dependencias (puertos), `input`
  = datos de la llamada. Dos argumentos separados. `deps` en inglés (plomería).
- **`ports/` es propiedad de `application`**, no de `infrastructure`: la
  interfaz vive acá e infra la implementa (inversión de dependencias).

**Por qué**:

- Demand-driven evita adivinar firmas en el vacío y mete YAGNI; el puerto se
  define por la necesidad real del caso que lo usa.
- Plano por concepto mantiene coherencia con dominio; agrupar por feature hoy
  sería una carpeta `auth/` vacía con un solo grupo.
- Función encaja con dominio (todo funciones puras con deps inyectadas) y evita
  la ceremonia de un contenedor de DI que no existe.
- `(deps, input)` separa el cableado (puertos, estables en producción) de los
  datos de la invocación (cambian en cada llamada). Se lee en la firma qué es
  infraestructura y qué es payload, y el test queda obvio.

**Qué descartamos**:

- Catálogo de puertos primero (lleva a adivinar firmas y YAGNI).
- Agrupar por feature en application hoy (agrupación vacía).
- Clase con constructor (sirve con contenedor DI; sin él es ceremonia).
- Parámetros sueltos (no escalan, mezclan puertos con datos), todo en un objeto
  (mezcla cableado con datos), y currying (capa mental sin pago; reinventa el
  constructor ya descartado).
- Nombrar `deps` como `ports`: se prefirió `deps` por generalidad (aguanta
  inyectar a futuro algo que no sea un puerto).

---

## 2026-05-22 · Set de roles cerrado en el patrón `<concepto>.<rol>.ts`

**Qué decidimos**: el set de roles-de-archivo del patrón `<concepto>.<rol>.ts`
es **cerrado y documentado**. Roles iniciales:

- (sin sufijo) — entidad / value object / concepto principal (`persona.ts`,
  `rol.ts`, `hasher.ts`).
- `errors` — errores tipados.
- `test` — tests.
- `repository` — puerto de repositorio (`usuario.repository.ts`).

Reglas:

- Un rol nuevo se agrega SOLO con decisión registrada (misma regla de promoción
  que los errores), nunca por inercia.
- `repository` lleva sufijo porque nombra una familia/categoría reconocible de
  puerto. Los puertos **no-repositorio** van **sin sufijo**, como concepto
  (`hasher.ts`, `id-generator.ts`): la carpeta `ports/` ya marca que son puertos.
- `port` queda **explícitamente descartado** como rol.

**Por qué**: el set cerrado mantiene el patrón legible (roles que se reúsan, no
una palabra libre por archivo). `repository` aporta info que la carpeta no da
(qué clase de puerto es); `port` no, sería redundante con la carpeta `ports/`.
Esto se distingue del prefijo de concepto (`persona/persona.errors.ts`), que sí
es redundancia útil para encontrabilidad en Cmd+P; la redundancia de rol no
ayuda a encontrar nada.

**Qué descartamos**: set abierto (cada quien acuña roles → patrón ilegible),
`port` como rol (redundante con la carpeta), y sufijar todos los puertos por
uniformidad (no aporta).

Extiende la decisión "Nomenclatura de archivos: `<concepto>.<rol>.ts`" del
2026-05-21, fijando el conjunto cerrado de roles.

---

## 2026-05-22 · Manejo de resultados y errores en casos de uso (Result vs throw)

**Qué decidimos**:

- Los casos de uso de `application` comunican sus finales con un **Result
  tipado**, no con excepciones, para los **errores de negocio**.
- Forma del Result: union discriminado definido a mano en
  `packages/application/src/shared/result.ts`:
  `type Result<T, E> = { ok: true; value: T } | { ok: false; error: E }`,
  con helpers `ok(value)` y `err(error)`. Sin librería (neverthrow, fp-ts,
  Effect).
- Los errores de negocio viajan en el lado `E` como tipos discriminados
  (`{ kind: '...' }`), coherente con la decisión de errores del dominio.
- **Corte mecánico Result vs throw**: si es un final que el caso de uso
  **decide** (credenciales inválidas, email inválido, invitación expirada) →
  Result. Si es una **falla** que reventó por debajo y nadie eligió (DB caída,
  bug, invariante de dominio rota) → excepción.
- Las excepciones (fallas técnicas) las absorbe un error boundary genérico en
  web, no se manejan caso por caso. Los finales de negocio (Result) se manejan
  explícitamente en cada Server Action, y el compilador obliga a contemplarlos.
- **Clasificación de email inválido**: un email malformado es **error de
  validación**, NO se disfraza de "credenciales inválidas". La regla
  anti-enumeración aplica a *qué usuarios existen*, no a *si el input está bien
  formado*: un email sintácticamente inválido no puede corresponder a ninguna
  cuenta, así que informarlo no filtra usuarios registrados.

**Por qué**:

- La firma del caso declara la verdad: `Result<DTO, E>` lista los finales
  posibles; el caller los ve y el compilador lo obliga a manejarlos. Una firma
  que solo lanza (`Promise<DTO>`) calla sus errores y deja olvidarse de
  catchearlos hasta runtime.
- Si se agrega un error nuevo al caso, la firma cambia y todos los callers
  dejan de compilar hasta manejarlo: el compilador hace la lista de lo que hay
  que actualizar en la UI. Es la misma filosofía de `strict` /
  `noUncheckedIndexedAccess` aplicada al control de flujo.
- Los errores de negocio no son excepcionales: "credenciales inválidas" es un
  resultado esperado y frecuente de un login. Modelarlo como valor (Result) y
  no como excepción es más fiel a lo que pasa.
- A esta escala (Server Action → un caso → repos) no hay anidamiento profundo,
  así que el costo de ergonomía del Result (desenvolver `if (ok)`) es bajo y el
  beneficio (firma honesta, compilador que cubre) es alto.
- Result a mano son ~10 líneas: escribirlo enseña el patrón en vez de importar
  magia (objetivo de aprendizaje), y respeta "no agregar dependencias sin
  decidirlo".

**Qué descartamos**:

- Excepciones (throw) para errores de negocio: la firma no los declara, el
  caller no sabe qué catchear sin leer el cuerpo, y el `catch` tipa el error
  como `unknown`. Se reservan para fallas técnicas inesperadas.
- Librerías de Result/FP (fp-ts, Effect): traen un universo (pipe, TaskEither,
  typeclasses) con curva enorme para algo trivial. neverthrow: más liviano pero
  igual es dependencia para ~10 líneas.
- Disfrazar el email malformado como "credenciales inválidas": no aporta a
  anti-enumeración (un email inválido nunca es una cuenta) y empeora la UX.

Nota: el dominio sigue usando excepciones para invariantes rotas (ej.
`Usuario.crear` lanza `UsuarioSinPersonaError`); eso es coherente con el corte
(una invariante rota es un bug, no una decisión de negocio).

---

## 2026-05-22 · Organización por feature en application y entities/ en domain

**Qué decidimos**:

- **`application` se organiza por feature**, no plano. Cada feature es una
  carpeta bajo `src/` con sus subcarpetas:
  `application/src/auth/{use-cases, ports, entities}`. A futuro,
  `application/src/client/{...}`, etc. Lo transversal del paquete vive en
  `application/src/shared/` (ej. `result.ts`).
- **`domain` agrupa todo bajo categorías** al mismo nivel de `src/`, sin
  conceptos sueltos: `domain/src/entities/{persona, usuario}` y
  `domain/src/shared/{value-objects, errors}`.

**Por qué**:

- En application, la feature `auth` ya no es una agrupación vacía: contiene
  entidad (`Sesion`), casos de uso y puertos. Agrupar por feature mantiene junto
  todo lo de un mismo contexto y escala a `client`, `vehiculos`, etc. sin
  mezclar.
- En domain, tener `persona/` y `usuario/` (conceptos sueltos) conviviendo con
  `shared/` (una agrupación) al mismo nivel era inconsistente: se mezclaba
  "concepto individual" con "grupo". Subir las entidades a `entities/` deja todo
  el nivel `src/` como agrupaciones homogéneas; si mañana aparece otra categoría
  (`services/`, `policies/`), convive al mismo nivel sin romper el criterio.

**Qué descartamos**:

- Mantener application plano (`use-cases/` y `ports/` hermanos sin feature): se
  abandona ahora que `auth` tiene contenido real más allá de casos de uso.
- Dejar domain con entidades sueltas al lado de `shared/`: inconsistencia de
  niveles (concepto vs. agrupación conviviendo).

Se asume la asimetría de que `entities/` agrupa por tipo y `shared/` por alcance
(transversal): es inofensiva y se prefiere antes que perseguir simetría perfecta.

Modifica la decisión "2026-05-22 · Estructura y forma de la capa de aplicación"
(que definía application plano, sin agrupar por feature). El resto de esa
decisión (use-cases/ports como conceptos, idioma, función `(deps, input)`,
ports propiedad de application) sigue vigente; solo cambia que ahora viven
dentro de cada feature.

---

## 2026-05-22 · Sesion como entidad de application

**Qué decidimos**:

- `Sesion` es una **entidad de application**, no de domain. Vive en
  `application/src/auth/entities/`. La **tabla** `sesion` (schema Drizzle) vive
  en `infrastructure`, como toda persistencia.
- `Sesion` tiene reglas propias que se aplican **dentro de su factory**
  (`Sesion.crear`), no en el caso de uso ni en infra: la política de expiración
  (creado + 7 días) y `usuarioRealId = usuarioId` al nacer (sin masquerade).
- Los **efectos** (id, token, hora actual) NO se generan dentro de `Sesion.crear`:
  entran ya resueltos desde afuera, inyectados por el caso de uso vía puertos.
  Mismo patrón que las entidades de domain (id/fechas/VOs inyectados).

**Por qué**:

- Una sesión es mecanismo de autenticación, no un concepto del taller (no pasa
  el test "¿lo entendería alguien del taller?"), así que no va en domain. Pero
  tiene reglas reales (duración, real=user) que deben vivir en el núcleo
  (application), no derramadas en el caso de uso ni en un adapter de infra.
- Tener tabla no obliga a estar en domain: tabla (infra) y entidad (application)
  son piezas distintas en capas distintas, igual que `Persona` (entidad en
  domain) y su tabla (schema en infra).
- Separar reglas (adentro de `Sesion.crear`) de efectos (inyectados) mantiene la
  entidad pura y testeable: en un test se le pasan id/token/hora fijos y se
  verifica la regla de expiración sin tocar reloj real ni aleatoriedad.
- El caso de uso no debe conocer la "receta" interna de una sesión (cuántos
  días, real=user): solo provee los efectos y pide crearla.

**Qué descartamos**:

- `Sesion` en domain (uniformidad con Persona/Usuario): se priorizó mantener el
  núcleo de dominio limpio de conceptos de auth.
- Un servicio (`SesionService`/`SesionMaker`) que arme la sesión: si solo
  envuelve `Sesion.crear`, es indirección sin pago; el caso de uso llama directo
  a la factory. (Un servicio se justificaría si agrupara lógica real, no por
  envolver una llamada.)
- Generar token/hora/id dentro de `Sesion.crear`: rompería la pureza y haría la
  entidad no testeable; además mete efectos en lógica de reglas.
- Aplicar las reglas (7 días) en infra: pondría política de negocio en un
  adapter.

Quedan pendientes para la implementación del login: los puertos de efectos
(`Reloj`, `IdGenerator`, generador de token), el puerto de persistencia de
sesión, qué devuelve el caso, y si el token se guarda plano o hasheado.

---

## 2026-05-22 · Path aliases `@/*` por paquete; imports relativos prohibidos

**Qué decidimos**:

- Cada paquete declara en su `tsconfig.json` el alias `@/*` apuntando a `./src/*`
  (sin `baseUrl`: en TS moderno los `paths` se resuelven relativos al tsconfig,
  y `baseUrl` está deprecado para TS 7).
- **Cero imports relativos** dentro de un paquete. Todo import intra-paquete
  arranca con `@/...`, incluso vecinos del mismo directorio
  (`persona.ts` importa `@/entities/persona/persona.errors`, no
  `./persona.errors`).
- **Cross-paquete sigue por scope `@taller/*`** vía el barrel (sin cambios:
  `@taller/domain`, `@taller/application`, `@taller/infrastructure`). El alias
  `@/*` es estrictamente intra-paquete.
- Cableado:
  - **TypeScript**: `paths` en el `tsconfig.json` de cada paquete y de
    `apps/web`.
  - **Vitest**: `resolve.alias` en cada `vitest.config.ts`, resuelto con
    `fileURLToPath(new URL('./src', import.meta.url))`. Sin dependencias nuevas
    (no `vite-tsconfig-paths`).
  - **ESLint**: el resolver `eslint-import-resolver-typescript` que ya estaba
    configurado lee los `paths` del tsconfig automáticamente; no requiere
    cambios.

**Por qué**:

- Imports con `../../shared/...` se vuelven frágiles ante movimientos de
  archivos: mover una entidad un nivel arriba o abajo cambia la cantidad de
  `..` en cada import. Con alias absoluto, mover un archivo no toca sus
  imports.
- Regla mecánica y enforceable: si un import empieza con `.`, está mal. Es más
  fácil de revisar y de auditar con un grep que "depende de cuántos niveles
  cruza".
- `@/*` por paquete (no un alias global del monorepo) preserva el límite
  hexagonal: dentro de domain, `@/entities/...` es claramente domain; no se
  confunde con código de otra capa. El cruce de capa sigue siendo explícito vía
  `@taller/*`.
- Quitar `baseUrl` evita la deprecation warning de TS 7 sin perder
  funcionalidad: los `paths` solos alcanzan con TS moderno.
- Configurar Vitest con `resolve.alias` a mano (vs. `vite-tsconfig-paths`)
  evita una dependencia nueva para algo que son 4 líneas; respeta "no agregar
  dependencias sin decidirlo".

**Qué descartamos**:

- Imports relativos para vecinos del mismo directorio (`./persona.errors`): la
  regla "permitir hermanos, prohibir `../`" es más sutil y se cumple mal. La
  regla "ninguno empieza con `.`" es trivial de hacer cumplir.
- Subpath del scope (`@taller/domain/entities/persona/...`) para imports
  intra-paquete: cada movimiento de archivos obligaría a tocar el campo
  `exports` del `package.json` del paquete, y los imports a vecinos quedarían
  desproporcionadamente largos.
- `vite-tsconfig-paths` como dependencia: cuatro líneas de `resolve.alias`
  manual hacen lo mismo sin sumar peso.
- Dejar `baseUrl: "."` para silenciar la deprecation con `ignoreDeprecations`:
  esconder un aviso que TS 7 va a remover no es solución.

---

## 2026-05-22 · Puertos de iniciarSesion: lista y ubicación

**Qué decidimos**:

El caso de uso `iniciarSesion` consume estos puertos:

- `UsuarioRepository` — buscar usuario por email (`findByEmail`).
- `Hasher` — verificar password contra el hash.
- `TokenGenerator` — generar el token aleatorio de sesión.
- `SesionRepository` — persistir la sesión.
- `Reloj` — proveer la hora actual (efecto inyectado a `Sesion.crear`).
- `IdGenerator` — generar el id de la sesión (efecto inyectado).

Ubicación:

- `application/src/shared/ports/`: `Reloj` e `IdGenerator`.
- `application/src/auth/ports/`: `UsuarioRepository`, `Hasher`,
  `TokenGenerator`, `SesionRepository`.

`Reloj` e `IdGenerator` se ubican en `shared/` **anticipadamente**, con un
solo consumidor (auth), rompiendo a propósito la regla de promoción normal
(la de errores de dominio, 2026-05-21). El resto de los puertos nacen en
`auth/ports/` y siguen la regla de promoción: se mueven a `shared/` cuando
aparezca un segundo consumidor real.

**Por qué**:

- `Reloj` e `IdGenerator` son plomería pura (sin negocio) y la probabilidad
  de que sean transversales a futuro (cualquier feature que cree entidades
  con timestamps o ids los va a querer) es alta. Se prioriza no tener que
  moverlos en dos semanas por sobre la pureza de la regla de promoción. Es
  una excepción consciente, no un olvido.
- `TokenGenerator` se mantiene en `auth/` pese a ser plomería: un generador
  de tokens de sesión huele a autenticación, no es tan obviamente
  transversal como un reloj o un generador de ids.
- El costo de equivocarse en la anticipación es bajo: con los path aliases
  `@/*` (2026-05-22) mover un puerto es mecánico y el compilador marca cada
  import roto.

**Qué descartamos**:

- Arrancar `Reloj` e `IdGenerator` en `auth/ports/` y aplicarles la regla de
  promoción como a los demás: defendible (no anticipar, aprender al mover),
  pero se prefirió pagar el costo de la anticipación para no re-tocarlos.
- Mandar `TokenGenerator` también a `shared/`: se juzgó específico de auth.

---

## 2026-05-22 · Firmas de los puertos de iniciarSesion

Cierra las firmas concretas de los puertos listados en la entrada
"Puertos de iniciarSesion: lista y ubicación" del mismo día.

**Qué decidimos**:

Firmas finales de los seis puertos:

`shared/ports/`:
- `Clock` → `now(): Date`
- `IdGenerator` → `generate(): string` (contrato: produce UUID v7)

`auth/ports/`:
- `UsuarioRepository` → `findByEmail(email: Email): Promise<Usuario | null>`
- `Hasher` → `verify(password: string, hash: string): Promise<boolean>`
- `TokenGenerator` → `generate(): string` (contrato: token criptográficamente
  aleatorio de alta entropía)
- `TokenHasher` → `hash(token: string): string` (síncrono)
- `SesionRepository` → `save(sesion: Sesion): Promise<void>`

Cambios respecto de la entrada previa de puertos:

- **Aparece `TokenHasher` como sexto puerto.** Es consecuencia de guardar el
  token de sesión hasheado (no plano) en la DB: alguien tiene que calcular el
  hash, y ese efecto necesita su puerto. Se modeló como puerto dedicado
  (no se metió el hasheo dentro de `SesionRepository` ni de `TokenGenerator`).
- **`Reloj` se renombra a `Clock`.** El puerto antes listado como `Reloj` pasa
  a llamarse `Clock`, para que sustantivo y método estén en el mismo idioma
  (inglés), aplicando la regla genérico-vs-dominio a rajatabla sobre plomería.

Decisiones finas de las firmas:

- `findByEmail` recibe el value object `Email`, no `string`: obliga a que el
  caso de uso valide el email (construya el VO) antes de llegar al repo.
- `Hasher.verify` es `Promise` (bcrypt es async) y devuelve `boolean`
  (coincide o no). Solo expone `verify`; `hash` se sumará cuando un caso de uso
  que cree/cambie password (ej. `AceptarInvitacion`) lo necesite (demand-driven).
- `TokenHasher.hash` es síncrono (sha256 es rápido, no hay razón para async) y
  no tiene `verify`: la validación por request es "hashear y buscar el hash en
  la DB", no comparar dos hashes. No expone `verify`.
- `IdGenerator` y `TokenGenerator` tienen la misma firma (`generate(): string`)
  pero son puertos distintos a propósito: el `id` puede ser predecible/ordenable
  (UUID v7, bueno para el índice del B-tree), el `token` debe ser impredecible
  (es la credencial). Firma igual, contrato de seguridad opuesto.
- `SesionRepository` hoy solo tiene `save`; el método de buscar-por-hash-de-token
  (validación por request) se sumará cuando se implemente esa validación
  (demand-driven).
- `save` recibe la entidad `Sesion`, que lleva el token **hasheado** adentro
  (nunca el plano). El plano vive solo como variable efímera del caso de uso
  (es lo que se devuelve para la cookie). El repo no hashea: persiste lo que le
  dan (plomería pura).

**Por qué**:

- Token hasheado en DB: si se filtra la base, el hash no sirve para secuestrar
  sesiones (mismo razonamiento que no guardar passwords en plano). El token es
  alta entropía, así que alcanza sha256 (rápido), no hace falta bcrypt.
- `Clock` en inglés completo: `Reloj.now()` era un híbrido (sustantivo español,
  método inglés) que dejaba el criterio de idioma ambiguo para los próximos
  puertos. Inglés entero es fiel a la regla genérico-vs-dominio (un reloj es
  plomería, no negocio del taller).
- Puertos separados con firma igual (`IdGenerator`/`TokenGenerator`): firma
  igual no es propósito igual. Fusionarlos en un `StringGenerator` borraría la
  distinción de seguridad (predecible vs impredecible), que es justo la que no
  se quiere perder.
- `Email` como tipo de `findByEmail`: el tipo fuerte empuja la validación al
  borde correcto (antes del repo), no adentro de la persistencia.

**Qué descartamos**:

- Hashear el token dentro de `SesionRepository.save` (recibiendo el plano): el
  repo tomaría una decisión de seguridad y dejaría de ser plomería; además
  esconde el hasheo donde no es obvio.
- Hashear dentro de `TokenGenerator` (que devuelva `{ plano, hasheado }`):
  acopla generar-aleatoriedad con hashear; se prefirió un puerto por efecto.
- `Sesion` con el token plano adentro (o con plano + hash): el plano nunca debe
  persistirse; tenerlo en la entidad aumenta el riesgo de loguearlo o guardarlo
  por accidente. La entidad lleva solo el hash.
- Anticipar `Hasher.hash`: a diferencia de mover un puerto de carpeta, sumar un
  método después no tiene costo de refactor, así que no hay razón para
  adelantarlo.

---

## 2026-05-22 · Firma de Sesion.crear

Cierra la forma concreta de la factory de la entidad `Sesion`, continuando la
entrada "Sesion como entidad de application" del mismo día (que definió que
`Sesion` vive en application, con reglas en la factory y efectos inyectados).

**Qué decidimos**:

Firma de la factory:

`Sesion.crear({ id, tokenHash, usuarioId, creadoEn })` → devuelve `Sesion`.

- **Recibe** (un solo objeto de props; efectos ya resueltos por el caso de uso):
  - `id: string`
  - `tokenHash: string` (el hash del token; el plano nunca entra a la entidad)
  - `usuarioId: string`
  - `creadoEn: Date`
- **Deriva por sus reglas** dentro de `crear` (no se reciben):
  - `usuarioRealId = usuarioId` (sin masquerade al nacer)
  - `expiraEn = creadoEn + 7 días`
  - `actualizadoEn = creadoEn` (= creadoEn al nacer)
- **Estado expuesto**, todo `readonly` público (mismo patrón que `Persona` y
  `Usuario`): `id`, `tokenHash`, `usuarioId`, `usuarioRealId`, `creadoEn`,
  `actualizadoEn`, `expiraEn`.
- `crear` devuelve la instancia de `Sesion`; el caso de uso saca de ahí lo que
  necesita (el `tokenHash` para el `save`, el `expiraEn` para el Result).

Decisiones finas:

- **Objeto único, no argumentos sueltos.** `id`, `tokenHash` y `usuarioId` son
  los tres `string`: pasarlos posicionales permite cruzarlos sin que el
  compilador avise. Nombrarlos en el call site (`{ id, tokenHash, usuarioId }`)
  previene el cruce.
- **`creadoEn: Date`, no `ahora` ni `clock: Clock`.** La entidad recibe la fecha
  ya resuelta y nombrada por su rol (`creadoEn`), coherente con cómo `Persona` y
  `Usuario` reciben `creadoEn`. El caso de uso sigue obteniéndola con
  `clock.now()` y se la pasa; a la entidad no le importa el origen, le importa
  que es su fecha de creación. Pasar el puerto `Clock` a la entidad la acoplaría
  a infraestructura y rompería su pureza/testeabilidad; pasar un `ahora`
  genérico era incoherente con el resto del dominio.
- **`expiraEn` y `actualizadoEn` derivados de `creadoEn`** (no de un instante
  aparte): la sesión expira 7 días después de su creación, y al nacer su última
  actualización es su creación. Más claro y coherente que derivarlos de un
  genérico "ahora".
- **`usuarioId: string` (no un tipo fuerte tipo `UsuarioId`).** Coherencia con
  el dominio: `Persona` y `Usuario` usan `string` pelado para sus ids. Un id
  tipado solo para `Sesion` sería un único id tipado rodeado de strings. Ids
  tipados (branded types/VOs) serían una decisión de sistema entero, no un
  parche por entidad. La protección contra el cruce la da el objeto en el call
  site.
- **`actualizadoEn` incluido** por el Nivel 1 de auditoría (decisión de
  timestamps: `creadoEn` + `actualizadoEn` no negociable en toda entidad).

**Por qué**:

- Objeto de props para una factory con varios primitivos del mismo tipo es el
  patrón que da legibilidad en el call site y evita el cruce silencioso de
  argumentos.
- Recibir `creadoEn` (no `ahora`) alinea `Sesion` con `Persona` y `Usuario`:
  todas las entidades reciben su fecha de creación nombrada igual. Evita que
  cada entidad invente su propia convención para la misma cosa.
- Mantener la entidad sin conocer puertos preserva la frontera: el caso de uso
  vive en el mundo de los efectos (tiene e invoca los puertos), la entidad vive
  en el mundo de las reglas puras (recibe resultados, decide). `expiraEn =
  creadoEn + 7 días` es una regla sobre un dato, no sobre un puerto.
- `readonly` es coherente con el resto del dominio y expresa que una sesión no
  cambia tras crearse (con la salvedad de la renovación, ver pendiente).

**Qué descartamos**:

- Argumentos sueltos posicionales: colisión de tipos entre los tres `string`.
- Recibir `ahora` en vez de `creadoEn`: incoherente con `Persona`/`Usuario`,
  que reciben `creadoEn`.
- Pasar `clock: Clock` a la entidad: acopla la entidad a un puerto, rompe la
  pureza y contradice "efectos resueltos desde afuera".
- `UsuarioId` tipado solo para esta entidad: incoherente con los ids `string`
  del resto del dominio.

**Pendiente (no se decide ahora)**: el patrón de **renovación rodante** de la
sesión (la fecha de expiración se renueva con uso, decisión de sesiones
server-side rodantes) implica mutar `expiraEn` y `actualizadoEn`, lo que tensiona
el `readonly`. Las dos opciones —renovación inmutable (crear instancia nueva,
todo sigue `readonly`) vs. mutar esos dos campos (método `renovar`)— se evalúan
cuando se implemente la validación por request (punto 5 del roadmap), con el caso
de uso de renovación delante. Hoy: todo `readonly`.

---

## 2026-05-22 · Excepción: imports relativos permitidos en barrels de paquete

Precisa la decisión "Path aliases @/* por paquete; imports relativos prohibidos"
del mismo día.

**Qué decidimos**: los barrels de paquete (`index.ts` que reexporta el API
público del paquete) pueden usar imports relativos (`./...`). El resto del
código mantiene cero relativos: todo import intra-paquete sigue usando `@/...`.

**Por qué**: el alias `@/*` está definido por paquete (cada uno apunta a su
propio `src/`). Cuando un paquete consume a otro vía su barrel (ej. application
lee `domain/src/index.ts`), TypeScript resuelve los `@/` de ese barrel con los
`paths` del paquete consumidor, no del consumido — el `@/` de domain se lee con
el diccionario de application y no resuelve. Un import relativo en el barrel no
depende de ningún `paths`, así que se resuelve correctamente lo lea quien lo
lea. La excepción es chica y auditable: aplica solo a los `index.ts` de paquete
(hoy 2), no a la lógica.

**Qué descartamos**:
- Project references (composite + references): la solución de fondo, pero es
  trabajo de infra no trivial; se difiere. Queda como mejora futura si el
  cableado entre paquetes se complica.
- Subpath exports con auto-referencia del barrel (`@taller/domain/...` vía
  wildcard en package.json): funciona pero mete un patrón opaco difícil de
  entender después.
- Renombrar el alias por paquete (`@d/*`, `@a/*`): elimina la colisión pero
  obliga a tocar todos los imports del repo; desproporcionado.

**Pendiente**: si el monorepo crece y la resolución cross-paquete se vuelve
problemática en más lugares, evaluar project references (D3) como solución de
fondo que vuelve innecesaria esta excepción.

---

## 2026-05-22 · Modelo de errores por capas: no throw para esperables

Reemplaza el corte de "2026-05-22 · Manejo de resultados y errores en casos de
uso (Result vs throw)" en su parte de dominio: el dominio ya no lanza para
errores esperables.

**Qué decidimos**:

- **Dominio / application**: no lanzan para errores esperables; devuelven
  `Result` con errores conocidos (tipos discriminados `{ kind }` con payload).
  Las factories (`Email.crear`, `Persona.crear`, `PasswordHash.crear`,
  `Usuario.crear`) devuelven `Result`, nunca lanzan.
- **Infraestructura**: puede lanzar; se captura y traduce a error técnico, o se
  deja subir.
- **Borde (Server Action/API)**: convierte `Result` a respuesta; error boundary
  global captura lo inesperado.

Cambios concretos:
- Los 5 errores (`EmailInvalido`, `NombreVacio`, `NombreMuyLargo`,
  `PasswordHashVacio`, `UsuarioSinPersona`) pasan de clases `Error` a tipos
  discriminados con payload. Se eliminan las clases `*Error`.
- `Result` se mueve a domain (ver entrada de Result/barrels); las factories de
  dominio lo devuelven.

**Por qué**:
- Sistema chico (5 errores, pocos call sites): unificar ahora cuesta poco y el
  costo solo crecería.
- Una regla mecánica por capa ("dominio no lanza") evita clasificar error por
  error si es bug o esperable.
- Errores como valor (Result) hacen que la firma declare los finales y el
  compilador obligue a manejarlos.

**Qué descartamos**:
- Mantener throw para invariantes de entidad (la convención dual anterior).
- Clasificar caso por caso bug-vs-esperable: se prefirió regla pareja por capa.

Las excepciones quedan para fallas técnicas de infra y lo inesperado, no para
finales de dominio.

---

## 2026-05-22 · Domain usa imports relativos en todo su código (provisorio)

> **Reemplazada el 2026-05-25** por [Alias único por paquete (X3)](#2026-05-25--alias-único-por-paquete-x3-resolución-cross-paquete-en-typecheck-y-vitest).
> Domain volvió a usar alias (`@domain/*`), aplicando la regla "cero
> relativos" sin excepciones. La entrada se conserva como contexto histórico.

Amplía y supera la entrada "Excepción: imports relativos permitidos en barrels
de paquete" del mismo día. La excepción no era suficiente: el problema del
alias `@/*` colisionando se extiende a **todos** los archivos de domain que se
leen transitivamente desde otro paquete, no solo al barrel.

**Qué decidimos**:

- `packages/domain` usa imports **relativos** (`./...`, `../...`) en todo su
  código fuente: barrels, entidades, value objects, errors, tests.
- El alias `@/*` se elimina del `tsconfig.json` y del `vitest.config.ts` de
  domain (queda config muerta si no se borra).
- `packages/application` y `apps/web` siguen con `@/*` y "cero relativos".
  La regla "cero relativos" pasa a ser por paquete según su rol: paquetes
  consumidos como librería (hoy domain) usan relativos; paquetes "hoja" siguen
  con el alias.
- **Esta decisión es provisoria**. La solución de fondo es project references
  o un plugin de paths cross-package en vitest. Cuando se haga, domain vuelve
  a `@/*`.

**Por qué**:

- Con `moduleResolution: "Bundler"` y sin project references, cuando un paquete
  (ej. application) consume archivos de otro (domain) vía su barrel,
  TypeScript y vitest resuelven los `paths` del archivo leído usando la config
  del **proyecto consumidor**, no del consumido. Los dos paquetes tienen
  `"@/*": ["./src/*"]`, así que un `import '@/shared/result/result'` dentro de
  `domain/src/email.ts` se resuelve contra `application/src/...` cuando es
  application quien lo lee — y no existe ahí.
- La excepción "solo barrels" parecía suficiente cuando el barrel solo
  reexportaba un archivo sin aliases (Result). En cuanto el barrel expuso
  entidades (Email, Persona, Usuario), las cadenas internas de imports con
  `@/` empezaron a romperse desde afuera. La fix tiene que cubrir todo
  archivo alcanzable, no solo la primera capa.
- Relativos en domain resuelven igual lo lea quien lo lea: no dependen de
  ningún `paths`. Costo: menos uniforme estéticamente; legible igual porque
  domain es chico.

**Qué descartamos**:

- Project references (`composite: true` + `references`) ahora: solo arregla
  `tsc`. Vitest sigue leyendo source y choca con la misma colisión, así que
  hay que sumar también `vite-tsconfig-paths` (rechazado en la entrada
  "Path aliases @/* por paquete"). Combinar las dos cosas es la solución de
  fondo, pero es trabajo de infra y revisión de decisión anterior. Se difiere.
- Renombrar el alias por paquete (`@d/*`, `@a/*`): elimina la colisión sin
  infra nueva, pero obliga a tocar todos los imports del repo y deja una capa
  de cognición extra ("¿qué `@` me toca acá?"). Más caro que relativos en
  domain solo.
- Mantener la excepción "solo barrels" y agregar relativos también en cada
  archivo que el barrel toque transitivamente: termina siendo lo mismo que
  esta decisión pero contado de forma confusa.

**Pendiente**: cuando el monorepo crezca o el roce de leer relativos en
domain moleste, evaluar project references + `vite-tsconfig-paths` (o
equivalente) como solución de fondo y volver domain a `@/*`.

---

## 2026-05-25 · Alias único por paquete (X3): resolución cross-paquete en typecheck y Vitest

Reemplaza la decisión [Domain usa imports relativos en todo su código
(provisorio)](#2026-05-22--domain-usa-imports-relativos-en-todo-su-código-provisorio)
(la "solución X1"). Resuelve de fondo la colisión de `@/*` entre paquetes
que la motivaba.

**Estado de project references**: a 2026-05-25 el repo NO tiene project
references configuradas (se descartaron antes de X3, decisión registrada
en Fase 0). El typecheck corre `tsc --noEmit` por paquete. Las project
references quedan como mejora futura de tiempos de build incremental — no
son necesarias para resolución de tipos, que X3 ya cubre en `tsc` y
Vitest.

**Qué decidimos**:

- Cada paquete usa un **prefijo de alias único**, apuntando a su `src/*`:
  - `domain` → `@domain/*`
  - `application` → `@app/*`
  - `infrastructure` → `@infra/*`
  - `apps/web` → mantiene `@/*` (convención Next; no hay colisión real
    porque web no se consume desde nadie).
- Cada alias se declara **simétricamente** en el `tsconfig.json`
  (`compilerOptions.paths`) y en el `vitest.config.ts` (`resolve.alias`)
  del paquete que lo posee.
- Cada paquete consumidor declara **además** los alias cross-paquete de lo
  que consume directa o transitivamente, en sus dos configs. Hoy:
  - `application`: `@app/*` propio + `@domain/*` cross-paquete.
  - `infrastructure`: `@infra/*` propio + `@domain/*` + `@app/*`
    cross-paquete (pre-cableados aunque infra todavía no importe nada de
    ellos, para que el primer repositorio real no requiera tocar config).
  - `domain`: solo `@domain/*` (no consume a nadie).
- Domain vuelve a aplicar la regla "cero imports relativos" sin
  excepciones. El barrel y todos los archivos internos usan `@domain/...`.
- Convención de mantenimiento: si un paquete empieza a consumir uno nuevo,
  agregar el alias correspondiente en su `tsconfig.json` y
  `vitest.config.ts`.

**Por qué**:

- La colisión del `@/*` compartido (documentada en X1) aparecía porque
  cuando `application` (consumidor) leía archivos de `domain` (consumido),
  TypeScript y Vitest resolvían los `paths` del archivo leído contra la
  config del **consumidor**, no del consumido. Los dos definían `@/*`
  apuntando a su propio `src/`, así que `@/shared/result/result` dentro de
  domain se resolvía contra `application/src/...` y no existía.
- Con prefijos únicos por paquete no hay colisión: el consumidor declara
  tantos alias distintos como necesite y cada uno apunta al `src/` real
  del paquete correspondiente.
- La solución arregla los **dos frentes** que importan en este monorepo:
  - **`tsc --noEmit`** del consumidor, que typechequea archivos del
    consumido al seguir el grafo de imports.
  - **Vitest** del consumidor, que carga archivos del consumido desde su
    `src/` (porque el `main`/`exports` del consumido apunta a `./src/...`,
    no a `dist/`).
- Un experimento reciente (cambio aparentemente menor en `Email.crear`)
  confirmó que sin la fix, `vitest` rompía con `Cannot find package
  '@/...'` cuando ejecutaba tests de `application` que cargaban
  transitivamente código de `domain` con aliases `@/`. Después de migrar
  a alias únicos, el mismo escenario corre verde sin tocar más config.
- Complementa, pero **no requiere**, project references. Project
  references (D3) optimizan `tsc -b` (builds incrementales por paquete)
  pero no afectan cómo Vitest resuelve módulos, así que por sí solas no
  cierran el problema. Como con X3 Vitest y `tsc --noEmit` ya funcionan,
  project references queda pendiente como mejora de tiempos de build.

**Qué descartamos**:

- **Dejar X1 como permanente** (domain con relativos): rompía la regla
  "cero relativos" en un paquete sí y en otros no, generando un set de
  reglas distinto por rol del paquete. Más pesado de explicar y de
  recordar que un prefijo único.
- **Solo project references**: arregla `tsc -b` pero Vitest sigue
  resolviendo paths con la config del consumidor al leer source. Sin
  tocar también Vitest, el problema persiste. (Y agregar
  `vite-tsconfig-paths` para que Vitest entienda project references era
  precisamente la dep que se había rechazado en la decisión original del
  alias.)
- **Consumir `dist/` en Vitest** (que el `main` de cada paquete apunte a
  `dist/` y el consumidor cargue compilado): elimina la cuestión del
  alias del consumido porque el `.js` final no tiene `paths`, pero rompe
  el dev loop (cada cambio en un paquete consumido obliga a buildear
  antes de que el test del consumidor lo vea). Costoso y propenso a
  desincronización.
- **Mantener `@/*` y forzar al consumidor a redefinirlo apuntando al
  consumido**: imposible — el consumidor también tiene su propio `@/*`
  intra-paquete, los dos chocan en la misma clave.

---

## 2026-05-25 · Modelado de tablas de Etapa 0 (persona, usuario, sesion)

**Qué decidimos**:

Schema de las tres tablas de auth, con estas decisiones de modelado:

- **Persona y Usuario son tablas separadas** (espejando las entidades de
  dominio). `usuario` tiene FK `persona_id` → `persona.id`, con
  `NOT NULL UNIQUE` y `ON DELETE RESTRICT`.
  - `NOT NULL`: traduce la invariante "no puede existir Usuario sin Persona".
  - `UNIQUE`: una Persona tiene a lo sumo un Usuario (cardinalidad 1:0..1 —
    Persona puede existir sin Usuario, pero no al revés). En Etapa 0 toda
    Persona creada tiene Usuario, pero el modelo no es 1:1 estricto.
  - `ON DELETE RESTRICT`: no se puede borrar una Persona con Usuario asociado
    sin resolverlo antes. Un Usuario es una credencial; no se pierde en
    silencio. Coherente con la filosofía de soft-delete de entidades sensibles.

- **Sesion → Usuario es `ON DELETE CASCADE`** (tanto `usuario_id` como
  `usuario_real_id`). Criterio distinto al de Persona↔Usuario a propósito: una
  sesión sin su usuario es estado efímero sin valor (un token apuntando a un
  usuario inexistente es basura), a diferencia de una credencial. Borrar el
  usuario se lleva sus sesiones, que es lo correcto.

- **Email case-insensitive se resuelve en `Email.crear`, no en la DB.** El VO
  ya normaliza (`trim().toLowerCase()`) en su factory, así que en la DB el
  email siempre está en minúscula y un índice único normal sobre `email` da
  unicidad case-insensitive de facto. No se usa `citext` ni `LOWER()` en DB.

Otros detalles del schema: `id` es `uuid` PK sin default de DB (lo provee la
app vía IdGenerator, UUID v7); timestamps `with time zone`; `rol` es enum de
Postgres (`rol_usuario`) espejando los valores del tipo `Rol` del dominio;
índices únicos en `usuario.email` y `sesion.token_hash`.

**Por qué**:

- Tablas separadas: el dominio ya modeló Persona y Usuario como entidades
  distintas (decisión de fase de diseño), y el roadmap (Etapa 1: Cliente +
  Colaborador, que también referencian a Persona) confirma que Persona va a ser
  referenciada por más cosas. Tabla propia no es especulación.
- CASCADE vs RESTRICT según naturaleza del dato: credencial (no perder) vs
  sesión efímera (descartable). El criterio no es uniforme a propósito.
- Email CI en el dominio: evita redundancia (no resolver dos veces lo mismo) y
  no suma la extensión citext; es más fiel a que el dominio define el email
  canónico.

**Qué descartamos**:

- Tabla única `usuario` con campos de persona adentro (Etapa 0 más simple):
  contradice el modelo de entidades separadas y obligaría a extraer Persona en
  Etapa 1.
- `RESTRICT` en sesion→usuario por uniformidad: CASCADE es más natural para
  estado efímero; la uniformidad no aporta acá.
- `citext`/`LOWER()` en DB para email CI: redundante con la normalización del VO.

---

## 2026-05-25 · Testing de integración contra Postgres real

**Qué decidimos**: los tests de integración corren contra una DB Postgres real,
no contra mocks ni una DB en memoria. Andamiaje:

- **DB de test separada (`taller_test`) en el mismo contenedor** del
  `docker-compose.yml` actual (`taller_db`). No se levanta un segundo
  contenedor.
- **Distinción unit vs. integración por sufijo de archivo**:
  `*.integration.test.ts` para integración, `*.test.ts` (sin ese sufijo) para
  unitarios. En `packages/infrastructure/vitest.config.ts` se declaran dos
  *projects* de Vitest: `unit` (excluye el sufijo, sin globalSetup) e
  `integration` (incluye solo el sufijo, con globalSetup y setupFiles). Los
  tests unitarios siguen sin necesitar Postgres ni env vars.
- **Variable de entorno separada** en `.env.test` (con `.env.test.example`
  paralelo, commiteado). Define `DATABASE_URL` apuntando a `taller_test`.
  Tanto `client.ts` como el migrator siguen leyendo `process.env.DATABASE_URL`
  sin condicionales: el entorno lo provee `--env-file` (para los scripts) o el
  parser inline (para Vitest).
- **Carga de `.env.test` para Vitest**: parser mínimo inline en
  `vitest.config.ts` que lee el archivo y rellena `process.env` solo si la
  variable no estaba ya seteada (las vars del shell/CI siempre ganan). Sin
  dependencias nuevas.
- **Creación de la DB de test idempotente** vía
  `pnpm db:test:create` (script `scripts/create-test-db.mjs` en
  infrastructure que usa `pg` para conectarse al admin DB `postgres`, chequea
  `pg_database` y crea solo si no existe).
- **Migraciones contra `taller_test`**:
  - Manual: `pnpm db:migrate:test` (igual que `db:migrate` pero con
    `--env-file=../../.env.test`).
  - Automática en cada corrida: el `globalSetup` de Vitest invoca el
    `migrate()` programático de `drizzle-orm/node-postgres/migrator` (no
    shellea drizzle-kit), resolviendo el path de las migraciones con
    `fileURLToPath` (independiente del cwd).
- **Aislamiento entre tests por truncate**: helper `truncateAll()` que ejecuta
  `TRUNCATE TABLE persona, usuario, sesion RESTART IDENTITY CASCADE`. Cada
  test hace `beforeEach(truncateAll)` en su describe. Sin rollback
  transaccional.
- **Conexión y helpers de test en `@infra/testing/db`**:
  módulo dedicado (`packages/infrastructure/src/testing/db.ts`) que crea su
  propio `Pool` y `DrizzleDb` apuntando a `taller_test`, y exporta `db`,
  `DbTest` y `truncateAll()`. El singleton de
  `src/persistence/drizzle/client.ts` queda intacto, reservado a dev/prod.
  Los tests acceden por import explícito (`import { db, truncateAll } from
  '@infra/testing/db'`); el mismo módulo se registra como `setupFiles` del
  project de integración para fallar rápido si el entorno está mal armado.
- **Fixtures en tests**: se insertan con Drizzle directo (`db.insert(...)`),
  no a través de repos. El test arma el estado; el repo es el SUT.

**Comandos clave** (referencia operativa):

| Comando | Qué hace |
|---|---|
| `pnpm --filter @taller/infrastructure db:test:create` | Crea `taller_test` si no existe (idempotente). |
| `pnpm --filter @taller/infrastructure db:migrate:test` | Aplica las migraciones contra `taller_test` (manual). |
| `pnpm --filter @taller/infrastructure test` | Corre solo el project `unit`. No requiere Postgres. |
| `pnpm --filter @taller/infrastructure test:integration` | Corre el project `integration`: re-migra programáticamente y ejecuta los `*.integration.test.ts`. Requiere `docker compose up -d` previo. |

**Por qué**:

- **Postgres real, no mocks**: la capa de infraestructura existe para hablar
  con la DB; testearla contra un fake confirma poco. Drizzle, los tipos de
  Postgres (timestamps con TZ, enums, FKs) y las queries reales son
  exactamente lo que el test tiene que ejercitar.
- **Unit no requiere Postgres**: regla dura. Los unitarios tienen que correr
  en cualquier checkout sin levantar nada. Por eso *projects* separados y la
  ausencia de `globalSetup` en el project `unit`.
- **Aislamiento por truncate**: simple y suficiente para una suite chica. El
  truncate con `CASCADE` respeta las FKs sin tener que ordenar a mano. Rápido
  porque las tablas están vacías casi siempre.
- **DB separada (no rollback contra `taller_dev`)**: los tests no deben poder
  pisar datos de desarrollo, ni siquiera por accidente en un experimento que
  abortó. Una DB aparte hace ese error imposible.
- **Mismo contenedor**: dos contenedores serían fricción operativa sin
  beneficio (los tests no necesitan otra versión de Postgres ni recursos
  separados).
- **Migrar programáticamente en `globalSetup`**: garantiza que el schema esté
  al día con la última migración del repo en cada corrida, sin obligar a
  recordar correr `db:migrate:test` antes. Como las migraciones de Drizzle son
  idempotentes (lleva tabla `__drizzle_migrations`), el costo es mínimo si
  está al día.
- **Conexión de test aparte del singleton**: `client.ts` tira si no encuentra
  `DATABASE_URL` y eso está bien para producción. Tocarlo para soportar test
  sería filtrar concerns. Un módulo `@infra/testing/db` propio es más claro y
  no se importa nunca desde producción.
- **`.env.test` separado de `.env`**: si `DATABASE_URL_TEST` viviera junto a la
  de dev, un olvido (test runner leyendo `DATABASE_URL` en vez de
  `DATABASE_URL_TEST`) apuntaría tranquilamente a la DB de dev. Con archivos
  separados, el riesgo desaparece: hay un solo `DATABASE_URL` activo por
  proceso.

**Qué descartamos**:

- **Testcontainers** (Postgres efímero por suite): traería una dependencia
  pesada y arranque lento, para resolver un problema que ya está resuelto con
  el docker-compose que se usa para dev. Si en el futuro hay necesidad de
  paralelismo agresivo o tests "hermetic" en CI, se reevalúa.
- **Script de init en `/docker-entrypoint-initdb.d/`** para crear
  `taller_test`: solo corre la primera vez que se inicializa el volumen. Como
  el volumen ya existe en máquinas en uso, hacía falta de todos modos un paso
  manual. Un script `pnpm` idempotente cubre los dos casos (máquina nueva y
  máquina existente) con un solo mecanismo.
- **Rollback transaccional por test** (envolver cada test en una transacción
  y abortarla): es más rápido en suites grandes, pero acopla el código de
  test al lifecycle de transacciones, complica el uso de repos que ya
  manejan su propia transacción, y choca con código que ejerza
  `COMMIT`/`ROLLBACK`. El truncate es trivial de leer y "obviamente correcto"
  — mejor para una suite chica y un proyecto cuyo objetivo es aprender.
- **`NODE_OPTIONS='--env-file=...' vitest`**: Node rechaza `--env-file` dentro
  de `NODE_OPTIONS` por seguridad. No viable.
- **`envDir` + `loadEnv` de Vite**: no llega al `globalSetup` (corre en el
  proceso principal de Vitest, no en workers), y `vite` no es resolvible
  directo desde el paquete (está anidado bajo `vitest`). El parser inline en
  `vitest.config.ts` cumple sin agregar deps.

**Nota menor**: se sumó un bloque mínimo en `eslint.config.mjs` para que los
archivos `**/*.mjs` (el script `create-test-db.mjs`) tengan `process`,
`console` y `URL` como globals readonly. Plomería de lint, no decisión de
fondo.

---

## Pendientes (para no olvidar)

Estas cosas no son decisiones tomadas, son recordatorios de temas a
abordar más adelante. Se resolverán cuando lleguemos a sus etapas.

- **Migración de datos**: portear datos relevantes de la DB vieja
  (MySQL) al nuevo schema (Postgres).
- **CustomFile**: rediseñar el manejo de archivos. El proyecto viejo
  tenía relaciones 1-a-1 separadas por tipo de archivo y estados raros
  (`ErrorAlSubir`, `ListoParaBorrar`). Probable solución: tabla genérica
  con relación polimórfica.
- **Observabilidad**: logs estructurados con trace IDs como mínimo
  (lo barato y útil). Métricas y tracing serios para más adelante.
- **Docker**: levantar Postgres local en Docker. Contenedorizar la app
  cuando haya algo que valga la pena empaquetar.
- **Comparación final**: cuando el nuevo schema esté armado, revisar el
  viejo entidad por entidad para confirmar qué cosas eran de más, mal
  modeladas, o qué rescatamos.
- **Bootstrap del repo**: cuando se cierren las decisiones de fase de Diseño,
  crear estructura de carpetas, lint, format, tests, Drizzle, primera
  migración, este archivo, README mínimo.

---

## Plan de etapas (orden tentativo)

1. **Etapa 0** — Autenticación: Persona + Usuario + login + invitaciones
   - recuperación de password. (Actual)
2. **Etapa 1** — Cliente + Colaborador (las relaciones de Persona).
3. **Etapa 2** — Vehículos.
4. **Etapa 3** — Repuestos + Stock + Proveedores + Órdenes de compra.
5. **Etapa 4** — Mano de obra + Reparaciones de terceros.
6. **Etapa 5** — Presupuestos.
7. **Etapa 6** — Órdenes de reparación.
8. **Etapa 7** — Ventas por mostrador.
9. **Etapa 8** — Pagos (con multi-moneda ARS/USD).
10. **Etapa 9** — Gestión de usuarios (incluye `DesactivarUsuario` y
    `IniciarMasquerade`).
11. **Etapa N** — Reportes, archivos, controles, gastos, etc.

Este orden no es definitivo. Se ajustará al cerrar cada etapa.
