export const resolvers = {
    Query: {
        lookupPolicy(parent,args,obj) {
            return {
                policyNumber: 100,
                name: "Anna Bella Corella"
            }
        }
    }
}