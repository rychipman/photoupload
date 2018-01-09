import { ADD_FILE, REMOVE_FILE } from '../actions';

const initialState = {
    files: [
        {
            id: -1,
            filename: '20150101_123523049_000.jpg',
        },
        {
            id: -2,
            filename: '20150101_123523049_000.jpg',
        },
        {
            id: -3,
            filename: '20150101_123523049_000.jpg',
        }
    ]
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
