/* game1 has the board in a 2d array;
 * game2 has only the pgn and an array of 8 strings, one per row, is added here
 */
// import game1 from "./game1.json";
import game2 from "./game2.json";

const getGame = (gameId) => {
  // --- game 1
  // return game1;

  // --- game 2
  // TODO: this modifies game2 oject; I should better generate a new one
  for (let step of game2.steps) {
    step.board = step.fenAfter
      .split("")
      .map((a) => (/\d/.test(a) ? ".".repeat(parseInt(a)) : a))
      .join("")
      .split("/");
  }
  return game2;
};

export { getGame };
