import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/Main'
import MainReducer from './store/reducers/main'
import { Provider as ReduxProvider } from 'react-redux'
import { createStore } from 'redux'

const store = createStore(
    MainReducer,
    window.devToolsExtension && window.devToolsExtension()
)

ReactDOM.render(
    <ReduxProvider store={store}>
        <Main />
    </ReduxProvider>,
    document.getElementById('app')
)