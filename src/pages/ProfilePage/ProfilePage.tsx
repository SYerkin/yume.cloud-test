import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [tasks, setTasks] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.username) {
      setUsername(user.username);
    }
    if (user.tasks) {
      setTasks(user.tasks);
    }
  }, []);

  const handleUsernameChange = () => {
    if (username.trim()) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.username = username.trim();
      localStorage.setItem('user', JSON.stringify(user));
    }
  };

  const handleClearData = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('lastTaskId');
    navigate('/');
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.taskStatus === 'done').length;
  const completionPercentage = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Профиль</h2>
        <p className="mt-2">Управление задачами</p>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Edit username"
            className="p-2 bg-white text-black rounded"
          />
          <button
            onClick={handleUsernameChange}
            className="p-2 bg-blue-500 rounded text-white"
          >
            Сохранить
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <button
          onClick={handleClearData}
          className="p-2 bg-red-500 rounded text-white"
        >
          Очистить все данные
        </button>
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Задачи ({completionPercentage}% завершено)</h3>
        <div className="mt-2">
          {tasks.map(task => (
            <div key={task.taskId} className="flex items-center justify-between p-2 border-b">
              <span className="font-medium">{task.taskTitle}</span>
              <span className="text-gray-600">{task.taskStatus}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
