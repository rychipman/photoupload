import { ADD_FILE, REMOVE_FILE } from '../actions';

const initialState = {
    files: []
}

let last_id = 0

export const uploadApp = (state=initialState, action) => {
    switch (action.type) {
        case ADD_FILE:
            last_id += 1;
            return Object.assign({}, state, {
                files: [
                    ...state.files,
                    {
                        id: last_id,
                        filename: action.filename,
                        data: action.data,
                    }
                ]
            })
        case REMOVE_FILE:
            return Object.assign({}, state, {
                files: state.files.filter((file) => file.id !== action.id)
            })
        default:
            return state
    }
}
