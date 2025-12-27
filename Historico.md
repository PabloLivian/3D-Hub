# Bitácora de Desarrollo - MiduJobs

## [2025-12-18] Inicialización y Refactorización del Home
**Funcionalidad:**
- Configuración inicial del proyecto y estructura de directorios.
- Implementación de la página de Inicio (`Home`) basada en el diseño de reference (`stich.html`).
- Creación de componentes base reutilizables.

**Ejecución Técnica:**
- Se instaló `react-router-dom` para la navegación.
- Se refactorizó `App.jsx` para utilizar `BrowserRouter` y `Routes`.
- Se migraron los estilos de Tailwind (del HTML original) a CSS módulos estándar (`.css`), creando variables globales en `index.css`.
- Componentes creados:
    - `Navbar`: Barra de navegación responsive.
    - `Footer`: Pie de página simple.
    - `Hero`: Sección principal con buscador e imagen de fondo.
    - `Features`: Sección de características "Por qué DevJobs".
- Se integraron fuentes de Google (Inter).

**Tecnologías/Librerías Nuevas:**
- `react-router-dom`, SWC (Vite plugin implícito), Google Fonts.

---

---

## [2025-12-18] Implementación de Página de Empleos
**Funcionalidad:**
- Desarrollo de la página de listado de empleos (`Jobs`).
- Implementación de tarjetas de empleo interactivas (`JobCard`).
- Integración de iconos Material Symbols.

**Ejecución Técnica:**
- Se añadió la ruta `/jobs` en `App.jsx` y se actualizó el `Navbar`.
- **JobCard Component**:
    - Recibe datos por `props`.
    - Implementa lógica de estado local (`useState`) para el botón "Aplicar".
    - El botón cambia de estilo (verde) y se deshabilita tras el clic.
- **Jobs Page**:
    - Layout con barra de búsqueda y filtros visuales (mock).
    - Renderizado dinámico de una lista de empleos utilizando un array de datos ficticios (`MOCK_JOBS`).
- Se añadió el CDN de Google Material Symbols en `index.html`.

**Tecnologías/Librerías Nuevas:**
- Google Material Symbols.

---

---

## [2025-12-19] Expansión de Datos y Filtros Dinámicos
**Funcionalidad:**
- Creación de un conjunto de datos robusto para empleos (`jobs.json`).
- Implementación de filtros dinámicos en la página de Empleos.

**Ejecución Técnica:**
- Se creó `src/data/jobs.json` con 15 registros de empleo, incluyendo campos para filtrado: `category`, `contract`, `experience`.
- Se actualizó `Jobs.jsx` para:
    - Importar los datos desde el JSON.
    - Calcular dinámicamente las opciones únicas para cada filtro (Tecnología, Ubicación, Contrato, Experiencia) usando `useMemo` y `Set`.
    - Renderizar los filtros usando elementos `<select>` nativos estilizados para coincidir con el diseño original (reemplazando los botones estáticos).
- Se ajustó el CSS de `Jobs.css` para soportar el diseño de los `select` personalizados.

**Tecnologías/Librerías Nuevas:**
- Manejo de datos JSON estáticos, lógica de filtrado (preparación de opciones).

---

---

## [2025-12-19] Implementación de Lógica de Filtrado y Paginación
**Funcionalidad:**
- Búsqueda en tiempo real por texto (título, empresa, descripción).
- Filtrado combinado por múltiples criterios (Tecnología, Ubicación, Contrato, Experiencia).
- Paginación dinámica que se adapta a la cantidad de resultados filtrados (máx 5 por página).
- Manejo de estado "Sin resultados".

**Ejecución Técnica:**
- Refactorización de `Jobs.jsx` para incluir manejo de estado con `useState`.
- Implementación de lógica de filtrado reactiva con `useMemo` para optimizar rendimiento.
- Lógica de paginación: División del array de resultados filtrados y controles de navegación dinámicos.
- Binding de eventos `onChange` en inputs y selects para actualizar el estado.

**Tecnologías/Librerías Nuevas:**
- Hooks de React: `useState`, `useMemo`, `useEffect` (a fondo).

---

---

## [2025-12-21] Reset a la Versión Inicial
**Funcionalidad:**
- Reversión completa del proyecto al estado inicial.

**Ejecución Técnica:**
- Se ejecutó `git reset --hard 9b9b441` para descartar cambios en el router y paginación personalizada.
- El proyecto vuelve a utilizar `react-router-dom` y la estructura original.

**Tecnologías/Librerías Nuevas:**
- Ninguna (reversión).

---

---

## [2025-12-21] Implementación de Página de Detalles de Oferta
**Funcionalidad:**
- Página dinámica `/jobs/:id` que muestra la información completa de una vacante.
- Navegación fluida: Clic en cualquier oferta del listado lleva a sus detalles.
- Manejo de erroes: Página "Oferta no encontrada" para IDs inválidos.

**Ejecución Técnica:**
- Creación de ruta dinámica utilizando `React Router`.
- Nuevo componente `JobDetails.jsx` con estilos modulares.
- Actualización de `JobCard` para envolver el contenido en un `Link` evitando conflictos con el botón "Aplicar".

---

---

## [2025-12-21] Sincronización de Estado y URL en Jobs
**Funcionalidad:**
- Persistencia total de filtros, paginación y búsqueda en la URL.
- Navegación bidireccional: al cambiar la URL se actualiza la UI y viceversa.
- Permite compartir enlaces con filtros aplicados (ej: `/jobs?q=react&location=remoto&page=2`).

**Ejecución Técnica:**
- Refactorización de `Jobs.jsx` para usar `useSearchParams`.
- Estado derivado directamente de los query params.
- Implementación de **debounce** (300ms) para la búsqueda en tiempo real sin saturar el historial del navegador.

---

---

## [2025-12-21] Implementación de Página de Contacto
**Funcionalidad:**
- Nueva página de contacto accesible desde el Navbar.
- Formulario básico con estilos consistentes.

**Ejecución Técnica:**
- Limpieza y refactorización de `Contact.jsx` (eliminando dependencias externas rotas).
- Creación de ruta `/contact` en `App.jsx`.
- Implementación de estilos vía `Contact.module.css`.

---

---

## [2025-12-21] Refactorización a CSS Modules
**Funcionalidad:**
- Migración completa de estilos globales a **CSS Modules** para cumplir con nuevas reglas de arquitectura.
- Aislamiento de estilos por componente para evitar colisiones.

**Ejecución Técnica:**
- Renombrado de archivos `.css` a `.module.css`.
- Actualización de imports en componentes (`import styles from './Component.module.css'`).
- Refactorización de clases CSS a **camelCase** (ej: `.job-card` -> `.jobCard`).
- Actualización de JSX para usar objeto `styles`.
- Modificación de `JobCard` para aceptar `className` externo (para estilos de lista en `Jobs`).

---

---

## [2025-12-21] Implementación de Búsqueda desde Home
**Funcionalidad:**
- Habilitación del buscador en la página de inicio.
- Filtrado automático en la página de Jobs al llegar desde el Home.

**Ejecución Técnica:**
- `Hero.jsx`: Implementación de redirección programática (`useNavigate`) al enviar el formulario.
- `Jobs.jsx`: Lectura de parámetros de URL (`useLocation`) para inicializar y sincronizar el estado del buscador.

**Tecnologías/Librerías Nuevas:**
- `react-router-dom`: Hooks `useNavigate`, `useLocation`.

---

---

## [2025-12-21] Refactorización de Paginación
**Funcionalidad:**
- Extracción de la lógica de paginación a un componente reutilizable.

**Ejecución Técnica:**
- Se creó `src/components/Pagination.jsx` y `src/components/Pagination.css`.
- Se refactorizó `Jobs.jsx` para utilizar el nuevo componente, eliminando código duplicado.
- Se mantuvieron los estilos originales pero ahora encapsulados.

**Tecnologías/Librerías Nuevas:**
- Ninguna.

---

---

## [2025-12-22] Implementación de Lazy Loading y Suspense
**Funcionalidad:**
- Implementación de carga diferida (Lazy Loading) para las páginas principales, mejorando el tiempo de carga inicial.
- Introducción de componente `Loader` visual durante las transiciones de rutas.

**Ejecución Técnica:**
- `App.jsx`:
    - Sustitución de imports estáticos por `React.lazy`.
    - Envoltorio de rutas con `Suspense` y fallback a `Loader`.
- Creación de componentes:
    - `src/components/Loader.jsx` y `src/components/Loader.module.css`.

**Tecnologías/Librerías Nuevas:**
- React: `lazy`, `Suspense`.

---

---

## [2025-12-22] Implementación de Página 404 (Not Found)
**Funcionalidad:**
- Creación de una página personalizada para rutas no existentes.
- Diseño visual atractivo con animaciones CSS y feedback claro al usuario.
- Botón de retorno al inicio.

**Ejecución Técnica:**
- Componente `NotFound.jsx` con estilos modulares (`NotFound.module.css`).
- Configuración de ruta "catch-all" (`path="*"`) en `App.jsx`.
- Implementación compatible con `React.lazy`.

**Tecnologías/Librerías Nuevas:**
- Animaciones CSS (keyframes).

---

---

## [2025-12-23] Actualización de Metadatos del Proyecto
**Funcionalidad:**
- Renombrado del proyecto en `package.json` de `midujobs` a `3d-hub` para coincidir con la carpeta.

**Ejecución Técnica:**
- Actualización de `name` en `package.json`.
- Actualizado remote origin a `https://github.com/PabloLivian/3D-Hub.git`.

---

---

## [2025-12-23] Mejora de Documentación (README)
**Funcionalidad:**
- Reescritura completa de `README.md` para mejorar la presentación del producto.
- Ajuste: Eliminado logo del README por limpieza visual.

**Ejecución Técnica:**
- Se añadieron secciones de: Características, Tech Stack, Instalación y Estructura del Proyecto.
- Se actualizó con la nueva identidad "3D Hub".

**Tecnologías/Librerías Nuevas:**
- Ninguna.

---


**Tecnologías/Librerías Nuevas:**
- Ninguna.

---

---

### [2025-12-23 11:55] - Actualización de Favicon y Branding
- **Funcionalidad solicitada:** Cambiar el logo de Vite por el nuevo logo de 3D HUB en la pestaña del navegador.
- **Explicación técnica:** 
    - Se creó `public/logo.svg` para la pestaña del navegador, optimizando su viewBox para que se vea lo más grande posible.
    - Se actualizó `index.html` para usar este `/logo.svg`.
    - El logo del Navbar se mantiene con su escalado estándar para un diseño armónico.
    - Se ajustaron estilos en `Navbar.module.css` (gap y tamaño del logo).
    - Se actualizó el contenido de `Features.jsx` para artistas 3D (VFX, Animación y Videojuegos).
- **Tecnologías/Librerías:** SVG, HTML, CSS Modules.

---

---

### [2025-12-23 12:35] - Refactor Página de Empleos 3D
- **Funcionalidad solicitada:** Cambiar la fuente de datos a `jobs3D.json` y rediseñar los filtros de búsqueda.
- **Explicación técnica:** 
    - Se actualizó `Jobs.jsx` para consumir `src/data/jobs3D.json`.
    - Se implementaron 4 nuevos filtros: Especialidad (`Job_Title`), Experiencia (`Experience_Level`), Modalidad (`On_Site_Remote_Hybrid`), y País (`Country`).
    - Se añadió lógica "include" para filtros de valores múltiples (ej: "Mid, Senior").
    - Se agregó botón "Limpiar filtros".
    - Se refactorizó `JobDetails.jsx` para mapear las nuevas propiedades (`ID`, `Studio`, `Notes`, etc.) y corregir la navegación.
- **Tecnologías/Librerías:** React Hooks (`useMemo`, `useSearchParams`).

---

---

### [2025-12-23 12:45] - Actualización de diseño JobCard (Iteración Previa)

---

---

### [2025-12-23 13:00] - Refinamiento de Diseño y Lógica JobCard
- **Commit:** `Refactor: Jobs page update with 3D industry data, final JobCard layout adjustments, and pagination update to 10 items`
- **Funcionalidad solicitada:** Ajuste final de layout y comportamiento de botones.
- **Explicación técnica:**
    - **Layout JobCard:**
        1. Título (Especialidad) + Experiencia
        2. Empresa
        3. Ubicación + Modalidad (en fila)
        4. Descripción
    - **Botón Aplicar:** Se convirtió en un enlace externo (`<a>`) que abre la URL de origen (`Source_Contact`) en nueva pestaña.
    - **Paginación:** Aumentado el límite de empleos por página de 5 a 10.
    - **Botón Limpiar:** Se estilizó con color primario (azul) para mayor visibilidad.
    - **Contador de Resultados:** Se añadió el número total de empleos encontrados en un badge estilizado junto al título.
    - **Filtro Modalidad:** Se actualizó la base de datos `jobs3D.json` para reemplazar "All options" por "On-Site, Remote, Hybrid", normalizando los filtros y la visualización.
    - **Estilos:** Refactorización CSS en `JobCard.module.css` para soportar la nueva estructura de filas.

---

### [2025-12-23 16:30] - Implementación Página de Empresas
- **Commit:** `Implementación de la página de Empresas y optimización de logos`
- **Funcionalidad:** Nueva página `/companies` que lista todos los estudios con ofertas activas.
- **Detalles técnicos:**
    - **Grid:** Layout de 4 columnas (responsive).
    - **Lógica:** Se calculan dinámicamente las ofertas por empresa recorriendo `jobs3D.json`.
    - **Componentes:** `Companies.jsx` (página) y `CompanyCard.jsx` (componente visual).
    - **Logos:** Implementación de avatars para logos de empresa (empezando con DNEG). Se mapean dinámicamente y se muestran centrados en un contenedor estilizado. (Solucionado problema de extensión .png).
    - **Navegación:** Al hacer clic en una tarjeta de empresa, redirige a la página `/jobs` filtrando automáticamente por el nombre de la compañía seleccionada.
    - **Routing:** Añadida la ruta en `App.jsx` con Lazy Loading.

---

### [2025-12-25 18:55] - Actualización de Imagen del Hero
- **Funcionalidad solicitada:** Sustituir la imagen del hero por `HeroImage.webp`.
- **Explicación técnica:**
    - Se actualizó `Hero.module.css` para utilizar `url('../assets/HeroImage.webp')` reemplazando la imagen de Unsplash.


---

### [2025-12-25 19:35] - Implementación de Página de Talento (Artistas)
- **Funcionalidad solicitada:** Página para buscar profesionales con filtros avanzados basada en `artist.json`.
- **Explicación técnica:**
    - Se creó `src/pages/Artists.jsx` con lógica de filtrado directo (Experiencia, Relocalizacion, Ciudad, Disponibilidad, Software).
    - Se creó `src/components/ArtistCard.jsx` y su módulo CSS para visualizar la información del artista.
    - Se implementó la ruta `/artists` (Lazy Loaded) y se añadió al `Navbar` como "Talento".
- **Tecnologías/Librerías:** React Hooks (`useMemo`), CSS Modules.


---

### [2025-12-25 19:40] - Refinamiento de UI en ArtistCard
- **Funcionalidad solicitada:** Mejorar íconos y layout de la tarjeta de artista.
- **Explicación técnica:**
    - Se reemplazaron los Google Material Symbols (texto) por SVGs inline para mayor consistencia visual.
    - Se movió el botón de LinkedIn y el estado de Disponibilidad a la cabecera, junto al nombre del artista.
    - Se ajustó el layout flexbox en `ArtistCard.module.css` para soportar la nueva disposición (`topRow`, `badgesWrapper`).

---

### [2025-12-25 19:43] - Corrección de Componentes Duplicados
- **Problema:** Navbar y Footer se visualizaban dos veces en la página de Artistas.
- **Solución:** Se eliminaron los componentes redundantes en `Artists.jsx`, ya que ahora se gestionan globalmente desde `App.jsx`.

---

### [25/12/2025 19:55] - Actualización de UI y Lógica en Página de Talento
- **Filtros**: Se han alineado todos los filtros en una sola línea en la página de `Artists.jsx` mediante `flex-wrap: nowrap` y scroll horizontal en `Artists.module.css`.
- **Iconografía**: Se actualizó el icono de Relocalización en `ArtistCard.jsx` con un nuevo SVG de avión.
- **Botón Reel**:
    - Se cambió el color del botón "Ver Reel" a un azul (`#2563eb`) distinto al botón de contacto.
    - Se implementó lógica para que el botón siempre sea visible.
    - Si el artista no tiene Reel, el botón aparece deshabilitado, en gris (muted) y con el texto "No Reel".
- **Responsive**: Se ajustaron los anchos mínimos de los selects para optimizar el espacio en la fila de filtros.

### [25/12/2025 20:05] - Ajuste Visual en Filtros
- **Fix**: Se limitó el ancho máximo (`max-width: 200px`) de los selectores de filtro en `Artists.module.css` para evitar que opciones con texto muy largo (como en Software) rompan la maquetación.

### [25/12/2025 20:07] - Refinamiento de Estilos en ArtistCard
- **Botón Reel**: Se aclaró el color azul (`#60a5fa`) para un toque más suave ("azul clarito").
- **Card**: Se eliminó el efecto de elevación y sombra al hacer hover (`transform` y `box-shadow`) para una interfaz más plana y estática.

### [25/12/2025 20:15] - Corrección de Enlaces de LinkedIn
- **Fix**: Se limpiaron los enlaces de LinkedIn en `artist.json` eliminando textos que no eran URLs (ej: "Nombre | LinkedIn") que causaban enlaces rotos.
- **UI**: Se optimizó la lógica en `ArtistCard.jsx` para asegurar que solo se muestren enlaces de LinkedIn válidos.

### [25/12/2025 20:10] - Actualización de Datos y Funcionalidad
- **Data Update**: Se normalizó la base de datos `artist.json`, estableciendo el campo `Disponibilidad` a "Available" para todos los registros.
- **Filtros**: 
    - Se añadió la opción "20+ años" en el filtro de experiencia.
    - Se estilizó el botón "Limpiar Filtros" para coincidir con el diseño de la página de Jobs (fondo azul sólido).

### [25/12/2025 20:40] - Implementación de Formulario "Join the Squad"
- **Funcionalidad**: Nueva página `/join` accesible desde la sección de Talento.
- **Formulario**: Permite a los artistas postularse rellenando un perfil completo (Nombre, Rol, Reel, LinkedIn, Disponibilidad, etc.).
- **UI**: Diseño limpio y centrado, coherente con el estilo de la aplicación (`JoinList.module.css`).
- **Navegación**: Botón "Join to the list" añadido en la cabecera de `Artists.jsx`.

### [25/12/2025 20:45] - Refinamiento de UX en Formulario y Navegación
- **Join Form**:
    - Se implementaron listas dinámicas (`<DynamicList />`) para los campos de "Software" e "Industrias", permitiendo añadir múltiples etiquetas visuales (chips) en lugar de texto plano.
    - Se establecieron opciones neutras ("Selecciona...") por defecto en todos los desplegables.
- **Artists Page**:
    - Se rediseñó el botón "Join to the list": Ahora es verde (`#10b981`), más grande y con mayor peso visual (`font-weight: 700`).
    - Se ajustó la posición del botón para estar más cerca del título "Talento 3D".

### [25/12/2025 20:50] - Correcciones de Layout y Posicionamiento
- **Artists Page**: Se reestructuró la cabecera para que el botón "Join to the list" aparezca inmediatamente a la derecha del título principal `<h1>` (usando un contenedor flex inline), en lugar de estar separado o al lado del subtítulo.
- **Join Form**: 
    - Se corrigió el estilo del grupo de input (`.listInputGroup`) en listas dinámicas. Ahora el input ocupa el espacio restante (`flex: 1`) evitando que el botón "+ Añadir" rompa la línea visualmente.
### [27/12/2025 12:45] - Adición de campo CV con validación de tamaño
- **Funcionalidad**: Se añadió un campo para subir el CV en el formulario de "Join the Squad", debajo del campo Reel.
- **Validación**: Implementada validación de tamaño máximo de 20MB. Si el archivo excede este límite, se muestra un mensaje de error en rojo y el campo se resetea.
- **Diseño**:
    - Se añadió el input de tipo `file` con estilos personalizados en `JoinList.module.css`.
    - El campo acepta formatos `.pdf`, `.doc` y `.docx`.
- **Explicación técnica**:
    - Se actualizó el estado `formData` para incluir la propiedad `cv`.
    - Se creó la función `handleFileChange` para gestionar la selección de archivos y la validación de bytes (20 * 1024 * 1024).
### [27/12/2025 13:00] - Refactorización de Navbar (Sticky & Glassmorphism)
- **Funcionalidad**: Se modificó la barra de navegación para que sea "sticky" y permanezca visible al hacer scroll.
- **Cambios UI**:
    - **Efecto Scroll**: Al bajar más de 20px, el navbar reduce ligeramente su altura y aplica un fondo semitransparente con efecto de desenfoque (`backdrop-filter: blur`).
    - **Botón Eliminado**: Se eliminó el botón "Publicar un empleo" a petición del usuario.
- **Implementación**:
    - `Navbar.jsx`: Añadido listener de evento `scroll` para gestionar el estado `isScrolled`.
### [27/12/2025 13:10] - Corrección de Temblor en Navbar (Position Fixed)
- **Problema**: El uso de `position: sticky` junto con la animación de altura causaba un bucle de redimensionado (jitter) al hacer scroll cerca del límite.
- **Solución**: Se cambió la estrategia a `position: fixed`.
- **Implementación**:
    - `Navbar.module.css`: Cambiado a `position: fixed`.
    - `index.css`: Añadido `padding-top: var(--header-height)` (80px) al `body` para compensar la altura del navbar fijo y evitar que el contenido se oculte.
    - Esta separación desacopla completamente la animación del navbar del flujo del documento, eliminando cualquier posibilidad de temblor.

### [27/12/2025 13:30] - Implementación de Paginación en Página de Artistas
- **Funcionalidad**: Se integró el sistema de paginación en `/artists` para mejorar la navegación entre la lista de profesionales.
- **Detalles técnicos**:
    - Se reutilizó el componente `Pagination.jsx`.
    - Se implementó estado local (`currentPage`) que se resetea al cambiar los filtros.
    - Se configuró a 12 artistas por página (`ITEMS_PER_PAGE`).
    - Se añadió scroll automático al inicio al cambiar de página.

### [27/12/2025 13:35] - Corrección de Error de Sintaxis en Artists.jsx
- **Bug Fix**: Se corrigió un error de duplicación de código generado durante la implementación de la paginación que causaba que la página fallara.
- **Detalle**: Se eliminaron líneas redundantes en el cierre del hook `useMemo` y `filter`.

### [27/12/2025 17:05] - Corrección de Persistencia de Scroll
- **Funcionalidad**: Se implementó un componente `ScrollToTop` para asegurar que la vista vuelva al inicio (top: 0) cada vez que el usuario navega entre rutas.
- **Detalles técnicos**:
    - Componente creado: `src/components/ScrollToTop.jsx`.
    - Integración: Añadido dentro de `BrowserRouter` en `App.jsx` para escuchar cambios en `pathname`.

---

### [27/12/2025 17:05] - COMMIT: Mejora de Navegación, Paginación y Formulario
**Resumen de Cambios:**
- **Formulario Join**: Nuevo campo de subida de CV con validación de 20MB.
- **Navbar**: Rediseño a `position: fixed` con efecto de desenfoque e hidratación de altura en scroll.
- **Talento (Artists)**: Paginación de resultados (12 por página) e integración del componente `Pagination`.
- **Global**: Corrección de persistencia de scroll mediante el componente `ScrollToTop`.
- **Fixes**: Corrección de errores de sintaxis y bug de temblor (jitter) en el header.
