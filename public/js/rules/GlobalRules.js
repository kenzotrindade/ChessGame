import { pawnLegalMove } from "./controls/pawn.js";
import { rookLegalMove } from "./controls/rook.js";
import { bishopLegalMove } from "./controls/bishop.js";
import { knightLegalMove } from "./controls/knight.js";
import { queenLegalMove } from "./controls/queen.js";
import { kingLegalMove } from "./controls/king.js";

import { idToCoords } from "../components/calcCoords.js";

import PathClear from "./pathClear.js";
import { enPassant } from "./enPassant.js";
import { castling } from "./castling.js";

export default class GlobalRules {
  constructor() {
    this.piecePlayed = {
      start: null,
      end: null,
      color: null,
      type: null,
    };

    this.currentPiecePlayed = {};
    this.chessLetter = ["a", "b", "c", "d", "e", "f", "g", "h"];
    this.castling = true;
  }

  isLegalMove(idStart, idEnd, board) {
    const startPiece = board[idStart];
    const endPiece = board[idEnd];

    this.currentPiecePlayed = {
      start: idStart,
      end: idEnd,
      color: board[idStart].color,
      type: board[idStart].type,
    };

    /*console.log("pièce jouée : \n", this.currentPiecePlayed);
    console.log("\npièce jouée précedemment : \n", this.piecePlayed);
*/
    if (idStart === idEnd) {
      return false;
    }

    if (endPiece && startPiece.color === endPiece.color) {
      return false;
    }

    const start = idToCoords(idStart, this.chessLetter);
    const end = idToCoords(idEnd, this.chessLetter);
    /*console.log(
      "test\n\n",
      idStart,
      idEnd,
      "\n",
      startPiece,
      "\n",
      endPiece,
      "\n",
      start,
      end,
    );*/

    const pathClear = new PathClear(
      idStart,
      idEnd,
      start,
      end,
      this.chessLetter,
      board,
    );

    console.log(start, end);

    if (endPiece && endPiece.type === "king") {
      return false;
    }

    if (pathClear.check) {
      if (startPiece.type === "pawn") {
        if (
          enPassant(
            this.currentPiecePlayed,
            this.piecePlayed,
            this.chessLetter,
            board,
          )
        )
          return true;
        else if (pawnLegalMove(idStart, idEnd, start, end, board)) {
          this.piecePlayed = this.currentPiecePlayed;
        } else return false;
      }

      if (startPiece.type === "rook") {
        if (rookLegalMove(start, end)) {
          this.piecePlayed = this.currentPiecePlayed;
          this.castling = false;
        } else return false;
      }

      if (startPiece.type === "bishop") {
        if (bishopLegalMove(start, end, board)) {
          this.piecePlayed = this.currentPiecePlayed;
        } else return false;
      }

      if (startPiece.type === "knight") {
        if (knightLegalMove(start, end)) {
          this.piecePlayed = this.currentPiecePlayed;
        } else return false;
      }

      if (startPiece.type === "queen") {
        if (queenLegalMove(start, end)) {
          this.piecePlayed = this.currentPiecePlayed;
        } else return false;
      }

      if (startPiece.type === "king") {
        if (kingLegalMove(start, end)) {
          if (this.castling)
            castling(this.piecePlayed, this.chessLetter, board);
          this.piecePlayed = this.currentPiecePlayed;
          this.castling = false;
        } else return false;
      }
    } else return false;

    this.piecePlayed = this.currentPiecePlayed;

    return true;
  }
}
