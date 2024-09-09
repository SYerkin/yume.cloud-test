import React, { useState, useEffect } from 'react';
import { Subtask, Task } from '../../../shared/types/task-types';

interface NewTaskFormProps {
  onSubmit: (task: Task) => void;
  initialData?: Task | null | undefined; 
}


const NewTaskForm: React.FC<NewTaskFormProps> = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.taskTitle || '');
  const [description, setDescription] = useState(initialData?.taskDescription || '');
  const [dueDate, setDueDate] = useState(initialData?.taskDueDate || '');
  const [status, setStatus] = useState<'to-do' | 'active' | 'done'>(initialData?.taskStatus || 'to-do');
  const [subtasks, setSubtasks] = useState<Subtask[]>(initialData?.taskSubtasks || []);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  useEffect(() => {
    if (!localStorage.getItem('lastTaskId')) {
      localStorage.setItem('lastTaskId', '0');
    }
  }, []);

  const getNextId = () => {
    const lastId = parseInt(localStorage.getItem('lastTaskId') || '0', 10);
    const newId = lastId + 1;
    localStorage.setItem('lastTaskId', newId.toString());
    return newId.toString();
  };

  const validateForm = () => {
    const newErrors: { title?: string; description?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Название является обязательным.';
    } else if (title.trim().length > 36) {
      newErrors.title = 'Название не может быть длиннее 36 символов.';
    }

    if (description.trim().length > 0 && description.trim().length < 10) {
      newErrors.description = 'Описание должно быть не менее 10 символов.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newTask: Task = {
      taskId: initialData?.taskId || getNextId(),
      taskTitle: title,
      taskDescription: description,
      taskDueDate: dueDate,
      taskStatus: status,
      taskSubtasks: subtasks,
    };

    onSubmit(newTask);
  };

  const handleAddSubtask = () => {
    if (newSubtaskTitle.trim()) {
      const newSubtask: Subtask = {
        subtaskParentId: '',
        subtaskId: Date.now().toString(),
        subtaskTitle: newSubtaskTitle,
        subtaskStatus: false
      };
      setSubtasks([...subtasks, newSubtask]);
      setNewSubtaskTitle('');
    }
  };

  const handleRemoveSubtask = (subtaskId: string) => {
    setSubtasks(subtasks.filter(subtask => subtask.subtaskId !== subtaskId));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Название</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            // required
            className={`mt-1 block w-full p-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Дата</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Описание</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`text-black mt-1 block w-full p-3 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            rows={2}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Статус</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'to-do' | 'active' | 'done')}
            className="text-black mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="to-do" className="text-black">To-Do</option>
            <option value="active" className="text-black">Active</option>
            <option value="done" className="text-black">Done</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Подзадача</label>
        <div className="space-y-2">
          {subtasks.map(subtask => (
            <div key={subtask.subtaskId} className="flex items-center justify-between p-3 border border-gray-300 rounded-md bg-white shadow-sm">
              <span className="text-black">{subtask.subtaskTitle}</span>
              <button
                type="button"
                onClick={() => handleRemoveSubtask(subtask.subtaskId)}
                className="text-red-500 hover:text-red-700"
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center mt-4">
          <input
            type="text"
            value={newSubtaskTitle}
            onChange={(e) => setNewSubtaskTitle(e.target.value)}
            placeholder="Название подзадачи"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="button"
            onClick={handleAddSubtask}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
          >
            Добавить
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600"
      >
        Сохранить
      </button>
    </form>
  );
};

export default NewTaskForm;
