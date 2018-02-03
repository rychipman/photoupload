import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers/'

import React from 'react'
import { render } from 'react-dom'
import { Route, BrowserRouter as Router } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'

import { LoginDimmer } from './login'
import Uploader from './uploader'
import defaultSaga from './sagas'

const initialState = {
    files: [],
    ui: {
        notifications: [],
        uploads: {
            lists: {
                uploaded: false,
                failed: false,
                queued: true,
            },
        },
    },
    auth: {
        token: '',
        email: '',
        loggedIn: false,
        loggingIn: false,
    }
}

const saga = createSagaMiddleware()
const middleware = [ saga ]

let store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
)

saga.run(defaultSaga)

const App = () => (
    <Provider store={store}>
        <Router>
            <div style={{height: '100%'}}>
                <LoginDimmer/>
                <Route path='/upload' component={Uploader}/>
            </div>
        </Router>
    </Provider>
)

render(
    <App/>,
    document.getElementById('root')
)
