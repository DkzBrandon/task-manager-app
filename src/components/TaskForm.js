import React, { useState, useEffect } from 'react';

function TaskForm({ addTask, updateTask, selectedTask, clearTaskToEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [deadlineTime, setDeadlineTime] = useState('');

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title || '');
      setDescription(selectedTask.description || '');
      setFile(selectedTask.file || '');
      setDeadlineDate(selectedTask.deadlineDate || '');
      setDeadlineTime(selectedTask.deadlineTime || '');
    } else {
      setTitle('');
      setDescription('');
      setFile('');
      setDeadlineDate('');
      setDeadlineTime('');
    }
  }, [selectedTask]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setFile({
          name: selectedFile.name,
          url: reader.result, // Guardar el contenido del archivo en Base64
        });
      };
      reader.readAsDataURL(selectedFile); // Leer archivo como Base64
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !deadlineDate || !deadlineTime) return;

    const newTask = {
      id: selectedTask ? selectedTask.id : Date.now(),
      title,
      description,
      file,
      completed: selectedTask ? selectedTask.completed : false,
      deadlineDate,
      deadlineTime,
    };

    if (selectedTask) {
      updateTask(newTask); // Actualiza la tarea existente
    } else {
      addTask(newTask); // Agrega una nueva tarea
    }

    // Limpiar los campos después de agregar o editar
    setTitle('');
    setDescription('');
    setFile('');
    setDeadlineDate('');
    setDeadlineTime('');

    clearTaskToEdit(); // Limpia la tarea seleccionada para edición
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Título de la tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción de la tarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <label className="file-label">
        Seleccionar archivo
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </label>
      {file && <span className="file-name">Archivo: {file.name}</span>}

      <input
        type="date"
        value={deadlineDate}
        onChange={(e) => setDeadlineDate(e.target.value)}
        required
        className="date-input"
      />

      <input
        type="time"
        value={deadlineTime}
        onChange={(e) => setDeadlineTime(e.target.value)}
        required
        className="time-input"
      />

      <button type="submit">{selectedTask ? 'Actualizar Tarea' : 'Agregar Tarea'}</button>
    </form>
  );
}

export default TaskForm;
