import { createReducer, updateArrayVals } from './util'
import {
    ADD_FILE,
    UPLOAD_FILE,
    UPLOAD_FILE_FAILED,
    UPLOAD_FILE_SUCCESSFUL,
} from '../actions';

const filesReducer = createReducer({

    [ADD_FILE]: (state, action) => (
        [
            {
                id: action.id,
                filename: action.file.name,
                data: action.file,
                uri: '',
                failed: false,
                uploaded: false,
                uploading: false,
            },
            ...state,
        ]
    ),

    [UPLOAD_FILE]: (state, action) => (
        updateArrayVals(state, action.id, {
            uri: '',
            failed: false,
            uploaded: false,
            uploading: true,
        })
    ),

    [UPLOAD_FILE_FAILED]: (state, action) => (
        updateArrayVals(state, action.id, {
            failed: true,
            uploading: false,
            uploaded: false,
        })
    ),

    [UPLOAD_FILE_SUCCESSFUL]: (state, action) => (
        updateArrayVals(state, action.id, {
            uploaded: true,
            uploading: false,
            failed: false,
        })
    ),

})

export default filesReducer
