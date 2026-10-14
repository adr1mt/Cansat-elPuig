---
name: CanSat Mission Tracker
description: Seguimiento público educativo de dos misiones CanSat.
colors:
  ink: "#f1f5fa"
  muted: "#afc0d3"
  paper: "#080f18"
  surface: "#0e1b29"
  line: "#2b4055"
  accent: "#ff966f"
  tonal: "#172536"
  tag-text: "#bacbdf"
  field-line: "#60768e"
  summary-surface: "#1a2b3e"
  track: "#142334"
  inverse: "#090f18"
  warning-bg: "#33291b"
  warning-line: "#6a5230"
  warning-text: "#f3cc8c"
  overdue: "#ffb391"
  light-ink: "#172c43"
  light-muted: "#526478"
  light-paper: "#f4f6f8"
  light-surface: "#ffffff"
  light-line: "#cbd8e4"
  light-accent: "#a63f1d"
  light-tonal: "#eaf0f6"
  light-tag-text: "#425569"
  light-field-line: "#788a9d"
  light-summary-surface: "#eef3f8"
  light-track: "#e2e8ef"
  light-inverse: "#ffffff"
  light-warning-bg: "#fff4e8"
  light-warning-line: "#ead8bf"
  light-warning-text: "#765321"
  light-overdue: "#904116"
  team-a: "#2459b8"
  team-b: "#087d79"
  team-display-mix: "#b5e5ff"
typography:
  display:
    fontFamily: "MissionSans, system-ui, sans-serif"
    fontSize: "clamp(3rem, 5.7vw, 5rem)"
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  display-mobile:
    fontFamily: "MissionSans, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 10vw, 4rem)"
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
  team-title:
    fontFamily: "MissionSans, system-ui, sans-serif"
    fontSize: "clamp(1.65rem, 2.25vw, 2rem)"
    fontWeight: 650
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  body:
    fontFamily: "MissionSans, system-ui, sans-serif"
    fontSize: "16px"
    lineHeight: 1.65
rounded:
  flat: "0"
  surface: "4px"
  column: "12px"
  task: "9px"
  control: "8px"
  field: "7px"
  status: "6px"
  tag: "5px"
  team-badge: "2px"
spacing:
  rhythm: "24px"
  section: "48px"
  section-mobile: "32px"
  board-gap: "16px"
  team-gap: "18px"
  team-gap-mobile: "14px"
components:
  button-link:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.inverse}"
    rounded: "{rounded.control}"
    padding: "10px 20px"
  button-filter:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "9px 18px"
  button-filter-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.inverse}"
    rounded: "{rounded.control}"
    padding: "9px 18px"
  field-select:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "8px 12px"
  navigation-link:
    textColor: "{colors.ink}"
    rounded: "{rounded.flat}"
    padding: "12px 8px"
  navigation-selected:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
    rounded: "{rounded.flat}"
    padding: "12px 8px"
  chip:
    backgroundColor: "{colors.tonal}"
    textColor: "{colors.tag-text}"
    rounded: "{rounded.tag}"
    padding: "3px 8px"
  team-card:
    backgroundColor: "color-mix(in srgb, var(--team) 7%, var(--surface))"
    textColor: "{colors.ink}"
    rounded: "{rounded.flat}"
    padding: "18px 24px 14px"
  team-card-mobile:
    backgroundColor: "color-mix(in srgb, var(--team) 7%, var(--surface))"
    textColor: "{colors.ink}"
    rounded: "{rounded.flat}"
    padding: "18px 18px 14px"
  team-badge:
    backgroundColor: "color-mix(in srgb, var(--team) 18%, var(--surface))"
    textColor: "var(--team-display)"
    rounded: "{rounded.team-badge}"
    padding: "2px 8px"
  team-badge-light:
    backgroundColor: "color-mix(in srgb, var(--team) 18%, var(--surface))"
    textColor: "color-mix(in srgb, var(--team) 75%, #172c43)"
    rounded: "{rounded.team-badge}"
    padding: "2px 8px"
  next-milestone:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.flat}"
---

# Design System: CanSat Mission Tracker

## Overview

Web pública educativa catalana del Institut Puig Castellar. Modo Read con seguimiento de dos misiones: una atmósfera azul noche, acentos cálidos y equipos reconocibles por sus colores. La ilustración de la Serralada de Marina sitúa el proyecto en su entorno y el esquema conceptual del CanSat conserva la identidad espacial.

**Key Characteristics:**

- Consulta clara de misiones y datos reales.
- Azul noche inicial con acentos naranja, azul y turquesa.
- Equipos destacados en superficies rectangulares y tonales.
- Paisaje local ilustrado y esquema conceptual de vuelo estáticos.
- Bordes y espacio; sin sombras ni animación de entrada.

## Colors

El frontmatter describe el tema oscuro inicial; las variantes `light-*` corresponden a la elección Clar. Papel azul noche, superficie azul profundo y texto casi blanco forman los neutros. El naranja es el acento primario de enlaces, navegación seleccionada y cuenta atrás. Los colores secundarios de Puig Falcon y Equip B proceden del CMS y conservan su identidad azul y turquesa.

El selector Sistema / Clar / Fosc guarda la elección en `localStorage` bajo `cansat-theme` y la comparte entre páginas y pestañas. Una elección previa se respeta; sin elección válida se utiliza Fosc. Sistema sigue `prefers-color-scheme` y sus cambios en vivo. Sin JavaScript, CSS utiliza el tema oscuro y el selector permanece oculto.

**The Local Team Color Rule.** Resolver el color legible dentro de cada tarjeta y página de equipo: en oscuro, `color-mix(in srgb, var(--team) 50%, #b5e5ff)`; en claro, el color original. El fondo de tarjeta mezcla un 7% del color de equipo con la superficie. La etiqueta de equipo mezcla un 18% para el fondo y, en claro, su texto mezcla un 75% del color de equipo con el texto oscuro para mantener contraste.

Las etiquetas, selectores, filtros, estados vacíos, tareas y calendario usan variables semánticas. La portada mantiene el paisaje sobre fondo azul noche en ambos temas, con texto y enlace de la paleta oscura; los demás componentes siguen el tema elegido.

## Typography

Inter se sirve localmente como MissionSans, con Regular y SemiBold. Los titulares usan peso 650 y espaciado ligeramente cerrado. El titular editable conserva sus saltos de línea y usa las escalas display del frontmatter; el título de equipo es grande y compacto, con tamaño móvil de 1.7rem. Los números de cuenta atrás, progreso y estadísticas son tabulares. La interfaz se mantiene en catalán.

## Layout

Contenedor principal y cabecera centrados de máximo 1320px, con 40px por lado; en móvil, 16px por lado. La introducción comparte espacio con el CanSat en escritorio. El skyline decorativo se extiende al ancho de la ventana y ocupa 210px de alto en la base de la portada. El esquema tiene un ancho máximo de 380px. En móvil se coloca debajo del texto y alcanza hasta 300px; el paisaje ocupa 165px de alto.

La franja del próximo objetivo tiene tres columnas en escritorio: información, fecha y cuenta atrás de 150px. Hasta 1000px tiene dos columnas; en móvil la cuenta atrás ocupa 80px junto al título y la fecha y el enlace usan todo el ancho debajo. Los equipos se muestran en dos columnas y pasan a una a 767px. Su sección empieza a 24px de la franja, con separaciones compactas entre tarjetas y módulos inferiores. Otras secciones conservan el ritmo de 48px, reducido a 32px en móvil.

El Kanban muestra cuatro columnas, dos a 1100px y una a 767px. En móvil, navegación y selector permanecen visibles: la marca y el selector comparten fila y la navegación ocupa otra. Hasta 1000px, la cabecera usa dos filas: marca y selector arriba, cuatro enlaces de navegación debajo. Los controles tienen al menos 44px de alto y los selectores usan 16px. A 320px la marca puede ocupar dos líneas sin reducir el texto.

## Elevation & Depth

Sistema plano sin sombras: bordes de un píxel, espacio y superficies tonales. Las tarjetas de equipo añaden un borde lateral de 5px del color legible de su equipo. El skyline crea profundidad con montes superpuestos, sin movimiento.

El paisaje `src/assets/marina-skyline.png` es una ilustración generada con transparencia, inspirada en la Serralada de Marina; no es un perfil topográfico exacto. Su procedencia está en `src/assets/marina-skyline.provenance.md`. El dibujo conservado en `src/assets/cansat-schematic.png` representa paracaídas, radio, sensores y descenso conceptual. Astro sirve ambos como WebP adaptativo. El paisaje es decorativo y el esquema tiene texto alternativo descriptivo.

## Shapes

Tarjetas de equipo, franja de objetivo y navegación tienen bordes rectos. La superficie general conserva un radio pequeño de 4px para estados vacíos y otros contenedores; los controles, tareas y columnas mantienen sus radios del frontmatter. Las etiquetas de equipo tienen esquinas de 2px. La marca utiliza un contenedor circular con borde azul.

## Components

Las tarjetas de equipo priorizan nombre, misión secundaria, progreso y enlace. Muestran hasta dos tareas reales, ordenadas por estado active / blocked / pending / done. El progreso usa completadas frente al total de tareas activas del equipo y curso. Sin tareas aparece una explicación; la última entrada se muestra solo cuando existe y el total adicional solo cuando quedan tareas fuera de la vista previa.

La navegación usa `aria-current`, texto de acento y subrayado inferior de 2px en la página actual. Hover usa el acento sin superficie añadida. Filtros con selección explícita usan texto inverso. El foco visible es de 3px con el acento del tema y separación de 4px. Botones de retorno mantienen el texto inverso en hover y añaden subrayado. Selectores y detalles usan superficies semánticas; requisitos y tareas conservan `details/summary`.

La franja del próximo objetivo muestra título, descripción, fecha y días restantes de la próxima fecha confirmada aplicable. La cuenta atrás conserva el cálculo por días civiles en Europe/Madrid, con actualización cada minuto y al volver a la pestaña. Los datos sin JavaScript conservan la fotografía del build. El selector de tema se inicializa antes de pintar y tolera fallos de almacenamiento.

La interfaz tiene estados de hover y foco sin animación de entrada o de trayectoria. Se conserva la regla global de reducción de movimiento.

## Do's and Don'ts

- Do mantener la identidad de los equipos, el contenido del CMS y los estados escritos.
- Do utilizar variables semánticas para superficies y textos, y resolver el color legible dentro de cada equipo.
- Do mantener el paisaje y el CanSat como ilustraciones estáticas, con equipos destacados y foco visible.
- Don't presentar el esquema como el CanSat construido o inventar telemetría, avances o una fecha de lanzamiento.
- Don't presentar el skyline ilustrado como un perfil topográfico exacto.
- Don't comunicar estados únicamente por color.

## Accesibilidad y adaptación

Texto base de 16px, enlaces de acción de al menos 14px y áreas de pulsación de 44px de alto. Los bordes de controles tienen contraste mínimo de 3:1 con sus superficies en ambos temas. El foco del hero claro conserva el acento cálido sobre su fondo oscuro. La leyenda del esquema tiene un fondo azul noche uniforme para conservar el contraste sobre el paisaje en todos los anchos. Los enlaces de equipo tienen nombres accesibles específicos y la navegación señala también la sección de una página de equipo.

Las tarjetas y el calendario reciben el nivel de encabezado según su contexto. El orden visual de los módulos inferiores coincide con el DOM. A 768–1000px se apilan esos módulos; por debajo de 380px las estadísticas usan dos columnas. En móvil, cada verificación coloca su estado debajo del título. La ampliación del texto refluye sin ocultar contenido y los desplegables conservan el comportamiento nativo con y sin JavaScript.
