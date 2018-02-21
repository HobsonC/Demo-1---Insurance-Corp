import React, { Component } from 'react'

class AgentView extends Component {
    render() {
        return (
            <div className="card green darken-4">
            <div className="card-content white-text">
                <span className="card-title">Agent _</span>
                <p>agid: {this.props.agid}</p>
            </div>
            </div>
        )
    }
}

export default AgentView