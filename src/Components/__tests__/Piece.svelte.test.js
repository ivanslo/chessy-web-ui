import Piece from "../Piece.svelte";
import { render, fireEvent } from "@testing-library/svelte";

describe("Piece Component", () => {
  test("No Parameter doesn't add an image", () => {
    const { queryByTestId } = render(Piece);
    const element = queryByTestId("piece-img");
    expect(element).toEqual(null);
  });
  test("Invalid parameter doesn't add an image", () => {
    const { queryByTestId } = render(Piece, { piece: "l" });
    const element = queryByTestId("piece-img");
    expect(element).toEqual(null);
  });
  test("A lower case valid letter uses the black image", () => {
    const { queryByTestId } = render(Piece, { piece: "q" });
    const element = queryByTestId("piece-img");
    expect(element).not.toEqual(null);
    expect(element.src).toMatch(/BQ/);
  });
  test("An upper case valid letter uses the white image", () => {
    const { queryByTestId } = render(Piece, { piece: "Q" });
    const element = queryByTestId("piece-img");
    expect(element).not.toEqual(null);
    expect(element.src).toMatch(/WQ/);
  });
});
