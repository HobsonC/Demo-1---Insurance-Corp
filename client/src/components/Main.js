import React, { Component } from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'
import About from './About'
import AgentLogin from './Agent/AgentLogin'
import AgentDashboard from './Agent/AgentDashboard'
import EmployeeLogin from './Employee/EmployeeLogin'
import EmployeeDashboard from './Employee/EmployeeDashboard'

class Main extends Component {
    render() {

        const view = () => {
            switch(this.props.currentView) {
                case 'AgentLogin':
                return <AgentLogin />

                case 'AgentDashboard':
                return <AgentDashboard />

                case 'EmployeeLogin':
                return <EmployeeLogin />
                      
                case 'EmployeeDashboard':
                return <EmployeeDashboard />

                default:
                return <About />
        }}

        return (
            <div>
            <Nav />
            { view() }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentView: state.currentView
})

export default connect(mapStateToProps)(Main)