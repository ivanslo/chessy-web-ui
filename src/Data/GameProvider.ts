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

/**
 * Parse the game downloaded, adding a new member per board position called `boardStrings`.
 * This new memeber is a 2d array of the board. It's obtained by parsing the FEN string in the game
 * @param inputGame a game-type object, which a `steps` array, where each element has a `board` string memeber.
 */
export const parseGame: (inputGame: object) => Game = (inputGame: object) => {
  const returnGame: Game = { steps: [] as Step[] };
  try {
    const validGameJson = receivedGameValidator(inputGame);

    for (let step of validGameJson.steps) {
      returnGame.steps.push({
        boardStrings: fenToStepBoard(step.board),
      });
    }
  } catch (error) {
    throw Error(`Error while parsing the game: ${error.message}`);
  }
  return returnGame;
};

/**
 * @deprecated
 * getGame fetches the game from S3 and parses it.
 * TODO: remove it
 * @param gameId
 */
const getGame: (gameId: string) => Promise<Game> = async (gameId: string) => {
  const gameUrl = `https://chessy-processed-games.s3.eu-west-2.amazonaws.com/v1/game${gameId}.json`;

  const response = await fetch(gameUrl, { method: "GET" });

  if (!response.ok) {
    throw Error(
      `Error while downloading the game with gameId=${gameId}. HTTP Status: ${response.status}`
    );
  }
  const game = await response.json();
  return parseGame(game);
};

export { getGame, Game };
