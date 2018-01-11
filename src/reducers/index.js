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

const update = (obj, vals) => Object.assign({}, obj, vals)
const updateArray = (arr, id, fn) => (
    arr.map(item => (
        item.id === id
        ? fn(item)
        : item
    ))
)
const updateArrayVals = (arr, id, vals) => (
    updateArray(arr, id, (item) => update(item, vals))
)

const uploadApp = (state=initialState, action) => {
    switch (action.type) {
        case ADD_FILE:
            return update(state, {
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
            return update(state, {
                files: state.files.filter(file => file.id !== action.id)
            })
        case DISMISS_FILE_SUCCESS:
            return update(state, {
                files: updateArrayVals(state.files, action.id, {
                    succeeded: false,
                })
            })
        case FILE_UPLOADED:
            return update(state, {
                files: updateArrayVals(state.files, action.id, {
                    uri: action.uri,
                    succeeded: true,
                    uploaded: true,
                    uploading: false,
                })
            })
        case FILE_UPLOADING:
            return update(state, {
                files: updateArrayVals(state.files, action.id, {
                    uploading: true,
                })
            })
        case FILE_UPLOAD_FAILED:
            return update(state, {
                files: updateArrayVals(state.files, action.id, {
                    failed: true,
                    uploading: false,
                })
            })
        case CREATE_NOTIFICATION:
            return update(state, {
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
            return update(state, {
                files: updateArrayVals(state.notifications, action.id, {
                    open: false,
                })
            })
        default:
            return state
    }
}

export default uploadApp
