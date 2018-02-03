import { connect } from 'react-redux'
import { getToken } from '../actions'
import LoginComponent from './LoginComponent.js'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (email, password) => dispatch(getToken(email, password)),
})

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginComponent)

export default LoginContainer
