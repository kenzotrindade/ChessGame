import { pawnLegalMoove } from "./controls/pawn.js";
import { rookLegalMoove } from "./controls/rook.js";
import { bishopLegalMoove } from "./controls/bishop.js";
import { knightLegalMoove } from "./controls/knight.js";
import { queenLegalMoove } from "./controls/queen.js";
import { kingLegalMoove } from "./controls/king.js";

import { idToCoords } from "../components/calcCoords.js";
import { coordsToId } from "../components/calcCoords.js";

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

  isSquareAttacked(idSquare, ennemyColor, board) {
    const squarePosition = idToCoords(idSquare, this.chessLetter);
    const pawnDirection = ennemyColor === "white" ? -1 : 1;
    const pawnMoves = [
      [pawnDirection, 1],
      [pawnDirection, -1],
    ];
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];
    const knightMoves = [
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2],
    ];

    for (let k of knightMoves) {
      let kx = squarePosition.x + k[0];
      let ky = squarePosition.y + k[1];

      if (kx >= 1 && kx <= 8 && ky >= 1 && ky <= 8) {
        let targetId = coordsToId(kx, ky, this.chessLetter);
        let piece = board[targetId];

        if (piece && piece.color === ennemyColor && piece.type === "knight") {
          return true;
        }
      }
    }

    for (let p of pawnMoves) {
      let px = squarePosition.x + p[0];
      let py = squarePosition.y + p[1];
      if (px >= 1 && px <= 8 && py >= 1 && py <= 8) {
        let targetId = coordsToId(px, py, this.chessLetter);
        let piece = board[targetId];
        if (piece && piece.color === ennemyColor && piece.type === "pawn") {
          return true;
        }
      }
    }

    for (let d of directions) {
      let checkX = squarePosition.x + d[0];
      let checkY = squarePosition.y + d[1];

      while (checkX >= 1 && checkX <= 8 && checkY >= 1 && checkY <= 8) {
        let targetId = coordsToId(checkX, checkY, this.chessLetter);
        let piece = board[targetId];

        if (piece) {
          if (piece.color === ennemyColor) {
            if (piece.type === "queen") {
              return true;
            }

            if ((d[0] === 0 || d[1] === 0) && piece.type === "rook") {
              return true;
            }

            if (d[0] !== 0 && d[1] !== 0 && piece.type === "bishop") {
              return true;
            }
          }
          break;
        }
        checkX += d[0];
        checkY += d[1];
      }
    }

    return false;
  }

  inCheck(idStart, idEnd, board) {
    const start = board[idStart];
    const end = board[idEnd];
    const myColor = start.color;
    const ennemyColor = myColor === "white" ? "black" : "white";

    if (!start) {
      return false;
    }

    board[idEnd] = start;
    delete board[idStart];

    let kingId = "";
    for (let id in board) {
      if (board[id].type === "king" && board[id].color === myColor) {
        kingId = id;
        break;
      }
    }

    const isInCheck = this.isSquareAttacked(kingId, ennemyColor, board);

    board[idStart] = start;
    if (end) {
      board[idEnd] = end;
    } else {
      delete board[idEnd];
    }

    return isInCheck;
  }
}
