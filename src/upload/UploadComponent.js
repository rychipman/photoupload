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

import AddIcon from 'material-ui-icons/Add'
import CheckIcon from 'material-ui-icons/Check'
import DeleteIcon from 'material-ui-icons/Delete'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
import RefreshIcon from 'material-ui-icons/Refresh'

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

const fileList = ({ classes, title, files, fileAction, open, toggle }) => {
    return <Paper elevation={2} className={classes.paper}>
        <List disablePadding>
            <ListItem key='header'>
                <ListItemText primary={title}/>
                <ListItemSecondaryAction>
                    <IconButton aria-label='expand' onClick={toggle}>
                        {open ? <ExpandLess/> : <ExpandMore/>}
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse component='li' transition='auto' in={open}>
                <Divider/>
                <List dense disablePadding>
                    {files.map(file => {
                        return <ListItem key={file.id}>
                            <Avatar>{file.filename.slice(0, 1)}</Avatar>
                            <ListItemText inset primary={file.filename}/>
                            <ListItemSecondaryAction>
                                {fileAction(file)}
                            </ListItemSecondaryAction>
                        </ListItem>
                    })}
                </List>
            </Collapse>
        </List>
    </Paper>
}
const FileList = withStyles(styles)(fileList)

const UploadedList = ({ files, onDismiss, open, toggle }) => {
    const successFiles = files.filter(f => f.uploaded && f.succeeded)

    const header = (
        <Button onClick={() => successFiles.map((f) => onDismiss(f.id))}>
            Dismiss {successFiles.length} successful uploads
        </Button>
    )

    const fileAction = (file) => (
        <IconButton onClick={() => onDismiss(file.id)}>
            <CheckIcon/>
        </IconButton>
    )

    return (
        <FileList
            open={open}
            toggle={toggle}
            title={header}
            files={successFiles}
            fileAction={fileAction}
        />
    )
}

const FailedList = ({ files, onFileDelete, onUpload, open, toggle }) => {
    const failedFiles = files.filter(f => f.failed)

    const header = (
        <div>
            <Button onClick={() => onUpload(failedFiles)}>
                Retry {failedFiles.length} failed uploads
            </Button>
            <Button onClick={() => failedFiles.map(f => onFileDelete(f.id))}>
                Unqueue {failedFiles.length} files
            </Button>
        </div>
    )

    const fileAction = (file) => (
        file.uploading
        ? <CircularProgress/>
        : <IconButton onClick={() => onUpload([file])}>
              <RefreshIcon/>
          </IconButton>
    )

    return (
        <FileList
            open={open}
            toggle={toggle}
            title={header}
            files={failedFiles}
            fileAction={fileAction}
        />
    )
}

const QueuedList = ({ files, onFileDelete, onUpload, open, toggle }) => {
    const unuploadedFiles = files.filter(f => !f.uploaded && !f.failed)
    const queuedFiles = unuploadedFiles.filter(f => !f.uploading)

    const header = (
        <div>
            <Button onClick={() => onUpload(queuedFiles)}>
                    Upload {queuedFiles.length} files
            </Button>
            <Button onClick={() => queuedFiles.map(f => onFileDelete(f.id))}>
                Unqueue {queuedFiles.length} files
            </Button>
        </div>
    )

    const fileAction = (file) => (
        file.uploading
        ? <CircularProgress/>
        : <IconButton onClick={() => onFileDelete(file.id)}>
              <DeleteIcon/>
          </IconButton>
    )

    return (
        <FileList
            open={open}
            toggle={toggle}
            title={header}
            files={unuploadedFiles}
            fileAction={fileAction}
        />
    )
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
        <UploadedList {...props}
            open={props.uploadedListOpen}
            toggle={props.uploadedListToggle}/>
        <FailedList {...props}
            open={props.failedListOpen}
            toggle={props.failedListToggle}/>
        <QueuedList {...props}
            open={props.queuedListOpen}
            toggle={props.queuedListToggle}/>
        <UploadButton {...props}/>
    </div>
)

export default withStyles(styles)(UploadComponent)
