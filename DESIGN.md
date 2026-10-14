---
name: CanSat Mission Tracker
description: Seguimiento público educativo de dos misiones CanSat.
colors:
  ink: "#172c43"
  muted: "#526478"
  paper: "#f4f6f8"
  surface: "#ffffff"
  line: "#dbe3ea"
  accent: "#2459b8"
  team-b: "#087d79"
  milestone-surface: "#142b44"
  milestone-line: "#34506c"
  nav-selected: "#eaf0f6"
  column-surface: "#eaf0f6"
  tag-surface: "#eaf0f6"
  tag-line: "#dbe3ea"
  tag-text: "#425569"
  field-line: "#bbc9d6"
  summary-surface: "#eef3f8"
  blocked: "#765321"
  launch: "#0e2034"
  launch-text: "#f1f6fc"
  launch-muted: "#b9cbdf"
  trajectory: "#ff7855"
  countdown: "#ffac90"
  dark-paper: "#090f18"
  dark-surface: "#101b29"
  dark-ink: "#e6edf5"
  dark-muted: "#a3b3c6"
  dark-line: "#293a4d"
  dark-accent: "#91baff"
  pending: "#63758a"
  overdue: "#904116"
typography:
  display:
    fontFamily: "MissionSans, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 4.8vw, 4rem)"
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  page-title:
    fontFamily: "MissionSans, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 4.5vw, 3.4rem)"
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "MissionSans, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 650
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  title:
    fontFamily: "MissionSans, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 650
    lineHeight: 1.4
  body:
    fontFamily: "MissionSans, system-ui, sans-serif"
    fontSize: "15px"
    lineHeight: 1.65
rounded:
  surface: "14px"
  column: "12px"
  task: "9px"
  control: "8px"
  field: "7px"
  status: "6px"
  tag: "5px"
spacing:
  rhythm: "24px"
  section: "48px"
  section-mobile: "32px"
  board-gap: "16px"
components:
  button-link:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "10px 20px"
  button-filter:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "9px 18px"
  button-filter-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "9px 18px"
  field-select:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "8px 12px"
  navigation-link:
    textColor: "{colors.muted}"
    rounded: "{rounded.control}"
    padding: "9px 14px"
  navigation-selected:
    backgroundColor: "{colors.nav-selected}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "9px 14px"
  chip:
    backgroundColor: "{colors.tag-surface}"
    textColor: "{colors.tag-text}"
    rounded: "{rounded.tag}"
    padding: "3px 8px"
  team-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.surface}"
    padding: "26px"
---

# Design System: CanSat Mission Tracker

## Overview

Web pública educativa catalana del Institut Puig Castellar. Modo Read con seguimiento de misión y una portada inspirada en el lanzamiento espacial. Conserva el contenido editorial, los equipos y la estructura de navegación. El esquema conceptual de vuelo del CanSat, la trayectoria naranja y la cuenta atrás forman el acento visual principal.

## Colors

El tema por defecto sigue `prefers-color-scheme`, incluso cuando cambia con la web abierta. El selector Sistema / Clar / Fosc guarda la elección en `localStorage` y la comparte entre páginas y pestañas. Sin JavaScript, CSS sigue la preferencia del sistema.

El tema claro utiliza papel frío y superficies blancas; el oscuro, fondos azul noche, superficies azul profundo y texto claro. Las etiquetas, selectores, filtros, estados vacíos, tareas y calendario usan variables semánticas para mantener la legibilidad en ambos modos. Los acentos de equipo conservan su color original y aclaran su texto mediante `color-mix` en oscuro.

La portada mantiene su panel espacial azul profundo en ambos temas: fondo `#0e2034`, franja de objetivo `#142b44`, texto `#f1f6fc`, texto secundario `#b9cbdf`. La trayectoria utiliza `#ff7855` y la cuenta atrás `#ffac90`.

## Typography

Inter se sirve localmente como MissionSans, con Regular y SemiBold. El titular editable conserva sus saltos de línea: `clamp(2.5rem, 4.8vw, 4rem)` en escritorio y `clamp(2.2rem, 8.5vw, 3.5rem)` en móvil. Los números de cuenta atrás y estadísticas son tabulares. Se mantiene la interfaz en catalán.

## Layout

Contenedor principal centrado de máximo 1184px y cabecera de máximo 1320px. El panel espacial agrupa la introducción y el próximo objetivo. En escritorio, la introducción comparte espacio con el esquema del CanSat; en móvil, el esquema continúa debajo del texto. La cuenta atrás ocupa una columna lateral, de 224px en escritorio y 90px en móvil.

El ritmo de las secciones es de 48px, reducido a 32px en móvil. Los equipos y bloques de dos columnas pasan a una columna a 767px. El Kanban muestra cuatro columnas, dos a 1100px y una a 767px. En móvil, navegación y selector de tema permanecen visibles; el selector comparte fila con la marca y la navegación ocupa otra fila.

## Elevation & Depth

Sistema plano sin sombras: bordes de un píxel, espacio y superficies tonales. El esquema de portada es una imagen estática con fondo transparente y anotaciones de paracaídas, radio y sensores. Se conserva en `src/assets/cansat-schematic.png` y Astro sirve versiones WebP de 480 y 960 px.

## Shapes

Panel espacial de radio 16px; tarjetas mayores de 14px. Los controles conservan sus radios existentes. Marca e iconos de equipo utilizan contenedores circulares. El esquema representa un vuelo conceptual y no un diseño construido ni telemetría real.

## Components

Navegación con `aria-current`, filtros con selección explícita, foco visible de 3px usando el acento del tema. Botones seleccionados usan texto inverso para mantener contraste en ambos modos. Selectores y detalles utilizan superficies semánticas. Los requisitos y tareas conservan `details/summary`.

El selector de tema se oculta sin JavaScript y se inicializa antes de pintar el contenido para evitar un destello del tema incorrecto. El tema se guarda de forma tolerante a errores de almacenamiento. La cuenta atrás conserva el cálculo por días civiles en Europe/Madrid y muestra únicamente la próxima fecha confirmada aplicable.

## Do's and Don'ts

- Do mantener la identidad de los equipos, el contenido del CMS y los estados escritos.
- Do utilizar variables semánticas para todas las superficies y textos de consulta.
- Do mantener el panel espacial como énfasis de portada y respetar la reducción de movimiento.
- Don't presentar el esquema conceptual como el CanSat real o inventar telemetría, avances o una fecha de lanzamiento.
- Don't comunicar estados únicamente por color.
