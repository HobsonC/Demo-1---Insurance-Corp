import { makeDB } from './pg-setupdb'
import { getPolicy, getAgent, getAgentLogin, getEmployee, getEmployeeLogin } from './pg-connector'

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
        },
        lookupEmployee(parent,args,obj) {
            return getEmployee(args.eeid)
        },
        lookupEmployeeLogin(parent,args,obj) {
            return getEmployeeLogin(args.eeid,args.password)
        },
        test(parent,args,obj) {
            return 123
        }
    },
    Mutation: {
        createDB(parent,args,obj) {
            return makeDB()
        }
    }
}