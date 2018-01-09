import { connect } from 'react-redux'

import { addImageFile, removeFile, uploadFiles, closeNotification } from '../actions'
import UploadComponent from './UploadComponent.js'

const mapStateToProps = (state) => ({
    files: state.files,
    notifications: state.notifications,
})

const mapDispatchToProps = (dispatch) => ({
    onFileAdd: (file) => dispatch(addImageFile(file)),
    onFileDelete: (id) => dispatch(removeFile(id)),
    onUpload: (files) => dispatch(uploadFiles(files)),
    onNotificationClose: (id) => dispatch(closeNotification(id)),
})

const UploadContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UploadComponent)

export default UploadContainer
