
# README

## Gestor de Tareas - Brandon Badillo - Programación Web - 21490525

---

### 1. Descripción breve de la aplicación

El "Gestor de Tareas" es una aplicación web diseñada para facilitar la organización personal mediante la creación, edición, y administración de tareas. 

La herramienta cuenta con las siguientes funcionalidades clave:
- Gestión de tareas: Crear, editar y eliminar tareas con información personalizada.
- Indicadores de estado: Diferenciación visual de tareas según su estado (vencidas, próximas a vencer, completadas y pendientes).
- Adjuntar archivos: Posibilidad de adjuntar un archivo descargable por tarea.
- Persistencia de datos: Las tareas se guardan en localStorage, asegurando que la información persista después de recargar la página.
- Filtros: Visualización de tareas filtradas por estado (todas, pendientes, completadas).
- Interfaz interactiva: Uso de elementos nativos como calendarios y selectores de hora para facilitar la entrada de datos.

---

### 2. Instrucciones de instalación y ejecución

#### Requisitos previos:
Antes de instalar y ejecutar la aplicación, asegúrate de tener:
- Node.js (https://nodejs.org/) instalado en tu equipo.
- Un gestor de paquetes como npm (instalado automáticamente con Node.js) o yarn.

#### Pasos de instalación:

1. Clonar el repositorio:
   Descarga el proyecto desde el repositorio en GitHub o la fuente compartida:
   ```
   git clone <URL_DEL_REPOSITORIO>
   cd gestor-tareas
   ```

2. Instalar dependencias:
   Dentro de la carpeta del proyecto, ejecuta:
   ```
   npm install
   ```
   Esto instalará todas las librerías necesarias.

3. Ejecutar el proyecto en modo de desarrollo:
   Para iniciar la aplicación:
   ```
   npm start
   ```
   Esto abrirá automáticamente la aplicación en tu navegador predeterminado en la dirección http://localhost:3000.

4. Crear una versión de producción (opcional):
   Si deseas generar una versión optimizada para despliegue, usa:
   ```
   npm run build
   ```
   Esto creará una carpeta build lista para ser desplegada en cualquier servidor web.

---

### 3. Explicación breve del flujo de trabajo y los componentes principales

#### Flujo de trabajo:

1. Crear una tarea:
   - Completa el formulario con:
     - Título.
     - Descripción.
     - Fecha y hora límite.
     - Archivo adjunto opcional.
   - Haz clic en "Agregar Tarea" para guardarla.

2. Visualizar tareas:
   - Las tareas se muestran en tarjetas individuales con:
     - Título y descripción.
     - Indicadores visuales de estado (colores según vencimiento).
     - Archivo descargable, si fue adjuntado.

3. Editar una tarea:
   - Haz clic en el botón "Editar".
   - Cambia cualquier información necesaria en el formulario y haz clic en "Actualizar Tarea".

4. Eliminar una tarea:
   - Haz clic en "Eliminar" y confirma la acción. La tarea desaparecerá de la lista y del almacenamiento.

5. Cambiar estado de la tarea:
   - Usa el botón "Marcar como Completada" o "Marcar como Pendiente" para cambiar el estado de una tarea.

6. Filtrar tareas:
   - Usa los botones en la barra lateral para filtrar las tareas:
     - Todas: Muestra todas las tareas.
     - Pendientes: Tareas sin completar.
     - Completadas: Tareas marcadas como completadas.

---

### Componentes principales:

1. App.js:
   - Controla el estado global de la aplicación, sincroniza tareas con localStorage y maneja los filtros.

2. TaskForm.js:
   - Formulario dinámico para crear y editar tareas.
   - Incluye validaciones y manejo de archivos adjuntos.

3. TaskItem.js:
   - Representa una tarea individual con su información y acciones disponibles (editar, eliminar, marcar como completada).

4. TaskList.js:
   - Renderiza una lista de tareas filtradas, mostrando los componentes TaskItem.

5. Almacenamiento en localStorage:
   - Almacena las tareas en formato JSON para garantizar persistencia en el navegador.

---

### Consideraciones adicionales:

- Archivos adjuntos:
  Los archivos se convierten en URL utilizando URL.createObjectURL para garantizar que sean accesibles incluso después de recargar la página.
  
- Indicadores visuales:
  Las tareas vencidas, próximas a vencer, y pendientes tienen colores diferenciados para facilitar su identificación.

- Estilo e interacción:
  La interfaz está diseñada para ser intuitiva, con componentes nativos como calendarios y selectores de hora.

---

