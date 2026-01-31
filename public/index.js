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

const pawnChoice = [
  { type: "rook", color: "white" },
  { type: "knight", color: "white" },
  { type: "bishop", color: "white" },
  { type: "queen", color: "white" },
  { type: "rook", color: "black" },
  { type: "knight", color: "black" },
  { type: "bishop", color: "black" },
  { type: "queen", color: "black" },
];

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

  for (let index in pawnChoice) {
    let pieceChoiceImg = document.createElement("img");
    pieceChoiceImg.src =
      `assets/${pawnChoice[index].color}_` + `${pawnChoice[index].type}.png`;
    pieceChoiceImg.className = "pieceChoices";
    pieceChoiceImg.id = `${pawnChoice[index].color}_${pawnChoice[index].type}`;
    document
      .querySelector(`#pawnChoice${pawnChoice[index].color}`)
      .appendChild(pieceChoiceImg);
    pieceChoiceImg.addEventListener("click", () => {
      let [color, type] = pieceChoiceImg.id.split("_");
      console.log(color, type);
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
      if (legalMoove) {
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

// ==========Global Rules==========

const isCheck = false;

function isLegalMoove(idStart, idEnd) {
  const startPiece = Board[idStart];
  const endPiece = Board[idEnd];

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

  console.log(start, end);

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

  if (isCheck) {
    return false;
  }

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

initBoard();
initPieces();
dragAndDrop();
