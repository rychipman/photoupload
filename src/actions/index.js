export const ADD_FILE = 'ADD_FILE'
export const ADD_IMAGE_FILE_DATA = 'ADD_IMAGE_FILE_DATA'
export const REMOVE_FILE = 'REMOVE_FILE'
export const SET_FILE_DATA = 'SET_FILE_DATA'
export const SET_FILE_UPLOADED = 'SET_FILE_UPLOADED'
export const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION'
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION'

let nextFileId = 0;
const addFile = (id, filename, data) => (
    {
        type: ADD_FILE,
        id,
        filename,
        data,
    }
)

export const addImageFile = (file) => (
    (dispatch) => {
        const id = nextFileId++
        dispatch(addFile(id, file.name, file))
        let reader = new FileReader()
        reader.onload = (ev) => dispatch(addImageFileData(id, ev.target.result))
        reader.readAsDataURL(file)
    }
)

export const addImageFileData = (id, imageDataURI) => (
    {
        type: ADD_IMAGE_FILE_DATA,
        id,
        imageDataURI,
    }
)

export const removeFile = (id) => (
    {
        type: REMOVE_FILE,
        id,
    }
)

export const uploadFile = (id, file) => (
    (dispatch) => {
        const formData = new FormData()
        formData.append('file', file)
        fetch('http://localhost:8080/upload', {
            method: 'POST',
            headers:{ },
            body: formData,
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.Success) {
                dispatch(setFileUploaded(id, data.Message))
                dispatch(createNotification('file upload succeeded'))
            } else {
                dispatch(createNotification('file upload failed'))
            }
        })
        .catch(() => dispatch(createNotification('could not complete upload request')))
    }
)

const setFileUploaded = (id, url) => (
    {
        type: SET_FILE_UPLOADED,
        id,
        url,
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

export const closeNotification = (id) => (
    {
        type: CLOSE_NOTIFICATION,
        id,
    }
)
