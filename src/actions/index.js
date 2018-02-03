export const UPLOAD_FILE = 'UPLOAD_FILE'
export const RETRY_UPLOAD_FILE = 'RETRY_UPLOAD_FILE'

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

export const retryUploadFile = makeActionCreator(RETRY_UPLOAD_FILE, 'id', 'file')
export const fileUploaded = makeActionCreator(FILE_UPLOADED, 'id', 'uri')
export const fileUploading = makeActionCreator(FILE_UPLOADING, 'id')
export const fileUploadFailed = makeActionCreator(FILE_UPLOAD_FAILED, 'id')
export const closeNotification = makeActionCreator(CLOSE_NOTIFICATION, 'id')
export const toggleUploadedList = makeActionCreator(TOGGLE_UPLOADED_LIST)
export const toggleFailedList = makeActionCreator(TOGGLE_FAILED_LIST)
export const toggleQueuedList = makeActionCreator(TOGGLE_QUEUED_LIST)

let nextFileId = 0;
export const uploadFile = (file) => (
    {
        type: UPLOAD_FILE,
        id: nextFileId++,
        file: file,
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
