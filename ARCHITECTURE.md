# Arquitectura de Agendiantil

## 1. Wireframe de Navegación

El wireframe de navegación diseñado en la Fase 1 representa las principales pantallas y conexiones de la aplicación móvil Agendiantil.

![Wireframe de Agendiantil](./agendiantil-wireframe.png)

La aplicación cuenta con dos pestañas principales:

- **Inicio:** muestra el resumen de tareas y próximas entregas.
- **Tareas:** permite consultar y buscar las tareas registradas.

Desde estas pantallas se puede acceder a la creación de una nueva tarea mediante una pantalla modal y consultar el detalle de una tarea mediante una ruta dinámica.

---

## 2. Explicación del Flujo

La aplicación utiliza **Expo Router**, por lo que la navegación se organiza mediante archivos y carpetas dentro de `app/`.

La estructura principal de navegación es:

```text
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

### Menú de pestañas

El archivo `app/(tabs)/_layout.tsx` configura dos pestañas principales:

- **Inicio**
- **Tareas**

La pestaña Inicio muestra el resumen de tareas y próximas entregas. La pestaña Tareas permite consultar y buscar las tareas disponibles.

### Navegación hacia el Modal

Desde la pantalla de Inicio, el botón **Nueva tarea** utiliza un `Link` de Expo Router para navegar hacia:

```text
/modal
```

Esta ruta corresponde al archivo:

```text
app/modal.tsx
```

El archivo `app/_layout.tsx` registra esta pantalla con presentación de tipo modal.

La pantalla modal contiene los campos para:

- Nombre de la tarea
- Materia
- Fecha de entrega
- Descripción

Los botones **Crear tarea** y **Cancelar** utilizan `router.back()` para regresar a la pantalla anterior.

### Navegación hacia la ruta dinámica

Desde las pantallas Inicio y Tareas se puede seleccionar una tarea para consultar sus detalles.

La navegación utiliza:

```tsx
router.push(`/task/${task.id}`)
```

Por ejemplo, para la tarea 1024:

```text
/task/1024
```

Esta URL corresponde a la ruta dinámica:

```text
app/task/[id].tsx
```

Dentro de `[id].tsx` se utiliza `useLocalSearchParams()` para obtener el identificador enviado en la ruta:

```tsx
const { id } = useLocalSearchParams();
```

De esta manera, la pantalla puede mostrar el identificador correspondiente, por ejemplo:

```text
ID de tarea: 1024
```

### Flujo general

```text
Inicio
 ├── Nueva tarea
 │      ↓
 │   /modal
 │      ↓
 │   Crear / Cancelar
 │
 └── Seleccionar tarea
        ↓
     /task/[id]
        ↓
   Detalle de tarea

Tareas
 ├── Buscar tarea
 └── Seleccionar tarea
        ↓
     /task/[id]
        ↓
   Detalle de tarea
```

---

## 3. Comparativa Técnica (IA)

### Arquitectura actual

La aplicación utiliza `app/` como sistema de rutas de Expo Router y `src/` para componentes reutilizables, constantes y hooks.

Esta organización es adecuada para un proyecto académico pequeño porque permite mantener las rutas separadas de los elementos reutilizables y facilita comprender el funcionamiento de la navegación.

### Ventajas de la arquitectura actual

1. **Integración directa con Expo Router:** la estructura de carpetas coincide con el sistema de rutas basado en archivos.
2. **Simplicidad:** facilita localizar las pantallas y comprender rápidamente la navegación de la aplicación.

### Desventajas de la arquitectura actual

1. **Lógica distribuida:** a medida que aumente la aplicación, la lógica relacionada con las tareas puede quedar repartida entre diferentes pantallas.
2. **Menor escalabilidad:** una aplicación con muchas funcionalidades podría resultar más difícil de mantener utilizando únicamente una organización basada en las rutas.

### Propuesta de arquitectura Feature-First

Para una aplicación de mayor tamaño se podría utilizar una arquitectura **Feature-First**, manteniendo `app/` principalmente para las rutas y organizando la lógica de cada funcionalidad dentro de `src/features/`.

Una posible estructura sería:

```text
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

En esta propuesta, `app/` se encargaría principalmente de las rutas, mientras que cada funcionalidad tendría sus propios componentes, hooks, servicios, tipos y constantes dentro de `src/features/`.

### Ventajas de Feature-First

1. **Cohesión:** los elementos relacionados con una misma funcionalidad permanecen organizados juntos.
2. **Escalabilidad:** facilita agregar nuevas funcionalidades sin que la estructura del proyecto se vuelva difícil de mantener.

### Desventajas de Feature-First

1. **Mayor complejidad inicial:** para una aplicación pequeña puede representar una estructura innecesaria.
2. **Mayor cantidad de archivos y carpetas:** requiere más organización y decisiones iniciales de arquitectura.

### Conclusión personal

Considero que la arquitectura actual es adecuada para Agendiantil porque se trata de un proyecto académico pequeño y permite comprender fácilmente el funcionamiento de Expo Router, las pestañas, las rutas dinámicas y los modales. Sin embargo, para un proyecto de gran escala sí aplicaría la arquitectura Feature-First, porque permitiría organizar mejor la lógica, los componentes, hooks, servicios y tipos relacionados con cada funcionalidad. Esto facilitaría el mantenimiento y el crecimiento de la aplicación cuando se agreguen características como calendario, exámenes, usuarios, autenticación o conexión con una base de datos.