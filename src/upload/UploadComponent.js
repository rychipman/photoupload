import React from 'react'

import { withStyles } from 'material-ui/styles'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'
import Collapse from 'material-ui/transitions/Collapse'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'

import AddIcon from 'material-ui-icons/Add'
import CheckIcon from 'material-ui-icons/Check'
import DeleteIcon from 'material-ui-icons/Delete'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'

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

const UploadedList = ({ classes, files }) => {
    const uploadedFiles = files.filter(f => f.uploadState === 'uploaded')
    const stagedUploadedFiles = uploadedFiles.filter(f => f.staged)

    if (stagedUploadedFiles.length === 0) {
        return null
    }

    // TODO: make this toggleable
    let expanded = true

    return <Paper elevation={2} className={classes.paper}>
        <List disablePadding>
            <ListItem key='header' button>
                <ListItemText primary={stagedUploadedFiles.length + ' files uploaded'}/>
                <ListItemSecondaryAction>
                    <IconButton aria-label='expand'>
                        {expanded ? <ExpandLess/> : <ExpandMore/>}
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse component='li' transition='auto' in={expanded}>
                <Divider/>
                <List dense disablePadding>
                    {stagedUploadedFiles.map(file => {
                        return <ListItem key={file.id}>
                            <Avatar>{file.filename.slice(0, 1)}</Avatar>
                            <ListItemText inset primary={file.filename}/>
                            <ListItemSecondaryAction>
                                <IconButton aria-label='accept'>
                                    <CheckIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    })}
                </List>
            </Collapse>
        </List>
    </Paper>
}

const QueuedList = ({ classes, files, onFileAdd, onFileDelete, onUpload, notifications, onNotificationClose }) => {
    const unuploadedFiles = files.filter(f => f.uploadState !== 'uploaded')
    const queuedFiles = unuploadedFiles.filter(f => f.uploadState !== 'uploading')

    if (unuploadedFiles.length === 0) {
        return null
    }

    return <Paper elevation={2} className={classes.paper}>
        <List disablePadding>
            <ListItem key='header'>
                <Button
                    onClick={() => onUpload(queuedFiles)}
                >
                        Upload {queuedFiles.length} files
                </Button>
                <Button
                    onClick={() => queuedFiles.map(f => onFileDelete(f.id))}
                >
                    Unqueue {queuedFiles.length} files
                </Button>
            </ListItem>
        </List>
        <Divider/>
        <List dense disablePadding>
            {unuploadedFiles.map(file => {
                let deleteFile = () => onFileDelete(file.id)
                return <ListItem key={file.id}>
                    <Avatar>{file.filename.slice(0, 1)}</Avatar>
                    <ListItemText primary={file.filename}/>
                    <ListItemSecondaryAction>
                    {
                        file.uploadState === 'uploading'
                        ? <CircularProgress/>
                        : <IconButton aria-label='delete' onClick={deleteFile}>
                              <DeleteIcon />
                          </IconButton>
                    }
                    </ListItemSecondaryAction>
                </ListItem>
            })}
        </List>
    </Paper>
}

const UploadButton = ({ classes, onFileAdd }) => {
    return <Button
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
}

const UploadComponent = (props) => (
    <div>
        <UploadedList {...props}/>
        <QueuedList {...props}/>
        <UploadButton {...props}/>
    </div>
)

export default withStyles(styles)(UploadComponent)

/*

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

*/
