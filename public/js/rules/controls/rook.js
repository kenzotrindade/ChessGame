import { idToCoords } from "../../components/calcCoords.js";

export function rookLegalMoove(idStart, idEnd, board) {
  const start = idToCoords(idStart);
  const end = idToCoords(idEnd);

  if (start.x === end.x || start.y === end.y) {
    return true;
  }

  return false;
}
