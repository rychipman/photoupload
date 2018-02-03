import React from 'react'
import { connect } from 'react-redux'
import { Dimmer } from 'semantic-ui-react'
import Login from '../layouts/LoginLayout.js'

const loginDimmer = ({ active }) => (
    <Dimmer
        page
        inverted
        active={active}
        content={<Login/>}
    />
)

const mapStateToProps = (state) => ({
    active: !state.auth.loggedIn,
})

const mapDispatchToProps = (dispatch) => ({})

const LoginDimmer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(loginDimmer)

export default LoginDimmer
