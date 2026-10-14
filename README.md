# CanSat Mission Tracker — Institut Puig Castellar

Web pública para seguir dos CanSat independientes de SMX2, curso 2026–2027. Puig Falcon usa `equip-a`; el segundo proyecto usa `equip-b`. Interfaz y formularios editoriales en catalán. Sin tareas, alumnos, fotos ni avances ficticios.

## Apariencia

La portada destaca los equipos con tarjetas rectangulares de acento azul y turquesa, un skyline ilustrado inspirado en la Serralada de Marina y el esquema conceptual del CanSat. La próxima fecha confirmada aparece en una franja compacta con cuenta atrás. El tema inicial es oscuro; el selector **Sistema / Clar / Fosc** conserva las elecciones guardadas y permite seguir el tema de la máquina. Sin JavaScript se utiliza el tema oscuro. El paisaje es decorativo y no representa un perfil topográfico exacto; el esquema mantiene sus anotaciones y texto alternativo. Astro sirve ambas imágenes en WebP adaptativo. Los equipos muestran únicamente progreso, tareas y entradas reales del CMS.

## Stack e instalación

Astro **7.3.8**, versión estable consultada en npm el 13/10/2026, TypeScript estricto, Zod 4 y generación estática. Node **24 LTS recomendado** (mínimo 22.12). `package-lock.json` fija las dependencias. No hay framework de interfaz ni backend. Zod es una dependencia explícita compartida entre Astro y los tests; YAML solo se usa para validar el editor.

Desde la raíz de esta carpeta:

```sh
npm ci
npm run dev
```

Abrir la URL que muestra Astro. Para validación y producción:

```sh
npm run check
npm run validate
npm test
npm run build
npm run preview
```

`npm run verify` agrupa tipos, validación, tests y build. Los tests críticos usan el runner integrado de Node. Opcionalmente, establecer `ASTRO_TELEMETRY_DISABLED=1` para desactivar la telemetría de la herramienta Astro; la web nunca incluye analítica.

## Estructura y modelo

```text
content/
  settings/       SiteSettings: titular, centro, introducción, curso activo y enlaces
  years/          AcademicYear: curso e histórico
  teams/          Team: ID estable, misión secundaria, color, participantes
  participants/   Participant: nombre o alias público, equipo y curso
  tasks/          Task: equipo, curso, estado, participante responsable y fechas
  milestones/     Milestone: precisión, condición, estado y fechas
  logs/           MissionLog: avances y resúmenes de reunión
  requirements/   TechnicalRequirement: verificación independiente y evidencia
src/
  content.config.ts    Colecciones actuales con glob loaders y esquemas
  lib/                 Esquemas, consultas, fechas y reglas puras
  components/          Tarjetas, tablero, calendario y estados vacíos
  layouts/             Cabecera, navegación, metadatos y pie
  pages/               Inici, Equips, rutas dinámicas, Calendari, Diari, 404 y sitemap
  scripts/             Filtros y actualización de fechas en el navegador
  styles/              Tokens CSS, responsive y accesibilidad
public/media/          Fotografías que sube Pages CMS
scripts/               Validación local de contenido y CMS
tests/                Pruebas de las reglas críticas
.pages.yml             Único editor previsto
.github/workflows/     Validación y despliegue
```

Todos los registros son JSON independientes. Los identificadores de equipo y curso son explícitos, portables y no dependen del nombre público. Tareas, diario, hitos y verificaciones nuevos reciben UUID desde Pages CMS. No cambiar IDs de cursos/equipos utilizados; cambiar sus nombres es seguro. Los archivos no son parte de la lógica visual.

Los textos editoriales publicados —incluidos titular, introducción, misiones y enlaces documentales— están en el CMS. Las etiquetas de navegación, estados y mensajes del producto forman parte de la interfaz catalana. No se editan semanalmente.

## Reglas de seguimiento

- Tareas activas separadas por equipo **y** curso. Las archivadas no cuentan.
- Progreso = completadas / activas; sin tareas se muestra «Sense tasques», sin porcentaje inventado.
- «Vençuda» significa fecha límite anterior al día actual y tarea no completada. Una tarea que vence hoy no se cuenta como vencida.
- Las verificaciones R1–R15 se editan explícitamente. R8 y R13 son recomendaciones y no se suman al denominador de requisitos obligatorios. No equivalen a una autorización de vuelo.
- El diario ordena por fecha descendente; la portada toma el último registro de cada equipo, y la reunión toma el último registro marcado como reunión.
- `YYYY-MM-DD` representa un día civil, sin convertirlo a medianoche UTC. La fecha actual se calcula en **Europe/Madrid**; la diferencia usa días de calendario, incluidos cambios de horario y bisiestos.
- Solo fechas confirmadas, no condicionadas, no canceladas ni completadas entran en «Proper objectiu». Se incluye hoy y un evento que sigue en curso. Los vencidos se excluyen. Cuando no hay próximas fechas confirmadas se muestra un estado vacío.
- La selección del siguiente objetivo, su cuenta atrás, las próximas fites y los estados de vencimiento se actualizan en el navegador cada minuto y al volver a la pestaña, sin despliegue diario. Sin JavaScript se conserva la fotografía del último build; los filtros se ocultan y se muestra todo el contenido.
- La portada muestra hasta tres próximas fechas confirmadas. Inicialmente hay **dos**, inscripción y PDR; no se rellenan plazas con fechas aproximadas o compromisos condicionados.

## Fuentes y contenido inicial

Se consultaron las [bases 2026–2027](https://esero.es/wp-content/uploads/2026/09/bases-del-desafio-cansat-2026-2027.pdf), especialmente apartados 3–6 y 10. Inscripción: 30/11/2026, 23:59; PDR: 18/12/2026 (las bases indican entrega antes de ese día: preparar con antelación); CDR y fase autonómica: marzo–abril, fecha territorial pendiente; PLR: 30/04/2027, 23:59, condicionado; nacional: 12–13/05/2027, condicionado; evento europeo: 30/06–02/07/2027, solo equipo seleccionado a nivel nacional.

Se han consultado las guías [PDR de enero de 2026](https://esero.es/wp-content/uploads/2026/01/2026_PDR_CanSat.pdf) y [CDR de enero de 2026](https://esero.es/wp-content/uploads/2026/01/2026_CDR_CanSat.pdf) como referencia de la edición anterior. Revisar las nuevas plantillas que publique [ESERO](https://esero.es/desafios/cansat/) antes de entregar. El calendario y las fuentes son editables. Comprobar con la organización catalana las condiciones locales, incluidas las posibles limitaciones de equipos por centro.

## GitHub Pages

La carpeta entregada debe ser la **raíz del repositorio**, con `.pages.yml`, `package.json` y `.github` en ese nivel. El repositorio del proyecto es `adr1mt/Cansat-elPuig`. GitHub Pages está configurado mediante Actions.

1. Usar la rama `main` (si se usa otra, ajustar el workflow).
2. En Settings → Pages, seleccionar **GitHub Actions** como origen.
3. El workflow valida también pull requests; solo publica pushes a `main` y ejecuciones manuales. El job de compilación tiene `contents: read`; el de publicación, `pages: write` e `id-token: write`.
4. `GITHUB_REPOSITORY` determina automáticamente `https://USUARIO.github.io` y `/NOMBRE-REPOSITORIO`. Para un repositorio `USUARIO.github.io`, el base es `/`.
5. Opcional: crear variables de repositorio `SITE_URL` y `BASE_PATH`. `SITE_URL` es el origen completo; `BASE_PATH` empieza con `/`. Variables vacías usan los valores inferidos. No son secretos.
6. Tras el primer workflow verde, abrir la URL pública y recorrer las cuatro secciones, ambas misiones y el sitemap.

Se usan las acciones oficiales vigentes consultadas: `actions/checkout@v7`, `withastro/action@v6` y `actions/deploy-pages@v5`. El action de Astro instala con el lockfile y ejecuta `npm run verify` antes de subir el artefacto. Un contenido inválido detiene la publicación y conserva la última web publicada; no se publica una web parcialmente rota.

Para comprobar un subdirectorio localmente:

```sh
SITE_URL=https://USUARIO.github.io BASE_PATH=/NOMBRE-REPOSITORIO npm run build
SITE_URL=https://USUARIO.github.io BASE_PATH=/NOMBRE-REPOSITORIO npm run preview
```

También puede copiarse `.env.example` a `.env` y sustituir los valores; Node carga ese archivo en la configuración. No incluir `.env` en Git. Los enlaces, favicon, imágenes procesadas, CSS, scripts, rutas, canonical y sitemap respetan el base.

## Pages CMS

Se utiliza la versión alojada de [Pages CMS](https://app.pagescms.org/), sin instalar un servidor CMS propio. El acceso de edición se gestiona mediante su integración con GitHub; el sitio público no tiene autenticación.

1. Entrar con la cuenta del profesor y autorizar la GitHub App de Pages CMS únicamente para este repositorio.
2. Abrir el repositorio y la rama `main`. Mantener el acceso de escritura reservado al profesor; no invitar alumnado como editor.
3. Comprobar que aparecen ocho secciones: Configuració del web, Cursos, Equips, Participants, Tasques, Calendari, Diari i reunions y Verificacions tècniques.
4. Hacer la comprobación real descrita en `docs/VALIDACION.md`, incluyendo subida de foto, referencias e identificación automática.
5. Entregar `docs/GUIA-EDITOR.md` al profesor.

Los campos usan JSON, textos planos, selectores controlados, referencias que guardan `{fields.id}`, fechas `yyyy-MM-dd`, UUID e imágenes. Nombres públicos de equipos y cursos se resuelven dinámicamente en el editor. La colección de imágenes guarda en `public/media` y escribe `/media/...`; Astro las importa y genera versiones WebP de 480/800/1200 px con `srcset`, carga diferida y dimensiones. La foto original permanece en el repositorio. Elegir archivos razonablemente pequeños y descriptivos; aportar texto alternativo y permisos de difusión.

Comprobaciones locales: YAML válido, cobertura de todos los campos de las ocho entidades, selectores alineados con Zod, referencias, fechas, existencia de imágenes, IDs duplicados y aislamiento de cursos. Además se contrastó `.pages.yml` con el esquema del código oficial de Pages CMS; detalles y límites en `docs/VALIDACION.md`. **El flujo autenticado real no se ha probado en esta sesión**. El propietario confirma que Pages CMS está autorizado para este repositorio.

## Dominio .cat de Nominalia (sin configurar todavía)

1. Elegir el dominio real y verificar su propiedad en GitHub mediante el TXT que indique Settings → Pages. No publicar un dominio inventado.
2. En Pages → Custom domain, introducir el dominio exacto elegido.
3. En el gestor DNS de Nominalia, añadir los registros que indique la [documentación vigente de GitHub](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site): para `www` o subdominio, CNAME a `USUARIO.github.io`, **sin** ruta de repositorio; para el dominio raíz, A/AAAA de GitHub o ALIAS/ANAME si Nominalia lo admite. No apuntar al hosting de Nominalia. Revisar conflictos de registros antes de cambiarlos.
4. Crear `public/CNAME` con una única línea: el dominio real, sin protocolo ni ruta. En despliegues Actions también debe mantenerse la configuración de Custom domain en GitHub.
5. Establecer `SITE_URL=https://DOMINIO-REAL.cat` y `BASE_PATH=/` en las variables del repositorio. Reconstruir.
6. Esperar la propagación DNS y la emisión del certificado, y activar **Enforce HTTPS** cuando GitHub lo permita.
7. Revisar navegación, ambas misiones, filtros, una imagen publicada, favicon, canonical y sitemap. Comprobar HTTP → HTTPS y el redireccionamiento del host alternativo si se configura.

## Reutilización y archivo

Desde Pages CMS, crear un nuevo curso con ID como `2027-2028`, y nuevos equipos con IDs únicos como `2027-2028-equip-a`. Crear sus tareas, diario, hitos y verificaciones seleccionando ese curso y esos equipos. Cambiar «Curs actiu» en Configuració del web. Archivar los equipos anteriores si corresponde, conservando todos sus archivos. Las relaciones validan que equipo y registro pertenecen al mismo curso.

El histórico queda conservado en contenido, pero todavía no hay interfaz pública para navegar cursos anteriores. Añadirla más adelante no requiere cambiar las entidades. No reutilizar IDs antiguos para una misión de otro curso. Las verificaciones de la edición anterior deben revisarse contra las nuevas bases antes de copiarlas.

## Privacidad y mantenimiento

Sin cookies, publicidad, analítica ni llamadas a APIs desde la web. Tipografías Inter alojadas localmente con su licencia. No publicar correos, teléfonos ni documentación interna. Usar únicamente nombres o alias autorizados y evidencias aptas para difusión pública. Todo el contenido y el historial del repositorio son potencialmente públicos.

Los mensajes de Astro sobre colecciones vacías de tareas/diario son esperados con este contenido inicial. La validación permite valores opcionales vacíos del CMS. El campo «Mes de referència per ordenar» organiza períodos sin día exacto (por ejemplo, 2027-03); no se muestra como fecha confirmada. Los errores de esquema o de referencias impiden el despliegue; corregir el registro desde el editor y volver a guardar. Actualizar dependencias de manera deliberada, ejecutando `npm run verify` y revisando móvil/escritorio.

## Estado de la entrega

GitHub Pages está configurado y el propietario confirma que Pages CMS está autorizado. Consultar `docs/VALIDACION.md` para pruebas y límites: la edición autenticada de participantes y tareas requiere una comprobación desde el editor. DNS/HTTPS del dominio propio sigue pendiente. No hay credenciales en el proyecto.

Documentación técnica consultada: [Astro](https://docs.astro.build/), [Content Collections](https://docs.astro.build/en/guides/content-collections/), [GitHub Pages con Astro](https://docs.astro.build/en/guides/deploy/github/), [Pages CMS](https://pagescms.org/docs/) y su [configuración](https://pagescms.org/docs/configuration/).

## Participantes y asignación de tareas

En Pages CMS, añade cada persona en **Participants** con nombre o alias público, curso y equipo. En **Tasques**, selecciona el participante en **Responsable**. La referencia usa un ID estable: cambiar su nombre actualiza las tareas sin reasignarlas. El selector muestra el nombre y el ID del equipo; busca en toda la colección. La validación rechaza participantes de otro equipo o curso, referencias inexistentes y participantes archivados con tareas abiertas. Las tareas sin responsable son válidas. Reasigna antes de eliminar participantes; archivar conserva sus tareas completadas.

Los anteriores alias de equipo y responsables escritos a mano se conservan por compatibilidad, ocultos en el editor. Los nuevos participantes y asignaciones se gestionan desde los selectores. No se han añadido personas ni tareas ficticias.
