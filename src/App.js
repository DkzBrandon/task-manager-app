import React, { useState, useEffect } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/taskList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // Estado inicial cargado desde localStorage
  const [tasks, setTasks] = useState(() => {
    try {
      const storedTasks = localStorage.getItem("tasks");
      const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];
      return Array.isArray(parsedTasks) ? parsedTasks : [];
    } catch (error) {
      console.error("Error al cargar tareas desde localStorage:", error);
      return [];
    }
  });

  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Mostrar notificaciones 
  const showNotification = (message, type = "success") => {
    toast(message, {
      type,
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    switch (filter) {
      case "pending":
        setFilteredTasks(tasks.filter((task) => !task.completed));
        break;
      case "completed":
        setFilteredTasks(tasks.filter((task) => task.completed));
        break;
      default:
        setFilteredTasks(tasks);
        break;
    }
  }, [tasks, filter]);

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error al guardar tareas en localStorage:", error);
    }
  }, [tasks]);

  // Agregar una nueva tarea
  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
    showNotification("Tarea agregada exitosamente.");
  };

  // Actualizar una tarea existente
  const updateTask = (updatedTask) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Sincroniza con localStorage
      return updatedTasks;
    });
    setTaskToEdit(null); // Limpia la tarea seleccionada para edición
    showNotification("Tarea actualizada exitosamente.");
  };

  // Eliminar una tarea
  const deleteTask = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.filter((task) => task.id !== id);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Sincroniza con localStorage
        return updatedTasks;
      });
      showNotification("Tarea eliminada exitosamente.", "error");
    }
  };

  // Limpiar la tarea seleccionada para editar
  const clearTaskToEdit = () => {
    setTaskToEdit(null);
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>Gestor de Tareas</h2>
        <div className="filters">
          <button onClick={() => setFilter("all")}>Todas</button>
          <button onClick={() => setFilter("pending")}>Pendientes</button>
          <button onClick={() => setFilter("completed")}>Completadas</button>
        </div>
      </aside>
      <main className="main-content">
        <TaskForm
          addTask={addTask}
          updateTask={updateTask}
          selectedTask={taskToEdit}
          clearTaskToEdit={clearTaskToEdit}
        />
        <TaskList
          tasks={filteredTasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
          setTaskToEdit={setTaskToEdit}
        />
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
