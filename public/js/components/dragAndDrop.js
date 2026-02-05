export function dragAndDrop(board, rules) {
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
      const legalMoove = rules.isLegalMoove(data, e.currentTarget.id, board);
      //const causesCheck = rules.inCheck(data, e.currentTarget.id, board);
      if (legalMoove /*&& !causesCheck*/) {
        if (pieceHere) {
          pieceHere.remove();
        }
        board[e.currentTarget.id] = board[data];
        delete board[data];
        e.currentTarget.appendChild(moovePiece);
      }
    });
  });
}
