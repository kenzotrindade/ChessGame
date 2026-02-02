import { idToCoords } from "../../components/calcCoords.js";

export function knightLegalMoove(idStart, idEnd, board) {
  const start = idToCoords(idStart);
  const end = idToCoords(idEnd);

  if (
    (Math.abs(end.x - start.x) === 2 && Math.abs(end.y - start.y) === 1) ||
    (Math.abs(end.x - start.x) === 1 && Math.abs(end.y - start.y) === 2)
  ) {
    return true;
  }

  return false;
}
