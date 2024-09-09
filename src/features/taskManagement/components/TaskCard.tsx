import React, { useState } from 'react';
import { Task } from '../../../shared/types/task-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface TaskCardProps {
  task: Task;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onMoveToActive: (taskId: string) => void;
  updateLocalStorage: (updatedTasks: Task[]) => void;
  handleSubtaskChange: (taskId: string, subtaskId: string, isChecked: boolean) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onMoveToActive, updateLocalStorage, handleSubtaskChange }) => {
  const [isExpanded, setExpanded] = useState(false);

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    onDelete(task.taskId);
  };

  const handleMoveToActiveClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    onMoveToActive(task.taskId);
  };

  const handleExpandToggle = (event: React.MouseEvent) => {
    event.stopPropagation();
    setExpanded(prev => !prev);
  };

  const handleEditClick = () => {
    onEdit(task.taskId);
  };

  const handleSubtaskChangeInternal = (subtaskId: string, isChecked: boolean) => {
    console.log("subtaskId",subtaskId, isChecked)
    handleSubtaskChange(task.taskId, subtaskId, isChecked);
  };

  return (
    <div className="border p-4 rounded mb-4 bg-white shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-black font-bold mr-2">{task.taskId}</span>
          <span className="text-black font-bold">{task.taskTitle}</span>
        </div>
        <div className="flex space-x-2">
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onPointerUp={(e) => e.stopPropagation()}
            onClick={handleEditClick}
            className="text-yellow-500 hover:bg-gray-200 rounded p-1"
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onPointerUp={(e) => e.stopPropagation()}
            onClick={handleExpandToggle}
            className="text-blue-500 hover:bg-gray-200 rounded p-1"
          >
            <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
          </button>
        </div>
      </div>

      <p className="text-black mt-2 truncate">{task.taskDescription}</p>
        <div className="flex items-center justify-between">
            {task.taskStatus === 'to-do' && (
                <button
                onPointerDown={(e) => e.stopPropagation()}
                onPointerUp={(e) => e.stopPropagation()}
                onClick={handleMoveToActiveClick}
                className="bg-green-500 text-white hover:bg-green-600 rounded py-1 px-3 mt-2"
                >
                    Перенести в Active
                </button>
            )}
            <div></div>
            <button
                onClick={handleDeleteClick}
                onPointerDown={(e) => e.stopPropagation()}
                onPointerUp={(e) => e.stopPropagation()}
                className="flex items-center text-red-500 hover:bg-gray-200 rounded py-1 px-2 mt-2"
            >
                <FontAwesomeIcon icon={faTrashAlt} />
            </button>
        </div>
      

        {isExpanded && (
            <div className="mt-2">
                {task.taskSubtasks.map(subtask => (
                <div key={subtask.subtaskId} className="flex items-center">
                    <button
                        onPointerDown={(e) => e.stopPropagation()}
                        onPointerUp={(e) => e.stopPropagation()}
                        onClick={() => handleSubtaskChangeInternal(subtask.subtaskId, !subtask.subtaskStatus)}
                        className="appearance-none border-none bg-transparent p-0 cursor-pointer"
                    >
                    {subtask.subtaskStatus ? (
                        <span className="text-green-500">&#10003;</span>
                    ) : (
                        <span className="inline-block w-4 h-4 border border-gray-500"></span>
                    )}
                    </button>
                    <span className={`text-black ml-2 ${subtask.subtaskStatus ? 'line-through' : ''}`}>
                    {subtask.subtaskTitle}
                    </span>
                </div>
                ))}
            </div>
            )}


    </div>
  );
};

export default TaskCard;
