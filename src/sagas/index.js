import { call, put, select, takeEvery } from 'redux-saga/effects'
import api from '../api'
import {
    UPLOAD_FILE,
    RETRY_UPLOAD_FILE,
    GET_TOKEN,
} from '../actions'
import {
    fileUploaded,
    fileUploading,
    fileUploadFailed,
    createNotification,
    updateToken,
    authFailed,
} from '../actions'

function* processApiResult(res) {
    if (res.ok) {
        try {
            const data = yield call(() => res.json())
            return {
                ok: true,
                token: data.token,
            }
        } catch(e) {
            return {
                ok: false,
                message: 'failed to parse json from result: ' + e.message,
            }
        }
    }

    if (res.status === 401) {
        yield put(authFailed())
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
        yield put(fileUploaded(action.id, res.hash))
    } else {
        yield put(fileUploadFailed(action.id))
        yield put(createNotification('upload failed'))
    }
}

function* login(action) {
    const res = yield call(apiCall, 'getToken', action.email, action.password)
    if (res.ok) {
        yield put(updateToken(res.token))
    } else {
        yield put(authFailed())
    }
}

function* watch() {
    yield takeEvery(UPLOAD_FILE, uploadFile)
    yield takeEvery(RETRY_UPLOAD_FILE, uploadFile)
    yield takeEvery(GET_TOKEN, login)
}

export default watch
