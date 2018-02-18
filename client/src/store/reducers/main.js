import * as MainActionTypes from '../actiontypes/main'

const initialState = {
    currentView: 'About',
    currentID: 0,
    currentPwd: ''
}

export default function MainReducer(state=initialState,action) {
    switch(action.type) {
        case MainActionTypes.CHANGE_VIEW:
        return Object.assign({},state,{
            currentView: action.view
        })

        case MainActionTypes.CHANGE_ID:
        return Object.assign({},state,{
            currentID: action.id
        })

        case MainActionTypes.CHANGE_PWD:
        return Object.assign({},state,{
            currentPwd: action.pwd
        })

        default:
        return state
    }
}