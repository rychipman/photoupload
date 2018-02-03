import { combineReducers } from 'redux'
import filesReducer from './files'
import uiReducer from './ui'
import authReducer from './auth'

export default combineReducers({
    files: filesReducer,
    ui:    uiReducer,
    auth:  authReducer,
})
