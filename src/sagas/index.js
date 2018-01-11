import { delay } from 'redux-saga'
import { call, put, takeEvery } from 'redux-saga/effects'

import { UPLOAD_FILE } from '../actions'
import {
    fileUploaded,
    fileUploading,
    fileUploadFailed,
    createNotification,
} from '../actions'

const api = {}
api.upload = (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return fetch('http://localhost:8080/upload', {
        method: 'POST',
        headers:{ },
        body: formData,
    }).then(res => res.json())
}

function* uploadFile(action) {
    yield put(fileUploading(action.id))
    yield delay(Math.random()*5000)

    let fail = false
    if (Math.random() > 0.5) {
        fail = true
    }

    try {
        const data = yield call(api.upload, action.file)
        if (data.Success && !fail) {
            console.log(data)
            yield put(fileUploaded(action.id, data.Thumb))
        } else {
            console.log(data)
            yield put(fileUploadFailed(action.id))
            yield put(createNotification('upload failed'))
        }
    } catch(e) {
        console.log(e)
        yield put(fileUploadFailed(action.id))
        yield put(createNotification('upload failed with uncaught err'))
    }

}

function* watch() {
    yield takeEvery(UPLOAD_FILE, uploadFile)
}

export default watch
