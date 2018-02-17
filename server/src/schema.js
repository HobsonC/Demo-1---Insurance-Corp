import { makeExecutableSchema } from 'graphql-tools'
import { resolvers } from './resolvers'

const typeDefs = `
    type Policy {
        policyNumber: Int!
        name: String
    }

    type Query {
        lookupPolicy(policyNumber: Int!): Policy
    }
`

const schema = makeExecutableSchema({ typeDefs, resolvers })

export { schema }