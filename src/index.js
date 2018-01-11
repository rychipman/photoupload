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

import AppLayout from './layouts/AppLayout'
import Upload from './upload'
import Notifications from './notifications'
import defaultSaga from './sagas'

const initialState = {
    files: [],
    ui: {
        notifications: [
            { id: 0, text: 'hello' },
            { id: 1, text: 'this is a notification' },
        ],
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
        <div>
            <Reboot/>
            <Router>
            <AppLayout>
                <Route path='/upload' component={Upload}/>
                <Route path='/notifications' component={Notifications}/>
            </AppLayout>
            </Router>
        </div>
    </Provider>
)

render(
    <App/>,
    document.getElementById('root')
)
