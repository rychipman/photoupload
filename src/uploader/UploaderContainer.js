import { connect } from 'react-redux'
import UploaderComponent from './UploaderComponent.js'
import {
    uploadFile,
    retryUploadFile,
    toggleUploadedList,
    toggleFailedList,
    toggleQueuedList,
} from '../actions'

const mapStateToProps = (state) => ({
    files: state.files,
    showUploaded: state.ui.uploads.lists.uploaded,
    showInProgress: state.ui.uploads.lists.queued,
    showFailed: state.ui.uploads.lists.failed,
})

const mapDispatchToProps = (dispatch) => ({
    onFileAdd: (file) => dispatch(uploadFile(file)),
    onFileRetry: (file) => dispatch(retryUploadFile(file.id, file.data)),
    uploadedListToggle: () => dispatch(toggleUploadedList()),
    failedListToggle: () => dispatch(toggleFailedList()),
    inProgressListToggle: () => dispatch(toggleQueuedList()),
})

const UploaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UploaderComponent)

export default UploaderContainer
