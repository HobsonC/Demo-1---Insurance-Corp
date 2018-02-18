import { makeExecutableSchema } from 'graphql-tools'
import { resolvers } from './resolvers'

const typeDefs = `
    type Policy {
        policynumber: Int!
        name: String
    }

    type Agent {
        agentid: Int!
        password: String
        name: String
        policies: [Int]
    }

    type LoginStatus {
        idExists: Boolean
        passwordCorrect: Boolean
    }

    type Query {
        lookupPolicy(policynumber: Int!): Policy
        lookupAgent(agentid: Int!): Agent
        lookupAgentLogin(agentid: Int!, password: String!): LoginStatus
    }

    type Mutation {
        createDB: Boolean
    }
`

const schema = makeExecutableSchema({ typeDefs, resolvers })

export { schema }