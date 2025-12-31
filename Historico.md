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

### [27/12/2025 17:15] - Implementación de Menú Hamburguesa (Responsive Navbar)
- **Funcionalidad**: Se añadió soporte para navegación móvil mediante un menú desplegable tipo hamburguesa.
- **Detalles técnicos**:
    - `Navbar.jsx`: Control de estado `isMenuOpen` para mostrar/ocultar el menú.
    - `Navbar.module.css`: Media queries para ocultar el menú de escritorio y mostrar el botón hamburguesa en pantallas < 768px.
    - Animación CSS para transformar el icono de 3 líneas en una "X" al abrirse.

### [27/12/2025 17:20] - Optimización de Layout (Hero Overlay)
- **Funcionalidad**: Se ajustó el layout para eliminar el hueco blanco superior en la Home, permitiendo que el Navbar se superponga al Hero.
- **Detalles técnicos**:
    - `index.css`: Eliminado `padding-top` global del body. Creada clase de utilidad `.page-wrapper`.
    - `Hero.module.css`: Aumentado padding superior para compensar (8rem + header height).
    - **Páginas**: Se aplicó `.page-wrapper` a `Jobs`, `Companies`, `Contact`, `JobDetails` y `NotFound` para mantener el espaciado correcto en el resto de la app.

### [27/12/2025 17:25] - Corrección de Padding en Página de Join
- **Bug Fix**: La página `/join` no estaba aplicando correctamente el padding superior porque usaba una clase local en lugar de la global `.page-wrapper`.
- **Solución**: Se actualizó `JoinList.jsx` para implementar la clase de utilidad global, corrigiendo la superposición del navbar sobre el formulario.

### [27/12/2025 17:30] - Refactorización Final de Espaciado (Fix Overlap)
- **Problema**: La combinación de clases `className={"page-wrapper " + styles.page}` causaba conflictos de especificidad CSS, anulando el padding superior en algunas páginas.
- **Solución**: Se refactorizaron `Contact`, `Companies`, `JobDetails`, `JoinList` y `NotFound` para usar un `div` contenedor externo exclusivo con la clase `.page-wrapper`. Esto aísla la lógica de espaciado global de los estilos locales de cada componente, garantizando consistencia.

### [27/12/2025 17:35] - Reparación de Errores de Sintaxis en JoinList
- **Problema**: Ediciones previas dejaron etiquetas `<div>` mal cerradas y bloques de retorno rotos en `JoinList.jsx`.
- **Solución**: Se reescribió el componente `JoinList` y se verificaron `Companies` y `JobDetails` para asegurar que el JSX sea válido y el flujo de navegación post-envío funcione correctamente.

### [27/12/2025 17:40] - Corrección de Solapamiento en Jobs.jsx
- **Problema**: La página de empleos seguía mostrando el navbar superpuesto debido a la combinación de clases CSS en un mismo elemento.
- **Solución**: Se aplicó la misma refactorización que en las otras páginas, envolviendo el contenido de `Jobs.jsx` en un `div` con la clase `.page-wrapper` exclusivo.

### [27/12/2025 17:45] - Mejora de Filtros en Móvil (Artists.jsx)
- **Problema**: Los filtros en la página de artistas se apilaban verticalmente en una sola columna, resultando poco estéticos.
- **Solución**: Se implementó un grid de 2 columnas para los filtros en dispositivos móviles y se ajustó el botón de "Limpiar Filtros" para ocupar todo el ancho, mejorando la usabilidad y el diseño.

### [27/12/2025 19:15] - Resaltado de Enlace Activo en Navbar
- **Funcionalidad**: Se añadió lógica visual para resaltar la página actual en la barra de navegación.
- **Implementación**:
    - Se usó el hook `useLocation` en `Navbar.jsx` para detectar la ruta actual.
    - Se creó la función `isActive` para asignar condicionalmente la clase `.active`.
    - Se definieron los estilos `.active` (color primario y mayor peso de fuente) en `Navbar.module.css`.

### [27/12/2025 19:40] - Degradado en Título del Hero
- **Cambio**: Se aplicó un degradado lineal al texto "huella digital" en la página de inicio.
- **Detalles Técnicos**:
    - Se refactorizó `Hero.jsx` para envolver "huella digital" en un `<span>` con la clase `gradientText`.
    - Se aplicó `background: linear-gradient(to right, #2664eb, #5fa3f9)` con `background-clip: text` en `Hero.module.css`.
    - Se mejoró el `line-height` del título para evitar solapamientos visuales.

### [27/12/2025 21:35] - Adición de Enlace "Registrarse" en Navbar
- **Cambio**: Se añadió un enlace de texto para el registro de usuarios.
- **Detalles**:
    - Se insertó `<Link to="/register">` a la izquierda del botón de inicio de sesión.
    - Se aplicaron estilos específicos para que aparezca como texto simple (sin forma de botón) con efecto hover en azul.

### [27/12/2025 22:15] - Expansión de Variables CSS y Commit de Finalización
- **Cambio**: Actualización profunda de `index.css` con nuevas variables semánticas de color para botones, fondos y componentes.
- **Commit**: Realizado commit final de la sesión: "Refinando UI: Enlaces activos, Registro en Navbar, degradado en Hero y nuevas variables CSS".
- **Archivos Incluidos**:
    - `src/index.css` (Variables actualizadas).
    - `src/components/Navbar.jsx` / `.module.css` (Lógica de enlace activo y Registro).
    - `src/components/Hero.jsx` / `.module.css` (Degradado en título).
    - `src/pages/Jobs.jsx` y `src/pages/JoinList.jsx` (Correcciones de sintaxis y disposición).

---

### [2025-12-28 18:58] - Creación de Archivo TODO.md
- **Funcionalidad solicitada:** Crear un archivo de "to do".
- **Explicación técnica:**
    - Se creó el archivo `TODO.md` en la raíz del proyecto para centralizar las tareas pendientes y la hoja de ruta del desarrollo.
    - Se incluyeron secciones de prioridad alta (Login, Registro, Auth), funcionalidades core, mejoras de UI/UX y mantenimiento.
- **Tecnologías/Librerías:** Markdown.

### [2025-12-31] Refactorización a Variables CSS Globales
- **Funcionalidad Solicitada:** Implementar un sistema de variables CSS globales para la gestión de colores, facilitando cambios futuros desde un único punto (`index.css`).
- **Cambios Realizados:**
    - **index.css:** Se definieron variables semánticas (ej: `--background-navbar`, `--background-card`, `--background-button`) mapeando los colores hexadecimales existentes.
    - **Componetización de Estilos:** Se refactorizaron los archivos `.module.css` de `Navbar`, `Jobs`, `JobCard`, `Companies`, `Hero`, `Features`, `Pagination`, `Artists`, `ArtistCard` y `Footer` para sustituir valores hardcodeados por `var(--variable)`.
    - **Página de Talento:** Se aplicó `--background-card` a las tarjetas de artistas y se normalizaron los fondos de las secciones con `--background-primary`.
    - **Páginas Jobs y Companies:** Se agregó explícitamente `background-color: var(--background-primary)` y `min-height: 100vh` a los contenedores principales de estas páginas para asegurar consistencia con el tema oscuro.
    - **Página de Talento:** Se aplicó `--background-search` al input de búsqueda. Se reestructuró el diseño para alinearlo con la página de Jobs: eliminación del borde separador, centrado del encabezado, buscador y filtros, y ampliación del ancho del buscador (`max-width: 64rem`). Además, se unificó el ancho de la lista de artistas con el de empleos, cambiando la rejilla por una columna centrada de `64rem`.
    - **Página de Talento:** Se añadió un icono de lupa (`search`) al buscador y se ajustó el espaciado interno del input para mejorar la legibilidad y la consistencia con otros buscadores del sitio.
    - **Artist Card:** Se corrigió el color del nombre del artista para usar `--text-light`.
    - **Página JobDetails:** Se integraron las variables `--background-primary`, `--background-card` y `--background-chip-grey`, y se ajustaron los colores de texto.
    - **Chips:** Se actualizaron los colores de fondo de los chips (`--background-chip-blue`, `--background-chip-grey`, etc.) a tonos oscuros (`#1e293b`). También se ajustó el chip de "Available" para usar un fondo verde semitransparente oscuro (`rgba(16, 185, 129, 0.1)`) con borde sutil, integrándose mejor en el modo oscuro.
    - **Botón Join to the list:** Se cambió el verde brillante hardcodeado por la variable `--background-button` (azul del tema) para mantener la consistencia visual.
    - **Página Jobs:** Se actualizó el formato del contador de resultados. También se rediseñaron los filtros para incluir etiquetas superiores y opciones por defecto "Cualquiera/Todos", alineándose con la página de Artistas.
    - **Página JoinList:** Se actualizaron los estilos para utilizar las variables del tema oscuro (`--background-primary`, `--background-card`, `--background-search`) y los colores de botones y chips consistentes con el resto de la aplicación.
    - **Página JoinList:** Se actualizaron los colores de los inputs para corregir la legibilidad (texto claro sobre fondo oscuro), se estilizó el placeholder y se destacó el cursor de escritura (`caret-color`) para mejorar la UX y la estética.
    - **Filtros (Jobs y Artists):** Se unificó el estilo de interacción (hover) utilizando la variable `--background-filter-hover` (ajustada a `#1e293b`) para proporcionar una respuesta visual consistente y "bonita" en ambas páginas.
    - **Tarjetas de Empleo:** Se eliminó el degradado azul claro del hover en la lista de empleos y se reemplazó por el color oscuro consistente (`--background-filter-hover`) para mejorar la estética en el tema oscuro.
    - **Hero:** Se añadió un borde (`var(--outline)`) al buscador principal para unificar el estilo con el resto de los inputs del sitio.
    - **Página de Contacto:** Se refactorizó `Contact.jsx` para usar CSS Modules (`Contact.module.css`), eliminando clases globales. Se aplicaron los colores del tema oscuro (fondos, textos, inputs y botones) tanto en la página como en el componente de formulario. Además, se configuraron los placeholders de los inputs para usar la variable `--text-muted` con opacidad reducida y se añadió padding general (`4rem 1.5rem`) al contenedor de la página para mejorar el espaciado.
    - **Filtros (Jobs):** Se añadió el borde (`var(--outline)`) a los selectores de filtro en la página de Empleos para igualar el estilo de la página de Talento.
    - **Tema Claro (Refinado):** Se implementó un esquema de colores "Light Theme" bajo el selector `[data-theme="light"]`. Se utilizó una paleta "Slate" (grises azulados y blancos) para asegurar una estética moderna y premium (`--background-primary: #f8fafc`, `--background-card: #ffffff`, `--text-light: #0f172a`), permitiendo alternar entre temas.
    - **Toggle de Tema:** Se creó el contexto `ThemeContext` y el componente `ThemeToggle` (botón con icono sol/luna) integrado en la Navbar (escritorio y móvil) para permitir al usuario cambiar fácilmente entre modo claro y oscuro.
    - **Limpieza (Code Cleanup):** Se eliminaron bloques de comentarios obsoletos y código no utilizado en `src/index.css` relacionados con antiguas implementaciones de media queries para el modo oscuro, ya que ahora se gestiona vía `data-theme`.
    - **Hero:** Se aplicó `text-wrap: balance` al subtítulo para que el texto se distribuya equilibradamente en dos líneas de anchura similar, mejorando la estética y legibilidad.
    - **Página de Talento:** Se redujo el espacio vertical entre la sección de filtros y el contador de resultados para mejorar el flujo visual y la densidad de información.
    - **Variables Clave:**
        - `--text-light`: `#e2e8f0` (Suavizado desde blanco puro)
        - `--background-navbar`: `#141924`
        - `--background-primary`: `#0a101c`
        - `--background-card`: `#151b26`
        - `--outline`: `#202836`
    - **Bordes:** Se reemplazaron todas las definiciones de bordes estructurales (`border`, `border-bottom`, etc.) en toda la aplicación para utilizar la variable global `--outline`, unificando el estilo de los contornos.
- **Explicación Técnica:**
        - `--background-navbar`: `#101922`
        - `--background-primary/card`: `#ececec`
        - `--background-button`: `#1173d4`
        - `--background-search`: `#ffffff`
        - `--background-filter`: `#f3f4f6`
- **Explicación Técnica:**
    - Se realizó un mapeo exhaustivo de los colores usados en la UI.
    - Se reemplazaron ocurrencias específicas en bordes, fondos y textos para asegurar consistencia con el Design System solicitado.
- **Tecnologías:** CSS Custom Properties (Variables CSS).

---

### [2025-12-31] Estandarización de Navbar (Solución Variables Globales)
- **Funcionalidad Solicitada:** Centralizar la configuración de colores de la Navbar en `index.css` manteniendo su estética oscura fija.
- **Explicación Técnica:**
    - Se definieron nuevas variables específicas en el `:root` de `index.css`: `--navbar-bg`, `--navbar-border`, `--navbar-text`, `--navbar-mobile-bg`, `--navbar-scrolled-bg`, `--navbar-button-hover`.
    - Estas variables contienen los valores hexadecimales del tema oscuro y **no se sobrescriben** en el bloque de tema claro.
    - Se refactorizó `Navbar.module.css` para consumir estas variables exclusivas en lugar de las genéricas (`--background-navbar`, etc.), permitiendo al usuario modificar toda la paleta del Navbar desde un único archivo (`index.css`) sin afectar al resto de la UI.
- **Tecnologías:** CSS Variables (CSS Custom Properties).

---


---

### [2025-12-31] Refactorización de Layout y Fondo Global
- **Problema:** Solución anterior (aplicar fondo al wrapper) era incompleta. El usuario sugirió correctamente enfocarlo en el padding y delegar el fondo al contenedor principal.
- **Solución Final:**
    - **Global Body:** Se cambió el `background-color` del `body` en `index.css` de `var(--background-light)` a `var(--background-primary)`. Esto asegura que el "lienzo" base de la aplicación siempre coincida con el tema (Oscuro/Claro), eliminando el hueco blanco detrás del Navbar al hacer scroll.
    - **Page Wrapper:** Se simplificó la clase `.page-wrapper` para que su TAREA ÚNICA sea aplicar el `padding-top` necesario para compensar el Navbar fijo. Se eliminaron propiedades redundantes (`display: flex`, backgrounds locales).
- **Archivos Afectados:** `src/index.css`.

---

### [2025-12-31] Limpieza y Organización de index.css
- **Objetivo:** Eliminar variables no utilizadas y exceso de comentarios tras la refactorización de la Navbar.
- **Cambios:**
    - Se eliminó la variable `--background-navbar` (obsoleta en favor de las variables específicas `--navbar-*`).
    - Se eliminó el bloque de comentarios explicativos redundantes en la sección `[data-theme="light"]`.
    - Se reorganizaron las variables CSS en secciones claras (COLORS, BACKGROUNDS, UI ELEMENTS, NAVBAR, etc.) para mejorar la legibilidad.
    - Se condensaron las clases de utilidad `.flex`, `.gap`, etc., para reducir el ruido visual.
- **Resultado:** Archivo `src/index.css` más limpio y mantenible.

---

### [2025-12-31] Corrección de Error de Sintaxis en index.css
- **Bug Fix:** Se añadió la llave de cierre `}` faltante al final de `src/index.css`, que causaba un error de sintaxis en el bloque `[data-theme="light"]`.
- **Explicación:** El bloque de estilos del tema claro quedaba abierto, lo que podía afectar la cascada de estilos o causar errores de parseo CSS.

### [2025-12-31] Limpieza de Variables CSS
- **Cleanup:** Se eliminaron las variables `--background-light` y `--background-dark` de `src/index.css` tras verificar que no se estaban utilizando en ninguna parte del proyecto.
- **Detalle:** Estas variables eran remanentes de una iteración anterior del diseño.

---

### [2025-12-31] Reorganización de Variables Light Theme
- **Refactor:** Se reagruparon las variables CSS del bloque `[data-theme="light"]` en `src/index.css` para que coincidan con la estructura y comentarios de sección del tema oscuro (`COLORS`, `BACKGROUNDS`, `UI ELEMENTS`, `NAVBAR`, `BORDERS`, `TEXT`), facilitando la comparación y el mantenimiento.

---

### [2025-12-31] Corrección de Color Navbar Scrolled
- **UI Fix:** Se actualizó el valor de `--navbar-scrolled-bg` a `rgba(20, 25, 36, 0.8)` para que el color base coincida exactamente con el hexadecimal de `--navbar-bg` (`#141924`), asegurando consistencia visual cuando el menú se vuelve transparente.

---

### [2025-12-31] Unificación de Placeholders Globales
- **Refactor:** Se creó la variable CSS `--text-placeholder` en `index.css` (exclusiva para este fin) para centralizar el color de los textos de sugerencia.
- **Implementación:** Se aplicó una regla global `::placeholder` para todos los inputs y textareas de la aplicación.
- **Limpieza:** Se eliminaron las reglas locales de placeholder en `Contact.module.css` y `JoinList.module.css`.

---

### [2025-12-31] Implementación de Transición Suave de Tema
- **UX Improvement:** Se añadieron reglas de transición CSS (`transition: 0.3s ease`) globales en `index.css`.
- **Detalle:** Se aplica a `body` y elementos comunes (`div`, `button`, texts, etc.) para las propiedades `background-color`, `color`, `border-color`, `box-shadow`, `fill`, `stroke`. Esto suaviza el cambio visual al alternar entre modo claro y oscuro.

---

### [2025-12-31] Nueva Variable CSS: --svg-muted
- **Feature:** Se creó la variable `--svg-muted` para el manejo de color de iconos en estado deshabilitado/muted.
- **Valores:**
    - Dark Theme: `#94a3b8` (Un tono slate claro para visibilidad sobre fondo oscuro).
    - Light Theme: `#64748b` (Coincide con `--text-muted` estándar).

---

### [2025-12-31] Aplicación de --svg-muted en LinkedIn
- **UI Update:** Se actualizó `ArtistCard.module.css` para que el icono de LinkedIn deshabilitado (cuando no hay enlace) utilice la variable global `--svg-muted`.
- **Beneficio:** Asegura que el icono "apagado" tenga siempre el contraste correcto según el tema activo (oscuro/claro).

---

### [2025-12-31] Reordenamiento de index.css
- **Refactor:** Se movió el bloque de estilos del tema claro (`[data-theme="light"]`) justo debajo del bloque `:root` (tema oscuro/default).
- **Objetivo:** Mejorar la legibilidad y mantenimiento, manteniendo las definiciones de variables de ambos temas agrupadas al inicio del archivo.

---

### [2025-12-31] Unificación de Estilos de Search Bar
- **UI UX:** Se replicó el estilo de foco (`outline: 2px solid var(--primary)`) de la barra de búsqueda de Empleos en el resto de buscadores (`Home` y `Artists`).
- **Objetivo:** Consistencia visual en los elementos interactivos de búsqueda.

---

### [2025-12-31] Corrección de Foco en Hero
- **Bug Fix:** Se ajustó `Hero.module.css` para aplicar el outline de foco al contenedor padre (`.searchForm`) usando `:focus-within`, en lugar de al input interno.
- **Detalle:** Esto evita que el outline aparezca "dentro" de la caja de búsqueda, unificando la apariencia con el resto de inputs.

---

### [2025-12-31] Ajuste Hover Card Empresas
- **UI Tweaks:** Se cambió el color del borde al hacer hover en las tarjetas de empresas (`Companies.module.css`) a `var(--primary)` para mantener la consistencia con el azul corporativo.

---
