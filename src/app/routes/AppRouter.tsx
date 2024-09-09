import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/MainPage/MainPage';
import TaskBoardPage from '../../pages/TaskBoardPage/TaskBoardPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/tasks" element={<TaskBoardPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};

export default AppRouter;
