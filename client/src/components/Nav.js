import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as MainActions from '../store/actions/main'

class Nav extends Component {
    constructor(props) {
        super(props)
        const { dispatch } = props
        this.actions = bindActionCreators(MainActions,dispatch)
    }

    showView(gotoView) {
        this.actions.changeView(gotoView)
    }

    logout() {
        this.actions.changeID(0)
        this.actions.changePwd('')
        this.actions.changeView('About')
    }

    render() {
        const agentLoginLogout = () => {
            if (this.props.currentView === 'EmployeeDashboard')
            return ; 
            return this.props.currentID === 0
            ? <li><a onClick={() => this.showView('AgentLogin')}>Agent Login</a></li>
            : <li><a onClick={() => this.logout()}>Log Out</a></li>
        }

        const eeLoginLogout = () => {
            if (this.props.currentView === 'AgentDashboard')
            return ;
            return this.props.currentID === 0
            ? <li><a onClick={() => this.showView('EmployeeLogin')}>Employee Login</a></li>
            : <li><a onClick={() => this.logout()}>Log Out</a></li>
        }

        return (
            <nav>
                <div className="nav-wrapper blue-grey darken-4">
                <a className="brand-logo left">Milky Way Insurance Inc.</a>
                <ul className="right hide-on-med-and-down">
                    <li><a onClick={() => this.showView('About')}>About</a></li>
                    { agentLoginLogout() }
                    { eeLoginLogout() }
                </ul>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    currentID: state.currentID,
    currentView: state.currentView
})

export default connect(mapStateToProps)(Nav)