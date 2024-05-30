import React from 'react';
import { useDrop } from 'react-dnd';
import {
  isValidPawnMove,
  isValidRookMove,
  isValidKnightMove,
  isValidBishopMove,
  isValidQueenMove,
  isValidKingMove,
  isEnemyPiece,
} from './gameLogic';
import Piece from './Piece';

const Square = ({
  piece,
  position,
  board,
  setBoard,
  currentPlayer,
  togglePlayer,
}) => {
  const [, drop] = useDrop({
    accept: 'piece',
    drop: (item) => {
      const sourcePos = item.position;
      const targetPos = position;
      const movingPiece = board[sourcePos[0]][sourcePos[1]];
      const targetPiece = board[targetPos[0]][targetPos[1]];

      if (
        (currentPlayer === 'white' &&
          movingPiece === movingPiece.toUpperCase()) ||
        (currentPlayer === 'black' && movingPiece === movingPiece.toLowerCase())
      ) {
        // validating the move
        let isValid = false;
        switch (movingPiece.toLowerCase()) {
          case 'p':
            isValid = isValidPawnMove(sourcePos, targetPos, board);
            break;
          case 'r':
            isValid = isValidRookMove(sourcePos, targetPos, board);
            break;
          case 'n':
            isValid = isValidKnightMove(sourcePos, targetPos, board);
            break;
          case 'b':
            isValid = isValidBishopMove(sourcePos, targetPos, board);
            break;
          case 'q':
            isValid = isValidQueenMove(sourcePos, targetPos, board);
            break;
          case 'k':
            isValid = isValidKingMove(sourcePos, targetPos, board);
            break;
          default:
            break;
        }

        if (isValid) {
          // update board state to reflect the move
          const newBoard = board.map((row) => row.slice()); 
          newBoard[targetPos[0]][targetPos[1]] = movingPiece; 
          newBoard[sourcePos[0]][sourcePos[1]] = null; 
          setBoard(newBoard);
          togglePlayer(); 
        }
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        width: '50px',
        height: '50px',
        backgroundColor:
          (position[0] + position[1]) % 2 === 0 ? 'white' : 'gray',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {piece && <Piece type={piece} position={position} />}
    </div>
  );
};

export default Square;
