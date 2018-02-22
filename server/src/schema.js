import { makeExecutableSchema } from 'graphql-tools'
import { resolvers } from './resolvers'

const typeDefs = `
    type Policy {
        policynumber: Int!
        name: String
        dob: String
        currentage: Int
        gender: String
        smokingstatus: String
        faceamount: Int
        monthlypremium: Float
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

    type Premium {
        prem_pmonth_pthousandfa: Float
    }

    type Query {
        lookupPolicy(policynumber: Int!): Policy
        lookupAgent(agentid: Int!): Agent
        lookupAgentLogin(agentid: Int!, password: String!): LoginStatus
        lookupEmployee(eeid: Int!): Employee
        lookupEmployeeLogin(eeid: Int!, password: String!): LoginStatus
        lookupMonthlyPremiumPerThousand(age: Int!, gender: String!, smoker: String!): Premium
    }

    type Mutation {
        createDB: Boolean
    }
`

const schema = makeExecutableSchema({ typeDefs, resolvers })

export { schema }