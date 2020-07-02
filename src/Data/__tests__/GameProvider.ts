import { fenToStepBoard } from "../GameProvider";

const countHowMany = (board: string[], str: string) => {
  let count = 0;
  board.forEach((boardLine) => {
    for (let c of boardLine) if (c === str) count++;
  });
  return count;
};

describe("fenToStepBoard - FEN to an array of strings", () => {
  test("split the strings in `/` marks", () => {
    const stepBoard = fenToStepBoard("asdf/asdf/asdf");
    expect(stepBoard.length).toEqual(3);
  });
  test("puts as many `.` (dots) as numbers sum up", () => {
    const stepBoard = fenToStepBoard("3/4/5/asdf");
    const dots = countHowMany(stepBoard, ".");
    expect(dots).toEqual(12);
  });

  test("keeps the pieces notation as they are", () => {
    // initial chess-board position
    const stepBoard = fenToStepBoard(
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
    );
    const dots = countHowMany(stepBoard, ".");
    expect(dots).toEqual(32);

    const wPawn = countHowMany(stepBoard, "P");
    expect(wPawn).toEqual(8);
    const wBishop = countHowMany(stepBoard, "B");
    expect(wBishop).toEqual(2);
    const wKnight = countHowMany(stepBoard, "N");
    expect(wKnight).toEqual(2);
    const wRook = countHowMany(stepBoard, "R");
    expect(wRook).toEqual(2);
    const wKing = countHowMany(stepBoard, "K");
    expect(wKing).toEqual(1);
    const wQueen = countHowMany(stepBoard, "Q");
    expect(wQueen).toEqual(1);

    const bPawn = countHowMany(stepBoard, "p");
    expect(bPawn).toEqual(8);
    const bBishop = countHowMany(stepBoard, "b");
    expect(bBishop).toEqual(2);
    const bKnight = countHowMany(stepBoard, "n");
    expect(bKnight).toEqual(2);
    const bRook = countHowMany(stepBoard, "r");
    expect(bRook).toEqual(2);
    const bKing = countHowMany(stepBoard, "k");
    expect(bKing).toEqual(1);
    const bQueen = countHowMany(stepBoard, "q");
    expect(bQueen).toEqual(1);
  });
});
