# Validación y activación pendiente

Fecha de revisión: 13/10/2026. Esta entrega es una web estática funcional y una configuración de edición local; la cuenta de GitHub, la instalación autenticada de Pages CMS y el dominio .cat no están conectados.

## Comprobaciones reproducibles

```sh
npm ci
npm run verify
```

**Resultado final:** tipos sin errores ni avisos, 41 registros válidos, siete formularios cubiertos, 15 tests aprobados y build de producción correcto. 24 vistas de navegador sin desbordamiento y 12 auditorías automáticas sin violaciones detectadas.

Pruebas de reglas: progreso, cero tareas, cuatro estados, archivadas, tareas vencidas, separación por equipo y curso, cambio de próximo objetivo, fechas sin confirmar/orientativas, fases condicionadas, canceladas y completadas, horario de Madrid, cambio de hora, bisiestos, últimas entradas/reuniones, referencias rotas, duplicados, fechas imposibles, colores y enlaces inválidos, imagen sin alternativa, campos opcionales vacíos y serialización JSON del CMS. Una prueba adicional ordena períodos mediante un mes explícito sin inventar un día exacto.

`npm run validate` revisa los 41 registros reales y la correspondencia entre los esquemas y los siete formularios del CMS. Todos los campos de contenido tienen editor. Las únicas colecciones vacías son tareas y diario, deliberadamente.

## Revisión en navegador

Chromium local: portada, índice de equipos, Puig Falcon, Equip B, Calendari y Diari a **375, 768, 1024 y 1440 px** (24 combinaciones). Se verifican navegación, tarjetas, Kanban, timeline, tipografía, estados vacíos, rutas con `/mission-test/` y ausencia de desbordamiento horizontal. Capturas e informes se entregan en la carpeta hermana `evidence`.

Con datos temporales etiquetados como pruebas se comprobó además: cuatro tarjetas por equipo, exclusión del otro equipo, filtros de categoría, despliegue de detalles, completadas y vencidas, filtro del diario, última reunión, imagen con base y versiones WebP, y las vistas con contenido en los cuatro tamaños. Se simuló el 01/12/2026 en el navegador: el objetivo cambia de inscripción a PDR y muestra 17 días sin volver a compilar. El salto de teclado al contenido se comprobó realmente. Todos los datos e imágenes temporales se retiraron del proyecto antes de la entrega.

Axe-core se ejecuta con reglas WCAG 2 A/AA, 2.1 A/AA y 2.2 AA en seis vistas a 375 y 1440 px. Es una comprobación automática; no es una certificación completa de WCAG. La lectura con lector de pantalla y pruebas manuales extensas de tecnologías de apoyo siguen pendientes. El diseño incluye foco visible, etiquetas, estados textuales, estructuras semánticas y reducción de movimiento.

Para repetir la revisión de navegador opcionalmente, con la vista previa ya iniciada:

```sh
npm install --no-save --package-lock=false playwright axe-core
npx playwright install chromium
QA_URL=http://localhost:4321/mission-test/ node scripts/browser-check.mjs
```

Estas herramientas son opcionales de desarrollo y no están en las dependencias ni en el código público. El script guarda evidencias en `work/browser/`, ignorado por Git. Admite `PLAYWRIGHT_MODULE`, `CHROMIUM_PATH` y `AXE_SCRIPT` para herramientas ya instaladas. `QA_NO_SANDBOX=1` es solo para entornos de prueba aislados que lo necesiten. El script se refiere a los dos IDs iniciales; adaptar sus rutas si se revisa un curso posterior.

## Contraste de Pages CMS

Además de las pruebas locales propias, se descargó el esquema de configuración del [repositorio oficial](https://github.com/pagescms/pagescms), `lib/config-schema.ts`, y se validó `.pages.yml`. Para ejecutar ese esquema de manera independiente se sustituyeron únicamente su importación de Zod por la dependencia instalada y el import de registro de campos por el conjunto de nombres del `fields/registry.ts` oficial. No se cambió el cuerpo del esquema. Revisión de la fuente: `6f4e860a35d934406580287e7042e5e111e207a1`. Resultado: PASS. Esto contrasta el formato de configuración; no ejecuta los formularios autenticados ni prueba los permisos de la GitHub App.

Se comprobaron contra la documentación actual: `format: json`, `filename` basado en UUID, valores `name/label` de selectores, referencias con `{fields.id}`, fechas `yyyy-MM-dd` sin hora, listas simples de alias, UUID generados y media `input/output`. Los UUID iniciales de hitos y requisitos son compatibles con el campo UUID del editor; los IDs de cursos y equipos son cadenas explícitas. Los nombres de equipo se muestran dinámicamente en las referencias.

Un editor puede introducir una relación incorrecta o seleccionar «confirmada» sin día. Pages CMS valida campos requeridos, patrones y valores, y la validación de build detecta relaciones y reglas entre campos. Un fallo conserva la última versión desplegada. No se afirma que cualquier edición arbitraria pueda publicarse: los datos inválidos se rechazan deliberadamente.

## Prueba manual imprescindible tras conectar el repositorio

Usar contenido de prueba claramente marcado y eliminarlo al terminar:

- Abrir todos los formularios; guardar una modificación de cada uno sin tocar archivos manualmente.
- Cambiar el nombre de Puig Falcon; comprobar que tareas y URL siguen asociadas a `equip-a`.
- Crear una tarea, asignar curso/equipo/responsable, modificar categoría y fecha, pasar por los cuatro estados, añadir evidencia y eliminarla. Revisar que nunca aparece en el otro equipo.
- Crear, editar y eliminar una fita; revisar fecha vacía, orientativa, confirmada, intervalo y condición de clasificación. Si un equipo se clasifica, asignar la fita a ese equipo antes de quitar la condición; no confirmar la participación del otro.
- Publicar un resumen de reunión de cada equipo; comprobar portada, diario, filtros y última reunión. Subir una fotografía autorizada con texto alternativo; comprobar que la ruta funciona bajo el base y que se sirven imágenes optimizadas. Editar y eliminar la entrada.
- Cambiar una verificación a «En verificació» y «Verificat», registrar observaciones y evidencia; comprobar que no cambia el progreso de tareas.
- Comprobar nombres, misiones, color, alias, introducción, enlaces y curso activo desde sus formularios.
- Comprobar el estado verde de GitHub Actions y la web pública. Confirmar que únicamente el profesor tiene permiso de escritura.

No se ha ejecutado esta prueba autenticada porque no existe un repositorio autorizado asociado a la entrega. El despliegue Actions tampoco se ha ejecutado en GitHub. DNS, CNAME real, certificado y HTTPS de Nominalia quedan pendientes.

## Límites conocidos

Sin JavaScript, fechas y cuenta atrás reflejan el build; con JavaScript se recalculan en Madrid. El reloj del dispositivo debe ser correcto. Un requisito «Verificat» es un registro del profesor y no un certificado de la organización. No hay navegación pública del histórico, aunque sus datos y aislamiento están preparados. Inicialmente no hay entradas ni tareas reales. Las fechas territoriales y nuevas plantillas deberán actualizarse cuando las publique la organización.
