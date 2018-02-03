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

    inProgress: state.ui.login.inProgress,

    error: false,
    errorPrimary: 'Error header',
    errorSecondary: 'This is the error message.',

    warning: false,
    warningPrimary: 'Warning header',
    warningSecondary: 'This is the warning message.',

    success: false,
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
