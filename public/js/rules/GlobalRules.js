import { pawnLegalMove } from "./controls/pawn.js";
import { rookLegalMove } from "./controls/rook.js";
import { bishopLegalMove } from "./controls/bishop.js";
import { knightLegalMove } from "./controls/knight.js";
import { queenLegalMove } from "./controls/queen.js";
import { kingLegalMove } from "./controls/king.js";

import { idToCoords } from "../components/calcCoords.js";

import { enPassant } from "./enPassant.js";
import { castling } from "./castling.js";

import PathClear from "./pathClear.js";

export default class GlobalRules {
  constructor() {
    this.playedPiece = { start: null, end: null, color: null, type: null };
    this.currentPlayedPiece = {
      start: null,
      end: null,
      color: null,
      type: null,
    };
    this.chessLetter = ["a", "b", "c", "d", "e", "f", "g", "h"];
    this.castling = true;

    this.turn = "white";

    this.checkMate = false;
  }

  switchTurn() {
    this.turn = this.turn === "white" ? "black" : "white";
  }

  isLegalMove(idStart, idEnd, board) {
    const startPiece = board[idStart];
    const endPiece = board[idEnd];

    /*if (!startPiece || startPiece.color !== this.turn) {
      alert("Ce n'est pas votre tour");
      return false;
    }*/
    if (!startPiece || idStart === idEnd) return false;
    if (endPiece && startPiece.color === endPiece.color) return false;

    const start = idToCoords(idStart, this.chessLetter);
    const end = idToCoords(idEnd, this.chessLetter);

    this.currentPlayedPiece = {
      start: idStart,
      end: idEnd,
      color: board[idStart].color,
      type: board[idStart].type,
    };

    let legal = this.pieceMove(idStart, idEnd, board, false);

    console.log("pièce actuelle", this.currentPlayedPiece);
    console.log("pièce précédente", this.playedPiece);

    return legal;
  }

  pieceMove(idStart, idEnd, board, check) {
    let legal = false;

    const startPiece = board[idStart];
    const endPiece = board[idEnd];

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

    if (startPiece.type === "pawn") {
      if (
        enPassant(
          this.currentPlayedPiece,
          this.playedPiece,
          this.chessLetter,
          check,
        )
      )
        legal = true;
      else legal = pawnLegalMove(idStart, idEnd, start, end, board, check);
    } else if (startPiece.type === "rook") legal = rookLegalMove(start, end);
    else if (startPiece.type === "bishop") legal = bishopLegalMove(start, end);
    else if (startPiece.type === "knight") legal = knightLegalMove(start, end);
    else if (startPiece.type === "queen") legal = queenLegalMove(start, end);
    else if (startPiece.type === "king") {
      if (castling(this, board)) legal = true;
      else legal = kingLegalMove(start, end);
    }
    return legal;
  }
}
