---
name: CanSat Mission Tracker
description: Seguimiento público educativo de dos misiones CanSat.
colors:
  ink: "#172c43"
  muted: "#526478"
  paper: "#f6f8fa"
  surface: "#ffffff"
  line: "#dbe3ea"
  accent: "#2459b8"
  team-b: "#087d79"
  milestone-surface: "#eaf1fa"
  milestone-line: "#d6e2f2"
  nav-selected: "#edf2f8"
  column-surface: "#edf1f5"
  tag-surface: "#f0f3f6"
  tag-line: "#e2e7ec"
  tag-text: "#425569"
  field-line: "#bbc9d6"
  summary-surface: "#f8fafc"
  blocked: "#9c6021"
  pending: "#63758a"
  overdue: "#904116"
typography:
  display:
    fontFamily: "MissionSans, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4.25rem)"
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  page-title:
    fontFamily: "MissionSans, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 4.5vw, 3.4rem)"
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "MissionSans, system-ui, sans-serif"
    fontSize: "1.35rem"
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

Web pública educativa catalana del Institut Puig Castellar. Modo Read con componentes de seguimiento: dashboard SaaS claro (80 %) y Mission Control discreto (20 %). La geometría orbital, los identificadores de misión y la cuenta atrás aportan el acento técnico dentro de superficies claras, bordes y espacio.

La dirección permanece fijada por el brief; este documento registra la implementación existente sin añadir otra metáfora visual.

## Colors

El azul sirve a Puig Falcon y también a enlaces al pasar el cursor, foco y estado activo. El teal identifica Equip B y las tareas completadas. Por tanto, el uso del color en el código no se limita a los identificadores de equipo. El texto principal y secundario se leen sobre papel frío y superficies blancas; las líneas suaves delimitan tarjetas y secciones.

La próxima fecha utiliza una superficie azul pálido y su propio borde. Las columnas, etiquetas y navegación seleccionada emplean fondos tonales claros. Los estados bloqueado y vencido cuentan con acentos cálidos además de sus etiquetas textuales.

## Typography

Inter se sirve localmente bajo el nombre CSS MissionSans, con archivos Regular y SemiBold y fallback de sistema. La portada utiliza el rol display; los títulos de página emplean una escala propia. El cuerpo usa el rol body. Las cifras de cuenta atrás y estadísticas utilizan números tabulares. Los títulos de equipo tienen una escala propia (1.8rem en escritorio, 1.65rem en móvil).

## Layout

Contenedor principal centrado (máximo 1184px, ancho disponible menos 48px). La cabecera tiene un máximo propio (1320px). Ritmo principal y separación entre tarjetas de equipo: spacing.rhythm. Las secciones pasan de spacing.section a spacing.section-mobile en móvil.

El Kanban muestra cuatro columnas, dos cuando el viewport es de 1100px o menos y una cuando es de 767px o menos. Los equipos, el diario y los bloques de dos columnas pasan a una columna en el segundo breakpoint. En móvil el margen horizontal es de 16px por lado, la navegación ocupa una fila completa y la ilustración orbital de la portada se oculta. Las estadísticas pasan de seis a tres columnas.

## Elevation & Depth

Sistema plano sin sombras. Superficies, tonos claros y bordes de un píxel separan regiones. Los estados vacíos utilizan un borde discontinuo. La animación de entrada del contenido dura 0.4s con ease-out y desplaza 4px en vertical; se desactiva bajo prefers-reduced-motion, junto con las transiciones y el desplazamiento suave.

## Shapes

Las tarjetas mayores utilizan rounded.surface; columnas Kanban, tareas y controles tienen radios menores definidos en el frontmatter. Los identificadores de estado y marcadores de cronología son circulares. Los iconos de equipo usan un contenedor suavemente curvado (10px), no una tarjeta mayor.

## Components

Los botones de filtro tienen borde suave, texto principal y fondo blanco; su selección usa fondo oscuro y texto blanco, y el hover refuerza el borde. El enlace de retorno con aspecto de botón también usa fondo oscuro. No existe un formulario de edición público: los campos implementados son selectores de consulta.

Los selectores tienen borde propio y heredan el foco visible global. La navegación usa texto secundario; la página actual utiliza fondo tonal y peso 650. Las etiquetas tienen fondo neutro, borde fino y texto compacto. Las tarjetas de equipo usan 26px de relleno en escritorio y 22px en móvil, con separador interior para la última actualización.

Las tareas y los requisitos usan details/summary, con fondo ligeramente tonal al abrir o pasar el cursor; el detalle permanece consultivo. La cuenta atrás muestra cifras tabulares (4.5rem en escritorio, 2.6rem en móvil) y una etiqueta escrita. El foco global es un contorno azul de 3px con separación de 4px.

## Do's and Don'ts

- Do mantener bordes, espacio y superficies claras como base de la jerarquía.
- Do identificar Puig Falcon en azul y Equip B en teal, con nombres y estados escritos.
- Do preservar el foco visible y la preferencia de reducción de movimiento.

- Don't introducir sombras en las tarjetas del sistema actual.
- Don't convertir el acento Mission Control en el lenguaje dominante.
- Don't comunicar estados únicamente mediante color.
