import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (user.username && user.username.trim()) {
      setUsername(user.username);
    }
  }, [user.username]);

  const handleSave = () => {
    if (username.trim()) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      user.username = username.trim();
      localStorage.setItem('user', JSON.stringify(user));
    }
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <header className="backdrop-blur-md bg-blue-900 bg-opacity-20 text-white shadow-md transition duration-300 ease-in-out p-4">
      <div className="px-4 w-[1200px] mx-auto flex items-center justify-between">
        <h1 onClick={() => navigate('/')} className="text-2xl font-bold">Трекер задач</h1>
        {user.username ? (
          <div className="flex items-center space-x-2">
            <span>Username: {username}</span>
            <button
              onClick={handleProfile}
              className="p-2 bg-red-500 rounded text-white flex items-center"
            >
              Профиль
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите username"
              className="p-2 bg-white text-black rounded"
              autoFocus
            />
            <button
              onClick={handleSave}
              className="p-2 bg-green-500 rounded text-white flex items-center"
            >
              <FontAwesomeIcon icon={faCheck} className="mr-1" />
              OK
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
