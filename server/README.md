# dem01insurance
# Author: _

1. PURPOSE
2. INSTRUCTIONS
3. COMMENTS

1. PURPOSE
================================================================================
The purpose of this project is to demonstrate integrating multiple technologies:
    BACKEND
    - GraphQL server, schema, and resolvers
    - PostgreSQL database integration with NodeJS
    * (future) - Python integration with NodeJS and PostgreSQL
    FRONTEND
    - Webpack
    - ReactJS
    - Redux
    - ApolloClient
    * (future) - data visualization
    * (future) - other complicated data stuff


2. INSTRUCTIONS
================================================================================
STEP 1 (setup):
You should have NodeJS installed on your computer.
You should have a PostgreSQL server running on port 5432.
The GraphQL endpoint is 'http://localhost:4000/graphql'.
The GraphQL schema has a 'createDB' mutation which:
    (i)  Creates a database called 'demo_insurancedb'.
    (ii) Creates and populates tables from csv files in the 'data' folder.

STEP 2: 
Run the GraphQL server:
    (i)   Open command line in 'server' folder and enter 'npm install'
    (ii)  When above is complete enter 'npm start'.
    (iii) Wait for message 'GraphQL server running on port 4000...'.
Create the database:
    (i) ...

3. COMMENTS
================================================================================
This is a demo and shouldn't actually be used: it lacks proper security (eg web tokens) and is ugly and lacks proper testing and real world testing and refining.
This is not intended as the best solution for a company database and login system, just to demonstrate a way that multiple technologies can be used together.











