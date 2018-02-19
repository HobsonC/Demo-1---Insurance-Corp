import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

class AgentDashboard extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const QUERY_LOGIN = gql`
        query QueryLogin {
            lookupAgentLogin(agentid: 1, password: "pwd1") {
                idExists
                passwordCorrect
            }
        }
        `


        const QUERY_AGENT = gql`
        query QueryAgent {
            lookupAgent(agentid: 1) {
                agentid
                password
                name
                policies
            }
        }
        `

        const renderAgent = () => <Query query={QUERY_AGENT}>
        {(result) => {
            if (result.loading) return <div>Loading Agent</div>
            if (result.error) return <div>Error Loading Agent</div>

            const { data } = result

            return (
                <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                <span className="card-title">Welcome, Agent {data.lookupAgent.name}</span>
                <p>AgentID: {data.lookupAgent.agentid}</p>
                <p>Password: {data.lookupAgent.password}</p>
                <p>Policies: {data.lookupAgent.policies}</p>
                </div>
                </div>
            )
        }}
        </Query>

        return (
            <div>
                <p>AgentDashboard</p>
                { renderAgent() }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentID: state.currentID,
    currentPwd: state.currentPwd
})

export default connect(mapStateToProps)(AgentDashboard)