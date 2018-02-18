import * as MainActionTypes from '../actiontypes/main'

export const changeView = view => {
    return {
        type: MainActionTypes.CHANGE_VIEW,
        view
    }
}