import { idToCoords } from "../components/calcCoords.js";

export function enPassant(currentPiecePlayed, piecePlayed, chessLetter, board) {
  if (piecePlayed.type === "pawn") {
    const previousStart = idToCoords(piecePlayed.start, chessLetter);
    const previousEnd = idToCoords(piecePlayed.end, chessLetter);
    const start = idToCoords(currentPiecePlayed.start, chessLetter);
    const end = idToCoords(currentPiecePlayed.end, chessLetter);
    let move = null;

    if (piecePlayed.color === "black") move = [previousStart.x, previousEnd.x];
    else move = [previousEnd.x, previousStart.x];

    if (move[0] - move[1] === 2) {
      if (end.y === start.y + 1 || end.y === start.y - 1) {
        if (
          move[0] < end.x < move[1] &&
          end.y === previousEnd.y &&
          start.x === previousEnd.x
        ) {
          delete board[piecePlayed.end];
          const caseId = document.querySelector(`#${piecePlayed.end}`);
          caseId.querySelector("img").remove();
          return true;
        }
      }
    }
  }
  return false;
}
