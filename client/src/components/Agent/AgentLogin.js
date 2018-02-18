import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as MainActions from '../../store/actions/main'

class AgentLogin extends Component {
    constructor(props) {
        super(props)
        const { dispatch } = props
        this.actions = bindActionCreators(MainActions,dispatch)
    }

    handleSubmit(e) {
        e.preventDefault()
        let agentid = this.refs.agent_id.value
        if (agentid > 0) {
            this.actions.changeID(agentid)
            this.actions.changePwd(this.refs.agent_pwd.value)
            this.actions.changeView('AgentDashboard')
        }
    }

    render() {
        return (
            <div>
                <h5>Agent Login</h5>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input placeholder="Agent ID" id="agent_id" ref="agent_id" type="text" className="validate" />
                    <input placeholder="Password" id="agent_pwd" ref="agent_pwd" type="text" className="validate" />
                    <input value="Log In" type="submit" className="btn waves-effect" />
                </form>
            </div>
        )
    }
}

export default connect()(AgentLogin)