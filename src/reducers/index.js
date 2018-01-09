import { ADD_FILE, REMOVE_FILE, ADD_IMAGE_FILE_DATA } from '../actions';

const initialState = {
    files: []
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
                        file.imageData = action.imageData
                    }
                    return file
                })
            })
        default:
            return state
    }
}
