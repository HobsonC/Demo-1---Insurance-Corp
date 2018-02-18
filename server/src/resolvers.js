import { makeDB } from './pg-setupdb'
import { getPolicy, getAgent, getAgentLogin } from './pg-connector'

export const resolvers = {
    Query: {
        lookupPolicy(parent,args,obj) {
            return getPolicy(args.policynumber)
        },
        lookupAgent(parent,args,obj) {
            return getAgent(args.agentid)
        },
        lookupAgentLogin(parent,args,obj) {
            return getAgentLogin(args.agentid, args.password)
        }
    },
    Mutation: {
        createDB(parent,args,obj) {
            return makeDB()
        }
    }
}