
const makeActionCreator = (type, ...argNames) => (
  (...args) => {
    let action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
)

export const UPLOAD_FILE = 'UPLOAD_FILE'
export const RETRY_UPLOAD_FILE = 'RETRY_UPLOAD_FILE'

export const FILE_UPLOADED = 'FILE_UPLOADED'
export const FILE_UPLOADING = 'FILE_UPLOADING'
export const FILE_UPLOAD_FAILED = 'FILE_UPLOAD_FAILED'

export const TOGGLE_UPLOADED_LIST = 'TOGGLE_UPLOADED_LIST'
export const TOGGLE_FAILED_LIST = 'TOGGLE_FAILED_LIST'
export const TOGGLE_QUEUED_LIST = 'TOGGLE_QUEUED_LIST'

// Actions and action creators for the signup flow
export const SIGNUP = 'SIGNUP'
export const SIGNUP_FAILED = 'SIGNUP_FAILED'
export const SIGNUP_SUCCESSFUL = 'SIGNUP_SUCCESSFUL'
export const SIGNUP_CLEAR_MESSAGES = 'SIGNUP_CLEAR_MESSAGES'
export const signup = makeActionCreator(SIGNUP, 'email', 'password')
export const signupFailed = makeActionCreator(SIGNUP_FAILED, 'message')
export const signupSuccessful = makeActionCreator(SIGNUP_SUCCESSFUL)
export const signupClearMessages = makeActionCreator(SIGNUP_CLEAR_MESSAGES)

// Actions and action creators for the login flow
export const LOGIN = 'LOGIN'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL'
export const LOGIN_CLEAR_MESSAGES = 'LOGIN_CLEAR_MESSAGES'
export const login = makeActionCreator(LOGIN, 'email', 'password')
export const loginFailed = makeActionCreator(LOGIN_FAILED, 'message')
export const loginSuccessful = makeActionCreator(LOGIN_SUCCESSFUL, 'email', 'token')
export const loginClearMessages = makeActionCreator(LOGIN_CLEAR_MESSAGES)

// Actions and action creators for situations with insufficient auth
export const AUTH_TOKEN_REJECTED = 'AUTH_TOKEN_REJECTED'
export const PAGE_NEEDS_AUTH = 'PAGE_NEEDS_AUTH'
export const authTokenRejected = makeActionCreator(AUTH_TOKEN_REJECTED, 'message')
export const pageNeedsAuth = makeActionCreator(PAGE_NEEDS_AUTH)

// Actions and action creators for notifications
export const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION'
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION'
let nextNotificationId = 0
export const createNotification = (message) => {
    const id = nextNotificationId++
    return {
        type: CREATE_NOTIFICATION,
        id,
        message,
    }
}
export const closeNotification = makeActionCreator(CLOSE_NOTIFICATION, 'id')

export const retryUploadFile = makeActionCreator(RETRY_UPLOAD_FILE, 'id', 'file')
export const fileUploaded = makeActionCreator(FILE_UPLOADED, 'id', 'hash')
export const fileUploading = makeActionCreator(FILE_UPLOADING, 'id')
export const fileUploadFailed = makeActionCreator(FILE_UPLOAD_FAILED, 'id')
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

