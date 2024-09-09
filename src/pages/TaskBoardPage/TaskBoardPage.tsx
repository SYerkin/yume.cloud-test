import React, { useState, useEffect, useCallback } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import NewTaskForm from '../../features/taskManagement/components/NewTaskForm';
import TaskCard from '../../features/taskManagement/components/TaskCard';
import { useTaskManager } from '../../shared/hooks/useTaskManager';
import { useUserCheck } from '../../shared/hooks/useUserCheck';
import Droppable from '../../features/dragAndDrop/Droppable';
import Draggable from '../../features/dragAndDrop/Draggable';
import { Task } from '../../shared/types/task-types';
import Modal from '../../shared/ui/Modal/Modal';

const TaskBoardPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { tasks, addTask, removeTask, updateTask } = useTaskManager();
  const [localTasks, setLocalTasks] = useState<Task[]>([]);
  const user = useUserCheck();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setLocalTasks(user.tasks || tasks);
    } else {
      setLocalTasks(tasks);
    }
  }, [tasks]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const movedTaskId = active.id;
    const destinationId = over.id as 'to-do' | 'active' | 'done';

    const movedTask = localTasks.find(task => task.taskId === movedTaskId);

    if (!movedTask) return;

    const updatedTasks = localTasks.map(task =>
      task.taskId === movedTaskId
        ? { ...task, taskStatus: destinationId }
        : task
    );

    setLocalTasks(updatedTasks);

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      user.tasks = updatedTasks;
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [localTasks]);

  const getTasksByStatus = (status: 'to-do' | 'active' | 'done') =>
    localTasks.filter(task => task.taskStatus === status);

  const handleEditTask = (taskId: string) => {
    const task = localTasks.find(task => task.taskId === taskId);
    if (task) {
      setEditingTask(task);
      handleOpenModal();
    }
  };

  const handleMoveToActive = (taskId: string) => {
    const updatedTasks = localTasks.map(task =>
      task.taskId === taskId ? { ...task, taskStatus: 'active' as 'active' } : task
    );
    setLocalTasks(updatedTasks);
  };

  const updateLocalStorage = (updatedTasks: Task[]) => {
	console.log(updatedTasks)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      user.tasks = updatedTasks;
      localStorage.setItem('user', JSON.stringify(user));
    }
  };

  const handleSubtaskChange = (taskId: string, subtaskId: string, isChecked: boolean) => {
	const updatedTasks = localTasks.map(task => {
		if (task.taskId === taskId) {
		const updatedSubtasks = task.taskSubtasks.map(subtask =>
			subtask.subtaskId === subtaskId
			? { ...subtask, subtaskStatus: isChecked }
			: subtask
		);

		const allSubtasksChecked = updatedSubtasks.every(subtask => subtask.subtaskStatus);
		const updatedTaskStatus = allSubtasksChecked ? 'done' : task.taskStatus;

		return { ...task, taskSubtasks: updatedSubtasks, taskStatus: updatedTaskStatus };
		}
		return task;
	});

		setLocalTasks(updatedTasks);
		console.log("updatedTasks",updatedTasks)
		updateLocalStorage(updatedTasks);
	};

  const statuses: Array<'to-do' | 'active' | 'done'> = ['to-do', 'active', 'done'];

  return (
    <>
      <h2 className="text-xl font-bold">Доска задач</h2>
      <p className="mt-4">Создайте задачу и перетащите в нужный сектор.</p>

      <button
        onClick={handleOpenModal}
        className="bg-blue-500 text-white py-2 px-4 rounded my-6"
      >
        Новая задача
      </button>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex space-x-4">
          {statuses.map(status => {
            const tasksByStatus = getTasksByStatus(status);

            return (
              <div
                key={status}
                className="flex-1"
              >
                <h3 className="text-lg font-bold capitalize mb-[4px]">{status.replace('-', ' ')}</h3>
                <Droppable id={status}>
                  {tasksByStatus.length > 0 ? (
                    tasksByStatus.map(task => (
                      <Draggable key={task.taskId} id={task.taskId}>
                        <TaskCard
                          task={task}
                          onEdit={handleEditTask}
                          onDelete={(taskId) => {
                            removeTask(taskId);
                            setLocalTasks(prevTasks => prevTasks.filter(t => t.taskId !== taskId));
                          }}
                          onMoveToActive={handleMoveToActive}
                          updateLocalStorage={updateLocalStorage}
                          handleSubtaskChange={handleSubtaskChange}
                        />
                      </Draggable>
                    ))
                  ) : (
                    <p className="text-gray-500">Нет задач</p>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DndContext>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h3 className="text-black text-xl font-bold mb-4">Создание задачи</h3>
        <NewTaskForm
          initialData={editingTask}
          onSubmit={(task) => {
            if (editingTask) {
              const updatedTasks = localTasks.map(t =>
                t.taskId === task.taskId ? task : t
              );
              setLocalTasks(updatedTasks);
              updateLocalStorage(updatedTasks);
            } else {
              const updatedTasks = [...localTasks, task];
              setLocalTasks(updatedTasks);
              updateLocalStorage(updatedTasks);
            }
            handleCloseModal();
          }}
        />
      </Modal>
    </>
  );
};

export default TaskBoardPage;
