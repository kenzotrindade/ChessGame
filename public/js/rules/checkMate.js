export default class Check {
  constructor(rules) {
    this.rules = rules;
    this.color = this.rules.currentPlayedPiece.color;
    this.opponentColor = this.color === "white" ? "black" : "white";
  }

  isSquareAttacked(targetId, board) {
    for (let startId in board) {
      if (board[startId].color === this.opponentColor) {
        if (this.rules.pieceMove(startId, targetId, board, true)) {
          return true;
        }
      }
    }
    return false;
  }

  inCheck(idStart, idEnd, board) {
    const tempBoard = {};
    for (let key in board) {
      tempBoard[key] = { ...board[key] };
    }

    const movingPiece = tempBoard[idStart];
    if (!movingPiece) return false;

    tempBoard[idEnd] = movingPiece;
    delete tempBoard[idStart];

    const kingId = Object.keys(tempBoard).find(
      (id) =>
        tempBoard[id].type === "king" &&
        tempBoard[id].color === movingPiece.color,
    );

    return this.isSquareAttacked(kingId, tempBoard);
  }
}
