export function rookLegalMoove(idStart, idEnd) {
  const start = idToCoords(idStart);
  const end = idToCoords(idEnd);

  if (start.x === end.x || start.y === end.y) {
    return true;
  }

  return false;
}
