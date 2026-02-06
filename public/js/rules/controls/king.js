export function kingLegalMove(start, end) {
  const mooveLimit = 1;

  if (
    Math.abs(end.x - start.x) > mooveLimit ||
    Math.abs(end.y - start.y) > mooveLimit
  ) {
    return false;
  }

  if (Math.abs(end.x - start.x) === Math.abs(end.y - start.y)) {
    return true;
  }

  if (start.x === end.x || start.y === end.y) {
    return true;
  }

  return false;
}
