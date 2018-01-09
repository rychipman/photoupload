
export const ADD_TASK = 'ADD_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'

export const addTask = text => (
    {
        type: ADD_TASK,
        text
    }
)

export const removeTask = id => (
    {
        type: REMOVE_TASK,
        id
    }
)
