import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as MainActions from '../../store/actions/main'

class EmployeeLogin extends Component {
    constructor(props) {
        super(props)
        const { dispatch } = props
        this.actions = bindActionCreators(MainActions,dispatch)
    }

    login(e) {
        e.preventDefault()
        let eeid = this.refs.ee_id.value
        if (eeid > 0) {
            this.actions.changeID(eeid)
            this.actions.changePwd(this.refs.ee_pwd.value)
            this.actions.changeView('EmployeeDashboard')
        }
    }

    render() {
        return (
            <div>
                <h5>Employee Login</h5>
                <form onSubmit={this.login.bind(this)}>
                <input type="text" className="validate" placeholder="Employee ID" id="ee_id" ref="ee_id" />
                <input type="text" className="validate" placeholder="Password" id="ee_pwd" ref="ee_pwd" />
                <input type="submit" className="btn waves-effect" value="Log In" />
                </form>
            </div>
        )
    }
}

export default connect()(EmployeeLogin)