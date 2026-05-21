# Manual de marca

Documento de referencia para todo lo visual y verbal del producto. Define
tokens, componentes base, voz y reglas de uso. La intención es que cualquier
implementación nueva pueda mirarlo y resolver sin re-decidir.

El **porqué** de cada decisión vive en `DECISIONES.md`. Este archivo dice
**qué hacer y cómo**.

Versión: Etapa 0.

---

## Propósito y alcance

White-label **nivel 1**: por instalación se configura solo nombre y logo del
taller. Paleta, tipografía y resto del sistema son fijos.

Plataforma única: desktop. Light theme solamente en Etapa 0. Dark mode no
está descartado para el futuro, pero la implementación de tokens está
preparada para soportarlo cuando llegue (todos los colores viven como CSS
variables semánticas, no como hex hardcodeado en componentes).

Dirección visual: **tech moderno con acento industrial sutil**. Base limpia
tipo Linear, acento azul "Bosch profesional" como toque industrial. Densidad
por sobre aire: este es un sistema de gestión, no un sitio editorial.

---

## Paleta

### Filosofía

Dos vocabularios de color que viven en lugares distintos:

- **Paleta cruda** (`primary-50`, `n-200`, etc.): los hex puros. Vive
  únicamente en `apps/web/src/styles/globals.css`. Sirve para *definir* los
  tokens semánticos. Componentes no la usan.
- **Tokens semánticos** (`bg-card`, `text-muted-foreground`, etc.): roles,
  no colores. Es lo que la aplicación consume vía Tailwind. Si una pantalla
  necesita un gris, usa `text-muted-foreground`, no `text-n-500`.

Regla mecánica: si estás escribiendo un componente y necesitás un hex,
parate. Falta un token semántico o ya existe uno que no estás viendo.

### Paleta cruda

#### Primary — azul técnico

| Stop | Hex |
|------|-----|
| `primary-50`  | `#EEF3FC` |
| `primary-100` | `#D8E2F7` |
| `primary-200` | `#A9BEEC` |
| `primary-500` | `#2E5BD9` |
| `primary-600` | `#1E47B5` (brand) |
| `primary-700` | `#163A99` |
| `primary-800` | `#102C75` |

#### Neutrals — cool gray

| Stop | Hex |
|------|-----|
| `n-0`   | `#FFFFFF` |
| `n-50`  | `#F7F8FA` |
| `n-100` | `#EEF0F3` |
| `n-200` | `#E1E4EA` |
| `n-300` | `#C8CCD4` |
| `n-400` | `#8E95A3` |
| `n-500` | `#646B7A` |
| `n-700` | `#363B45` |
| `n-900` | `#0F1218` |

#### Semánticos

| Rol | fg | bg |
|-----|----|----|
| Success     | `#0A7A44` | `#E6F4EC` |
| Warning     | `#B54708` | `#FCEEDB` |
| Destructive | `#B42318` | `#FBEAE7` |
| Info        | `#0369A1` | `#E0F2FE` |

Info es deliberadamente distinto del brand (sky, no indigo). No reutilizar
`primary-*` para info: rompe la distinción "esto es del producto" vs "esto
es información del sistema".

### Tokens semánticos

Estos son los 16 tokens que la aplicación consume.

#### Superficies y texto

| Token | Mapeo | Uso |
|-------|-------|-----|
| `background`        | `n-50`  | fondo de la página |
| `foreground`        | `n-900` | texto principal |
| `card`              | `n-0`   | cards, sidebar, topbar, modales |
| `muted`             | `n-50`  | superficies hundidas (chips, inputs disabled, search bar) |
| `muted-foreground`  | `n-500` | hints, labels, placeholders, íconos decorativos |

`background` y `muted` son el mismo hex hoy pero conceptos distintos.
Si en el futuro el background cambia, `muted` no tiene por qué seguirlo.

#### Bordes y foco

| Token | Mapeo | Uso |
|-------|-------|-----|
| `border`        | `n-200`       | bordes default de cards, inputs |
| `border-strong` | `n-300`       | hover sobre `border` |
| `ring`          | `primary-500` | focus-visible exterior, 2px con offset 2px |

#### Brand

| Token | Mapeo | Uso |
|-------|-------|-----|
| `primary`                  | `primary-600` | botones primary, links, ítem activo, íconos brand |
| `primary-foreground`       | `n-0`         | texto/iconos sobre `primary` |
| `primary-hover`            | `primary-700` | hover de botón primary |
| `primary-muted`            | `primary-50`  | fondo de ítem activo en sidebar, badges del producto |
| `primary-muted-foreground` | `primary-700` | texto sobre `primary-muted` |

#### Semánticos

| Token (fg) | Token (bg) | Uso |
|------------|------------|-----|
| `success`     | `success-bg`     | confirmaciones de operaciones exitosas |
| `warning`     | `warning-bg`     | advertencias no bloqueantes |
| `destructive` | `destructive-bg` | acciones destructivas, errores |
| `info`        | `info-bg`        | información del sistema |

El `fg` es el color "dominante" (texto sobre bg tintado, border-left de
toast, icono). El `bg` es el fondo tintado.

### Reglas de uso

- Toda superficie blanca usa `card`, no `n-0` directo.
- Todo gris de texto sale de `foreground` o `muted-foreground`. Nada de
  "este gris está un poco más claro": si no encaja con los dos tokens,
  algo está mal en el diseño, no en la paleta.
- `primary-muted` se reserva para énfasis del producto (ítem activo,
  badges propios). No se usa como fondo decorativo.
- Cuando el ícono indica un estado semántico (tilde de éxito, alerta),
  usar el `fg` semántico correspondiente. Si solo decora, va
  `muted-foreground`.

---

## Tipografía

### Familia

- **IBM Plex Sans** para todo el texto general.
- **IBM Plex Mono** para datos numéricos: patentes, códigos de orden,
  precios, fechas. Mono no es decorativo: alinea columnas y distingue
  visualmente "esto es un dato, no una palabra".

Stack en CSS:

```css
--font-sans: 'IBM Plex Sans', system-ui, -apple-system, sans-serif;
--font-mono: 'IBM Plex Mono', ui-monospace, Menlo, monospace;
```

Cargar pesos `400` y `500` de Sans, `400` de Mono. Subset latin extended
(cubre castellano con acentos y ñ).

### Escala

Seis niveles, ni uno más:

| Token | Size / Line | Weight | Uso |
|-------|-------------|--------|-----|
| `display`    | 24 / 32 | 600 | título de página |
| `heading`    | 18 / 26 | 600 | sección |
| `subheading` | 15 / 22 | 600 | card, subsección |
| `body`       | 14 / 20 | 400 | texto operativo (default) |
| `small`      | 13 / 18 | 400 | hints, meta, badges |
| `mono`       | 13 / 18 | 400 | datos numéricos |

### Reglas de uso

- Token global solo si es **nivel jerárquico real**.
- Las variaciones (peso, caja, tracking) se aplican con utilities donde se
  necesiten. Por ejemplo, una fila de total se escribe con `body` +
  `font-medium`, no con un token `body-strong` separado.
- Subheaders en CAPS (con `tracking-wide` y `font-medium`) son `small`
  con utilities aplicadas, no un token aparte. Si el patrón aparece más de
  tres veces, va a un componente, no a un token tipográfico.
- Nunca usar fuentes serif (no son parte del sistema).

---

## Espaciado, radios y sombras

### Espaciado

Base **4px**.

| Token | Px |
|-------|----|
| `space-1` | 4  |
| `space-2` | 8  |
| `space-3` | 12 |
| `space-4` | 16 |
| `space-5` | 20 |
| `space-6` | 24 |
| `space-8` | 32 |

Densidad por sobre aire. En duda, el espacio menor.

### Radios

| Token | Px | Uso |
|-------|----|----|
| `radius-sm`      | 4 | badges, pills, elementos diminutos |
| `radius-default` | 6 | botones, inputs, cards pequeñas |
| `radius-md`      | 8 | cards grandes, modales |

Sin radios mayores. El sistema no es "amigable redondeado", es "operativo
sobrio".

### Sombras

Sombras representan **elevación real**. Regla mental: "¿esto flota o está
pegado?".

| Token | Valor | Uso |
|-------|-------|-----|
| `shadow-md` | `0 4px 12px rgba(15,18,24,0.08), 0 0 0 1px rgba(15,18,24,0.04)` | toasts, dropdowns, popovers |
| `shadow-lg` | `0 12px 28px rgba(15,18,24,0.12), 0 0 0 1px rgba(15,18,24,0.05)` | modales |

**Cards en flujo: solo borde, sin sombra.** Esto incluye cards de login,
cards de formularios, cards de empty states. La sombra sutil decorativa
queda explícitamente fuera del sistema.

---

## Iconografía

- **Librería**: `lucide-react` (viene con shadcn).
- **Stroke width**: `1.75` como default (override del `2` de Lucide).
  Más fino, más alineado con el resto del sistema.
- **Tamaños**: `16px` inline (botones, inputs), `20-24px` en empty states
  y headers.

### Reglas de color

El ícono **no decide** su color: lo hereda del contexto.

- Default: `muted-foreground`. Aplica a íconos decorativos en inputs,
  navegación inactiva, empty states, metadatos.
- `primary`: solo si el ícono representa **el producto o el estado activo**.
  Ej: ítem activo del sidebar, logo, badge "Invitación" pendiente. Uso
  restrictivo.
- Color semántico (`success` / `warning` / `destructive` / `info` fg): solo
  cuando el ícono **comunica el semántico**. Tilde del toast success, alerta
  del toast warning, etc.
- `primary-foreground` (blanco) en íconos dentro de botones primary o
  destructive (hereda del color del botón).

Si tenés que pensarlo, el default es `muted-foreground`.

---

## Componentes base

### Botones

**Altura única**: 36px. Padding horizontal 14px.

**Excepción**: `sm = 30px` (padding horizontal 10px) solo en filas de
tabla, para acciones secundarias. No usar en formularios ni headers.

**4 variantes**:

| Variante | bg | fg | border | Uso |
|----------|----|----|--------|----|
| `primary`     | `primary` | `primary-foreground` | `primary` | acción principal de la pantalla |
| `secondary`   | `card`    | `foreground`         | `border`  | acción alternativa, cancelar |
| `destructive` | `destructive` | `n-0` | `destructive` | eliminar, anular |
| `ghost`       | transparente | `foreground` | transparente | acción terciaria, dentro de menús/listas |

**Estados**:

- `default`: como arriba.
- `hover`: primary → `primary-hover`. Secondary → bg `muted`, border
  `border-strong`. Destructive → fg/bg/border `#92180F`. Ghost → bg `muted`.
- `disabled`: bg `border`, fg `muted-foreground` (sin importar variante).
  `cursor: not-allowed`.
- **`focus-visible`**: ring 2px `ring` con offset 2px, en las 4 variantes
  por igual. Implementado con `outline` (no `box-shadow`) para que respete
  border-radius en el offset.

`focus-visible`, no `focus`: el ring aparece con Tab pero no con click.

**Sin variante `link`**. Regla: si cambia la URL → `<a>` con estilos de
link. Si dispara JS sin cambiar URL → `<Button variant="ghost">`. La
distinción es mecánica.

### Inputs

**Altura única**: 36px. Padding horizontal 10px. Border 1px.

**Estados**:

| Estado | border | bg | text | ring extra |
|--------|--------|----|----- |------------|
| `default`  | `border`      | `card`  | `foreground`        | — |
| `focus`    | `primary`     | `card`  | `foreground`        | `3px primary-100` (box-shadow) |
| `error`    | `destructive` | `card`  | `foreground`        | — |
| `disabled` | `border`      | `muted` | `muted-foreground`  | — |
| `readonly` | `border`      | `muted` | `foreground`        | — |

El "ring de 3px primary-100" del focus es spec específica del input,
distinto del focus-visible de botones (2px outline). Inputs usan box-shadow
porque el efecto interior funciona mejor visualmente para campos.

Íconos prefix (`muted-foreground`, 16px) van dentro del input, no fuera.

### Labels y helper text

- Label: `small`, weight 500, color `foreground` (mismo que `body` pero
  más oscuro que `muted-foreground`). Margin-bottom 6px.
- Asterisco rojo para required: `destructive` fg.
- Helper text: 12px, `muted-foreground`, margin-top 6px.
- Error text: 12px, `destructive` fg, con ícono Alert 13px a la izquierda.
- Error y helper son mutuamente excluyentes: si hay error, no se muestra
  el helper.

### Toasts

**Posición**: abajo-derecha. 16px de margin desde los bordes. Stackean
hacia arriba.

**Estilo**: bg `card`, border `1px border`, border-left `3px` en el `fg`
del semántico, `shadow-md`. Min-width 360px.

**Dismiss por consecuencia, no por color**:

- Default: auto-dismiss a `5s`.
- `persistent: true`: queda hasta cierre manual. Usar siempre que la
  acción sea **irreversible o crítica**, sin importar el color del toast.
  Ej: "Usuario eliminado", "Orden anulada", "Stock ajustado".
- Errores y warnings: persistentes siempre (no aceptan `persistent: false`).

El dev que dispara el toast decide explícitamente. Default es auto-dismiss.

---

## Logo y white-label

Por instalación se configuran **dos slots independientes**:

1. **Imagen del logo**: PNG/SVG, hasta 64×64. Se renderiza en el cuadrado
   superior del logo.
2. **Nombre del taller**: string. Se renderiza al lado, en Plex Sans
   weight 600.

**Fallback de imagen**: si el taller todavía no subió logo, el cuadrado
muestra **iniciales** (2 letras del nombre) sobre fondo `muted` con texto
`muted-foreground`. No usar el cuadrado `primary` con un ícono genérico:
ese diseño es solo placeholder de etapa pre-instalación.

**Importante**: el `primary` (azul brand) **no aparece detrás del logo del
cliente**. Sigue siendo el color de marca **del producto** (botones, links,
ítem activo), pero no es la base visual del logo de la instalación.

Sub-decisiones que caen solas:

- Tamaños: 28×28 en sidebar, 24×24 en pantallas de auth, 32×32 en headers
  fuera del sidebar.
- Cuando el nombre del taller es largo (>24 chars), truncar con
  ellipsis en sidebar; mostrar completo en pantallas de auth.

---

## Voz del producto

### Regla mental

**Dos zonas** con regla mecánica.

#### Zona 1 — Acciones: infinitivo

Cuando el sistema pide hacer algo.

| Caso | Texto |
|------|-------|
| Botón principal      | `Iniciar sesión` |
| Item de menú         | `Cerrar sesión` |
| Link de acción       | `Recuperar contraseña` |
| Tooltip              | `Editar`, `Eliminar` |
| Label de form        | `Email`, `Contraseña` |
| Título de pantalla   | `Iniciar sesión`, `Activar cuenta` |

#### Zona 2 — Mensajes: impersonal

Cuando el sistema le cuenta algo al usuario.

| Caso | Texto |
|------|-------|
| Hint           | `La contraseña debe tener al menos 10 caracteres.` |
| Error          | `El email no es válido.` |
| Empty state    | `No hay órdenes pendientes.` |
| Confirmación   | `La orden OS-2024-001847 fue guardada.` |
| Toast info     | `La sesión cierra en 5 minutos.` |

Regla: si el sistema **pide** algo → infinitivo. Si **cuenta** algo →
impersonal.

### Otras reglas

- **Sin género asumido en el usuario**. Reemplazar "Bienvenido, Juan" por
  encabezados neutros como `Inicio` o `Panel del taller`. El archivo de
  strings no tiene que decidir entre Bienvenido/Bienvenida.
- **Errores describen qué pasó**, no quién la pifió. "El email no es
  válido" ✓; "Ingresaste un email incorrecto" ✗.
- **Sin corporativismo**. "Acceso al taller" ✓; "Acceso · Personal
  autorizado" ✗.
- **Castellano operativo**, no jerga tech innecesaria. "Tu espacio está
  listo" ✓; "Tu workspace está listo" ✗.
- **Sin voseo**. Pan-hispano (tuteo cuando hay segunda persona explícita,
  pero la regla de infinitivo/impersonal evita la mayoría de los casos).

### Implementación

Todos los strings del producto viven en `apps/web/src/i18n/strings.ts`.
Ningún literal de UI se escribe inline en componentes. La importación es
explícita; el compilador valida la existencia de cada key.

Errores del dominio se modelan como tipos discriminados (`{ kind:
'EmailInvalido' }`) en `packages/domain` y `packages/application`. La capa
de presentación (`apps/web`) los traduce al string correspondiente
mirando `strings.ts`. El dominio nunca sabe de strings de UI.

---

## Anexo A: qué NO hacer

Catálogo de patrones explícitamente fuera del sistema. Los archivos
`DECISIONES.md` explican por qué.

- **No** crear un token `body-strong`, `caption`, o variaciones tipo.
  Aplicar peso/caja como utility donde se necesite.
- **No** usar `<Button variant="link">`. Esa variante no existe en el
  sistema. URL → `<a>`. Acción JS → `ghost`.
- **No** usar `shadow-sm` para cards estructurales. Cards en flujo van
  con borde, sin sombra.
- **No** poner pattern decorativo de cuadrícula en el fondo. El fondo es
  plano `background`.
- **No** colocar el logo del cliente sobre fondo `primary`. El brand del
  producto y la marca del taller son cosas distintas.
- **No** hardcodear hex en componentes. Si hace falta un color, falta un
  token semántico.
- **No** escribir strings literales en JSX. Todo pasa por `strings.ts`.
- **No** asumir género del usuario en ningún string.
- **No** usar Material Design, Material UI, Material Icons, etc. El
  sistema es shadcn/ui + Tailwind + Lucide.
- **No** activar dark mode en Etapa 0. La infraestructura de tokens lo
  soporta, pero los valores específicos para dark no están definidos.
