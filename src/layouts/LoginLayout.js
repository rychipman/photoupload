import React from 'react'
import {
    Grid,
    Header,
    Image,
    Message,
} from 'semantic-ui-react'

import Login from '../login'


const LoginPage = () => (
  <div className='login-form' style={{ height: '100%' }}>
    <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/logo.png' />
          {' '}Log-in to your account
        </Header>
        <Login/>
        <Message>
          New to us? <a href='signup'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
)

export default LoginPage
