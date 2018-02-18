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

    render() {
        return (
            <nav>
                <div className="nav-wrapper blue-grey darken-4">
                <a className="brand-logo">Milky Way Insurance Inc.</a>
                <ul className="right hide-on-med-and-down">
                    <li><a onClick={() => this.showView('About')}>About</a></li>
                    <li><a onClick={() => this.showView('AgentLogin')}>Agent Login</a></li>
                    <li><a onClick={() => this.showView('EmployeeLogin')}>Employee Login</a></li>
                </ul>
                </div>
            </nav>
        )
    }
}

export default connect()(Nav)