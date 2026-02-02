export function pawnLegalMoove(idStart, idEnd) {
  const startPiece = Board[idStart];

  const start = idToCoords(idStart);
  const end = idToCoords(idEnd);

  const pieceHere = Board[idEnd];

  let mooveWhiteLimit = 1;
  let mooveBlackLimit = -1;

  /*for (let i = start.x + 1; i < end.x; i++) {
    let id = chessLetter[7 - end.y] + i;
    console.log(id);
    const checkPieceBetween = Board[id];
    console.log(checkPieceBetween);
    if (checkPieceBetween) return false;
  }*/

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
    mooveWhiteLimit = 2;
  }

  if (startPiece.color === "black" && start.x === 7) {
    mooveBlackLimit = -2;
  }

  if (
    (startPiece.color === "white" && end.x - start.x > mooveWhiteLimit) ||
    (startPiece.color === "white" && end.x - start.x < 0)
  ) {
    return false;
  } else if (
    (startPiece.color === "black" && end.x - start.x < mooveBlackLimit) ||
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
