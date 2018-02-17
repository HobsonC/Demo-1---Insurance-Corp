import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { schema } from './src/schema'

const app = express()
const PORT = 4000

app.use('*', cors({ origin: 'http://localhost:8080' }))

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(PORT, () => {
    console.log(`GraphQL server running on port ${PORT}...`)
})