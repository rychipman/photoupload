export const ADD_FILE = 'ADD_FILE'
export const REMOVE_FILE = 'REMOVE_FILE'
export const UPLOAD_FILE = 'UPLOAD_FILE'

export const DISMISS_FILE_SUCCESS = 'DISMISS_FILE_SUCCESS'

export const FILE_UPLOADED = 'FILE_UPLOADED'
export const FILE_UPLOADING = 'FILE_UPLOADING'
export const FILE_UPLOAD_FAILED = 'FILE_UPLOAD_FAILED'

export const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION'
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION'

export const TOGGLE_UPLOADED_LIST = 'TOGGLE_UPLOADED_LIST'
export const TOGGLE_FAILED_LIST = 'TOGGLE_FAILED_LIST'
export const TOGGLE_QUEUED_LIST = 'TOGGLE_QUEUED_LIST'

const makeActionCreator = (type, ...argNames) => (
  (...args) => {
    let action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
)

export const removeFile = makeActionCreator(REMOVE_FILE, 'id')
export const dismissFileSuccess = makeActionCreator(DISMISS_FILE_SUCCESS, 'id')
export const uploadFile = makeActionCreator(UPLOAD_FILE, 'id', 'file')
export const fileUploaded = makeActionCreator(FILE_UPLOADED, 'id', 'uri')
export const fileUploading = makeActionCreator(FILE_UPLOADING, 'id')
export const fileUploadFailed = makeActionCreator(FILE_UPLOAD_FAILED, 'id')
export const closeNotification = makeActionCreator(CLOSE_NOTIFICATION, 'id')
export const toggleUploadedList = makeActionCreator(TOGGLE_UPLOADED_LIST)
export const toggleFailedList = makeActionCreator(TOGGLE_FAILED_LIST)
export const toggleQueuedList = makeActionCreator(TOGGLE_QUEUED_LIST)

let nextFileId = 0;
export const addFile = (file) => (
    {
        type: ADD_FILE,
        id: nextFileId++,
        filename: file.name,
        data: file,
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
