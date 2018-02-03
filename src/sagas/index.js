import { call, put, select, takeEvery } from 'redux-saga/effects'
import { LOCATION_CHANGE, push as navigateTo } from 'react-router-redux'
import api from '../api'
import {
    SIGNUP,
    SIGNUP_FAILED,
    SIGNUP_SUCCEEDED,
    SIGNUP_CLEAR_MESSAGES,
    signupSuccessful,
    signupFailed,
} from '../actions'
import {
    LOGIN,
    LOGIN_FAILED,
    LOGIN_SUCCEEDED,
    LOGIN_CLEAR_MESSAGES,
    loginSuccessful,
    loginFailed,
} from '../actions'
import {
    PAGE_NEEDS_AUTH,
    RETRY_UPLOAD_FILE,
    SIGN_UP,
    UPLOAD_FILE,
    authTokenRejected,
    createNotification,
    fileUploadFailed,
    fileUploaded,
    fileUploading,
    pageNeedsAuth,
} from '../actions'

function* processApiResult(res) {
    if (res.ok) {
        try {
            const data = yield call(() => res.json())
            return {
                ok: true,
                data,
            }
        } catch(e) {
            return {
                ok: false,
                message: 'failed to parse json from result: ' + e.message,
            }
        }
    }

    if (res.status === 401) {
        //yield put(authTokenRejected('generic auth token failed message'))
    }

    return {
        ok: false,
        message: res.status + ' ' + res.statusText,
    }
}

function* apiCall(name, ...args) {
    try {
        const token = yield select(state => state.auth.token)
        const res = yield call(api[name], token, ...args)
        const data = yield* processApiResult(res)
        return data
    } catch(e) {
        return {
            ok: false,
            message: 'api call failed: ' + e.message,
        }
    }
}

function* uploadFile(action) {
    yield put(fileUploading(action.id))
    const res = yield call(apiCall, 'upload', action.file)
    if (res.ok) {
        yield put(fileUploaded(action.id, res.data.hash))
    } else {
        yield put(fileUploadFailed(action.id))
        yield put(createNotification('upload failed'))
    }
}

function* handleLogin(action) {
    const res = yield call(apiCall, 'getToken', action.email, action.password)
    if (res.ok) {
        yield put(loginSuccessful(action.email, res.data.token))
        yield put(navigateTo('/upload'))
    } else {
        yield put(loginFailed('generic login failure message'))
    }
}

function* handleSignup(action) {
    const res = yield call(apiCall, 'signup', action.email, action.password)
    console.log(res)
    if (res.ok) {
        yield put(signupSuccessful())
        yield put(navigateTo('/login'))
    } else {
        yield put(signupFailed('generic signup failure message'))
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
        yield put(createNotification('Signup Failed: ' + action.message))
        return
    case LOGIN_FAILED:
        yield put(createNotification('Login Failed: ' + action.message))
        return
    default:
        // do nothing
    }
}

function* watch() {
    yield takeEvery(UPLOAD_FILE, uploadFile)
    yield takeEvery(RETRY_UPLOAD_FILE, uploadFile)
    yield takeEvery(LOGIN, handleLogin)
    yield takeEvery(SIGNUP, handleSignup)
    yield takeEvery(LOCATION_CHANGE, handleNavigate)
    yield takeEvery(PAGE_NEEDS_AUTH, handleRedirect)
    yield takeEvery('*', handleNotify)
}

export default watch
