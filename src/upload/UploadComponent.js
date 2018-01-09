import React from 'react'

import { withStyles } from 'material-ui/styles'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'

import AddIcon from 'material-ui-icons/Add'
import DeleteIcon from 'material-ui-icons/Delete'

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

const UploadComponent = ({ classes, files, onFileAdd, onFileDelete, onUpload, notifications, onNotificationClose }) => (
    <Paper elevation={2} className={classes.paper}>
    <List dense>
    <ListItem key='header' button onClick={() => files.filter(f => f.uploadState === '').map(f => onUpload(f.id, f.data))}>
        <ListItemText primary={files.filter(f => f.uploadState !== 'uploaded').length + ' files to be uploaded'}/>
    </ListItem>
    <Divider/>
    {files.filter(f => f.uploadState !== 'uploaded').map(file => {
        let deleteFile = () => onFileDelete(file.id)
        let secondary = <IconButton aria-label='delete' onClick={deleteFile}>
                            <DeleteIcon />
                        </IconButton>
        if (file.uploadState === 'uploading') {
            secondary = <CircularProgress/>
        }
        return <ListItem key={file.id}>
            <Avatar src={file.uri}/>
            <ListItemText primary={file.filename}/>
            <ListItemSecondaryAction>
                {secondary}
            </ListItemSecondaryAction>
        </ListItem>
    })}
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
            onChange={e => Array.from(e.target.files).map(f => onFileAdd(f))}
            className={classes.input}
            id='photoinput'
            name='photoinput'
            accept='image/*'
            type='file'
            multiple
        />
    </Button>
    {notifications.map(note => (
        <Snackbar
            key={note.id}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={note.open}
            message={note.text}
            autoHideDuration={1500}
            onClose={() => onNotificationClose(note.id)}
        />
    ))}
    </Paper>
)

export default withStyles(styles)(UploadComponent)
