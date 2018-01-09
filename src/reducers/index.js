import { ADD_FILE, REMOVE_FILE, SET_FILE_UPLOADED, SET_FILE_UPLOADING_STATE, CREATE_NOTIFICATION, CLOSE_NOTIFICATION } from '../actions';

const initialState = {
    files: [],
    notifications: [],
}

export const uploadApp = (state=initialState, action) => {
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
                        uploadState: '',
                    }
                ]
            })
        case REMOVE_FILE:
            return Object.assign({}, state, {
                files: state.files.filter(file => file.id !== action.id)
            })
        case SET_FILE_UPLOADING_STATE:
            return Object.assign({}, state, {
                files: state.files.map(file => {
                    if (file.id === action.id) {
                        file.uploadState = action.state
                    }
                    return file
                })
            })
        case SET_FILE_UPLOADED:
            return Object.assign({}, state, {
                files: state.files.map(file => {
                    if (file.id === action.id) {
                        file.uri = action.url
                        file.uploadState = "uploaded"
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
