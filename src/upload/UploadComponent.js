import React from 'react'

import { withStyles } from 'material-ui/styles'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import Paper from 'material-ui/Paper'

import AddIcon from 'material-ui-icons/Add'
import DeleteIcon from 'material-ui-icons/Delete'
import PhotoIcon from 'material-ui-icons/Photo'

const styles = (theme) => ({
    paper: {
        width: '60%',
        margin: 15,
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 4,
        right: theme.spacing.unit * 5,
    },
    input: {
        display: 'none',
    },
})

const UploadComponent = ({ classes, files, onFileAdd, onFileDelete }) => (
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
    <Button
        fab
        component='label'
        color='primary'
        aria-label='add'
        className={classes.fab}
        disableRipple={true}
    >
        <AddIcon/>
        <input
            onChange={e => Array.from(e.target.files).map(f => onFileAdd(f.name))}
            className={classes.input}
            id='photoinput'
            name='photoinput'
            accept='image/*'
            type='file'
            multiple
        />
    </Button>
    </Paper>
)

export default withStyles(styles)(UploadComponent)
