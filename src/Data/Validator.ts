// /* ---------------------------------------------- */
/* Received Game from Internet -- Data Validator */

/* NOTE:
the ideal solution would be to use a library like @hapi/joi, but this would require 
some 'node-polyfill' since it was apparently designed to be used server-side.
With a library like this, one could define the schema like this:
```
const gameSchema = { steps: Joi.array().items(Joi.object({ board: Joi.string() })) };
```
and then call it like:
```
gameSchema.validate(obj, { abortEarly: true });
```

In case I need to perform more and more complex validations, investigate the existence of a
library for such purpose.
*/
interface ReceivedStep {
  board: string;
}

interface ReceivedGame {
  steps: ReceivedStep[];
}

const receivedGameValidator = (obj: unknown) => {
  if (typeof obj !== "object") {
    throw Error("Not an object");
  }
  if (!("steps" in obj)) {
    throw Error("No steps field");
  }
  if (!Array.isArray(obj["steps"])) {
    throw Error("steps should be an Array");
  }
  if (obj["steps"].length < 1) {
    throw Error("there should be at least one step");
  }
  if (!("board" in obj["steps"][0])) {
    throw Error("there should be board field in a step");
  }
  if (typeof obj["steps"][0]["board"] !== "string") {
    throw Error("board should be a string");
  }

  return obj as ReceivedGame;
};
/* ---------------------------------------------- */

export { receivedGameValidator };
