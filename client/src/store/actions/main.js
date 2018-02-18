import * as MainActionTypes from '../actiontypes/main'

export const changeView = view => {
    return {
        type: MainActionTypes.CHANGE_VIEW,
        view
    }
}

export const changeID = id => {
    return {
        type: MainActionTypes.CHANGE_ID,
        id
    }
}

export const changePwd = pwd => {
    return {
        type: MainActionTypes.CHANGE_PWD,
        pwd
    }
}