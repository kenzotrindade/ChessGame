import { coordsToId } from "../components/calcCoords.js";

export default class PathClear {
  constructor(idStart, start, end, chessLetter, board) {
    this.idStart = idStart;
    this.checkX = start.x - end.x;
    this.checkY = start.y - end.y;
    this.idTab = chessLetter;
    this.board = board;
    this.start = start;
    this.end = end;
    this.check = true;

    this.direction = [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];

    this.pathClear();
  }

  pathClear() {
    if (this.checkX === 0) {
      const abs = "y";
      if (this.checkY < 0) {
        this.checkLine(this.start, this.end, abs);
      } else {
        this.checkLine(this.end, this.start, abs);
      }
    } else if (this.checkY === 0) {
      const abs = "x";
      if (this.checkX < 0) {
        this.checkLine(this.start, this.end, abs);
      } else {
        this.checkLine(this.end, this.start, abs);
      }
    }

    if (
      this.board[this.idStart].type != "knight" &&
      this.board[this.idStart].type != "pawn"
    ) {
      if (this.checkX < 0 && this.checkY < 0) {
        this.checkDiag(this.direction[0]);
      } else if (this.checkX < 0 && this.checkY > 0) {
        this.checkDiag(this.direction[1]);
      } else if (this.checkX > 0 && this.checkY < 0) {
        this.checkDiag(this.direction[2]);
      } else if (this.checkX > 0 && this.checkY > 0) {
        this.checkDiag(this.direction[3]);
      }
    }
  }

  checkLine(startPoint, endPoint, abs) {
    let id = null;
    for (let i = startPoint[abs] + 1; i < endPoint[abs]; i++) {
      if (abs === "y") {
        id = coordsToId(startPoint.x, i, this.idTab);
      } else {
        id = coordsToId(i, startPoint.y, this.idTab);
      }
      if (this.board[id]) this.check = false;
    }
  }

  checkDiag(dir) {
    let currentX = this.start.x;
    let currentY = this.start.y;
    while (currentX != this.end.x && currentY != this.end.y) {
      currentX += dir[0];
      currentY += dir[1];
      let id = coordsToId(currentX, currentY, this.idTab);
      if (this.board[id]) this.check = false;
    }
  }
}
