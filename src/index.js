import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { todoApp } from './reducers/'

import React from 'react'
import { render } from 'react-dom'
import Reboot from 'material-ui/Reboot'

import 'typeface-roboto'

import AppLayout from './layouts/AppLayout'
import AppContent from './containers/AppContent'

let store = createStore(todoApp)

const App = () => (
    <Provider store={store}>
        <div>
            <Reboot/>
            <AppLayout>
                <AppContent/>
            </AppLayout>
        </div>
    </Provider>
)

render(
    <App/>,
    document.getElementById('root')
)
