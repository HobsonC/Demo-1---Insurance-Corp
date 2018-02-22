import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import { getCurrentAge } from '../../datelib'

class PolicyView extends Component {
    render() {
        const QUERY_POLICY = gql`
            query QueryPolicy {
                lookupPolicy(policynumber: ${this.props.pn}) {
                    policynumber
                    name
                    dob
                    currentage
                    gender
                    smokingstatus
                    faceamount
                    monthlypremium
                }
            }
        `

        const renderPolicy = () => <Query query={QUERY_POLICY}>
        {(result) => {
            console.log('result: ',result)
            if (result.loading) return <div><p>Loading Policy...</p></div>
            if (result.error) return <div><p>Error Loading Policy</p></div>
            if (!result.data) return <div><p>Select Valid Policy</p></div>
            const { data } = result
            if (!data.lookupPolicy) return <div><p>Select Valid Policy</p></div>
            
            const { policynumber, name, dob, currentage, gender, smokingstatus, faceamount, monthlypremium } = data.lookupPolicy

            return (
                <div className="card indigo darken-3">
                <div className="card-content white-text">
                <span className="card-title"><b>Policy {policynumber}</b></span>
                <p>Name: {name}</p>
                <p>DOB: {dob}</p>
                <p>Current Age*: {currentage}</p>
                <p>Gender: {gender}</p>
                <p>Smoking Status: {smokingstatus}</p>
                <p>Amount Insured: {faceamount}</p>
                <p>Monthly Premium*: {monthlypremium}</p>
                <hr />
                <p>* <i>calculated value</i></p>
                </div>
                </div>
                )
        }}
        </Query>

        return renderPolicy()
        
    }
}

export default PolicyView