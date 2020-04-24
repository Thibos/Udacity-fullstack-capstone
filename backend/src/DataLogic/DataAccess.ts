import * as AWS from "aws-sdk";
import * as AWSXRay from "aws-xray-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const XAWS = AWSXRay.captureAWS(AWS);

import { PokemonItem } from "../models/PokemonItem";
import { PokemonUpdate } from "../models/PokemonUpdate";

export class Pokemon 
{ constructor (
      private docClient: DocumentClient = createDynamoDBClient(),
      private S3 = createS3Bucket(),
      private pokemonsTable = process.env.POKEMONS_TABLE,
      private bucket = process.env.S3_BUCKET,
      private urlExp = process.env.SIGNED_EXPIRATION,
      private index = process.env.USER_INDEX
  ) {}
  

  async getAll(userId: string): Promise<PokemonItem[]> {
    console.log("get all todos");

    const result = await this.docClient.query({
          TableName: this.pokemonsTable,
          IndexName: this.index,
          KeyConditionExpression: "userId = :userId",
          ExpressionAttributeValues: {
            ":userId": userId
          }
      })
      .promise();
    const items = result.Items;
    return items as PokemonItem[];
  }

  async createPokemon(pokemon: PokemonItem): Promise<PokemonItem> {
      await this.docClient.put({
          TableName: this.pokemonsTable,
          Item: pokemon
      })
      .promise();
    return pokemon;
  }

  async deletePokemon(pokemonId: string, userId: string) {
      const deletePokemon = await this.docClient.delete({
          TableName: this.pokemonsTable,
          Key: { userId, pokemonId }
      })
      .promise();
    return { Deleted: deletePokemon };
  }
  
  async updatePokemon(userId: string, pokemonId: string, updatedPokemon: PokemonUpdate) {
      const updtedPokemon = await this.docClient.update({
          TableName: this.pokemonsTable,
          Key: { userId, pokemonId },
          ExpressionAttributeNames: { "#N": "name" },
          UpdateExpression: "set #N=:pokemonName, dueDate=:dueDate, type=:type",
          ExpressionAttributeValues: {
            ":todoName": updatedPokemon.name,
            ":dueDate": updatedPokemon.dueDate,
            ":type": updatedPokemon.type
        },
        ReturnValues: "UPDATED_NEW"
      })
      .promise();
    return { Updated: updtedPokemon };
  }
  
  async generateUploadUrl(pokemonId: string, userId: string): Promise<string> {
      const uploadUrl = this.S3.getSignedUrl("putObject", {
        Bucket: this.bucket,
        Key: pokemonId,
        Expires: this.urlExp
    });
    await this.docClient.update({
          TableName: this.pokemonsTable,
          Key: { userId, pokemonId },
          UpdateExpression: "set attachmentUrl=:URL",
          ExpressionAttributeValues: {
            ":URL": uploadUrl.split("?")[0]
        },
        ReturnValues: "UPDATED_NEW"
      })
      .promise();

    return uploadUrl;
  }
}

function createDynamoDBClient() {
    if (process.env.IS_OFFLINE) {
      console.log("Creating a local DynamoDB instance");
    return new XAWS.DynamoDB.DocumentClient({
        region: "localhost",
        endpoint: "http://localhost:8000"
    });
  }
  return new XAWS.DynamoDB.DocumentClient();
}

function createS3Bucket() {
    return new XAWS.S3({
      signatureVersion: "v4"
  });
}
