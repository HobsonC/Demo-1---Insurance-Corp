import { makeExecutableSchema } from 'graphql-tools'
import { resolvers } from './resolvers'

const typeDefs = `
    type Policy {
        policynumber: Int!
        name: String
        dob: String
        gender: String
        smokingstatus: String
        faceamount: Int
    }

    type Agent {
        agentid: Int!
        password: String
        name: String
        policies: [Int]
    }

    type Employee {
        eeid: Int!
        password: String
        name: String
    }

    type LoginStatus {
        idExists: Boolean
        passwordCorrect: Boolean
    }

    type Query {
        lookupPolicy(policynumber: Int!): Policy
        lookupAgent(agentid: Int!): Agent
        lookupAgentLogin(agentid: Int!, password: String!): LoginStatus
        lookupEmployee(eeid: Int!): Employee
        lookupEmployeeLogin(eeid: Int!, password: String!): LoginStatus
        test: Int
    }

    type Mutation {
        createDB: Boolean
    }
`

const schema = makeExecutableSchema({ typeDefs, resolvers })

export { schema }