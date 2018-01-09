export const ADD_FILE = 'ADD_FILE'
export const REMOVE_FILE = 'REMOVE_FILE'
export const SET_FILE_DATA = 'SET_FILE_DATA'
export const UPLOAD_FILE = 'UPLOAD_FILE'
export const FILE_UPLOADED = 'FILE_UPLOADED'
export const SET_FILE_UPLOADING_STATE = 'SET_FILE_UPLOADING_STATE'
export const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION'
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION'

let nextFileId = 0;
export const addFile = (file) => (
    {
        type: ADD_FILE,
        id: nextFileId++,
        filename: file.name,
        data: file,
    }
)

export const removeFile = (id) => (
    {
        type: REMOVE_FILE,
        id,
    }
)

export const uploadFile = (id, file) => (
    {
        type: UPLOAD_FILE,
        id,
        file,
    }
)

export const fileUploaded = (id, uri) => (
    {
        type: FILE_UPLOADED,
        id,
        uri,
    }
)

export const setFileUploadingState = (id, state) => (
    {
        type: SET_FILE_UPLOADING_STATE,
        id,
        state,
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
