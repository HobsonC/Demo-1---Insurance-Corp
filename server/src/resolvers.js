import { makeDB } from './pg-setupdb'

export const resolvers = {
    Query: {
        lookupPolicy(parent,args,obj) {
            return {
                policyNumber: 100,
                name: "Anna Bella Corella"
            }
        }
    },
    Mutation: {
        createDB(parent,args,obj) {
            return makeDB()
        }
    }
}