import React from 'react'

import { withStyles } from 'material-ui/styles'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'
import Collapse from 'material-ui/transitions/Collapse'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import List, {
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from 'material-ui/List'
import Paper from 'material-ui/Paper'

import AddIcon from 'material-ui-icons/Add'
import CheckIcon from 'material-ui-icons/Check'
import DeleteIcon from 'material-ui-icons/Delete'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
import PhotoIcon from 'material-ui-icons/Photo'
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
    buttonContainer: {
        width: '100%',
        'align-items': 'center',
        display: 'flex',
    },
})

const fileList = ({ classes, files, fileAction, listActions, iconColor, open, toggle }) => {
    return (
        <List disablePadding>
            <ListItem key='header'>
                <ListItemAvatar>
                    <Avatar style={{ backgroundColor: iconColor }}>{'' + files.length}</Avatar>
                </ListItemAvatar>
                <div className={classes.buttonContainer}>
                    {listActions}
                </div>
                <ListItemSecondaryAction>
                {
                    files.length > 0
                    ? <IconButton aria-label='expand' onClick={toggle}>
                          {open ? <ExpandLess/> : <ExpandMore/>}
                      </IconButton>
                    : null
                }
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse component='li' transition='auto' in={open}>
                <Divider/>
                <List dense disablePadding>
                    {files.map(file => {
                        return <ListItem key={file.id}>
                            <ListItemIcon><PhotoIcon/></ListItemIcon>
                            <ListItemText inset primary={file.filename}/>
                            <ListItemSecondaryAction>
                                {fileAction(file)}
                            </ListItemSecondaryAction>
                        </ListItem>
                    })}
                </List>
            </Collapse>
        </List>
    )
}
const FileList = withStyles(styles)(fileList)

const UploadedList = ({ files, onDismiss, open, toggle }) => {
    const successFiles = files.filter(f => f.uploaded && f.succeeded)

    const listActions = (
        <Button onClick={() => successFiles.map((f) => onDismiss(f.id))}>
            dismiss
        </Button>
    )

    const fileAction = (file) => (
        <IconButton onClick={() => onDismiss(file.id)}>
            <CheckIcon/>
        </IconButton>
    )

    return (
        <FileList
            iconColor={'green'}
            open={open}
            toggle={toggle}
            files={successFiles}
            fileAction={fileAction}
            listActions={listActions}
        />
    )
}

const FailedList = ({ files, onFileDelete, onUpload, open, toggle }) => {
    const failedFiles = files.filter(f => f.failed)

    const retry = () => onUpload(failedFiles)
    const unqueue = () => (
        failedFiles
            .filter(f => !f.uploading)
            .map(f => onFileDelete(f.id))
    )

    const listActions = (
        <div>
            <Button onClick={retry}>retry</Button>
            <Button onClick={unqueue}>unqueue</Button>
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
            iconColor={'red'}
            open={open}
            toggle={toggle}
            files={failedFiles}
            fileAction={fileAction}
            listActions={listActions}
        />
    )
}

const QueuedList = ({ files, onFileDelete, onUpload, open, toggle }) => {
    const unuploadedFiles = files.filter(f => !f.uploaded && !f.failed)
    const queuedFiles = unuploadedFiles.filter(f => !f.uploading)

    const listActions = (
        <div>
            <Button onClick={() => onUpload(queuedFiles)}>
                upload
            </Button>
            <Button onClick={() => queuedFiles.map(f => onFileDelete(f.id))}>
                unqueue
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
            iconColor={'blue'}
            open={open}
            toggle={toggle}
            files={unuploadedFiles}
            fileAction={fileAction}
            listActions={listActions}
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
    <Paper elevation={2} className={props.classes.paper}>
        <UploadedList {...props}
            open={props.uploadedListOpen}
            toggle={props.uploadedListToggle}/>
        <Divider/>
        <FailedList {...props}
            open={props.failedListOpen}
            toggle={props.failedListToggle}/>
        <Divider/>
        <QueuedList {...props}
            open={props.queuedListOpen}
            toggle={props.queuedListToggle}/>
        <UploadButton {...props}/>
    </Paper>
)

export default withStyles(styles)(UploadComponent)
