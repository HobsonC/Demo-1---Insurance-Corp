import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import PolicyView from '../Policy/PolicyView'
import AgentView from '../Agent/AgentView'
import StatsView from '../Policy/StatsView'

class EmployeeDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            policyNumber: 0,
            agentID: 0,
            viewType: 'None'
        }
    }

    changeViewType(newType) {
        this.setState({ viewType: newType })
    }

    showPolicy(e) {
        e.preventDefault()
        this.setState({ policyNumber: this.refs.pn.value })
    }

    showAgent(e) {
        e.preventDefault()
        this.setState({ agentID: this.refs.agid.value })
    }

    render() {
        const QUERY_EE = gql`
        query Query_EE {
            lookupEmployee(eeid: ${this.props.currentID}) {
                eeid
                password
                name
            }
        }
        `

        const renderEE = () => <Query query={QUERY_EE}>
        {(result) => {
            if (result.loading) return <div><p>Loading Employee...</p></div>
            if (result.error) return <div><p>Error Loading Employee</p></div>
            const { data } = result
            return (
                <div className="card cyan darken-4">
                <div className="card-content white-text">
                <span className="card-title">Good Day, {data.lookupEmployee.name}</span>
                </div>
                </div>
            )
        }}
        </Query>

        const QUERY_LOGIN = gql`
        query QueryLogin {
            lookupEmployeeLogin(eeid:${this.props.currentID}, password: "${this.props.currentPwd}") {
                idExists
                passwordCorrect
            }
        }
        `

        const renderLogin = () => <Query query={QUERY_LOGIN}>
        {(result) => {
            if (result.loading) return <div><p>Loading Login...</p></div>
            if (result.error) return <div><p>Error Loading Login</p></div>
            const { data } = result
            if (data.lookupEmployeeLogin.idExists && data.lookupEmployeeLogin.passwordExists)
            return renderEE()
            else return (
                <div>
                    <p>ID Exists: { data.lookupEmployeeLogin.idExists ? "Yes" : "No" }</p>
                    <p>Password correct: { data.lookupEmployeeLogin.idExists ? "Yes" : "No" }</p>
                </div>
            )
        }}
        </Query>

        const selectViewer = () => {
            return <select style={styles.select} id="select_viewer" ref="select_viewer" className="browser-default">
                <option key={0} select="true">Select Action:</option>
                <option onClick={() => {this.changeViewType('Agent')}} key={1}>View Agent</option>
                <option onClick={() => {this.changeViewType('Policy')}} key={2}>View Policy</option>
                <option onClick={() => {this.changeViewType('Stats')}} key={3}>View Policy Statistics</option>
            </select>
        }

        const renderPolicyViewer = () => {
            return (
                <div>
                    <form onSubmit={ this.showPolicy.bind(this) }>
                    <label>Policy</label>
                    <input type="text" className="validate" ref="pn" />
                    <input type="submit" className="btn waves-effect" value="View Policy" />
                </form>
                <PolicyView pn={this.state.policyNumber} />
            </div>
            )
        }

        const renderAgentViewer = () => {
            return (
                <div>
                    <form onSubmit={ this.showAgent.bind(this) }>
                    <label>Agent</label>
                    <input type="text" className="validate" ref="agid" />
                    <input type="submit" className="btn waves-effect" value="View Agent" />
                    </form>
                    <AgentView agid={this.state.agentID} />
                </div>
            )
        }

        const renderViewer = () => {
            switch(this.state.viewType) {
                case 'Agent':
                return renderAgentViewer()

                case 'Policy':
                return renderPolicyViewer()

                case 'Stats':
                return <StatsView />

                default:
                return <div>Select View Above</div>
            }
        }

        return (
            <div>
                { renderEE() }
                { selectViewer() }
                { renderViewer() }
            </div>
        )
    }
}

const styles = {
    select: {
        background: '#222',
        color: '#ffe299',
        height: '34px',
        width: '240px'
    },
    eeCard: {
        color: '#ffe299'        
    }
}

const mapStateToProps = state => ({
    currentID: state.currentID,
    currentPwd: state.currentPwd
})

export default connect(mapStateToProps)(EmployeeDashboard)