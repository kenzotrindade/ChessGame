export function rookLegalMove(start, end) {
  if (start.x === end.x || start.y === end.y) {
    return true;
  }

  return false;
}
