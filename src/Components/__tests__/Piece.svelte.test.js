import Piece from "../Piece.svelte";
import { render } from "@testing-library/svelte";

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
  test("A valid lower case letter uses the black image", () => {
    const { queryByTestId } = render(Piece, { piece: "q" });
    const element = queryByTestId("piece-img");
    expect(element).not.toEqual(null);
    expect(element.src).toMatch(/BQ/);
  });
  test("An valid upper case letter uses the white image", () => {
    const { queryByTestId } = render(Piece, { piece: "Q" });
    const element = queryByTestId("piece-img");
    expect(element).not.toEqual(null);
    expect(element.src).toMatch(/WQ/);
  });
});
