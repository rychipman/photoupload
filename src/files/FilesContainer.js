import { connect } from 'react-redux'

import { closeNotification } from '../actions'
import FilesComponent from './FilesComponent.js'

const mapStateToProps = (state) => ({
    files: state.files,
    notifications: state.notifications,
})

const mapDispatchToProps = (dispatch) => ({
    onNotificationClose: (id) => dispatch(closeNotification(id)),
})

const FilesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(FilesComponent)

export default FilesContainer
