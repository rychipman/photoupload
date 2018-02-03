import React from 'react'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'

import CloudUploadIcon from 'material-ui-icons/CloudUpload'
import InfoIcon from 'material-ui-icons/Info'
import MessageIcon from 'material-ui-icons/Message'
import PhotoLibraryIcon from 'material-ui-icons/PhotoLibrary'

const drawerWidth = 240;
const styles = (theme) => ({
    root: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    contentFrame: {
        width: '100%',
        height: '100%',
        position: 'relative',
        paddingLeft: drawerWidth,
    },
    drawerPaper: {
        position: 'absolute',
        height: '100%',
        width: drawerWidth,
    },
    drawerHeader: theme.mixins.toolbar,
    drawerContents: {
        position: 'relative',
    },
    link: {
        'text-decoration': 'none',
    },
})

const PrimaryList = () => (
    <List>
        <Link to='/photos/upload' style={{ textDecoration: 'none' }}>
            <ListItem button>
            <ListItemIcon><CloudUploadIcon/></ListItemIcon>
            <ListItemText primary='Add Photos'/>
            </ListItem>
        </Link>
        <Link to='/photos/files' style={{ textDecoration: 'none' }}>
            <ListItem button>
            <ListItemIcon><PhotoLibraryIcon/></ListItemIcon>
            <ListItemText primary='Uploaded Photos'/>
            </ListItem>
        </Link>
    </List>
)

const SecondaryList = () => (
    <List>
        <Link to='/photos/notifications' style={{ textDecoration: 'none' }}>
            <ListItem button>
            <ListItemIcon><MessageIcon/></ListItemIcon>
            <ListItemText primary='Notifications'/>
            </ListItem>
        </Link>
        <Link to='/about' style={{ textDecoration: 'none' }}>
            <ListItem button>
            <ListItemIcon><InfoIcon/></ListItemIcon>
            <ListItemText primary='About'/>
            </ListItem>
        </Link>
    </List>
)

let Sidebar = ({classes}) => (
    <Drawer
        type='permanent'
        classes={{paper: classes.drawerPaper}}
    >
        <div className={classes.drawerContents}>
            <div className={classes.drawerHeader}/>
            <Divider/>
            <PrimaryList/>
            <Divider/>
            <SecondaryList/>
        </div>
    </Drawer>
)
Sidebar = withStyles(styles)(Sidebar)

let SidebarContainer = ({children, classes}) => (
    <div className={root}>
        <Sidebar/>
        <div className={classes.contentFrame}>
            {children}
        </div>
    </div>
)
SidebarContainer = withStyles(styles)(SidebarContainer)

export default SidebarContainer
