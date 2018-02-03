import React from 'react'
import {
    Button,
    Grid,
    Header,
    List,
    Segment,
} from 'semantic-ui-react'

const LoginPage = () => (
  <div className='login-form' style={{ height: '100%' }}>
    <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Column width={12}>
        <Header as='h1' color='teal' textAlign='center'>
          Upload Your Photos
        </Header>
          <Segment raised>
            <Grid textAlign='center' verticalAlign='top'>
                <Grid.Row columns={4}>
                    <Grid.Column>
                    <Button color='teal' fluid size='large'>Upload Photos</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={12}>
                        <Segment.Group>
                            <Segment
                                content='really_really_really_long_pic.jpg'
                                textAlign='left'
                            />
                            <Segment
                                content='really_really_really_long_pic.jpg'
                                textAlign='left'
                            />
                            <Segment
                                content='really_really_really_long_pic.jpg'
                                textAlign='left'
                            />
                            <Segment
                                content='really_really_really_long_pic.jpg'
                                textAlign='left'
                            />
                        </Segment.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
          </Segment>
      </Grid.Column>
    </Grid>
  </div>
)

export default LoginPage
