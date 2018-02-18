import * as MainActionTypes from '../actiontypes/main'

const initialState = {
    currentView: 'About'
}

export default function MainReducer(state=initialState,action) {
    switch(action.type) {
        case MainActionTypes.CHANGE_VIEW:
        return Object.assign({},state,{
            currentView: action.view
        })

        default:
        return state
    }
}