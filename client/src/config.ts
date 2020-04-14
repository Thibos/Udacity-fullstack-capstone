// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'hrrusb3d7i'
export const apiEndpoint = `https://${apiId}.execute-api.us-west-1.amazonaws.com/dev`



export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-kfq1ss1h.auth0.com',            // Auth0 domain
  clientId: 'HoOCnbiZcvJmgIjZ7ydaIqZJisA7ybAN',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
