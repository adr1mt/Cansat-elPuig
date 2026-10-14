# Revisión de accesibilidad y responsive

14 de octubre de 2026. Revisión de la compilación local, con el contenido actual del proyecto.

## Cambios

- Texto base de 16px y enlaces secundarios más legibles. Selectores de 16px y controles y enlaces de acción con al menos 44px de altura.
- Cabecera de dos filas hasta 1000px, con navegación completa. A 320px el nombre puede ocupar dos líneas sin reducir su tamaño.
- Próxima fecha, estadísticas, tareas y verificaciones adaptadas a pantallas estrechas. Los estados de verificación quedan debajo del título en móvil. El esquema alcanza 300px.
- Encabezados adecuados al contexto de tarjetas y calendario, enlaces de equipo con nombres accesibles específicos y sección Equips marcada también en sus páginas interiores.
- Orden visual de los módulos inferiores coherente con el DOM y foco visible sobre el hero en tema claro.
- Bordes de controles con contraste de 3,55:1 o superior. Leyenda del esquema con fondo uniforme y contraste de 10,35:1.
- Filtro de tareas corregido: sin selector de responsable, el código seleccionaba accidentalmente una tarjeta con `data-owner`. Esto ocultaba todas las tareas al cambiar de categoría y también al volver a «Totes les categories». Las consultas seleccionan ahora explícitamente los elementos `select`.

## Comprobaciones

| Prueba | Resultado |
| --- | --- |
| Tipos y diagnóstico Astro | 0 errores, 0 advertencias de código |
| Validación de contenido y CMS | 47 registros y 8 editores válidos |
| Tests de dominio | 17/17 correctos |
| Compilación de producción | 7 páginas generadas |
| Responsive | 7 rutas × 5 anchos × 2 temas; sin desbordamiento horizontal |
| Anchos | 320, 390, 768, 1024 y 1440px |
| axe-core, WCAG A/AA y buenas prácticas | 0 infracciones detectadas |
| Altura de enlaces de acción y controles | Sin elementos medidos por debajo de 44px |
| Texto ampliado al 200 % | Sin desbordamiento en cinco rutas a 320, 768 y 1440px |
| Teclado | Enlace de salto mueve el foco al contenido; verificaciones se abren con espacio y tienen foco visible |
| Toque simulado | Tareas, verificaciones y filtros del diario operativos |
| Temas | Persistencia entre páginas y seguimiento del tema del sistema correctos |
| Filtro de tareas | Categoría sin resultados y retorno a todas las tareas correctos |
| Sin JavaScript | Tareas visibles, controles mejorados ocultos y desplegables nativos operativos |

axe solicita revisión manual de algunos textos del hero por la imagen y el fondo mediante pseudoelemento. Se midió el contraste sobre capturas del fondo real con el texto temporalmente transparente: título 17,57:1, descripción 10,35:1, enlace entre 5,32:1 y 9,02:1 y leyenda 10,35:1. El hero conserva el mismo fondo y colores en ambos temas.

Las capturas finales, resultados JSON y mediciones están en `work/accessibility/`, carpeta local excluida de Git. `DESIGN.md` recoge las decisiones visuales actualizadas. Las advertencias de colección de diario vacía durante el build corresponden al contenido inicial sin entradas.

Las pruebas se realizaron en Chromium con tamaños de pantalla emulados y pulsaciones táctiles sintetizadas. No incluyen dispositivos físicos, Safari ni una sesión con lector de pantalla; la revisión automática no equivale a una certificación completa de conformidad.
