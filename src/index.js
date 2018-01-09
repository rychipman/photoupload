import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { uploadApp } from './reducers/'

import React from 'react'
import { render } from 'react-dom'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Reboot from 'material-ui/Reboot'

import 'typeface-roboto'

import AppLayout from './layouts/AppLayout'
import Upload from './upload'
import Files from './files'

const initialState = {
    files: [],
    notifications: [],
}

const middleware = [
    thunk,
]

let store = createStore(
    uploadApp,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
)

const App = () => (
    <Provider store={store}>
        <div>
            <Reboot/>
            <Router>
            <AppLayout>
                <Route path='/upload' component={Upload}/>
                <Route path='/files' component={Files}/>
            </AppLayout>
            </Router>
        </div>
    </Provider>
)

render(
    <App/>,
    document.getElementById('root')
)
