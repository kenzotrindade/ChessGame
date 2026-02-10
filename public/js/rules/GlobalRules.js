import { pawnLegalMove } from "./controls/pawn.js";
import { rookLegalMove } from "./controls/rook.js";
import { bishopLegalMove } from "./controls/bishop.js";
import { knightLegalMove } from "./controls/knight.js";
import { queenLegalMove } from "./controls/queen.js";
import { kingLegalMove } from "./controls/king.js";

import { idToCoords } from "../components/calcCoords.js";

import { enPassant } from "./enPassant.js";
import PathClear from "./pathClear.js";
import { castling } from "./castling.js";

export default class GlobalRules {
  constructor() {
    this.piecePlayed = { start: null, end: null, color: null, type: null };
    this.currentPiecePlayed = {};
    this.chessLetter = ["a", "b", "c", "d", "e", "f", "g", "h"];
    this.castling = true;
  }

  isLegalMove(idStart, idEnd, board, isSimulated = false) {
    const startPiece = board[idStart];
    const endPiece = board[idEnd];

    if (!startPiece || idStart === idEnd) return false;
    if (endPiece && startPiece.color === endPiece.color) return false;

    const start = idToCoords(idStart, this.chessLetter);
    const end = idToCoords(idEnd, this.chessLetter);

    const pathClear = new PathClear(
      idStart,
      idEnd,
      start,
      end,
      this.chessLetter,
      board,
    );
    if (!pathClear.check) return false;

    let legal = false;
    const moveAttempt = {
      start: idStart,
      end: idEnd,
      color: startPiece.color,
      type: startPiece.type,
    };

    if (startPiece.type === "pawn") {
      if (enPassant(moveAttempt, this.piecePlayed, this.chessLetter, board)) {
        legal = true;
      } else {
        legal = pawnLegalMove(idStart, idEnd, start, end, board, isSimulated);
      }
    } else if (startPiece.type === "rook") legal = rookLegalMove(start, end);
    else if (startPiece.type === "bishop") legal = bishopLegalMove(start, end);
    else if (startPiece.type === "knight") legal = knightLegalMove(start, end);
    else if (startPiece.type === "queen") legal = queenLegalMove(start, end);
    else if (startPiece.type === "king") legal = kingLegalMove(start, end);

    if (legal && !isSimulated) {
      this.piecePlayed = moveAttempt;
    }

    return legal;
  }
}
