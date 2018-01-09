import React from 'react'

import HeaderLayout from './HeaderLayout'
import SidebarLayout from './SidebarLayout'

const AppLayout = ({children, classes}) => (
    <SidebarLayout>
        <HeaderLayout>
            {children}
        </HeaderLayout>
    </SidebarLayout>
)

export default AppLayout
