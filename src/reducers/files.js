import { createReducer, updateArrayVals } from './util'
import {
    UPLOAD_FILE,
    FILE_UPLOADED,
    FILE_UPLOADING,
    FILE_UPLOAD_FAILED,
} from '../actions';

const filesReducer = createReducer({

    [UPLOAD_FILE]: (state, action) => (
        [
            ...state,
            {
                id: action.id,
                filename: action.file.name,
                data: action.file,
                uri: '',
                failed: false,
                uploaded: false,
                uploading: false,
            }
        ]
    ),

    [FILE_UPLOADED]: (state, action) => (
        updateArrayVals(state, action.id, {
            uri: 'http://localhost:8080/img/' + action.hash,
            uploaded: true,
            uploading: false,
            failed: false,
        })
    ),

    [FILE_UPLOADING]: (state, action) => (
        updateArrayVals(state, action.id, {
            uploading: true,
            failed: false,
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
