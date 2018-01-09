export const ADD_FILE = 'ADD_FILE'
export const REMOVE_FILE = 'REMOVE_FILE'
export const SET_FILE_DATA = 'SET_FILE_DATA'

export const addFile = (filename, data) => (
    {
        type: ADD_FILE,
        filename,
        data,
    }
)

export const removeFile = (id) => (
    {
        type: REMOVE_FILE,
        id,
    }
)
