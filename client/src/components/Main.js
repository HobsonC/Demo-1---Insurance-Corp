import React, { Component } from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'
import About from './About'
import AgentLogin from './Agent/AgentLogin'
import EmployeeLogin from './Employee/EmployeeLogin'

class Main extends Component {
    render() {

        const view = () => {
            switch(this.props.currentView) {
                case 'AgentLogin':
                return <AgentLogin />

                case 'EmployeeLogin':
                return <EmployeeLogin />

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