// ==========Board Global Config==========

const chessBoard = document.querySelector(".board");
const chessLetter = ["a", "b", "c", "d", "e", "f", "g", "h"];
const Board = {
  a8: { type: "rook", color: "black" },
  b8: { type: "knight", color: "black" },
  c8: { type: "bishop", color: "black" },
  d8: { type: "queen", color: "black" },
  e8: { type: "king", color: "black" },
  f8: { type: "bishop", color: "black" },
  g8: { type: "knight", color: "black" },
  h8: { type: "rook", color: "black" },
  a7: { type: "pawn", color: "black" },
  b7: { type: "pawn", color: "black" },
  c7: { type: "pawn", color: "black" },
  d7: { type: "pawn", color: "black" },
  e7: { type: "pawn", color: "black" },
  f7: { type: "pawn", color: "black" },
  g7: { type: "pawn", color: "black" },
  h7: { type: "pawn", color: "black" },

  a1: { type: "rook", color: "white" },
  b1: { type: "knight", color: "white" },
  c1: { type: "bishop", color: "white" },
  d1: { type: "queen", color: "white" },
  e1: { type: "king", color: "white" },
  f1: { type: "bishop", color: "white" },
  g1: { type: "knight", color: "white" },
  h1: { type: "rook", color: "white" },
  a2: { type: "pawn", color: "white" },
  b2: { type: "pawn", color: "white" },
  c2: { type: "pawn", color: "white" },
  d2: { type: "pawn", color: "white" },
  e2: { type: "pawn", color: "white" },
  f2: { type: "pawn", color: "white" },
  g2: { type: "pawn", color: "white" },
  h2: { type: "pawn", color: "white" },
};

const pawnChoices = [
  { type: "rook", color: "white" },
  { type: "knight", color: "white" },
  { type: "bishop", color: "white" },
  { type: "queen", color: "white" },
  { type: "rook", color: "black" },
  { type: "knight", color: "black" },
  { type: "bishop", color: "black" },
  { type: "queen", color: "black" },
];

let piecePlayed = {};

// ==========Board Creation==========

function initBoard() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const boardCase = document.createElement("div");
      if ((i + j) % 2 == 0) {
        boardCase.classList.add("white");
      } else {
        boardCase.classList.add("black");
      }
      boardCase.id = [chessLetter[j] + (8 - i)];
      boardCase.classList.add("clickable");
      chessBoard.appendChild(boardCase);
    }
  }

  for (let index in pawnChoices) {
    let pieceChoiceImg = document.createElement("img");
    pieceChoiceImg.src =
      `assets/${pawnChoices[index].color}_` + `${pawnChoices[index].type}.png`;
    pieceChoiceImg.className = "pieceChoices";
    pieceChoiceImg.id = `${pawnChoices[index].color}_${pawnChoices[index].type}`;
    document
      .querySelector(`#pawnChoice${pawnChoices[index].color}`)
      .appendChild(pieceChoiceImg);

    pieceChoiceImg.addEventListener("click", () => {
      let [color, type] = pieceChoiceImg.id.split("_");
      Board[piecePlayed.end].type = type;

      let indexOfpiece = document.querySelector("#" + piecePlayed.end);
      indexOfpiece.querySelector("img").src = `assets/${color}_${type}.png`;
      document.querySelector(`#pawnChoice${color}`).style.display = "none";
    });
  }
}

// ==========Image Initialisation==========

function initPieces() {
  for (let piece in Board) {
    let indexOfpiece = document.querySelector("#" + piece);
    let pieceImg = document.createElement("img");
    pieceImg.src =
      "assets/" + Board[piece].color + "_" + Board[piece].type + ".png";
    pieceImg.classList.add("piece");
    pieceImg.setAttribute("draggable", true);
    indexOfpiece.appendChild(pieceImg);
  }
}

// ==========Drag & Drop==========

function dragAndDrop() {
  const listPieces = document.querySelectorAll(".piece");
  const listCases = document.querySelectorAll(".clickable");

  listPieces.forEach((piece) => {
    piece.addEventListener("dragstart", (e) => {
      let idParent = e.target.parentElement.id;
      e.dataTransfer.setData("text", idParent);
    });
  });

  listCases.forEach((cases) => {
    cases.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    cases.addEventListener("drop", (e) => {
      const data = e.dataTransfer.getData("text");
      const startCase = document.getElementById(data);
      const moovePiece = startCase.querySelector(".piece");
      const pieceHere = e.currentTarget.querySelector(".piece");
      const legalMoove = isLegalMoove(data, e.currentTarget.id);
      const causesCheck = inCheck(data, e.currentTarget.id);
      if (legalMoove && !causesCheck) {
        if (pieceHere) {
          pieceHere.remove();
        }
        Board[e.currentTarget.id] = Board[data];
        delete Board[data];
        e.currentTarget.appendChild(moovePiece);
      }
    });
  });
}

// ==========Calculate Coords==========

function idToCoords(id) {
  const x = parseInt(id[1]);
  const y = chessLetter.indexOf(id[0]) + 1;

  return { x, y };
}

function coordsToId(x, y) {
  return chessLetter[y - 1] + x;
}

// ==========Global Rules==========

function isLegalMoove(idStart, idEnd) {
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

function pawnLegalMoove(idStart, idEnd) {
  const startPiece = Board[idStart];

  const start = idToCoords(idStart);
  const end = idToCoords(idEnd);

  const pieceHere = Board[idEnd];

  let mooveWhiteLimit = 1;
  let mooveBlackLimit = -1;

  /*for (let i = start.x + 1; i < end.x; i++) {
    let id = chessLetter[7 - end.y] + i;
    console.log(id);
    const checkPieceBetween = Board[id];
    console.log(checkPieceBetween);
    if (checkPieceBetween) return false;
  }*/

  if (start.y !== end.y && !pieceHere) {
    return false;
  } else if (
    pieceHere &&
    (end.y === start.y ||
      start.x === end.x ||
      end.x - start.x > 1 ||
      start.x - end.x > 1)
  ) {
    return false;
  } else if (end.y - start.y > 1 || start.y - end.y > 1) {
    return false;
  }
  if (startPiece.color === "white" && start.x === 2) {
    mooveWhiteLimit = 2;
  }

  if (startPiece.color === "black" && start.x === 7) {
    mooveBlackLimit = -2;
  }

  if (
    (startPiece.color === "white" && end.x - start.x > mooveWhiteLimit) ||
    (startPiece.color === "white" && end.x - start.x < 0)
  ) {
    return false;
  } else if (
    (startPiece.color === "black" && end.x - start.x < mooveBlackLimit) ||
    (startPiece.color === "black" && end.x - start.x > 0)
  ) {
    return false;
  }

  if (end.x === 8 || end.x === 1) {
    const colorChoice = document.querySelector(
      `#pawnChoice${startPiece.color}`,
    );
    colorChoice.style.display = "grid";
  }

  return true;
}

function rookLegalMoove(idStart, idEnd) {
  const start = idToCoords(idStart);
  const end = idToCoords(idEnd);

  if (start.x === end.x || start.y === end.y) {
    return true;
  }

  return false;
}

function bishopLegalMoove(idStart, idEnd) {
  const start = idToCoords(idStart);
  const end = idToCoords(idEnd);

  if (Math.abs(end.x - start.x) === Math.abs(end.y - start.y)) {
    return true;
  }

  return false;
}

function knightLegalMoove(idStart, idEnd) {
  const start = idToCoords(idStart);
  const end = idToCoords(idEnd);

  if (
    (Math.abs(end.x - start.x) === 2 && Math.abs(end.y - start.y) === 1) ||
    (Math.abs(end.x - start.x) === 1 && Math.abs(end.y - start.y) === 2)
  ) {
    return true;
  }

  return false;
}

function queenLegalMoove(idStart, idEnd) {
  const start = idToCoords(idStart);
  const end = idToCoords(idEnd);

  if (Math.abs(end.x - start.x) === Math.abs(end.y - start.y)) {
    return true;
  }

  if (start.x === end.x || start.y === end.y) {
    return true;
  }

  return false;
}

function kingLegalMoove(idStart, idEnd) {
  const start = idToCoords(idStart);
  const end = idToCoords(idEnd);
  const mooveLimit = 1;

  if (
    Math.abs(end.x - start.x) > mooveLimit ||
    Math.abs(end.y - start.y) > mooveLimit
  ) {
    return false;
  }

  if (Math.abs(end.x - start.x) === Math.abs(end.y - start.y)) {
    return true;
  }

  if (start.x === end.x || start.y === end.y) {
    return true;
  }

  return false;
}

function isSquareAttacked(idSquare, ennemyColor) {
  const squarePosition = idToCoords(idSquare);
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
      let targetId = coordsToId(kx, ky);
      let piece = Board[targetId];

      if (piece && piece.color === ennemyColor && piece.type === "knight") {
        return true;
      }
    }
  }

  for (let p of pawnMoves) {
    let px = squarePosition.x + p[0];
    let py = squarePosition.y + p[1];
    if (px >= 1 && px <= 8 && py >= 1 && py <= 8) {
      let targetId = coordsToId(px, py);
      let piece = Board[targetId];
      if (piece && piece.color === ennemyColor && piece.type === "pawn") {
        return true;
      }
    }
  }

  for (let d of directions) {
    let checkX = squarePosition.x + d[0];
    let checkY = squarePosition.y + d[1];

    while (checkX >= 1 && checkX <= 8 && checkY >= 1 && checkY <= 8) {
      let targetId = coordsToId(checkX, checkY);
      let piece = Board[targetId];

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

function inCheck(idStart, idEnd) {
  const start = Board[idStart];
  const end = Board[idEnd];
  const myColor = start.color;
  const ennemyColor = myColor === "white" ? "black" : "white";

  if (!start) {
    return false;
  }

  Board[idEnd] = start;
  delete Board[idStart];

  let kingId = "";
  for (let id in Board) {
    if (Board[id].type === "king" && Board[id].color === myColor) {
      kingId = id;
      break;
    }
  }

  const isInCheck = isSquareAttacked(kingId, ennemyColor);

  Board[idStart] = start;
  if (end) {
    Board[idEnd] = end;
  } else {
    delete Board[idEnd];
  }

  return isInCheck;
}

function pathClear(startId, endId) {
  const start = idToCoords(startId);
  const end = idToCoords(endId);
}

initBoard();
initPieces();
dragAndDrop();
