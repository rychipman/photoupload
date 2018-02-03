import { call, put, takeEvery } from 'redux-saga/effects'
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

const api = {}
api.upload = (file) => {
    const token = localStorage.getItem('jwtToken')
    console.log('sending api request with token: ' + token)
    const formData = new FormData()
    formData.append('file', file)
    return fetch('http://localhost:8080/upload', {
        method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
        }),
        body: formData,
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
        throw new Error('response was not ok')
    }).then(json => ({
        ok: true,
        hash: json.hash,
    })).catch(e => (
        Promise.resolve({
            ok: false,
            message: e.message,
        })
    ))
}

function* uploadFile(action) {
    yield put(fileUploading(action.id))
    const res = yield call(api.upload, action.file)
    console.log(res)
    if (res.ok) {
        yield put(fileUploaded(action.id, res.hash))
    } else {
        yield put(fileUploadFailed(action.id))
        yield put(createNotification('upload failed'))
    }
}

api.getToken = (email, password) => {
    return fetch('http://localhost:8080/token', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            email,
            password,
        }),
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
        throw new Error('response was not ok')
    }).then(json => ({
        ok: true,
        token: json.token,
    })).catch(e => (
        Promise.resolve({
            ok: false,
            message: e.message,
        })
    ))
}

function* login(action) {
    const res = yield call(api.getToken, action.email, action.password)
    if (res.ok) {
        console.log(res.token)
        localStorage.setItem('jwtToken', res.token)
        yield put(updateToken(res.token))
    } else {
        console.log('auth failed: ' + res.message)
        yield put(authFailed())
    }
}

function* watch() {
    yield takeEvery(UPLOAD_FILE, uploadFile)
    yield takeEvery(RETRY_UPLOAD_FILE, uploadFile)
    yield takeEvery(GET_TOKEN, login)
}

export default watch
