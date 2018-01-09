import React from 'react'

import { withStyles } from 'material-ui/styles'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import Paper from 'material-ui/Paper'

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

const UploadComponent = ({ classes, files, onFileAdd, onFileDelete, onUpload }) => (
    <Paper elevation={2} className={classes.paper}>
    <List dense>
    <ListItem key='header' button onClick={() => files.map(f => onUpload(f.data))}>
        <ListItemText primary={files.length + ' files to be uploaded'}/>
    </ListItem>
    <Divider/>
    {files.map(file => {
        let deleteFile = () => onFileDelete(file.id)
        return <ListItem key={file.id}>
            <Avatar src={file.imageDataURI}/>
            <ListItemText primary={file.filename}/>
            <ListItemSecondaryAction>
                <IconButton aria-label="delete" onClick={deleteFile}>
                    <DeleteIcon />
                </IconButton>
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
    </Paper>
)

export default withStyles(styles)(UploadComponent)
