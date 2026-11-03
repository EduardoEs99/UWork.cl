# UWork — talento universitario para trabajos a tu medida

UWork conecta a estudiantes de educación superior con oportunidades de trabajo flexible y ayuda a empresas y personas a encontrar apoyo para tareas, turnos y proyectos.

Este repositorio contiene el sitio web de presentación, desarrollado con Astro, React y Tailwind CSS.

## Vista previa

| Inicio                                        | Servicios                                                         |
| --------------------------------------------- | ----------------------------------------------------------------- |
| ![Portada de UWork](public/previews/home.jpg) | ![Servicios para empresas de UWork](public/previews/services.jpg) |

![Página para estudiantes de UWork](public/previews/students.jpg)

## Demo en vivo

[Ver UWork](https://eduardoes99.github.io/UWork.cl/)

## Acerca del proyecto

El sitio presenta las soluciones de UWork para empresas, personas y estudiantes, incluyendo información sobre los servicios, procesos de participación y oportunidades de trabajo flexible.

Incorpora componentes interactivos, perfiles estudiantiles, indicadores animados, testimonios, preguntas frecuentes y páginas de autenticación.

El repositorio corresponde a una implementación frontend. Los formularios y las pantallas de autenticación son demostrativos y no están conectados a un backend.

## Características principales

- Carrusel interactivo de perfiles estudiantiles.
- Secciones de servicios para empresas y personas.
- Indicadores numéricos animados y testimonios.
- Página dedicada a estudiantes.
- Formularios de contacto, inicio de sesión y registro.
- Diseño responsive para escritorio y dispositivos móviles.

## Tecnologías

- **Astro 7:** generación de páginas estáticas.
- **React 19:** componentes interactivos.
- **Tailwind CSS 4:** estilos y diseño responsive.
- **Swiper:** carruseles interactivos.
- **Lucide React:** iconografía.
- **pnpm:** gestión de dependencias.

## Estructura del proyecto

```text
src/
├── assets/       # Recursos gráficos
├── components/   # Componentes de interfaz
├── layouts/      # Plantillas de páginas
├── lib/          # Utilidades compartidas
├── pages/        # Páginas y rutas
└── styles/       # Estilos
public/previews/  # Capturas del proyecto
```

## Desarrollo local

Requiere Node.js 22.22 o superior y pnpm.

Instalar dependencias:

```bash
pnpm install
```

Iniciar entorno de desarrollo:

```bash
pnpm dev
```

El proyecto estará disponible en `http://localhost:4321/`.

Comprobar el proyecto:

```bash
pnpm check
```

## Compilación y despliegue

El proyecto utiliza GitHub Pages para alojar la versión estática de producción.

**Generar la compilación:**

```bash
pnpm build --base /UWork.cl/
```

Los archivos generados se almacenan en el directorio `dist/`.

**Publicar en GitHub Pages:**

```bash
pnpm dlx gh-pages -d dist -b gh-pages
```

El despliegue utiliza la rama `gh-pages` como destino de publicación.

La compilación y el despliegue son procesos independientes: ejecutar `pnpm build` no publica automáticamente los cambios.

**Sitio publicado:** [UWork.cl](https://eduardoes99.github.io/UWork.cl/)
