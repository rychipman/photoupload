import { createReducer } from './util'
import {
    LOGIN,
    LOGIN_SUCCESSFUL,
    AUTH_TOKEN_REJECTED,
} from '../actions';

const authReducer = createReducer({

    [LOGIN]: (state, action) => (
        {
            ...state,
            email: '',
            token: '',
        }
    ),

    [LOGIN_SUCCESSFUL]: (state, action) => (
        {
            ...state,
            email: action.email,
            token: action.token,
        }
    ),

    [AUTH_TOKEN_REJECTED]: (state, action) => (
        {
            ...state,
            email: '',
            token: '',
        }
    ),

})

export default authReducer
