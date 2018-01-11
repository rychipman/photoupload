import {
    ADD_FILE,
    REMOVE_FILE,
    DISMISS_FILE_SUCCESS,
    FILE_UPLOADED,
    FILE_UPLOADING,
    FILE_UPLOAD_FAILED,
    CREATE_NOTIFICATION,
    CLOSE_NOTIFICATION,
} from '../actions';

const initialState = {
    files: [],
    notifications: [],
}

const uploadApp = (state=initialState, action) => {
    switch (action.type) {
        case ADD_FILE:
            return Object.assign({}, state, {
                files: [
                    ...state.files,
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
            })
        case REMOVE_FILE:
            return Object.assign({}, state, {
                files: state.files.filter(file => file.id !== action.id)
            })
        case DISMISS_FILE_SUCCESS:
            return Object.assign({}, state, {
                files: state.files.map(file => {
                    if (file.id === action.id) {
                        file.succeeded = false
                    }
                    return file
                })
            })
        case FILE_UPLOADED:
            return Object.assign({}, state, {
                files: state.files.map(file => {
                    if (file.id === action.id) {
                        file.uri = action.uri
                        file.succeeded = true
                        file.uploaded = true
                    }
                    return file
                })
            })
        case FILE_UPLOADING:
            return Object.assign({}, state, {
                files: state.files.map(file => {
                    if (file.id === action.id) {
                        file.uploading = true
                    }
                    return file
                })
            })
        case FILE_UPLOAD_FAILED:
            return Object.assign({}, state, {
                files: state.files.map(file => {
                    if (file.id === action.id) {
                        file.failed = true
                        file.uploading = false
                    }
                    return file
                })
            })
        case CREATE_NOTIFICATION:
            return Object.assign({}, state, {
                notifications: [
                    ...state.notifications,
                    {
                        id: action.id,
                        text: action.text,
                        open: true,
                    },
                ],
            })
        case CLOSE_NOTIFICATION:
            return Object.assign({}, state, {
                notifications: state.notifications.map(n => {
                    if (n.id === action.id) {
                        n.open = false
                    }
                    return n
                })
            })
        default:
            return state
    }
}

export default uploadApp
