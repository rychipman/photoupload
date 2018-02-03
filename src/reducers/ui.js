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
    LOGIN_CLEAR_MESSAGES,
    SIGNUP,
    SIGNUP_FAILED,
    SIGNUP_SUCCESSFUL,
    SIGNUP_CLEAR_MESSAGES,
} from '../actions';

const notificationsReducer = createReducer({

    [CREATE_NOTIFICATION]: (state, action) => (
        [
            ...state,
            {
                id: action.id,
                message: action.message,
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

const loginReducer = createReducer({

    [LOGIN]: (state, action) => (
        update(state, {
            error: '',
            inProgress: true,
        })
    ),

    [LOGIN_FAILED]: (state, action) => (
        update(state, {
            error: action.message,
            inProgress: false,
        })
    ),

    [LOGIN_SUCCESSFUL]: (state, action) => (
        update(state, {
            error: '',
            inProgress: false,
        })
    ),

    [LOGIN_CLEAR_MESSAGES]: (state, action) => (
        update(state, {
            error: '',
            inProgress: false,
        })
    ),

})

const signupReducer = createReducer({

    [SIGNUP]: (state, action) => (
        update(state, {
            error: '',
            inProgress: true,
        })
    ),

    [SIGNUP_FAILED]: (state, action) => (
        update(state, {
            error: action.message,
            inProgress: false,
        })
    ),

    [SIGNUP_SUCCESSFUL]: (state, action) => (
        update(state, {
            error: '',
            inProgress: false,
        })
    ),

    [SIGNUP_CLEAR_MESSAGES]: (state, action) => (
        update(state, {
            error: '',
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
