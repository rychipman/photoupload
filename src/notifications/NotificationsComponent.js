import React from 'react'

import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import Paper from 'material-ui/Paper'

import DeleteIcon from 'material-ui-icons/Delete'

const styles = (theme) => ({
    paper: {
        width: '60%',
        margin: 15,
    },
})

const Note = ({ text, onClose }) => (
    <ListItem>
        <ListItemText primary={text}/>
        <ListItemSecondaryAction>
            <IconButton aria-label='dismiss' onClick={onClose}>
                <DeleteIcon/>
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
)

const notifications = ({ classes, notes, closeNote }) => (
    notes.length === 0
    ? null
    : <Paper elevation={2} className={classes.paper}>
          <List>
              {notes.map(note => (
                  <Note
                      key={note.id}
                      text={note.text}
                      onClose={() => closeNote(note.id)}
                  />
              ))}
          </List>
      </Paper>
)
const Notifications = withStyles(styles)(notifications)

export default Notifications
