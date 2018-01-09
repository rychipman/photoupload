import React from 'react'

import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'

import VisibleTaskList from '../containers/VisibleTaskList'
import AddTask from '../containers/AddTask'

const Content = ({children}) => (
    <Grid container alignItems='center'>
        <Grid item xs='8'>
            {children}
        </Grid>
    </Grid>
)

export default Content
