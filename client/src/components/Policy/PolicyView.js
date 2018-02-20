import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

class PolicyView extends Component {
    render() {
        const QUERY_POLICY = gql`
            query QueryPolicy {
                lookupPolicy(policynumber: ${this.props.pn}) {
                    policynumber
                    name
                    dob
                    gender
                    smokingstatus
                    faceamount
                }
            }
        `

        const renderPolicy = () => <Query query={QUERY_POLICY}>
        {(result) => {
            if (result.loading) return <div><p>Loading Policy...</p></div>
            if (result.error) return <div><p>Error Loading Policy</p></div>
            const { data } = result

            if (!data.lookupPolicy) return <div><p>Select Valid Policy</p></div>

            return (
                <div className="card indigo darken-4">
                <div className="card-content white-text">
                <span className="card-title"><b>Policy {data.lookupPolicy.policynumber}</b></span>
                <p>Name: {data.lookupPolicy.name}</p>
                <p>DOB: {data.lookupPolicy.dob}</p>
                <p>Gender: {data.lookupPolicy.gender}</p>
                <p>Smoking Status: {data.lookupPolicy.smokingstatus}</p>
                <p>Amount Insured: {data.lookupPolicy.faceamount}</p>
                </div>
                </div>
                )
        }}
        </Query>

        return renderPolicy()
        
    }
}

export default PolicyView