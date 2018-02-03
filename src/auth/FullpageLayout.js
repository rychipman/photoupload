import React from 'react'
import { Grid } from 'semantic-ui-react'

const FullpageLayout = ({ children }) => (
    <div className='signup-form' style={{ height: '100%' }}>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
            <Grid.Column style={{ maxWidth: 450 }}>
                {children}
            </Grid.Column>
        </Grid>
    </div>
)

export default FullpageLayout
