import React from 'react';
import { useDrag } from 'react-dnd';

const Piece = ({ type, position }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'piece',
    item: { type, position },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        fontSize: '2rem',
        fontWeight: 'bold',
      }}
    >
      {type}
    </div>
  );
};

export default Piece;