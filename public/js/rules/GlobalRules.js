export default class GlobalRules {
  constructor() {
    this.piecePlayed = {};
  }

  isLegalMoove(idStart, idEnd) {
    const startPiece = Board[idStart];
    const endPiece = Board[idEnd];

    piecePlayed = {
      start: idStart,
      end: idEnd,
      color: Board[idStart].color,
      type: Board[idStart].type,
    };

    if (idStart === idEnd) {
      return false;
    }

    if (endPiece && startPiece.color === endPiece.color) {
      return false;
    }

    if (startPiece.type === "pawn") {
      return pawnLegalMoove(idStart, idEnd);
    }

    if (startPiece.type === "rook") {
      return rookLegalMoove(idStart, idEnd);
    }

    if (startPiece.type === "bishop") {
      return bishopLegalMoove(idStart, idEnd);
    }

    if (startPiece.type === "knight") {
      return knightLegalMoove(idStart, idEnd);
    }

    if (startPiece.type === "queen") {
      return queenLegalMoove(idStart, idEnd);
    }

    if (startPiece.type === "king") {
      return kingLegalMoove(idStart, idEnd);
    }

    return true;
  }
}
