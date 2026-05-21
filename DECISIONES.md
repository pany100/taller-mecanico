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
