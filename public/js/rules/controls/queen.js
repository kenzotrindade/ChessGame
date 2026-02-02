export function queenLegalMoove(start, end) {
  if (Math.abs(end.x - start.x) === Math.abs(end.y - start.y)) {
    return true;
  }

  if (start.x === end.x || start.y === end.y) {
    return true;
  }

  return false;
}
