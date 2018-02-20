import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import PolicyView from '../Policy/PolicyView'

class AgentDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedPolicy: 0,
            showAgentStats: false
        }
    }

    selectPolicy(pn) {
        if (pn > 0) {
            this.setState({
                selectedPolicy: pn
            })
        }
    }

    render() {
        const QUERY_LOGIN = gql`
        query QueryLogin {
            lookupAgentLogin(agentid: ${this.props.currentID}, password: "${this.props.currentPwd}") {
                idExists
                passwordCorrect
            }
        }
        `

        const renderAgentLogin = () => <Query query={QUERY_LOGIN}>
        {(result) => {
            if (result.loading) return <div>Loading Agent Login...</div>
            if (result.error) return <div>Error Loading Agent Login</div>
            const { data } = result
            return (
                <div>
                    {
                      data.lookupAgentLogin.idExists && data.lookupAgentLogin.passwordCorrect
                      ? renderAgent()
                      : <p>Incorrect ID or Password</p>
                    }
                </div>
            )
        }}
        </Query>

        const QUERY_AGENT = gql`
        query QueryAgent {
            lookupAgent(agentid: ${this.props.currentID}) {
                agentid
                password
                name
                policies
            }
        }`

        const selectPolicies = (policies) => {
            let plist = []
            let i = 1
            policies.forEach(p => {
                plist.push(<option onClick={() => this.selectPolicy(p)} key={i++} value={p}>Policy: {p}</option>)
            })
            let s = 
                <select id="select_policy" style={styles.select} className="browser-default">
                    <option key={0} select="true">Select Policy:</option>
                    { plist }
                </select>

            return s
        }

        const renderAgent = () => <Query query={QUERY_AGENT}>
        {(result) => {
            if (result.loading) return <div>Loading Agent...</div>
            if (result.error) return <div>Error Loading Agent</div>

            const { data } = result

            return (
                <div>
                <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                <span className="card-title">Welcome, Agent {data.lookupAgent.name}</span>
                    { this.state.showAgentStats ?
                    <div>
                    <input className="btn waves-effect" type="submit" onClick={() => this.setState({showAgentStats:false})} value="Hide Agent Stats"></input>
                    <hr/>
                    <p>AgentID: {data.lookupAgent.agentid}</p>
                    <p>Password: {data.lookupAgent.password}</p>
                    </div>
                    : <input className="btn waves-effect" type="submit" onClick={() => this.setState({showAgentStats:true})} value="Show Agent Stats"></input>
                    }
                    <hr/>
                    { selectPolicies(data.lookupAgent.policies) }
                </div>
                </div>
                    <div>
                        <PolicyView pn={this.state.selectedPolicy} />
                    </div>
                </div>
            )
        }}
        </Query>

        return (
            <div>
                <h5>Agent Dashboard</h5>
                { renderAgentLogin() }
            </div>
        )
    }
}

const styles = {
    select: {
        background: '#43a047',
        color: '#fff',
        height: '34px',
        width: '240px'
    }
}

const mapStateToProps = state => ({
    currentID: state.currentID,
    currentPwd: state.currentPwd
})

export default connect(mapStateToProps)(AgentDashboard)