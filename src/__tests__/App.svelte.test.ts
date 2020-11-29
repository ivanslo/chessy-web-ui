const mockParseUrl = jest.fn().mockImplementation(() => {
  return { query: {} };
});
const mockGetGame = jest.fn();

jest.mock("query-string", () => ({
  parseUrl: jest.fn().mockImplementation(mockParseUrl),
}));
jest.mock("../Data/GameProvider", () => ({
  getGame: mockGetGame,
}));

import App from "../App.svelte";
import { render } from "@testing-library/svelte";

const flushPromises = () => new Promise(setImmediate);

describe("App", () => {
  test("true", () => expect(1).toEqual(1));
  // test("Before resolving query  & download, there is a loading message", async () => {
  //   const { queryByTestId } = render(App);
  //   const loadingIndicator = queryByTestId("loading-indicator");
  //   expect(loadingIndicator).not.toBeNull();
  //   const gameBoard = queryByTestId("match-player");
  //   expect(gameBoard).toBeNull();
  // });
  // test("No gameId specified shows message", async () => {
  //   const { queryByTestId } = render(App);
  //   await flushPromises();
  //   const errorMsg = queryByTestId("loading-error-msg");
  //   expect(errorMsg).not.toBeNull();
  //   expect(errorMsg.textContent).toEqual("No gameId specified");
  //   const gameBoard = queryByTestId("match-player");
  //   expect(gameBoard).toBeNull();
  // });
  // test("gameId specified | rejected getGame", async () => {
  //   mockParseUrl.mockImplementation(() => {
  //     return { query: { gameId: 1 } };
  //   });
  //   mockGetGame.mockRejectedValue(new Error("Error downloading"));
  //   const { queryByTestId } = render(App);
  //   await flushPromises();
  //   const errorMsg = queryByTestId("loading-error-msg");
  //   expect(errorMsg).not.toBeNull();
  //   expect(errorMsg.textContent).toEqual("Error downloading");
  //   const gameBoard = queryByTestId("match-player");
  //   expect(gameBoard).toBeNull();
  // });
  // test("gameId specified | successfull getGame ", async () => {
  //   mockParseUrl.mockImplementation(() => {
  //     return { query: { gameId: 1 } };
  //   });
  //   mockGetGame.mockResolvedValue({
  //     steps: [{ boardStrings: ["rnbqkbnr", "pppppppp", "........."] }],
  //   });
  //   const { queryByTestId } = render(App);
  //   await flushPromises();
  //   const errorMsg = queryByTestId("loading-error-msg");
  //   expect(errorMsg).toBeNull();
  //   const gameBoard = queryByTestId("match-player");
  //   expect(gameBoard).not.toBeNull();
  // });
});
