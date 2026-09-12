# Arquitectura de Agendiantil

Documentación final del taller de **Expo Router** para la aplicación móvil académica **Agendiantil**.

---

## 1. Wireframe

La aplicación Agendiantil tiene dos pestañas principales:

- **Inicio**
- **Tareas**

Desde **Inicio** se puede:

- Ver el resumen de tareas pendientes.
- Ver próximas entregas.
- Abrir el modal "Nueva tarea".
- Navegar al detalle de una tarea mediante una ruta dinámica.

Desde **Tareas** se puede:

- Buscar tareas.
- Ver la lista de tareas.
- Seleccionar una tarea para abrir su detalle.

> **Referencia:**

> Wireframe de Agendiantil: `agendiantil-wireframe.png`

*Nota: si el archivo no existe aún en el proyecto, deberá agregarse posteriormente en la raíz del proyecto.*

---

## 2. Estructura de navegación

```
app/
├── (tabs)/
│   ├── _layout.tsx
│   ├── index.tsx
│   └── tasks.tsx
├── +not-found.tsx
├── _layout.tsx
├── modal.tsx
└── task/
    └── [id].tsx
```

Explicación de cada elemento:

- **`app/_layout.tsx`** — Layout raíz; utiliza `Stack` para registrar las pantallas principales: `(tabs)`, `modal` y `task/[id]`.
- **`(tabs)`** — Representa las pestañas principales. El nombre entre paréntesis indica un *grupo* que no forma parte de la URL.
- **`app/(tabs)/_layout.tsx`** — Configura el navegador `Tabs` con las pestañas Inicio y Tareas.
- **`app/(tabs)/index.tsx`** — Pantalla **Inicio** (ruta `/`).
- **`app/(tabs)/tasks.tsx`** — Pantalla **Tareas** (ruta `/tasks`).
- **`app/modal.tsx`** — Flujo **Nueva tarea**, presentado como modal (ruta `/modal`).
- **`app/task/[id].tsx`** — **Ruta dinámica**: `[id]` captura un parámetro de la URL (`/task/1024`, `/task/1025`, ...).
- **`app/+not-found.tsx`** — Maneja rutas que no existen (página 404).

---

## 3. Flujo de navegación

```
Agendiantil
    |
    +-- Inicio
    |     |
    |     +-- Nueva tarea
    |     |      |
    |     |      +-- /modal
    |     |
    |     +-- Ver detalle de tarea 1024
    |            |
    |            +-- /task/1024
    |                   |
    |                   +-- useLocalSearchParams()
    |                          |
    |                          +-- id = 1024
    |
    +-- Tareas
          |
          +-- Seleccionar tarea
                 |
                 +-- /task/[id]
```

### Tipos de navegación utilizados

- **Navegación declarativa** con `<Link href="/modal" asChild>`: se usa para abrir el modal desde Inicio. El enlace declara su destino en el JSX y el router se encarga de la transición.
- **Navegación programática** con `useRouter()` y `router.push('/task/1024')`: permite navegar desde código (por ejemplo, al presionar una tarjeta de tarea), sin necesidad de declarar el destino en el JSX.
- **Lectura del parámetro dinámico** con `useLocalSearchParams()`: dentro de `task/[id].tsx` devuelve el objeto `{ id: '1024' }` correspondiente a la URL `/task/1024`, demostrando que la ruta dinámica funciona.

---

## 4. Análisis arquitectónico

La aplicación sigue el convenio de **Expo Router**: `app/` funciona como sistema de rutas, mientras `src/` contiene elementos reutilizables como `components`, `constants` y `hooks`.

### Ventajas de la arquitectura actual

1. **Cero fricción con Expo Router** y fácil crecimiento de rutas: agregar una pantalla es tan simple como crear un archivo dentro de `app/`.
2. **Es simple de entender** para un proyecto pequeño: la relación archivo → ruta es inmediata.

### Desventajas de la arquitectura actual

1. **La lógica relacionada con tareas está distribuida** entre varias pantallas (`index.tsx`, `tasks.tsx`, `[id].tsx` y `modal.tsx`).
2. **La reutilización y el testeo pueden resultar más difíciles** cuando el proyecto crece, al estar los componentes acoplados a cada pantalla.

---

## 5. Propuesta Feature-First

Se analizó una reorganización opcional denominada **arquitectura Feature-First**, que organiza el código por funcionalidades de negocio y permite mantener `app/` principalmente como capa de navegación.

```
app/
├── (tabs)/
├── task/
├── modal.tsx
├── +not-found.tsx
└── _layout.tsx

src/
├── features/
│   ├── tasks/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── constants/
│   └── home/
│       ├── components/
│       ├── hooks/
│       ├── types/
│       └── constants/
├── components/
├── constants/
├── hooks/
└── global.css
```

En esta propuesta, cada **feature** (por ejemplo, `tasks` o `home`) agrupa todo lo relacionado con su funcionalidad: componentes, hooks, servicios, tipos y constantes. `app/` queda reservado únicamente para las pantallas delgadas que definen la navegación.

### Ventajas

1. **Mayor cohesión y mantenibilidad**: todo lo de una funcionalidad vive en un solo módulo.
2. **Mayor escalabilidad y modularidad**: agregar nuevas features no altera las existentes.

### Desventajas

1. **Mayor complejidad y estructura inicial** para proyectos pequeños.
2. **Mayor esfuerzo de configuración y de convenciones** (límites entre features, reglas de dependencias, boilerplate).

> **Importante:** Feature-First es una **propuesta analizada, no implementada** en el proyecto actual.

---

## 6. Conclusión personal

Para Agendiantil, la arquitectura actual es suficiente mientras el proyecto sea pequeño y académico. Sin embargo, si la aplicación crece con funcionalidades como calendario, exámenes, usuarios o una base de datos real, Feature-First sería más conveniente porque permitiría agrupar cada funcionalidad y mantener las rutas limpias.