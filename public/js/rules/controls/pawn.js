export function pawnLegalMove(idStart, idEnd, start, end, board, check) {
  const startPiece = board[idStart];
  const pieceHere = board[idEnd];

  let moveWhiteLimit = 1;
  let moveBlackLimit = -1;

  if (start.y !== end.y && !pieceHere) return false;
  if (
    pieceHere &&
    (end.y === start.y || start.x === end.x || Math.abs(end.y - start.y) > 1)
  )
    return false;
  if (Math.abs(end.y - start.y) > 1 || Math.abs(end.x - start.x) > 2)
    return false;

  if (startPiece.color === "white" && start.x === 2 && !check)
    moveWhiteLimit = 2;
  if (startPiece.color === "black" && start.x === 7 && !check)
    moveBlackLimit = -2;

  if (startPiece.color === "white") {
    if (end.x - start.x > moveWhiteLimit || end.x - start.x <= 0) return false;
  } else {
    if (end.x - start.x < moveBlackLimit || end.x - start.x >= 0) return false;
  }

  if (end.x === 8 || (end.x === 1 && !check)) {
    const colorChoice = document.querySelector(
      `#pawnChoice${startPiece.color}`,
    );
    if (colorChoice) colorChoice.style.display = "grid";
  }

  return true;
}
