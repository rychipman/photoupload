import { combineReducers } from 'redux'
import filesReducer from './files'
import uiReducer from './ui'

export default combineReducers({
    files: filesReducer,
    ui:    uiReducer,
})
