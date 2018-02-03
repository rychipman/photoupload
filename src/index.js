import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers/'

import React from 'react'
import { render } from 'react-dom'
import { Route, BrowserRouter as Router } from 'react-router-dom'

import 'typeface-roboto'
import 'semantic-ui-css/semantic.min.css'

import LoginPage from './layouts/LoginLayout.js'
import UploadPage from './layouts/UploadLayout.js'
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

const MainPage = () => (
    <AppLayout>
        <Route path='/photos/upload' component={Upload}/>
        <Route path='/photos/notifications' component={Notifications}/>
    </AppLayout>
)

const App = () => (
    <Provider store={store}>
        <Router>
            <div style={{height: '100%'}}>
                <Route path='/photos' component={MainPage}/>
                <Route path='/login' component={LoginPage}/>
                <Route path='/upload' component={UploadPage}/>
            </div>
        </Router>
    </Provider>
)

render(
    <App/>,
    document.getElementById('root')
)
