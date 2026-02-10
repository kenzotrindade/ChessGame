import { coordsToId } from "../components/calcCoords.js";
import GlobalRules from "./GlobalRules.js";

export function isSquareAttacked(targetId, attackerColor, board, rules) {
  for (let startId in board) {
    if (board[startId].color === attackerColor) {
      if (rules.isLegalMove(startId, targetId, board)) {
        return true;
      }
    }
  }
  return false;
}

export function inCheck(idStart, idEnd, board, rules) {
  const movingPiece = board[idStart];
  const targetPiece = board[idEnd];
  const myColor = movingPiece.color;
  const enemyColor = myColor === "white" ? "black" : "white";

  board[idEnd] = movingPiece;
  delete board[idStart];

  let kingId = "";
  for (let id in board) {
    if (board[id].type === "king" && board[id].color === myColor) {
      kingId = id;
      break;
    }
  }

  const result = isSquareAttacked(kingId, enemyColor, board, rules);

  board[idStart] = movingPiece;
  if (targetPiece) {
    board[idEnd] = targetPiece;
  } else {
    delete board[idEnd];
  }

  return result;
}

export function isCheckmate(color, board, rules, chessLetter) {
  const enemyColor = color === "white" ? "black" : "white";

  let kingId = "";
  for (let id in board) {
    if (board[id].type === "king" && board[id].color === color) {
      kingId = id;
      break;
    }
  }

  if (!isSquareAttacked(kingId, enemyColor, board, rules)) {
    return false;
  }

  const myPieces = Object.keys(board).filter((id) => board[id].color === color);

  for (let startId of myPieces) {
    for (let l of chessLetter) {
      for (let n = 1; n <= 8; n++) {
        let endId = l + n;

        if (
          rules.isLegalMove(startId, endId, board) &&
          !inCheck(startId, endId, board, rules)
        ) {
          return false;
        }
      }
    }
  }
  return true;
}
