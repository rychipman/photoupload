import React from 'react'

import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'

import InboxIcon from 'material-ui-icons/Inbox'

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
        <ListItemIcon><InboxIcon/></ListItemIcon>
        <ListItemText primary='Inbox'/>
        </ListItem>
        <ListItem button>
        <ListItemIcon><InboxIcon/></ListItemIcon>
        <ListItemText primary='Outbox'/>
        </ListItem>
    </List>
)

const SecondaryList = () => (
    <List>
        <ListItem button>
        <ListItemIcon><InboxIcon/></ListItemIcon>
        <ListItemText primary='Project One'/>
        </ListItem>
        <ListItem button>
        <ListItemIcon><InboxIcon/></ListItemIcon>
        <ListItemText primary='Project Two'/>
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
