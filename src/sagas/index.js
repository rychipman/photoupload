import { call, put, takeEvery } from 'redux-saga/effects'

import { UPLOAD_FILE, RETRY_UPLOAD_FILE } from '../actions'
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

    try {
        const res = yield call(api.upload, action.file)
        if (res.success) {
            console.log(res)
            yield put(fileUploaded(action.id, res.data.hash))
        } else {
            console.log(res)
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
    yield takeEvery(RETRY_UPLOAD_FILE, uploadFile)
}

export default watch
