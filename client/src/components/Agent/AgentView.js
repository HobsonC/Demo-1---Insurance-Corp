import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

class AgentView extends Component {
    render() {
        if (!this.props.agid || this.props.agid < 1) return <div>Enter Valid Agent</div>
        const QUERY_AGENT = gql`
        query QueryAgent {
            lookupAgent(agentid: ${this.props.agid}) {
                agentid
                password
                name
                policies
            }
        }
        `

        const renderList = nums => {
            let result = ''
            nums.forEach(n => result += n+', ')
            result = result.substr(0,result.length-2)
            return result
        }

        const renderAgent = () => <Query query={QUERY_AGENT}>
        {(result) => {
            if (result.loading) return <div>Loading Agent...</div>
            if (result.error) return <div>Error Loading Agent</div>
            const { data } = result
            const agent = data.lookupAgent
            if (agent == null) return <div>Load Valid Agent</div>
            
            return (
                <div className="card green darken-4">
                <div className="card-content white-text">
                <span className="card-title">Agent {agent.agentid}</span>
                <p>Name: {agent.name}</p>
                <p>Password: {agent.password}</p>
                <p>Policies: {renderList(agent.policies)}</p>
            </div>
            </div>
            )
        }}
        </Query>

        return (
            renderAgent()
        )
    }
}

export default AgentView