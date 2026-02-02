import { dragAndDrop } from "../components/dragAndDrop.js";

export default class BoardManager {
  constructor(rules) {
    this.chessBoard = document.querySelector(".board");

    this.grid = {
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

    this.pawnChoices = [
      { type: "rook", color: "white" },
      { type: "knight", color: "white" },
      { type: "bishop", color: "white" },
      { type: "queen", color: "white" },
      { type: "rook", color: "black" },
      { type: "knight", color: "black" },
      { type: "bishop", color: "black" },
      { type: "queen", color: "black" },
    ];

    this.rules = rules;

    this.initBoard(rules);
    this.initPieces();
    dragAndDrop(this.grid, this.rules);
  }

  initBoard(rules) {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const boardCase = document.createElement("div");

        const isWhite = (i + j) % 2 === 0;
        boardCase.classList.add(isWhite ? "white" : "black");

        boardCase.id = this.rules.chessLetter[j] + (8 - i);
        boardCase.classList.add("clickable");
        this.chessBoard.appendChild(boardCase);
      }
    }
    this._initPromotionUI(rules);
  }

  initPieces() {
    for (let pieceCoord in this.grid) {
      const parentCase = document.getElementById(pieceCoord);
      const pieceData = this.grid[pieceCoord];

      const pieceImg = document.createElement("img");
      pieceImg.src = `assets/${pieceData.color}_${pieceData.type}.png`;
      pieceImg.classList.add("piece");
      pieceImg.setAttribute("draggable", true);

      parentCase.appendChild(pieceImg);
    }
  }

  _initPromotionUI(rules) {
    this.pawnChoices.forEach((choice) => {
      const pieceChoiceImg = document.createElement("img");
      pieceChoiceImg.src = `assets/${choice.color}_${choice.type}.png`;
      pieceChoiceImg.className = "pieceChoices";
      pieceChoiceImg.id = `${choice.color}_${choice.type}`;

      const container = document.querySelector(`#pawnChoice${choice.color}`);
      container.appendChild(pieceChoiceImg);

      pieceChoiceImg.addEventListener("click", () => {
        const { end } = rules.piecePlayed;
        this.grid[end].type = choice.type;

        const indexOfpiece = document.getElementById(end);
        indexOfpiece.querySelector("img").src = pieceChoiceImg.src;
        container.style.display = "none";
      });
    });
  }
}
