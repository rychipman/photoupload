import React from 'react'

import { withStyles } from 'material-ui/styles'
import Avatar from 'material-ui/Avatar'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'

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

const FilesComponent = ({ classes, files, notifications, onNotificationClose }) => (
    <Paper elevation={2} className={classes.paper}>
    <List dense>
    {files.filter(f => f.uploadState === 'uploaded').map(file => {
        return <ListItem key={file.id}>
            <Avatar src={file.uri}/>
            <ListItemText primary={file.filename}/>
        </ListItem>
    })}
    </List>
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

export default withStyles(styles)(FilesComponent)
