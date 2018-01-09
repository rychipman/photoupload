import React from 'react'

import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'

import CloudUploadIcon from 'material-ui-icons/CloudUpload'
import FolderIcon from 'material-ui-icons/Folder'
import PhotoLibraryIcon from 'material-ui-icons/PhotoLibrary'

const drawerWidth = 240;
const styles = (theme) => ({
    contentFrame: {
        width: '100%',
        height: '100%',
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
})

const PrimaryList = () => (
    <List>
        <ListItem button>
        <ListItemIcon><CloudUploadIcon/></ListItemIcon>
        <ListItemText primary='Add Photos'/>
        </ListItem>
        <ListItem button>
        <ListItemIcon><PhotoLibraryIcon/></ListItemIcon>
        <ListItemText primary='View Photos'/>
        </ListItem>
    </List>
)

const SecondaryList = () => (
    <List>
        <ListItem button>
        <ListItemIcon><FolderIcon/></ListItemIcon>
        <ListItemText primary='Thing One'/>
        </ListItem>
        <ListItem button>
        <ListItemIcon><FolderIcon/></ListItemIcon>
        <ListItemText primary='Thing Two'/>
        </ListItem>
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
    <div>
        <Sidebar/>
        <div className={classes.contentFrame}>
            {children}
        </div>
    </div>
)
SidebarContainer = withStyles(styles)(SidebarContainer)

export default SidebarContainer
