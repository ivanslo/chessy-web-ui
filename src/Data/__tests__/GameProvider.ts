import { fenToStepBoard, getGame } from "../GameProvider";

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

describe("getGame", () => {
  const initialBoardInFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
  const initialBoardProcessed = [
    "rnbqkbnr",
    "pppppppp",
    "........",
    "........",
    "........",
    "........",
    "PPPPPPPP",
    "RNBQKBNR",
  ];

  describe("fetch succesful ", () => {
    const mockJsonResponse = jest.fn();
    beforeEach(() => {
      (global as any).fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: mockJsonResponse,
      });
    });
    test("Succesful getGame retuns the game processed", async () => {
      mockJsonResponse.mockResolvedValue({
        steps: [{ board: initialBoardInFEN }],
      });
      const result = await getGame("");
      expect(result).toEqual({
        steps: [{ boardStrings: initialBoardProcessed }],
      });
    });
    test("Fetched JSON is not a json", async () => {
      mockJsonResponse.mockResolvedValue("hello world");
      await expect(getGame("")).rejects.toThrow(/parsing.*object/);
    });
    test("Fetched JSON is malformed - unknown key 1", async () => {
      mockJsonResponse.mockResolvedValue({
        nosteps: [],
      });
      await expect(getGame("")).rejects.toThrow(/parsing.*steps/);
    });
    test("Fetched JSON is malformed - unknown key 2", async () => {
      mockJsonResponse.mockResolvedValue({
        steps: [{ noBoard: "" }],
      });
      await expect(getGame("")).rejects.toThrow(/parsing.*board/);
    });
    test("Fetched JSON has extra data", async () => {
      mockJsonResponse.mockResolvedValue({
        steps: [{ board: "asdf", extra: "" }],
      });
      await expect(getGame("")).resolves.not.toThrow();
    });
  });
  describe("fetch unsuccesful ", () => {
    /*
    Fetch either rejects the promise or resolve with `ok: false`
    https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 
    In any case, `getGame` should reject and be handled by the caller
    */
    const mockJest = jest.fn();
    beforeEach(() => {
      (global as any).fetch = mockJest;
    });
    test("fetch rejects the promise (CORS, internet..)", async () => {
      mockJest.mockRejectedValue(new Error("CORS issues"));
      await expect(getGame("")).rejects.toThrow(/CORS/);
    });
    test("fetch failes with an http error (ok=false)", async () => {
      mockJest.mockResolvedValue({ ok: false });
      await expect(getGame("")).rejects.toThrow(/downloading/);
    });
  });
  describe("fetch URL", () => {
    const mockFetch = jest.fn().mockResolvedValue({ ok: false });
    beforeEach(() => {
      (global as any).fetch = mockFetch;
    });
    test("fetch includes the gameId in the URL ", async () => {
      await expect(getGame("12345")).rejects.toThrow(/downloading/);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringMatching(/12345/),
        expect.any(Object)
      );
      await expect(getGame("98765")).rejects.toThrow(/downloading/);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringMatching(/98765/),
        expect.any(Object)
      );
    });
  });
});
