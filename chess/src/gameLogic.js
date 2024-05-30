export const isValidPawnMove = (start, end, board) => {
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;
    const piece = board[startRow][startCol];
    const targetPiece = board[endRow][endCol];
    const direction = piece === 'P' ? -1 : 1; // 'P' for white moves upward, 'p' for black moves downward
  
    // forward move
    if (startCol === endCol && !targetPiece) {
      // one-square move
      if (startRow + direction === endRow) {
        return true; // Move one square forward
      }
  
      // initial two-square move
      if (
        (piece === 'P' && startRow === 6 && endRow === 4) ||
        (piece === 'p' && startRow === 1 && endRow === 3)
      ) {
        if (
          !board[startRow + direction][startCol] &&
          !board[startRow + 2 * direction][startCol]
        ) {
          return true;
        }
      }
    }
  
    // diagonal capture
    if (Math.abs(endCol - startCol) === 1 && endRow === startRow + direction) {
      return targetPiece && isEnemyPiece(piece, targetPiece); 
    }
  
    return false;
  };
  
  export const isValidRookMove = (start, end, board) => {
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;
  
    // rook move only in straight lines
    if (startRow !== endRow && startCol !== endCol) return false; 
  
    const rowDirection = startRow === endRow ? 0 : endRow > startRow ? 1 : -1;
    const colDirection = startCol === endCol ? 0 : endCol > startCol ? 1 : -1;
    let checkRow = startRow + rowDirection;
    let checkCol = startCol + colDirection;
  
    while (checkRow !== endRow || checkCol !== endCol) {
      if (board[checkRow][checkCol]) {
        return (
          checkRow === endRow &&
          checkCol === endCol &&
          isEnemyPiece(board[startRow][startCol], board[checkRow][checkCol])
        );
      }
      checkRow += rowDirection;
      checkCol += colDirection;
    }
  
    return (
      !board[endRow][endCol] ||
      isEnemyPiece(board[startRow][startCol], board[endRow][endCol])
    );
  };
  
  export const isValidKnightMove = (start, end, board) => {
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;
    const piece = board[startRow][startCol];
    const targetPiece = board[endRow][endCol];
    const rowDistance = Math.abs(endRow - startRow);
    const colDistance = Math.abs(endCol - startCol);
  
    // knight moves in a L-shpae
    if (
      (rowDistance === 2 && colDistance === 1) ||
      (rowDistance === 1 && colDistance === 2)
    ) {
      return !targetPiece || isEnemyPiece(piece, targetPiece);
    }
  
    return false;
  };
  
  export const isValidBishopMove = (start, end, board) => {
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;
  
    // bishop only moves diagonally
    if (Math.abs(startRow - endRow) !== Math.abs(startCol - endCol)) return false; 
  
    const rowDirection = endRow > startRow ? 1 : -1;
    const colDirection = endCol > startCol ? 1 : -1;
    let checkRow = startRow + rowDirection;
    let checkCol = startCol + colDirection;
  
    while (checkRow !== endRow && checkCol !== endCol) {
      if (board[checkRow][checkCol]) {
        return (
          checkRow === endRow &&
          checkCol === endCol &&
          isEnemyPiece(board[startRow][startCol], board[checkRow][checkCol])
        );
      }
      checkRow += rowDirection;
      checkCol += colDirection;
    }
  
    return (
      !board[endRow][endCol] ||
      isEnemyPiece(board[startRow][startCol], board[endRow][endCol])
    );
  };
  
  export const isValidQueenMove = (start, end, board) => {
  
    // queen moves like both a rook and a bishop
    return (
      isValidRookMove(start, end, board) || isValidBishopMove(start, end, board)
    );
  };
  
  export const isValidKingMove = (start, end, board) => {
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;
  
    const rowDistance = Math.abs(startRow - endRow);
    const colDistance = Math.abs(startCol - endCol);
    
    // king move only one square in any direction
    if (rowDistance > 1 || colDistance > 1) return false; 
    return (
      !board[endRow][endCol] ||
      isEnemyPiece(board[startRow][startCol], board[endRow][endCol])
    );
  };
  
  // function to check if a piece belongs to the opponent
  const isEnemyPiece = (piece, targetPiece) => {
    if (!targetPiece) return false; 
    return (
      (piece.toUpperCase() === piece) !==
      (targetPiece.toUpperCase() === targetPiece)
    );
  };