# dem01insurance
# Author: Me

1. PURPOSE
2. INSTRUCTIONS
3. COMMENTS
4. HOW STUFF WORKS

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

4. HOW STUFF WORKS
================================================================================
Data for policies, agents, employees, premium rates, etc, lives in csv files in the 'data' folder. The first step is to create a new database with tables based on these csv files. This is done with the script 'pg-setupdb', and is triggered by the mutation 'createDB' in the 'schema' file. The scripts are set up for using PostgreSQL as the database management system. The app interacts with the database via graphql queries and muations in the 'schema' folder. The resolvers use the 'pg-connector', which uses the ORM Sequelize (which can be also be used for MySQL, SQLite and MSSQL). 









