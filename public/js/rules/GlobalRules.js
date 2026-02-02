import { pawnLegalMoove } from "./controls/pawn.js";
import { rookLegalMoove } from "./controls/rook.js";
import { bishopLegalMoove } from "./controls/bishop.js";
import { knightLegalMoove } from "./controls/knight.js";
import { queenLegalMoove } from "./controls/queen.js";
import { kingLegalMoove } from "./controls/king.js";

export default class GlobalRules {
  constructor() {
    this.piecePlayed = {};
    this.chessLetter = ["a", "b", "c", "d", "e", "f", "g", "h"];
  }

  isLegalMoove(idStart, idEnd, board) {
    const startPiece = board[idStart];
    const endPiece = board[idEnd];

    this.piecePlayed = {
      start: idStart,
      end: idEnd,
      color: board[idStart].color,
      type: board[idStart].type,
    };

    if (idStart === idEnd) {
      return false;
    }

    if (endPiece && startPiece.color === endPiece.color) {
      return false;
    }

    if (startPiece.type === "pawn") {
      return pawnLegalMoove(idStart, idEnd, board);
    }

    if (startPiece.type === "rook") {
      return rookLegalMoove(idStart, idEnd, board);
    }

    if (startPiece.type === "bishop") {
      return bishopLegalMoove(idStart, idEnd, board);
    }

    if (startPiece.type === "knight") {
      return knightLegalMoove(idStart, idEnd, board);
    }

    if (startPiece.type === "queen") {
      return queenLegalMoove(idStart, idEnd, board);
    }

    if (startPiece.type === "king") {
      return kingLegalMoove(idStart, idEnd, board);
    }

    return true;
  }
}
