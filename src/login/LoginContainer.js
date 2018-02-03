import { connect } from 'react-redux'
import { getToken } from '../actions'
import LoginComponent from './LoginComponent.js'

const mapStateToProps = (state) => ({
    email: state.auth.email,
    loading: state.auth.loggingIn,
})

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (email, password) => dispatch(getToken(email, password)),
})

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginComponent)

export default LoginContainer
