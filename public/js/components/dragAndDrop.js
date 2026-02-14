import Check from "../rules/checkMate.js";

export function dragAndDrop(board, rules) {
  const listPieces = document.querySelectorAll(".piece");
  const listCases = document.querySelectorAll(".clickable");

  listPieces.forEach((piece) => {
    piece.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text", e.target.parentElement.id);
    });
  });

  listCases.forEach((cases) => {
    cases.addEventListener("dragover", (e) => e.preventDefault());

    cases.addEventListener("drop", (e) => {
      const data = e.dataTransfer.getData("text");
      const targetId = e.currentTarget.id;
      if (!data || !targetId) return;

      const startCase = document.getElementById(data);
      const movePiece = startCase.querySelector(".piece");
      const pieceHere = e.currentTarget.querySelector(".piece");

      console.log("\n\n");

      if (rules.isLegalMove(data, targetId, board)) {
        if (pieceHere) pieceHere.remove();

        const check = new Check(rules);

        if (!check.inCheck(data, targetId, board, false)) {
          board[targetId] = board[data];
          delete board[data];
          e.currentTarget.appendChild(movePiece);

          const nextColor =
            board[targetId].color === "white" ? "black" : "white";

          if (check.isCheckmate(board, nextColor)) console.log("perdu");

          rules.switchTurn();
        } else if (check.isCheckmate(board, board[data].color))
          alert("échec et mat");
        else alert("Coup impossible");
      }
    });
  });
}
