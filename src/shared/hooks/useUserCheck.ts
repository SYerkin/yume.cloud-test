import { useEffect, useState } from 'react';
import { Task } from '../types/task-types';
// import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  username?: string;
  tasks: Task[];
}

export const useUserCheck = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      const newUser: User = {
        id: "1",
        tasks: []
      };
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    }
  }, []);

  return user;
};
