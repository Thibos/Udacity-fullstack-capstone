import "source-map-support/register";
import { updatePokemon } from "../../BusinessLogic/pokemonItems";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  const updatedPokemon = await updatePokemon(event);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify({ msg: "T0-do has been updated", updated: updatedPokemon })
  };
};


