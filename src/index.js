import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { uploadApp } from './reducers/'

import React from 'react'
import { render } from 'react-dom'
import Reboot from 'material-ui/Reboot'

import 'typeface-roboto'

import AppLayout from './layouts/AppLayout'
import Upload from './upload'

let store = createStore(
    uploadApp,
    applyMiddleware(thunk),
)

const App = () => (
    <Provider store={store}>
        <div>
            <Reboot/>
            <AppLayout>
                <Upload/>
            </AppLayout>
        </div>
    </Provider>
)

render(
    <App/>,
    document.getElementById('root')
)
