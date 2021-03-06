import React from 'react'
import { connect } from 'react-redux'
import { signup } from '../actions'
import AuthForm from './AuthForm.js'
import FullpageLayout from './FullpageLayout.js'
import { Link } from 'react-router-dom'
import {
    Header,
    Image,
    Message,
} from 'semantic-ui-react'

const SignupComponent = (props) => (
    <FullpageLayout>
        <Header as='h2' color='teal' textAlign='center'>
            <Image src='/logo.png' />
            {' '}Create an account
        </Header>
        <AuthForm {...props}/>
        <Message>
            Already have an account? <Link to='/login'>Log In</Link>
        </Message>
    </FullpageLayout>
)

const mapStateToProps = (state) => ({

    inProgress: state.ui.signup.inProgress,

    error: false,
    errorPrimary: 'Error header',
    errorSecondary: 'This is the error message.',

    warning: false,
    warningPrimary: 'Warning header',
    warningSecondary: 'This is the warning message.',

    success: false,
    successPrimary: 'Success header',
    successSecondary: 'This is the success message.',

    submitText: 'Sign Up',
})

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (email, password) => dispatch(signup(email, password)),
})

const SignupContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignupComponent)

export default SignupContainer
