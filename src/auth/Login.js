import React from 'react'
import { connect } from 'react-redux'
import { login } from '../actions'
import AuthForm from './AuthForm.js'
import FullpageLayout from './FullpageLayout.js'
import { Link } from 'react-router-dom'
import {
    Header,
    Image,
    Message,
} from 'semantic-ui-react'

const LoginComponent = (props) => (
    <FullpageLayout>
        <Header as='h2' color='teal' textAlign='center'>
            <Image src='/logo.png' />
            {' '}Log In to your account
        </Header>
        <AuthForm {...props}/>
        <Message>
            Need an account? <Link to='/signup'>Sign Up</Link> here!
        </Message>
    </FullpageLayout>
)

const mapStateToProps = (state) => ({

    error: state.ui.login.error !== '',
    inProgress: state.ui.login.inProgress,

    errorPrimary: 'Login Failed',
    errorSecondary: state.ui.login.error !== ''
                    ? state.ui.login.error
                    : 'This is the error message.',

    warningPrimary: 'Warning header',
    warningSecondary: 'This is the warning message.',

    successPrimary: 'Success header',
    successSecondary: 'This is the success message.',

    submitText: 'Log In',
})

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (email, password) => dispatch(login(email, password)),
})

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginComponent)

export default LoginContainer
