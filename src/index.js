import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers/'

import React from 'react'
import { render } from 'react-dom'
import { Route, BrowserRouter as Router } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'

import LoginPage from './layouts/LoginLayout.js'
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
                <Route path='/login' component={LoginPage}/>
                <Route path='/upload' component={Uploader}/>
            </div>
        </Router>
    </Provider>
)

render(
    <App/>,
    document.getElementById('root')
)
