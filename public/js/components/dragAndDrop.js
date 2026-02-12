export function dragAndDrop(board, rules) {
  const listPieces = document.querySelectorAll(".piece");
  const listCases = document.querySelectorAll(".clickable");
  const chessLetter = ["a", "b", "c", "d", "e", "f", "g", "h"];

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

        board[targetId] = board[data];
        delete board[data];
        e.currentTarget.appendChild(movePiece);

        const nextColor = board[targetId].color === "white" ? "black" : "white";
      }
    });
  });
}
