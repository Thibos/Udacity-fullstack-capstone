# Serverless Pokemon

This project implements a simple Pokemon application using AWS Lambda and Serverless framework. 

# Functionality of the application

This application will allow CRUD operation of Pokemon items. Each Pokemon item can optionally have an attachment image. Each user only has access to Pokemon items that he/she has created.


# How to run the application

## Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

## Frontend

To run a client application first edit the `client/src/config.ts` file to set correct parameters. And then run the following commands:

```
cd client
npm install
npm run start
```

This should start a development server with the React application that will interact with the serverless Pokemon application.

# Reference 

<https://github.com/udacity/cloud-developer/tree/master/course-04/project/c4-final-project-starter-code>
<https://github.com/pravinyo/udacity-cloud-developer-capstone>
<https://github.com/viralharia/udacity-cloud-developer-capstone>


