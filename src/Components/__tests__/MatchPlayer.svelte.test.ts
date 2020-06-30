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
      ],
    };
  },
}));
import MatchPlayer from "../MatchPlayer.svelte";
import { render, fireEvent } from "@testing-library/svelte";

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
  test("", async () => {
    const { getByText, queryAllByTestId } = render(MatchPlayer);

    const pieces = queryAllByTestId("piece");
    const pieceValues = pieces.map((p) => p.dataset.piecevalue);
    expect(pieceValues.length).toEqual(64);

    // -- move to the next board
    const buttonForward = getByText(">");
    await fireEvent.click(buttonForward);

    const piecesAfter = queryAllByTestId("piece");
    const pieceValuesAfter = piecesAfter.map((p) => p.dataset.piecevalue);
    expect(pieceValuesAfter.length).toEqual(64);

    // -- both renderings are different; by only 2 positions: the pawn moves from e2 to e4 (e2 and e4 are different)
    expect(pieceValues).not.toEqual(pieceValuesAfter);
    let different = 0;
    for (let i in pieceValues) {
      if (pieceValuesAfter[i] !== pieceValues[i]) {
        different++;
      }
    }
    expect(different).toBe(2);

    // -- the difference is only in e2 and e4
    const e2 = getIndex("e", 2);
    const e4 = getIndex("e", 4);
    expect(pieceValues[e2]).not.toEqual(pieceValuesAfter[e2]);
    expect(pieceValues[e4]).not.toEqual(pieceValuesAfter[e4]);
    // -- in another place, pieces are the same
    const e1 = getIndex("e", 1);
    expect(pieceValues[e1]).toEqual(pieceValuesAfter[e1]);
  });
});
