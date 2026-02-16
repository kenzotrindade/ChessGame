export default class Check {
  constructor(rules) {
    this.rules = rules;
    this.colorInCheck = null;
  }

  isSquareAttacked(targetId, board) {
    for (let startId in board) {
      if (board[startId].color != board[targetId].color) {
        if (this.rules.pieceMove(startId, targetId, board, true)) {
          this.colorInCheck = board[targetId].color;
          return true;
        }
      }
    }
    return false;
  }

  inCheck(idStart, idEnd, board, swap) {
    const tempBoard = {};
    for (let key in board) {
      tempBoard[key] = { ...board[key] };
    }

    const movingPiece = tempBoard[idStart];
    if (!movingPiece) return false;

    let color = movingPiece.color;
    if (swap) color = color === "white" ? "black" : "white";

    tempBoard[idEnd] = movingPiece;
    delete tempBoard[idStart];

    const kingId = Object.keys(tempBoard).find(
      (id) => tempBoard[id].type === "king" && tempBoard[id].color === color,
    );

    if (!kingId) return false;

    if (board[idEnd])
      if (board[idEnd].color === board[idStart].color) return false;

    return this.isSquareAttacked(kingId, tempBoard);
  }

  isCheckmate(board, color) {
    const kingId = Object.keys(board).find(
      (id) => board[id].type === "king" && board[id].color === color,
    );

    if (!this.isSquareAttacked(kingId, board)) {
      return false;
    }

    const myPieces = Object.keys(board).filter(
      (id) => board[id].color === color,
    );

    let mat = true;

    for (let startId of myPieces) {
      for (let l of this.rules.chessLetter) {
        for (let n = 1; n <= 8; n++) {
          let endId = `${l}${n}`;
          let endCase = false;
          if (typeof board[endId]?.color !== "undefined")
            endCase = board[endId].color === color ? true : false;
          if (this.rules.pieceMove(startId, endId, board, true)) {
            if (!this.inCheck(startId, endId, board, false) && !endCase) {
              console.log(startId, endId);
              mat = false;
            }
          }
        }
      }
    }
    return mat;
  }
}
