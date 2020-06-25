/* game1 has the board in a 2d array;
 * game2 has only the pgn and an array of 8 strings, one per row, is added here
 */
import * as game2 from "./game2.json";

interface Step {
  board: string[];
}

interface Game {
  steps: Step[];
}

const getGame: (gameId: string) => Game = (gameId: string) => {
  // --- game 1
  // return game1;

  const returnGame: Game = { steps: [] as Step[] };
  // --- game 2
  for (let step of game2.steps) {
    returnGame.steps.push({
      board: step.fenAfter
        .split("")
        .map((a) => (/\d/.test(a) ? ".".repeat(parseInt(a)) : a))
        .join("")
        .split("/"),
    });
  }
  return returnGame;
};

export { getGame, Game };
