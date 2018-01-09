import React from 'react'

import { withStyles } from 'material-ui/styles'
import Checkbox from 'material-ui/Checkbox'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import List, {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List'

import DoneIcon from 'material-ui-icons/Done'

const styles = (theme) => ({
    list: {
        padding: 0,
    },
})

let TaskList = ({ classes, tasks, onTodoClick }) =>(
    <List className={classes.list}>
    {tasks.map((todo, idx) => (
        <div>
        <Divider/>
        <ListItem
            button
            //onClick={() => onTodoClick(todo.id)}
            key={todo.id}
        >
            <Checkbox />

            <ListItemText primary={todo.text}/>

            <ListItemSecondaryAction>
                <IconButton aria-label='done'>
                    <DoneIcon/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
        </div>
    ))}
        <Divider/>
    </List>
)
TaskList = withStyles(styles)(TaskList)

export default TaskList
