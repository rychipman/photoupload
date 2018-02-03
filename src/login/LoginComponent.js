import React, {Component} from 'react'
import {
    Button,
    Form,
    Segment,
} from 'semantic-ui-react'

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
    }
    handleChange = (e, {name, value}) => this.setState({ [name]: value })
    handleSubmit = () => {
        const { email, password } = this.state
        this.props.onSubmit(email, password)
    }

    render() {
        const { email, password } = this.state
        return (
            <Form size='large' onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                  name='email'
                  value={email}
                  onChange={this.handleChange}
                  required
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  name='password'
                  value={password}
                  onChange={this.handleChange}
                  required
                />
                <Button color='teal' fluid size='large'>Login</Button>
              </Segment>
            </Form>
        )
    }
}

export default LoginForm
