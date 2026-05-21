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
- **Imports internos** usan el scope `@taller/*` (ej.
  `import { Usuario } from '@taller/domain'`).
- Los límites entre capas los hace cumplir ESLint (plugin de
  boundaries). Si un import viola la hexagonal, el lint falla: no
  silenciar la regla, corregir el import.
---

## Convenciones de código

- **Idioma**: todo en español, incluyendo nombres de tablas, columnas,
  entidades, variables y funciones. El dominio es 100% argentino y el
  lenguaje ubicuo funciona si el código habla el idioma del negocio.
- **Base de datos**: `snake_case` para tablas y columnas
  (`creado_en`, `expira_en`).
- **TypeScript**: `camelCase` para propiedades y variables
  (`creadoEn`, `expiraEn`). Drizzle hace el mapeo entre ambos.
- **Ningún string de UI inline** en componentes. Todo texto del producto
  vive en `apps/web/src/i18n/strings.ts`. Los errores de dominio se
  modelan como tipos discriminados y los traduce la capa de presentación.

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