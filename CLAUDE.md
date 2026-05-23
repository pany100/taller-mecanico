# CLAUDE.md

Reglas del marco de trabajo para Claude Code. Este archivo se lee al inicio
de cada sesión. Contiene **reglas activas que se obedecen hoy**, no historial.
El porqué de cada regla vive en `DECISIONES.md`.

---

## Qué es este proyecto

Sistema de gestión de taller mecánico. Rewrite de un proyecto anterior
(MySQL + Next.js) que quedó abandonado. El objetivo principal de este
rewrite es **aprender**: el código sale del aprendizaje, no al revés.

---

## Modo de trabajo

- **Nada de vibe coding.** Cada decisión técnica debe poder justificarse
  con palabras. Si algo no está claro, se discute antes de escribirlo.
- **Roles**: el desarrollador es arquitecto y decisor. Claude Code
  implementa dentro de la caja que se definió, no inventa alcance.
- **Tests junto con el código, nunca después.** Si se escribe una función
  de dominio o un caso de uso, su test va en el mismo cambio.
- **Una decisión por vez.** No resolver cinco cosas de golpe ni adelantar
  decisiones que no se pidieron. Mensajes y cambios acotados.
- **No agregar dependencias ni herramientas** sin que se haya decidido.
  Si parece necesaria una, se propone y se espera confirmación.

---

## Dónde está cada cosa

- **`DECISIONES.md`** — bitácora cronológica: qué se decidió y por qué.
  Tiene índice navegable al tope y fecha en cada entrada.
- **`MANUAL-DE-MARCA.md`** — sistema visual y de voz. **Consultarlo
  obligatoriamente para cualquier trabajo de UI** (componentes, pantallas,
  estilos, textos del producto).
- **`CLAUDE.md`** (este archivo) — reglas activas del marco de trabajo.

Antes de implementar algo, revisar si ya hay una decisión registrada que
aplique. No contradecir decisiones existentes; si una parece equivocada,
plantearlo en vez de ignorarla.

---

## Reglas de arquitectura

- Arquitectura **hexagonal**. Estructura: `apps/web` +
  `packages/{domain,application,infrastructure}`.
- **`packages/domain` y `packages/application` no importan nada** de
  Next.js, del ORM, ni de I/O. Son TypeScript puro.
- La infraestructura (`packages/infrastructure`) implementa los puertos
  (interfaces) que define la capa de aplicación.
- Los Server Actions de Next.js son una capa fina: validar input, llamar
  a un caso de uso, devolver resultado. Sin lógica de negocio.
- Las invariantes de dominio se hacen cumplir en el constructor de la
  entidad, no solo en validaciones de formulario.
- **Imports cross-paquete** usan el scope `@taller/*` (ej.
  `import { iniciarSesion } from '@taller/application'`).
- **Imports intra-paquete** dependen del rol del paquete:
  - **Paquetes "hoja" (no se consumen como librería)**: `application` y
    `apps/web` usan el alias `@/*` que apunta a `src/*` del paquete actual
    (configurado en cada `tsconfig.json` y en cada `vitest.config.ts`).
    **Cero imports relativos**: ningún import arranca con `./` ni `../`,
    incluso vecinos del mismo directorio. Si un import empieza con `.`,
    está mal.
  - **Paquetes consumidos como librería**: hoy `domain` usa imports
    **relativos** (`./...`, `../...`) en todo su código (entidades, value
    objects, errors, tests, barrel). El alias `@/*` no se usa en domain.
    Motivo técnico: cuando otro paquete consume archivos de domain, TS y
    vitest resuelven los `paths` del archivo leído con la config del paquete
    consumidor, no del consumido — los dos definen `@/*` y colisiona. Un
    relativo no depende de `paths` y resuelve igual lo lea quien lo lea.
    **Estado provisorio**: la solución de fondo (project references +
    plugin de paths para vitest) está pendiente; cuando se haga, domain
    vuelve a `@/*`.
- Los límites entre capas los hace cumplir ESLint (plugin de
  boundaries). Si un import viola la hexagonal, el lint falla: no
  silenciar la regla, corregir el import.
- Las entidades de dominio no salen de `application`. Los casos de uso
  devuelven DTOs planos (mapeo entidad→DTO en `application`). El DTO es
  ancho (todo menos lo sensible); el Server Action recorta/formatea para
  su pantalla.
- `apps/web` depende solo de `application`, nunca de `domain` (ni tipos).
  Los DTOs los define y exporta `application`. Los ViewModels de una
  pantalla viven en `web` y se mapean desde los DTOs.
- `packages/application` se organiza por feature: cada contexto es una
  carpeta bajo `src/` con sus subcarpetas (`auth/{use-cases, ports, entities}`,
  y a futuro `client/{...}`). Lo transversal del paquete va en
  `application/src/shared/`. Carpetas de capa en inglés; concepto del caso
  en español.
- `packages/domain` agrupa bajo categorías al mismo nivel de `src/`:
  `entities/{persona, usuario}` y `shared/{value-objects, errors}`. Sin
  conceptos sueltos en la raíz de `src/`.
- Las entidades específicas de auth (ej. `Sesion`) viven en
  `application/src/auth/entities/`, no en domain. Sus reglas se aplican en
  su factory (`Sesion.crear`); los efectos (id, token, hora) se inyectan
  desde afuera.
- Los casos de uso son funciones con firma `(deps, input)`: `deps` agrupa
  los puertos/dependencias, `input` son los datos de la llamada.
- Los puertos (interfaces) son propiedad de `application` y viven en
  `ports/` (dentro de su feature); `infrastructure` los implementa.
- **Modelo de errores por capas (regla pareja: el núcleo no lanza para lo
  que chequea)**:
  - **Dominio / application**: nunca lanzan para errores esperables.
    Devuelven `Result` (tipado `{ ok: true; value } | { ok: false; error }`,
    definido en `packages/domain/src/shared/result/result.ts` y exportado
    por el barrel de `@taller/domain`). Las factories (`Email.crear`,
    `Persona.crear`, etc.) devuelven `Result`, no lanzan.
  - **Infraestructura**: puede lanzar; las excepciones se capturan y se
    traducen a errores técnicos, o se dejan subir.
  - **Borde (Server Action / API)**: convierte `Result` a respuesta para la
    UI; un error boundary global captura lo inesperado.
- Los errores de negocio son tipos discriminados (`{ kind: '...' }`) con
  payload en el lado `error` del Result; la capa de presentación los traduce
  a strings.

---

## Convenciones de código

- **Idioma**: todo en español, incluyendo nombres de tablas, columnas,
  entidades, variables y funciones. El dominio es 100% argentino y el
  lenguaje ubicuo funciona si el código habla el idioma del negocio.
- **Idioma — genérico vs. dominio**: el código genérico (carpetas,
  interfaces y clases técnicas, métodos de plomería como `save`/`findById`)
  va en **inglés**. Lo propio del taller va en **español**, sustantivos y
  verbos: entidades, campos y acciones de negocio (`Persona`, `Usuario`,
  `registrarRepuesto`, `cambiarPassword`). Test: ¿lo entendería alguien del
  taller? Sí → español; plomería genérica → inglés.
 - **Puertos de plomería van enteros en inglés**, sustantivo y método
  (`Clock.now()`, no `Reloj.now()`). Un puerto que es plomería genérica
  (no negocio del taller) no mezcla idiomas: el sustantivo del puerto y sus
  métodos van ambos en inglés.
- **Base de datos**: `snake_case` para tablas y columnas
  (`creado_en`, `expira_en`).
- **TypeScript**: `camelCase` para propiedades y variables
  (`creadoEn`, `expiraEn`). Drizzle hace el mapeo entre ambos.
- **Ningún string de UI inline** en componentes. Todo texto del producto
  vive en `apps/web/src/i18n/strings.ts`. Los errores de dominio se
  modelan como tipos discriminados y los traduce la capa de presentación.
- **Errores de dominio**: son clases tipadas (no strings). Cada error vive en
  el archivo de su entidad; si un error pasa a usarse en varias entidades, se
  promueve a un archivo compartido de errores de dominio (nunca por
  adelantado, solo cuando se repite el uso).
  - Cada entidad/value object tiene su archivo de errores SEPARADO, aunque
    tenga un solo error. Sin excepciones por cantidad.
- **Nomenclatura de archivos**: patrón `<concepto>.<rol>.ts` con rol en
  inglés. Principal sin sufijo (`persona.ts`, `email.ts`), errores en
  `<concepto>.errors.ts`, tests en `<concepto>.test.ts`. El prefijo del
  concepto se repite aunque el archivo viva en una carpeta homónima
  (`persona/persona.errors.ts`): la encontrabilidad manda sobre la
  redundancia.
  - El set de roles del patrón `<concepto>.<rol>.ts` es cerrado: (sin
    sufijo), `errors`, `test`, `repository`. Se suma un rol nuevo solo con
    decisión registrada. Puertos no-repositorio van sin sufijo
    (`hasher.ts`); `port` no se usa como rol.
- **No inferir decisiones no escritas.** Si una decisión no está registrada
  explícitamente en DECISIONES.md o CLAUDE.md, no asumirla ni presentarla como
  si estuviera tomada. Si para avanzar hace falta extrapolar de algo existente,
  decir explícitamente "esto es una inferencia mía, no algo que decidiste" y
  esperar confirmación antes de construir sobre eso.
- **Ante la duda, preguntar.** Si algo no está claro o admite más de una
  interpretación, consultar antes de avanzar, en vez de elegir una y seguir.

---

## Mantenimiento de la bitácora

- Cuando se **cierra una decisión** durante el trabajo, Claude Code la
  registra en `DECISIONES.md`: agrega una entrada al final de la sección
  de decisiones (antes de "Pendientes") y suma su línea al índice.
- Formato del título: `## AAAA-MM-DD · Título de la decisión`.
- Cada entrada tiene tres partes: **Qué decidimos**, **Por qué**,
  **Qué descartamos**.
- **Las decisiones no se borran ni se editan.** Si una cambia, se agrega
  una entrada nueva que explica el cambio y referencia la anterior.
- Si la decisión también define una **regla activa** (no solo un dato
  histórico), se agrega además la regla a este `CLAUDE.md`.
