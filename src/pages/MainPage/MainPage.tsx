import React, { useState } from 'react';
import TaskCard from '../../features/taskManagement/components/TaskCard';
import { Task } from '../../shared/types/task-types';
import { advantages, mockTasks } from '../../shared/config/constants';
import { useNavigate } from 'react-router-dom';

const statuses: Array<'to-do' | 'active' | 'done'> = ['to-do', 'active', 'done'];

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const tasks: Task[] = mockTasks as Task[];

  const getTasksByStatus = (status: 'to-do' | 'active' | 'done') => {
    return tasks.filter(task => task.taskStatus === status);
  };

  const handleStart = () => {
      navigate('/tasks');
  };

  return (
    <div className="p-6 flex flex-col gap-8">
      <h2 className="text-xl font-bold">Тестовое задание yume.cloud</h2>
      <p className="">Задача: Создать приложение на React, которое позволяет управлять списком задач и подзадач с использованием react-hook-form.</p>

      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex space-x-4 transition-all duration-300">
          {statuses.map(status => {
            const tasksByStatus = getTasksByStatus(status);

            return (
              <div
                key={status}
                className={`flex-1 p-4 border border-gray-300 rounded-md bg-white shadow-md hover:shadow-lg transition-shadow`}
              >
                <h3 className="text-lg font-bold capitalize mb-4 text-black">{status.replace('-', ' ')}</h3>
                <div className="space-y-4">
                  {tasksByStatus.map(task => (
                    <TaskCard
                      key={task.taskId}
                      task={task}
                      onEdit={() => {}}
                      onDelete={() => {}}
                      onMoveToActive={() => {}}
                      updateLocalStorage={() => {}}
                      handleSubtaskChange={() => {}}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <button
              onClick={handleStart}
              className="bg-green-600 text-white text-lg rounded-md py-2 px-4 shadow-md hover:bg-green-700"
              style={{ width: '150px', height: '50px' }}
            >
              Старт
            </button>
          </div>
        )}
      </div>
      <Advantages />
    </div>
  );
};

export default MainPage;


const Advantages: React.FC = () => {
  return (
    <section className="py-8 px-6 bg-[#0A192F] text-white rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {advantages.map((advantage, index) => (
          <div key={index} className="p-6 bg-[#112240] rounded-lg shadow-md flex items-start space-x-4 justify-center">
            <div className="w-24 h-full flex items-center justify-center">
              <img src={advantage.imgLink} alt={advantage.title} className="  object-cover rounded-md" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{advantage.title}</h3>
              <p className="text-sm mt-2">{advantage.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
