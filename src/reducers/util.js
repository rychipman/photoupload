
export const createReducer = (handlers) => (
    (state = null, action) => {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        }
        return state
    }
)

export const update = (obj, vals) => Object.assign({}, obj, vals)

export const updateArray = (arr, id, fn) => (
    arr.map(item => (
        item.id === id
        ? fn(item)
        : item
    ))
)

export const updateArrayVals = (arr, id, vals) => (
    updateArray(arr, id, (item) => update(item, vals))
)
