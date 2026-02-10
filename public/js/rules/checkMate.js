export function isSquareAttacked(targetId, attackerColor, board, rules) {
  for (let startId in board) {
    if (board[startId].color === attackerColor) {
      if (rules.isLegalMove(startId, targetId, board, true)) {
        return true;
      }
    }
  }
  return false;
}

export function inCheck(idStart, idEnd, board, rules) {
  const tempBoard = {};
  for (let key in board) {
    tempBoard[key] = { ...board[key] };
  }

  const movingPiece = tempBoard[idStart];
  if (!movingPiece) return false;

  tempBoard[idEnd] = movingPiece;
  delete tempBoard[idStart];

  const kingId = Object.keys(tempBoard).find(
    (id) =>
      tempBoard[id].type === "king" &&
      tempBoard[id].color === movingPiece.color,
  );

  const enemyColor = movingPiece.color === "white" ? "black" : "white";
  return isSquareAttacked(kingId, enemyColor, tempBoard, rules);
}

export function isCheckmate(color, board, rules, chessLetter) {
  const enemyColor = color === "white" ? "black" : "white";
  const kingId = Object.keys(board).find(
    (id) => board[id].type === "king" && board[id].color === color,
  );

  if (!isSquareAttacked(kingId, enemyColor, board, rules)) {
    return false;
  }

  const myPieces = Object.keys(board).filter((id) => board[id].color === color);

  for (let startId of myPieces) {
    for (let l of chessLetter) {
      for (let n = 1; n <= 8; n++) {
        let endId = `${l}${n}`;
        if (rules.isLegalMove(startId, endId, board, true)) {
          if (!inCheck(startId, endId, board, rules)) {
            return false;
          }
        }
      }
    }
  }
  return true;
}
