export function idToCoords(id, chessLetter) {
  const x = parseInt(id[1]);
  const y = chessLetter.indexOf(id[0]) + 1;

  return { x, y };
}

export function coordsToId(x, y, chessLetter) {
  return chessLetter[y - 1] + x;
}
