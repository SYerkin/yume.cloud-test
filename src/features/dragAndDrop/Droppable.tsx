import React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DroppableProps {
  id: string;
  children: React.ReactNode;
}

const Droppable: React.FC<DroppableProps> = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  const style = {
    backgroundColor: isOver ? 'lightgreen' : 'lightgray',
    padding: '16px',
    borderRadius: '8px',
    minHeight: '200px',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};

export default Droppable;
