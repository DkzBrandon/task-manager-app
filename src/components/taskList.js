import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, updateTask, deleteTask, setTaskToEdit }) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          updateTask={updateTask}
          deleteTask={deleteTask}
          setTaskToEdit={setTaskToEdit}
        />
      ))}
    </div>
  );
}

export default TaskList;
