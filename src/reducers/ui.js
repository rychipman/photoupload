import { combineReducers } from 'redux'
import { createReducer, update } from './util'
import {
    CLOSE_NOTIFICATION,
    CREATE_NOTIFICATION,
    TOGGLE_FAILED_LIST,
    TOGGLE_QUEUED_LIST,
    TOGGLE_UPLOADED_LIST,
    LOGIN,
    LOGIN_FAILED,
    LOGIN_SUCCESSFUL,
    SIGNUP,
    SIGNUP_FAILED,
    SIGNUP_SUCCESSFUL,
} from '../actions';

const notificationsReducer = createReducer({

    [CREATE_NOTIFICATION]: (state, action) => (
        [
            {
                id: action.id,
                title: action.title,
                message: action.message,
                purpose: action.purpose,
            },
            ...state,
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

const loginReducer = createReducer({

    [LOGIN]: (state, action) => (
        update(state, {
            inProgress: true,
        })
    ),

    [LOGIN_FAILED]: (state, action) => (
        update(state, {
            inProgress: false,
        })
    ),

    [LOGIN_SUCCESSFUL]: (state, action) => (
        update(state, {
            inProgress: false,
        })
    ),

})

const signupReducer = createReducer({

    [SIGNUP]: (state, action) => (
        update(state, {
            inProgress: true,
        })
    ),

    [SIGNUP_FAILED]: (state, action) => (
        update(state, {
            inProgress: false,
        })
    ),

    [SIGNUP_SUCCESSFUL]: (state, action) => (
        update(state, {
            inProgress: false,
        })
    ),

})

export default combineReducers({
    notifications: notificationsReducer,
    uploads: uploadsReducer,
    login: loginReducer,
    signup: signupReducer,
})
