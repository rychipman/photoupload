import React from 'react'
import { addTask } from '../actions/'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'

let AddTask = ({ dispatch }) => (
    <TextField
        label="Add Task"
        onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
                dispatch(addTask(ev.target.value))
                ev.target.value = ''
                ev.preventDefault()
            }
        }}
    />
)

AddTask = connect()(AddTask)

export default AddTask
