import * as uuid from "uuid";
import { APIGatewayProxyEvent } from "aws-lambda";
import { getUserId } from "../lambda/utils";
import { UpdatePokemonRequest } from "../requests/UpdatePokemonRequest";
import { PokemonItem } from "../models/PokemonItem";
import { Pokemon } from "../DataLogic/DataAccess";
import { CreatePokemonRequest } from "../requests/CreatePokemonRequest";

const pokemon = new Pokemon();

export async function getPokemons( event: APIGatewayProxyEvent ): Promise<PokemonItem[]> {
    const userId = getUserId(event);
    const mypokemons = pokemon.getAll(userId);
    return mypokemons
}

export async function createPokemon( event: APIGatewayProxyEvent ): Promise<PokemonItem> {
    const itemId = uuid.v4();
    const userId = getUserId(event);
    const newPokemon: CreatePokemonRequest = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    const createdPokemon = await pokemon.createPokemon(
      { 
        userId: userId,
        pokemonId: itemId,
        createdAt: new Date().toISOString(),
        type: "None",
        ...newPokemon
      }
    );
  return createdPokemon;
}

export async function generateUploadUrl( event: APIGatewayProxyEvent ): Promise<string> {
    const pokemonId = event.pathParameters.pokemonId;
    const userId = getUserId(event);
    const generatedUrl = await pokemon.generateUploadUrl(pokemonId, userId);
    return generatedUrl
}

export async function updatePokemon( event: APIGatewayProxyEvent ){
    const pokemonId = event.pathParameters.pokemonId;
    const userId = getUserId(event);
    const updatedPokemon: UpdatePokemonRequest = JSON.parse(event.body);
    const newPokemon = await pokemon.updatePokemon(userId, pokemonId, updatedPokemon);
    return newPokemon
}
export async function deletePokemon(event: APIGatewayProxyEvent) {
    const userId = getUserId(event);
    const pokemonId = event.pathParameters.pokemonId;
    const deletedPokemon = await pokemon.deletePokemon(pokemonId, userId);
    return deletedPokemon
}
