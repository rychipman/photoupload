import { connect } from 'react-redux'
import NotificationsComponent from './NotificationsComponent.js'
import { closeNotification } from '../actions'

const mapStateToProps = (state) => ({
    notes: state.ui.notifications,
})

const mapDispatchToProps = (dispatch) => ({
    closeNote: (id) => dispatch(closeNotification(id)),
})

const NotificationsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NotificationsComponent)

export default NotificationsContainer
