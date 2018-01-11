import { connect } from 'react-redux'

import {
    addFile,
    removeFile,
    uploadFile,
    dismissFileSuccess,
    closeNotification,
} from '../actions'
import UploadComponent from './UploadComponent.js'

const mapStateToProps = (state) => ({
    files: state.files,
    notifications: state.notifications,
})

const mapDispatchToProps = (dispatch) => ({
    onFileAdd: (file) => dispatch(addFile(file)),
    onFileDelete: (id) => dispatch(removeFile(id)),
    onUpload: (files) => files.map(f => dispatch(uploadFile(f.id, f.data))),
    onDismiss: (id) => dispatch(dismissFileSuccess(id)),
    onNotificationClose: (id) => dispatch(closeNotification(id)),
})

const UploadContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UploadComponent)

export default UploadContainer
