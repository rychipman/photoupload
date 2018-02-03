import React, {Component} from 'react'
import {
    Button,
    Form,
    Message,
    Segment,
} from 'semantic-ui-react'

class AuthForm extends Component {
    state = {
        email: '',
        password: '',
    }
    handleChange = (e, {name, value}) => this.setState({ [name]: value })
    handleSubmit = () => {
        const { email, password } = this.state
        this.setState({ password: '' })
        this.props.onSubmit(email, password)
    }

    render() {
        const { email, password } = this.state
        return (
            <Form
                size='large'
                onSubmit={this.handleSubmit}
                loading={this.props.inProgress}
                error={this.props.error}
                success={this.props.success}
            >
              <Message
                error
                size='mini'
                header={this.props.errorPrimary}
                content={this.props.errorSecondary}
              />
              <Message
                warning
                size='mini'
                header={this.props.warningPrimary}
                content={this.props.warningSecondary}
              />
              <Message
                success
                size='mini'
                header={this.props.successPrimary}
                content={this.props.successSecondary}
              />
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Email address'
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
                <Button fluid color='teal' size='large'>{this.props.submitText}</Button>
              </Segment>
            </Form>
        )
    }
}

export default AuthForm
