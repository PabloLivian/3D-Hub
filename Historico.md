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

# Bitácora de Desarrollo - MiduJobs

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

### [2025-12-23 12:45] - Actualización de diseño JobCard (Iteración Previa)

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

## [2025-12-21] Reset a la Versión Inicial
**Funcionalidad:**
- Reversión completa del proyecto al estado inicial.

**Ejecución Técnica:**
- Se ejecutó `git reset --hard 9b9b441` para descartar cambios en el router y paginación personalizada.
- El proyecto vuelve a utilizar `react-router-dom` y la estructura original.

**Tecnologías/Librerías Nuevas:**
- Ninguna (reversión).

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

## [2025-12-21] Implementación de Página de Contacto
**Funcionalidad:**
- Nueva página de contacto accesible desde el Navbar.
- Formulario básico con estilos consistentes.

**Ejecución Técnica:**
- Limpieza y refactorización de `Contact.jsx` (eliminando dependencias externas rotas).
- Creación de ruta `/contact` en `App.jsx`.
- Implementación de estilos vía `Contact.module.css`.

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


## [2025-12-23] Actualización de Metadatos del Proyecto
**Funcionalidad:**
- Renombrado del proyecto en `package.json` de `midujobs` a `3d-hub` para coincidir con la carpeta.

**Ejecución Técnica:**
- Actualización de `name` en `package.json`.
- Actualizado remote origin a `https://github.com/PabloLivian/3D-Hub.git`.

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
