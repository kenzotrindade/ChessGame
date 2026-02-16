import { idToCoords } from "../components/calcCoords.js";
import { coordsToId } from "../components/calcCoords.js";
import Check from "./checkMate.js";

export function castling(rules, board, idStart, idEnd, start, end, verif) {
  //B1, G1, white, B8, G8, black
  const legalCast = ["c1", "g1", "c8", "g8"];

  if (verif || !rules.castling[board[idStart].color]) return false;

  const check = new Check(rules);
  if (check.isSquareAttacked(idStart, board)) {
    console.log("vous êtes en échec");
    return false;
  }

  if (legalCast.includes(idEnd)) {
    const towersId = Object.keys(board).filter(
      (id) =>
        board[id].type === "rook" && board[id].color === board[idStart].color,
    );
    let towersCoord = [];
    for (let id in towersId) {
      towersCoord.push(idToCoords(towersId[id], rules.chessLetter));
    }

    let count = [];

    for (let index in towersCoord) {
      count[index] = 0;
      const increment = towersCoord[index].y === 1 ? -1 : 1;
      for (let i = end.y * increment; i != towersCoord[index].y; i++) {
        count[index]++;
      }
    }

    const line = board[idStart].color === "white" ? 1 : 8;
    const column = count[0] < count[1] ? "d" : "f";
    const towerIndex = count[0] < count[1] ? 0 : 1;
    const sens =
      towerIndex === 0
        ? [towersCoord[towerIndex], start]
        : [start, towersCoord[towerIndex]];

    for (let i = sens[0].y + 1; i < sens[1].y - 1; i++) {
      let id = coordsToId(sens[0].x, i, rules.chessLetter);
      if (board[id]) {
        return false;
      }
    }

    const newCase = `${column}${line}`;
    const lastCase = document.querySelector(`#${towersId[towerIndex]}`);
    const movePiece = lastCase.querySelector(".piece");
    board[newCase] = board[towersId[towerIndex]];
    delete board[towersId[towerIndex]];
    document.querySelector(`#${newCase}`).appendChild(movePiece);

    return true;
  }

  return false;
}
