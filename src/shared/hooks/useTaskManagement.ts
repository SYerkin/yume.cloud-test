import { useState } from 'react';

interface Task {
  title: string;
  description?: string;
  dueDate?: string;
  subtasks?: Task[];
}

export const useTaskManagement = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = (index: number, updatedTask: Task) => {
    const updatedTasks = tasks.map((task, i) => (i === index ? updatedTask : task));
    setTasks(updatedTasks);
  };

  return {
    tasks,
    addTask,
    updateTask,
  };
};
