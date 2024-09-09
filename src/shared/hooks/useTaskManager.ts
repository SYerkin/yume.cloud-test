import { useState, useEffect } from 'react';
import { Task } from '../types/task-types';

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setTasks(user.tasks || []);
    }
  }, []);

  const addTask = (newTask: Task) => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const updatedTasks = [...user.tasks, newTask];
      user.tasks = updatedTasks;
      localStorage.setItem('user', JSON.stringify(user));
      setTasks(updatedTasks);
    }
  };

  const removeTask = (taskId: string) => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const updatedTasks = user.tasks.filter((task: Task) => task.taskId !== taskId);
      user.tasks = updatedTasks;
      localStorage.setItem('user', JSON.stringify(user));
      setTasks(updatedTasks);
    }
  };

  const updateTask = (updatedTask: Task) => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const updatedTasks = user.tasks.map((task: Task) =>
        task.taskId === updatedTask.taskId ? updatedTask : task
      );
      user.tasks = updatedTasks;
      localStorage.setItem('user', JSON.stringify(user));
      setTasks(updatedTasks);
    }
  };

  return { tasks, addTask, removeTask, updateTask };
};
