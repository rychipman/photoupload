import React from 'react'

import Paper from 'material-ui/Paper'

import AddTask from './AddTask'
import VisibleTaskList from './VisibleTaskList'



let AppContent = ({classes}) => (
    <div>
        <Paper elevation='4'>
            <AddTask/>
        </Paper>

        <Paper elevation='4'>
            <VisibleTaskList/>
        </Paper>
    </div>
)

export default AppContent
