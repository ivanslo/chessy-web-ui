jest.mock("../../Data/GameProvider", () => ({
  getGame: (name: string) => {
    return {
      steps: [
        {
          board: [
            "rnbqkbnr",
            "pppppppp",
            "........",
            "........",
            "........",
            "........",
            "PPPPPPPP",
            "RNBQKBNR",
          ],
        },
        {
          board: [
            "rnbqkbnr",
            "pppppppp",
            "........",
            "........",
            "....P...",
            "........",
            "PPPP PPP",
            "RNBQKBNR",
          ],
        },
        {
          board: [
            "rnbqkbnr",
            "pppp.ppp",
            "........",
            "....p...",
            "....P...",
            "........",
            "PPPP PPP",
            "RNBQKBNR",
          ],
        },
      ],
    };
  },
}));
import MatchPlayer from "../MatchPlayer.svelte";
import { render, fireEvent } from "@testing-library/svelte";
import { getGame } from "../../Data/GameProvider";

// getIndex: helper function. given 'a' and '8', returns the index of such position
// in the board represented by the 1-dimension array ('0' in this case)
const getIndex = (file: string, rank: number) => {
  let fileNr = 0;
  if (file === "a") fileNr = 0;
  if (file === "b") fileNr = 1;
  if (file === "c") fileNr = 2;
  if (file === "d") fileNr = 3;
  if (file === "e") fileNr = 4;
  if (file === "f") fileNr = 4;
  if (file === "g") fileNr = 6;
  if (file === "h") fileNr = 7;
  const rankNr = 8 - rank;

  return rankNr * 8 + fileNr;
};

describe("MatchPlayer", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  test("Pressing the > Buttons moves to the next postiion", async () => {
    const { getByText, queryAllByTestId } = render(MatchPlayer);

    const pieces = queryAllByTestId("piece");
    const pieceValues = pieces.map((p) => p.dataset.piecevalue);
    expect(pieceValues.length).toEqual(64);

    // move to the next board
    const buttonForward = getByText(">");
    await fireEvent.click(buttonForward);

    const piecesAfter = queryAllByTestId("piece");
    const pieceValuesAfter = piecesAfter.map((p) => p.dataset.piecevalue);
    expect(pieceValuesAfter.length).toEqual(64);

    // both renderings are different in only 2 positions: e2 and e4 (the pawn moves)
    expect(pieceValues).not.toEqual(pieceValuesAfter);
    let different = 0;
    pieceValues.forEach((val, i) => {
      if (val !== pieceValuesAfter[i]) different++;
    });
    expect(different).toBe(2);

    // the difference is only in e2 and e4
    const e2 = getIndex("e", 2);
    const e4 = getIndex("e", 4);
    expect(pieceValues[e2]).not.toEqual(pieceValuesAfter[e2]);
    expect(pieceValues[e4]).not.toEqual(pieceValuesAfter[e4]);
    // in another place, pieces are the same
    const e1 = getIndex("e", 1);
    expect(pieceValues[e1]).toEqual(pieceValuesAfter[e1]);
  });
  test("the effects of >  button is limitted to the amount of movements in the board", async () => {
    // Actually, the `>` should be disabled in the UI at the limit.
    // However, this tests ensures the board looks the same even if keep pressing `>`
    const { getByText, queryAllByTestId } = render(MatchPlayer);
    const buttonForward = getByText(">");
    const gameLength = getGame("").steps.length;

    const pieceValuesArr = [];

    for (let i = 0; i < gameLength; i++) {
      const pieces = queryAllByTestId("piece");
      pieceValuesArr.push(pieces.map((p) => p.dataset.piecevalue));
      await fireEvent.click(buttonForward);
    }

    // all different
    for (let i = 0; i < pieceValuesArr.length - 1; i++) {
      expect(pieceValuesArr[i]).not.toEqual(pieceValuesArr[i + 1]);
    }

    // if Keep pressing forward, board looks the same
    await fireEvent.click(buttonForward);
    const piecesAfter = queryAllByTestId("piece");
    const pieceValuesAfter = piecesAfter.map((p) => p.dataset.piecevalue);
    expect(pieceValuesArr[pieceValuesArr.length - 1]).toEqual(pieceValuesAfter);
  });
  test("the effects of < button is bounded to be always 0 and above", async () => {
    // Actually, the `<` should be disabled in the UI at the limit.
    // However, this tests ensures the board looks the same even if keep pressing `<`
    const { getByText, queryAllByTestId } = render(MatchPlayer);
    const buttonForward = getByText(">");
    const buttonBackward = getByText("<");
    const gameLength = getGame("").steps.length;

    const pieceValuesArr = [];

    for (let i = 0; i < gameLength; i++) {
      const pieces = queryAllByTestId("piece");
      pieceValuesArr.push(pieces.map((p) => p.dataset.piecevalue));
      await fireEvent.click(buttonForward);
    }

    // triggering `<` button
    for (let i = 0; i < gameLength; i++) {
      const pieces = queryAllByTestId("piece");
      const pieceValues = pieces.map((p) => p.dataset.piecevalue);
      expect(pieceValues).toEqual(pieceValuesArr[gameLength - 1 - i]);
      await fireEvent.click(buttonBackward);
    }

    // Keep pressing `<` button
    await fireEvent.click(buttonBackward);
    await fireEvent.click(buttonBackward);
    await fireEvent.click(buttonBackward);
    const pieces = queryAllByTestId("piece");
    const pieceValues = pieces.map((p) => p.dataset.piecevalue);
    expect(pieceValues).toEqual(pieceValuesArr[0]);
  });
});
