export const ADD_FILE = 'ADD_FILE'
export const REMOVE_FILE = 'REMOVE_FILE'
export const SET_FILE_DATA = 'SET_FILE_DATA'
export const SET_FILE_UPLOADED = 'SET_FILE_UPLOADED'
export const SET_FILE_UPLOADING_STATE = 'SET_FILE_UPLOADING_STATE'
export const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION'
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION'

let nextFileId = 0;
const addFile = (id, filename, data) => (
    {
        type: ADD_FILE,
        id,
        filename,
        data,
    }
)

export const addImageFile = (file) => (
    (dispatch) => {
        const id = nextFileId++
        dispatch(addFile(id, file.name, file))
    }
)

export const removeFile = (id) => (
    {
        type: REMOVE_FILE,
        id,
    }
)

export const uploadFiles = (files) => (
    (dispatch) => {
        console.log('here')
        files.reduce((cur, next) => (
            cur.then(() => {
                const file = next
                const formData = new FormData()
                formData.append('file', file.data)
                dispatch(setFileUploadingState(file.id, 'uploading'))
                return fetch('http://localhost:8080/upload', {
                    method: 'POST',
                    headers:{ },
                    body: formData,
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    dispatch(setFileUploaded(file.id, data.Message))
                })
            })
        ), Promise.resolve(''))
    }
)

export const uploadFile = (id, file) => (
    (dispatch) => {
    }
)

const setFileUploadingState = (id, state) => (
    {
        type: SET_FILE_UPLOADING_STATE,
        id,
        state,
    }
)

const setFileUploaded = (id, url) => (
    {
        type: SET_FILE_UPLOADED,
        id,
        url,
    }
)

let nextNotificationId = 0
export const createNotification = (text) => {
    const id = nextNotificationId++
    return {
        type: CREATE_NOTIFICATION,
        id,
        text,
    }
}

export const closeNotification = (id) => (
    {
        type: CLOSE_NOTIFICATION,
        id,
    }
)
