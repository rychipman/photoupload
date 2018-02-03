import uuid from 'uuid-random'

const makeActionCreator = (type, ...argNames) => (
  (...args) => {
    let action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
)

const withUUID = (creator) => (
    (...args) => {
        const action = creator(...args)
        action.id = uuid()
        return action
    }
)

// Actions and action creators for the upload flow
export const ADD_FILE = 'ADD_FILE'
export const UPLOAD_FILE = 'UPLOAD_FILE'
export const UPLOAD_FILE_FAILED = 'UPLOAD_FILE_FAILED'
export const UPLOAD_FILE_SUCCESSFUL = 'UPLOAD_FILE_SUCCESSFUL'
export const addFile = withUUID(makeActionCreator(ADD_FILE, 'file'))
export const uploadFile = makeActionCreator(UPLOAD_FILE, 'id')
export const uploadFileFailed = makeActionCreator(UPLOAD_FILE_FAILED, 'id', 'message')
export const uploadFileSuccessful = makeActionCreator(UPLOAD_FILE_SUCCESSFUL, 'id', 'hash')

// Actions and action creators for file-list filters in upload view
export const TOGGLE_UPLOADED_LIST = 'TOGGLE_UPLOADED_LIST'
export const TOGGLE_FAILED_LIST = 'TOGGLE_FAILED_LIST'
export const TOGGLE_QUEUED_LIST = 'TOGGLE_QUEUED_LIST'
export const toggleUploadedList = makeActionCreator(TOGGLE_UPLOADED_LIST)
export const toggleFailedList = makeActionCreator(TOGGLE_FAILED_LIST)
export const toggleQueuedList = makeActionCreator(TOGGLE_QUEUED_LIST)

// Actions and action creators for the signup flow
export const SIGNUP = 'SIGNUP'
export const SIGNUP_FAILED = 'SIGNUP_FAILED'
export const SIGNUP_SUCCESSFUL = 'SIGNUP_SUCCESSFUL'
export const signup = makeActionCreator(SIGNUP, 'email', 'password')
export const signupFailed = makeActionCreator(SIGNUP_FAILED, 'message')
export const signupSuccessful = makeActionCreator(SIGNUP_SUCCESSFUL)

// Actions and action creators for the login flow
export const LOGIN = 'LOGIN'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL'
export const login = makeActionCreator(LOGIN, 'email', 'password')
export const loginFailed = makeActionCreator(LOGIN_FAILED, 'message')
export const loginSuccessful = makeActionCreator(LOGIN_SUCCESSFUL, 'email', 'token')

// Actions and action creators for situations with insufficient auth
export const AUTH_TOKEN_REJECTED = 'AUTH_TOKEN_REJECTED'
export const PAGE_NEEDS_AUTH = 'PAGE_NEEDS_AUTH'
export const authTokenRejected = makeActionCreator(AUTH_TOKEN_REJECTED, 'message')
export const pageNeedsAuth = makeActionCreator(PAGE_NEEDS_AUTH)

// Actions and action creators for notifications
export const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION'
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION'
export const createNotification = withUUID(makeActionCreator(CREATE_NOTIFICATION, 'title', 'message', 'purpose'))
export const closeNotification = makeActionCreator(CLOSE_NOTIFICATION, 'id')

