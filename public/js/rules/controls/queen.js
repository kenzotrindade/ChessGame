import { idToCoords } from "../../components/calcCoords.js";

export function queenLegalMoove(idStart, idEnd, board) {
  const start = idToCoords(idStart);
  const end = idToCoords(idEnd);

  if (Math.abs(end.x - start.x) === Math.abs(end.y - start.y)) {
    return true;
  }

  if (start.x === end.x || start.y === end.y) {
    return true;
  }

  return false;
}
