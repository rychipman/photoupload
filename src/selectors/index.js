
export const getFileData = (state, id) => (
    state.files.filter(f => f.id === id)[0].data
)
