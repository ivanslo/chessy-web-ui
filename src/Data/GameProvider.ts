/* game1 has the board in a 2d array;
 * game2 has only the pgn and an array of 8 strings, one per row, is added here
 */
import { receivedGameValidator } from "./Validator";

interface Step {
  boardStrings: string[];
}

interface Game {
  steps: Step[];
}

export const fenToStepBoard: (fen: string) => string[] = (fen: string) => {
  return fen
    .split("")
    .map((a) => (/\d/.test(a) ? ".".repeat(parseInt(a)) : a))
    .join("")
    .split("/");
};

const getGame: (gameId: string) => Promise<Game> = async (gameId: string) => {
  const gameUrl = `https://chessy-processed-games.s3.eu-west-2.amazonaws.com/game${gameId}.json`;

  const response = await fetch(gameUrl, { method: "GET" });

  if (!response.ok) {
    throw Error(
      `Error while downloading the game with gameId=${gameId}. HTTP Status: ${response.status}`
    );
  }
  const returnGame: Game = { steps: [] as Step[] };

  try {
    const gameJson = await response.json();
    const validGameJson = receivedGameValidator(gameJson);

    for (let step of validGameJson.steps) {
      returnGame.steps.push({
        boardStrings: fenToStepBoard(step.board),
      });
    }
  } catch (error) {
    throw Error(`Error while parsing the downloaded file: ${error.message}`);
  }
  return returnGame;
};

export { getGame, Game };
