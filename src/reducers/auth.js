import { createReducer } from './util'
import {
    GET_TOKEN,
    UPDATE_TOKEN,
    AUTH_FAILED,
} from '../actions';

const authReducer = createReducer({

    [GET_TOKEN]: (state, action) => (
        {
            ...state,
            token: '',
            email: action.email,
            loggedIn: false,
            loggingIn: true,
        }
    ),

    [UPDATE_TOKEN]: (state, action) => (
        {
            ...state,
            token: action.token,
            loggedIn: true,
            loggingIn: false,
        }
    ),

    [AUTH_FAILED]: (state, action) => (
        {
            ...state,
            token: '',
            loggedIn: false,
            loggingIn: false,
        }
    )

})

export default authReducer
