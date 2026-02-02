import { pawnLegalMoove } from "./controls/pawn.js";
import { rookLegalMoove } from "./controls/rook.js";
import { bishopLegalMoove } from "./controls/bishop.js";
import { knightLegalMoove } from "./controls/knight.js";
import { queenLegalMoove } from "./controls/queen.js";
import { kingLegalMoove } from "./controls/king.js";

import { idToCoords } from "../components/calcCoords.js";

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

    const start = idToCoords(idStart, this.chessLetter);
    const end = idToCoords(idEnd, this.chessLetter);

    if (startPiece.type === "pawn") {
      return pawnLegalMoove(idStart, idEnd, start, end, board);
    }

    if (startPiece.type === "rook") {
      return rookLegalMoove(start, end);
    }

    if (startPiece.type === "bishop") {
      return bishopLegalMoove(start, end, board);
    }

    if (startPiece.type === "knight") {
      return knightLegalMoove(start, end);
    }

    if (startPiece.type === "queen") {
      return queenLegalMoove(start, end);
    }

    if (startPiece.type === "king") {
      return kingLegalMoove(start, end);
    }

    return true;
  }
}
