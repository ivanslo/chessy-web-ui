import Board from "../Board.svelte";
import { render } from "@testing-library/svelte";

describe("Board", () => {
  test("No parameter render no pieces", () => {
    const { queryAllByTestId } = render(Board);

    const pieces = queryAllByTestId("piece");
    expect(pieces.length).toEqual(0);
  });
  test("Passing 2 elements renders 2 pieces", () => {
    const { queryAllByTestId } = render(Board, { boardPieces: [[".", "."]] });

    const pieces = queryAllByTestId("piece");
    expect(pieces.length).toEqual(2);
  });
  test("Passing 3 elements renders 3 pieces", () => {
    const { queryAllByTestId } = render(Board, {
      boardPieces: [[".", ".", "."]],
    });
    const pieces = queryAllByTestId("piece");
    expect(pieces.length).toEqual(3);
  });
  test("renders all the elemtns in the sub-arrays - 1 subarray", () => {
    const { queryAllByTestId } = render(Board, { boardPieces: [[".", "."]] });

    const pieces = queryAllByTestId("piece");
    expect(pieces.length).toEqual(2);
  });
  test("Passing multiple sub-arrays renders all of them", () => {
    const { queryAllByTestId } = render(Board, {
      boardPieces: [
        [".", "."],
        [".", "."],
      ],
    });

    const pieces = queryAllByTestId("piece");
    expect(pieces.length).toEqual(4);
  });
});
