import 'source-map-support/register';
import {deletePokemon} from '../../BusinessLogic/pokemonItems';
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: Remove a TODO item by id
  const deleted = await deletePokemon(event);
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({msg:"To-do Item was deleted",deleted:deleted})
  }
}
