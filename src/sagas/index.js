import { call, put, select, takeEvery } from 'redux-saga/effects'
import { LOCATION_CHANGE, push as navigateTo } from 'react-router-redux'
import { getFileData } from '../selectors'
import api from '../api'
import {
    SIGNUP,
    SIGNUP_FAILED,
    SIGNUP_SUCCESSFUL,
    signupSuccessful,
    signupFailed,
} from '../actions'
import {
    LOGIN,
    LOGIN_FAILED,
    LOGIN_SUCCESSFUL,
    loginSuccessful,
    loginFailed,
} from '../actions'
import {
    ADD_FILE,
    UPLOAD_FILE,
    UPLOAD_FILE_FAILED,
    uploadFile,
    uploadFileSuccessful,
    uploadFileFailed,
} from '../actions'
import {
    PAGE_NEEDS_AUTH,
    pageNeedsAuth,
    authTokenRejected,
    createNotification,
} from '../actions'

function* apiCall(name, ...args) {
    const token = yield select(state => state.auth.token)
    const res = yield call(api[name], token, ...args)
    return res
}

function* handleAddFile(action) {
    yield put(uploadFile(action.id))
}

function* handleUpload(action) {
    const file = yield select(state => getFileData(state, action.id))
    const res = yield call(apiCall, 'upload', file)
    if (res.ok) {
        yield put(uploadFileSuccessful(action.id, res.data.hash))
    } else {
        yield put(uploadFileFailed(action.id, res.data.message))
    }
}

function* handleLogin(action) {
    const res = yield call(apiCall, 'getToken', action.email, action.password)
    if (res.ok) {
        yield put(loginSuccessful(action.email, res.data.token))
        yield put(navigateTo('/upload'))
    } else {
        yield put(loginFailed(res.data.message))
    }
}

function* handleSignup(action) {
    const res = yield call(apiCall, 'signup', action.email, action.password)
    if (res.ok) {
        yield put(signupSuccessful())
        yield put(navigateTo('/login'))
    } else {
        yield put(signupFailed(res.data.message))
    }
}

function* handleNavigate(action) {
    switch (action.payload.pathname) {
    case '/upload':
        const loggedIn = yield select(state => state.auth.token !== '')
        if (!loggedIn) {
            yield put(pageNeedsAuth())
        }
        return
    default:
        // do nothing
    }
}

function* handleRedirect(action) {
    yield put(navigateTo('/login'))
}

function* handleNotify(action) {
    switch (action.type) {
    case SIGNUP_FAILED:
        yield put(createNotification(
            'Signup Failed',
            action.message,
            'error',
        ))
        return
    case SIGNUP_SUCCESSFUL:
        yield put(createNotification(
            'Signup Successful',
            'Now log in with your new account.',
            'success',
        ))
        return
    case LOGIN_FAILED:
        yield put(createNotification(
            'Login Failed',
            action.message,
            'error',
        ))
        return
    case LOGIN_SUCCESSFUL:
        yield put(createNotification(
            'Login Successful',
            'Time to start uploading photos!',
            'success',
        ))
        return
    case UPLOAD_FILE_FAILED:
        yield put(createNotification(
            'Upload Failed',
            action.message,
            'error',
        ))
        return
    case PAGE_NEEDS_AUTH:
        yield put(createNotification(
            'Not Logged In',
            'You need to be logged in to access that page. Sign in and then try again.',
            'warning',
        ))
        return
    default:
        // do nothing
    }
}

function* watch() {
    yield takeEvery(ADD_FILE, handleAddFile)
    yield takeEvery(UPLOAD_FILE, handleUpload)
    yield takeEvery(LOGIN, handleLogin)
    yield takeEvery(SIGNUP, handleSignup)
    yield takeEvery(LOCATION_CHANGE, handleNavigate)
    yield takeEvery(PAGE_NEEDS_AUTH, handleRedirect)
    yield takeEvery('*', handleNotify)
}

export default watch
