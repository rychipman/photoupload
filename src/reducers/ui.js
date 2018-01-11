import { combineReducers } from 'redux'
import { createReducer, update } from './util'
import {
    CREATE_NOTIFICATION,
    CLOSE_NOTIFICATION,
    TOGGLE_UPLOADED_LIST,
    TOGGLE_FAILED_LIST,
    TOGGLE_QUEUED_LIST,
} from '../actions';

const notificationsReducer = createReducer({

    [CREATE_NOTIFICATION]: (state, action) => (
        [
            ...state,
            {
                id: action.id,
                text: action.text,
                open: true,
            },
        ]
    ),

    [CLOSE_NOTIFICATION]: (state, action) => (
        state.filter(n => n.id !== action.id)
    ),

})

const uploadsReducer = createReducer({

    [TOGGLE_UPLOADED_LIST]: (state, action) => (
        update(state, {
            lists: update(state.lists, {
                uploaded: !state.lists.uploaded,
            })
        })
    ),

    [TOGGLE_FAILED_LIST]: (state, action) => (
        update(state, {
            lists: update(state.lists, {
                failed: !state.lists.failed,
            })
        })
    ),

    [TOGGLE_QUEUED_LIST]: (state, action) => (
        update(state, {
            lists: update(state.lists, {
                queued: !state.lists.queued,
            })
        })
    ),
})

export default combineReducers({
    notifications: notificationsReducer,
    uploads: uploadsReducer,
})
