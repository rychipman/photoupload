import { ADD_FILE, REMOVE_FILE, ADD_IMAGE_FILE_DATA, CREATE_NOTIFICATION, CLOSE_NOTIFICATION } from '../actions';

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
                    }
                ]
            })
        case REMOVE_FILE:
            return Object.assign({}, state, {
                files: state.files.filter((file) => file.id !== action.id)
            })
        case ADD_IMAGE_FILE_DATA:
            return Object.assign({}, state, {
                files: state.files.map((file) => {
                    if (file.id === action.id) {
                        file.imageDataURI = action.imageDataURI
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
                notifications: state.notifications.map((n) => {
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
