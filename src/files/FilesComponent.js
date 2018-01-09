import React from 'react'

import { withStyles } from 'material-ui/styles'
import GridList, { GridListTile } from 'material-ui/GridList'
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
    <GridList cellHeight={160} cols={3}>
    {files.filter(f => f.uploadState === 'uploaded').map(file => {
        return <GridListTile key={file.id} cols={1}>
            <img src={file.uri} alt={file.filename}/>
        </GridListTile>
    })}
    </GridList>
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
