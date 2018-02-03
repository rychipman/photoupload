import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers/'

import React from 'react'
import { render } from 'react-dom'
import { Route } from 'react-router'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import 'semantic-ui-css/semantic.min.css'

import Login from './auth/Login.js'
import Signup from './auth/Signup.js'
import Uploader from './uploader'
import Notifications from './notifications/Notifications.js'
import Menu from './menu/Menu.js'
import defaultSaga from './sagas'

const initialState = {
    files: [],
    ui: {
        notifications: [],
        uploads: {
            lists: {
                uploaded: true,
                failed: true,
                queued: true,
            },
        },
        login: {
            inProgress: false,
        },
        signup: {
            inProgress: false,
        },
    },
    auth: {
        email: '',
        token: '',
    }
}

const saga = createSagaMiddleware()

const history = createHistory()
const router = routerMiddleware(history)

const middleware = [ router, saga ]

let store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
)

saga.run(defaultSaga)

const App = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div style={{height: '100%', paddingTop: '50px'}}>
                <Menu/>
                <Notifications/>
                <Route path='/upload' component={Uploader}/>
                <Route path='/login' component={Login}/>
                <Route path='/signup' component={Signup}/>
            </div>
        </ConnectedRouter>
    </Provider>
)

render(
    <App/>,
    document.getElementById('root')
)
