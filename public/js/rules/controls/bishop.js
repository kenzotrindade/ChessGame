export function bishopLegalMove(start, end) {
  if (Math.abs(end.x - start.x) === Math.abs(end.y - start.y)) {
    return true;
  }

  return false;
}
