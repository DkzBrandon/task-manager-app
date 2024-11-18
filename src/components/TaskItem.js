import React, { useEffect, useState, useCallback } from 'react';
import './TaskItem.css';

function TaskItem({ task, updateTask, deleteTask, setTaskToEdit }) {
  const [statusClass, setStatusClass] = useState('');

  const calculateStatus = useCallback(() => {
    let dueDate;
    if (task.deadlineDate && task.deadlineTime) {
      dueDate = new Date(`${task.deadlineDate}T${task.deadlineTime}`);
    } else {
      setStatusClass('');
      return;
    }

    const now = new Date();
    if (now > dueDate) {
      setStatusClass('expired');
    } else if ((dueDate - now) / (1000 * 60) <= 60) {
      setStatusClass('near-expiry');
    } else {
      setStatusClass('on-time');
    }
  }, [task.deadlineDate, task.deadlineTime]);

  useEffect(() => {
    calculateStatus();
    const interval = setInterval(calculateStatus, 60000);
    return () => clearInterval(interval);
  }, [calculateStatus]);

  const toggleCompletion = () => {
    updateTask({ ...task, completed: !task.completed });
  };

  return (
    <div className={`task-item ${statusClass}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      {task.file && (
        <p>
          <strong>Archivo:</strong>{' '}
          <a
            href={task.file.url}
            download={task.file.name}
            className="download-link"
          >
            {task.file.name}
          </a>
        </p>
      )}
      {task.deadlineDate && task.deadlineTime && (
        <p>
          Fecha de vencimiento:{' '}
          {new Date(`${task.deadlineDate}T${task.deadlineTime}`).toLocaleString(
            'es-MX',
            {
              dateStyle: 'short',
              timeStyle: 'short',
            }
          )}
        </p>
      )}
      <div className="buttons">
        <button
          className={task.completed ? 'pending' : 'complete'}
          onClick={toggleCompletion}
        >
          {task.completed ? 'Marcar como Pendiente' : 'Marcar como Completada'}
        </button>
        <button onClick={() => setTaskToEdit(task)}>Editar</button>
        <button onClick={() => deleteTask(task.id)}>Eliminar</button>
      </div>
    </div>
  );
}

export default TaskItem;
