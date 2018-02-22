import { makeDB } from './pg-setupdb'
import { getPolicy, getAgent, getAgentLogin, getEmployee, getEmployeeLogin, getMonthlyPremiumPerThousand } from './pg-connector'

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
        lookupMonthlyPremiumPerThousand(parent,args,obj) {
            return getMonthlyPremiumPerThousand(args.age,args.gender,args.smoker)
        }
    },
    Mutation: {
        createDB(parent,args,obj) {
            return makeDB()
        }
    }
}