import React, { useState } from 'react';
import Square from './Square';

const initialBoardSetup = () => [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

function Chessboard() {
  const [board, setBoard] = useState(initialBoardSetup());
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const togglePlayer = () => {
    setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
  };
  return (
    <div
      style={{
        width: '400px',
        height: '400px',
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <Square
            key={`${rowIndex}-${colIndex}`}
            position={[rowIndex, colIndex]}
            piece={piece}
            board={board}
            setBoard={setBoard}
            currentPlayer={currentPlayer}
            togglePlayer={togglePlayer}
          />
        ))
      )}
    </div>
  );
}

export default Chessboard;