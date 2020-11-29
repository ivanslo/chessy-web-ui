import GameList from "../GameList.svelte";
import { render } from "@testing-library/svelte";

// TODO: THIS FILE
const flushPromises = () => new Promise(setImmediate);

describe("GameList", () => {
    const mockJsonResponse = jest.fn();
    beforeEach(() => {
        (global as any).fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: mockJsonResponse,
        });
    });
    test("Before resolving query  & download, there is a loading message", async () => {
        const { queryByTestId } = render(GameList);

        const loadingIndicator = queryByTestId("loading-indicator");
        expect(loadingIndicator).not.toBeNull();

        const gameBoard = queryByTestId("match-player");
        expect(gameBoard).toBeNull();
    });

    describe("uses the `cached` ones in the parent", () => {
        test("doesn't call fetch", () => {});
    });

    describe("fetch query", () => {
        test("correct/valid format ", () => {});
        // TODO: validate format of call
        test("incorrect/invalid format - error", () => {});
        test("unsuccessfull fetch query - displays error", () => {});
    });
    describe("interactions", () => {
        test("shows all the items fetched", () => {});
        test("when user clicks on them, the event is dispatched", () => {});
        test("when user clicks on item, the event is forwarded", () => {});
    });
});
