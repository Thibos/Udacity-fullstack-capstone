import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import {createPokemon} from '../../BusinessLogic/pokemonItems';
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: Implement creating a new TODO item
  const item = await createPokemon(event)

  return {
    statusCode: 200,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
    body: JSON.stringify({msg:"To-do Item was created",
      item
    })
  }
}
