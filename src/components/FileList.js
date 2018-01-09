import React from 'react'

import { withStyles } from 'material-ui/styles'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import Paper from 'material-ui/Paper'

import DeleteIcon from 'material-ui-icons/Delete'
import PhotoIcon from 'material-ui-icons/Photo'

const styles = {
    paper: {
        'max-width': '60%',
        'margin': 15,
    },
}

const FileList = ({ classes, files, onFileDelete }) => (
    <Paper elevation={2} className={classes.paper}>
    <List dense>
    {files.map(file => (
        <ListItem key={file.id}>
            <Avatar><PhotoIcon/></Avatar>
            <ListItemText primary={file.filename}/>
            <ListItemSecondaryAction>
                <IconButton aria-label="Delete" onClick={() => onFileDelete(file.id)}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    ))}
    </List>
    </Paper>
)

export default withStyles(styles)(FileList)
