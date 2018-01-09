import { delay } from 'redux-saga'
import { call, put, takeEvery } from 'redux-saga/effects'

import { UPLOAD_FILE } from '../actions'
import { fileUploaded, setFileUploadingState } from '../actions'

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
    yield put(setFileUploadingState(action.id, 'uploading'))
    yield delay(Math.random()*5000)

    try {
        const data = yield call(api.upload, action.file)
        if (!data.Success) {
            console.log(data)
            yield put(setFileUploadingState(action.id, ''))
        }
        yield put(fileUploaded(action.id, data.Message))
    } catch(e) {
        console.log(e)
        yield put(setFileUploadingState(action.id, ''))
    }

}

function* watch() {
    yield takeEvery(UPLOAD_FILE, uploadFile)
}

export default watch
