export const ADD_FILE = 'ADD_FILE'
export const REMOVE_FILE = 'REMOVE_FILE'

export const addFile = (filename) => (
    {
        type: ADD_FILE,
        filename
    }
)

export const removeFile = (id) => (
    {
        type: REMOVE_FILE,
        id
    }
)
