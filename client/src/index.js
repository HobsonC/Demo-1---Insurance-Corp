import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/Main'
import MainReducer from './store/reducers/main'
import { Provider as ReduxProvider } from 'react-redux'
import { createStore } from 'redux'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' })

const store = createStore(
    MainReducer,
    window.devToolsExtension && window.devToolsExtension()
)

ReactDOM.render(
    <ReduxProvider store={store}>
    <ApolloProvider client={client}>
        <Main />
    </ApolloProvider>
    </ReduxProvider>,
    document.getElementById('app')
)