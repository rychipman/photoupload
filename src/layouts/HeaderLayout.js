import React from 'react'

import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

const styles = (theme) => ({
    contentFrame: {
        width: '100%',
        height: '100%',
    },
})

let Header = ({classes}) => (
    <div>
        <AppBar position='static'>
            <Toolbar>
                <Typography type="title" color="inherit">Photo Uploader</Typography>
            </Toolbar>
        </AppBar>
    </div>
)
Header = withStyles(styles)(Header)

let HeaderLayout = ({children, classes}) => (
    <div>
        <Header/>
        <div className={classes.contentFrame}>
            {children}
        </div>
    </div>
)
HeaderLayout = withStyles(styles)(HeaderLayout)

export default HeaderLayout
