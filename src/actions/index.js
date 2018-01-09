export const ADD_FILE = 'ADD_FILE'
export const ADD_IMAGE_FILE_DATA = 'ADD_IMAGE_FILE_DATA'
export const REMOVE_FILE = 'REMOVE_FILE'
export const SET_FILE_DATA = 'SET_FILE_DATA'

let nextFileId = 0;
const addFile = (id, filename) => (
    {
        type: ADD_FILE,
        id,
        filename,
    }
)

export const addImageFile = (file) => (
    (dispatch) => {
        const id = nextFileId++
        dispatch(addFile(id, file.name))
        let reader = new FileReader()
        reader.onload = (ev) => dispatch(addImageFileData(id, ev.target.result))
        reader.readAsDataURL(file)
    }
)

export const addImageFileData = (id, imageData) => (
    {
        type: ADD_IMAGE_FILE_DATA,
        id,
        imageData,
    }
)

export const removeFile = (id) => (
    {
        type: REMOVE_FILE,
        id,
    }
)
