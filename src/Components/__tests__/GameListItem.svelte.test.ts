import GameList from "../GameList.svelte";
import { render } from "@testing-library/svelte";

// TODO: THIS FILE
const flushPromises = () => new Promise(setImmediate);

describe("GameListItem", () => {
    test("given the json, it renders that");
    test("low width doesn't show the event");
    test("pressing the match, a 'gameSelected' event is dispatched");
});
