import { createReducer } from './util'
import {
    CREATE_NOTIFICATION,
    CLOSE_NOTIFICATION,
} from '../actions';

const uiReducer = createReducer([], {

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

export default uiReducer