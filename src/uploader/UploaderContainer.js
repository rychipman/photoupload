import { connect } from 'react-redux'
import UploaderComponent from './UploaderComponent.js'
import {
    addFile,
    uploadFile,
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
    onFileAdd: (file) => dispatch(addFile(file)),
    onFileRetry: (file) => dispatch(uploadFile(file.id)),
    uploadedListToggle: () => dispatch(toggleUploadedList()),
    failedListToggle: () => dispatch(toggleFailedList()),
    inProgressListToggle: () => dispatch(toggleQueuedList()),
})

const UploaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UploaderComponent)

export default UploaderContainer
