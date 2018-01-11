import { createReducer, updateArrayVals } from './util'
import {
    ADD_FILE,
    REMOVE_FILE,
    DISMISS_FILE_SUCCESS,
    FILE_UPLOADED,
    FILE_UPLOADING,
    FILE_UPLOAD_FAILED,
} from '../actions';

const filesReducer = createReducer([], {

    [ADD_FILE]: (state, action) => (
        [
            ...state,
            {
                id: action.id,
                filename: action.filename,
                data: action.data,
                uri: '',
                succeeded: false,
                failed: false,
                uploaded: false,
                uploading: false,
            }
        ]
    ),

    [REMOVE_FILE]: (state, action) => (
        state.filter(f => f.id !== action.id)
    ),

    [DISMISS_FILE_SUCCESS]: (state, action) => (
        updateArrayVals(state, action.id, {
            succeeded: false,
        })
    ),

    [FILE_UPLOADED]: (state, action) => (
        updateArrayVals(state, action.id, {
            uri: action.uri,
            succeeded: true,
            uploaded: true,
            uploading: false,
        })
    ),

    [FILE_UPLOADING]: (state, action) => (
        updateArrayVals(state, action.id, {
            uploading: true,
        })
    ),

    [FILE_UPLOAD_FAILED]: (state, action) => (
        updateArrayVals(state, action.id, {
            failed: true,
            uploading: false,
        })
    ),

})

export default filesReducer
