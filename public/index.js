// ==========Board Var Config==========

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
}

// ==========Image Initialisation==========

function initPieces() {
  for (let piece in Board) {
    let indexOfpiece = document.querySelector("#" + piece);
    let pieceImg = document.createElement("img");
    pieceImg.src =
      "assets/" + Board[piece].color + "_" + Board[piece].type + ".png";
    pieceImg.classList.add("piece");
    pieceImg.draggable = true;
    indexOfpiece.appendChild(pieceImg);
  }
}

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
      e.currentTarget.appendChild(moovePiece);
    });
  });
}

initBoard();
initPieces();
dragAndDrop();
