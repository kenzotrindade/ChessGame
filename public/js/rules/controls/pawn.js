export function pawnLegalMove(idStart, idEnd, start, end, board) {
  const startPiece = board[idStart];

  const pieceHere = board[idEnd];

  let moveWhiteLimit = 1;
  let moveBlackLimit = -1;

  if (start.y !== end.y && !pieceHere) {
    return false;
  } else if (
    pieceHere &&
    (end.y === start.y ||
      start.x === end.x ||
      end.x - start.x > 1 ||
      start.x - end.x > 1)
  ) {
    return false;
  } else if (end.y - start.y > 1 || start.y - end.y > 1) {
    return false;
  }
  if (startPiece.color === "white" && start.x === 2) {
    moveWhiteLimit = 2;
  }

  if (startPiece.color === "black" && start.x === 7) {
    moveBlackLimit = -2;
  }

  if (
    (startPiece.color === "white" && end.x - start.x > moveWhiteLimit) ||
    (startPiece.color === "white" && end.x - start.x < 0)
  ) {
    return false;
  } else if (
    (startPiece.color === "black" && end.x - start.x < moveBlackLimit) ||
    (startPiece.color === "black" && end.x - start.x > 0)
  ) {
    return false;
  }

  if (end.x === 8 || end.x === 1) {
    const colorChoice = document.querySelector(
      `#pawnChoice${startPiece.color}`,
    );
    colorChoice.style.display = "grid";
  }

  return true;
}
