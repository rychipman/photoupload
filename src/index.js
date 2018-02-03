import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers/'

import React from 'react'
import { render } from 'react-dom'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Reboot from 'material-ui/Reboot'

import 'typeface-roboto'
import 'semantic-ui-css/semantic.min.css'

import LoginPage from './layouts/LoginLayout.js'
import AppLayout from './layouts/AppLayout'
import Upload from './upload'
import Notifications from './notifications'
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

const MainView = () => (
    <AppLayout>
        <Route path='/upload' component={Upload}/>
        <Route path='/notifications' component={Notifications}/>
    </AppLayout>
)

const App = () => (
    <Provider store={store}>
        <Router>
            <Route path='/login' component={LoginPage}/>
        </Router>
    </Provider>
)

render(
    <App/>,
    document.getElementById('root')
)
